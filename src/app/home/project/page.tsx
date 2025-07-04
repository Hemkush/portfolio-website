import React from "react";
import { ProjectCard } from './projectCard';
import { Section } from '../about/section';
import { PROJECT_DATA } from '../constant';


export default function ProjectPage() {
    const sortedProjects = [...PROJECT_DATA].sort((a, b) => Number(b.ongoing) - Number(a.ongoing));
    return (
         <div className="container mx-auto px-4 md:px-8 pb-16">
            <header className="text-center py-6">
                {/* <h1 className="text-4xl md:text-5xl font-extrabold text-white">Professional Journey</h1>
                <p className="mt-2 text-lg text-gray-400">My experiences in the industry, leadership, and community.</p> */}
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
        </div>
    );
}