'use client';
import { useState } from 'react';
import React from 'react';
import type { WorkExperience } from '../sectionType';

interface ExperienceCardProps {
  experience: WorkExperience;
  index: number;
}

// Accent colour cycling for visual variety
const ACCENTS = ['#06b6d4', '#a855f7', '#10b981', '#f59e0b', '#ec4899', '#6366f1'] as const;

export const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const accent = ACCENTS[index % ACCENTS.length];
  const needsToggle = experience.description.length > 3;

  return (
    <div className="group relative flex gap-0">
      {/* Timeline connector */}
      <div className="relative flex flex-col items-center mr-6 shrink-0">
        {/* Dot */}
        <div
          className="w-4 h-4 rounded-full border-2 border-gray-900 ring-2 z-10 mt-1 shrink-0 transition-transform duration-300 group-hover:scale-110"
          style={{ background: accent, outlineColor: accent }}
        />
        {/* Vertical line */}
        <div className="w-px flex-1 mt-2" style={{ background: `${accent}30` }} />
      </div>

      {/* Card */}
      <div className="flex-1 mb-10">
        <div
          className="relative bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 group-hover:border-gray-600/70 group-hover:shadow-xl"
        >
          {/* Left accent stripe */}
          <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl" style={{ background: accent }} />

          <div className="pl-6 pr-6 pt-5 pb-5">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
              <div>
                <h3 className="text-lg font-bold text-white leading-tight">{experience.role}</h3>
                <p className="text-sm font-semibold mt-0.5" style={{ color: accent }}>{experience.company}</p>
              </div>
              <span className="text-xs text-gray-400 bg-gray-800/80 border border-gray-700/60 rounded-lg px-3 py-1.5 whitespace-nowrap self-start sm:self-auto font-mono">
                {experience.timeline}
              </span>
            </div>

            {/* Description bullets */}
            <ul className={`space-y-2 ${!isExpanded && needsToggle ? 'line-clamp-[7]' : ''}`}>
              {experience.description.map((point, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-gray-300 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5" style={{ background: accent }} />
                  {point}
                </li>
              ))}
            </ul>
            {needsToggle && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-xs font-semibold mt-2 transition-colors"
                style={{ color: accent }}
                aria-expanded={isExpanded}
              >
                {isExpanded ? '↑ Show less' : `↓ Show ${experience.description.length - 3} more`}
              </button>
            )}

            {/* Skills */}
            <div className="mt-4 pt-4 border-t border-gray-700/40">
              <div className="flex flex-wrap gap-1.5">
                {experience.skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-gray-800 text-gray-300 text-xs font-medium px-2.5 py-0.5 rounded-full border border-gray-700/60 hover:border-gray-500/60 transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Recommendation */}
            {experience.recommendation && (
              <div className="mt-4 pt-4 border-t border-gray-700/40">
                <div className="rounded-xl p-4 relative" style={{ background: `${accent}08`, border: `1px solid ${accent}25` }}>
                  <svg className="absolute top-3 left-3 w-5 h-5 opacity-40" style={{ color: accent }} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <blockquote className="pl-8">
                    <p className="text-sm text-gray-300 italic leading-relaxed">{experience.recommendation.text}</p>
                    <footer className="text-right mt-2">
                      <cite className="text-xs text-gray-400 not-italic">
                        — {experience.recommendation.name}, {experience.recommendation.title}
                      </cite>
                    </footer>
                  </blockquote>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
