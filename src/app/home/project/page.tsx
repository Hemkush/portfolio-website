import React from "react";

const dummyProjects = [
    {
        title: "AI-Powered Task Manager",
        description:
            "A smart task manager that uses AI to prioritize your daily tasks, set reminders, and suggest productivity tips based on your habits.",
        technologies: ["React", "TypeScript", "OpenAI API", "Tailwind CSS"],
        link: "#",
    },
    {
        title: "Real-Time Collaboration Whiteboard",
        description:
            "An intuitive online whiteboard for teams to brainstorm, draw, and collaborate in real-time with seamless syncing.",
        technologies: ["Next.js", "Socket.io", "Canvas API", "Node.js"],
        link: "#",
    },
    {
        title: "Personal Finance Dashboard",
        description:
            "A comprehensive dashboard to track expenses, visualize spending patterns, and set financial goals with actionable insights.",
        technologies: ["React", "Redux", "Chart.js", "Firebase"],
        link: "#",
    },
];

export default function ProjectPage() {
    return (
        <main className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Project Showcase</h1>
            <p className="mb-8 text-gray-700 max-w-2xl">
                Explore a collection of innovative project templates designed to inspire and challenge you. Each project combines modern technologies and best practices to help you learn and grow as a developer.
            </p>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {dummyProjects.map((project, idx) => (
                    <div
                        key={idx}
                        className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                    >
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            {project.title}
                        </h2>
                        <p className="text-gray-600 mb-4">{project.description}</p>
                        <div className="mb-4">
                            <span className="font-medium text-gray-800">Technologies:</span>
                            <ul className="list-disc list-inside text-gray-500">
                                {project.technologies.map((tech, i) => (
                                    <li key={i}>{tech}</li>
                                ))}
                            </ul>
                        </div>
                        <a
                            href={project.link}
                            className="inline-block mt-2 text-blue-500 hover:underline"
                        >
                            View Details
                        </a>
                    </div>
                ))}
            </div>
        </main>
    );
}