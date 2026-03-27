"use client";
import React, { useState } from 'react';
import type { Project } from '../sectionType';

interface ProjectCardProps {
  project: Project;
}

const CATEGORY_CONFIG = {
  ai:         { label: 'AI / LLM',      accent: '#06b6d4', bg: 'bg-cyan-500/10',   text: 'text-cyan-300',   border: 'border-cyan-500/40' },
  data:       { label: 'Data Science',  accent: '#f59e0b', bg: 'bg-amber-500/10',  text: 'text-amber-300',  border: 'border-amber-500/40' },
  fullstack:  { label: 'Full-Stack',    accent: '#a855f7', bg: 'bg-purple-500/10', text: 'text-purple-300', border: 'border-purple-500/40' },
  consulting: { label: 'Consulting',    accent: '#10b981', bg: 'bg-emerald-500/10',text: 'text-emerald-300',border: 'border-emerald-500/40' },
} as const;

const DEFAULT_CAT = { label: 'Project', accent: '#6b7280', bg: 'bg-gray-500/10', text: 'text-gray-300', border: 'border-gray-500/40' };

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const cat = project.category ? CATEGORY_CONFIG[project.category] : DEFAULT_CAT;
  const needsToggle = project.description.length > 200;

  return (
    <div
      className="group relative bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden flex flex-col shadow-lg transition-all duration-300 hover:border-gray-600/70 hover:shadow-xl hover:-translate-y-0.5"
      style={{ '--accent': cat.accent } as React.CSSProperties}
    >
      {/* Category accent bar */}
      <div className="h-1 w-full" style={{ background: cat.accent }} />

      <div className="p-6 flex flex-col flex-1 gap-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-white leading-snug group-hover:text-white/90 transition-colors">
              {project.name}
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">{project.timeline}</p>
          </div>

          <div className="flex items-center gap-2 shrink-0 mt-0.5">
            {project.ongoing && (
              <span className="flex items-center gap-1 bg-cyan-500/15 text-cyan-300 text-xs font-semibold px-2.5 py-1 rounded-full border border-cyan-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                Live
              </span>
            )}
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${cat.bg} ${cat.text} ${cat.border}`}>
              {cat.label}
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="flex-1">
          <p className={`text-sm text-gray-300 leading-relaxed transition-all duration-300 ${!isExpanded && needsToggle ? 'line-clamp-4' : ''}`}>
            {project.description}
          </p>
          {needsToggle && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs font-semibold mt-1.5 transition-colors"
              style={{ color: cat.accent }}
              aria-expanded={isExpanded}
            >
              {isExpanded ? '↑ Show less' : '↓ Show more'}
            </button>
          )}
        </div>

        {/* Footer */}
        <div className="mt-auto space-y-3 pt-4 border-t border-gray-700/40">
          {/* Skills */}
          <div className="flex flex-wrap gap-1.5">
            {project.skills.map((skill) => (
              <span
                key={skill}
                className="bg-gray-800 text-gray-300 text-xs font-medium px-2.5 py-0.5 rounded-full border border-gray-700/60 hover:border-gray-500/60 transition-colors cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Links */}
          {(project.githubUrl || project.liveUrl) && (
            <div className="flex items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-semibold text-gray-300 hover:text-white border border-gray-600 hover:border-gray-400 rounded-lg px-3 py-1.5 transition-all duration-200 hover:bg-gray-800/60"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  GitHub
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-semibold rounded-lg px-3 py-1.5 transition-all duration-200 border"
                  style={{ color: cat.accent, borderColor: `${cat.accent}50`, background: `${cat.accent}12` }}
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Live
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
