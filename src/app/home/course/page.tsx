import React from "react";

const dummyCourses = [
    {
        id: 1,
        title: "Introduction to TypeScript",
        description: "Learn the basics of TypeScript, a typed superset of JavaScript that compiles to plain JavaScript.",
        progress: 40,
        lessons: 12,
    },
    {
        id: 2,
        title: "React for Beginners",
        description: "Start building interactive UIs with React. No prior experience required!",
        progress: 75,
        lessons: 18,
    },
    {
        id: 3,
        title: "Advanced Algorithms",
        description: "Deep dive into algorithms and data structures to ace technical interviews.",
        progress: 20,
        lessons: 24,
    },
];

const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => (
    <div style={{ background: "#eee", borderRadius: 8, height: 8, width: "100%" }}>
        <div
            style={{
                width: `${progress}%`,
                background: "#4f8cff",
                height: "100%",
                borderRadius: 8,
                transition: "width 0.3s",
            }}
        />
    </div>
);

const CourseCard: React.FC<{
    title: string;
    description: string;
    progress: number;
    lessons: number;
}> = ({ title, description, progress, lessons }) => (
    <div
        style={{
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
            padding: 24,
            marginBottom: 24,
            maxWidth: 400,
            width: "100%",
        }}
    >
        <h2 style={{ margin: "0 0 8px 0" }}>{title}</h2>
        <p style={{ color: "#555", margin: "0 0 16px 0" }}>{description}</p>
        <div style={{ marginBottom: 8 }}>
            <ProgressBar progress={progress} />
        </div>
        <div style={{ fontSize: 14, color: "#888" }}>
            {progress}% complete &middot; {lessons} lessons
        </div>
    </div>
);

export default function CoursePage() {
    return (
        <main
            style={{
                minHeight: "100vh",
                background: "#f6f8fa",
                padding: "40px 0",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <h1 style={{ marginBottom: 32 }}>Your Courses</h1>
            <div style={{ display: "flex", gap: 32, flexWrap: "wrap", justifyContent: "center" }}>
                {dummyCourses.map((course) => (
                    <CourseCard key={course.id} {...course} />
                ))}
            </div>
        </main>
    );
}