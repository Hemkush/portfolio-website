'use client';

import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Section } from '../about/section';
import { CONTACT_DETAILS, SOCIAL_LINKS } from '../constant';
import { CtaButton } from '@/app/ui/components/cta-button';

type SubmissionStatus = 'idle' | 'sending' | 'success' | 'error';

const CONTACT_NOTES = [
  'Best for: AI Engineer, ML Engineer, LLM Engineer opportunities',
  'Response time: Usually within 24 to 48 hours',
  'Location: Open to remote, hybrid, and relocation roles',
];

const MESSAGE_TIPS = [
  'Role title and team name',
  'Key expectations and tech stack',
  'Timeline and interview process',
];

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const messageLength = message.trim().length;
  const messageMinLength = 20;
  const messageMaxLength = 1200;
  const messageTooShort = message.length > 0 && messageLength < messageMinLength;
  const messageTooLong = messageLength > messageMaxLength;
  const formIsValid = name.trim().length > 0 && emailIsValid && messageLength >= messageMinLength && !messageTooLong;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formIsValid) {
      setStatus('error');
      setFeedbackMessage('Please fix the highlighted fields before sending your message.');
      return;
    }

    setStatus('sending');
    setFeedbackMessage('');

    const formData = {
      id: uuidv4(),
      name,
      email,
      message,
    };

    fetch('/api/contactApi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then(async (response) => {
        const data = await response.json().catch(() => ({}));
        if (!response.ok) {
          throw new Error(data?.message || 'Error sending message. Please try again.');
        }
      })
      .then(() => {
        setStatus('success');
        setFeedbackMessage('Thank you for your message. I will get back to you soon.');
        setName('');
        setEmail('');
        setMessage('');
      })
      .catch((error: Error) => {
        setStatus('error');
        setFeedbackMessage(error.message || 'Error sending message. Please try again.');
      })
      .finally(() => {
        setTimeout(() => setStatus('idle'), 5000);
      });
  };

  return (
    <div className="page-shell">
      <header className="page-header">
        <h1 className="page-title">Let&apos;s Connect</h1>
        <p className="page-subtitle">I&apos;m happy to discuss AI engineering roles, projects, and collaboration opportunities.</p>
      </header>

      <div className="mb-8 grid gap-3 sm:grid-cols-3">
        {CONTACT_NOTES.map((note) => (
          <div key={note} className="rounded-lg border border-cyan-400/25 bg-cyan-400/5 px-4 py-3 text-sm text-slate-300">
            {note}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
        <Section title="Send a Message">
          <p className="mb-5 text-sm text-slate-300">
            Share your role, team, and expectations. The more context you provide, the more specific I can be in response.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-200">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={status === 'sending'}
                className="w-full rounded-md border border-slate-600 bg-slate-800/70 py-2 px-3 text-white focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:opacity-50"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-200">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={status === 'sending'}
                className={`w-full rounded-md border bg-slate-800/70 py-2 px-3 text-white focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:opacity-50 ${
                  email.length > 0 && !emailIsValid ? 'border-red-500' : 'border-slate-600'
                }`}
              />
              {email.length > 0 && !emailIsValid && <p className="mt-1 text-xs text-red-400">Please enter a valid email address.</p>}
            </div>

            <div>
              <label htmlFor="message" className="mb-1 block text-sm font-medium text-slate-200">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                disabled={status === 'sending'}
                className={`w-full rounded-md border bg-slate-800/70 py-2 px-3 text-white focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:opacity-50 ${
                  messageTooShort || messageTooLong ? 'border-red-500' : 'border-slate-600'
                }`}
              />
              <div className="mt-1 flex items-center justify-between">
                <p className={`text-xs ${messageTooShort || messageTooLong ? 'text-red-400' : 'text-slate-400'}`}>
                  {messageTooShort
                    ? `Message should be at least ${messageMinLength} characters.`
                    : messageTooLong
                      ? `Message should be at most ${messageMaxLength} characters.`
                      : `Tip: include role scope, team, and timeline (${messageMinLength}+ characters).`}
                </p>
                <p className={`text-xs ${messageTooLong ? 'text-red-400' : 'text-slate-500'}`}>
                  {messageLength}/{messageMaxLength}
                </p>
              </div>
            </div>

            <div className="pt-1">
              <CtaButton
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                disabled={status === 'sending' || !formIsValid}
                className="rounded-lg text-sm normal-case tracking-normal shadow-lg shadow-cyan-500/20 disabled:bg-gray-600 disabled:shadow-none"
              >
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </CtaButton>
              {status === 'success' && <p className="mt-3 text-center text-sm text-green-400">{feedbackMessage}</p>}
              {status === 'error' && <p className="mt-3 text-center text-sm text-red-400">{feedbackMessage}</p>}
            </div>
          </form>
        </Section>

        <div className="flex flex-col gap-8">
          <Section title="Direct Contact">
            <div className="space-y-4">
              <div className="flex items-center gap-3 rounded-lg border border-slate-700/70 bg-slate-900/40 px-3 py-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href={`mailto:${CONTACT_DETAILS.email}`} className="text-slate-200 transition-colors hover:text-cyan-300">
                  {CONTACT_DETAILS.email}
                </a>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-slate-700/70 bg-slate-900/40 px-3 py-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-slate-200">{CONTACT_DETAILS.location}</span>
              </div>
            </div>
          </Section>

          <Section title="What to Include">
            <p className="mb-3 text-sm text-slate-300">For a faster and better response, include:</p>
            <ul className="list-disc space-y-2 pl-5 text-sm text-slate-300">
              {MESSAGE_TIPS.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          </Section>

          <Section title="Find Me On Social Media">
            <div className="grid grid-cols-2 gap-3">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-lg border border-slate-700/70 bg-slate-900/50 p-3 transition-all duration-300 hover:border-cyan-400/50 hover:bg-slate-800/60"
                >
                  <div className="text-cyan-500 transition-colors group-hover:text-cyan-300">{link.icon}</div>
                  <span className="font-semibold text-slate-100">{link.name}</span>
                </a>
              ))}
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}

