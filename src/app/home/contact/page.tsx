import type { Metadata } from 'next';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Hemant Kushwaha for AI Engineer, ML Engineer, or LLM Engineer opportunities. Open to remote, hybrid, and relocation roles. OPT-eligible May 2026.',
  openGraph: {
    title: 'Contact Hemant Kushwaha — AI Engineer',
    description:
      'Reach out for AI Engineer, ML Engineer, or LLM Engineer opportunities. Open to remote, hybrid, and relocation. OPT-eligible May 2026.',
    url: '/home/contact',
  },
};

export default function ContactPage() {
  return <ContactForm />;
}
