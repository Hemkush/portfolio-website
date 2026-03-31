'use client';
import React from 'react';

interface RoleCardProps {
  title: string;
  organization: string;
  timeline: string;
  description: string;
  accent?: string;
}

export const RoleCard: React.FC<RoleCardProps> = ({ title, organization, timeline, description, accent = '#06b6d4' }) => {
  return (
    <div className="card group relative rounded-2xl overflow-hidden flex flex-col hover:-translate-y-0.5">
      {/* Top accent bar */}
      <div className="h-0.5 w-full" style={{ background: accent }} />

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-white leading-snug">{title}</h3>
            <p className="text-xs font-semibold mt-0.5" style={{ color: accent }}>{organization}</p>
          </div>
          <span className="text-xs font-mono px-2.5 py-1 rounded-lg whitespace-nowrap shrink-0" style={{ background: 'var(--tag-bg)', color: 'var(--muted)', border: '1px solid var(--tag-border)' }}>
            {timeline}
          </span>
        </div>

        <p className="text-xs leading-relaxed flex-1" style={{ color: 'var(--muted)' }}>
          {description}
        </p>
      </div>
    </div>
  );
};
