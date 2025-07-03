
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
  greeting: "Hello, I'm Hemant Kushwaha",
  title: "Creative Developer & Aspiring Product Manager",
  text: "A passionate developer with 3+ years of professional experience in software and web development, currently pursuing my Master’s in Information Systems at the University of Maryland. I’ve worked across diverse domains like BFSI, Telecom, and Data Analytics, building responsive web applications and AI-driven solutions. As I deepen my knowledge in data, artificial intelligence, and business strategy, I’m driven by a strong ambition to transition into product management—where I can blend technical expertise with user-focused innovation. Whether leading cross-functional teams, analyzing complex systems, or managing live events, I thrive on solving real-world problems with creativity and impact. Explore my work and join me on this journey of turning ideas into meaningful digital products."
};

// Text content for the objective section
export const OBJECTIVE: string = "Passionate and versatile developer with experience in software and web development, currently expanding my expertise in data, artificial intelligence, and business strategy. Driven by a strong interest in product innovation and user-centric solutions, I aspire to transition into a product management role, where I can blend technical insight with business acumen to create impactful digital products.";

// Education history data
export const EDUCATION_DATA: EducationItem[] = [
  {
    degree: 'Master of Science in Information Systems',
    institution: 'University of Maryland, College Park',
    years: '2025 - 2026',
    logo: <span className="text-3xl" role="img" aria-label="graduation cap">🎓</span>
  },
  {
    degree: 'B.Tech in Mechanical Engineering',
    institution: 'National Institute of Technology',
    years: '2017 - 2021',
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
  'Python', 'Java', 'SQL', 'TypeScript', 'Next.js', 'SpringBoot', 'Node.js', 'Tailwind CSS', 'Git & GitHub', 'Data Analytics', 'Agile Methodologies', 'Statistics'
];

// List of soft skills
export const SKILLS_SOFT: string[] = [
  'Adaptability', 'Critical Thinking', 'Creativity', 'Detail-Oriented', 'Documentations', 'Problem-Solving', 'Collaboration', 'Communication', 'Time Management', 'Leadership', 'Empathy'
];