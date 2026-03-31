
import React from 'react';
import type { ReactNode } from 'react';

interface SectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export const Section: React.FC<SectionProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`card rounded-xl p-6 ${className}`}>
      <h2 className="section-title">{title}</h2>
      <div style={{ color: 'var(--foreground)' }}>
        {children}
      </div>
    </div>
  );
};

export default Section;
