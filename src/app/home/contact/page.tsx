import type { Metadata } from 'next';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact Hemant Kushwaha for AI Engineer, ML Engineer, or LLM Engineer opportunities. Open to remote, hybrid, and in-office roles nationwide. OPT-eligible May 2026. Available to start immediately.',
  keywords: [
    'hire AI engineer', 'contact Hemant Kushwaha', 'AI engineer available', 'ML engineer hiring',
    'LLM engineer for hire', 'OPT eligible AI engineer 2026', 'AI engineer remote',
    'machine learning engineer hire', 'AI engineer job search', 'recruit AI engineer',
    'AI engineer contact', 'full-stack AI developer hire', 'RAG engineer available',
    'AI engineer open to work', 'AI engineering opportunities',
  ],
  alternates: { canonical: 'https://hemant-kushwaha.vercel.app/home/contact' },
  openGraph: {
    title: 'Contact Hemant Kushwaha — AI Engineer',
    description:
      'Reach out for AI Engineer, ML Engineer, or LLM Engineer roles. Open to remote, hybrid, and relocation. OPT-eligible May 2026.',
    url: 'https://hemant-kushwaha.vercel.app/home/contact',
    images: [{ url: '/profile.png', width: 800, height: 800, alt: 'Contact Hemant Kushwaha — AI Engineer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Hemant Kushwaha — AI Engineer',
    description: 'Open to AI Engineer / ML Engineer roles. OPT-eligible May 2026. Remote, hybrid, or relocation.',
    images: ['/profile.png'],
  },
};

export default function ContactPage() {
  return <ContactForm />;
}
