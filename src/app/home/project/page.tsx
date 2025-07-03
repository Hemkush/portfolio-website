import React from "react";
import { ProjectCard } from './projectCard';
import { Section } from '../about/section';
import { PROJECT_DATA } from '../constant';

// const dummyProjects = [
//     {
//         title: "AI-Powered Task Manager",
//         description:
//             "A smart task manager that uses AI to prioritize your daily tasks, set reminders, and suggest productivity tips based on your habits.",
//         technologies: ["React", "TypeScript", "OpenAI API", "Tailwind CSS"],
//         link: "#",
//     },
//     {
//         title: "Real-Time Collaboration Whiteboard",
//         description:
//             "An intuitive online whiteboard for teams to brainstorm, draw, and collaborate in real-time with seamless syncing.",
//         technologies: ["Next.js", "Socket.io", "Canvas API", "Node.js"],
//         link: "#",
//     },
//     {
//         title: "Personal Finance Dashboard",
//         description:
//             "A comprehensive dashboard to track expenses, visualize spending patterns, and set financial goals with actionable insights.",
//         technologies: ["React", "Redux", "Chart.js", "Firebase"],
//         link: "#",
//     },
// ];


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