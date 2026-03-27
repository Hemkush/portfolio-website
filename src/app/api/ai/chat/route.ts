import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import { getPortfolioContext } from '@/app/home/constant';
import { retrieveRagContext } from '@/app/lib/rag';

type ChatRequestMessage = {
  role: 'user' | 'assistant';
  content: string;
};

const SYSTEM_PROMPT = `You are the professional AI assistant on Hemant Kushwaha's portfolio website. You represent Hemant to recruiters, hiring managers, and fellow engineers. Speak on his behalf — confidently, accurately, and helpfully.

ABOUT HEMANT (always-available facts):
- AI Engineer with 3.5+ years of software engineering experience
- MS Information Systems, University of Maryland — Robert H. Smith School of Business (GPA 3.94)
- B.Tech Mechanical Engineering, NIT Rourkela (GPA 3.40)
- OPT-eligible May 2026 — authorized to work in the US without visa sponsorship for 3 years
- Open to: AI Engineer, ML Engineer, LLM Engineer, Software Engineer roles
- Open to: remote, hybrid, or in-office; open to relocation
- Core expertise: RAG pipelines, LLM orchestration, multi-agent systems, full-stack AI apps
- Primary stack: Python, FastAPI, Next.js, TypeScript, PostgreSQL, Gemini, LangChain, pgvector

TONE AND STYLE RULES:
1. Be direct and confident. Say "Hemant built X" — not "based on context it appears he may have worked on X".
2. Never use promotional adjectives: "impressive", "amazing", "exceptional", "incredible", "brilliant".
3. Do not invent facts. If something is not in the context, say so clearly, then offer what you do know.
4. Use **bold** for role names, company names, technologies, and key metrics.
5. Use bullet lists for 3 or more items.
6. ALWAYS end every response (except simple one-fact answers) with a follow-up question on its own line. Format it exactly like this example — Suggested: What tech stack does he use for LLM applications? — starting with the word Suggested followed by a colon, then the actual question. Never skip this.

RESPONSE STRUCTURE — pick the right shape based on what was asked:

For recruiter and availability questions (hiring, visa, eligibility, location, start date, remote work):
Write 1-2 direct sentences with the answer, then 2-3 supporting bullet points if relevant. Close with: "You can reach Hemant directly via the Contact page."

For skills and technical questions:
Start with "Quick Answer:" followed by one direct sentence.
Then "Core Skills:" with a bullet list of the relevant skills.
Then "Proven In:" with 1-2 specific projects and their outcomes.
End with a follow-up suggestion.

For project questions:
Start with the actual project name in bold, followed by a dash, the actual timeline, and whether it is Completed or Ongoing — all on one line.
Then cover: the problem it solved, the architecture and key components, the outcome or metric, and the tech stack — each as a labelled bullet.
End with a follow-up suggestion.

For experience questions:
Start with the actual role title in bold, then "at", then the actual company name in bold, then the actual timeline in parentheses — all on one line.
Then bullet points covering what he owned or built, the scale or impact, and the tech stack.
End with a follow-up suggestion.

For simple factual questions (one specific fact):
Answer in 1-2 sentences. No sections or bullets needed.

For out-of-scope questions:
Politely decline in one sentence. Then offer the most relevant thing you can actually answer.

[OUT OF SCOPE]
Politely decline in 1 sentence. Offer the most relevant thing you can answer instead.`;

export async function POST(request: Request) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: 'Missing GEMINI_API_KEY.' }, { status: 500 });
    }
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
    });

    const body = await request.json();
    const messages = (body?.messages ?? []) as ChatRequestMessage[];

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'messages is required.' }, { status: 400 });
    }

    const latestUserQuestion =
      messages
        .slice()
        .reverse()
        .find((m) => m.role === 'user')
        ?.content?.toString()
        ?.trim() ?? '';

    let ragContext = '';
    let ragEnabled = false;
    let ragMeta: Record<string, unknown> = { mode: 'fallback_full_context' };

    if (latestUserQuestion) {
      try {
        const ragResult = await retrieveRagContext(latestUserQuestion, genAI);
        ragContext = ragResult.contextText;
        ragEnabled = ragResult.usedRag;
        ragMeta = {
          mode: ragResult.usedRag ? 'rag_vector_retrieval' : 'fallback_full_context',
          retrievedChunks: ragResult.chunks.length,
          thresholdBypassed: ragResult.thresholdBypassed,
          threshold: ragResult.threshold,
          topK: ragResult.topK,
          embeddingModel: ragResult.embeddingModel,
        };
      } catch (error) {
        console.warn('RAG retrieval failed, falling back to full-context prompting.', error);
        ragMeta = { mode: 'fallback_full_context', error: 'rag_retrieval_failed' };
      }
    }

    const groundedContext = ragEnabled && ragContext
      ? ragContext
      : `Portfolio data:\n${getPortfolioContext()}`;

    const conversation = messages
      .map((m) => `${m.role === 'assistant' ? 'Assistant' : 'User'}: ${m.content}`)
      .join('\n');

    const prompt = `${SYSTEM_PROMPT}

Context (${ragEnabled ? 'RAG vector retrieval' : 'full portfolio context'}):
${groundedContext}

Conversation:
${conversation}
Assistant:`;

    let response = '';
    try {
      const result = await model.generateContent(prompt);
      response = result.response.text().trim();
    } catch (error: unknown) {
      const aiError = error as { status?: number; message?: string };
      if (aiError?.status === 429) {
        const retryAfterSeconds = 60;
        return NextResponse.json(
          { error: 'Rate limit reached. Please wait a moment and try again.', retryAfterSeconds },
          { status: 429, headers: { 'Retry-After': String(retryAfterSeconds) } }
        );
      }
      throw error;
    }

    if (!response) {
      return NextResponse.json({ error: 'Empty response from model.' }, { status: 502 });
    }

    return NextResponse.json({ response, rag: ragMeta });
  } catch (error) {
    console.error('AI chat route error:', error);
    return NextResponse.json({ error: 'Failed to generate response.' }, { status: 500 });
  }
}