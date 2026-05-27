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
