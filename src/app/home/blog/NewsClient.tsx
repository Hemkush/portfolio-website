'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { NewsItem, ModelRelease, ProtocolUpdate } from './page';
import AIInsights from './AIInsights';
import { AnimatedPageHeader, FadeUp, Stagger, StaggerItem } from '@/app/ui/components/animations';

const CATEGORIES = ['All', 'Models', 'Research', 'Tools', 'Industry', 'Open Source', 'General'];

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function formatDate(pubDate: string): string {
  if (!pubDate) return '';
  const d = new Date(pubDate);
  if (Number.isNaN(d.getTime())) return '';
  return `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

function NewsCard({ article }: { article: NewsItem }) {
  return (
    <motion.a
      href={article.link}
      target="_blank"
      rel="noreferrer noopener"
      className="group flex flex-col bg-slate-800/50 border border-slate-700/50 rounded-lg p-5 transition-colors duration-200"
      whileHover={{
        y: -5,
        borderColor: 'rgba(6,182,212,0.4)',
        background: 'rgba(30,41,59,0.9)',
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center justify-between gap-3 mb-3">
        <span
          className="text-xs font-semibold px-2 py-0.5 rounded"
          style={{
            color: article.sourceColor,
            background: `${article.sourceColor}18`,
            border: `1px solid ${article.sourceColor}30`,
          }}
        >
          {article.source}
        </span>
        <span className="text-xs text-slate-500 shrink-0">{formatDate(article.pubDate)}</span>
      </div>

      <h3 className="text-sm font-semibold text-slate-100 group-hover:text-cyan-300 transition-colors leading-snug mb-2 line-clamp-2">
        {article.title}
      </h3>

      {article.description && (
        <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 mb-3">
          {article.description}
        </p>
      )}

      {article.insight && (
        <div className="mt-auto pt-3 border-t border-slate-700/50">
          <p className="text-xs text-cyan-400/80 leading-relaxed">
            <span className="text-cyan-600 font-semibold mr-1">✦ Why it matters:</span>
            {article.insight}
          </p>
        </div>
      )}

      <div className="mt-3 flex items-center justify-between">
        <span className="text-xs text-slate-500 bg-slate-700/50 px-2 py-0.5 rounded">
          {article.category}
        </span>
        <span className="text-xs text-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity">
          Read →
        </span>
      </div>
    </motion.a>
  );
}

export default function NewsClient({
  articles,
  digest,
  modelReleases,
  protocolUpdates,
}: {
  articles: NewsItem[];
  digest: string;
  modelReleases: ModelRelease[];
  protocolUpdates: ProtocolUpdate[];
}) {
  const [active, setActive] = useState('All');

  const filtered = active === 'All' ? articles : articles.filter((a) => a.category === active);

  const counts = CATEGORIES.reduce<Record<string, number>>((acc, cat) => {
    acc[cat] = cat === 'All' ? articles.length : articles.filter((a) => a.category === cat).length;
    return acc;
  }, {});

  return (
    <div className="page-shell">
      <AnimatedPageHeader
        title="AI Landscape"
        subtitle="Model releases, protocols, daily digest, and latest news — updated hourly."
      />

      {/* AI Developments section */}
      <FadeUp delay={0.1}>
        <AIInsights modelReleases={modelReleases} protocolUpdates={protocolUpdates} />
      </FadeUp>

      {/* News section header */}
      <FadeUp delay={0.15}>
        <div className="mb-6 pt-2 border-t border-slate-700/50">
          <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-1 mt-6">Latest News</div>
          <h2 className="text-2xl font-bold text-slate-100">Today in AI</h2>
          <p className="text-sm text-slate-400 mt-1">
            Aggregated from provider blogs, Hugging Face, The Verge, VentureBeat, MIT Tech Review, and ArXiv.
          </p>
        </div>
      </FadeUp>

      {/* AI-generated digest */}
      {digest && (
        <FadeUp delay={0.2}>
          <div className="mb-8 rounded-lg border border-cyan-500/20 bg-cyan-500/5 p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-cyan-400 text-sm">✦</span>
              <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest">
                AI Digest
              </span>
              <span className="text-xs text-slate-600 ml-auto">Gemini-generated summary</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">{digest}</p>
          </div>
        </FadeUp>
      )}

      {/* Category filter */}
      <FadeUp delay={0.25}>
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.filter((cat) => counts[cat] > 0).map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActive(cat)}
              className={`text-xs px-3 py-1.5 rounded-md border transition-colors duration-150 font-medium ${
                active === cat
                  ? 'bg-cyan-500/20 border-cyan-400/60 text-cyan-300'
                  : 'bg-slate-800/50 border-slate-700/50 text-slate-400 hover:border-slate-500 hover:text-slate-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat}
              <span className="ml-1.5 text-[10px] opacity-60">{counts[cat]}</span>
            </motion.button>
          ))}
        </div>
      </FadeUp>

      {/* News grid with filter transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          {filtered.length === 0 ? (
            <p className="text-slate-500 text-sm text-center py-16">
              No articles available right now — check back soon.
            </p>
          ) : (
            <Stagger className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3" staggerDelay={0.05}>
              {filtered.map((article, idx) => (
                <StaggerItem key={`${article.link}-${idx}`}>
                  <NewsCard article={article} />
                </StaggerItem>
              ))}
            </Stagger>
          )}
        </motion.div>
      </AnimatePresence>

      <p className="mt-10 text-xs text-slate-600 text-center">
        Sources: Anthropic · OpenAI · Google AI · Simon Willison · Hugging Face · The Verge · VentureBeat · MIT Tech Review · ArXiv &mdash; refreshed hourly
      </p>
    </div>
  );
}
