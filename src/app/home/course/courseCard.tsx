'use client';
import { useState } from 'react';
import React from 'react';

export default function CourseCard({ name, description, date, skills, ongoing, platform }: {
  name: string;
  description: string;
  date: string;
  // skills may arrive as a JS array or a raw PostgreSQL array string like "{Python,SQL}"
  skills: string[] | string | null | undefined;
  ongoing?: boolean;
  platform?: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const safeDesc = description ?? '';
  const needsToggle = safeDesc.length > 220;

  // Normalise skills to a clean string array regardless of DB format
  const skillsArray: string[] = Array.isArray(skills)
    ? skills
    : typeof skills === 'string'
      ? skills.replace(/^\{|\}$/g, '').split(',').map(s => s.trim()).filter(Boolean)
      : [];

  return (
    <div className="card rounded-xl p-5 flex flex-col gap-3 hover:-translate-y-0.5">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-bold leading-snug" style={{ color: 'var(--foreground)' }}>{name}</h3>
          {platform && (
            <p className="text-xs font-semibold mt-0.5" style={{ color: 'var(--accent)' }}>{platform}</p>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0 mt-0.5">
          {ongoing ? (
            <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{ background: 'rgba(16,185,129,0.12)', color: '#10b981', border: '1px solid rgba(16,185,129,0.3)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Ongoing
            </span>
          ) : (
            <span className="text-xs font-mono px-2.5 py-1 rounded-lg"
              style={{ background: 'var(--tag-bg)', color: 'var(--muted)', border: '1px solid var(--tag-border)' }}>
              {date}
            </span>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="flex-1">
        <p className={`text-sm leading-relaxed ${!isExpanded && needsToggle ? 'line-clamp-4' : ''}`}
          style={{ color: 'var(--muted)' }}>
          {safeDesc}
        </p>
        {needsToggle && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs font-semibold mt-1.5 transition-colors"
            style={{ color: 'var(--accent)' }}
            aria-expanded={isExpanded}
          >
            {isExpanded ? '↑ Show less' : '↓ Show more'}
          </button>
        )}
      </div>

      {/* Skills */}
      {skillsArray.length > 0 && (
        <div className="pt-3" style={{ borderTop: '1px solid var(--card-border)' }}>
          <div className="flex flex-wrap gap-1.5">
            {skillsArray.map((skill) => (
              <span key={skill} className="skill-tag">{skill}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
