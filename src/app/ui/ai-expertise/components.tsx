"use client";

import { useState } from 'react';
import type { AcademicCourse, Differentiator, Project, ProofPoint, Skill, SkillCategory } from './types';
import { useCountUp, useInView } from './hooks';

export function SkillBar({
  skill,
  color,
  index,
  visible,
}: {
  skill: Skill;
  color: string;
  index: number;
  visible: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
        transition: `opacity 0.5s ${index * 0.06}s, transform 0.5s ${index * 0.06}s`,
        marginBottom: '18px',
        cursor: 'default',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '7px', alignItems: 'flex-end' }}>
        <span
          style={{
            fontSize: '13px',
            fontWeight: 600,
            color: hovered ? color : '#e2e8f0',
            transition: 'color 0.2s',
            fontFamily: "'DM Mono', monospace",
            letterSpacing: '0.3px',
          }}
        >
          {skill.name}
        </span>
        <span style={{ fontSize: '11px', color, fontFamily: "'DM Mono', monospace", fontWeight: 700 }}>{skill.level}%</span>
      </div>
      <div style={{ height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', overflow: 'hidden', position: 'relative' }}>
        <div
          style={{
            height: '100%',
            width: visible ? `${skill.level}%` : '0%',
            background: `linear-gradient(90deg, ${color}88, ${color})`,
            borderRadius: '2px',
            transition: `width 1.2s ${index * 0.06 + 0.3}s cubic-bezier(0.16,1,0.3,1)`,
            boxShadow: hovered ? `0 0 8px ${color}` : 'none',
          }}
        />
      </div>
      {hovered && (
        <div style={{ marginTop: '6px', fontSize: '10px', color: '#94a3b8', fontFamily: "'DM Mono', monospace", letterSpacing: '0.3px', lineHeight: 1.5 }}>
          ↳ {skill.proof}
        </div>
      )}
    </div>
  );
}

export function StatCard({ stat, label, sub, index }: ProofPoint & { index: number }) {
  const [ref, inView] = useInView();
  const count = useCountUp(stat, 1000, inView);

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        transition: `all 0.6s ${index * 0.1}s`,
        textAlign: 'center',
        padding: '28px 20px',
        border: '1px solid rgba(255,255,255,0.07)',
        background: 'rgba(255,255,255,0.02)',
        backdropFilter: 'blur(10px)',
        borderRadius: '2px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(56,189,248,0.5), transparent)' }} />
      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '48px', letterSpacing: '1px', background: 'linear-gradient(135deg, #e2e8f0, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1 }}>
        {count}
      </div>
      <div style={{ fontSize: '12px', fontWeight: 700, color: '#94a3b8', marginTop: '8px', letterSpacing: '1px', fontFamily: "'DM Mono', monospace", textTransform: 'uppercase' }}>{label}</div>
      <div style={{ fontSize: '10px', color: '#475569', marginTop: '4px', fontFamily: "'DM Mono', monospace" }}>{sub}</div>
    </div>
  );
}

export function CategoryPanel({ cat, active, onClick }: { cat: SkillCategory; active: boolean; onClick: () => void }) {
  const isAcademic = cat.id === 'academic';

  return (
    <button
      onClick={onClick}
      style={{
        all: 'unset',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '12px 18px',
        borderRadius: '2px',
        border: `1px solid ${active ? cat.color + '55' : 'rgba(255,255,255,0.06)'}`,
        background: active ? `${cat.color}10` : 'transparent',
        color: active ? cat.color : '#94a3b8',
        fontSize: '12px',
        fontFamily: "'DM Mono', monospace",
        fontWeight: 700,
        letterSpacing: '0.5px',
        textTransform: 'uppercase',
        transition: 'all 0.25s',
        width: '100%',
        boxShadow: active ? `0 0 20px ${cat.glow}` : 'none',
      }}
    >
      <span style={{ fontSize: isAcademic ? '13px' : '16px', lineHeight: 1 }}>{cat.icon}</span>
      {cat.label}
      {!isAcademic && <span style={{ marginLeft: 'auto', fontSize: '10px', color: active ? cat.color : '#334155' }}>{cat.skills.length}</span>}
    </button>
  );
}

export function EvidenceProjectCard({
  project,
  index,
  activeCategory,
}: {
  project: Project;
  index: number;
  activeCategory: string;
}) {
  const [ref, inView] = useInView(0.1);
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const dimmed = activeCategory !== '' && activeCategory !== 'academic' && !project.skills.includes(activeCategory);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: dimmed ? 0.25 : inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.5s ${index * 0.08}s, transform 0.5s ${index * 0.08}s`,
        border: `1px solid ${hovered ? project.color + '40' : 'rgba(255,255,255,0.06)'}`,
        background: hovered ? `${project.color}06` : 'rgba(255,255,255,0.015)',
        borderRadius: '2px',
        padding: '22px',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, width: '3px', height: '100%', background: project.color, opacity: hovered ? 1 : 0.3, transition: 'opacity 0.25s' }} />
      <div style={{ paddingLeft: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px', gap: '10px' }}>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#e2e8f0', lineHeight: 1.4 }}>{project.name}</div>
          <span style={{ fontSize: '9px', fontFamily: "'DM Mono', monospace", color: project.color, whiteSpace: 'nowrap', padding: '3px 8px', border: `1px solid ${project.color}33`, borderRadius: '1px', flexShrink: 0 }}>{project.role}</span>
        </div>
        <div style={{ fontSize: '11px', color: '#94a3b8', fontFamily: "'DM Mono', monospace", marginBottom: '14px', lineHeight: 1.6 }}>↳ {project.highlight}</div>
        {!!project.impactMetrics?.length && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
            {project.impactMetrics.map((metric) => (
              <span
                key={metric}
                style={{
                  fontSize: '9px',
                  padding: '2px 7px',
                  border: `1px solid ${project.color}55`,
                  color: project.color,
                  fontFamily: "'DM Mono', monospace",
                  borderRadius: '1px',
                  background: `${project.color}14`,
                }}
              >
                {metric}
              </span>
            ))}
          </div>
        )}
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          style={{
            fontSize: '10px',
            color: '#cbd5e1',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '2px',
            padding: '4px 8px',
            background: 'transparent',
            marginBottom: expanded ? '10px' : '0',
          }}
        >
          {expanded ? 'Hide Details' : 'Show Details'}
        </button>
        {expanded && (
          <div style={{ marginTop: '10px' }}>
            {project.problem && (
              <p style={{ fontSize: '11px', color: '#94a3b8', lineHeight: 1.6, marginBottom: '8px' }}>
                <span style={{ color: '#e2e8f0', fontWeight: 700 }}>Problem:</span> {project.problem}
              </p>
            )}
            {project.architecture && (
              <p style={{ fontSize: '11px', color: '#94a3b8', lineHeight: 1.6, marginBottom: '8px' }}>
                <span style={{ color: '#e2e8f0', fontWeight: 700 }}>Architecture:</span> {project.architecture}
              </p>
            )}
            {project.tradeoffs && (
              <p style={{ fontSize: '11px', color: '#94a3b8', lineHeight: 1.6 }}>
                <span style={{ color: '#e2e8f0', fontWeight: 700 }}>Tradeoff:</span> {project.tradeoffs}
              </p>
            )}
          </div>
        )}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
          {project.tags.map((tag) => (
            <span key={tag} style={{ fontSize: '9px', padding: '2px 7px', border: '1px solid rgba(255,255,255,0.08)', color: '#94a3b8', fontFamily: "'DM Mono', monospace", borderRadius: '1px' }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function DifferentiatorCard({ item, index }: { item: Differentiator; index: number }) {
  const [ref, inView] = useInView();

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        transition: `all 0.6s ${index * 0.12}s`,
        padding: '26px',
        border: '1px solid rgba(255,255,255,0.06)',
        background: 'rgba(255,255,255,0.015)',
        borderRadius: '2px',
        borderLeft: `3px solid ${item.color}`,
      }}
    >
      <div style={{ fontSize: '24px', marginBottom: '12px', color: item.color }}>{item.icon}</div>
      <div style={{ fontSize: '13px', fontWeight: 700, color: '#e2e8f0', marginBottom: '10px', letterSpacing: '0.3px' }}>{item.title}</div>
      <div style={{ fontSize: '12px', color: '#94a3b8', lineHeight: 1.8, fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontWeight: 300 }}>{item.body}</div>
    </div>
  );
}

export function AcademicCourseCard({ course, index, visible }: { course: AcademicCourse; index: number; visible: boolean }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: `opacity 0.55s ${index * 0.1}s, transform 0.55s ${index * 0.1}s`,
        border: `1px solid ${expanded ? course.color + '40' : 'rgba(255,255,255,0.07)'}`,
        background: expanded ? `${course.color}06` : 'rgba(255,255,255,0.015)',
        borderRadius: '2px',
        overflow: 'hidden',
      }}
    >
      <div
        onClick={() => setExpanded((prev) => !prev)}
        style={{
          padding: '18px 22px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          userSelect: 'none',
        }}
      >
        <span style={{ fontSize: '20px', color: course.color, flexShrink: 0 }}>{course.icon}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '9px', color: course.color, letterSpacing: '1.5px', padding: '2px 7px', border: `1px solid ${course.color}44`, borderRadius: '1px' }}>
              {course.code}
            </span>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '9px', color: '#34d399', letterSpacing: '0.5px' }}>GPA {course.grade}</span>
          </div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#e2e8f0', lineHeight: 1.3 }}>{course.name}</div>
          <div style={{ fontSize: '10px', color: '#475569', fontFamily: "'DM Mono', monospace", marginTop: '3px' }}>{course.institution}</div>
        </div>
        <span
          style={{
            color: expanded ? course.color : '#475569',
            fontSize: '20px',
            transition: 'transform 0.3s, color 0.2s',
            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
            display: 'inline-block',
            flexShrink: 0,
            lineHeight: 1,
          }}
        >
          ⌄
        </span>
      </div>

      <div style={{ padding: '0 22px 16px 56px' }}>
        <p style={{ fontSize: '12px', color: '#64748b', fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontWeight: 300, lineHeight: 1.75, margin: 0 }}>
          {course.summary}
        </p>
      </div>

      {expanded && (
        <div style={{ borderTop: `1px solid ${course.color}18`, padding: '22px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px' }}>
            <div>
              <div style={{ fontSize: '9px', letterSpacing: '2px', color: '#475569', fontFamily: "'DM Mono', monospace", textTransform: 'uppercase', marginBottom: '14px' }}>
                Topics Mastered
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {course.topics.map((topic, topicIndex) => (
                  <div key={topicIndex} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: '#94a3b8', fontFamily: "'DM Mono', monospace" }}>
                    <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: course.color, opacity: 0.7, flexShrink: 0 }} />
                    {topic}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '9px', letterSpacing: '2px', color: '#475569', fontFamily: "'DM Mono', monospace", textTransform: 'uppercase', marginBottom: '14px' }}>
                Applied In Production
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {course.applied.map((item, itemIndex) => (
                  <div key={itemIndex} style={{ padding: '12px 14px', border: `1px solid ${course.color}22`, background: `${course.color}08`, borderRadius: '2px', borderLeft: `2px solid ${course.color}` }}>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#e2e8f0', marginBottom: '5px' }}>{item.project}</div>
                    <div style={{ fontSize: '10px', color: '#64748b', fontFamily: "'DM Mono', monospace", lineHeight: 1.6 }}>↳ {item.detail}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function AcademicPanel({ courses, visible }: { courses: AcademicCourse[]; visible: boolean }) {
  const color = '#e879f9';

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '28px', paddingBottom: '20px', borderBottom: `1px solid ${color}20` }}>
        <span style={{ fontSize: '28px', animation: 'float 3s ease-in-out infinite' }}>📚</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '26px', letterSpacing: '2px', color }}>Academic Foundation</div>
          <div style={{ fontSize: '10px', color: '#475569', marginTop: '3px', letterSpacing: '1px', fontFamily: "'DM Mono', monospace" }}>
            UMD SMITH SCHOOL · MS INFORMATION SYSTEMS · CLICK ANY COURSE TO EXPAND
          </div>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '38px', color, lineHeight: 1 }}>3.94</div>
          <div style={{ fontSize: '9px', color: '#475569', fontFamily: "'DM Mono', monospace", letterSpacing: '1px' }}>CUMULATIVE GPA</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {courses.map((course, index) => (
          <AcademicCourseCard key={course.code} course={course} index={index} visible={visible} />
        ))}
      </div>

      <div style={{ marginTop: '20px', padding: '14px 18px', border: `1px solid ${color}18`, background: `${color}05`, borderRadius: '2px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
        <span style={{ fontSize: '14px', flexShrink: 0, marginTop: '1px' }}>💡</span>
        <p style={{ fontSize: '11px', color: '#64748b', fontFamily: "'DM Mono', monospace", lineHeight: 1.7, margin: 0 }}>
          Every concept above was applied in at least one shipped production project — not studied in isolation. Theory grounded in real engineering equals genuine AI expertise.
        </p>
      </div>
    </div>
  );
}


