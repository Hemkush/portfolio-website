import { GoogleGenerativeAI } from '@google/generative-ai';
import { sql } from '@vercel/postgres';
import { getCoursework, getPosts } from '@/app/lib/data';
import {
  CONTACT_DETAILS,
  COURSES_DATA,
  EDUCATION_DATA,
  GRADUATE_COURSES_DATA,
  INTRODUCTION,
  LEADERSHIP_ROLES_DATA,
  OBJECTIVE,
  PROJECT_DATA,
  SKILLS_DATA,
  SKILLS_SOFT,
  SOCIAL_LINKS,
  VOLUNTEER_EXPERIENCE_DATA,
  WORK_EXPERIENCE_DATA,
  getPortfolioContext,
} from '@/app/home/constant';
import { DIFFERENTIATORS, PROJECTS, PROOF_POINTS, SKILL_CATEGORIES } from '@/app/ui/ai-expertise/data';

type RagDocument = {
  id: string;
  source: string;
  content: string;
};

type CourseRecord = {
  course_name?: string | null;
  course_description?: string | null;
  learned_skills?: string | null;
  course_completion_year?: string | null;
  course_platform?: string | null;
  course_status?: string | number | null;
};

type RetrievedChunk = {
  id: string;
  source: string;
  content: string;
  score: number;
};

let ragTableInitPromise: Promise<void> | null = null;
let ragBootstrapPromise: Promise<void> | null = null;
let resolvedEmbeddingModel: string | null = null;

const DEFAULT_TOP_K = 4;
const DEFAULT_SIMILARITY_THRESHOLD = 0.55;
const DEFAULT_EMBEDDING_MODEL = 'gemini-embedding-001';
const VECTOR_DIMENSION = 768;

function normalizeWhitespace(text: string) {
  return text.replace(/\s+/g, ' ').trim();
}

function chunkText(input: string, maxLen = 1200, overlap = 200): string[] {
  const text = normalizeWhitespace(input);
  if (!text) return [];
  if (text.length <= maxLen) return [text];

  const chunks: string[] = [];
  let start = 0;
  while (start < text.length) {
    const end = Math.min(start + maxLen, text.length);
    chunks.push(text.slice(start, end));
    if (end === text.length) break;
    start = Math.max(0, end - overlap);
  }
  return chunks;
}

function toVectorLiteral(values: number[]) {
  return `[${values.join(',')}]`;
}

function stableId(value: string) {
  // Deterministic and URL-safe enough for primary key usage in this context.
  return Buffer.from(value).toString('base64').replace(/=+$/g, '').slice(0, 180);
}

function safeJson(value: unknown) {
  return JSON.stringify(value, (_key, val) => {
    if (typeof val === 'function') return undefined;
    if (typeof val === 'object' && val !== null && 'props' in (val as Record<string, unknown>)) {
      return 'react_node';
    }
    return val;
  });
}

function getEmbeddingModelCandidates() {
  const configured = process.env.GEMINI_EMBEDDING_MODEL ?? process.env.RAG_EMBEDDING_MODEL ?? '';
  const fromEnv = configured
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);

  return Array.from(new Set([...fromEnv, DEFAULT_EMBEDDING_MODEL, 'embedding-001']));
}

function normalizeVectorDimension(values: number[]) {
  if (values.length === VECTOR_DIMENSION) return values;
  if (values.length > VECTOR_DIMENSION) return values.slice(0, VECTOR_DIMENSION);
  return [...values, ...new Array(VECTOR_DIMENSION - values.length).fill(0)];
}

async function ensureRagTable() {
  if (!ragTableInitPromise) {
    ragTableInitPromise = (async () => {
      await sql`CREATE EXTENSION IF NOT EXISTS vector;`;
      await sql`
        CREATE TABLE IF NOT EXISTS rag_documents (
          id TEXT PRIMARY KEY,
          source TEXT NOT NULL,
          content TEXT NOT NULL,
          embedding VECTOR(768) NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
      `;
    })().catch((error) => {
      ragTableInitPromise = null;
      throw error;
    });
  }

  await ragTableInitPromise;
}

async function getEmbedding(text: string, genAI: GoogleGenerativeAI) {
  const modelsToTry = resolvedEmbeddingModel ? [resolvedEmbeddingModel] : getEmbeddingModelCandidates();
  let lastError: unknown = null;

  for (const modelName of modelsToTry) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.embedContent(text);
      const values = result.embedding.values;
      if (!values || values.length === 0) {
        throw new Error('Embedding response is empty.');
      }
      resolvedEmbeddingModel = modelName;
      return normalizeVectorDimension(values);
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error('Failed to generate embedding with all configured models.');
}

async function buildDocuments(): Promise<RagDocument[]> {
  const portfolioContext = getPortfolioContext();
  const posts = await getPosts();
  const coursework = (await getCoursework()) as CourseRecord[];
  const docs: RagDocument[] = [];

  chunkText(portfolioContext).forEach((chunk, index) => {
    const source = 'portfolio_context';
    docs.push({
      id: stableId(`${source}:${index}:${chunk.slice(0, 120)}`),
      source,
      content: chunk,
    });
  });

  (posts ?? []).forEach((post, postIndex) => {
    const title = normalizeWhitespace(post?.title?.toString?.() ?? '');
    const content = normalizeWhitespace(post?.content?.toString?.() ?? '');
    const combined = normalizeWhitespace(`Title: ${title}\n${content}`);
    chunkText(combined, 1000, 120).forEach((chunk, chunkIndex) => {
      const source = `post:${title || postIndex}`;
      docs.push({
        id: stableId(`${source}:${chunkIndex}:${chunk.slice(0, 120)}`),
        source,
        content: chunk,
      });
    });
  });

  const aiExpertiseContext = normalizeWhitespace(`
    AI Expertise Skill Categories: ${safeJson(SKILL_CATEGORIES)}
    AI Expertise Projects: ${safeJson(PROJECTS)}
    AI Expertise Proof Points: ${safeJson(PROOF_POINTS)}
    AI Expertise Differentiators: ${safeJson(DIFFERENTIATORS)}
  `);

  chunkText(aiExpertiseContext, 1100, 120).forEach((chunk, index) => {
    const source = 'page:ai-expertise';
    docs.push({
      id: stableId(`${source}:${index}:${chunk.slice(0, 120)}`),
      source,
      content: chunk,
    });
  });

  const aboutBlock = normalizeWhitespace(`
    Page: About
    Heading: ${INTRODUCTION.greeting}
    Title: ${INTRODUCTION.title}
    Introduction: ${INTRODUCTION.text}
    Objective: ${OBJECTIVE}
    Technical skills listed: ${safeJson(SKILLS_DATA)}
    Soft skills listed: ${safeJson(SKILLS_SOFT)}
    Education summary: ${safeJson(EDUCATION_DATA)}
  `);

  docs.push({
    id: stableId(`page:about:${aboutBlock.slice(0, 160)}`),
    source: 'page:about',
    content: aboutBlock,
  });

  const experienceBlock = normalizeWhitespace(`
    Page: Experience
    Header: Professional Journey
    Description: My experiences in the industry, leadership, and community.
    Work experience entries: ${safeJson(WORK_EXPERIENCE_DATA)}
    Leadership roles entries: ${safeJson(LEADERSHIP_ROLES_DATA)}
    Volunteer experience entries: ${safeJson(VOLUNTEER_EXPERIENCE_DATA)}
  `);

  chunkText(experienceBlock, 1100, 120).forEach((chunk, index) => {
    const source = 'page:experience';
    docs.push({
      id: stableId(`${source}:${index}:${chunk.slice(0, 120)}`),
      source,
      content: chunk,
    });
  });

  const contactBlock = normalizeWhitespace(`
    Page: Contact
    Header: Get In Touch
    Description: I am always open to discussing new projects, creative ideas, or opportunities to connect.
    Response time: Usually replies within 24-48 hours.
    Contact details: ${safeJson(CONTACT_DETAILS)}
    Social links: ${safeJson(SOCIAL_LINKS.map((link) => ({ name: link.name, url: link.url })))}
  `);

  docs.push({
    id: stableId(`page:contact:${contactBlock.slice(0, 160)}`),
    source: 'page:contact',
    content: contactBlock,
  });

  const courseworkSummary = coursework.map((course) => ({
    name: course.course_name ?? '',
    description: course.course_description ?? '',
    skills: course.learned_skills ?? '',
    year: course.course_completion_year ?? '',
    platform: course.course_platform ?? '',
    ongoing: course.course_status ?? '',
  }));

  const courseBlock = normalizeWhitespace(`
    Page: Course
    Header: My Learning Journey
    Description: A collection of my academic and self-paced learning activities.
    Static graduate coursework: ${safeJson(GRADUATE_COURSES_DATA)}
    Static online coursework: ${safeJson(COURSES_DATA)}
    Dynamic coursework records from database: ${safeJson(courseworkSummary)}
    Project data references: ${safeJson(PROJECT_DATA)}
  `);

  chunkText(courseBlock, 1100, 120).forEach((chunk, index) => {
    const source = 'page:course';
    docs.push({
      id: stableId(`${source}:${index}:${chunk.slice(0, 120)}`),
      source,
      content: chunk,
    });
  });

  return docs;
}

async function upsertDocuments(documents: RagDocument[], genAI: GoogleGenerativeAI) {
  if (documents.length === 0) return;

  for (const doc of documents) {
    const embedding = await getEmbedding(doc.content, genAI);
    const vector = toVectorLiteral(embedding);
    await sql`
      INSERT INTO rag_documents (id, source, content, embedding)
      VALUES (${doc.id}, ${doc.source}, ${doc.content}, ${vector}::vector)
      ON CONFLICT (id) DO UPDATE
      SET source = EXCLUDED.source,
          content = EXCLUDED.content,
          embedding = EXCLUDED.embedding;
    `;
  }
}

async function ensureRagBootstrap(genAI: GoogleGenerativeAI) {
  if (!ragBootstrapPromise) {
    ragBootstrapPromise = (async () => {
      await ensureRagTable();
      const countResult = await sql`SELECT COUNT(*)::int AS count FROM rag_documents;`;
      const count = Number(countResult.rows?.[0]?.count ?? 0);
      if (count > 0) return;

      const docs = await buildDocuments();
      await upsertDocuments(docs, genAI);
    })().catch((error) => {
      ragBootstrapPromise = null;
      throw error;
    });
  }

  await ragBootstrapPromise;
}

export async function retrieveRagContext(query: string, genAI: GoogleGenerativeAI) {
  await ensureRagBootstrap(genAI);
  const queryEmbedding = await getEmbedding(query, genAI);
  const queryVector = toVectorLiteral(queryEmbedding);
  const topK = Number(process.env.RAG_TOP_K ?? DEFAULT_TOP_K);
  const threshold = Number(process.env.RAG_SIMILARITY_THRESHOLD ?? DEFAULT_SIMILARITY_THRESHOLD);

  const result = await sql<RetrievedChunk>`
    SELECT
      id,
      source,
      content,
      1 - (embedding <=> ${queryVector}::vector) AS score
    FROM rag_documents
    ORDER BY embedding <=> ${queryVector}::vector
    LIMIT ${topK};
  `;

  const allRows = result.rows ?? [];
  const filteredChunks = allRows.filter((row) => Number(row.score ?? 0) >= threshold);
  const chunks = filteredChunks.length > 0 ? filteredChunks : allRows;
  const thresholdBypassed = filteredChunks.length === 0 && allRows.length > 0;
  const contextText = chunks
    .map((row, index) => `Chunk ${index + 1} [${row.source}] (score ${Number(row.score).toFixed(3)}): ${row.content}`)
    .join('\n\n');

  return {
    chunks,
    contextText,
    usedRag: chunks.length > 0,
    thresholdBypassed,
    topK,
    threshold,
    embeddingModel: resolvedEmbeddingModel ?? 'unknown',
  };
}

export async function reindexRag(genAI: GoogleGenerativeAI) {
  await ensureRagTable();
  const docs = await buildDocuments();
  await upsertDocuments(docs, genAI);
  return { indexedDocuments: docs.length };
}
