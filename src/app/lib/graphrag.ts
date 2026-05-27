// src/app/lib/graphrag.ts
// NOTE: rag.ts imports (getEmbedding, ensureRagBootstrap, queryVectorDocuments,
// retrieveRagContext) are intentionally NOT statically imported here.
// rag.ts pulls in @/app/home/constant (JSX/TSX) which breaks vitest's module graph.
// All rag imports are done dynamically inside the functions that use them (Task 9),
// keeping this module test-safe while assembleContext remains a pure function.

import type { GoogleGenerativeAI } from '@google/generative-ai';

// ─── Types ────────────────────────────────────────────────────────────────────

export type GraphRagMode =
  | 'graphrag_local'
  | 'graphrag_global'
  | 'graphrag_hybrid'
  | 'vector_only';

// Re-exported type alias so consumers don't need to import from rag.ts directly
export type RetrievedChunk = {
  id: string;
  source: string;
  content: string;
  score: number;
};

export type GraphRagResult = {
  contextText: string;
  mode: GraphRagMode;
  vectorChunks: number;
  entitiesMatched: string[];
  communitiesUsed: string[];
  hopsTraversed: number;
  // Legacy fields preserved for backward compatibility with chat/route.ts
  usedRag: boolean;
  chunks: RetrievedChunk[];
  thresholdBypassed: boolean;
  threshold: number;
  topK: number;
  embeddingModel: string;
};

// ─── Context assembly ─────────────────────────────────────────────────────────

const VECTOR_TOKEN_BUDGET = 1800;
const ENTITY_TOKEN_BUDGET = 800;
const COMMUNITY_TOKEN_BUDGET = 600;

function countTokensApprox(text: string): number {
  return Math.ceil(text.length / 4);
}

/**
 * Assembles a structured context string from three source types:
 *  - vectorParts:    chunks retrieved via vector similarity search
 *  - entityPart:     graph entity/relationship context string
 *  - communityParts: community summary strings from graph community detection
 *
 * Each section is token-budget-capped and labelled with a header.
 * Omits any section that has no content after applying budgets.
 * Returns '' when all inputs are empty.
 * Cross-section deduplication: lines already in the vector section are
 * filtered out of entity and community sections before assembly.
 * Hard cap: result is clamped to maxTokens * 4 characters.
 */
export function assembleContext(
  vectorParts: string[],
  entityPart: string,
  communityParts: string[],
  maxTokens = 3500
): string {
  const sections: string[] = [];

  // Vector chunks — up to VECTOR_TOKEN_BUDGET tokens
  const vectorLines: string[] = [];
  let vectorTokens = 0;
  for (const part of vectorParts) {
    const t = countTokensApprox(part);
    if (vectorTokens + t > VECTOR_TOKEN_BUDGET) break;
    vectorLines.push(part);
    vectorTokens += t;
  }

  // Build a set of all non-empty trimmed lines from the vector section
  // for cross-section deduplication.
  const vectorLineSet = new Set<string>();
  for (const vl of vectorLines) {
    for (const line of vl.split('\n')) {
      const trimmed = line.trim();
      if (trimmed) vectorLineSet.add(trimmed);
    }
  }

  if (vectorLines.length > 0) {
    sections.push('--- Vector Retrieved Context ---\n' + vectorLines.join('\n\n'));
  }

  // Entity/graph context — truncate to ENTITY_TOKEN_BUDGET tokens worth of chars,
  // then filter out lines already present in the vector section.
  const trimmedEntityRaw = entityPart.trim().slice(0, ENTITY_TOKEN_BUDGET * 4);
  const entityLines = trimmedEntityRaw
    .split('\n')
    .filter((line) => {
      const t = line.trim();
      return t && !vectorLineSet.has(t);
    });
  const trimmedEntity = entityLines.join('\n');

  if (trimmedEntity) {
    sections.push('--- Graph Entity Context ---\n' + trimmedEntity);
  }

  // Build a set of entity lines for community-level dedup
  const entityLineSet = new Set<string>(entityLines.map((l) => l.trim()).filter(Boolean));

  // Community summaries — up to COMMUNITY_TOKEN_BUDGET tokens,
  // filtering lines already in vector or entity sections.
  const communityLines: string[] = [];
  let communityTokens = 0;
  for (const part of communityParts) {
    const t = countTokensApprox(part);
    if (communityTokens + t > COMMUNITY_TOKEN_BUDGET) break;
    const partLines = part.split('\n').filter((line) => {
      const trimmed = line.trim();
      return trimmed && !vectorLineSet.has(trimmed) && !entityLineSet.has(trimmed);
    });
    const dedupedPart = partLines.join('\n');
    if (dedupedPart) {
      communityLines.push(dedupedPart);
      communityTokens += t;
    }
  }
  if (communityLines.length > 0) {
    sections.push('--- Community Summaries ---\n' + communityLines.join('\n\n'));
  }

  const result = sections.join('\n\n');

  // Hard cap: clamp to maxTokens * 4 characters
  const charLimit = maxTokens * 4;
  if (result.length > charLimit) {
    return result.slice(0, charLimit);
  }

  return result;
}

// ─── Query entity extraction ──────────────────────────────────────────────────

async function extractQueryEntities(
  query: string,
  genAI: GoogleGenerativeAI
): Promise<string[]> {
  const modelName =
    process.env.GEMINI_EXTRACTION_MODEL ??
    process.env.GEMINI_MODEL ??
    'gemini-2.0-flash';
  const model = genAI.getGenerativeModel({ model: modelName });
  const prompt = `Extract named entities (people, organizations, technologies, projects, skills) from this portfolio chatbot query.
Return ONLY a JSON array of strings — no markdown, no explanation.
Examples: ["LangChain", "NVIDIA", "Python"] or []

Query: ${query}`;

  try {
    const res = await model.generateContent(prompt);
    let text = res.response.text().trim();
    text = text.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
    const parsed = JSON.parse(text);
    return Array.isArray(parsed)
      ? parsed.filter((x: unknown) => typeof x === 'string')
      : [];
  } catch {
    return [];
  }
}

// ─── Local search (entity graph traversal) ───────────────────────────────────

async function localGraphSearch(
  entityNames: string[]
): Promise<{ context: string; hopsUsed: number }> {
  if (entityNames.length === 0) return { context: '', hopsUsed: 0 };
  const { sql } = await import('@vercel/postgres');
  const parts: string[] = [];
  let hop2Triggered = false;

  for (const name of entityNames.slice(0, 5)) {
    const pattern = `%${name.toLowerCase()}%`;

    const rootResult = await sql<{
      id: string;
      name: string;
      type: string;
      description: string;
    }>`
      SELECT id, name, type, description
      FROM graph_nodes
      WHERE LOWER(name) LIKE ${pattern}
      LIMIT 3
    `;
    const roots = rootResult.rows ?? [];
    if (roots.length === 0) continue;

    for (const root of roots) {
      parts.push(`[${root.type}] ${root.name}: ${root.description}`);
    }

    for (const root of roots) {
      // Outgoing edges from this node
      const outgoing = await sql<{
        relation: string;
        context: string;
        other_id: string;
        other_name: string;
        other_type: string;
      }>`
        SELECT e.relation, e.context, n2.id AS other_id, n2.name AS other_name, n2.type AS other_type
        FROM graph_edges e
        JOIN graph_nodes n2 ON e.target_id = n2.id
        WHERE e.source_id = ${root.id}
        LIMIT 8
      `;
      // Incoming edges to this node
      const incoming = await sql<{
        relation: string;
        context: string;
        other_id: string;
        other_name: string;
        other_type: string;
      }>`
        SELECT e.relation, e.context, n2.id AS other_id, n2.name AS other_name, n2.type AS other_type
        FROM graph_edges e
        JOIN graph_nodes n2 ON e.source_id = n2.id
        WHERE e.target_id = ${root.id}
        LIMIT 8
      `;

      const hop1 = [
        ...(outgoing.rows ?? []),
        ...(incoming.rows ?? []),
      ];

      for (const h of hop1) {
        parts.push(`  ${root.name} ←→[${h.relation}]→ ${h.other_name} (${h.other_type}): ${h.context}`);
      }

      // Hop 2: expand only when hop-1 returned fewer than 3 distinct neighbor nodes
      const distinctNeighbors = new Set(hop1.map((h: { other_id: string }) => h.other_id));
      if (distinctNeighbors.size < 3) {
        hop2Triggered = true;
        for (const h1 of hop1) {
          const hop2 = await sql<{
            relation: string;
            context: string;
            other_name: string;
          }>`
            SELECT e.relation, e.context, n2.name AS other_name
            FROM graph_edges e
            JOIN graph_nodes n2 ON e.target_id = n2.id
            WHERE e.source_id = ${h1.other_id}
              AND n2.id != ${root.id}
            LIMIT 3
          `;
          for (const h of (hop2.rows ?? [])) {
            parts.push(`    ${h1.other_name} →[${h.relation}]→ ${h.other_name}: ${h.context}`);
          }
        }
      }
    }
  }

  const context = parts.join('\n');
  const hopsUsed = context.trim().length === 0 ? 0 : hop2Triggered ? 2 : 1;
  return { context, hopsUsed };
}

// ─── Global search (community similarity) ────────────────────────────────────

async function queryCommunitiesByEmbedding(
  queryVector: number[],
  topN = 2
): Promise<Array<{ title: string; summary: string }>> {
  const { sql } = await import('@vercel/postgres');
  const queryVec = `[${queryVector.join(',')}]`;
  try {
    const result = await sql<{ title: string; summary: string }>`
      SELECT title, summary
      FROM graph_communities
      WHERE summary_embedding IS NOT NULL
      ORDER BY summary_embedding <=> ${queryVec}::vector
      LIMIT ${topN}
    `;
    return result.rows ?? [];
  } catch {
    return [];
  }
}

// ─── Main retrieval entry point ───────────────────────────────────────────────

export async function retrieveGraphRagContext(
  query: string,
  genAI: GoogleGenerativeAI
): Promise<GraphRagResult> {
  const topK = Number(process.env.RAG_TOP_K ?? 4);
  const threshold = Number(process.env.RAG_SIMILARITY_THRESHOLD ?? 0.55);

  // Check whether the graph has been indexed
  let graphPopulated = false;
  try {
    const { sql } = await import('@vercel/postgres');
    const check = await sql`SELECT COUNT(*)::int AS count FROM graph_nodes`;
    graphPopulated = Number(check.rows[0]?.count ?? 0) > 0;
  } catch {
    graphPopulated = false;
  }

  // Fallback: graph not yet built — use pure vector search
  if (!graphPopulated) {
    const { retrieveRagContext } = await import('./rag');
    const vectorResult = await retrieveRagContext(query, genAI);
    return {
      contextText: vectorResult.contextText,
      mode: 'vector_only',
      vectorChunks: vectorResult.chunks.length,
      entitiesMatched: [],
      communitiesUsed: [],
      hopsTraversed: 0,
      usedRag: vectorResult.usedRag,
      chunks: vectorResult.chunks,
      thresholdBypassed: vectorResult.thresholdBypassed,
      threshold: vectorResult.threshold,
      topK: vectorResult.topK,
      embeddingModel: vectorResult.embeddingModel,
    };
  }

  // Bootstrap vector store if needed
  const { ensureRagBootstrap, getEmbedding, queryVectorDocuments } = await import('./rag');
  await ensureRagBootstrap(genAI);

  // Pre-computation: shared query embedding + entity extraction (both in parallel)
  const [queryEmbedding, queryEntities] = await Promise.all([
    getEmbedding(query, genAI),
    extractQueryEntities(query, genAI),
  ]);

  // Three retrieval legs in parallel
  const [vectorChunks, localResult, communityMatches] = await Promise.all([
    queryVectorDocuments(queryEmbedding, topK, threshold),
    localGraphSearch(queryEntities),
    queryCommunitiesByEmbedding(queryEmbedding),
  ]);

  const entityContext = localResult.context;
  const hopsTraversed = localResult.hopsUsed;

  // Determine mode
  const hasEntities = queryEntities.length > 0 && entityContext.trim().length > 0;
  const hasCommunities = communityMatches.length > 0;
  const mode: GraphRagMode =
    hasEntities && hasCommunities
      ? 'graphrag_hybrid'
      : hasEntities
      ? 'graphrag_local'
      : hasCommunities
      ? 'graphrag_global'
      : 'vector_only';

  // Assemble context
  const vectorParts = vectorChunks.map(
    (c, i) =>
      `Chunk ${i + 1} [${c.source}] (score ${Number(c.score).toFixed(3)}): ${c.content}`
  );
  const communityParts = communityMatches.map(
    (c) => `[Community: ${c.title}] ${c.summary}`
  );
  const contextText = assembleContext(vectorParts, entityContext, communityParts);

  // Resolve embedding model name the same way rag.ts does internally
  const embeddingModel =
    process.env.GEMINI_EMBEDDING_MODEL ??
    process.env.RAG_EMBEDDING_MODEL ??
    'gemini-embedding-001';

  return {
    contextText,
    mode,
    vectorChunks: vectorChunks.length,
    entitiesMatched: queryEntities,
    communitiesUsed: communityMatches.map((c) => c.title),
    hopsTraversed,
    usedRag: vectorChunks.length > 0 || hasEntities || hasCommunities,
    chunks: vectorChunks,
    thresholdBypassed: false,
    threshold,
    topK,
    embeddingModel,
  };
}
