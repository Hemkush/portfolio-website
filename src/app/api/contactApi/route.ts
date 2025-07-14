import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// export async function GET() {
//   try {
//     const posts = await sql`SELECT * FROM posts ORDER BY date DESC LIMIT 2;`;
//     return NextResponse.json({ posts }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error }, { status: 500 });
//   }
// }

// export async function POST(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const id = searchParams.get('id');
//   const title = searchParams.get('title');
//   const content = searchParams.get('content');
//   const date = searchParams.get('date');
//   // const author = searchParams.get('author');
//   const author = "Hemant Kushwaha"; // Hardcoded for now, replace with session.user.name if available

//   try {
//     await sql`
//       INSERT INTO posts (id, author, title, content, date)
//       VALUES (${id}, ${author}, ${title}, ${content}, ${date});
//     `;
//     return NextResponse.json({ message: 'Post created successfully' }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error }, { status: 500 });
//   }
// }

export async function GET() {
  try {
    const message = await sql`SELECT * FROM Contact_message;`;
    return NextResponse.json({ message }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const name = searchParams.get('name');
  const email = searchParams.get('email');
  const message = searchParams.get('message');
  // const author = searchParams.get('author');

  try {
    await sql`
      INSERT INTO Contact_message (id, name, email, message)
      VALUES (${id}, ${name}, ${email}, ${message});
    `;
    return NextResponse.json({ message: 'Message created successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}