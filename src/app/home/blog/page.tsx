import type { Metadata } from 'next';
import { GoogleGenerativeAI } from '@google/generative-ai';
import NewsClient from './NewsClient';

export const revalidate = 3600;
export const maxDuration = 10;

export const metadata: Metadata = {
  title: 'AI Landscape',
  description:
    'Latest AI model releases, protocol updates (MCP, A2A), and daily news from across the AI ecosystem — aggregated hourly from Anthropic, OpenAI, Google AI, Hugging Face, and more.',
  openGraph: {
    title: 'AI Landscape — Hemant Kushwaha',
    description:
      'AI model releases, protocol updates, and daily news from Anthropic, OpenAI, Google AI, and more. Updated hourly.',
    url: '/home/blog',
  },
}; // Refresh everything every hour

export interface NewsItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  source: string;
  sourceColor: string;
  category: string;
  insight: string;
}

export interface ModelRelease {
  provider: string;
  modelName: string;
  date: string;
  keyChanges: string[];
}

export interface ProtocolUpdate {
  name: string;
  fullName: string;
  whatChanged: string;
  whyItMatters: string;
}

export interface AIAnalysis {
  digest: string;
  modelReleases: ModelRelease[];
  protocolUpdates: ProtocolUpdate[];
  articles: { category: string; insight: string }[];
}

const RSS_SOURCES = [
  // Provider blogs — primary source for model releases & protocol updates
  { name: 'Anthropic', url: 'https://www.anthropic.com/blog.rss', color: '#d97757' },
  { name: 'OpenAI', url: 'https://openai.com/blog/rss.xml', color: '#10a37f' },
  { name: 'Google AI', url: 'https://blog.google/technology/ai/rss/', color: '#4285f4' },
  { name: 'Simon Willison', url: 'https://simonwillison.net/atom/everything/', color: '#a78bfa' },
  // General AI news
  { name: 'Hugging Face', url: 'https://huggingface.co/blog/feed.xml', color: '#fbbf24' },
  { name: 'The Verge AI', url: 'https://www.theverge.com/ai-artificial-intelligence/rss/index.xml', color: '#f87171' },
  { name: 'VentureBeat AI', url: 'https://venturebeat.com/category/ai/feed/', color: '#34d399' },
  { name: 'MIT Tech Review', url: 'https://www.technologyreview.com/feed/', color: '#60a5fa' },
  { name: 'ArXiv AI', url: 'https://arxiv.org/rss/cs.AI', color: '#e879f9' },
];

function extractTag(chunk: string, tag: string): string {
  const re = new RegExp(
    `<${tag}[^>]*>(?:<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>|([^<]*))<\\/${tag}>`,
    'i'
  );
  const m = re.exec(chunk);
  if (!m) return '';
  return (m[1] ?? m[2] ?? '').trim();
}

function extractLink(chunk: string): string {
  const standard = /<link>([^<]+)<\/link>/i.exec(chunk);
  if (standard) return standard[1].trim();
  const atom = /<link[^>]+href="([^"]+)"/i.exec(chunk);
  if (atom) return atom[1].trim();
  return '';
}

function cleanText(text: string): string {
  return text
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#\d+;/g, '')
    .trim();
}

function parseRSS(xml: string, source: string, color: string): Omit<NewsItem, 'category' | 'insight'>[] {
  const items: Omit<NewsItem, 'category' | 'insight'>[] = [];
  const itemRe = /<item>([\s\S]*?)<\/item>/g;
  // Also handle Atom <entry> tags
  const entryRe = /<entry>([\s\S]*?)<\/entry>/g;

  const processChunk = (chunk: string) => {
    const title = cleanText(extractTag(chunk, 'title'));
    const link = extractLink(chunk);
    const description = cleanText(extractTag(chunk, 'description') || extractTag(chunk, 'summary') || extractTag(chunk, 'content')).slice(0, 220);
    const pubDate = extractTag(chunk, 'pubDate') || extractTag(chunk, 'published') || extractTag(chunk, 'updated');
    if (title && link) {
      items.push({ title, link, description, pubDate, source, sourceColor: color });
    }
  };

  let m;
  while ((m = itemRe.exec(xml)) !== null) processChunk(m[1]);
  while ((m = entryRe.exec(xml)) !== null) processChunk(m[1]);

  return items.slice(0, 10);
}

async function fetchFeed(url: string, source: string, color: string): Promise<Omit<NewsItem, 'category' | 'insight'>[]> {
  try {
    const res = await fetch(url, {
      next: { revalidate: 3600 },
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; portfolio-news-bot/1.0)' },
    });
    if (!res.ok) return [];
    const xml = await res.text();
    return parseRSS(xml, source, color);
  } catch {
    return [];
  }
}

async function analyzeWithGemini(
  articles: Omit<NewsItem, 'category' | 'insight'>[]
): Promise<AIAnalysis> {
  const fallback: AIAnalysis = {
    digest: '',
    modelReleases: [],
    protocolUpdates: [],
    articles: articles.map(() => ({ category: 'General', insight: '' })),
  };

  const key = process.env.GEMINI_API_KEY;
  if (!key || articles.length === 0) return fallback;

  try {
    const ai = new GoogleGenerativeAI(key);
    const model = ai.getGenerativeModel({
      model: process.env.GEMINI_MODEL ?? 'gemini-2.0-flash',
    });

    const articleList = articles
      .map((a, i) => `${i} [${a.source}]: ${a.title} | ${a.description.slice(0, 150)}`)
      .join('\n');

    const result = await model.generateContent(
      `You are an AI industry analyst. Analyze these AI news articles and return a single JSON object.

REQUIRED JSON SHAPE (return nothing else, no markdown):
{
  "digest": "2-3 sentence summary of today's most important AI developments, written for an AI Engineer building LLM systems",
  "modelReleases": [
    {
      "provider": "company name (e.g. Anthropic, OpenAI, Google, Meta, Mistral)",
      "modelName": "exact model name as announced",
      "date": "release date or month/year if mentioned",
      "keyChanges": ["specific capability or change #1", "specific capability or change #2"]
    }
  ],
  "protocolUpdates": [
    {
      "name": "short name e.g. MCP, A2A, OpenAPI",
      "fullName": "full name e.g. Model Context Protocol",
      "whatChanged": "one sentence: what specifically changed or was announced",
      "whyItMatters": "one sentence: practical impact for AI Engineers building agents or integrations"
    }
  ],
  "articles": [
    { "category": "one of: Models, Research, Tools, Industry, Open Source, General", "insight": "max 15 words: why an AI Engineer should care, be specific" }
  ]
}

RULES:
- "modelReleases": only include if an article explicitly announces a new or updated AI model. Empty array [] if none.
- "protocolUpdates": only include protocols, standards, specs, or agent frameworks (MCP, A2A, tool use specs, agent SDKs, etc.). Empty array [] if none.
- "articles" array must be same length and order as input.
- Never hallucinate releases or updates not mentioned in the articles.

Articles:
${articleList}`
    );

    const text = result.response.text().trim().replace(/```json\n?|\n?```/g, '').trim();
    const parsed: AIAnalysis = JSON.parse(text);

    if (
      typeof parsed.digest === 'string' &&
      Array.isArray(parsed.modelReleases) &&
      Array.isArray(parsed.protocolUpdates) &&
      Array.isArray(parsed.articles) &&
      parsed.articles.length === articles.length
    ) {
      return parsed;
    }
  } catch {
    // fall through to fallback
  }

  return fallback;
}

export default async function AILandscapePage() {
  const results = await Promise.all(
    RSS_SOURCES.map((s) => fetchFeed(s.url, s.name, s.color))
  );

  const rawArticles = results
    .flat()
    .sort((a, b) => {
      const da = new Date(a.pubDate).getTime();
      const db = new Date(b.pubDate).getTime();
      return (Number.isNaN(db) ? 0 : db) - (Number.isNaN(da) ? 0 : da);
    })
    .slice(0, 40);

  const analysis = await analyzeWithGemini(rawArticles);

  const articles: NewsItem[] = rawArticles.map((a, i) => ({
    ...a,
    category: analysis.articles[i]?.category ?? 'General',
    insight: analysis.articles[i]?.insight ?? '',
  }));

  return (
    <NewsClient
      articles={articles}
      digest={analysis.digest}
      modelReleases={analysis.modelReleases}
      protocolUpdates={analysis.protocolUpdates}
    />
  );
}
