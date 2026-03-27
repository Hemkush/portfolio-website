import type { Metadata } from 'next';
import React from 'react';
import { Section } from '../about/section';
import { ExperienceCard } from './experienceCard';
import { RoleCard } from './roleCard';
import { WORK_EXPERIENCE_DATA, LEADERSHIP_ROLES_DATA, VOLUNTEER_EXPERIENCE_DATA } from '../constant';

export const metadata: Metadata = {
  title: 'Experience',
  description:
    'Hemant Kushwaha professional experience: AI Engineer and Software Developer at Tata Consultancy Services, Graduate Research Assistant at UMD, and consulting roles. 3.5+ years building production AI and full-stack systems.',
  keywords: [
    'Hemant Kushwaha experience', 'AI engineer work history', 'Tata Consultancy Services',
    'TCS software engineer', 'University of Maryland research assistant', 'UMD AI engineer',
    'LLM engineer experience', 'RAG developer', 'production AI systems', 'software engineer career',
    'AI engineering roles', 'machine learning engineer experience', 'full-stack developer',
    'impact consulting', 'graduate research assistant AI',
  ],
  alternates: { canonical: 'https://hemant-kushwaha.vercel.app/home/experience' },
  openGraph: {
    title: 'Experience — Hemant Kushwaha',
    description:
      '3.5+ years across TCS, UMD research, and consulting. Production AI systems, RAG pipelines, LLM orchestration, and full-stack engineering.',
    url: 'https://hemant-kushwaha.vercel.app/home/experience',
    images: [{ url: '/profile.png', width: 800, height: 800, alt: 'Hemant Kushwaha — AI Engineer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Experience — Hemant Kushwaha',
    description: '3.5+ yrs: TCS · UMD Research · Consulting. RAG pipelines, LLM orchestration, full-stack AI.',
    images: ['/profile.png'],
  },
};

const LEADERSHIP_ACCENTS = ['#a855f7', '#06b6d4', '#10b981', '#f59e0b'];
const VOLUNTEER_ACCENTS  = ['#ec4899', '#6366f1', '#14b8a6', '#f97316'];

const ExperiencePage: React.FC = () => {
  return (
    <div className="page-shell">
      <header className="page-header">
        <h1 className="page-title">Professional Journey</h1>
        <p className="page-subtitle">My experiences in the industry, leadership, and community.</p>
      </header>

      {/* Work Experience — timeline layout */}
      <Section title="Work Experience">
        <div className="mt-8">
          {WORK_EXPERIENCE_DATA.map((exp, index) => (
            <ExperienceCard key={index} experience={exp} index={index} />
          ))}
        </div>
      </Section>

      {/* Leadership & Volunteer */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
        <Section title="Leadership Roles">
          <div className="space-y-4 mt-4">
            {LEADERSHIP_ROLES_DATA.map((role, index) => (
              <RoleCard
                key={index}
                title={role.role}
                organization={role.organization}
                timeline={role.timeline}
                description={role.description}
                accent={LEADERSHIP_ACCENTS[index % LEADERSHIP_ACCENTS.length]}
              />
            ))}
          </div>
        </Section>

        <Section title="Volunteer Experience">
          <div className="space-y-4 mt-4">
            {VOLUNTEER_EXPERIENCE_DATA.map((exp, index) => (
              <RoleCard
                key={index}
                title={exp.role}
                organization={exp.organization}
                timeline={exp.timeline}
                description={exp.description}
                accent={VOLUNTEER_ACCENTS[index % VOLUNTEER_ACCENTS.length]}
              />
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
};

export default ExperiencePage;
