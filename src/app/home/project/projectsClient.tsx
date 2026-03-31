'use client';
import React, { useState } from 'react';
import type { Project } from '../sectionType';
import type { ProjectEvidence } from './projectEvidence';
import { ProjectCard } from './projectCard';

type FilterCategory = 'all' | 'ai' | 'data' | 'fullstack' | 'consulting';

const FILTERS: { value: FilterCategory; label: string; color: string }[] = [
  { value: 'all',        label: 'All',          color: '#9ca3af' },
  { value: 'ai',         label: 'AI / LLM',     color: '#06b6d4' },
  { value: 'data',       label: 'Data Science',  color: '#f59e0b' },
  { value: 'fullstack',  label: 'Full-Stack',    color: '#a855f7' },
  { value: 'consulting', label: 'Consulting',    color: '#10b981' },
];

interface ProjectsClientProps {
  projects: Project[];
  evidence: ProjectEvidence[];
}

export const ProjectsClient: React.FC<ProjectsClientProps> = ({ projects, evidence }) => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');

  const sorted = [...projects].sort((a, b) => Number(b.ongoing) - Number(a.ongoing));
  const filtered = activeFilter === 'all'
    ? sorted
    : sorted.filter((p) => p.category === activeFilter);

  const counts = FILTERS.reduce<Record<string, number>>((acc, f) => {
    acc[f.value] = f.value === 'all'
      ? projects.length
      : projects.filter((p) => p.category === f.value).length;
    return acc;
  }, {});

  return (
    <>
      {/* Filter tabs */}
      <div className="mt-8 flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const active = activeFilter === f.value;
          return (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className="flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full border transition-all duration-200"
              style={
                active
                  ? { background: `${f.color}18`, color: f.color, borderColor: `${f.color}55` }
                  : { background: 'var(--tag-bg)', color: 'var(--muted)', borderColor: 'var(--tag-border)' }
              }
            >
              {f.label}
              <span
                className="text-xs font-bold px-1.5 py-0.5 rounded-full"
                style={
                  active
                    ? { background: f.color, color: '#fff' }
                    : { background: 'var(--card-border)', color: 'var(--muted)' }
                }
              >
                {counts[f.value]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Projects grid */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.length > 0 ? (
          filtered.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))
        ) : (
          <p className="text-gray-400 col-span-2 py-8 text-center">No projects in this category.</p>
        )}
      </div>

      {/* Evidence & Architecture section */}
      {evidence.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-1" style={{ color: 'var(--foreground)' }}>Evidence & Architecture</h2>
          <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>Deep-dives: problem framing, system design, and measured impact.</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {evidence.map((item) => (
              <article key={item.name} className="card rounded-2xl p-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-base font-bold leading-snug" style={{ color: 'var(--foreground)' }}>{item.name}</h3>
                  <span className="text-xs px-2.5 py-1 rounded-lg whitespace-nowrap shrink-0"
                    style={{ color: 'var(--accent)', border: '1px solid var(--accent-glow)', background: 'var(--accent-glow)' }}>
                    {item.role}
                  </span>
                </div>
                <div className="space-y-3 text-sm" style={{ color: 'var(--muted)' }}>
                  <p><span className="font-semibold" style={{ color: 'var(--foreground)' }}>Problem: </span>{item.problem}</p>
                  <p><span className="font-semibold" style={{ color: 'var(--foreground)' }}>Architecture: </span>{item.architecture}</p>
                  <div>
                    <p className="font-semibold mb-1.5" style={{ color: 'var(--foreground)' }}>Impact:</p>
                    <ul className="space-y-1">
                      {item.impact.map((point) => (
                        <li key={point} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5" style={{ background: 'var(--accent)' }} />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p><span className="font-semibold" style={{ color: 'var(--foreground)' }}>Tradeoff: </span>{item.tradeoffs}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </>
  );
};
