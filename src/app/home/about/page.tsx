import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Hemant Kushwaha — AI Engineer with an MS in Information Systems from the University of Maryland (GPA 3.94), B.Tech from NIT Rourkela, and 3.5+ years of software engineering experience building production AI systems.',
  keywords: [
    'Hemant Kushwaha', 'AI Engineer', 'about', 'University of Maryland', 'UMD',
    'MS Information Systems', 'NIT Rourkela', 'GPA 3.94', 'software engineer background',
    'AI engineer profile', 'machine learning engineer', 'OPT eligible 2026',
    'full-stack AI engineer', 'AI engineer biography',
  ],
  alternates: { canonical: 'https://hemant-kushwaha.vercel.app/home/about' },
  openGraph: {
    title: 'About Hemant Kushwaha — AI Engineer',
    description:
      'MS Information Systems at UMD (GPA 3.94), B.Tech from NIT Rourkela. 3.5+ years building production AI systems. OPT-eligible May 2026.',
    url: 'https://hemant-kushwaha.vercel.app/home/about',
    images: [{ url: '/profile.png', width: 800, height: 800, alt: 'Hemant Kushwaha — AI Engineer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Hemant Kushwaha — AI Engineer',
    description: 'MS UMD GPA 3.94 · NIT Rourkela · 3.5+ yrs production AI engineering · OPT-eligible May 2026.',
    images: ['/profile.png'],
  },
};
import Image from 'next/image';
import { ProfileImage } from './profileImage';
import { Section } from './section';
import {
  INTRODUCTION,
  OBJECTIVE,
  EDUCATION_DATA,
  HOBBIES_DATA,
  ACHIEVEMENTS_DATA,
  SKILLS_DATA,
  SKILLS_SOFT,
  PROFILE_IMAGE_URL,
} from '../constant';
import { AnimateOnMount, FadeUp, HoverScale, Stagger, StaggerItem } from '@/app/ui/components/animations';

const AboutPage: React.FC = () => {
  return (
    <>
      <header className="relative">
        <ProfileImage />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-gray-900 to-transparent"></div>
      </header>

      <main className="relative page-shell -mt-20 md:-mt-24">
        {/* Profile picture and name/title section */}
        <div className="flex flex-col md:flex-row items-center md:items-center gap-4 md:gap-8">
          <AnimateOnMount from="scale" delay={0}>
            <Image
              src={PROFILE_IMAGE_URL}
              alt="Hemant Kushwaha"
              width={192}
              height={192}
              className="-mt-14 md:-mt-20 w-40 h-40 md:w-48 md:h-48 rounded-full object-cover border-4 md:border-8 border-gray-900 shadow-2xl transition-transform duration-300 hover:scale-105"
              priority
            />
          </AnimateOnMount>
          <AnimateOnMount from="bottom" delay={0.15} className="flex-1 text-center md:text-left">
            <h1 className="text-2xl md:text-4xl font-extrabold text-cyan-400">
              {INTRODUCTION.greeting}
            </h1>
            <p className="mt-1 text-lg md:text-2xl font-semibold text-cyan-400">
              {INTRODUCTION.title}
            </p>
          </AnimateOnMount>
        </div>

        {/* Intro text section */}
        <FadeUp delay={0.1}>
          <div className="card mt-8 rounded-xl p-6">
            <p className="text-base leading-relaxed" style={{ color: 'var(--muted)' }}>
              {INTRODUCTION.text}
            </p>
          </div>
        </FadeUp>

        {/* Main Content Grid */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column (Objective & Skills) */}
          <div className="lg:col-span-1 flex flex-col gap-8">
            <FadeUp delay={0.1}>
              <Section title="My Objective">
                <p className="text-gray-300 leading-relaxed">{OBJECTIVE}</p>
              </Section>
            </FadeUp>
            <FadeUp delay={0.15}>
              <Section title="Technical Skills">
                <Stagger className="flex flex-wrap gap-2" staggerDelay={0.03}>
                  {SKILLS_DATA.map((skill) => (
                    <StaggerItem key={skill}>
                      <HoverScale className="skill-tag text-sm px-3 py-1">{skill}</HoverScale>
                    </StaggerItem>
                  ))}
                </Stagger>
              </Section>
            </FadeUp>
            <FadeUp delay={0.2}>
              <Section title="Soft Skills">
                <Stagger className="flex flex-wrap gap-2" staggerDelay={0.04}>
                  {SKILLS_SOFT.map((skill) => (
                    <StaggerItem key={skill}>
                      <HoverScale className="skill-tag text-sm px-3 py-1">{skill}</HoverScale>
                    </StaggerItem>
                  ))}
                </Stagger>
              </Section>
            </FadeUp>
          </div>

          {/* Right Column (Education, Achievements, Hobbies) */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <FadeUp delay={0.1}>
              <Section title="Education">
                <ul className="space-y-8">
                  {EDUCATION_DATA.map((item, index) => (
                    <li key={index} className="flex items-start gap-5">
                      <div className="flex-shrink-0 mt-1 rounded-md p-1" style={{ background: 'rgba(255,255,255,0.9)' }}>
                        {typeof item.logo === 'string' && (
                          <Image
                            src={item.logo}
                            alt={`${item.institution} logo`}
                            width={48}
                            height={48}
                            className="h-12 w-12 object-contain"
                          />
                        )}
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-bold text-lg text-white">{item.degree}</h3>
                        <p className="text-cyan-400 font-medium">{item.institution}</p>
                        <div className="flex items-baseline justify-between text-sm text-gray-400 mt-1">
                          <span>{item.years}</span>
                          {item.gpa && <span className="font-semibold">GPA: {item.gpa}</span>}
                        </div>
                        {item.skills && item.skills.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {item.skills.map(skill => (
                              <span key={skill} className="skill-tag">{skill}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </Section>
            </FadeUp>

            <FadeUp delay={0.15}>
              <Section title="Achievements">
                <Stagger className="space-y-4" staggerDelay={0.1}>
                  {ACHIEVEMENTS_DATA.map((ach, index) => (
                    <StaggerItem key={index}>
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0 text-yellow-400">{ach.icon}</div>
                        <div>
                          <h3 className="font-semibold text-white">{ach.title}</h3>
                          <p className="text-gray-400 text-sm">{ach.issuer} - {ach.year}</p>
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </Stagger>
              </Section>
            </FadeUp>

            <FadeUp delay={0.2}>
              <Section title="Hobbies & Interests">
                <Stagger className="grid grid-cols-1 sm:grid-cols-2 gap-6" staggerDelay={0.08}>
                  {HOBBIES_DATA.map((hobby, index) => (
                    <StaggerItem key={index}>
                      <FadeUp>
                        <div className="card-flat flex items-start gap-4 p-4 rounded-xl transition-all hover:-translate-y-1">
                          <div className="flex-shrink-0 mt-1">{hobby.icon}</div>
                          <div>
                            <h3 className="font-bold text-sm" style={{ color: 'var(--foreground)' }}>{hobby.name}</h3>
                            <p className="text-sm mt-0.5" style={{ color: 'var(--muted)' }}>{hobby.description}</p>
                          </div>
                        </div>
                      </FadeUp>
                    </StaggerItem>
                  ))}
                </Stagger>
              </Section>
            </FadeUp>
          </div>
        </div>
      </main>

      <footer className="container mx-auto text-center mt-16 mb-8 pt-8" style={{ color: 'var(--muted-strong)', borderTop: '1px solid var(--card-border)' }}>
        <p>Portfolio of Hemant Kushwaha &copy; {new Date().getFullYear()}</p>
      </footer>
    </>
  );
};

export default AboutPage;
