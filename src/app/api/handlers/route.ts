import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { auth } from '../../../../auth.config';

const MAX_TITLE_LENGTH = 150;
const MAX_CONTENT_LENGTH = 10000;

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

export async function GET() {
  try {
    const posts = await sql`SELECT * FROM posts ORDER BY date DESC LIMIT 2;`;
    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await auth();
  const email = session?.user?.email;

  if (!session || !isAdmin(email)) {
    return NextResponse.json({ message: 'forbidden' }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  let payload: Record<string, string | null> = {};
  try {
    payload = await request.json();
  } catch {
    payload = {};
  }

  const id = (payload.id ?? searchParams.get('id') ?? '').trim();
  const title = (payload.title ?? searchParams.get('title') ?? '').trim();
  const content = (payload.content ?? searchParams.get('content') ?? '').trim();
  const date = (payload.date ?? searchParams.get('date') ?? '').trim();
  const author = (payload.author ?? searchParams.get('author') ?? session.user?.name ?? '').trim();

  if (!id || !title || !content || !date || !author) {
    return NextResponse.json({ message: 'Missing required fields.' }, { status: 400 });
  }

  if (title.length > MAX_TITLE_LENGTH || content.length > MAX_CONTENT_LENGTH) {
    return NextResponse.json({ message: 'Payload is too large.' }, { status: 400 });
  }

  try {
    await sql`
      INSERT INTO posts (id, author, title, content, date)
      VALUES (${id}, ${author}, ${title}, ${content}, ${date});
    `;
    return NextResponse.json({ message: 'Post created successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await auth();
  const email = session?.user?.email;

  if (!session || !isAdmin(email)) {
    return NextResponse.json({ message: 'forbidden' }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const id = (searchParams.get('id') ?? '').trim();

  if (!id) {
    return NextResponse.json({ message: 'id is required' }, { status: 400 });
  }

  try {
    await sql`DELETE FROM posts WHERE id = ${id}`;
    return NextResponse.json({ message: 'Post deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

