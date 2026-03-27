import type { Metadata } from 'next';
import React from 'react';
import { ProjectsClient } from './projectsClient';
import { PROJECT_DATA } from '../constant';
import { PROJECT_EVIDENCE } from './projectEvidence';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Hemant Kushwaha AI and software projects: RAG chatbot, multi-agent marketing platform, social media automation, e-commerce AI dashboard, event scheduling AI, and more. Built with FastAPI, Next.js, PostgreSQL, Gemini, and LangChain.',
  keywords: [
    'AI projects portfolio', 'RAG chatbot', 'multi-agent system', 'LLM orchestration project',
    'FastAPI Python project', 'Next.js AI app', 'pgvector RAG', 'Gemini AI project',
    'social media automation AI', 'marketing intelligence AI', 'document analysis RAG',
    'e-livestock dashboard', 'event scheduler AI', 'full-stack AI projects',
    'Hemant Kushwaha projects', 'machine learning projects', 'production AI systems',
    'AI engineer portfolio projects', 'LangChain project',
  ],
  alternates: { canonical: 'https://hemant-kushwaha.vercel.app/home/project' },
  openGraph: {
    title: 'Projects — Hemant Kushwaha',
    description:
      'RAG pipelines, multi-agent workflows, LLM orchestration, and full-stack AI applications. Built with FastAPI, Next.js, Gemini, and PostgreSQL.',
    url: 'https://hemant-kushwaha.vercel.app/home/project',
    images: [{ url: '/profile.png', width: 800, height: 800, alt: 'Hemant Kushwaha — AI Engineer Projects' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI & Full-Stack Projects — Hemant Kushwaha',
    description: 'RAG chatbots, multi-agent systems, LLM orchestration, full-stack AI apps. FastAPI · Next.js · Gemini · PostgreSQL.',
    images: ['/profile.png'],
  },
};

export default function ProjectPage() {
  return (
    <div className="page-shell">
      <header className="page-header">
        <h1 className="page-title">Projects</h1>
        <p className="page-subtitle">Selected implementations, architecture decisions, and measurable outcomes.</p>
      </header>
      <ProjectsClient projects={PROJECT_DATA} evidence={PROJECT_EVIDENCE} />
    </div>
  );
}
