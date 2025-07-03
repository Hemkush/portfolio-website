
import React from 'react';
import type { ReactNode } from 'react';

interface SectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export const Section: React.FC<SectionProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 shadow-lg transition-all duration-300 hover:border-cyan-400/50 hover:shadow-cyan-500/10 ${className}`}>
      <h2 className="text-2xl font-bold text-cyan-400 mb-4 border-b-2 border-cyan-400/30 pb-2">{title}</h2>
      <div className="text-gray-300">
        {children}
      </div>
    </div>
  );
};
