import React from 'react';
import type { Course } from '../sectionType';

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/60 rounded-xl p-6 flex flex-col gap-4 shadow-lg transition-all duration-300 hover:border-cyan-400/50 hover:shadow-cyan-500/10 h-full">
      {/* Card Header */}
      <div>
        <div className="flex justify-between items-baseline">
            <h3 className="text-xl font-bold text-white">{course.name}</h3>
            {course.ongoing && (
                <span className="bg-green-500/20 text-green-300 text-xs font-semibold px-2.5 py-0.5 rounded-full">Ongoing</span>
            )}
        </div>
        <p className="text-sm font-semibold text-cyan-400">{course.platform} - <span className="text-gray-400 font-normal">{course.year}</span></p>
      </div>

      {/* Description */}
      <p className="text-gray-300 text-sm flex-grow">{course.description}</p>
      
      {/* Skills Section */}
      <div className="mt-auto pt-4 border-t border-gray-700/50">
        <h4 className="text-sm font-semibold text-gray-200 mb-2">Key Skills:</h4>
        <div className="flex flex-wrap gap-2">
          {course.skills.map((skill) => (
            <span
              key={skill}
              className="bg-gray-700 text-cyan-300 text-xs font-medium px-2.5 py-1 rounded-full cursor-default"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
