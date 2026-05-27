import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { auth } from '../../../../../auth.config';

function getAdminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? process.env.ADMIN_EMAIL ?? '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

function isAdmin(email?: string | null): boolean {
  if (!email) return false;
  const admins = getAdminEmails();
  return admins.length > 0 && admins.includes(email.toLowerCase());
}

export async function GET(request: Request) {
  try {
    const session = await auth();
    const email = session?.user?.email;
    const reindexToken = process.env.RAG_REINDEX_TOKEN;
    const token = request.headers.get('x-rag-reindex-token');
    const tokenAuthorized = Boolean(reindexToken && token && token === reindexToken);

    if ((!session || !isAdmin(email)) && !tokenAuthorized) {
      return NextResponse.json({ error: 'forbidden' }, { status: 403 });
    }

    const [nodes, edges, communities] = await Promise.all([
      sql`SELECT COUNT(*)::int AS count FROM graph_nodes`,
      sql`SELECT COUNT(*)::int AS count FROM graph_edges`,
      sql`SELECT COUNT(*)::int AS count FROM graph_communities`,
    ]);

    const latestNode = await sql`
      SELECT created_at FROM graph_nodes ORDER BY created_at DESC LIMIT 1
    `;

    return NextResponse.json({
      nodeCount: Number(nodes.rows[0]?.count ?? 0),
      edgeCount: Number(edges.rows[0]?.count ?? 0),
      communityCount: Number(communities.rows[0]?.count ?? 0),
      lastIndexedAt: latestNode.rows[0]?.created_at ?? null,
    });
  } catch (error) {
    console.error('[graph-status] error:', error);
    return NextResponse.json({ error: 'Failed to fetch graph status.' }, { status: 500 });
  }
}
