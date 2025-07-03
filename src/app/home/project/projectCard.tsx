"use client";
import React, { useState } from 'react';
import type { Project } from '../sectionType';


interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/60 rounded-xl p-6 flex flex-col gap-4 shadow-lg transition-all duration-300 hover:border-cyan-400/50 hover:shadow-cyan-500/10">
      {/* Card Header */}
      <div>
        <div className="flex justify-between items-baseline">
          <h3 className="text-xl font-bold text-white">{project.name}</h3>
          {project.ongoing && (
             <span className="bg-cyan-500/20 text-cyan-300 text-xs font-semibold px-2.5 py-0.5 rounded-full">Ongoing</span>
          )}
        </div>
        <p className="text-sm text-gray-400">{project.timeline}</p>
      </div>

      {/* Description with toggle */}
      <div>
        <p className={`text-gray-300 transition-all duration-300 ease-in-out ${!isExpanded ? 'line-clamp-3' : ''}`}>
          {project.description}
        </p>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-cyan-400 hover:text-cyan-300 font-semibold text-sm mt-2 transition-colors"
          aria-expanded={isExpanded}
        >
          {isExpanded ? 'Read Less' : 'Read More'}
        </button>
      </div>

      {/* Skills Section */}
      <div className="mt-auto pt-4 border-t border-gray-700/50">
        <h4 className="text-sm font-semibold text-gray-200 mb-2">Learned Skills:</h4>
        <div className="flex flex-wrap gap-2">
          {project.skills.map((skill) => (
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
