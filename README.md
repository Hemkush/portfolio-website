# Hemant Kushwaha — AI Engineer Portfolio

Personal portfolio website built with Next.js 15 App Router, showcasing AI engineering work, skills, and experience. Features a **GraphRAG-powered AI chatbot** (Microsoft GraphRAG-style: entity graph + community detection + hybrid retrieval) and a live AI Landscape news feed powered by Gemini.

**Live:** [hemant-kushwaha.vercel.app](https://hemant-kushwaha.vercel.app)

---

## Features

- **AI Expertise landing page** — skills, proof points, project evidence, and differentiators
- **About** — background, education, and profile
- **Experience** — professional timeline
- **Projects** — shipped AI and full-stack projects
- **Coursework** — MS Information Systems coursework at UMD
- **AI Landscape** — live news feed aggregated hourly from Anthropic, OpenAI, Google AI, Hugging Face, VentureBeat, and MIT Tech Review. Gemini analyzes each batch: categorizes articles, extracts model releases, protocol updates (MCP, A2A), and writes a daily digest with per-article "why it matters" insights
- **AI Chatbot** — GraphRAG-powered assistant. Gemini extracts typed entities (PERSON, ORGANIZATION, PROJECT, TECHNOLOGY, SKILL, ROLE, CONCEPT) and relationships from portfolio content, persisted in a PostgreSQL knowledge graph. At query time, three parallel retrieval legs (local 1–2 hop graph traversal + global community similarity + vector cosine search) are merged and fed to Gemini, auto-selecting the best mode: `graphrag_hybrid`, `graphrag_local`, `graphrag_global`, or `vector_only`
- **Contact** — contact form
- **Resume** — downloadable PDF served from `/public/resume.pdf`

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router, ISR) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Fonts | Geist, DM Mono, Bebas Neue (next/font/google) |
| AI | Google Gemini (`@google/generative-ai`) |
| GraphRAG | Entity graph + Union-Find community detection + hybrid retrieval |
| Vector store | Gemini embeddings + PostgreSQL pgvector (`rag_documents`) |
| Knowledge graph | PostgreSQL (`graph_nodes`, `graph_edges`, `graph_communities`) |
| Database | PostgreSQL (Neon) |
| Testing | Vitest |
| Deployment | Vercel |

---

## Project Structure

```
src/
  app/
    page.tsx                  # AI Expertise landing page (root)
    layout.tsx                # Root layout — nav, fonts, metadata, chatbot
    globals.css               # Global styles and keyframe animations
    home/
      about/                  # About page
      experience/             # Experience timeline
      project/                # Projects showcase
      course/                 # Coursework
      contact/                # Contact form
      blog/                   # AI Landscape — live news + Gemini analysis
        page.tsx              # Server component: RSS fetch + Gemini (ISR 1h)
        NewsClient.tsx        # Client component: filter tabs, news grid
        AIInsights.tsx        # Client component: model releases + protocol updates
        loading.tsx           # Loading skeleton
      aiAssistant/
        chatbot.tsx           # Floating GraphRAG chatbot UI
    api/
      ai/
        chat/route.ts         # Chatbot API — Gemini + GraphRAG retrieval
        reindex/route.ts      # GraphRAG reindex endpoint (5-stage pipeline)
        graph-status/route.ts # GET graph stats (node/edge/community counts)
        generate-blog/        # Blog generation (admin)
      contactApi/route.ts     # Contact form submission
    lib/
      rag.ts                  # Vector RAG pipeline (embed, store, retrieve)
      graph.ts                # GraphRAG: entity extraction, Union-Find, community summarization, reindexGraphRag()
      graphrag.ts             # GraphRAG retrieval: assembleContext(), local/global search, retrieveGraphRagContext()
      __tests__/
        graphrag.test.ts      # Vitest unit tests for assembleContext
        graph.test.ts         # Vitest unit tests for detectCommunities + deduplicateEntities
    ui/
      ai-expertise/           # Landing page components and data
      components/
        nav-link.tsx          # Responsive nav with hamburger menu
        cta-button.tsx        # Reusable CTA button (cva variants)
  public/
    resume.pdf                # Downloadable resume
    profile.png               # OG image
```

---

## Environment Variables

Create a `.env` file at the root:

```env
# Gemini
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash-lite
GEMINI_EMBEDDING_MODEL=gemini-embedding-001

# PostgreSQL (Neon)
POSTGRES_URL=your_postgres_connection_string
POSTGRES_URL_NON_POOLING=your_postgres_non_pooling_string

# RAG
RAG_EMBEDDING_MODEL=gemini-embedding-001
RAG_TOP_K=4
RAG_SIMILARITY_THRESHOLD=0.55
RAG_REINDEX_TOKEN=your_secure_token

# Auth (NextAuth)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# Admin
ADMIN_EMAILS=your@email.com

# Site URL (for metadata/OG tags)
NEXT_PUBLIC_SITE_URL=https://hemant-kushwaha.vercel.app
```

Add all variables to the Vercel dashboard under **Project → Settings → Environment Variables** for production.

---

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## GraphRAG Reindex

### When to reindex

Run a reindex whenever portfolio content changes. This includes:

- Adding or updating a **project** in `src/app/home/constant.tsx` → `PROJECT_DATA`
- Updating **work experience** in `WORK_EXPERIENCE_DATA`
- Changing **skills**, **education**, or **about** text (`INTRODUCTION`, `OBJECTIVE`, `SKILLS_DATA`)
- Adding a new **course** or **certification** to `COURSES_DATA`
- Updating **leadership roles** or **volunteer experience**
- Any change to the flat text exported by `getPortfolioContext()` in `constant.tsx`

> **Rule of thumb:** if you edited `constant.tsx` or any data file consumed by `getPortfolioContext()`, reindex.

---

### What reindex does (5-stage pipeline)

```
Stage 1 — Rebuild vector store
  Chunks all portfolio text → embeds with Gemini → upserts into rag_documents (pgvector)

Stage 2 — Entity extraction
  For each rag_documents row, calls Gemini to extract:
    Entities  → { name, type (PERSON | ORGANIZATION | PROJECT | TECHNOLOGY | SKILL | ROLE | CONCEPT), description }
    Relations → { source, relation (worked_at | built | uses | knows | ...), target, context }

Stage 3 — Deduplication + graph upsert
  Merges entities by normalised name (case-insensitive)
  Upserts deduplicated nodes → graph_nodes
  Upserts deduplicated edges → graph_edges

Stage 4 — Community detection (Union-Find)
  Groups connected nodes into communities using Union-Find with path compression + union by rank
  No DB round-trip — pure in-memory TypeScript

Stage 5 — Community summarization + embedding
  For each community: Gemini writes a title + summary from the member nodes/edges
  Summary is embedded with Gemini → stored in graph_communities (summary_embedding VECTOR(768))
  Used at query time for global similarity search
```

The reindex is **fully atomic per stage** — each stage clears and rebuilds from scratch, so partial runs do not leave stale data.

---

### How to run reindex

#### Option A: curl (recommended for local and production)

**Local:**
```bash
curl -X POST "http://localhost:3000/api/ai/reindex" \
  -H "x-rag-reindex-token: YOUR_RAG_REINDEX_TOKEN"
```

**Production:**
```bash
curl -X POST "https://hemant-kushwaha.vercel.app/api/ai/reindex" \
  -H "x-rag-reindex-token: YOUR_RAG_REINDEX_TOKEN"
```

#### Option B: PowerShell

```powershell
# Local
$token = "YOUR_RAG_REINDEX_TOKEN"
Invoke-RestMethod `
  -Uri "http://localhost:3000/api/ai/reindex" `
  -Method Post `
  -Headers @{ "x-rag-reindex-token" = $token }

# Production
Invoke-RestMethod `
  -Uri "https://hemant-kushwaha.vercel.app/api/ai/reindex" `
  -Method Post `
  -Headers @{ "x-rag-reindex-token" = $token }
```

#### Option C: Admin session (browser)

Sign in with an `ADMIN_EMAILS` address, then `POST /api/ai/reindex` (no token header needed).

---

### Expected reindex response

```json
{
  "message": "GraphRAG index updated successfully.",
  "nodeCount": 87,
  "edgeCount": 142,
  "communityCount": 12,
  "extractionFailures": 0
}
```

| Field | Meaning |
|---|---|
| `nodeCount` | Unique entities stored in `graph_nodes` |
| `edgeCount` | Unique relationships stored in `graph_edges` |
| `communityCount` | Communities detected by Union-Find and summarized |
| `extractionFailures` | Chunks where Gemini returned empty entities (warn if > 5) |

A healthy reindex typically produces **60–120 nodes**, **100–200 edges**, and **8–20 communities** depending on portfolio size.

---

### Verifying the graph after reindex

Use the graph-status endpoint to check counts and the last reindex timestamp:

```bash
# Local
curl "http://localhost:3000/api/ai/graph-status" \
  -H "x-rag-reindex-token: YOUR_RAG_REINDEX_TOKEN"

# Production
curl "https://hemant-kushwaha.vercel.app/api/ai/graph-status" \
  -H "x-rag-reindex-token: YOUR_RAG_REINDEX_TOKEN"
```

Expected response:

```json
{
  "nodeCount": 87,
  "edgeCount": 142,
  "communityCount": 12,
  "lastIndexedAt": "2026-05-27T14:32:11.000Z"
}
```

If `nodeCount` is 0 the graph is not yet built — run a reindex.  
If `communityCount` is 0 but `nodeCount` > 0 — Stage 5 failed; check `GEMINI_API_KEY`.

---

### Environment variables required for reindex

All must be set in `.env` (local) and in Vercel dashboard (production):

```env
GEMINI_API_KEY=your_gemini_api_key          # Entity extraction + summarization + embeddings
GEMINI_MODEL=gemini-2.0-flash               # Used for extraction and summarization
GEMINI_EMBEDDING_MODEL=gemini-embedding-001 # Used for vector and community embeddings
POSTGRES_URL=your_neon_connection_string    # Write access to graph_nodes/edges/communities
RAG_REINDEX_TOKEN=your_secure_random_token  # Must match x-rag-reindex-token header
```

> **Production note:** `RAG_REINDEX_TOKEN` must also be added to Vercel under  
> **Project → Settings → Environment Variables → Production**.  
> After adding it, trigger a redeploy so the new value is picked up.

---

### Running unit tests

```bash
npm test
```

Runs Vitest tests for:
- `assembleContext` — token-budget caps, cross-section dedup, empty input, hard cap
- `detectCommunities` — Union-Find correctness, disconnected components, self-loops
- `deduplicateEntities` — name normalisation, description merging, edge dedup

---

## AI Landscape — How It Works

1. Six RSS feeds are fetched in parallel on page load (ISR, cached 1 hour): Anthropic, OpenAI, Google AI, Hugging Face, VentureBeat AI, MIT Tech Review
2. Each feed has a 4.5s abort timeout to stay within Vercel's 10s function limit
3. Top 21 articles sorted by date are sent to Gemini in a single call
4. Gemini returns structured JSON: daily digest, model releases, protocol updates (MCP/A2A), and per-article category + insight
5. Results are cached for 1 hour via Next.js ISR (`revalidate = 3600`)

---

## Deployment

Deployed on Vercel. Push to `main` triggers automatic deployment.

```bash
npm run build   # Verify build locally before pushing
```
