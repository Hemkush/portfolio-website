import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import { auth } from '../../../../../auth.config';
import { reindexRag } from '@/app/lib/rag';

function getAdminEmails() {
  return (process.env.ADMIN_EMAILS ?? process.env.ADMIN_EMAIL ?? '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

function isAdmin(email?: string | null) {
  if (!email) return false;
  const admins = getAdminEmails();
  return admins.length > 0 && admins.includes(email.toLowerCase());
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    const email = session?.user?.email;
    const reindexToken = process.env.RAG_REINDEX_TOKEN;
    const token = request.headers.get('x-rag-reindex-token');
    const tokenAuthorized = Boolean(reindexToken && token && token === reindexToken);

    if ((!session || !isAdmin(email)) && !tokenAuthorized) {
      return NextResponse.json(
        {
          error: 'forbidden',
          message:
            'Use an admin session or pass x-rag-reindex-token header matching RAG_REINDEX_TOKEN.',
        },
        { status: 403 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: 'Missing GEMINI_API_KEY.' }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const result = await reindexRag(genAI);

    return NextResponse.json(
      {
        message: 'RAG index updated successfully.',
        indexedDocuments: result.indexedDocuments,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('RAG reindex route error:', error);
    return NextResponse.json({ error: 'Failed to reindex RAG documents.' }, { status: 500 });
  }
}
