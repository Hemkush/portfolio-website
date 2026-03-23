"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import NavLinks from "@/app/ui/components/nav-link";

// Data

type Skill = {
  name: string;
  level: number;
  proof: string;
};

type SkillCategory = {
  id: string;
  label: string;
  icon: string;
  color: string;
  glow: string;
  skills: Skill[];
};

type Project = {
  name: string;
  role: string;
  tags: string[];
  color: string;
  highlight: string;
  skills: string[];
};

type ProofPoint = {
  stat: string;
  label: string;
  sub: string;
};

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "llm",
    label: "LLM Engineering",
    icon: "⬡",
    color: "#38bdf8",
    glow: "rgba(56,189,248,0.18)",
    skills: [
      { name: "RAG Architecture", level: 95, proof: "UMD Chatbot · Multiagent RAG · Marketing Tool" },
      { name: "LangChain / LangGraph", level: 90, proof: "Event Scheduler AI · Multiagent RAG-Chatbot" },
      { name: "OpenAI API", level: 95, proof: "Marketing Intelligence Platform · Portfolio Chatbot" },
      { name: "Google Gemini", level: 88, proof: "Social Media Bot · Event Scheduler AI" },
      { name: "ReACT Agents", level: 85, proof: "Multiagent RAG-Chatbot · LangGraph pipelines" },
      { name: "Prompt Engineering", level: 90, proof: "Marketing Tool — structured output normalization" },
      { name: "Vector Memory Systems", level: 88, proof: "Marketing Tool — top-k retrieval injection, chunking" },
      { name: "Multi-Agent Orchestration", level: 85, proof: "8-service agent pipeline · Lead qualification agents" },
    ],
  },
  {
    id: "genai",
    label: "Generative AI",
    icon: "◈",
    color: "#a78bfa",
    glow: "rgba(167,139,250,0.18)",
    skills: [
      { name: "AI Content Generation", level: 92, proof: "Social Media Bot — 30+ platform variations" },
      { name: "Conversational AI", level: 90, proof: "UMD RAG Chatbot · Marketing Discovery Interview" },
      { name: "Embeddings & Semantic Search", level: 88, proof: "Chroma · sentence-transformers · OpenAI embeddings" },
      { name: "Vector Databases", level: 87, proof: "Chroma · Qdrant research · FAISS" },
      { name: "Structured Output Normalization", level: 85, proof: "Marketing Tool — JSON/non-JSON defensive parsing" },
      { name: "AI UX Design", level: 88, proof: "Live conversation analysis panel · explainability UI" },
      { name: "A/B Testing Agents", level: 78, proof: "Graduate Research — AI-powered A/B optimization" },
      { name: "Token Optimization", level: 85, proof: "Marketing Tool — 40% prompt token reduction" },
    ],
  },
  {
    id: "mlops",
    label: "MLOps & Production",
    icon: "⬟",
    color: "#34d399",
    glow: "rgba(52,211,153,0.18)",
    skills: [
      { name: "Docker & Containerization", level: 88, proof: "Marketing Tool — Docker Compose production setup" },
      { name: "CI/CD Pipelines", level: 85, proof: "TCS — Jenkins, GitLab · GitHub Actions" },
      { name: "AWS Cloud (EC2, RDS, S3)", level: 82, proof: "Event Scheduler AI — Elastic Beanstalk deployment" },
      { name: "FastAPI", level: 92, proof: "Marketing Tool · Multiagent RAG-Chatbot backend" },
      { name: "PostgreSQL + Alembic", level: 88, proof: "Marketing Tool — migration-first schema discipline" },
      { name: "RESTful API Design", level: 90, proof: "TCS — Spring Boot · FastAPI · Node.js" },
      { name: "Agile / Scrum", level: 90, proof: "TCS (3.5 yrs) · UMD weekly stakeholder syncs" },
      { name: "System Design", level: 85, proof: "RAG chatbot architecture docs · SOW · Design Reports" },
    ],
  },
  {
    id: "ml",
    label: "ML & Data Science",
    icon: "◇",
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.18)",
    skills: [
      { name: "XGBoost / LightGBM", level: 85, proof: "E-Livestock predictive disease model" },
      { name: "Scikit-Learn", level: 88, proof: "Sparks Foundation — classification & regression" },
      { name: "Feature Engineering", level: 85, proof: "Sparks Foundation — 85% prediction accuracy" },
      { name: "ELT Pipelines", level: 83, proof: "E-Livestock — analytics-ready data pipeline" },
      { name: "Data Visualization", level: 85, proof: "E-Livestock dashboard (Chart.js) · Tableau (Blitz Jobs)" },
      { name: "SQL & Database Design", level: 88, proof: "Hotel Feedback ERD · TCS BNY Mellon · PostgreSQL" },
      { name: "Pandas / NumPy", level: 87, proof: "Sparks Foundation · COVID-19 analysis · Hotel project" },
      { name: "R (Statistical Modeling)", level: 80, proof: "YouTube predictive model — 77% accuracy (100k rows)" },
    ],
  },
  {
    id: "fullstack",
    label: "Full-Stack AI Apps",
    icon: "⬡",
    color: "#f472b6",
    glow: "rgba(244,114,182,0.18)",
    skills: [
      { name: "React / Next.js", level: 92, proof: "Portfolio · Marketing Tool · Multiagent Chatbot" },
      { name: "Python / Flask / FastAPI", level: 93, proof: "All AI projects — primary backend language" },
      { name: "Node.js / TypeScript", level: 85, proof: "TCS (3.5 yrs) · Portfolio website backend" },
      { name: "Authentication Systems", level: 88, proof: "JWT auth · Google OAuth 2.0 · protected routes" },
      { name: "MCP Server Integration", level: 82, proof: "Event Scheduler AI — Google Calendar MCP" },
      { name: "MySQL / PostgreSQL", level: 88, proof: "Event Scheduler AI · Marketing Tool · Portfolio" },
      { name: "Google Maps API", level: 80, proof: "Best for DMV — interactive ecosystem mapping" },
      { name: "Figma / UI Design", level: 78, proof: "UMD Chatbot — UI layout design in Figma" },
    ],
  },
];

const PROJECTS: Project[] = [
  {
    name: "AI-Driven Marketing Intelligence Platform",
    role: "Solo Builder",
    tags: ["FastAPI", "OpenAI", "LangChain", "PostgreSQL", "Docker", "RAG"],
    color: "#38bdf8",
    highlight: "8-service modular agent pipeline · 40% token reduction · reliability engineering",
    skills: ["llm", "genai", "mlops", "fullstack"],
  },
  {
    name: "Document Analysis Multiagent RAG-Chatbot",
    role: "Solo Builder",
    tags: ["LangGraph", "Gemini", "ReACT", "Chroma", "FastAPI", "Next.js"],
    color: "#a78bfa",
    highlight: "ReACT agents · VLM embeddings · persistent memory · multi-source ingestion",
    skills: ["llm", "genai", "fullstack"],
  },
  {
    name: "AI Chatbot System — UMD Smith School",
    role: "AI Chatbot System Developer",
    tags: ["RAG", "Flask", "React", "OpenAI", "Anthropic", "sentence-transformers"],
    color: "#34d399",
    highlight: "Stakeholder-driven RAG system · admin document management · policy summarization",
    skills: ["llm", "genai", "fullstack"],
  },
  {
    name: "Event Scheduler AI",
    role: "Solo Builder",
    tags: ["LangChain", "Gemini", "MCP", "AWS", "Flask", "React", "MySQL"],
    color: "#f59e0b",
    highlight: "AI scheduling agent · Google Calendar MCP · real-time availability calculation",
    skills: ["llm", "mlops", "fullstack"],
  },
  {
    name: "E-Livestock Analytical Dashboard",
    role: "Team Lead (5 members)",
    tags: ["XGBoost", "LightGBM", "ELT", "Chart.js", "React"],
    color: "#f472b6",
    highlight: "Predictive disease model · ELT pipeline · CEO stakeholder delivery",
    skills: ["ml", "fullstack"],
  },
  {
    name: "AI Social Media Automation Bot",
    role: "Solo Builder",
    tags: ["Gemini", "Python", "APScheduler", "Twitter API", "Reddit API"],
    color: "#38bdf8",
    highlight: "30+ content variations · multi-platform AI generation · cron scheduling",
    skills: ["genai", "fullstack"],
  },
];

const PROOF_POINTS: ProofPoint[] = [
  { stat: "8", label: "AI Agents Built", sub: "modular service pipeline" },
  { stat: "40%", label: "Token Reduction", sub: "via memory optimization" },
  { stat: "85%", label: "ML Accuracy", sub: "Sparks Foundation models" },
  { stat: "6+", label: "AI Projects", sub: "shipped to production" },
  { stat: "3", label: "RAG Systems", sub: "with vector retrieval" },
  { stat: "7+", label: "Team Members", sub: "led as technical lead" },
];

type Differentiator = {
  icon: string;
  color: string;
  title: string;
  body: string;
};

const DIFFERENTIATORS: Differentiator[] = [
  { icon: "⬡", color: "#38bdf8", title: "Production over Prototypes", body: "Every project is deployed with auth, error handling, fallback logic, and migration discipline — not a Jupyter notebook." },
  { icon: "◈", color: "#a78bfa", title: "Full-Stack AI Engineering", body: "I build the model layer AND the product layer — FastAPI, React, PostgreSQL, Docker. Most ML engineers can't do both." },
  { icon: "⬟", color: "#34d399", title: "Stakeholder-Driven Delivery", body: "Led teams of 7–8 at UMD and TCS. I translate complex AI into business language — a skill explicitly tested at every M7 company." },
  { icon: "◇", color: "#f59e0b", title: "Reliability Engineering", body: "Defensive parsing, deterministic fallbacks, token optimization, and migration hygiene — I design for failure modes, not just happy paths." },
];

// Hooks

function useCountUp(target: string, duration = 1200, start = false): string | number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    const num = parseInt(target, 10);
    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * num));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [start, target, duration]);

  if (target.includes("%")) return `${count}%`;
  if (target.includes("+")) return `${count}+`;
  return count;
}

function useInView(threshold = 0.15): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold }
    );

    const node = ref.current;
    if (node) obs.observe(node);

    return () => obs.disconnect();
  }, [threshold]);

  return [ref, inView];
}

// Components

function SkillBar({
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
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transition: `opacity 0.5s ${index * 0.06}s, transform 0.5s ${index * 0.06}s`,
        marginBottom: "18px",
        cursor: "default",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "7px", alignItems: "flex-end" }}>
        <span
          style={{
            fontSize: "13px",
            fontWeight: 600,
            color: hovered ? color : "#e2e8f0",
            transition: "color 0.2s",
            fontFamily: "'DM Mono', monospace",
            letterSpacing: "0.3px",
          }}
        >
          {skill.name}
        </span>
        <span style={{ fontSize: "11px", color, fontFamily: "'DM Mono', monospace", fontWeight: 700 }}>{skill.level}%</span>
      </div>
      <div style={{ height: "4px", background: "rgba(255,255,255,0.06)", borderRadius: "2px", overflow: "hidden", position: "relative" }}>
        <div
          style={{
            height: "100%",
            width: visible ? `${skill.level}%` : "0%",
            background: `linear-gradient(90deg, ${color}88, ${color})`,
            borderRadius: "2px",
            transition: `width 1.2s ${index * 0.06 + 0.3}s cubic-bezier(0.16,1,0.3,1)`,
            boxShadow: hovered ? `0 0 8px ${color}` : "none",
          }}
        />
      </div>
      {hovered && (
        <div style={{ marginTop: "6px", fontSize: "10px", color: "#64748b", fontFamily: "'DM Mono', monospace", letterSpacing: "0.3px", lineHeight: 1.5 }}>
          ↳ {skill.proof}
        </div>
      )}
    </div>
  );
}

function StatCard({ stat, label, sub, index }: ProofPoint & { index: number }) {
  const [ref, inView] = useInView();
  const count = useCountUp(stat, 1000, inView);

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `all 0.6s ${index * 0.1}s`,
        textAlign: "center",
        padding: "28px 20px",
        border: "1px solid rgba(255,255,255,0.07)",
        background: "rgba(255,255,255,0.02)",
        backdropFilter: "blur(10px)",
        borderRadius: "2px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(56,189,248,0.5), transparent)" }} />
      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "48px", letterSpacing: "1px", background: "linear-gradient(135deg, #e2e8f0, #38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1 }}>
        {count}
      </div>
      <div style={{ fontSize: "12px", fontWeight: 700, color: "#94a3b8", marginTop: "8px", letterSpacing: "1px", fontFamily: "'DM Mono', monospace", textTransform: "uppercase" }}>{label}</div>
      <div style={{ fontSize: "10px", color: "#475569", marginTop: "4px", fontFamily: "'DM Mono', monospace" }}>{sub}</div>
    </div>
  );
}

function CategoryPanel({ cat, active, onClick }: { cat: SkillCategory; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        all: "unset",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "12px 18px",
        borderRadius: "2px",
        border: `1px solid ${active ? cat.color + "55" : "rgba(255,255,255,0.06)"}`,
        background: active ? `${cat.color}10` : "transparent",
        color: active ? cat.color : "#64748b",
        fontSize: "12px",
        fontFamily: "'DM Mono', monospace",
        fontWeight: 700,
        letterSpacing: "0.5px",
        textTransform: "uppercase",
        transition: "all 0.25s",
        width: "100%",
        boxShadow: active ? `0 0 20px ${cat.glow}` : "none",
      }}
    >
      <span style={{ fontSize: "16px" }}>{cat.icon}</span>
      {cat.label}
      <span style={{ marginLeft: "auto", fontSize: "10px", color: active ? cat.color : "#334155" }}>{cat.skills.length}</span>
    </button>
  );
}

function ProjectCard({
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
  const dimmed = activeCategory !== "" && !project.skills.includes(activeCategory);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: dimmed ? 0.25 : inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.5s ${index * 0.08}s, transform 0.5s ${index * 0.08}s`,
        border: `1px solid ${hovered ? project.color + "40" : "rgba(255,255,255,0.06)"}`,
        background: hovered ? `${project.color}06` : "rgba(255,255,255,0.015)",
        borderRadius: "2px",
        padding: "22px",
        cursor: "default",
        position: "relative",
        overflow: "hidden",
        backdropFilter: "blur(8px)",
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, width: "3px", height: "100%", background: project.color, opacity: hovered ? 1 : 0.3, transition: "opacity 0.25s" }} />
      <div style={{ paddingLeft: "12px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px", gap: "10px" }}>
          <div style={{ fontSize: "14px", fontWeight: 700, color: "#e2e8f0", lineHeight: 1.4 }}>{project.name}</div>
          <span style={{ fontSize: "9px", fontFamily: "'DM Mono', monospace", color: project.color, whiteSpace: "nowrap", padding: "3px 8px", border: `1px solid ${project.color}33`, borderRadius: "1px", flexShrink: 0 }}>{project.role}</span>
        </div>
        <div style={{ fontSize: "11px", color: "#64748b", fontFamily: "'DM Mono', monospace", marginBottom: "14px", lineHeight: 1.6 }}>↳ {project.highlight}</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
          {project.tags.map((tag) => (
            <span key={tag} style={{ fontSize: "9px", padding: "2px 7px", border: "1px solid rgba(255,255,255,0.08)", color: "#94a3b8", fontFamily: "'DM Mono', monospace", borderRadius: "1px" }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function DifferentiatorCard({ item, index }: { item: Differentiator; index: number }) {
  const [ref, inView] = useInView();

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `all 0.6s ${index * 0.12}s`,
        padding: "26px",
        border: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(255,255,255,0.015)",
        borderRadius: "2px",
        borderLeft: `3px solid ${item.color}`,
      }}
    >
      <div style={{ fontSize: "24px", marginBottom: "12px", color: item.color }}>{item.icon}</div>
      <div style={{ fontSize: "13px", fontWeight: 700, color: "#e2e8f0", marginBottom: "10px", letterSpacing: "0.3px" }}>{item.title}</div>
      <div style={{ fontSize: "12px", color: "#64748b", lineHeight: 1.8, fontFamily: "'Fraunces', serif", fontStyle: "italic", fontWeight: 300 }}>{item.body}</div>
    </div>
  );
}

export default function AISkillsPage() {
  const [activeCategory, setActiveCategory] = useState("llm");
  const [heroVisible, setHeroVisible] = useState(false);
  const [skillsRef, skillsInView] = useInView(0.05);

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const activeCat = SKILL_CATEGORIES.find((cat) => cat.id === activeCategory) ?? SKILL_CATEGORIES[0];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #050810; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #050810; }
        ::-webkit-scrollbar-thumb { background: #1e3a5f; border-radius: 2px; }
        @keyframes gridPulse { 0%, 100% { opacity: 0.03; } 50% { opacity: 0.06; } }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#050810", color: "#e2e8f0", fontFamily: "'DM Mono', monospace", position: "relative", overflowX: "hidden" }}>
        <NavLinks />
        <div
          style={{
            position: "fixed",
            inset: 0,
            pointerEvents: "none",
            zIndex: 0,
            backgroundImage: "linear-gradient(rgba(56,189,248,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.04) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            animation: "gridPulse 4s ease-in-out infinite",
          }}
        />

        <div style={{ position: "fixed", top: "-200px", left: "-200px", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(56,189,248,0.05) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
        <div style={{ position: "fixed", bottom: "-200px", right: "-200px", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(167,139,250,0.05) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: "1200px", margin: "0 auto", padding: "80px 24px 80px" }}>
          <div style={{ padding: "80px 0 60px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "none" : "translateY(16px)", transition: "all 0.7s 0.1s" }}>
              <div style={{ fontSize: "10px", letterSpacing: "4px", color: "#38bdf8", fontFamily: "'DM Mono', monospace", marginBottom: "20px", textTransform: "uppercase" }}>
                AI Engineering Portfolio · 2026
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "24px" }}>
              <div>
                <h1
                  style={{
                    opacity: heroVisible ? 1 : 0,
                    transform: heroVisible ? "none" : "translateY(24px)",
                    transition: "all 0.8s 0.2s",
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "clamp(52px, 9vw, 96px)",
                    letterSpacing: "2px",
                    lineHeight: 0.92,
                    background: "linear-gradient(135deg, #e2e8f0 0%, #38bdf8 55%, #a78bfa 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  AI SKILLS
                  <br />
                  & EXPERTISE
                </h1>
                <p style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "none" : "translateY(16px)", transition: "all 0.7s 0.4s", marginTop: "20px", fontSize: "13px", color: "#64748b", maxWidth: "480px", lineHeight: 1.8, fontFamily: "'Fraunces', serif", fontStyle: "italic", fontWeight: 300 }}>
                  Every skill below is backed by shipped projects, real stakeholders, and production systems — not tutorial notebooks.
                </p>
                <div style={{ marginTop: "22px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {[
                    { href: "/home/about", label: "About" },
                    { href: "/home/experience", label: "Experience" },
                    { href: "/home/project", label: "Projects" },
                    { href: "/home/blog", label: "Blog" },
                    { href: "/home/contact", label: "Contact" },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      style={{
                        fontSize: "10px",
                        padding: "6px 10px",
                        border: "1px solid rgba(148,163,184,0.25)",
                        color: "#94a3b8",
                        textDecoration: "none",
                        letterSpacing: "1px",
                        textTransform: "uppercase",
                        borderRadius: "2px",
                      }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div style={{ opacity: heroVisible ? 1 : 0, transition: "all 0.7s 0.6s", display: "flex", flexDirection: "column", gap: "8px", padding: "20px 24px", border: "1px solid rgba(56,189,248,0.15)", background: "rgba(56,189,248,0.04)", borderRadius: "2px", minWidth: "220px" }}>
                {["LLM Engineering", "Generative AI", "MLOps & Production", "ML & Data Science", "Full-Stack AI"].map((skillName, idx) => (
                  <div key={skillName} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "11px", color: "#94a3b8" }}>
                    <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: ["#38bdf8", "#a78bfa", "#34d399", "#f59e0b", "#f472b6"][idx], flexShrink: 0 }} />
                    {skillName}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ padding: "48px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "2px" }}>
              {PROOF_POINTS.map((point, idx) => (
                <StatCard key={point.label} {...point} index={idx} />
              ))}
            </div>
          </div>

          <div ref={skillsRef} style={{ padding: "56px 0" }}>
            <div style={{ marginBottom: "36px" }}>
              <div style={{ fontSize: "10px", letterSpacing: "3px", color: "#475569", marginBottom: "10px", textTransform: "uppercase" }}>Core Competencies</div>
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "36px", letterSpacing: "2px", background: "linear-gradient(90deg, #e2e8f0, #64748b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                TECHNICAL SKILLS
              </h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: "2px", alignItems: "start" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "2px", position: "sticky", top: "24px" }}>
                {SKILL_CATEGORIES.map((cat) => (
                  <CategoryPanel key={cat.id} cat={cat} active={activeCategory === cat.id} onClick={() => setActiveCategory(cat.id)} />
                ))}
              </div>

              <div style={{ border: `1px solid ${activeCat.color}22`, background: `${activeCat.color}04`, borderRadius: "2px", padding: "32px", backdropFilter: "blur(12px)", boxShadow: `0 0 60px ${activeCat.glow}`, minHeight: "480px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "32px", paddingBottom: "20px", borderBottom: `1px solid ${activeCat.color}20` }}>
                  <span style={{ fontSize: "28px", color: activeCat.color, animation: "float 3s ease-in-out infinite" }}>{activeCat.icon}</span>
                  <div>
                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "26px", letterSpacing: "2px", color: activeCat.color }}>{activeCat.label}</div>
                    <div style={{ fontSize: "10px", color: "#475569", marginTop: "2px", letterSpacing: "1px" }}>HOVER SKILLS FOR PROJECT EVIDENCE</div>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 40px" }}>
                  {activeCat.skills.map((skill, idx) => (
                    <SkillBar key={skill.name} skill={skill} color={activeCat.color} index={idx} visible={skillsInView} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div style={{ padding: "0 0 56px", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "56px" }}>
            <div style={{ marginBottom: "36px", display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
              <div>
                <div style={{ fontSize: "10px", letterSpacing: "3px", color: "#475569", marginBottom: "10px", textTransform: "uppercase" }}>Shipped Systems</div>
                <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "36px", letterSpacing: "2px", background: "linear-gradient(90deg, #e2e8f0, #64748b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  PROJECTS & EVIDENCE
                </h2>
              </div>
              <div style={{ fontSize: "11px", color: "#475569", letterSpacing: "1px" }}>FILTER BY CATEGORY ↑ — CLICK A SKILL AREA ABOVE</div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "2px" }}>
              {PROJECTS.map((project, idx) => (
                <ProjectCard key={project.name} project={project} index={idx} activeCategory={activeCategory} />
              ))}
            </div>
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "56px" }}>
            <div style={{ marginBottom: "32px" }}>
              <div style={{ fontSize: "10px", letterSpacing: "3px", color: "#475569", marginBottom: "10px", textTransform: "uppercase" }}>Differentiators</div>
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "36px", letterSpacing: "2px", background: "linear-gradient(90deg, #e2e8f0, #64748b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                WHAT I BRING
              </h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "2px" }}>
              {DIFFERENTIATORS.map((item, idx) => (
                <DifferentiatorCard key={item.title} item={item} index={idx} />
              ))}
            </div>
          </div>

          <div style={{ textAlign: "center", padding: "64px 0 0", borderTop: "1px solid rgba(255,255,255,0.06)", marginTop: "56px" }}>
            <div style={{ fontSize: "10px", letterSpacing: "4px", color: "#38bdf8", marginBottom: "16px", textTransform: "uppercase" }}>Open to AI Engineering Roles</div>
            <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(32px, 6vw, 64px)", letterSpacing: "2px", background: "linear-gradient(135deg, #e2e8f0, #38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: "24px" }}>
              LET&apos;S BUILD SOMETHING REAL
            </h3>
            <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
              <a href="mailto:hkushwah@umd.edu" style={{ display: "inline-block", padding: "13px 32px", background: "#38bdf8", color: "#050810", fontSize: "11px", fontWeight: 700, letterSpacing: "2px", fontFamily: "'DM Mono', monospace", textTransform: "uppercase", textDecoration: "none", borderRadius: "2px", transition: "all 0.2s" }}>
                Get In Touch →
              </a>
              <a href="https://github.com/Hemkush" target="_blank" rel="noreferrer" style={{ display: "inline-block", padding: "13px 32px", border: "1px solid rgba(255,255,255,0.12)", color: "#94a3b8", fontSize: "11px", fontWeight: 700, letterSpacing: "2px", fontFamily: "'DM Mono', monospace", textTransform: "uppercase", textDecoration: "none", borderRadius: "2px", transition: "all 0.2s" }}>
                View GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

