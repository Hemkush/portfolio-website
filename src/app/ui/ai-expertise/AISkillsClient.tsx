"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CtaButton } from '@/app/ui/components/cta-button';
import { AcademicPanel, CategoryPanel, DifferentiatorCard, EvidenceProjectCard, SkillBar, StatCard } from '@/app/ui/ai-expertise/components';
import { ACADEMIC_COURSES, DIFFERENTIATORS, PROJECTS, PROOF_POINTS, SKILL_CATEGORIES } from '@/app/ui/ai-expertise/data';
import { useInView } from '@/app/ui/ai-expertise/hooks';

export default function AISkillsClient() {
  const [activeCategory, setActiveCategory] = useState('llm');
  const [isMobile, setIsMobile] = useState(false);
  const [hasResume, setHasResume] = useState(true);
  const [skillsRef, skillsInView] = useInView(0.05);
  const TOP_PANEL_OFFSET_PX = 32;

  useEffect(() => {
    const updateViewport = () => setIsMobile(window.innerWidth < 768);
    updateViewport();
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  useEffect(() => {
    fetch('/resume.pdf', { method: 'HEAD' })
      .then((r) => setHasResume(r.ok))
      .catch(() => setHasResume(false));
  }, []);

  const activeCat = SKILL_CATEGORIES.find((cat) => cat.id === activeCategory) ?? SKILL_CATEGORIES[0];
  const isAcademic = activeCategory === 'academic';

  // Shared CSS-variable-based divider style
  const divider: React.CSSProperties = { borderBottom: '1px solid var(--card-border)' };

  return (
    <>
      <div style={{ minHeight: '100vh', color: 'var(--foreground)', fontFamily: 'var(--font-dm-mono), monospace', position: 'relative', overflowX: 'hidden' }}>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto', padding: `${TOP_PANEL_OFFSET_PX}px 24px 80px` }}>

          {/* ── Hero ── */}
          <div style={{ padding: '24px 0 44px', ...divider }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'minmax(0,760px) minmax(260px,1fr)',
              gap: '24px',
              alignItems: 'start',
            }}>
              <div>
                <div style={{ display: 'inline-block', marginBottom: '14px', padding: '5px 10px', border: '1px solid rgba(56,189,248,0.35)', color: '#38bdf8', fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', borderRadius: '2px', fontFamily: 'var(--font-dm-mono), monospace' }}>
                  Open to Work
                </div>
                <h1 style={{ fontFamily: 'var(--font-bebas-neue), sans-serif', fontSize: 'clamp(40px,7vw,72px)', letterSpacing: '2px', lineHeight: 0.95, background: 'linear-gradient(135deg, var(--foreground) 0%, #38bdf8 70%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Hemant Kushwaha
                </h1>
                <p style={{ marginTop: '14px', fontSize: '13px', color: 'var(--muted)', letterSpacing: '0.2px' }}>
                  AI Engineer · MS Information Systems · UMD · GPA 3.94
                </p>
                <p style={{ marginTop: '6px', fontSize: '12px', color: 'var(--muted-strong)', letterSpacing: '0.2px' }}>
                  OPT-eligible May 2026 · Open to AI Engineer / ML Engineer roles
                </p>
                <div style={{ marginTop: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                  <CtaButton asChild variant="primary" size="md">
                    <Link href="/home/contact">Contact Me</Link>
                  </CtaButton>
                  <CtaButton asChild variant="secondary" size="md">
                    <Link href="/home/project">View Projects</Link>
                  </CtaButton>
                  <a
                    href="https://ai-marketing-prod.web.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '12px',
                      fontWeight: 700,
                      fontFamily: 'var(--font-dm-mono), monospace',
                      letterSpacing: '0.5px',
                      padding: '8px 14px',
                      borderRadius: '2px',
                      border: '1px solid rgba(52,211,153,0.45)',
                      color: '#34d399',
                      background: 'rgba(52,211,153,0.08)',
                      textDecoration: 'none',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(52,211,153,0.16)';
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(52,211,153,0.7)';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(52,211,153,0.08)';
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(52,211,153,0.45)';
                    }}
                  >
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#34d399', animation: 'pulse 2s infinite' }} />
                    MarketPilot AI — Live
                    <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
                <div style={{ marginTop: '10px', fontSize: '11px', color: 'var(--muted-strong)' }}>
                  {hasResume ? (
                    <CtaButton asChild variant="tertiary" size="sm">
                      <a href="/resume.pdf" target="_blank" rel="noreferrer">Download Resume</a>
                    </CtaButton>
                  ) : (
                    <span>Resume file unavailable right now — use Contact Me and I will share it.</span>
                  )}
                </div>
              </div>

              {/* Summary box */}
              <div style={{ border: '1px solid rgba(56,189,248,0.22)', background: 'rgba(56,189,248,0.06)', borderRadius: '2px', padding: '18px 18px 16px', backdropFilter: 'blur(8px)', minHeight: '184px' }}>
                <div style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: '#7dd3fc', marginBottom: '10px', fontFamily: 'var(--font-dm-mono), monospace' }}>
                  Professional Summary
                </div>
                <p style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: 1.75, marginBottom: '8px' }}>
                  AI Engineer with 3.5+ years of software engineering experience and hands-on delivery of production AI systems across RAG, multi-agent workflows, and full-stack applications.
                </p>
                <p style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: 1.75, marginBottom: '8px' }}>
                  Experienced in building reliable, business-aligned solutions end-to-end using FastAPI, React/Next.js, PostgreSQL, and modern LLM tooling.
                </p>
                <p style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: 1.75 }}>
                  Strong in stakeholder communication, system design, and translating ambiguity into measurable outcomes in fast-paced teams.
                </p>
              </div>
            </div>
          </div>

          {/* ── Proof points ── */}
          <div style={{ padding: '48px 0', ...divider }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(150px,1fr))', gap: '2px' }}>
              {PROOF_POINTS.map((point, idx) => (
                <StatCard key={point.label} {...point} index={idx} />
              ))}
            </div>
          </div>

          {/* ── Skills ── */}
          <div ref={skillsRef} style={{ padding: '56px 0' }}>
            <div style={{ marginBottom: '36px' }}>
              <div style={{ fontSize: '10px', letterSpacing: '3px', color: 'var(--muted-strong)', marginBottom: '10px', textTransform: 'uppercase' }}>Core Competencies</div>
              <h2 style={{ fontFamily: 'var(--font-bebas-neue), sans-serif', fontSize: 'clamp(36px,7vw,70px)', letterSpacing: '2px', background: 'linear-gradient(90deg, var(--foreground), var(--muted))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                AI SKILLS & EXPERTISE
              </h2>
              <p style={{ marginTop: '10px', maxWidth: '720px', fontSize: '13px', color: 'var(--muted)', lineHeight: 1.8 }}>
                Every skill below is backed by shipped projects, real stakeholders, and production systems — not tutorial notebooks.
              </p>
              <h3 style={{ marginTop: '16px', fontFamily: 'var(--font-bebas-neue), sans-serif', fontSize: '34px', letterSpacing: '2px', color: 'var(--foreground)' }}>
                TECHNICAL SKILLS
              </h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '240px 1fr', gap: '12px', alignItems: 'start' }}>
              {/* Category sidebar */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', position: isMobile ? 'static' : 'sticky', top: isMobile ? undefined : '24px' }}>
                {SKILL_CATEGORIES.map((cat) => (
                  <CategoryPanel key={cat.id} cat={cat} active={activeCategory === cat.id} onClick={() => setActiveCategory(cat.id)} />
                ))}
              </div>

              {/* Skill panel */}
              <div style={{ border: `1px solid ${activeCat.color}22`, background: `${activeCat.color}04`, borderRadius: '2px', padding: '32px', backdropFilter: 'blur(12px)', boxShadow: `0 0 60px ${activeCat.glow}`, minHeight: '480px' }}>
                {isAcademic ? (
                  <AcademicPanel courses={ACADEMIC_COURSES} visible={skillsInView} />
                ) : (
                  <>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '32px', paddingBottom: '20px', borderBottom: `1px solid ${activeCat.color}20` }}>
                      <span style={{ fontSize: '28px', color: activeCat.color, animation: 'float 3s ease-in-out infinite' }}>{activeCat.icon}</span>
                      <div>
                        <div style={{ fontFamily: 'var(--font-bebas-neue), sans-serif', fontSize: '26px', letterSpacing: '2px', color: activeCat.color }}>{activeCat.label}</div>
                        <div style={{ fontSize: '10px', color: 'var(--muted-strong)', marginTop: '2px', letterSpacing: '1px' }}>HOVER SKILLS FOR PROJECT EVIDENCE</div>
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '0' : '0 40px' }}>
                      {activeCat.skills.map((skill, idx) => (
                        <SkillBar key={skill.name} skill={skill} color={activeCat.color} index={idx} visible={skillsInView} />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* ── Projects ── */}
          <div style={{ padding: '0 0 56px', borderTop: '1px solid var(--card-border)', paddingTop: '56px' }}>
            <div style={{ marginBottom: '36px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <div style={{ fontSize: '10px', letterSpacing: '3px', color: 'var(--muted-strong)', marginBottom: '10px', textTransform: 'uppercase' }}>Shipped Systems</div>
                <h2 style={{ fontFamily: 'var(--font-bebas-neue), sans-serif', fontSize: '36px', letterSpacing: '2px', background: 'linear-gradient(90deg, var(--foreground), var(--muted))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  PROJECTS & EVIDENCE
                </h2>
              </div>
              <div style={{ fontSize: '11px', color: 'var(--muted-strong)', letterSpacing: '1px' }}>
                {isAcademic ? 'ALL PROJECTS SHOWN — ACADEMIC TAB REVEALS FULL COURSEWORK CONTEXT' : 'FILTER BY CATEGORY ↑ — CLICK A SKILL AREA ABOVE'}
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(340px,1fr))', gap: '2px' }}>
              {PROJECTS.map((project, idx) => (
                <EvidenceProjectCard key={project.name} project={project} index={idx} activeCategory={activeCategory} />
              ))}
            </div>
          </div>

          {/* ── Differentiators ── */}
          <div style={{ borderTop: '1px solid var(--card-border)', paddingTop: '56px' }}>
            <div style={{ marginBottom: '32px' }}>
              <div style={{ fontSize: '10px', letterSpacing: '3px', color: 'var(--muted-strong)', marginBottom: '10px', textTransform: 'uppercase' }}>Differentiators</div>
              <h2 style={{ fontFamily: 'var(--font-bebas-neue), sans-serif', fontSize: '36px', letterSpacing: '2px', background: 'linear-gradient(90deg, var(--foreground), var(--muted))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                WHAT I BRING
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '2px' }}>
              {DIFFERENTIATORS.map((item, idx) => (
                <DifferentiatorCard key={item.title} item={item} index={idx} />
              ))}
            </div>
          </div>

          {/* ── CTA ── */}
          <div style={{ textAlign: 'center', padding: '64px 0 0', borderTop: '1px solid var(--card-border)', marginTop: '56px' }}>
            <div style={{ fontSize: '10px', letterSpacing: '4px', color: '#38bdf8', marginBottom: '16px', textTransform: 'uppercase' }}>Open to AI Engineering Roles</div>
            <h3 style={{ fontFamily: 'var(--font-bebas-neue), sans-serif', fontSize: 'clamp(32px,6vw,64px)', letterSpacing: '2px', background: 'linear-gradient(135deg, var(--foreground), #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '24px' }}>
              LET&apos;S BUILD SOMETHING REAL
            </h3>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <CtaButton asChild variant="primary" size="lg">
                <Link href="/home/contact">Contact Me →</Link>
              </CtaButton>
              <CtaButton asChild variant="secondary" size="lg">
                <Link href="/home/project">View Projects</Link>
              </CtaButton>
              {hasResume ? (
                <CtaButton asChild variant="tertiary" size="lg">
                  <a href="/resume.pdf" target="_blank" rel="noreferrer">Download Resume</a>
                </CtaButton>
              ) : (
                <span style={{ color: 'var(--muted)', fontSize: '11px' }}>Resume available on request</span>
              )}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
