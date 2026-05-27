# GraphRAG with Community Summarization — Design Spec
**Date:** 2026-05-27  
**Status:** Approved  
**Scope:** Replace flat vector RAG with Microsoft GraphRAG–style entity graph + community summarization on the portfolio chatbot  

---

## 1. Goals

| Goal | Description |
|------|-------------|
| Better multi-hop answers | Connect dots across entities — e.g. "Which projects used LangChain AND involved financial data?" |
| Portfolio signal | Demonstrate GraphRAG implementation to recruiters and hiring managers |
| Higher retrieval precision | Reduce irrelevant chunks from cosine-similarity-only search |

---

## 2. Constraints

- **Infrastructure:** Vercel + Postgres only — no new databases (pgvector already present)
- **LLM:** Gemini API (existing `GEMINI_API_KEY`) via `@google/generative-ai`
- **Graph construction:** LLM-extracted (auto) — Gemini extracts entities and relationships at reindex time
- **Backward compatibility:** Falls back to pure vector search if graph tables are empty

---

## 3. Schema

Three new Postgres tables alongside existing `rag_documents`:

```sql
-- Entity nodes
CREATE TABLE IF NOT EXISTS graph_nodes (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  type        TEXT NOT NULL,       -- PERSON | ORGANIZATION | PROJECT | TECHNOLOGY | SKILL | ROLE | CONCEPT
  description TEXT NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS graph_nodes_name_idx ON graph_nodes (LOWER(name));

-- Directed relationships between entities
CREATE TABLE IF NOT EXISTS graph_edges (
  id          TEXT PRIMARY KEY,
  source_id   TEXT NOT NULL REFERENCES graph_nodes(id) ON DELETE CASCADE,
  target_id   TEXT NOT NULL REFERENCES graph_nodes(id) ON DELETE CASCADE,
  relation    TEXT NOT NULL,       -- worked_at | studied_at | built | uses | knows | part_of | collaborated_with
  context     TEXT NOT NULL,       -- natural language description of the relationship
  weight      FLOAT NOT NULL DEFAULT 1.0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS graph_edges_source_idx ON graph_edges (source_id);
CREATE INDEX IF NOT EXISTS graph_edges_target_idx ON graph_edges (target_id);

-- Community summaries (connected components of the entity graph)
CREATE TABLE IF NOT EXISTS graph_communities (
  id                 TEXT PRIMARY KEY,
  community_id       INT NOT NULL,
  node_ids           TEXT[] NOT NULL,     -- array of graph_nodes.id in this community
  title              TEXT NOT NULL,
  summary            TEXT NOT NULL,
  summary_embedding  VECTOR(768),         -- for cosine similarity on global queries
  created_at         TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

**Node types for this portfolio domain:**
- `PERSON` — Hemant Kushwaha
- `ORGANIZATION` — NVIDIA, Infosys, UMD, NIT Rourkela
- `PROJECT` — named projects (RAG pipeline, AlphaDesk, etc.)
- `TECHNOLOGY` — Python, LangChain, FastAPI, pgvector, Next.js, etc.
- `SKILL` — RAG, multi-agent systems, LLM orchestration, etc.
- `ROLE` — AI Engineer, ML Engineer, Software Engineer

**Edge relation types:** `worked_at` · `studied_at` · `built` · `uses` · `knows` · `part_of` · `collaborated_with`

---

## 4. Graph Construction Pipeline (Reindex)

Runs when `POST /api/ai/reindex` is called. Replaces `reindexRag()` with `reindexGraphRag()`.

### Stage 1 — Document chunking (unchanged)
`buildDocuments()` from `rag.ts` produces `RagDocument[]` exactly as today.  
Vector embeddings and `rag_documents` upsert proceed unchanged.

### Stage 2 — Entity extraction
For each document chunk, call Gemini with a structured extraction prompt:

```
System: You extract knowledge graph entities and relationships from portfolio text.

User: Extract all named entities and relationships from this text about Hemant Kushwaha's portfolio.

Output ONLY valid JSON in this exact shape:
{
  "entities": [
    { "name": string, "type": "PERSON|ORGANIZATION|PROJECT|TECHNOLOGY|SKILL|ROLE|CONCEPT", "description": string }
  ],
  "relationships": [
    { "source": string, "relation": string, "target": string, "context": string }
  ]
}

Text:
{chunk_content}
```

**Deduplication rule:** Nodes with the same name (case-insensitive, trimmed) are merged — descriptions are concatenated with a separator. Applied before upserting.

**Volume estimate:** ~25–35 extraction calls at reindex time. Zero extraction calls per chat turn.

### Stage 3 — Community detection (pure JS, no library)
1. Build adjacency list from all `graph_edges` rows
2. Run **Union-Find** (path-compressed) over all node IDs
3. Group nodes by root → each group is a community
4. Expected communities for this portfolio: 4–6 (work experience cluster, education cluster, skills/tools cluster, projects cluster)

### Stage 4 — Community summarization
For each community, call Gemini once:

```
System: You summarize clusters of entities from a professional knowledge graph.

User: Summarize this cluster of related entities from Hemant Kushwaha's portfolio.

Entities:
{node_name}: {node_description}
...

Relationships:
{source} --[{relation}]--> {target}: {context}
...

Output ONLY valid JSON:
{ "title": string (3–5 words), "summary": string (2–3 sentences) }
```

Embed the summary with Gemini embedding API → store in `summary_embedding`.

**Volume estimate:** ~4–6 summarization calls at reindex time.

---

## 5. Dual Retrieval at Query Time

Replaces `retrieveRagContext()` with `retrieveGraphRagContext()`. Runs on every chat turn.

### Shared pre-computation (before legs run)

Two calls are made once and reused across all three legs:
1. **Query embedding** — one `embedContent` call; result shared by Leg 1 (vector search) and Leg 3 (community similarity). Not called twice.
2. **Query entity extraction** — one lightweight Gemini generative call to pull named entities from the query text; result used by Leg 2.

Both calls run concurrently via `Promise.all`.

### Three search legs (all run in parallel after pre-computation)

#### Leg 1 — Vector search (unchanged)
Cosine similarity on `rag_documents` using the shared query embedding. Returns top-K chunks.

#### Leg 2 — Local search (entity graph traversal)
1. Use entity names from the shared entity extraction result
2. Match against `graph_nodes` (case-insensitive LIKE)
3. Traverse **1 hop** via `graph_edges` (both directions) for each matched node; expand to **2 hops** only if hop-1 returns fewer than 3 distinct nodes
4. Collect: matched node descriptions + edge `context` strings for all traversed edges

#### Leg 3 — Global search (community similarity)
1. Cosine similarity against `summary_embedding` in `graph_communities` using the shared query embedding
2. Return top-2 community summaries

### Query mode selection (automatic)

| Query contains | Mode |
|----------------|------|
| Proper nouns matching known `graph_nodes` names | Local + Vector |
| Generic / broad ("tell me about", "what kind of", "overview") | Global + Vector |
| Mixed (specific + broad) | All three (hybrid) |

Detection: after entity extraction in Leg 2 — if `entitiesMatched.length > 0` → local mode active; always run global.

### Context assembly

```
[Vector chunks]         ~1800 tokens   (top-4 chunks, existing logic)
[Entity/edge context]    ~800 tokens   (matched node descriptions + relationship contexts)
[Community summaries]    ~600 tokens   (top-2 summaries)
─────────────────────────────────────
Total                   ~3200 tokens   (well within Gemini context window)
```

Deduplication: if the same content appears in both vector chunks and entity context, keep one copy.  
Truncation: hard limit at 3500 tokens before sending to Gemini.

### Graceful fallback
If `graph_nodes` is empty (graph never indexed), `retrieveGraphRagContext()` returns pure vector results — same behavior as the current system, no errors.

---

## 6. File Changes

### New files

| File | Purpose |
|------|---------|
| `src/app/lib/graph.ts` | Schema init, entity extraction, Union-Find community detection, community summarization, `reindexGraphRag()` |
| `src/app/lib/graphrag.ts` | `retrieveGraphRagContext()` — local search, global search, context assembly |

### Modified files

| File | Change |
|------|--------|
| `src/app/lib/rag.ts` | Export `retrieveRagContext` becomes a thin wrapper calling `retrieveGraphRagContext`; `reindexRag` remains for backward compat but `reindexGraphRag` is the new primary |
| `src/app/api/ai/chat/route.ts` | Import `retrieveGraphRagContext` from `graphrag.ts`; extend `ragMeta` response with graph fields |
| `src/app/api/ai/reindex/route.ts` | Call `reindexGraphRag` instead of `reindexRag`; return `nodeCount`, `edgeCount`, `communityCount` |

### New API route

| Route | Method | Purpose |
|-------|--------|---------|
| `src/app/api/ai/graph-status/route.ts` | GET | Returns node count, edge count, community count, last indexed timestamp — admin visibility only (same auth as reindex) |

---

## 7. Chat API Response Format

Extends the existing `rag` metadata field in the chat response:

```typescript
// Current response shape
{ response: string, rag: { mode: string, retrievedChunks: number, ... } }

// New response shape
{
  response: string,
  rag: {
    mode: 'graphrag_local' | 'graphrag_global' | 'graphrag_hybrid' | 'vector_only',
    vectorChunks: number,
    entitiesMatched: string[],    // e.g. ["LangChain", "NVIDIA"]
    communitiesUsed: string[],    // e.g. ["Work Experience & Skills"]
    hopsTraversed: number,        // 0, 1, or 2
    // legacy fields preserved for backward compat:
    retrievedChunks: number,
    thresholdBypassed: boolean,
    threshold: number,
    topK: number,
    embeddingModel: string,
  }
}
```

---

## 8. UI Change

**[chatbot.tsx](src/app/home/aiAssistant/chatbot.tsx)** — one-line metadata pill update below each assistant message.

Current: shows `via RAG` or `via full context`  
After: shows `via GraphRAG · entities: LangChain, NVIDIA` (when entities matched) or `via GraphRAG · community: Work Experience` (when community used)

No other UI changes. The chatbot UX is identical for end users.

---

## 9. What Does Not Change

- `rag_documents` table and all pgvector indexes — untouched
- `buildDocuments()` chunking logic — untouched
- Gemini chat model selection (`GEMINI_MODEL` env var) — untouched
- System prompt in `chat/route.ts` — untouched
- Auth logic on reindex route — untouched
- All other pages and components — untouched

---

## 10. Definition of Done

- [ ] `graph_nodes`, `graph_edges`, `graph_communities` tables created on first reindex
- [ ] Entity extraction runs for all ~25–35 portfolio chunks with valid JSON output
- [ ] Deduplication merges entities with the same normalized name
- [ ] Union-Find produces 4–6 communities covering all nodes
- [ ] Community summaries stored with embeddings
- [ ] `retrieveGraphRagContext()` returns hybrid context (vector + entity + community)
- [ ] Graceful fallback to vector-only when graph is empty
- [ ] Chat API response includes new `rag` metadata fields
- [ ] `GET /api/ai/graph-status` returns accurate counts
- [ ] Chatbot metadata pill shows GraphRAG mode and matched entities
- [ ] No TypeScript errors (`tsc --noEmit` passes)
- [ ] Existing vector search behavior unchanged when graph is populated
