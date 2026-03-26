'use client';

import { useState } from 'react';
import type { ModelRelease, ProtocolUpdate } from './page';

const PROVIDER_COLORS: Record<string, string> = {
  anthropic: '#d97757',
  openai: '#10a37f',
  google: '#4285f4',
  gemini: '#4285f4',
  meta: '#1877f2',
  mistral: '#ff7043',
  deepmind: '#4285f4',
  deepseek: '#60a5fa',
  xai: '#e2e8f0',
  default: '#64748b',
};

function providerColor(provider: string): string {
  const key = provider.toLowerCase();
  for (const [k, v] of Object.entries(PROVIDER_COLORS)) {
    if (key.includes(k)) return v;
  }
  return PROVIDER_COLORS.default;
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="text-3xl mb-3 opacity-30">◌</div>
      <p className="text-sm text-slate-500">{message}</p>
      <p className="text-xs text-slate-600 mt-1">Check back in the next news cycle.</p>
    </div>
  );
}

function ReleaseCard({ release }: { release: ModelRelease }) {
  const color = providerColor(release.provider);
  return (
    <div
      className="rounded-lg border p-5 transition-colors hover:bg-slate-800/60"
      style={{ borderColor: `${color}30`, background: `${color}06` }}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <span
          className="text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wider"
          style={{ color, background: `${color}18`, border: `1px solid ${color}30` }}
        >
          {release.provider}
        </span>
        {release.date && (
          <span className="text-xs text-slate-500 shrink-0">{release.date}</span>
        )}
      </div>
      <h3 className="text-sm font-semibold text-slate-100 mb-3">{release.modelName}</h3>
      {release.keyChanges.length > 0 && (
        <ul className="space-y-1.5">
          {release.keyChanges.map((change, i) => (
            <li key={i} className="flex gap-2 text-xs text-slate-300 leading-snug">
              <span className="mt-0.5 shrink-0" style={{ color }}>▸</span>
              {change}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ProtocolCard({ update }: { update: ProtocolUpdate }) {
  return (
    <div className="rounded-lg border border-cyan-500/20 bg-cyan-500/05 p-5 hover:bg-cyan-500/10 transition-colors">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-xs font-bold px-2 py-0.5 rounded uppercase tracking-widest bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
          {update.name}
        </span>
        {update.fullName && update.fullName !== update.name && (
          <span className="text-xs text-slate-500 truncate">{update.fullName}</span>
        )}
      </div>
      <p className="text-sm text-slate-200 leading-relaxed mb-3">{update.whatChanged}</p>
      <div className="flex gap-2 pt-3 border-t border-slate-700/50">
        <span className="text-cyan-500 text-xs mt-0.5 shrink-0">✦</span>
        <p className="text-xs text-cyan-400/80 leading-relaxed">{update.whyItMatters}</p>
      </div>
    </div>
  );
}

type Tab = 'releases' | 'protocols';

export default function AIInsights({
  modelReleases,
  protocolUpdates,
}: {
  modelReleases: ModelRelease[];
  protocolUpdates: ProtocolUpdate[];
}) {
  const [activeTab, setActiveTab] = useState<Tab>('releases');

  const tabs: { id: Tab; label: string; count: number }[] = [
    { id: 'releases', label: 'Model Releases', count: modelReleases.length },
    { id: 'protocols', label: 'Protocols & Standards', count: protocolUpdates.length },
  ];

  return (
    <section className="mb-12">
      <div className="mb-6">
        <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">AI Developments</div>
        <h2 className="text-2xl font-bold text-slate-100">What&apos;s New</h2>
        <p className="text-sm text-slate-400 mt-1">
          Model releases, protocols, and industry standards — extracted from provider blogs and AI news.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-150 ${
              activeTab === tab.id
                ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300'
                : 'bg-slate-800/40 border-slate-700/50 text-slate-400 hover:text-slate-200 hover:border-slate-600'
            }`}
          >
            {tab.label}
            <span
              className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${
                tab.count > 0
                  ? activeTab === tab.id
                    ? 'bg-cyan-500/30 text-cyan-300'
                    : 'bg-slate-700 text-slate-400'
                  : 'bg-slate-800 text-slate-600'
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 'releases' && (
        modelReleases.length === 0
          ? <EmptyState message="No new model releases detected in the current news cycle." />
          : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
              {modelReleases.map((release, i) => (
                <ReleaseCard key={`${release.modelName}-${i}`} release={release} />
              ))}
            </div>
          )
      )}

      {activeTab === 'protocols' && (
        protocolUpdates.length === 0
          ? <EmptyState message="No protocol or standard updates detected in the current news cycle." />
          : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {protocolUpdates.map((update, i) => (
                <ProtocolCard key={`${update.name}-${i}`} update={update} />
              ))}
            </div>
          )
      )}

      <p className="mt-4 text-[11px] text-slate-600">
        ✦ Auto-extracted by Gemini from provider blogs and AI news — refreshed hourly
      </p>
    </section>
  );
}
