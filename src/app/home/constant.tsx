
import React from 'react';
import type { EducationItem, 
    Hobby, 
    Achievement, 
    Project, 
    WorkExperience, 
    LeadershipRole, 
    Course,
    VolunteerExperience } from './sectionType';

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

export const PROJECT_DATA: Project[] = [
  {
      name: 'Interactive Portfolio Website',
      timeline: 'June 2025 - Present',
      ongoing: true,
      description: 'A dynamic and responsive personal portfolio built with React, Next.js, and Tailwind CSS. Features an OpenAI API integration to generate dynamic content, and showcases my skills and projects in an interactive format. The project focuses heavily on clean UI/UX, performance, artificial intelligence(AI) and accessibility. The backend is handled via Next.js API routes, ensuring a seamless full-stack experience.',
      skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'OpenAI API', 'Vercel']
  },
  {
      name: 'AI-Driven Analytical Dashboard for E-Livestock Global System',
      timeline: 'Feb 2025 - Present',
      ongoing: true,
      description: 'Associated with University of Maryland - Robert H. Smith School of Business, to develop and implement an AI-driven analytical tool that helps E-Livestock Global transform its operations by empowering farmers to track livestock health and productivity through predictive disease management and optimized feeding; optimize the supply chain for efficiency and transparency through fraud reduction; and enable data-driven market responsiveness by providing deep consumer insights and market trend forecasting. Ultimately, this tool will facilitate stakeholders by providing easily digestible reports and dashboards for data-driven decision-making.',
      skills: ['Project Management', 'Software Development Life Cycle (SDLC)', 'Data Modeling', 'Process Modeling', 'Systems Analysis', 'Documentation']
  },
   {
      name: 'AI-Powered Social Media Automation Bot',
      timeline: 'June 2024 - Present',
      ongoing: true,
      description: 'I am currently developing an AI-powered social media automation bot designed to help users post content across multiple platforms—including X (formerly Twitter), LinkedIn, and Facebook—with a single click. The bot leverages AI to generate tailored content, adapting it to meet each platform’s specific format, tone, and character limitations. I am building features to schedule daily posts automatically and customize content variations to maximize user engagement. This project is aimed at simplifying social media management while ensuring consistent and optimized visibility. ',
      skills: ['Python', 'Gemini / NLP API Usage', 'Prompt Engineering']
  },
  {
      name: 'COVID-19 Data Analysis using Python',
      timeline: '2020',
      ongoing: false,
      description: 'Utilized Python (Pandas, NumPy, Matplotlib) to clean and analyze 100K+ global COVID-19 records, identifying trends in infection, recovery, and mortality rates; applied data wrangling and visualization skills to derive actionable insights. Created interactive visualizations and summarized findings into a report that scored 95%+ on evaluation, demonstrating proficiency in data storytelling, statistical analysis, and real-world problem solving.',
      skills: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Data Analysis', 'Data Visualization', 'Data Wrangling']
  },
];

// Work Experience Data
export const WORK_EXPERIENCE_DATA: WorkExperience[] = [
    {
        company: 'Innovate Inc.',
        role: 'Senior Frontend Developer',
        timeline: 'Jan 2022 - Present',
        description: [
            'Led the development of a new design system using React and Storybook, increasing team productivity by 30%.',
            'Architected and implemented a state management solution with Redux Toolkit for a large-scale customer-facing application.',
            'Mentored junior developers, conducted code reviews, and championed best practices for code quality and testing.'
        ],
        skills: ['React', 'TypeScript', 'Redux', 'Storybook', 'Jest', 'CI/CD', 'Leadership'],
        recommendation: {
            name: 'Jane Smith',
            title: 'Engineering Manager at Innovate Inc.',
            text: '"Alex is a phenomenal developer and a true leader. Their technical expertise and commitment to quality are second to none. They consistently delivered high-impact features and elevated the entire team\'s performance."'
        }
    },
    {
        company: 'Creative Solutions LLC',
        role: 'Frontend Developer',
        timeline: 'Jun 2020 - Dec 2021',
        description: [
            'Collaborated in an agile team to build and maintain multiple client websites using Next.js and Tailwind CSS.',
            'Translated Figma designs into pixel-perfect, responsive, and accessible user interfaces.',
            'Improved website performance scores by over 20% through code splitting, image optimization, and lazy loading.'
        ],
        skills: ['Next.js', 'Tailwind CSS', 'Figma', 'Vercel', 'Performance Optimization'],
    }
];

// Leadership Roles Data
export const LEADERSHIP_ROLES_DATA: LeadershipRole[] = [
    {
        organization: 'University Coding Club',
        role: 'President',
        timeline: '2019 - 2020',
        description: 'Organized weekly coding workshops, managed the annual hackathon with over 200 participants, and secured sponsorships from local tech companies. Grew club membership by 50%.'
    },
    {
        organization: 'Open Source Community',
        role: 'Lead Maintainer',
        timeline: '2022 - Present',
        description: 'Manage contributions, review pull requests, and define the feature roadmap for a popular open-source UI component library with over 10k weekly downloads.'
    }
];

// Volunteer Experience Data
export const VOLUNTEER_EXPERIENCE_DATA: VolunteerExperience[] = [
    {
        organization: 'Code for a Cause',
        role: 'Volunteer Mentor',
        timeline: 'Summer 2023',
        description: 'Mentored a group of aspiring developers during a 3-month bootcamp, providing guidance on web development fundamentals, career advice, and project-based learning.'
    },
    {
        organization: 'Local Food Bank',
        role: 'Website Manager',
        timeline: '2021 - Present',
        description: 'Voluntarily rebuilt and now maintain the local food bank’s website, improving online donation accessibility and volunteer sign-up rates by 40%.'
    }
];

// Coursework Data
export const COURSES_DATA: Course[] = [
    {
        name: 'AI For Everyone',
        platform: 'DeepLearning.AI',
        year: 'Present',
        description: 'Exploring the fundamentals of Artificial Intelligence, machine learning, and their impact on society and business.',
        skills: ['AI', 'Machine Learning', 'Data Science', 'Ethics'],
        ongoing: true,
    },
    {
        name: 'Advanced TypeScript',
        platform: 'Udemy',
        year: '2023',
        description: 'A deep dive into advanced TypeScript features, including generics, decorators, and type manipulation.',
        skills: ['TypeScript', 'Generics', 'Decorators', 'Type-level Programming']
    },
    {
        name: 'GraphQL: The Big Picture',
        platform: 'Pluralsight',
        year: '2023',
        description: 'Comprehensive overview of GraphQL, including schema design, queries, mutations, and subscriptions.',
        skills: ['GraphQL', 'Apollo Client', 'Schema Design', 'API Design']
    },
    {
        name: 'Google Cloud Skills Boost',
        platform: 'Google Cloud',
        year: '2022',
        description: 'Completed several quests on Google Cloud technologies, focusing on serverless architecture and cloud functions.',
        skills: ['Google Cloud Platform', 'Firebase', 'Serverless', 'Cloud Functions']
    },
    {
        name: 'Web Accessibility Fundamentals',
        platform: 'Coursera',
        year: '2022',
        description: 'Learned to build web applications that are accessible to people with disabilities, following WCAG standards.',
        skills: ['Accessibility (a11y)', 'WCAG', 'ARIA', 'Semantic HTML']
    }
];