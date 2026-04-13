"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./alphadesk-showcase.module.css";
import {
  agentCards,
  challengeAreas,
  heroStats,
  tabs,
  toolPills,
} from "./alphadesk-content";

const workflowDiagram = [
  {
    title: "Inputs",
    body: "Portfolio state, PM questions, watchlists, and market signals enter the system.",
  },
  {
    title: "Orchestrator",
    body: "The planner decides which workflows, tools, and agents need to run next.",
  },
  {
    title: "Agents",
    body: "Metrics, research, risk, correlation, and reporting agents execute specialized tasks.",
  },
  {
    title: "HITL Review",
    body: "Risk-sensitive flows can pause for PM acknowledgement before continuing.",
  },
  {
    title: "Outputs",
    body: "Dashboard insights, research answers, alerts, and PM-ready tearsheets are produced.",
  },
];

const manualWorkflow = [
  "Check prices and benchmark moves",
  "Scan news and filings across multiple tools",
  "Review risk and correlation manually",
  "Write notes and PM update from scratch",
  "Assemble reporting after context gathering",
];

const alphaDeskWorkflow = [
  "Signal detection starts from portfolio context",
  "Orchestrator routes work to specialized agents",
  "Research and analytics are combined automatically",
  "Risk review is surfaced with approval gates",
  "Tearsheet and PM-ready outputs are generated fast",
];

const productSurfaces = [
  {
    title: "Dashboard",
    accent: "#38bdf8",
    src: "/alphadesk/dashboard.png",
    summary: "Morning overview for performance, macro context, alerts, and execution visibility.",
    bullets: ["Performance snapshot", "Portfolio health", "Run status"],
  },
  {
    title: "Signal Monitor",
    accent: "#f59e0b",
    src: "/alphadesk/signal-monitor.png",
    summary: "Surfaces events that matter to current holdings and prioritizes what needs review.",
    bullets: ["Tiered event priority", "Holding relevance", "Catalyst visibility"],
  },
  {
    title: "Research Chat",
    accent: "#a78bfa",
    src: "/alphadesk/research-chat.png",
    summary: "Supports single-name research and portfolio-specific questions with source-aware outputs.",
    bullets: ["Portfolio Q&A", "Research synthesis", "Linked evidence"],
  },
  {
    title: "Risk Monitor",
    accent: "#34d399",
    src: "/alphadesk/risk-monitor.png",
    summary: "Highlights thresholds, stress cases, and review triggers before action is taken.",
    bullets: ["Risk thresholds", "Approval gate", "Review queue"],
  },
  {
    title: "PM Tearsheet",
    accent: "#f472b6",
    src: "/alphadesk/tearsheet.png",
    summary: "Creates narrative, attribution, and reporting outputs that are ready for PM consumption.",
    bullets: ["Narrative summary", "Attribution notes", "Exportable output"],
  },
];

const rubricCards = [
  {
    title: "Agentic Design & System Functionality",
    built:
      "A central orchestrator routes work across metrics, research, risk, correlation, and reporting agents.",
    why:
      "The product behaves like an operating workflow, not a single chat response, which makes it more useful and more believable for real PM work.",
    proof:
      "Dashboard, signal monitor, research chat, risk workflows, and tearsheet outputs all map to specialized agent behavior.",
    accent: "#38bdf8",
  },
  {
    title: "Evaluation & Evidence",
    built:
      "Scenario-driven checks, demo-safe runs, smoke tests, and LangSmith traces are used to inspect workflow quality.",
    why:
      "Judges can see that the system is not only designed well, but can also be reproduced, debugged, and evaluated with evidence.",
    proof:
      "Historical semiconductor shock scenarios, routing checks, and run-level trace visibility back up the demo.",
    accent: "#f59e0b",
  },
  {
    title: "Cost Efficiency & Scalability",
    built:
      "Targeted agent routing, Redis caching, Celery scheduling, and PostgreSQL-backed state support operational scale.",
    why:
      "The commercial case depends on delivering PM workflow value without terminal-like seat costs or fragile per-run economics.",
    proof:
      "Average run cost is framed at $0.23 and the system avoids spending the same compute budget on every request.",
    accent: "#34d399",
  },
  {
    title: "Reliability & Responsible AI",
    built:
      "The workflow includes disclaimers, approval gates, source-aware outputs, fallbacks, and LangSmith observability.",
    why:
      "Finance tools need to be reviewable and safe, not just impressive in a demo.",
    proof:
      "No buy or sell recommendation framing, HITL review, and traceable execution paths reinforce trust.",
    accent: "#a78bfa",
  },
  {
    title: "Business Impact & Problem Relevance",
    built:
      "AlphaDesk targets the repeated pre-market workflow of lean portfolio teams and frames the product around time saved.",
    why:
      "This is a clear, high-value professional workflow with a real willingness-to-pay story.",
    proof:
      "150 min to 15 min workflow compression, PM-first positioning, and a boutique hedge fund / family office wedge make the case concrete.",
    accent: "#f472b6",
  },
];

const trustBadges = [
  "Content Filter",
  "Disclaimer Layer",
  "HITL Approval",
  "Audit Trail",
  "LangSmith Trace",
  "Fallback Handling",
];

const scalePlan = [
  {
    title: "Current scalability posture",
    points: [
      "Redis supports operational caching and faster repeated workflows",
      "PostgreSQL models support more durable persistence and structured state",
      "Celery enables recurring workflows like the morning brief",
      "Provider fallback and demo-safe outputs reduce fragility during demos",
    ],
  },
  {
    title: "Security and platform plan",
    points: [
      "Future auth and RBAC for portfolio-level access control",
      "Managed secrets for external data providers and model credentials",
      "Rate limiting and abuse controls for production endpoints",
      "Stronger audit visibility for who triggered which run and why",
    ],
  },
];

const roadmapColumns = [
  {
    title: "Product",
    points: [
      "Expand beyond semiconductor demo coverage",
      "Deepen research workspace and PM reporting surfaces",
      "Improve PM-first information hierarchy across views",
    ],
  },
  {
    title: "Reliability",
    points: [
      "Strengthen fallback handling and provider resilience",
      "Expand evaluation coverage across historical scenarios",
      "Improve source-linking and audit visibility",
    ],
  },
  {
    title: "Scale",
    points: [
      "Add richer live portfolio integrations",
      "Improve persistence and institutional readiness",
      "Push from strong prototype to daily operator tool",
    ],
  },
];

export function AlphaDeskShowcase() {
  const [openDetail, setOpenDetail] = useState<string>("overview");

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <section className={styles.sectionDivider}>
          <div className={styles.heroGrid}>
            <div>
              <div className={styles.eyebrow}>AI Product Case Study</div>
              <h1 className={styles.heroTitle}>AlphaDesk</h1>
              <p className={styles.heroMeta}>
                Agentic portfolio intelligence for public equity portfolio managers
              </p>
              <p className={styles.heroLead}>
                AlphaDesk compresses fragmented pre-market prep into one PM-first operating layer.
                It combines analytics, signals, research, risk review, and PM-ready reporting
                through a multi-agent workflow designed to be useful, reviewable, and commercially
                relevant.
              </p>

              <div className={styles.heroActions}>
                <a href="#workflow" className={styles.primaryCta}>
                  See Agentic Workflow
                </a>
                <a href="#rubric" className={styles.secondaryCta}>
                  View Judge Scorecards
                </a>
              </div>
            </div>

            <article className={styles.summaryCard}>
              <div className={styles.sectionLabel}>Executive Summary</div>
              <div className={styles.executiveList}>
                <div>
                  <strong>What it is:</strong> An AI-powered PM workstation for market monitoring,
                  research, risk review, and reporting.
                </div>
                <div>
                  <strong>Who it is for:</strong> Public equity portfolio managers, especially lean
                  teams without large operations support.
                </div>
                <div>
                  <strong>Why it is agentic:</strong> An orchestrator routes work across specialized
                  agents instead of relying on one generic assistant.
                </div>
                <div>
                  <strong>Why it matters commercially:</strong> It targets a repeated,
                  high-value workflow with a lower-cost operating model than terminal-heavy prep.
                </div>
              </div>
            </article>
          </div>

          <div className={styles.statsGrid}>
            {heroStats.map((stat) => (
              <article key={stat.label} className={styles.statCard}>
                <div className={styles.statValue}>{stat.value}</div>
                <div className={styles.statLabel}>{stat.label}</div>
                <div className={styles.statSub}>{stat.note}</div>
              </article>
            ))}
          </div>

          <div className={styles.heroWorkflowCard}>
            <div className={styles.sectionLabel}>One-Screen Workflow</div>
            <div className={styles.workflowDiagram}>
              {workflowDiagram.map((step, index) => (
                <div key={step.title} className={styles.workflowStep}>
                  <div className={styles.workflowStepCard}>
                    <div className={styles.workflowStepTitle}>{step.title}</div>
                    <p>{step.body}</p>
                  </div>
                  {index < workflowDiagram.length - 1 && <div className={styles.workflowArrow}>-&gt;</div>}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="problem" className={styles.sectionDivider}>
          <div className={styles.sectionHeading}>
            <div className={styles.sectionEyebrow}>Why This Matters</div>
            <h2 className={styles.sectionTitle}>From manual prep to PM-first orchestration</h2>
            <p className={styles.sectionIntro}>
              The page now explains the value proposition visually before diving into architecture.
              Judges can understand the problem and the delta in one short scroll.
            </p>
          </div>

          <div className={styles.problemGrid}>
            {challengeAreas.map((item) => (
              <article key={item.title} className={styles.problemCard}>
                <div className={styles.problemTitle}>{item.title}</div>
                <p>{item.body}</p>
              </article>
            ))}
          </div>

          <div className={styles.comparisonGrid}>
            <article className={styles.comparisonCard}>
              <div className={styles.sectionLabel}>Before: Manual workflow</div>
              <ul className={styles.bulletList}>
                {manualWorkflow.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className={styles.comparisonCard}>
              <div className={styles.sectionLabel}>After: AlphaDesk workflow</div>
              <ul className={styles.bulletList}>
                {alphaDeskWorkflow.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section id="workflow" className={styles.sectionDivider}>
          <div className={styles.sectionHeading}>
            <div className={styles.sectionEyebrow}>How AlphaDesk Works</div>
            <h2 className={styles.sectionTitle}>Agentic workflow, visible at a glance</h2>
          </div>

          <div className={styles.workflowStoryGrid}>
            <article className={styles.workflowStoryCard}>
              <div className={styles.sectionLabel}>System Workflow Diagram</div>
              <div className={styles.diagramFrame}>
                <Image
                  src="/alphadesk/mermaid-diagram.png"
                  alt="AlphaDesk system workflow diagram showing inputs, orchestration, specialized agents, human-in-the-loop review, and outputs."
                  width={8192}
                  height={3260}
                  className={styles.diagramImage}
                  priority
                />
              </div>
              <div className={styles.workflowStoryList}>
                {workflowDiagram.map((step, index) => (
                  <div key={step.title} className={styles.workflowStoryItem}>
                    <div className={styles.workflowNumber}>0{index + 1}</div>
                    <div>
                      <div className={styles.workflowTitle}>{step.title}</div>
                      <p>{step.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className={styles.workflowStoryCard}>
              <div className={styles.sectionLabel}>Specialized Agents</div>
              <div className={styles.agentGrid}>
                {agentCards.map((card) => (
                  <div key={card.title} className={styles.agentCard}>
                    <div className={styles.agentTitle}>{card.title}</div>
                    <p>{card.body}</p>
                  </div>
                ))}
              </div>
            </article>
          </div>

          <div className={styles.toolsCard}>
            <div className={styles.toolsHeader}>
              <div>
                <div className={styles.sectionLabel}>Tools + Data Layer</div>
                <p className={styles.toolsIntro}>
                  External market data, filings, macro sources, and observability infrastructure
                  are part of the operating story, not hidden implementation detail.
                </p>
              </div>
              <div className={styles.langsmithBadge}>LangSmith observability enabled</div>
            </div>
            <div className={styles.toolsWrap}>
              {toolPills.map((pill) => (
                <span key={pill} className={styles.toolPill}>
                  {pill}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section id="surfaces" className={styles.sectionDivider}>
          <div className={styles.sectionHeading}>
            <div className={styles.sectionEyebrow}>Product Surfaces</div>
            <h2 className={styles.sectionTitle}>A visual gallery</h2>
            <p className={styles.sectionIntro}>Actual product screenshots for the five core surfaces.</p>
          </div>

          <div className={styles.surfaceGrid}>
            {productSurfaces.map((surface) => (
              <article key={surface.title} className={styles.surfaceCard}>
                <div className={styles.surfaceInfo}>
                  <div className={styles.surfaceTitleRow}>
                    <div className={styles.surfaceTitle}>{surface.title}</div>
                    <span
                      className={styles.surfaceAccent}
                      style={{ background: surface.accent }}
                    />
                  </div>
                  <p>{surface.summary}</p>
                  <div className={styles.surfaceTagRow}>
                    {surface.bullets.map((item) => (
                      <span key={item} className={styles.surfaceTag}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div className={styles.surfaceImageWrap} style={{ borderColor: `${surface.accent}33` }}>
                  <Image
                    src={surface.src}
                    alt={`${surface.title} screenshot from the AlphaDesk application`}
                    width={1912}
                    height={1042}
                    className={styles.surfaceImage}
                  />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="rubric" className={styles.sectionDivider}>
          <div className={styles.sectionHeading}>
            <div className={styles.sectionEyebrow}>Judging Criteria</div>
            <h2 className={styles.sectionTitle}>Five rubric cards, made to be skimmed</h2>
          </div>

          <div className={styles.rubricGrid}>
            {rubricCards.map((card) => (
              <article
                key={card.title}
                className={styles.rubricCard}
                style={{ borderLeftColor: card.accent }}
              >
                <h3>{card.title}</h3>
                <div className={styles.rubricItem}>
                  <span>What we built</span>
                  <p>{card.built}</p>
                </div>
                <div className={styles.rubricItem}>
                  <span>Why it matters</span>
                  <p>{card.why}</p>
                </div>
                <div className={styles.rubricItem}>
                  <span>Proof</span>
                  <p>{card.proof}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="trust" className={styles.sectionDivider}>
          <div className={styles.sectionHeading}>
            <div className={styles.sectionEyebrow}>Guardrails and Trust</div>
            <h2 className={styles.sectionTitle}>Responsible AI made visible</h2>
          </div>

          <div className={styles.trustGrid}>
            <article className={styles.trustCard}>
              <div className={styles.sectionLabel}>Trust Panel</div>
              <div className={styles.badgeGrid}>
                {trustBadges.map((badge) => (
                  <span key={badge} className={styles.trustBadge}>
                    {badge}
                  </span>
                ))}
              </div>
            </article>

            <article className={styles.trustCard}>
              <div className={styles.sectionLabel}>LangSmith Observability</div>
              <p>
                LangSmith is integrated for observability, allowing us to trace agent execution,
                inspect workflow decisions, and debug or validate multi-step runs with transparency.
              </p>
              <p>
                This makes the workflow easier to trust during demos, easier to improve during
                development, and easier to explain to judges reviewing a multi-agent system.
              </p>
            </article>
          </div>
        </section>

        <section id="scale" className={styles.sectionDivider}>
          <div className={styles.sectionHeading}>
            <div className={styles.sectionEyebrow}>Scalability and Security Plan</div>
            <h2 className={styles.sectionTitle}>Operational plan beyond the demo</h2>
          </div>

          <div className={styles.scaleGrid}>
            {scalePlan.map((group) => (
              <article key={group.title} className={styles.scaleCard}>
                <div className={styles.scaleTitle}>{group.title}</div>
                <ul className={styles.bulletList}>
                  {group.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="roadmap" className={styles.sectionDivider}>
          <div className={styles.sectionHeading}>
            <div className={styles.sectionEyebrow}>Future Roadmap</div>
            <h2 className={styles.sectionTitle}>Product, reliability, and scale</h2>
          </div>

          <div className={styles.roadmapGrid}>
            {roadmapColumns.map((column) => (
              <article key={column.title} className={styles.roadmapCard}>
                <div className={styles.roadmapTitle}>{column.title}</div>
                <ul className={styles.bulletList}>
                  {column.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="details" className={styles.sectionDivider}>
          <div className={styles.sectionHeading}>
            <div className={styles.sectionEyebrow}>Deeper Details</div>
            <h2 className={styles.sectionTitle}>Optional supporting material</h2>
            <p className={styles.sectionIntro}>
              The important parts are visible above. This accordion keeps the deeper architecture
              and supporting explanation available without forcing judges to explore first.
            </p>
          </div>

          <div className={styles.accordionList}>
            {tabs.map((tab) => {
              const isOpen = openDetail === tab.id;

              return (
                <article key={tab.id} className={styles.accordionCard}>
                  <button
                    type="button"
                    className={styles.accordionButton}
                    onClick={() => setOpenDetail(isOpen ? "" : tab.id)}
                    aria-expanded={isOpen}
                  >
                    <span>{tab.label}</span>
                    <span>{isOpen ? "-" : "+"}</span>
                  </button>
                  {isOpen && (
                    <div className={styles.accordionBody}>
                      <p className={styles.accordionIntro}>{tab.intro}</p>
                      <div className={styles.accordionGrid}>
                        {tab.blocks.map((block) => (
                          <section key={block.heading} className={styles.blockCard}>
                            <h3>{block.heading}</h3>
                            {block.paragraphs?.map((paragraph) => (
                              <p key={paragraph}>{paragraph}</p>
                            ))}
                            {block.bullets && (
                              <ul className={styles.bulletList}>
                                {block.bullets.map((bullet) => (
                                  <li key={bullet}>{bullet}</li>
                                ))}
                              </ul>
                            )}
                          </section>
                        ))}
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
