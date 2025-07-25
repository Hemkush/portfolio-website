
import React from 'react';
import type { EducationItem, 
    Hobby, 
    Achievement, 
    Project, 
    WorkExperience, 
    LeadershipRole,
    SocialLink,
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
    institution: 'University of Maryland - Robert H. Smith School of Business',
    years: '2025 - 2026',
    logo: '/business_logo.ico',
    gpa: '3.93/4.00',
    skills: ['Problem Solving', 'Business Acumen', 'Empathy', 'Strategic Thinking', 'Data Analysis', 'SQL', 'Leadership', 'Communication', 'Teamwork', 'Python', 'Collaborative Problem Solving']
  },  
  {
    degree: 'B.Tech in Information Technology',
    institution: 'National Institute of Technology',
    years: '2017 - 2021',
    logo: '/rourkela_logo.ico',
    gpa: '3.40/4.00',
    skills: ['Problem Solving', 'Empathy', 'Strategic Thinking', 'Management', 'Leadership', 'Team Management', 'Communication', 'Teamwork', 'Collaborative Problem Solving']
  },
  {
    degree: 'Senior School Certificate (Class XII)',
    institution: 'Jawahar Navodaya Vidyalaya, Sonbhadra',
    years: '',
    logo: '/JNV_logo.ico',
    gpa: '90.6%',
    skills: ['Physics', 'Chemistry', 'Mathematics', 'Diversity & Inclusion', 'Leadership', 'Teamwork', 'Communication', 'Problem Solving', 'Critical Thinking', 'Adaptability', 'Time Management']
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
      timeline: 'June 2025 - Present',
      ongoing: true,
      description: 'To tackle the repetitive and time-consuming nature of social media management, I developed a sophisticated AI-Powered Social Media Automation Bot. This Python-based solution seamlessly integrates with the Twitter (X) and Reddit REST APIs to fully automate content pipelines. The bot is engineered to generate over 30 unique content variations per campaign and features dynamic scheduling logic for real-time, customized publishing. A key feature is its ability to perform real-time web scraping for the latest AI news, which is then structured and made available to the user through interactive dropdowns for on-demand content generation. The project successfully reduced manual posting efforts by 90% and was meticulously documented, covering everything from API endpoints to error-handling workflows and demonstrating sound judgment in managing complex automation tasks.',
      skills: ['Python', 'Gemini / NLP API Usage', 'Prompt Engineering', 'Scripting', 'Task Automation']
  },
  {
      name: 'COVID-19 Data Analysis using Python',
      timeline: '2020',
      ongoing: false,
      description: 'Utilized Python (Pandas, NumPy, Matplotlib) to clean and analyze 100K+ global COVID-19 records, identifying trends in infection, recovery, and mortality rates; applied data wrangling and visualization skills to derive actionable insights. Created interactive visualizations and summarized findings into a report that scored 95%+ on evaluation, demonstrating proficiency in data storytelling, statistical analysis, and real-world problem solving.',
      skills: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Data Analysis', 'Data Visualization', 'Data Wrangling']
  },
  {
      name: 'Analyzing Big Data with SQL',
      timeline: '2020',
      ongoing: false,
      description: 'Successfully applied advanced SQL queries using Microsoft SQL Server to analyze and extract insights from large-scale datasets, demonstrating strong skills in data querying, aggregation, and trend analysis.',
      skills: ['SQL', 'Data Analysis', 'Data Wrangling']
  },
];

// Work Experience Data
export const WORK_EXPERIENCE_DATA: WorkExperience[] = [
    {
        company: 'Tata Consultancy Services (TCS)',
        role: 'Software Developer',
        timeline: 'Jul 2021 - Dec 2024',
        description: [
            'Engaged in 3 full-stack development projects, collaborating with product, QA, and DevOps teams to deliver scalable software.',
            'Developed 30+ front-end components using HTML5, CSS3, and TypeScript, improving load speed by 30% and ensuring cross-browser compatibility (95%+). Built and deployed 8+ RESTful APIs with Spring Boot.',
            'Delivered requirements aligned with stakeholder goals, resulting in a 95% satisfaction score from post-delivery surveys.',
            'Maintained 95%+ story completion rate, actively engaging in agile ceremonies and retrospectives to refine processes and improve team velocity.',
            'Collaborated in daily stand-ups and planning sessions for a team of 8 developers, increasing sprint velocity by 20%.',
            'Consistently adhered to code of conduct of TCS and maintained strict confidentiality of all project deliverables and company information, ensuring secure handling of sensitive data and compliance with internal policies.'
        ],
        skills: ['Java', 'Spring Boot', 'HTML5', 'CSS3', 'TypeScript', 'Angular', 'SQL', 'Web Development', 'Restful APIs', 'Collaboration', 'Agile Methodologies', 'Git'],
        recommendation: {
            name: 'Syed Ahmed',
            title: 'Project Lead at TCS',
            text: '"Hemant is a phenomenal developer and a true collaborator. Their technical expertise and commitment to quality are second to none. They consistently delivered high-impact features and elevated the entire team\'s performance."'
        }
    },
    {
        company: 'The Sparks Foundation',
        role: 'ML/DS Intern',
        timeline: 'Jul 2020',
        description: [
            'Completed a 4-week internship focused on real-world machine learning and business analytics applications.',
            'Analyzed 3 real-world datasets, applying machine learning techniques to solve classification and regression problems.',
            'Built and evaluated models using Python libraries such as pandas, NumPy, scikit-learn, and matplotlib, improving prediction accuracy by up to 85% in project tasks.',
            'Strengthened Python programming proficiency and enhanced understanding of data preprocessing, feature engineering, and performance metrics.',
            'Developed a better grasp of data-driven decision-making, presenting insights through data visualization and reporting tools.'
        ],
        skills: ['Machine Learning', 'Data Science', 'Python', 'Data Analysis', 'Model Evaluation', 'Regression Analysis'],
    },
    {
        company: 'Blitz Jobs',
        role: 'Data Analyst Intern',
        timeline: 'Jun 2020 - Jul 2020',
        description: [
            'Developed a Tableau dashboard to visualize marketing insights, enabling faster and more informed decision-making for stakeholders.',
            'Supported the design of a machine learning model by recommending algorithm types and tuning key parameters to improve campaign targeting.',
            'Contributed to data preprocessing, exploratory analysis, and model planning to enhance marketing efficiency and customer segmentation strategies.',
        ],
        skills: ['Data Visualization', 'Tableau', 'Machine Learning Fundamentals', 'Model Design', 'Cross-functional Collaboration'],
    }
];

// Leadership Roles Data
export const LEADERSHIP_ROLES_DATA: LeadershipRole[] = [
    {
        organization: 'University of Maryland - Robert H. Smith School of Business',
        role: 'Program Representative (Master’s in Information Systems)',
        timeline: 'Aug 2025 - Present',
        description: 'I was recently elected as a Program Representative, where my role involves actively representing my department in Assembly meetings. As part of my responsibilities, I am expected to stay informed about issues on the agenda in advance and engage in regular communication with students and faculty within my program. This includes gathering input, addressing concerns, and caucusing with members of the department prior to meetings to ensure that our collective perspectives are accurately represented. This position allows me to contribute to academic governance and strengthen collaboration between students and administration.'
    },
    {
        organization: 'NITRUTSAV NIT ROURKELA',
        role: 'Core-Coordinator',
        timeline: 'Dec 2019 - Feb 2020',
        description: 'NITR UTSAV is a Literary and Cultural fest of NIT Rourkela. Notably serving as a core coordinator for the requirement team, overseeing a team of 20 dedicated members.  Acquired valuable insights into team leadership, management dynamics, and the critical importance of cohesive work.'
    },
    {
        organization: 'Pantomime-Official Dramatic Club of NITR',
        role: 'Coordinator',
        timeline: 'Apr 2019 - Apr 2020',
        description: 'As a coordinator of the dramatics club, I was responsible for leading the planning and execution of performances. Coordinated various successful street plays, stage plays, and mime acts, drawing large and engaged audiences. Developed confidence in public speaking and performance, leading to impactful and well-received theatrical productions.'
    },
    {
        organization: 'SPIC MACAY',
        role: 'Coordinator',
        timeline: 'Jul 2019 - May 2020',
        description: 'My involvement as the coordinator of the SPIC MACAY Society demonstrated my event management skills, where our team successfully organized events attracting over five hundred attendees. I also played a pivotal role in the planning and execution of the event, ensuring a smooth and enjoyable experience for participants.'
    }
];

// Volunteer Experience Data
export const VOLUNTEER_EXPERIENCE_DATA: VolunteerExperience[] = [
    {
        organization: 'University of Maryland - Robert H. Smith School of Business',
        role: 'Track Representative (MSIS - Spring 2025)',
        timeline: 'Feb 2025 - Present',
        description: 'Facilitating clear communication between cohort members, faculty, and administration, while striving to enhance the educational, cultural, and social experiences of the cohort. This strengthens my interpersonal and organizational abilities.'
    },
    {
        organization: 'AASRA',
        role: 'Member',
        timeline: 'Jan 2018 - May 2021',
        description: 'Coordinated a science exhibition where underprivileged students showcased their creativity via various projects, managed the Diya Project creating seasonal employment opportunities for women in underprivileged areas of Rourkela, Old age home visits, teaching in Birsa Munda School.'
    }
];

//Coursework Data
export const COURSES_DATA: Course[] = [
    {
        name: 'Using Python for Automation',
        platform: 'LinkedIn Learning',
        year: 'July 2025',
        description: 'Recently completed a comprehensive course on Python Automation, where I gained hands-on experience streamlining repetitive tasks such as file handling, bulk data updates, and web scraping using Beautiful Soup and Selenium. The course deepened my skills in parsing, error handling, and working efficiently with the command line. I also explored API integration, enhancing my ability to build connected, scalable solutions. This journey wasn’t just about writing code—it was about leveraging Python to craft smart, time-saving automation tools that elevate productivity and problem-solving in real-world applications.',
        skills: ['Web Scraping', 'Python', 'Process Automation', 'Data Extraction', 'Selenium', 'Beautiful Soup'],
        ongoing: false,
    },
    {
        name: 'Learning Next.js',
        platform: 'LinkedIn Learning',
        year: 'July 2025',
        description: 'Through this course, I gained a solid foundation in Next.js and learned how to leverage its features to enhance the developer experience and improve application performance. The course provided a comprehensive, hands-on project that guided me through the entire development lifecycle—from setup to cloud deployment—enabling me to understand the practical applications of server-side rendering, routing, and API integration. This experience has equipped me with the skills and confidence to apply Next.js and TypeScript effectively in future web development projects.',
        skills: ['Next.js', 'Web Development', 'React.js', 'Frontend Development'],
        ongoing: false,
    },
    {
        name: 'Product Management First Steps',
        platform: 'LinkedIn Learning',
        year: 'June 2025',
        description: 'Throughout the course, I learned to identify various types of products and distinguish between different industry sectors. I explored the essential elements that contribute to building a high-quality extended team and gained insight into effectively managing a product life cycle. The course also covered how to develop a strong research plan, how to break down and present a compelling idea pitch, and how to manage product iterations by identifying versions, releases, and sprints. Additionally, I learned how to track project progress using a burndown chart and define a go-to-market strategy—skills that are foundational to successful product management.',
        skills: ['Product Management', 'Product Life Cycle', 'Agile Methodologies'],
        ongoing: false,
    },
    {
        name: 'GraphQL: The Big Picture',
        platform: 'Pluralsight',
        year: '2023',
        description: 'Comprehensive overview of GraphQL, including schema design, queries, mutations, and subscriptions.',
        skills: ['GraphQL', 'Apollo Client', 'Schema Design', 'API Design'],
        ongoing: false,
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

// Graduate Coursework Data
export const GRADUATE_COURSES_DATA: Course[] = [
    {
        name: 'Data Processing and Analysis in Python',
        platform: 'University of Maryland',
        year: '2025',
        description: 'In-depth study of algorithm design and analysis, covering topics like dynamic programming, graph algorithms, and NP-completeness.',
        skills: ['Python Programming', 'Regular Expressions', 'Text Processing', 'Machine Learning', 'Pandas', 'NumPy'],
        ongoing: false,
    },
    {
        name: 'Database Management Systems',
        platform: 'University of Maryland',
        year: '2025',
        description: 'A comprehensive introduction to machine learning theory and practical applications, including supervised and unsupervised learning models.',
        skills: ['SQL', 'Entity-Relationship Diagrams', 'Relational Databases', 'Database Design'],
        ongoing: false,
    },
    {
        name: 'Data Models and Decision Using R',
        platform: 'University of Maryland',
        year: '2025',
        description: 'Exploring the principles of designing, implementing, and evaluating user interfaces. Focus on user-centered design methodologies.',
        skills: ['Statistics (Hypothesis testing, Correlation, IQR, Outlier analysis, T-test)', 'Advanced Excel', 'R Programming', 'Data Visualization', 'Data Analysis'],
        ongoing: false,
    },
    {
        name: 'Business Process Analysis for Information Systems',
        platform: 'University of Maryland',
        year: '2025',
        description: 'Exploring the principles of designing, implementing, and evaluating user interfaces. Focus on user-centered design methodologies.',
        skills: ['Business Process Modeling', 'Business Process Management', 'Systems Analysis', 'Requirements Gathering', 'Documentation', 'System Design', 'Agile Methodologies', 'Project Management'],
        ongoing: false,
    },
    {
        name: 'Blockchain Technologies and Business Applications',    
        platform: 'University of Maryland',
        year: '2025',
        description: 'Exploring the principles of designing, implementing, and evaluating user interfaces. Focus on user-centered design methodologies.',
        skills: ['Blockchain', 'Cryptography', 'Distributed Ledger Technology', 'Ethereum'],
        ongoing: true
    }
];

// Contact Page Data
export const CONTACT_DETAILS = {
    email: 'hkushwah@umd.edu',
    location: 'College Park, Maryland, USA'
};

export const SOCIAL_LINKS: SocialLink[] = [
    {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/hemkush/',
        icon: <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd"/></svg>
    },
    {
        name: 'Twitter',
        url: 'https://x.com/HEMANTKUSH57724',
        icon: <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.064c0 2.298 1.634 4.212 3.793 4.649-.65.177-1.353.23-2.064.077.621 1.944 2.423 3.352 4.564 3.39-1.623 1.275-3.665 2.03-5.88 2.03-.38 0-.755-.022-1.124-.067 2.094 1.344 4.585 2.126 7.24 2.126 8.683 0 13.44-7.243 13.44-13.44 0-.205-.005-.41-.014-.614a9.617 9.617 0 002.356-2.448z"/></svg>
    },
    {
        name: 'Instagram',
        url: 'https://www.instagram.com/hem__kush?igsh=anplMnRzNjJ1ODJy',
        icon: <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.058-1.689-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" clipRule="evenodd" /></svg>
    },
    {
        name: 'GitHub',
        url: 'https://github.com/Hemkush',
        icon: <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.165 6.839 9.489.5.092.682-.218.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.82c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.942.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" /></svg>
    },
];

export const SOCIAL_LIFE_IMAGES: string[] = [
    '/grp.jpg', // University of Maryland view
    '/single.jpg',
    '/UMD_cover.png', // University of Maryland cover
  '/NIT_mainBuilding.png', // National Institute of Technology gate
  '/UMD_cover1.png', 
  '/NIT Gate.png',
];

// export async function getPosts() {
//     try {
//         unstable_noStore(); // Prevent caching of this function
//        // await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate a delay
//         const data = await sql`SELECT * FROM posts`;
//         console.log("Posts data:", data.rows);
//     return data.rows;
//     } catch (error) {
//         console.error("Error connecting to the database:", error);
//     }
// }

// export async function getPosts() {
//   try {
//     unstable_noStore(); // Prevent caching of this function
//     const data = await sql`SELECT * FROM posts`;

//     // Convert data to string format
//     const replacer = (key: string, value: unknown) => {
      
//       return value;
//     };

//     const postsContext = data.rows.map((post) => {
//       return `
//         Title: ${JSON.stringify(post.title, replacer)}
//         Content: ${JSON.stringify(post.content, replacer)}
//         Date: ${JSON.stringify(post.date, replacer)}
//       `;
//     }).join('\n');

//     return postsContext.replace(/"/g, "'"); // Use single quotes to avoid issues
//   } catch (error) {
//     console.error("Error connecting to the database:", error);
//   }
// }

export const getPortfolioContext = () => {
    // A helper function to prevent stringifying React nodes (icons)
    const replacer = (key: string, value: unknown) => {
        if (key === 'icon') {
        return 'react_node';
        }
        return value;
    };

    const context = `
        Introduction: ${JSON.stringify(INTRODUCTION, replacer)}
        Objective: ${OBJECTIVE}
        Skills: ${JSON.stringify(SKILLS_DATA, replacer)}
        Graduate Courses: ${JSON.stringify(GRADUATE_COURSES_DATA, replacer)}
        Projects: ${JSON.stringify(PROJECT_DATA, replacer)}
        Courses: ${JSON.stringify(COURSES_DATA, replacer)}
        Work Experience: ${JSON.stringify(WORK_EXPERIENCE_DATA, replacer)}
        Leadership Roles: ${JSON.stringify(LEADERSHIP_ROLES_DATA, replacer)}
        Volunteer Experience: ${JSON.stringify(VOLUNTEER_EXPERIENCE_DATA, replacer)}
        Education: ${JSON.stringify(EDUCATION_DATA, replacer)}
        Hobbies: ${JSON.stringify(HOBBIES_DATA, replacer)}
        Achievements: ${JSON.stringify(ACHIEVEMENTS_DATA, replacer)}
    `;
    return context.replace(/"/g, "'"); // Use single quotes to avoid issues
};