import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { auth } from '../../../../auth.config';

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
  const { searchParams } = new URL(request.url);
  let payload: Record<string, string | null> = {};
  try {
    payload = await request.json();
  } catch {
    payload = {};
  }
  const id = payload.id ?? searchParams.get('id');
  const title = payload.title ?? searchParams.get('title');
  const content = payload.content ?? searchParams.get('content');
  const date = payload.date ?? searchParams.get('date');
  const author = payload.author ?? searchParams.get('author');
  //const author = "Hemant Kushwaha"; // Hardcoded for now, replace with session.user.name if available

  try {
    if (!session) {
      return NextResponse.json({ message: 'user not authenticated' }, { status: 401 });
    }
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
  if (!session) {
    return NextResponse.json({ message: 'user not authenticated' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

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
