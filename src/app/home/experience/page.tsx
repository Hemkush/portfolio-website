import React from "react";

const experiences = [
    {
        title: "Software Engineer Intern",
        company: "Tech Innovators Inc.",
        period: "June 2023 - Aug 2023",
        description: [
            "Developed a real-time dashboard using React and TypeScript, improving data visibility for 500+ users.",
            "Collaborated with cross-functional teams to deliver features ahead of schedule.",
            "Automated testing pipelines, reducing manual QA time by 30%."
        ],
        type: "Internship"
    },
    {
        title: "Volunteer Web Developer",
        company: "Code for Good",
        period: "Jan 2023 - May 2023",
        description: [
            "Built and maintained a donation platform for a local non-profit, increasing donations by 20%.",
            "Mentored new volunteers in web development best practices."
        ],
        type: "Volunteer"
    },
    {
        title: "Project Manager",
        company: "Smart Campus Navigation (College Course Project)",
        period: "Sep 2022 - Dec 2022",
        description: [
            "Led a team of 5 in designing a mobile app to assist new students in navigating campus.",
            "Coordinated agile sprints, managed timelines, and ensured clear communication.",
            "Presented project outcomes to faculty, receiving top marks for innovation and teamwork."
        ],
        type: "Academic"
    },
    {
        title: "Frontend Developer",
        company: "Freelance",
        period: "Mar 2022 - Aug 2022",
        description: [
            "Created responsive websites for small businesses using React and Tailwind CSS.",
            "Optimized site performance, achieving 95+ Lighthouse scores."
        ],
        type: "Work"
    }
];

const typeColors: Record<string, string> = {
    Internship: "bg-blue-100 text-blue-800",
    Volunteer: "bg-green-100 text-green-800",
    Academic: "bg-purple-100 text-purple-800",
    Work: "bg-yellow-100 text-yellow-800"
};

export default function ExperiencePage() {
    return (
        <main className="max-w-3xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-8 text-center">Experience</h1>
            <div className="space-y-8">
                {experiences.map((exp, idx) => (
                    <div
                        key={idx}
                        className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-xl font-semibold">{exp.title}</h2>
                            <span
                                className={`px-3 py-1 rounded-full text-xs font-medium ${typeColors[exp.type]}`}
                            >
                                {exp.type}
                            </span>
                        </div>
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-gray-700">{exp.company}</span>
                            <span className="text-gray-500 text-sm">{exp.period}</span>
                        </div>
                        <ul className="list-disc list-inside mt-2 text-gray-800 space-y-1">
                            {exp.description.map((point, i) => (
                                <li key={i}>{point}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </main>
    );
}