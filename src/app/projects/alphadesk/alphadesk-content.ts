export type HeroStat = {
  label: string;
  value: string;
  note: string;
};

export type Highlight = {
  title: string;
  body: string;
};

export type SectionBlock = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type TabDefinition = {
  id:
    | "overview"
    | "business"
    | "functionality"
    | "analytics"
    | "architecture"
    | "stack"
    | "roadmap"
    | "agentic-design"
    | "evaluation-evidence"
    | "cost-scalability"
    | "reliability-ai"
    | "business-impact";
  label: string;
  intro: string;
  blocks: SectionBlock[];
};

export const heroStats: HeroStat[] = [
  {
    label: "Workflow Time Saved",
    value: "150 min -> 15 min",
    note: "Targeted reduction in the PM morning workflow.",
  },
  {
    label: "Average Full Run",
    value: "52 sec",
    note: "Autonomous pre-market preparation in under a minute.",
  },
  {
    label: "Estimated Run Cost",
    value: "$0.23",
    note: "Low-cost agentic orchestration vs high-seat legacy tools.",
  },
  {
    label: "Primary Demo Focus",
    value: "Semiconductor PM",
    note: "NVDA, TSM, ASML, AMD, INTC, TLT benchmarked to SPY.",
  },
];

export const highlights: Highlight[] = [
  {
    title: "Portfolio-first intelligence",
    body:
      "AlphaDesk is designed around what a public equity PM actually needs before the market opens: what changed, what matters, what is exposed, and what needs follow-up.",
  },
  {
    title: "Agentic, not just chat-based",
    body:
      "An orchestrator routes tasks across specialized agents for signals, metrics, research, risk, correlation, and report generation instead of relying on a single monolithic assistant.",
  },
  {
    title: "Trust and reviewability",
    body:
      "The system uses source-aware outputs, audit-linked risk alerts, disclaimers, and a human approval checkpoint for risk-sensitive flows.",
  },
];

export const challengeAreas: Highlight[] = [
  {
    title: "Fragmented PM workflow",
    body:
      "Portfolio managers still bounce between terminals, news feeds, spreadsheets, filings, and generic notes just to get a coherent morning picture.",
  },
  {
    title: "High labor cost",
    body:
      "Manual portfolio prep compounds into substantial annual cost even for lean family offices and boutique hedge funds.",
  },
  {
    title: "Weak auditability",
    body:
      "Traditional workflows often leave behind scattered notes rather than a clear trail showing which source triggered which conclusion.",
  },
];

export const tabs: TabDefinition[] = [
  {
    id: "overview",
    label: "Overview",
    intro:
      "AlphaDesk is an AI-powered portfolio manager workstation that combines portfolio analytics, signal monitoring, single-name research, risk review, and PM-ready reporting in one product.",
    blocks: [
      {
        heading: "What AlphaDesk is",
        paragraphs: [
          "The product is built as an operating layer for discretionary portfolio managers, especially smaller investment teams that do not have large operations support.",
          "It is not framed as an autonomous trading system. It is framed as a decision-support and workflow-compression system that helps a PM move from market signal to informed action faster.",
        ],
      },
      {
        heading: "Core product promise",
        bullets: [
          "Monitor portfolio-relevant signals before the PM starts work",
          "Connect signals to actual holdings, risk, and exposure",
          "Support research on both owned positions and new names",
          "Generate PM-ready summaries, tearsheets, and client-facing outputs",
        ],
      },
    ],
  },
  {
    id: "business",
    label: "Business Objective",
    intro:
      "The business goal is to replace a fragmented and expensive morning workflow with a finance-specific, lower-cost, and more autonomous operating layer.",
    blocks: [
      {
        heading: "Why this product exists",
        paragraphs: [
          "A discretionary PM often spends hours gathering prices, scanning signals, checking risk, and writing updates before any real decision-making begins.",
          "AlphaDesk turns that repeated process into a structured agentic workflow that can run pre-market and leave the PM with a higher-quality starting point.",
        ],
      },
      {
        heading: "Commercial thesis",
        bullets: [
          "Compete with expensive data terminals by automating workflow, not by copying terminal breadth",
          "Win with lower seat cost and stronger finance-specific orchestration",
          "Position as a research and analytical synthesis tool, not an investment adviser",
          "Start with family offices and boutique hedge funds as the sharpest initial wedge",
        ],
      },
      {
        heading: "Business metrics highlighted in the project",
        bullets: [
          "Bloomberg-equivalent seat comparison: legacy tooling remains expensive and manual",
          "Target outcome: reduce morning prep from roughly 2.5 hours to about 15 minutes",
          "Prototype positioning: autonomous pre-market prep with PM approval gates where needed",
        ],
      },
    ],
  },
  {
    id: "functionality",
    label: "Functionality",
    intro:
      "The application is structured around the actual questions a PM asks every day: what changed, what matters, what is exposed, and what needs review.",
    blocks: [
      {
        heading: "Primary product surfaces",
        bullets: [
          "Dashboard for morning overview, performance, macro context, and execution status",
          "Signal Monitor for portfolio-relevant market and company intelligence",
          "Research Chat for portfolio questions and single-name deep dives",
          "Risk Monitor for alerts, thresholds, and human-in-the-loop review",
          "PM Tearsheet for narrative, attribution, backtest, and export-oriented reporting",
        ],
      },
      {
        heading: "What the system solves",
        bullets: [
          "Cuts time spent stitching together market context across multiple tools",
          "Reduces missed high-impact signals that affect current holdings",
          "Makes risk review more visible and structured",
          "Improves consistency of PM summaries, letters, and report outputs",
        ],
      },
      {
        heading: "Why the semiconductor focus matters",
        paragraphs: [
          "The prototype is centered on a semiconductor-themed portfolio because the space is rich in policy shocks, supply-chain disruption, earnings sensitivity, and cross-name correlation effects.",
          "That makes the signal-to-research-to-risk chain easier to demonstrate and commercially believable.",
        ],
      },
    ],
  },
  {
    id: "analytics",
    label: "Calculations",
    intro:
      "AlphaDesk combines deterministic portfolio analytics with agentic orchestration so that the PM sees both the numbers and the context around those numbers.",
    blocks: [
      {
        heading: "Portfolio analytics computed in the system",
        bullets: [
          "Portfolio returns and indexed performance vs SPY benchmark",
          "Annualized return, annualized volatility, Sharpe ratio, Sortino ratio, and Calmar ratio",
          "Max drawdown, VaR 95 percent, CVaR 95 percent, beta, and information ratio",
          "Attribution by position, weight breakdown, drawdown series, and correlation matrix",
        ],
      },
      {
        heading: "Risk problems the product is addressing",
        bullets: [
          "Whether risk limits have been breached",
          "Which positions are driving portfolio stress",
          "Whether diversification is holding up in correlated selloffs",
          "Whether a new signal should trigger deeper research or PM review",
        ],
      },
      {
        heading: "How analytics and AI work together",
        paragraphs: [
          "Quantitative portfolio math stays deterministic in Python nodes, while LLM orchestration and research handle planning, synthesis, and context assembly.",
          "This split is intentional: keep critical calculations explicit and reproducible while using agentic reasoning for routing, summarization, and multi-source interpretation.",
        ],
      },
    ],
  },
  {
    id: "architecture",
    label: "Architecture",
    intro:
      "The system is built as a multi-agent workflow with a central orchestrator, specialized nodes, external tools, and visible PM-facing outputs.",
    blocks: [
      {
        heading: "Agent workflow",
        bullets: [
          "Inputs arrive from portfolio state, PM queries, and external signals",
          "The orchestrator decides which agents need to run",
          "Specialized agents perform metrics, research, signals, risk, correlation, and reporting tasks",
          "Human review is triggered when risk-sensitive conditions require PM acknowledgement",
        ],
      },
      {
        heading: "Backend and state model",
        paragraphs: [
          "The backend uses FastAPI with a LangGraph orchestration layer. Quant logic lives in deterministic graph nodes and external data access is normalized through tools.",
          "Graph state is kept JSON-serializable, while DataFrames are cached outside state. Redis is heavily used for operational caching and PostgreSQL models support longer-lived persistence.",
          "LangSmith is used for run tracing and observability so agent routing, tool calls, and execution quality can be inspected during debugging, demos, and evaluation.",
        ],
      },
      {
        heading: "Why this architecture matters",
        paragraphs: [
          "This architecture makes the product more than a chat wrapper. It creates a routeable, testable, and observable workflow for portfolio intelligence.",
        ],
      },
    ],
  },
  {
    id: "stack",
    label: "Tech Stack",
    intro:
      "AlphaDesk uses a modern full-stack architecture chosen for fast iteration, finance-specific computation, and agent orchestration.",
    blocks: [
      {
        heading: "Frontend",
        bullets: ["React 18", "Vite", "Tailwind CSS", "Chart.js"],
      },
      {
        heading: "Backend and orchestration",
        bullets: ["FastAPI", "LangGraph", "LangChain", "Celery", "PostgreSQL", "Redis"],
      },
      {
        heading: "Models and data sources",
        bullets: [
          "OpenAI models for orchestration, signal scoring, research, and report generation",
          "Financial Modeling Prep, Finnhub, SEC EDGAR, FRED, yfinance, Reuters RSS, Reddit",
          "LangSmith for workflow tracing and observability, plus WeasyPrint and Jinja2 for PM report generation",
        ],
      },
    ],
  },
  {
    id: "roadmap",
    label: "Future Goals",
    intro:
      "The current prototype already proves the workflow concept, but the longer-term opportunity is a more durable and institution-ready PM operating layer.",
    blocks: [
      {
        heading: "Near-term product goals",
        bullets: [
          "Deepen evidence and evaluation across historical scenarios",
          "Improve UI consistency and PM-first information hierarchy",
          "Strengthen source reliability, fallback handling, and audit visibility",
          "Expand single-name research into a more institutional research workspace",
        ],
      },
      {
        heading: "Platform evolution",
        bullets: [
          "Support live portfolio integrations and richer persistence",
          "Expand from semiconductor demo coverage to broader sector and watchlist workflows",
          "Add more scenario analysis and construction support for PMs",
          "Push the product from strong prototype to credible daily operator tool",
        ],
      },
      {
        heading: "Longer-term ambition",
        paragraphs: [
          "The long-term vision is an AI operating layer that a portfolio manager can trust to monitor the market, prepare context before the day starts, and keep human decision-makers in control while removing repeated manual work.",
        ],
      },
    ],
  },
  {
    id: "agentic-design",
    label: "Agentic Design & System Functionality",
    intro:
      "AlphaDesk is designed as a real multi-agent workflow, where an orchestrator routes work across specialized agents instead of relying on one generic assistant response.",
    blocks: [
      {
        heading: "Why the system is agentic",
        bullets: [
          "A central orchestrator decides which agents to invoke based on the incoming signal or PM request",
          "Specialized agents handle signals, portfolio metrics, research, risk monitoring, correlation analysis, and reporting",
          "The workflow can branch, pause, and resume instead of following a fixed one-shot response pattern",
          "The system exposes PM-facing outputs across dashboard, chat, risk, signals, and tearsheet surfaces",
        ],
      },
      {
        heading: "System functionality demonstrated in the product",
        bullets: [
          "Portfolio dashboard with metrics, signals, macro context, and execution visibility",
          "Signal monitoring with tiered event prioritization",
          "Research chat for portfolio questions and single-name deep dives",
          "Risk workflows with threshold review and acknowledgement path",
          "Report generation for PM narratives, client-facing summaries, and tearsheet-style outputs",
        ],
      },
      {
        heading: "Design intent behind the architecture",
        paragraphs: [
          "The project is intentionally structured so deterministic portfolio math stays explicit, while agentic reasoning is used for routing, synthesis, prioritization, and explanation.",
          "This makes AlphaDesk more trustworthy than a generic chat surface and more useful than a static analytics dashboard.",
        ],
      },
    ],
  },
  {
    id: "evaluation-evidence",
    label: "Evaluation & Evidence",
    intro:
      "The prototype is framed around measurable workflow improvement and historical scenario-based validation rather than relying only on feature claims.",
    blocks: [
      {
        heading: "Evidence used in the project",
        bullets: [
          "Historical semiconductor shock scenarios used to validate signal detection and downstream reasoning",
          "Scenario-driven checks for orchestrator routing, research quality, and risk escalation behavior",
          "Demo-safe runs and smoke tests to verify graph compilation, state rules, and core product stability",
          "Traceable outputs designed to show which source or workflow step informed a result",
          "LangSmith traces used to inspect agent paths, tool execution, and workflow regressions",
        ],
      },
      {
        heading: "What the team is measuring",
        bullets: [
          "Time-to-detection and time-to-decision improvement vs manual workflows",
          "Whether the correct agents are triggered for a given event or query",
          "Whether risk-sensitive cases produce the right review behavior",
          "Whether outputs stay source-aware and operationally useful to a PM",
        ],
      },
      {
        heading: "Why this matters to judges",
        paragraphs: [
          "The strongest version of AlphaDesk is not just that it looks polished. It is that the workflow can be demonstrated, reproduced, and reasoned about with concrete evidence.",
        ],
      },
    ],
  },
  {
    id: "cost-scalability",
    label: "Cost Efficiency & Scalability",
    intro:
      "AlphaDesk is built to deliver finance-specific workflow value without inheriting the seat cost and operational overhead of legacy terminal-heavy workflows.",
    blocks: [
      {
        heading: "Cost posture",
        bullets: [
          "The business case emphasizes low per-run cost relative to the value of time saved for a PM",
          "The system uses targeted agent routing instead of spending the same level of compute on every task",
          "Model usage is split between heavier reasoning and lighter scoring tasks to support cost discipline",
        ],
      },
      {
        heading: "Scalability decisions in the architecture",
        bullets: [
          "Redis is used heavily for operational caching and route-level responsiveness",
          "PostgreSQL and structured state models support more durable expansion over time",
          "Celery-based scheduling supports autonomous recurring workflows such as the morning brief",
          "Demo mode and cached outputs reduce fragility in rehearsals and judged environments",
        ],
      },
      {
        heading: "Strategic scalability lens",
        paragraphs: [
          "The goal is not to be a broad consumer chatbot for finance. The goal is to be a targeted operating layer for PM workflows, which is a more defensible path for both product-market fit and cost control.",
        ],
      },
    ],
  },
  {
    id: "reliability-ai",
    label: "Reliability & Responsible AI",
    intro:
      "AlphaDesk is explicitly positioned as a decision-support system with transparency, auditability, and human review built into the workflow.",
    blocks: [
      {
        heading: "Reliability mechanisms",
        bullets: [
          "Graceful degradation and fallback patterns for fragile external data providers",
          "Agent execution visibility through timeline and workflow status UI",
          "LangSmith traces for run-level observability, debugging, and evaluation",
          "Demo mode support for stable reproduction and presentations",
          "Structured separation between deterministic analytics and LLM-generated synthesis",
        ],
      },
      {
        heading: "Responsible AI posture",
        bullets: [
          "No explicit buy or sell recommendation framing",
          "Content filtering and disclaimer language on generated outputs",
          "Human-in-the-loop review before sensitive risk workflows are resumed",
          "Source-linked alerts and audit-oriented workflow design where available",
        ],
      },
      {
        heading: "Why this matters in finance",
        paragraphs: [
          "In a PM workflow, being impressive is not enough. The system has to be understandable, reviewable, and safe to use as part of a real decision process.",
        ],
      },
    ],
  },
  {
    id: "business-impact",
    label: "Business Impact & Problem Relevance",
    intro:
      "The strongest commercial argument for AlphaDesk is that it targets a real and repeated pain point in an existing high-value professional workflow.",
    blocks: [
      {
        heading: "Problem relevance",
        bullets: [
          "PMs still spend significant time on repetitive pre-market prep and coordination work",
          "Lean investment teams cannot always justify multiple expensive data and workflow systems",
          "The pain is operational, not theoretical: what changed, what matters, and what needs review before the market opens",
        ],
      },
      {
        heading: "Why the product wedge is strong",
        bullets: [
          "Family offices and boutique hedge funds are easier to reach than large institutions and feel the workflow burden more directly",
          "Semiconductor portfolios provide a vivid, high-stakes demonstration environment with clear catalysts and risk chains",
          "The product story is easy to grasp because it improves a known workflow rather than inventing a new one",
        ],
      },
      {
        heading: "Business case narrative",
        paragraphs: [
          "AlphaDesk is positioned as a lower-cost, more autonomous, and more workflow-aware alternative to legacy terminal-driven morning prep. Its commercial story is rooted in time saved, better visibility, and more structured decision support.",
        ],
      },
    ],
  },
];

export const workflowSteps = [
  {
    title: "Inputs",
    body: "Portfolio data, PM queries, and market signals enter the system.",
  },
  {
    title: "Signal and Query Intake",
    body: "Incoming context is normalized and prepared for routing.",
  },
  {
    title: "Orchestrator",
    body: "The central planner selects which agents should run next.",
  },
  {
    title: "PM Outputs",
    body: "The workflow produces dashboard insights, research answers, risk review, and report outputs.",
  },
];

export const agentCards = [
  {
    title: "Metrics",
    body: "Portfolio analytics, benchmark comparison, attribution, drawdown, and returns context.",
  },
  {
    title: "Research",
    body: "Single-name fundamentals and multi-source synthesis tied to the portfolio context.",
  },
  {
    title: "Risk",
    body: "Risk thresholds, alert creation, and human review triggers.",
  },
  {
    title: "Correlation",
    body: "Cross-position relationships, correlation heatmap, and diversification checks.",
  },
  {
    title: "Report",
    body: "PM narrative, client-facing summary, and export-oriented reporting.",
  },
];

export const toolPills = [
  "FMP",
  "Finnhub",
  "SEC EDGAR",
  "yfinance",
  "FRED",
  "Reuters",
  "Reddit",
  "LangSmith",
];
