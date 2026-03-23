import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import { getPosts } from '@/app/lib/data';
import { getPortfolioContext } from '@/app/home/constant';
import { retrieveRagContext } from '@/app/lib/rag';

type ChatRequestMessage = {
  role: 'user' | 'assistant';
  content: string;
};

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

    const posts = await getPosts();
    const postData = JSON.stringify(
      (posts ?? []).map((post) => ({
        title: post.title,
        content: post.content,
      }))
    );

    const latestUserQuestion =
      messages
        .slice()
        .reverse()
        .find((message) => message.role === 'user')
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

    const fallbackContext = `Posts data: ${postData}\nPortfolio data: ${getPortfolioContext()}`;
    const groundedContext = ragEnabled && ragContext ? ragContext : fallbackContext;
    const contextMode = ragEnabled ? 'RAG vector retrieval' : 'Fallback full context';

    const responseFormatGuide = `
Response formatting rules (adaptive):
1) Choose format based on user intent:
- Format A (Detailed): Use sectioned format for substantial profile questions (projects, experience, skills, comparisons, architecture).
  Quick Answer:
  Key Points:
  Impact / Outcomes:
  Tech Stack:
  Source Confidence:
- Format B (Brief): Use 2-5 lines for simple factual questions (email, location, eligibility, single metric).
- Format C (Out-of-scope/missing-context): Use 2-4 lines only:
  - What is missing
  - What you can answer instead
  - One suggested follow-up question

2) Do NOT force all sections for every question.
3) Keep responses concise and scannable (normally under 140 words unless user asks for detail).
4) Do not use promotional adjectives like "impressive", "amazing", "incredible".
5) Do not invent data. If missing, explicitly say it is not in available context.
6) Use only plain text headings (no markdown symbols).
`;

    const systemPrompt = `You are a helpful, friendly, and professional AI assistant for Hemant's portfolio website. Your purpose is to answer questions about Hemant based on the provided context in an effective, structured manner. If a question is outside the scope of context, politely state that you can only answer questions related to Hemant's professional profile. Do not invent information.

${responseFormatGuide}

Context mode: ${contextMode}

Context:
${groundedContext}`;

    const conversation = messages
      .map((message) => `${message.role === 'assistant' ? 'Assistant' : 'User'}: ${message.content}`)
      .join('\n');
    const prompt = `${systemPrompt}\n\nConversation:\n${conversation}\n\nAssistant:`;

    let response = '';
    try {
      const result = await model.generateContent(prompt);
      response = result.response.text().trim();
    } catch (error: unknown) {
      const aiError = error as { status?: number; message?: string };
      if (aiError?.status === 429) {
        const message = aiError.message || '';
        const retryMatch = message.match(/retry in\s+([\d.]+)s/i) || message.match(/"retryDelay":"(\d+)s"/i);
        const retryAfterSeconds = retryMatch ? Math.ceil(Number(retryMatch[1])) : 60;
        return NextResponse.json(
          {
            error:
              'Gemini quota exceeded. Please wait and retry, or enable billing / use a key with available quota.',
            retryAfterSeconds,
          },
          {
            status: 429,
            headers: { 'Retry-After': String(retryAfterSeconds) },
          }
        );
      }
      throw error;
    }

    if (!response) {
      return NextResponse.json({ error: 'Empty model response.' }, { status: 502 });
    }

    return NextResponse.json({ response, rag: ragMeta });
  } catch (error) {
    console.error('AI chat route error:', error);
    return NextResponse.json({ error: 'Failed to generate response.' }, { status: 500 });
  }
}
