'use client';

import { useState, useEffect, useRef } from 'react';
import { PROVIDERS, type Model, type Provider } from './modelData';

const SPEED_ORDER = { 'Very Fast': 4, 'Fast': 3, 'Medium': 2, 'Slow': 1 };
const COST_COLOR: Record<string, string> = {
  'Free tier': '#34d399',
  '$': '#a3e635',
  '$$': '#fbbf24',
  '$$$': '#f87171',
};
const SPEED_COLOR: Record<string, string> = {
  'Very Fast': '#34d399',
  'Fast': '#a3e635',
  'Medium': '#fbbf24',
  'Slow': '#f87171',
};

function CapabilityBar({ name, score, color, animate }: { name: string; score: number; color: string; animate: boolean }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-slate-400">{name}</span>
        <span className="text-xs font-semibold" style={{ color }}>{score}</span>
      </div>
      <div className="h-1.5 bg-slate-700/60 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: animate ? `${score}%` : '0%',
            background: `linear-gradient(90deg, ${color}99, ${color})`,
          }}
        />
      </div>
    </div>
  );
}

function LatestModelCard({ model, color }: { model: Model; color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(false);
    const t = setTimeout(() => setAnimate(true), 80);
    return () => clearTimeout(t);
  }, [model.name]);

  return (
    <div
      ref={ref}
      className="rounded-lg p-5 border h-full"
      style={{ borderColor: `${color}40`, background: `${color}08` }}
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-widest mb-2 inline-block"
            style={{ background: `${color}22`, color, border: `1px solid ${color}44` }}
          >
            Latest
          </span>
          <h3 className="text-lg font-bold text-slate-100 mt-1">{model.name}</h3>
          <p className="text-xs text-slate-500 mt-0.5">Released {model.releasedDate}</p>
        </div>
        <div className="text-right shrink-0">
          <div className="text-xs text-slate-500 mb-1">Context</div>
          <div className="text-sm font-semibold text-slate-200">{model.contextWindow}</div>
        </div>
      </div>

      {/* What's new */}
      <div className="mb-5">
        <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-2">What&apos;s New</div>
        <ul className="space-y-1.5">
          {model.whatsNew.map((item) => (
            <li key={item} className="flex gap-2 text-xs text-slate-300 leading-snug">
              <span style={{ color }} className="mt-0.5 shrink-0">▸</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Capability bars */}
      <div className="space-y-2.5">
        <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-2">Capability Indicators</div>
        {model.capabilities.map((cap) => (
          <CapabilityBar key={cap.name} name={cap.name} score={cap.score} color={color} animate={animate} />
        ))}
        <p className="text-[10px] text-slate-600 pt-1">Relative indicators based on public benchmarks</p>
      </div>
    </div>
  );
}

function ModelsTable({ models, color, activeModel, onSelect }: {
  models: Model[];
  color: string;
  activeModel: Model;
  onSelect: (m: Model) => void;
}) {
  return (
    <div className="rounded-lg border border-slate-700/50 overflow-hidden">
      <div className="text-[10px] uppercase tracking-widest text-slate-500 px-4 py-3 border-b border-slate-700/50 bg-slate-800/30">
        All Models — click to explore
      </div>
      <div className="divide-y divide-slate-700/40">
        {models.map((model) => {
          const isActive = model.name === activeModel.name;
          return (
            <button
              key={model.name}
              onClick={() => onSelect(model)}
              className="w-full text-left px-4 py-3 transition-colors hover:bg-slate-700/30"
              style={isActive ? { background: `${color}0d`, borderLeft: `3px solid ${color}` } : { borderLeft: '3px solid transparent' }}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-medium text-slate-200 truncate">{model.name}</span>
                    {model.isLatest && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded font-bold uppercase" style={{ background: `${color}22`, color }}>
                        Latest
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{model.bestFor}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-medium" style={{ color: SPEED_COLOR[model.speed] }}>
                    {model.speed}
                  </span>
                  <span className="text-xs font-semibold" style={{ color: COST_COLOR[model.costTier] }}>
                    {model.costTier}
                  </span>
                  <span className="text-[10px] text-slate-600 hidden sm:block">{model.contextWindow}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ProviderTab({ provider, active, onClick }: { provider: Provider; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg border transition-all duration-150"
      style={
        active
          ? { background: `${provider.color}18`, borderColor: `${provider.color}60`, color: provider.color }
          : { background: 'transparent', borderColor: 'rgba(255,255,255,0.08)', color: '#64748b' }
      }
    >
      {provider.name}
      <span className="text-[10px] opacity-60">{provider.models.length} models</span>
    </button>
  );
}

export default function ModelTracker() {
  const [activeProviderId, setActiveProviderId] = useState(PROVIDERS[0].id);
  const provider = PROVIDERS.find((p) => p.id === activeProviderId) ?? PROVIDERS[0];
  const [activeModel, setActiveModel] = useState<Model>(provider.models.find((m) => m.isLatest) ?? provider.models[0]);

  // Reset selected model when provider changes
  const handleProviderChange = (p: Provider) => {
    setActiveProviderId(p.id);
    setActiveModel(p.models.find((m) => m.isLatest) ?? p.models[0]);
  };

  return (
    <section className="mb-12">
      {/* Section header */}
      <div className="mb-6">
        <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Model Tracker</div>
        <h2 className="text-2xl font-bold text-slate-100">AI Model Landscape</h2>
        <p className="text-sm text-slate-400 mt-1">
          Latest models, capabilities, and updates from Gemini, Anthropic, and OpenAI.
        </p>
      </div>

      {/* Provider tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {PROVIDERS.map((p) => (
          <ProviderTab
            key={p.id}
            provider={p}
            active={p.id === activeProviderId}
            onClick={() => handleProviderChange(p)}
          />
        ))}
      </div>

      {/* Content: hero card + table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <LatestModelCard model={activeModel} color={provider.color} />
        <div className="flex flex-col gap-4">
          <ModelsTable
            models={provider.models}
            color={provider.color}
            activeModel={activeModel}
            onSelect={setActiveModel}
          />
          {/* Last verified badge */}
          <p className="text-[11px] text-slate-600 text-right">
            Data last verified: {provider.lastVerified} &mdash; update{' '}
            <code className="text-slate-500">modelData.ts</code> when new models release
          </p>
        </div>
      </div>
    </section>
  );
}
