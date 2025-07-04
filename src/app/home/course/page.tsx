import React from 'react';
import { Section } from '../about/section';
import { CourseCard } from './courseCard';
import { COURSES_DATA } from '../constant';

const CourseworkPage: React.FC = () => {
    // Sort courses: ongoing courses first
    const sortedCourses = [...COURSES_DATA].sort((a, b) => Number(b.ongoing) - Number(a.ongoing));

    return (
        <div className="container mx-auto px-4 md:px-8 pb-16">
            <header className="text-center py-6">
                <h1 className="text-4xl md:text-3xl font-extrabold text-gray-800">My Learning Journey</h1>
                <p className="mt-2 text-lg text-gray-800/60">A collection of my completed and ongoing learning activities.</p>
            </header>

            <Section title="Coursework & Certifications">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {sortedCourses.map((course, index) => (
                        <CourseCard key={index} course={course} />
                    ))}
                </div>
            </Section>
        </div>
    );
};
export default CourseworkPage;