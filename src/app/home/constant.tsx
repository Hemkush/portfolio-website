
import React from 'react';
import type { EducationItem, Hobby, Achievement } from './sectionType';

// URLs for the dynamic background
export const BACKGROUND_IMAGES: string[] = [
    '/UMD_view.png', // University of Maryland view
    '/NIT_cover.png',
    '/UMD_cover.png', // University of Maryland cover
  '/NIT_mainBuilding.png', // National Institute of Technology gate
  '/UMD_cover1.png', 
  '/NIT Gate.png', // Forest path
];

// URL for the main profile picture
export const PROFILE_IMAGE_URL: string = '/profile.png';

// Text content for the introduction section
export const INTRODUCTION = {
  greeting: "Hello, I'm Alex Doe",
  title: "Creative Frontend Developer & UI/UX Enthusiast",
  text: "I build beautiful, responsive, and user-centric web applications. With a passion for clean code and delightful user experiences, I turn complex problems into elegant digital solutions. I'm always eager to learn new technologies and collaborate with creative minds to bring ideas to life."
};

// Text content for the objective section
export const OBJECTIVE: string = "My objective is to leverage my skills in modern web technologies to create impactful and visually stunning applications. I aim to contribute to a forward-thinking team that values innovation, quality, and user-focused design, while continuously growing as a developer and a leader in the field.";

// Education history data
export const EDUCATION_DATA: EducationItem[] = [
  {
    degree: 'M.S. in Human-Computer Interaction',
    institution: 'Stanford University',
    years: '2020 - 2022',
    logo: <span className="text-3xl" role="img" aria-label="graduation cap">🎓</span>
  },
  {
    degree: 'B.Tech in Information Technology',
    institution: 'National Institute of Technology',
    years: '2016 - 2020',
    logo: <span className="text-3xl" role="img" aria-label="school building">🏫</span>
  },
];

// Hobbies and interests data
export const HOBBIES_DATA: Hobby[] = [
  {
    name: 'Photography',
    description: 'Capturing moments, from landscapes to city life.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
    )
  },
  {
    name: 'Hiking',
    description: 'Exploring trails and connecting with nature.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg>
    )
  },
  {
    name: 'Cooking',
    description: 'Experimenting with new recipes and flavors.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    )
  },
  {
    name: 'Reading',
    description: 'Diving into sci-fi novels and tech journals.',
     icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v11.494m-9-5.494h18" /></svg>
    )
  }
];

// Achievements and certifications data
export const ACHIEVEMENTS_DATA: Achievement[] = [
  {
    title: 'Certified React Developer',
    issuer: 'React Training',
    year: '2023',
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
  },
  {
    title: 'UI/UX Design Masterclass',
    issuer: 'Interaction Design Foundation',
    year: '2022',
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
  },
  {
    title: 'Best Project Award',
    issuer: 'Tech Fest 2020',
    year: '2020',
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
  },
];

// List of core skills
export const SKILLS_DATA: string[] = [
  'React', 'TypeScript', 'Next.js', 'Node.js', 'Tailwind CSS', 'Figma', 'UI/UX Design', 'GraphQL', 'Firebase', 'Git & GitHub', 'Jest', 'CI/CD'
];
