
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
  title: "AI Engineer | Full-Stack AI Systems Builder",
  text: "AI Engineer with 3+ years of software development experience and currently pursuing an MS in Information Systems at the University of Maryland (GPA 3.94). I design and ship production-ready AI applications across RAG, LLM orchestration, and full-stack platforms using FastAPI, Next.js, PostgreSQL, and cloud-native tooling. My focus is building reliable systems that balance model quality, performance, and business impact through scalable architecture, strong engineering discipline, and user-first product thinking."
};

// Text content for the objective section
export const OBJECTIVE: string = "To contribute as an AI Engineer by building robust, production-grade intelligent systems that combine LLM capabilities, retrieval pipelines, and full-stack engineering excellence. I aim to solve high-value business problems through measurable outcomes, reliable deployment practices, and thoughtful user experience design.";

// Education history data
export const EDUCATION_DATA: EducationItem[] = [
  {
    degree: 'Master of Science in Information Systems',
    institution: 'University of Maryland - Robert H. Smith School of Business',
    years: '2025 - 2026',
    logo: '/business_logo.ico',
    gpa: '3.94/4.00',
    skills: ['Problem Solving', 'Business Acumen', 'Empathy', 'Strategic Thinking', 'Data Analysis', 'SQL', 'Leadership', 'Communication', 'Teamwork', 'Python', 'Collaborative Problem Solving']
  },  
  {
    degree: 'B.Tech in Mechanical Engineering',
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
    name: 'Sports',
    description: 'Playing cricket, badminton, and staying active outdoors.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
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
  // AI & LLM Engineering
  'RAG Pipelines', 'LLM Orchestration', 'Multi-Agent Systems', 'Prompt Engineering', 'ReACT Agents',
  'LangChain', 'LangGraph', 'Google Gemini API', 'OpenAI API', 'Agentic AI',
  'Fine-Tuning LLMs', 'Conversational AI', 'AI Content Generation', 'Token Optimization',
  'Structured Output Extraction', 'MCP (Model Context Protocol)', 'System Design',
  // Vector & Search
  'Vector Databases', 'Embeddings & Semantic Search', 'pgvector', 'ChromaDB', 'Qdrant',
  // ML & Data Science
  'Machine Learning', 'Deep Learning', 'Natural Language Processing',
  'Scikit-Learn', 'PyTorch', 'Keras', 'XGBoost', 'LightGBM', 'Feature Engineering',
  'Pandas', 'NumPy', 'R (Statistical Modeling)', 'Data Analytics', 'Data Visualization', 'Statistics',
  // Databases
  'PostgreSQL', 'MongoDB', 'Neo4j', 'MySQL', 'SQL',
  // Full-Stack & Backend
  'Python', 'TypeScript', 'JavaScript', 'Java',
  'FastAPI', 'Flask', 'Next.js', 'React', 'Node.js', 'SpringBoot',
  'REST APIs', 'Docker', 'CI/CD Pipelines', 'AWS', 'Vercel',
  // Dev Practices
  'Tailwind CSS', 'Git & GitHub', 'Agile Scrum', 'Web Scraping', 'Web Development',
];

// List of soft skills
export const SKILLS_SOFT: string[] = [
  'Adaptability', 'Critical Thinking', 'Creativity', 'Detail-Oriented', 'Documentations', 'Problem-Solving', 'Collaboration', 'Communication', 'Time Management', 'Leadership', 'Empathy', 'Teamwork', 'Project Management', 'User-Centric Design', 'Business Acumen', 'Strategic Thinking'
];

export const PROJECT_DATA: Project[] = [
  {
      name: 'AI-Driven Marketing Intelligence Platform',
      timeline: 'Jan 2025 - May 2025',
      ongoing: false,
      category: 'ai',
      description: 'Production SaaS that converts a 10-minute business interview into a complete 90-day go-to-market strategy — deployed live on Google Cloud Run + Firebase Hosting. Engineered a 10-agent AI pipeline (adaptive interview → embedding-ranked competitive scan via Google Places → TAM/SAM/SOM market analysis → brand positioning → psychographic buyer personas → channel strategy → 90-day roadmap → DALL-E 3 content studio) with Pydantic-validated JSON outputs and deterministic fallbacks ensuring zero downtime. Built pgvector RAG memory (1536-dim embeddings, cosine similarity retrieval) that reduced prompt token usage 40%. Shipped a full MLOps observability stack: 7 Prometheus metrics, Sentry APM, per-agent LLM cost tracking, output quality scoring (0.0–1.0), pipeline step tracing, and SHA-256 DB-backed response cache with 24h TTL.',
      skills: ['FastAPI', 'OpenAI API', 'pgvector', 'PostgreSQL', 'React', 'Docker', 'Prometheus', 'Sentry', 'DALL-E 3', 'Multi-Agent Systems', 'RAG', 'Google Places API', 'Cloud Run'],
      githubUrl: 'https://github.com/Hemkush',
      liveUrl: 'https://ai-marketing-prod.web.app/',
      caseStudyUrl: '/marketpilot-showcase.html',
  },
  {
      name: 'AlphaDesk - Agentic Portfolio Intelligence',
      timeline: '2026',
      ongoing: false,
      category: 'ai',
      description: 'Built an AI-powered portfolio manager workstation that compresses the pre-market workflow into one operating layer. AlphaDesk combines deterministic portfolio analytics, signal monitoring, single-name research, risk review, and PM-ready reporting through a LangGraph-style multi-agent architecture. The system is designed for public equity portfolio managers, using specialized agents for metrics, research, risk, correlation, and report generation, with human approval gates for risk-sensitive flows and source-aware outputs for reviewability.',
      skills: ['FastAPI', 'LangGraph', 'LangChain', 'React', 'Tailwind CSS', 'PostgreSQL', 'Redis', 'Celery', 'Chart.js', 'Multi-Agent Systems', 'Risk Analytics', 'Portfolio Intelligence'],
      caseStudyUrl: '/projects/alphadesk',
  },
  {
      name: 'Document Analysis Multiagent RAG-Chatbot',
      timeline: 'July 2025 - Present',
      ongoing: true,
      category: 'ai',
      description: 'Developed a multiagent RAG chatbot system using LangGraph and Gemini LLM with ReACT agents to intelligently process documents from PDFs, websites, and databases. Implemented an end-to-end pipeline with VLM embeddings and Chroma vector store for enhanced retrieval accuracy. Built a full-stack web application with React/Next.js frontend and FastAPI backend featuring secure user authentication, document upload/analysis interface, and persistent memory system enabling users to save, manage, and retrieve analyzed documents with personalized responses based on user background.',
      skills: ['LangGraph', 'Gemini API', 'ReACT Agents', 'ChromaDB', 'FastAPI', 'Next.js', 'React', 'RAG', 'Vector Embeddings', 'Multi-Agent Systems', 'Python'],
      githubUrl: 'https://github.com/Hemkush',
  },
  {
      name: 'Event Scheduler AI — Intelligent University Scheduling Platform',
      timeline: 'Nov 2025 - Dec 2025',
      ongoing: false,
      category: 'ai',
      description: 'Built an AI scheduling platform designed to streamline event management for educational institutions. Developed an AI Scheduling Assistant that provides context-aware time suggestions with reasoning, a Smart Availability Calculator that computes real-time availability percentages (e.g., "85% of MBA students available") to prevent conflicts, and bidirectional sync with Google Calendar via MCP server. Features automated attendance tracking via QR codes and an interactive dashboard to visualize attendance trends by program. Deployed on AWS (Elastic Beanstalk, EC2, RDS, S3).',
      skills: ['LangChain', 'Gemini API', 'MCP (Google Calendar)', 'Flask', 'React', 'MySQL', 'AWS', 'LangChain Agents', 'Vector DB', 'Python', 'Full-Stack Development'],
      githubUrl: 'https://github.com/Hemkush',
  },
  {
      name: 'AI Chatbot System — UMD Smith School',
      timeline: 'Feb 2025 - May 2025',
      ongoing: false,
      category: 'ai',
      description: 'Designed and developed a RAG-powered AI chatbot for UMD Smith School faculty and administrative staff. Conducted stakeholder discovery sessions to define requirements: policy summarization with source attribution, admin document management panel, and guided chat interface. Implemented RAG architecture with sentence-transformers/OpenAI embeddings and Flask backend. Applied Agile methodology with weekly stakeholder syncs. Stack: React + Tailwind (frontend), Flask (backend), OpenAI/Anthropic (LLM), sentence-transformers (embeddings).',
      skills: ['RAG', 'Flask', 'React', 'Tailwind CSS', 'OpenAI API', 'Anthropic API', 'sentence-transformers', 'System Design', 'Figma', 'Python'],
      githubUrl: 'https://github.com/Hemkush',
  },
  {
      name: 'AI-Powered Portfolio Website',
      timeline: 'June 2025 - Mar 2026',
      ongoing: false,
      category: 'ai',
      description: 'Built a production-grade AI portfolio from scratch using Next.js 15 App Router, TypeScript, and Tailwind CSS. Implemented a RAG-powered AI chatbot using Google Gemini embeddings and PostgreSQL vector search — answers recruiter questions about my background, projects, and skills in real time. Built a live AI Landscape news feed that aggregates 6 RSS sources hourly, then uses Gemini to categorize articles, extract model releases, surface protocol updates (MCP, A2A), and generate a daily digest with per-article insights. Applied ISR edge caching to keep Gemini API calls under 24/day while serving all visitors in under 30ms. Includes Google OAuth (NextAuth v5), contact form, resume delivery, and full mobile-responsive navigation.',
      skills: ['Next.js 15', 'TypeScript', 'React', 'Tailwind CSS', 'Google Gemini API', 'RAG', 'pgvector', 'ISR / Edge Caching', 'NextAuth', 'Vercel', 'Full-Stack Development'],
      githubUrl: 'https://github.com/Hemkush/portfolio-website',
      liveUrl: 'https://hemant-kushwaha.vercel.app',
  },
  {
      name: 'AI-Powered Social Media Automation Bot',
      timeline: 'June 2025 - Aug 2025',
      ongoing: false,
      category: 'ai',
      description: 'Developed an intelligent social media automation bot using Python and Google Gemini LLM that streamlines content creation and distribution across multiple platforms (X/Twitter, Reddit). Features AI-powered content generation with platform-specific optimization, automated scheduling engine for 30+ content variations, and intuitive GUI built with CustomTkinter. Integrates TechCrunch API for article sourcing and implements smart scheduling using Cron and APScheduler for consistent posting. Reduced manual posting efforts by 90%. User can edit drafts, add instructions, preview with platform-specific formatting, and see real-time character counts.',
      skills: ['Python', 'Google Gemini API', 'Prompt Engineering', 'APScheduler', 'Twitter API', 'Reddit API', 'CustomTkinter', 'Web Scraping', 'Task Automation', 'Cron Jobs'],
      githubUrl: 'https://github.com/Hemkush',
  },
  {
      name: 'AI-Driven Analytical Dashboard for E-Livestock Global System',
      timeline: 'Feb 2025 - May 2025',
      ongoing: false,
      category: 'data',
      description: 'Led a 5-member team to build an AI-driven analytical dashboard for E-Livestock Global, directly interfacing with the CEO for requirements gathering. Created an ELT data pipeline to make farm data analytics-ready for a React dashboard (Chart.js). Built ML predictive models (XGBoost and LightGBM) for disease management and optimized feeding. Delivered formal documentation including Statement of Work (SOW), System Analysis Report, Design Analysis Report, and Final Report. Dashboard enables trend analysis, forecasting, and automated insight summaries for non-technical stakeholders.',
      skills: ['XGBoost', 'LightGBM', 'ELT Pipeline', 'React', 'Chart.js', 'Python', 'Pandas', 'Data Modeling', 'Stakeholder Management', 'System Design', 'SQL'],
      githubUrl: 'https://github.com/Hemkush',
  },
  {
      name: 'Data Mining & Predictive Analytics — YouTube Success Prediction',
      timeline: '2025',
      ongoing: false,
      category: 'data',
      description: 'Analyzed a dataset of ~100K YouTube videos to train and evaluate classification models predicting video "success." Applied data preprocessing, feature engineering, and cross-validation across multiple model architectures. Built predictive models in R (Logistic Regression, Nonlinear Modeling), achieving 77% accuracy. Applied evaluation metrics to assess performance, optimize complexity control, and improve generalization. Topics covered: Introduction to ML, Classification, Logistic Regression, Nonlinear Modeling, Evaluation Metrics, Cross Validation, Complexity Control.',
      skills: ['R Programming', 'Logistic Regression', 'Machine Learning', 'Feature Engineering', 'Cross Validation', 'Data Preprocessing', 'Predictive Modeling', 'Statistical Analysis'],
  },
  {
      name: 'Analyzing User Preferences and Hotel Feedback',
      timeline: '2025',
      ongoing: false,
      category: 'data',
      description: 'Data-driven analysis project to identify active reviewers, determine frequent traveler patterns, pinpoint service gaps, discover popular destinations, highlight top-rated regions, study seasonal travel trends, and recommend investment locations. Designed the Entity-Relationship Diagram (ERD) and defined the relational schema, business rules, and referential integrity actions. Used Python to clean and format data. Wrote SQL queries to create tables and perform analytical queries.',
      skills: ['SQL', 'PostgreSQL', 'ERD Design', 'Python', 'Pandas', 'Data Analysis', 'Database Design', 'Data Wrangling'],
  },
  {
      name: 'Blockchain-Based Real Estate Start-Up',
      timeline: '2025',
      ongoing: false,
      category: 'consulting',
      description: 'Led a team in developing a real estate start-up concept using blockchain technology as a UMD coursework project. Applied comprehensive business development frameworks including market analysis, competitor benchmarking, Porter\'s Five Forces, cost-benefit modeling, and growth forecasting. Designed and implemented a prototype application using blockchain and React with publicly available data to support secure, transparent, and efficient property transactions. Conducted business sustainability and societal impact analysis. Synthesized research findings and presented actionable recommendations for market entry, adoption strategies, and long-term scalability.',
      skills: ['Blockchain', 'React', 'Market Analysis', 'Business Strategy', 'Financial Modeling', 'Team Leadership', 'Porter\'s Five Forces'],
  },
  {
      name: 'COVID-19 Data Analysis using Python',
      timeline: '2020',
      ongoing: false,
      category: 'data',
      description: 'Utilized Python (Pandas, NumPy, Matplotlib) to clean and analyze 100K+ global COVID-19 records, identifying trends in infection, recovery, and mortality rates. Applied data wrangling and visualization skills to derive actionable insights. Created interactive visualizations and summarized findings into a report that scored 95%+ on evaluation, demonstrating proficiency in data storytelling, statistical analysis, and real-world problem solving.',
      skills: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Data Analysis', 'Data Visualization', 'Data Wrangling'],
  },
  {
      name: 'Analyzing Big Data with SQL',
      timeline: '2020',
      ongoing: false,
      category: 'data',
      description: 'Applied advanced SQL queries using Microsoft SQL Server to analyze and extract insights from large-scale datasets, demonstrating strong skills in data querying, aggregation, and trend analysis across real-world business scenarios.',
      skills: ['SQL', 'Microsoft SQL Server', 'Data Analysis', 'Data Wrangling', 'Query Optimization'],
  },
];

// Work Experience Data
export const WORK_EXPERIENCE_DATA: WorkExperience[] = [
    {
        company: 'University of Maryland — Robert H. Smith School of Business',
        role: 'Graduate Research Assistant — AI Engineering',
        timeline: 'Jan 2025 - Present',
        description: [
            'Designed and shipped MarketPilot AI — a production SaaS converting a 10-minute business interview into a full 90-day go-to-market strategy, live on Google Cloud Run + Firebase with real user traffic.',
            'Architected a 10-agent AI pipeline (adaptive interview → embedding-ranked competitive scan → TAM/SAM market analysis → brand positioning → psychographic personas → channel strategy → 90-day roadmap → DALL-E 3 content studio) with Pydantic-validated JSON outputs and deterministic fallbacks for 100% API uptime.',
            'Built embedding-based competitor pre-filtering using OpenAI text-embedding-3-small + cosine similarity to rank 20 discovered competitors before LLM enrichment — cutting token usage 4× and eliminating request timeouts.',
            'Engineered a full MLOps observability layer: 7 Prometheus metrics (LLM cost, latency, quality scores, cache hit rate), Sentry APM, per-agent output quality scoring (0.0–1.0 schema completeness), and pipeline step tracing with duration_ms logging.',
            'Implemented pgvector RAG memory (1536-dim embeddings, top-k cosine retrieval) and a DB-backed SHA-256 response cache (24h TTL) — reducing redundant LLM API calls by ~60% in production.',
            'Built a two-stage DALL-E 3 content studio: GPT-4o-mini generates design brief + image prompt, DALL-E 3 renders outputs (logos, banners, social visuals, ad copy) in 5 tone variants stored as permanent base64.',
            'Developed a three-module AI teaching support tool (Learn, Think, Do) with LLM-powered lead qualification agents, content generation agents, and AI-driven A/B testing as a parallel research deliverable.',
        ],
        skills: ['FastAPI', 'React', 'PostgreSQL', 'OpenAI API', 'LangChain', 'Docker', 'Alembic', 'Multi-Agent Systems', 'RAG', 'Prompt Engineering', 'Vector Memory', 'CI/CD', 'Python'],
        caseStudyUrl: '/marketpilot-showcase.html',
        liveUrl: 'https://ai-marketing-prod.web.app/',
    },
    {
        company: 'University of Maryland — Robert H. Smith School of Business',
        role: 'AI Chatbot System Developer (Administrative Assistant)',
        timeline: 'Feb 2025 - May 2025',
        description: [
            'Designed and developed a RAG-powered AI chatbot system for UMD Smith School administrative staff and faculty, enabling policy summarization with source-aware reporting.',
            'Led Discovery & Scoping phase — initiated stakeholder meetings with project sponsor (Professor) and primary end-users to identify pain points, define requirements, and establish success metrics.',
            'Proposed and implemented a high-level system design based on Retrieval-Augmented Generation (RAG) architecture, approved by stakeholders after evaluation against performance and maintainability criteria.',
            'Built admin document management panel enabling staff to add, view, and remove documents and website links fed to the chatbot.',
            'Applied Agile methodology with weekly stakeholder syncs to demonstrate progress, gather feedback, and adapt requirements iteratively.',
            'Tech stack: React + Tailwind (frontend), Flask (backend), sentence-transformers/OpenAI embeddings, Figma for UI design.',
        ],
        skills: ['RAG', 'Flask', 'React', 'Tailwind CSS', 'OpenAI API', 'Anthropic API', 'sentence-transformers', 'Figma', 'Agile', 'System Design', 'Stakeholder Management'],
    },
    {
        company: 'University of Maryland — Robert H. Smith School of Business',
        role: 'Impact Consulting Fellow — Team Lead (TechnBloom)',
        timeline: 'May 2025 - Aug 2025',
        description: [
            'Led a 7-member interdisciplinary consulting team to evaluate TechnBloom\'s USDA-certified beef processing initiative, coordinating weekly meetings, task alignment, and cross-functional research collaboration.',
            'Conducted comprehensive market, operational, supply chain, and financial analyses, developing data-driven models that informed business sustainability planning, startup feasibility, and long-term farm-to-market growth strategy.',
            'Designed an integrated farm-to-DMV distribution and data pipeline, mapping stakeholders, transportation routes, processing flows, and interoperability requirements.',
            'Developed a scalable business model and commercialization strategy for a rural-to-urban food system, emphasizing food security, sustainability, and economic development.',
            'Produced strategic roadmap enabling TechnBloom to position for partnerships with universities, grocers, and institutional buyers along the East Coast.',
        ],
        skills: ['Team Leadership', 'Strategic Consulting', 'Market Analysis', 'Financial Modeling', 'Supply Chain', 'Data Pipeline Design', 'Stakeholder Management', 'Business Strategy'],
    },
    {
        company: 'University of Maryland — Robert H. Smith School of Business',
        role: 'Impact Consulting Fellow — Website Manager (Best for DMV)',
        timeline: 'Jun 2025 - Aug 2025',
        description: [
            'Served as website manager for the Best for DMV Digital Content & Insights Visualization Project, mapping the social and environmental impact landscape across Maryland, Virginia, and D.C.',
            'Integrated Google Maps with the Best for DMV website to create an interactive ecosystem mapping interface for regional organizations.',
            'Developed a real-time data integration system enabling seamless addition of new organizations through Excel database updates.',
            'Conducted comprehensive research on regional organizations to identify and fill missing data gaps.',
            'Connected existing GoDaddy domain (bestfordmv.com) to Wix-hosted website infrastructure and successfully launched the live website serving the DMV impact community.',
        ],
        skills: ['Google Maps API', 'Web Development', 'Data Integration', 'Research', 'Content Management', 'Cross-functional Collaboration'],
    },
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



