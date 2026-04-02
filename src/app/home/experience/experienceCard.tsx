'use client';
import React from 'react';
import type { WorkExperience } from '../sectionType';

interface ExperienceCardProps {
  experience: WorkExperience;
  index: number;
}

// Accent colour cycling for visual variety
const ACCENTS = ['#06b6d4', '#a855f7', '#10b981', '#f59e0b', '#ec4899', '#6366f1'] as const;

export const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience, index }) => {
  const accent = ACCENTS[index % ACCENTS.length];

  return (
    <div className="group relative flex gap-0">
      {/* Timeline connector */}
      <div className="relative flex flex-col items-center mr-6 shrink-0">
        {/* Dot */}
        <div
          className="w-4 h-4 rounded-full border-2 z-10 mt-1 shrink-0 transition-transform duration-300 group-hover:scale-110"
          style={{ background: accent, borderColor: 'var(--background)' }}
        />
        {/* Vertical line */}
        <div className="w-px flex-1 mt-2" style={{ background: `${accent}35` }} />
      </div>

      {/* Card */}
      <div className="flex-1 mb-10">
        <div className="card relative rounded-2xl overflow-hidden">
          {/* Left accent stripe */}
          <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl" style={{ background: accent }} />

          <div className="pl-6 pr-6 pt-5 pb-5">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
              <div>
                <h3 className="text-lg font-bold text-white leading-tight">{experience.role}</h3>
                <p className="text-sm font-semibold mt-0.5" style={{ color: accent }}>{experience.company}</p>
              </div>
              <span className="text-xs font-mono px-3 py-1.5 rounded-lg whitespace-nowrap self-start sm:self-auto" style={{ background: 'var(--tag-bg)', color: 'var(--muted)', border: '1px solid var(--tag-border)' }}>
                {experience.timeline}
              </span>
            </div>

            {/* Description bullets */}
            <ul className="space-y-2">
              {experience.description.map((point, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                  <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5" style={{ background: accent }} />
                  {point}
                </li>
              ))}
            </ul>

            {/* Skills */}
            <div className="mt-4 pt-4" style={{ borderTop: '1px solid var(--card-border)' }}>
              <div className="flex flex-wrap gap-1.5">
                {experience.skills.map((skill) => (
                  <span key={skill} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>

            {/* Links */}
            {(experience.caseStudyUrl || experience.liveUrl) && (
              <div className="mt-4 pt-4 flex flex-wrap gap-2.5" style={{ borderTop: '1px solid var(--card-border)' }}>
                {experience.caseStudyUrl && (
                  <a
                    href={experience.caseStudyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-semibold rounded-lg px-3 py-1.5 transition-all duration-200"
                    style={{ color: accent, borderColor: `${accent}50`, background: `${accent}12`, border: `1px solid ${accent}50` }}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Project Deep Dive
                  </a>
                )}
                {experience.liveUrl && (
                  <a
                    href={experience.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-semibold text-gray-300 hover:text-white border border-gray-600 hover:border-gray-400 rounded-lg px-3 py-1.5 transition-all duration-200 hover:bg-gray-800/60"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Live Site
                  </a>
                )}
              </div>
            )}

            {/* Recommendation */}
            {experience.recommendation && (
              <div className="mt-4 pt-4" style={{ borderTop: '1px solid var(--card-border)' }}>
                <div className="rounded-xl p-4 relative" style={{ background: `${accent}08`, border: `1px solid ${accent}22` }}>
                  <svg className="absolute top-3 left-3 w-5 h-5 opacity-35" style={{ color: accent }} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <blockquote className="pl-8">
                    <p className="text-sm italic leading-relaxed" style={{ color: 'var(--muted)' }}>{experience.recommendation.text}</p>
                    <footer className="text-right mt-2">
                      <cite className="text-xs not-italic" style={{ color: 'var(--muted-strong)' }}>
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
