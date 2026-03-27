'use client';
import { useState } from 'react';
import React from 'react';

interface RoleCardProps {
  title: string;
  organization: string;
  timeline: string;
  description: string;
  accent?: string;
}

export const RoleCard: React.FC<RoleCardProps> = ({ title, organization, timeline, description, accent = '#06b6d4' }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const needsToggle = description.length > 180;

  return (
    <div
      className="group relative bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden shadow-md flex flex-col transition-all duration-300 hover:border-gray-600/70 hover:shadow-lg hover:-translate-y-0.5"
    >
      {/* Top accent bar */}
      <div className="h-0.5 w-full" style={{ background: accent }} />

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-white leading-snug">{title}</h3>
            <p className="text-xs font-semibold mt-0.5" style={{ color: accent }}>{organization}</p>
          </div>
          <span className="text-xs text-gray-400 bg-gray-800/80 border border-gray-700/60 rounded-lg px-2.5 py-1 whitespace-nowrap font-mono shrink-0">
            {timeline}
          </span>
        </div>

        <p className={`text-xs text-gray-300 leading-relaxed flex-1 ${!isExpanded && needsToggle ? 'line-clamp-4' : ''}`}>
          {description}
        </p>
        {needsToggle && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs font-semibold mt-1.5 text-left transition-colors"
            style={{ color: accent }}
            aria-expanded={isExpanded}
          >
            {isExpanded ? '↑ Show less' : '↓ Show more'}
          </button>
        )}
      </div>
    </div>
  );
};
