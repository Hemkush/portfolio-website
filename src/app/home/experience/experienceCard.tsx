import React from 'react';
import type { WorkExperience } from '../sectionType';

interface ExperienceCardProps {
    experience: WorkExperience;
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience }) => {
    return (
        <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/60 rounded-xl p-6 shadow-lg transition-all duration-300 hover:border-cyan-400/50 hover:shadow-cyan-500/10">
            <div className="flex flex-col md:flex-row gap-6">
                {/* Left Side: Role and Company Info */}
                <div className="md:w-1/3">
                    <h3 className="text-xl font-bold text-white">{experience.role}</h3>
                    <p className="text-lg font-semibold text-cyan-400">{experience.company}</p>
                    <p className="text-sm text-gray-400 mt-1">{experience.timeline}</p>
                </div>

                {/* Right Side: Description and Skills */}
                <div className="md:w-2/3">
                    <ul className="list-disc list-inside space-y-2 text-gray-300">
                        {experience.description.map((point, index) => (
                            <li key={index}>{point}</li>
                        ))}
                    </ul>
                    
                    <div className="mt-4 pt-4 border-t border-gray-700/50">
                        <h4 className="text-sm font-semibold text-gray-200 mb-2">Skills Leveraged:</h4>
                        <div className="flex flex-wrap gap-2">
                            {experience.skills.map((skill) => (
                                <span key={skill} className="bg-gray-700 text-cyan-300 text-xs font-medium px-2.5 py-1 rounded-full">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    {experience.recommendation && (
                        <div className="mt-4 pt-4 border-t border-gray-700/50">
                            <div className="bg-gray-900/50 rounded-lg p-4 italic relative">
                                <svg className="absolute top-3 left-3 w-6 h-6 text-cyan-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M6 3a1 1 0 011-1h1.5a1 1 0 011 1v1.5a1 1 0 01-1 1H7a1 1 0 01-1-1V3zm7 0a1 1 0 011-1h1.5a1 1 0 011 1v1.5a1 1 0 01-1 1h-1.5a1 1 0 01-1-1V3z"></path>
                                    <path d="M4 9a1 1 0 011-1h10a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V9zm1-3a1 1 0 00-1 1v1.5a1 1 0 001 1h10a1 1 0 001-1V7a1 1 0 00-1-1H5z"></path>
                                </svg>
                                <blockquote className="pl-8">
                                    <p className="text-gray-300">{experience.recommendation.text}</p>
                                    <footer className="text-right mt-2 not-italic">
                                        <cite className="text-sm text-gray-400">
                                            — {experience.recommendation.name}, {experience.recommendation.title}
                                        </cite>
                                    </footer>
                                </blockquote>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
