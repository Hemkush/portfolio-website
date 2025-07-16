'use client';
import { useState } from 'react';
import React from 'react';

interface RoleCardProps {
  title: string;
  organization: string;
  timeline: string;
  description: string;
}

export const RoleCard: React.FC<RoleCardProps> = ({ title, organization, timeline, description }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/60 rounded-xl p-5 shadow-lg h-full flex flex-col transition-all duration-300 hover:border-cyan-400/50 hover:shadow-cyan-500/10">
      <div className="flex-grow">
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <p className="font-semibold text-cyan-400">{organization}</p>
        <p className="text-xs text-gray-400 mt-1 mb-3">{timeline}</p>
        <p className={`text-gray-300 text-sm leading-relaxed ${!isExpanded ? 'line-clamp-5' : ''}`}>{description}</p>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-cyan-400 hover:text-cyan-300 font-semibold text-sm mt-2 transition-colors"
          aria-expanded={isExpanded}
        >
          {isExpanded ? 'Read Less' : 'Read More'}
        </button>
      </div>
    </div>
  );
};
