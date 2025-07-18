import React from 'react';
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

const AboutPage: React.FC = () => {
  return (
    <>
      <header className="relative">
        <ProfileImage /> {/* This is now the banner */}
        {/* Gradient overlay to make the transition to the page background smoother */}
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-gray-900 to-transparent"></div>
      </header>

      {/* Main content starts here, overlapping the banner */}
      <main className="relative container mx-auto px-4 md:px-8 -mt-20 md:-mt-24">
        {/* Profile picture and name/title section */}
        <div className="flex flex-col md:flex-row items-center md:items-end gap-4 md:gap-8">
            <Image
              src={PROFILE_IMAGE_URL}
              alt="Alex Doe"
              width={192}
              height={192}
              className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover border-4 md:border-8 border-gray-900 shadow-2xl transition-transform duration-300 hover:scale-105"
              priority
            />
          <div className="flex-shrink-0">
          </div>
          <div className="flex-1 text-center md:text-left pb-4">
            <h1 className="text-2xl md:text-4xl font-extrabold text-cyan-400">
              {INTRODUCTION.greeting}
            </h1>
            <p className="mt-1 text-lg md:text-2xl font-semibold text-cyan-400">
              {INTRODUCTION.title}
            </p>
          </div>
        </div>

        {/* Intro text section */}
        <div className="mt-8 bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 shadow-lg">
          <p className="text-gray-300 leading-relaxed text-lg">
            {INTRODUCTION.text}
          </p>
        </div>
        
        {/* Main Content Grid */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column (Objective & Skills) */}
          <div className="lg:col-span-1 flex flex-col gap-8">
            <Section title="My Objective">
              <p className="text-gray-300 leading-relaxed">{OBJECTIVE}</p>
            </Section>
            <Section title="Technical Skills">
              <div className="flex flex-wrap gap-2">
                {SKILLS_DATA.map((skill) => (
                  <span key={skill} className="bg-gray-700 text-cyan-300 text-sm font-medium px-3 py-1 rounded-full cursor-default transition-colors hover:bg-cyan-900/50 hover:text-cyan-200">
                    {skill}
                  </span>
                ))}
              </div>
            </Section>
            <Section title="Soft Skills">
              <div className="flex flex-wrap gap-2">
                {SKILLS_SOFT.map((skill) => (
                  <span key={skill} className="bg-gray-700 text-cyan-300 text-sm font-medium px-3 py-1 rounded-full cursor-default transition-colors hover:bg-cyan-900/50 hover:text-cyan-200">
                    {skill}
                  </span>
                ))}
              </div>
            </Section>
          </div>

          {/* Right Column (Education, Achievements, Hobbies) */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <Section title="Education">
              <ul className="space-y-8">
                {EDUCATION_DATA.map((item, index) => (
                  <li key={index} className="flex items-start gap-5">
                    <div className="flex-shrink-0 mt-1 bg-white/90 rounded-md p-1">
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
                        <div className="mt-3">
                          <div className="flex flex-wrap gap-2">
                            {item.skills.map(skill => (
                              <span key={skill} className="bg-gray-700 text-cyan-300 text-xs font-medium px-2.5 py-1 rounded-full">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Achievements">
              <ul className="space-y-4">
                {ACHIEVEMENTS_DATA.map((ach, index) => (
                  <li key={index} className="flex items-center gap-4">
                    <div className="flex-shrink-0 text-yellow-400">{ach.icon}</div>
                    <div>
                      <h3 className="font-semibold text-white">{ach.title}</h3>
                      <p className="text-gray-400 text-sm">{ach.issuer} - {ach.year}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Hobbies & Interests">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {HOBBIES_DATA.map((hobby, index) => (
                   <div key={index} className="flex items-start gap-4 p-4 bg-gray-900/50 rounded-lg transition-colors hover:bg-gray-700/50">
                      <div className="flex-shrink-0 mt-1">{hobby.icon}</div>
                      <div>
                        <h3 className="font-bold text-white">{hobby.name}</h3>
                        <p className="text-gray-400 text-sm">{hobby.description}</p>
                      </div>
                   </div>
                ))}
              </div>
            </Section>
          </div>
        </div>
      </main>

      <footer className="container mx-auto text-center mt-16 mb-8 text-gray-500 border-t border-gray-800 pt-8">
        <p>Portfolio of Hemant Kushwaha &copy; {new Date().getFullYear()}</p>
      </footer>
    </>
  );
};

export default AboutPage;