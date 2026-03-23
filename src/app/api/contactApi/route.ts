import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { auth } from '../../../../auth.config';

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 320;
const MAX_MESSAGE_LENGTH = 2000;
const CONTACT_WINDOW_MS = 60_000;
const CONTACT_MAX_PER_WINDOW = 4;
const contactAttempts = new Map<string, number[]>();
let contactTableInitPromise: Promise<void> | null = null;

async function ensureContactTable() {
  if (!contactTableInitPromise) {
    contactTableInitPromise = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS contact_message (
          id UUID PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          email VARCHAR(320) NOT NULL,
          message TEXT NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
      `;
    })().catch((error) => {
      contactTableInitPromise = null;
      throw error;
    });
  }

  await contactTableInitPromise;
}

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

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getRateKey(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  return `contact:${ip}`;
}

function isRateLimited(request: Request) {
  const key = getRateKey(request);
  const now = Date.now();
  const recent = (contactAttempts.get(key) ?? []).filter((t) => now - t < CONTACT_WINDOW_MS);
  if (recent.length >= CONTACT_MAX_PER_WINDOW) return true;
  recent.push(now);
  contactAttempts.set(key, recent);
  return false;
}

export async function GET() {
  const session = await auth();
  const email = session?.user?.email;

  if (!session || !isAdmin(email)) {
    return NextResponse.json({ message: 'forbidden' }, { status: 403 });
  }

  try {
    await ensureContactTable();
    const message = await sql`SELECT * FROM contact_message ORDER BY created_at DESC;`;
    return NextResponse.json({ message }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (isRateLimited(request)) {
    return NextResponse.json({ message: 'Too many requests. Please try again shortly.' }, { status: 429 });
  }

  const { searchParams } = new URL(request.url);
  let payload: Record<string, string | null> = {};
  try {
    payload = await request.json();
  } catch {
    payload = {};
  }

  const id = (payload.id ?? searchParams.get('id') ?? '').trim();
  const name = (payload.name ?? searchParams.get('name') ?? '').trim();
  const email = (payload.email ?? searchParams.get('email') ?? '').trim();
  const message = (payload.message ?? searchParams.get('message') ?? '').trim();
  const website = (payload.website ?? '').trim();

  if (website) {
    return NextResponse.json({ message: 'Spam detected.' }, { status: 400 });
  }

  if (!id || !name || !email || !message) {
    return NextResponse.json({ message: 'Missing required fields.' }, { status: 400 });
  }

  if (
    name.length > MAX_NAME_LENGTH ||
    email.length > MAX_EMAIL_LENGTH ||
    message.length > MAX_MESSAGE_LENGTH
  ) {
    return NextResponse.json({ message: 'Payload is too large.' }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ message: 'Invalid email format.' }, { status: 400 });
  }

  try {
    await ensureContactTable();
    await sql`
      INSERT INTO contact_message (id, name, email, message)
      VALUES (${id}, ${name}, ${email}, ${message});
    `;
    return NextResponse.json({ message: 'Message created successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

