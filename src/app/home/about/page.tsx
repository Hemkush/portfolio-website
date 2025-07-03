// export default function Page() {
//   return (
//     <div> <h1 className="text-gray-800 text-3xl font-bold text-center my-8">
//       About</h1>
//       <div className="text-center text-gray-500">
//         My name is Hemant Kushwaha, and I’m currently pursuing a Master of Science in Information Systems at UMD, 
//         where I also serve as the Track Representative for the Spring 2025 cohort. 
//         In the past, I worked as a software developer in India for 41 months, 
//         where I honed my problem-solving and organizational skills in a fast-paced, team-oriented environment. 
//         During my undergraduate years, I took on various leadership roles in the college fest organizing team, 
//         including core coordinator, event manager, coordinator, and volunteer. Additionally, I was a coordinator of a dramatics club.
//       </div>
//     </div>
//   );
// }

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
            <h1 className="text-3xl md:text-5xl font-extrabold text-white">
              {INTRODUCTION.greeting}
            </h1>
            <p className="mt-1 text-lg md:text-2xl font-semibold text-cyan-400">
              {INTRODUCTION.title}
            </p>
          </div>
        </div>

        {/* Intro text section */}
        <div className="mt-8 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 shadow-lg">
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
            <Section title="Core Skills">
              <div className="flex flex-wrap gap-2">
                {SKILLS_DATA.map((skill) => (
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
              <ul className="space-y-6">
                {EDUCATION_DATA.map((item, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">{item.logo}</div>
                    <div>
                      <h3 className="font-bold text-lg text-white">{item.degree}</h3>
                      <p className="text-cyan-400">{item.institution}</p>
                      <p className="text-gray-400 text-sm">{item.years}</p>
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
        <p>Portfolio of Alex Doe &copy; {new Date().getFullYear()}</p>
      </footer>
    </>
  );
};

export default AboutPage;