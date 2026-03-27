import type { Metadata } from 'next';
import AISkillsClient from '@/app/ui/ai-expertise/AISkillsClient';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hemant-kushwaha.vercel.app';

export const metadata: Metadata = {
  title: 'Hemant Kushwaha — AI Engineer | RAG, LLM & Full-Stack AI Systems',
  description:
    'AI Engineer with 3.5+ years of experience building production RAG pipelines, LLM orchestration, multi-agent systems, and full-stack AI apps. MS Information Systems at UMD (GPA 3.94). OPT-eligible May 2026. Open to AI Engineer and ML Engineer roles.',
  keywords: [
    'AI Engineer', 'ML Engineer', 'LLM Engineer', 'Machine Learning Engineer',
    'RAG pipeline', 'LLM orchestration', 'multi-agent systems', 'vector search',
    'Retrieval Augmented Generation', 'pgvector', 'FastAPI', 'Next.js', 'Python',
    'Gemini', 'LangChain', 'full-stack AI', 'AI portfolio', 'hire AI engineer',
    'OPT eligible AI engineer', 'Hemant Kushwaha', 'University of Maryland', 'UMD',
    'NIT Rourkela', 'AI engineer open to work', 'AI engineer 2026',
  ],
  alternates: { canonical: BASE_URL },
  openGraph: {
    title: 'Hemant Kushwaha — AI Engineer | RAG, LLM & Full-Stack AI',
    description:
      'Building production RAG pipelines, LLM orchestration, and full-stack AI systems. MS at UMD (GPA 3.94). OPT-eligible May 2026.',
    url: BASE_URL,
    images: [{ url: '/profile.png', width: 800, height: 800, alt: 'Hemant Kushwaha — AI Engineer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hemant Kushwaha — AI Engineer | RAG, LLM & Full-Stack AI',
    description:
      'Production RAG pipelines, LLM orchestration, multi-agent systems. MS UMD GPA 3.94. OPT-eligible May 2026.',
    images: ['/profile.png'],
  },
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Hemant Kushwaha',
  url: BASE_URL,
  image: `${BASE_URL}/profile.png`,
  jobTitle: 'AI Engineer',
  description:
    'AI Engineer with 3.5+ years building production RAG pipelines, LLM orchestration, multi-agent workflows, and full-stack AI applications.',
  alumniOf: [
    {
      '@type': 'EducationalOrganization',
      name: 'University of Maryland — Robert H. Smith School of Business',
      url: 'https://www.rhsmith.umd.edu',
    },
    {
      '@type': 'EducationalOrganization',
      name: 'National Institute of Technology Rourkela',
      url: 'https://www.nitrkl.ac.in',
    },
  ],
  knowsAbout: [
    'Retrieval Augmented Generation', 'LLM Orchestration', 'Multi-Agent Systems',
    'Vector Databases', 'FastAPI', 'Next.js', 'PostgreSQL', 'Python', 'TypeScript',
    'Google Gemini', 'LangChain', 'pgvector', 'Machine Learning', 'AI Engineering',
  ],
  sameAs: [
    'https://www.linkedin.com/in/hemant-kushwaha-/',
    'https://github.com/Hemkush',
  ],
};

export default function AISkillsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <AISkillsClient />
    </>
  );
}
