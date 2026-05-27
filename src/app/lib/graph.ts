// src/app/lib/graph.ts
import { sql } from '@vercel/postgres';
import { GoogleGenerativeAI } from '@google/generative-ai';
// reindexRag and getEmbedding are imported dynamically inside reindexGraphRag
// to avoid pulling rag.ts (and its JSX dependencies) into the unit-test module graph.

// ─── Types ────────────────────────────────────────────────────────────────────

export type NodeType =
  | 'PERSON'
  | 'ORGANIZATION'
  | 'PROJECT'
  | 'TECHNOLOGY'
  | 'SKILL'
  | 'ROLE'
  | 'CONCEPT';

export type GraphNode = {
  id: string;
  name: string;
  type: NodeType;
  description: string;
};

export type GraphEdge = {
  id: string;
  sourceId: string;
  targetId: string;
  relation: string;
  context: string;
  weight: number;
};

export type ExtractedEntity = {
  name: string;
  type: string;
  description: string;
};

export type ExtractedRelationship = {
  source: string;
  relation: string;
  target: string;
  context: string;
};

export type ExtractionResult = {
  entities: ExtractedEntity[];
  relationships: ExtractedRelationship[];
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function stableNodeId(value: string): string {
  return Buffer.from(value).toString('base64').replace(/=+$/, '').slice(0, 180);
}

// ─── Community detection (Union-Find) ────────────────────────────────────────

export function detectCommunities(
  nodeIds: string[],
  edges: Array<{ sourceId: string; targetId: string }>
): Map<string, number> {
  const parent = new Map<string, string>();
  const rank = new Map<string, number>();

  for (const id of nodeIds) {
    parent.set(id, id);
    rank.set(id, 0);
  }

  function find(x: string): string {
    if (parent.get(x) !== x) {
      parent.set(x, find(parent.get(x)!));
    }
    return parent.get(x)!;
  }

  function union(x: string, y: string): void {
    const rx = find(x);
    const ry = find(y);
    if (rx === ry) return;
    const rankX = rank.get(rx) ?? 0;
    const rankY = rank.get(ry) ?? 0;
    if (rankX < rankY) {
      parent.set(rx, ry);
    } else if (rankX > rankY) {
      parent.set(ry, rx);
    } else {
      parent.set(ry, rx);
      rank.set(rx, rankX + 1);
    }
  }

  for (const edge of edges) {
    if (parent.has(edge.sourceId) && parent.has(edge.targetId)) {
      union(edge.sourceId, edge.targetId);
    }
  }

  // Map each root to a sequential integer community ID
  const rootToCommunityId = new Map<string, number>();
  let nextId = 0;
  const result = new Map<string, number>();
  for (const id of nodeIds) {
    const root = find(id);
    if (!rootToCommunityId.has(root)) {
      rootToCommunityId.set(root, nextId++);
    }
    result.set(id, rootToCommunityId.get(root)!);
  }
  return result;
}

// ─── Entity deduplication ─────────────────────────────────────────────────────

export function deduplicateEntities(results: ExtractionResult[]): {
  nodes: Map<string, GraphNode>;
  edges: GraphEdge[];
} {
  const nodesByNorm = new Map<string, GraphNode>();
  const seenEdgeKeys = new Set<string>();
  const edges: GraphEdge[] = [];

  // Pass 1: merge nodes by normalised name
  for (const result of results) {
    for (const entity of result.entities) {
      const norm = entity.name.toLowerCase().trim();
      if (!norm) continue;
      if (nodesByNorm.has(norm)) {
        const existing = nodesByNorm.get(norm)!;
        if (entity.description && !existing.description.includes(entity.description)) {
          existing.description = `${existing.description} | ${entity.description}`;
        }
      } else {
        nodesByNorm.set(norm, {
          id: stableNodeId(norm),
          name: entity.name.trim(),
          type: (entity.type as NodeType) ?? 'CONCEPT',
          description: entity.description ?? '',
        });
      }
    }
  }

  // Pass 2: resolve and deduplicate edges
  for (const result of results) {
    for (const rel of result.relationships) {
      const srcNorm = rel.source.toLowerCase().trim();
      const tgtNorm = rel.target.toLowerCase().trim();
      const srcNode = nodesByNorm.get(srcNorm);
      const tgtNode = nodesByNorm.get(tgtNorm);
      if (!srcNode || !tgtNode) continue;

      const edgeKey = `${srcNode.id}:${rel.relation}:${tgtNode.id}`;
      if (seenEdgeKeys.has(edgeKey)) continue;
      seenEdgeKeys.add(edgeKey);

      edges.push({
        id: stableNodeId(edgeKey),
        sourceId: srcNode.id,
        targetId: tgtNode.id,
        relation: rel.relation,
        context: rel.context ?? '',
        weight: 1.0,
      });
    }
  }

  return { nodes: nodesByNorm, edges };
}

// ─── Schema init ──────────────────────────────────────────────────────────────

let graphTableInitPromise: Promise<void> | null = null;

export async function ensureGraphTables(): Promise<void> {
  if (!graphTableInitPromise) {
    graphTableInitPromise = (async () => {
      await sql`CREATE EXTENSION IF NOT EXISTS vector`;
      await sql`
        CREATE TABLE IF NOT EXISTS graph_nodes (
          id          TEXT PRIMARY KEY,
          name        TEXT NOT NULL,
          type        TEXT NOT NULL,
          description TEXT NOT NULL,
          created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;
      await sql`CREATE INDEX IF NOT EXISTS graph_nodes_name_idx ON graph_nodes (LOWER(name))`;
      await sql`
        CREATE TABLE IF NOT EXISTS graph_edges (
          id          TEXT PRIMARY KEY,
          source_id   TEXT NOT NULL REFERENCES graph_nodes(id) ON DELETE CASCADE,
          target_id   TEXT NOT NULL REFERENCES graph_nodes(id) ON DELETE CASCADE,
          relation    TEXT NOT NULL,
          context     TEXT NOT NULL,
          weight      FLOAT NOT NULL DEFAULT 1.0,
          created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;
      await sql`CREATE INDEX IF NOT EXISTS graph_edges_source_idx ON graph_edges (source_id)`;
      await sql`CREATE INDEX IF NOT EXISTS graph_edges_target_idx ON graph_edges (target_id)`;
      await sql`
        CREATE TABLE IF NOT EXISTS graph_communities (
          id                TEXT PRIMARY KEY,
          community_id      INT NOT NULL,
          node_ids          TEXT[] NOT NULL,
          title             TEXT NOT NULL,
          summary           TEXT NOT NULL,
          summary_embedding VECTOR(768),
          created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;
      await sql`CREATE INDEX IF NOT EXISTS graph_communities_community_id_idx ON graph_communities (community_id)`;
    })().catch((err) => {
      graphTableInitPromise = null;
      throw err;
    });
  }
  await graphTableInitPromise;
}

// ─── Entity extraction (Gemini) ───────────────────────────────────────────────

const EXTRACTION_PROMPT = `Extract all named entities and relationships from this portfolio text.
Return ONLY valid JSON — no markdown fences, no explanation:
{
  "entities": [{"name": string, "type": "PERSON|ORGANIZATION|PROJECT|TECHNOLOGY|SKILL|ROLE|CONCEPT", "description": string}],
  "relationships": [{"source": string, "relation": string, "target": string, "context": string}]
}

Valid relation values: worked_at, studied_at, built, uses, knows, part_of, collaborated_with, related_to

Text:`;

export async function extractEntitiesFromChunk(
  content: string,
  genAI: GoogleGenerativeAI
): Promise<ExtractionResult> {
  const modelName =
    process.env.GEMINI_EXTRACTION_MODEL ??
    process.env.GEMINI_MODEL ??
    'gemini-2.0-flash';
  const model = genAI.getGenerativeModel({ model: modelName });

  try {
    const result = await model.generateContent(`${EXTRACTION_PROMPT}\n${content}`);
    let text = result.response.text().trim();
    // Strip markdown code fences if the model wraps the output
    text = text.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
    const parsed = JSON.parse(text) as {
      entities?: ExtractedEntity[];
      relationships?: ExtractedRelationship[];
    };
    return {
      entities: Array.isArray(parsed.entities) ? parsed.entities : [],
      relationships: Array.isArray(parsed.relationships) ? parsed.relationships : [],
    };
  } catch (err) {
    console.warn(
      '[graph] extractEntitiesFromChunk failed for chunk starting with:',
      content.slice(0, 80),
      err
    );
    return { entities: [], relationships: [] };
  }
}

// ─── Reindex orchestrator ─────────────────────────────────────────────────────

export async function reindexGraphRag(genAI: GoogleGenerativeAI): Promise<{
  nodeCount: number;
  edgeCount: number;
  communityCount: number;
}> {
  // Dynamic imports keep rag.ts (and its JSX dependencies) out of the unit-test module graph
  const { reindexRag, getEmbedding: _getEmbedding } = await import('./rag');

  // Stage 1: rebuild rag_documents (vector index) — reuses existing logic
  await reindexRag(genAI);

  // Ensure graph tables exist (idempotent)
  await ensureGraphTables();

  // Clear previous graph data — order matters due to FK constraints
  await sql`DELETE FROM graph_communities`;
  await sql`DELETE FROM graph_edges`;
  await sql`DELETE FROM graph_nodes`;

  // Stage 2: entity extraction — one Gemini call per rag_documents row
  const docsResult = await sql<{ id: string; source: string; content: string }>`
    SELECT id, source, content FROM rag_documents ORDER BY source
  `;
  const docs = docsResult.rows ?? [];
  console.log(`[graph] Extracting entities from ${docs.length} document chunks…`);

  const allResults: ExtractionResult[] = [];
  for (const doc of docs) {
    const result = await extractEntitiesFromChunk(doc.content, genAI);
    allResults.push(result);
  }

  // Stage 3: deduplication + upsert nodes and edges
  const { nodes, edges } = deduplicateEntities(allResults);
  console.log(`[graph] Deduped: ${nodes.size} nodes, ${edges.length} edges`);

  for (const node of nodes.values()) {
    await sql`
      INSERT INTO graph_nodes (id, name, type, description)
      VALUES (${node.id}, ${node.name}, ${node.type}, ${node.description})
      ON CONFLICT (id) DO UPDATE
        SET name = EXCLUDED.name,
            type = EXCLUDED.type,
            description = EXCLUDED.description
    `;
  }

  for (const edge of edges) {
    await sql`
      INSERT INTO graph_edges (id, source_id, target_id, relation, context, weight)
      VALUES (${edge.id}, ${edge.sourceId}, ${edge.targetId}, ${edge.relation}, ${edge.context}, ${edge.weight})
      ON CONFLICT (id) DO UPDATE
        SET relation = EXCLUDED.relation,
            context  = EXCLUDED.context
    `;
  }

  // Stage 4: community detection (pure JS — no DB round-trip needed)
  const nodeIds = Array.from(nodes.values()).map((n) => n.id);
  const edgePairs = edges.map((e) => ({ sourceId: e.sourceId, targetId: e.targetId }));
  const communityMap = detectCommunities(nodeIds, edgePairs);

  // Group GraphNode objects by community ID
  const communityGroups = new Map<number, GraphNode[]>();
  for (const node of nodes.values()) {
    const cid = communityMap.get(node.id) ?? 0;
    if (!communityGroups.has(cid)) communityGroups.set(cid, []);
    communityGroups.get(cid)!.push(node);
  }

  // Stage 5: summarise each community with Gemini + embed + upsert
  const modelName =
    process.env.GEMINI_EXTRACTION_MODEL ??
    process.env.GEMINI_MODEL ??
    'gemini-2.0-flash';
  const model = genAI.getGenerativeModel({ model: modelName });

  for (const [communityId, communityNodes] of communityGroups.entries()) {
    const communityNodeIds = new Set(communityNodes.map((n) => n.id));
    const communityEdges = edges.filter(
      (e) => communityNodeIds.has(e.sourceId) && communityNodeIds.has(e.targetId)
    );

    const nodeLines = communityNodes
      .map((n) => `${n.name} (${n.type}): ${n.description}`)
      .join('\n');
    const edgeLines =
      communityEdges
        .map((e) => {
          const src = communityNodes.find((n) => n.id === e.sourceId)?.name ?? e.sourceId;
          const tgt = communityNodes.find((n) => n.id === e.targetId)?.name ?? e.targetId;
          return `${src} --[${e.relation}]--> ${tgt}: ${e.context}`;
        })
        .join('\n') || '(no intra-community edges)';

    const summaryPrompt = `Summarise this cluster of entities from Hemant Kushwaha's professional knowledge graph.

Entities:
${nodeLines}

Relationships:
${edgeLines}

Output ONLY valid JSON — no markdown fences:
{"title": "3-5 word title", "summary": "2-3 sentence summary of what this cluster represents"}`;

    let title = `Community ${communityId}`;
    let summary = communityNodes.map((n) => n.description).join(' ');

    try {
      const res = await model.generateContent(summaryPrompt);
      let text = res.response.text().trim();
      text = text.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
      const parsed = JSON.parse(text) as { title?: string; summary?: string };
      title = parsed.title?.trim() || title;
      summary = parsed.summary?.trim() || summary;
    } catch (err) {
      console.warn(`[graph] Community ${communityId} summarisation failed, using fallback:`, err);
    }

    // Embed the summary for global similarity search
    const embeddingValues = await _getEmbedding(summary, genAI);
    const vector = `[${embeddingValues.join(',')}]`;
    const communityRowId = `community:${communityId}`;
    const nodeIdsArr = communityNodes.map((n) => n.id) as unknown as string;

    await sql`
      INSERT INTO graph_communities (id, community_id, node_ids, title, summary, summary_embedding)
      VALUES (
        ${communityRowId},
        ${communityId},
        ${nodeIdsArr}::text[],
        ${title},
        ${summary},
        ${vector}::vector
      )
      ON CONFLICT (id) DO UPDATE
        SET node_ids          = EXCLUDED.node_ids,
            title             = EXCLUDED.title,
            summary           = EXCLUDED.summary,
            summary_embedding = EXCLUDED.summary_embedding
    `;
  }

  // Return counts
  const [nc, ec, cc] = await Promise.all([
    sql`SELECT COUNT(*)::int AS count FROM graph_nodes`,
    sql`SELECT COUNT(*)::int AS count FROM graph_edges`,
    sql`SELECT COUNT(*)::int AS count FROM graph_communities`,
  ]);

  return {
    nodeCount: Number(nc.rows[0]?.count ?? 0),
    edgeCount: Number(ec.rows[0]?.count ?? 0),
    communityCount: Number(cc.rows[0]?.count ?? 0),
  };
}
