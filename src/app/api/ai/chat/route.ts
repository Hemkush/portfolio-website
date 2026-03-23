import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import { getPosts } from '@/app/lib/data';
import { getPortfolioContext } from '@/app/home/constant';

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

    const systemPrompt = `You are a helpful, friendly, and professional AI assistant for Hemant's portfolio website. Your purpose is to answer questions about Hemant based on the detailed portfolio information provided in an effective, engaging manner, and present information in a structured way. Be conversational and engaging. If a question is outside the scope of the provided context, politely state that you can only answer questions related to Hemant's professional profile. Do not invent information. Here is the posts data: ${postData} and the portfolio data: ${getPortfolioContext()}.`;

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

    return NextResponse.json({ response });
  } catch (error) {
    console.error('AI chat route error:', error);
    return NextResponse.json({ error: 'Failed to generate response.' }, { status: 500 });
  }
}
