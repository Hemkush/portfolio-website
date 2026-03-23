import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

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
    const title = body?.title?.toString()?.trim();

    if (!title) {
      return NextResponse.json({ error: 'title is required.' }, { status: 400 });
    }

    const prompt = `You are a creative blog writer. Write a 200 to 300 words blog post about the title below. It must be at least 50 words. Title: ${title}`;

    let content = '';
    try {
      const result = await model.generateContent(`${prompt}\n\n${title}`);
      content = result.response.text().trim();
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

    if (!content) {
      return NextResponse.json({ error: 'Empty model response.' }, { status: 502 });
    }

    return NextResponse.json({ content });
  } catch (error) {
    console.error('AI blog generation route error:', error);
    return NextResponse.json({ error: 'Failed to generate blog content.' }, { status: 500 });
  }
}
