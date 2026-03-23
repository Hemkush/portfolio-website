import React from "react";
import { ProjectCard } from './projectCard';
import { Section } from '../about/section';
import { PROJECT_DATA } from '../constant';
import { PROJECT_EVIDENCE } from './projectEvidence';


export default function ProjectPage() {
    const sortedProjects = [...PROJECT_DATA].sort((a, b) => Number(b.ongoing) - Number(a.ongoing));
    return (
         <div className="page-shell">
            <header className="page-header">
                <h1 className="page-title">Projects</h1>
                <p className="page-subtitle">Selected implementations, architecture decisions, and measurable outcomes.</p>
            </header>
            {/* Projects Section */}
        <div className="mt-8">
          <Section title="My Projects">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {sortedProjects.map((project) => (
                <ProjectCard key={project.name} project={project} />
              ))}
            </div>
          </Section>
        </div>
        <div className="mt-8">
          <Section title="Evidence & Architecture">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {PROJECT_EVIDENCE.map((item) => (
                <article key={item.name} className="bg-gray-900/40 border border-gray-700/60 rounded-xl p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-bold text-white">{item.name}</h3>
                    <span className="text-xs text-cyan-300 border border-cyan-400/30 rounded px-2 py-1 whitespace-nowrap">{item.role}</span>
                  </div>
                  <p className="mt-3 text-sm text-gray-300"><span className="font-semibold text-gray-100">Problem:</span> {item.problem}</p>
                  <p className="mt-3 text-sm text-gray-300"><span className="font-semibold text-gray-100">Architecture:</span> {item.architecture}</p>
                  <div className="mt-3">
                    <p className="text-sm font-semibold text-gray-100">Impact:</p>
                    <ul className="mt-2 list-disc list-inside text-sm text-gray-300 space-y-1">
                      {item.impact.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>
                  <p className="mt-3 text-sm text-gray-300"><span className="font-semibold text-gray-100">Tradeoff:</span> {item.tradeoffs}</p>
                </article>
              ))}
            </div>
          </Section>
        </div>
        </div>
    );
}

