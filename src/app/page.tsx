"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CtaButton } from '@/app/ui/components/cta-button';
import { CategoryPanel, DifferentiatorCard, EvidenceProjectCard, SkillBar, StatCard } from '@/app/ui/ai-expertise/components';
import { DIFFERENTIATORS, PROJECTS, PROOF_POINTS, SKILL_CATEGORIES } from '@/app/ui/ai-expertise/data';
import { useInView } from '@/app/ui/ai-expertise/hooks';

export default function AISkillsPage() {
  const [activeCategory, setActiveCategory] = useState('llm');
  const [isMobile, setIsMobile] = useState(false);
  const [hasResume, setHasResume] = useState(true);
  const [skillsRef, skillsInView] = useInView(0.05);
  const TOP_PANEL_OFFSET_PX = 32;

  useEffect(() => {
    const updateViewport = () => {
      setIsMobile(window.innerWidth < 768);
    };
    updateViewport();
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  useEffect(() => {
    fetch('/resume.pdf', { method: 'HEAD' })
      .then((response) => {
        setHasResume(response.ok);
      })
      .catch(() => {
        setHasResume(false);
      });
  }, []);

  const activeCat = SKILL_CATEGORIES.find((cat) => cat.id === activeCategory) ?? SKILL_CATEGORIES[0];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,700&display=swap');
        @keyframes gridPulse { 0%, 100% { opacity: 0.03; } 50% { opacity: 0.06; } }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
      `}</style>

      <div style={{ minHeight: '100vh', color: '#e2e8f0', fontFamily: "'DM Mono', monospace", position: 'relative', overflowX: 'hidden' }}>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto', padding: `${TOP_PANEL_OFFSET_PX}px 24px 80px` }}>
          <div style={{ padding: '24px 0 44px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ maxWidth: '760px' }}>
              <div style={{ display: 'inline-block', marginBottom: '14px', padding: '5px 10px', border: '1px solid rgba(56,189,248,0.35)', color: '#38bdf8', fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', borderRadius: '2px', fontFamily: "'DM Mono', monospace" }}>
                Open to Work
              </div>
              <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(40px, 7vw, 72px)', letterSpacing: '2px', lineHeight: 0.95, background: 'linear-gradient(135deg, #e2e8f0 0%, #38bdf8 70%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Hemant Kushwaha
              </h1>
              <p style={{ marginTop: '14px', fontSize: '13px', color: '#cbd5e1', letterSpacing: '0.2px' }}>
                AI Engineer · MS Information Systems · UMD · GPA 3.94
              </p>
              <p style={{ marginTop: '6px', fontSize: '12px', color: '#94a3b8', letterSpacing: '0.2px' }}>
                OPT-eligible May 2026 · Open to AI Engineer / ML Engineer roles
              </p>
              <div style={{ marginTop: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <CtaButton asChild variant="primary" size="md">
                  <Link href="/home/contact">Contact Me</Link>
                </CtaButton>
                <CtaButton asChild variant="secondary" size="md">
                  <Link href="/home/project">View Projects</Link>
                </CtaButton>
              </div>
              <div style={{ marginTop: '10px', fontSize: '11px', color: '#94a3b8' }}>
                {hasResume ? (
                  <CtaButton asChild variant="tertiary" size="sm">
                    <a href="/resume.pdf" target="_blank" rel="noreferrer">
                      Download Resume
                    </a>
                  </CtaButton>
                ) : (
                  <span>Resume file unavailable right now — use Contact Me and I will share it.</span>
                )}
              </div>
            </div>
          </div>

          <div style={{ padding: '48px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '2px' }}>
              {PROOF_POINTS.map((point, idx) => (
                <StatCard key={point.label} {...point} index={idx} />
              ))}
            </div>
          </div>

          <div ref={skillsRef} style={{ padding: '56px 0' }}>
            <div style={{ marginBottom: '36px' }}>
              <div style={{ fontSize: '10px', letterSpacing: '3px', color: '#64748b', marginBottom: '10px', textTransform: 'uppercase' }}>Core Competencies</div>
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(36px, 7vw, 70px)', letterSpacing: '2px', background: 'linear-gradient(90deg, #e2e8f0, #64748b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                AI SKILLS & EXPERTISE
              </h2>
              <p style={{ marginTop: '10px', maxWidth: '720px', fontSize: '13px', color: '#94a3b8', lineHeight: 1.8 }}>
                Every skill below is backed by shipped projects, real stakeholders, and production systems — not tutorial notebooks.
              </p>
              <h3 style={{ marginTop: '16px', fontFamily: "'Bebas Neue', sans-serif", fontSize: '34px', letterSpacing: '2px', color: '#e2e8f0' }}>
                TECHNICAL SKILLS
              </h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '240px 1fr', gap: '12px', alignItems: 'start' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', position: isMobile ? 'static' : 'sticky', top: isMobile ? undefined : '24px' }}>
                {SKILL_CATEGORIES.map((cat) => (
                  <CategoryPanel key={cat.id} cat={cat} active={activeCategory === cat.id} onClick={() => setActiveCategory(cat.id)} />
                ))}
              </div>

              <div style={{ border: `1px solid ${activeCat.color}22`, background: `${activeCat.color}04`, borderRadius: '2px', padding: '32px', backdropFilter: 'blur(12px)', boxShadow: `0 0 60px ${activeCat.glow}`, minHeight: '480px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '32px', paddingBottom: '20px', borderBottom: `1px solid ${activeCat.color}20` }}>
                  <span style={{ fontSize: '28px', color: activeCat.color, animation: 'float 3s ease-in-out infinite' }}>{activeCat.icon}</span>
                  <div>
                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '26px', letterSpacing: '2px', color: activeCat.color }}>{activeCat.label}</div>
                    <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px', letterSpacing: '1px' }}>HOVER SKILLS FOR PROJECT EVIDENCE</div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '0' : '0 40px' }}>
                  {activeCat.skills.map((skill, idx) => (
                    <SkillBar key={skill.name} skill={skill} color={activeCat.color} index={idx} visible={skillsInView} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div style={{ padding: '0 0 56px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '56px' }}>
            <div style={{ marginBottom: '36px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <div style={{ fontSize: '10px', letterSpacing: '3px', color: '#64748b', marginBottom: '10px', textTransform: 'uppercase' }}>Shipped Systems</div>
                <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '36px', letterSpacing: '2px', background: 'linear-gradient(90deg, #e2e8f0, #64748b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  PROJECTS & EVIDENCE
                </h2>
              </div>
              <div style={{ fontSize: '11px', color: '#64748b', letterSpacing: '1px' }}>FILTER BY CATEGORY ↑ — CLICK A SKILL AREA ABOVE</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2px' }}>
              {PROJECTS.map((project, idx) => (
                <EvidenceProjectCard key={project.name} project={project} index={idx} activeCategory={activeCategory} />
              ))}
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '56px' }}>
            <div style={{ marginBottom: '32px' }}>
              <div style={{ fontSize: '10px', letterSpacing: '3px', color: '#475569', marginBottom: '10px', textTransform: 'uppercase' }}>Differentiators</div>
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '36px', letterSpacing: '2px', background: 'linear-gradient(90deg, #e2e8f0, #64748b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                WHAT I BRING
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2px' }}>
              {DIFFERENTIATORS.map((item, idx) => (
                <DifferentiatorCard key={item.title} item={item} index={idx} />
              ))}
            </div>
          </div>

          <div style={{ textAlign: 'center', padding: '64px 0 0', borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: '56px' }}>
            <div style={{ fontSize: '10px', letterSpacing: '4px', color: '#38bdf8', marginBottom: '16px', textTransform: 'uppercase' }}>Open to AI Engineering Roles</div>
            <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(32px, 6vw, 64px)', letterSpacing: '2px', background: 'linear-gradient(135deg, #e2e8f0, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '24px' }}>
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
                  <a href="/resume.pdf" target="_blank" rel="noreferrer">
                    Download Resume
                  </a>
                </CtaButton>
              ) : (
                <span style={{ color: '#94a3b8', fontSize: '11px' }}>Resume available on request</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


