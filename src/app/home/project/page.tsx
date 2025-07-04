import React from "react";
import { ProjectCard } from './projectCard';
import { Section } from '../about/section';
import { PROJECT_DATA } from '../constant';


export default function ProjectPage() {
    const sortedProjects = [...PROJECT_DATA].sort((a, b) => Number(b.ongoing) - Number(a.ongoing));
    return (
        <main className="p-8 bg-gray-50 min-h-screen">
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
        </main>
    );
}