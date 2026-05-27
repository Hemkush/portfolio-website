// src/app/lib/graphrag.ts
// NOTE: rag.ts imports (getEmbedding, ensureRagBootstrap, queryVectorDocuments,
// retrieveRagContext) are intentionally NOT statically imported here.
// rag.ts pulls in @/app/home/constant (JSX/TSX) which breaks vitest's module graph.
// All rag imports are done dynamically inside the functions that use them (Task 9),
// keeping this module test-safe while assembleContext remains a pure function.

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
 */
export function assembleContext(
  vectorParts: string[],
  entityPart: string,
  communityParts: string[],
  _maxTokens = 3500 // reserved for future hard cap
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
  if (vectorLines.length > 0) {
    sections.push('--- Vector Retrieved Context ---\n' + vectorLines.join('\n\n'));
  }

  // Entity/graph context — truncate to ENTITY_TOKEN_BUDGET tokens worth of chars
  const trimmedEntity = entityPart.trim().slice(0, ENTITY_TOKEN_BUDGET * 4);
  if (trimmedEntity) {
    sections.push('--- Graph Entity Context ---\n' + trimmedEntity);
  }

  // Community summaries — up to COMMUNITY_TOKEN_BUDGET tokens
  const communityLines: string[] = [];
  let communityTokens = 0;
  for (const part of communityParts) {
    const t = countTokensApprox(part);
    if (communityTokens + t > COMMUNITY_TOKEN_BUDGET) break;
    communityLines.push(part);
    communityTokens += t;
  }
  if (communityLines.length > 0) {
    sections.push('--- Community Summaries ---\n' + communityLines.join('\n\n'));
  }

  return sections.join('\n\n');
}
