// src/app/lib/graph.ts
import { sql } from '@vercel/postgres';
// GoogleGenerativeAI and reindexRag are imported in Task 7 (reindexGraphRag)
// TODO: getEmbedding will be exported from ./rag in Task 5

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
