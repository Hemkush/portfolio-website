export type ProjectEvidence = {
  name: string;
  role: string;
  problem: string;
  architecture: string;
  impact: string[];
  tradeoffs: string;
};

export const PROJECT_EVIDENCE: ProjectEvidence[] = [
  {
    name: 'AI-Driven Marketing Intelligence Platform',
    role: 'Solo Builder',
    problem: 'Needed a reliable, production-grade AI marketing assistant that could synthesize context and generate high-quality outputs with low token waste.',
    architecture: 'Modular FastAPI services + retrieval/context memory layer + PostgreSQL + Dockerized deployment with clear service boundaries.',
    impact: [
      'Built an 8-service pipeline for maintainability and debugging clarity.',
      'Reduced token usage by ~40% through context optimization and prompt restructuring.',
      'Improved output reliability with defensive parsing and deterministic fallbacks.',
    ],
    tradeoffs: 'Accepted added orchestration complexity to gain observability and safer production behavior.',
  },
  {
    name: 'AlphaDesk - Agentic Portfolio Intelligence',
    role: 'Solo Builder',
    problem: 'Portfolio managers needed a faster, more structured pre-market workflow that connected signals, research, risk, and reporting without jumping across disconnected tools.',
    architecture: 'FastAPI backend + agent orchestrator + deterministic analytics nodes + Redis caching + PostgreSQL persistence + PM-facing dashboard and reporting surfaces.',
    impact: [
      'Compressed the PM morning workflow into a single source-aware operating layer.',
      'Separated deterministic portfolio math from LLM synthesis to improve trust and reproducibility.',
      'Added human review checkpoints for risk-sensitive flows instead of relying on a one-shot assistant.',
    ],
    tradeoffs: 'Accepted higher orchestration and product complexity to gain auditability, finance-specific routing, and safer decision-support behavior.',
  },
  {
    name: 'Document Analysis Multiagent RAG-Chatbot',
    role: 'Solo Builder',
    problem: 'Users needed accurate answers over uploaded documents with less hallucination and stronger context tracking.',
    architecture: 'LangGraph orchestrated ReACT-style agents + vector retrieval + persistent conversational memory + Next.js frontend.',
    impact: [
      'Enabled multi-source document ingestion with context-aware responses.',
      'Improved answer relevance via retrieval-first pipeline design.',
      'Shipped a full-stack interface suitable for non-technical users.',
    ],
    tradeoffs: 'Chose higher latency from deeper agent orchestration in exchange for response quality and traceability.',
  },
  {
    name: 'E-Livestock Analytical Dashboard',
    role: 'Team Lead (5 members)',
    problem: 'Stakeholders needed a predictive analytics workflow that connected farm data, disease risk, and business decisions.',
    architecture: 'ELT data pipeline + predictive modeling + React dashboard views for decision-ready KPI visualization.',
    impact: [
      'Led a 5-member team with structured delivery milestones.',
      'Delivered disease risk prediction and business-oriented analytics views.',
      'Presented outputs in executive-friendly format for stakeholder decisions.',
    ],
    tradeoffs: 'Prioritized explainability and stakeholder usability over purely model-centric complexity.',
  },
];

