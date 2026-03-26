// AI Model Tracker — update this file when new models are released.
// Capability scores (0–100) are relative indicators based on public benchmarks,
// not exact numbers. Higher = stronger in that dimension.

export interface Capability {
  name: string;
  score: number;
}

export interface Model {
  name: string;
  releasedDate: string;
  contextWindow: string;
  speed: 'Very Fast' | 'Fast' | 'Medium' | 'Slow';
  costTier: 'Free tier' | '$' | '$$' | '$$$';
  bestFor: string;
  isLatest: boolean;
  whatsNew: string[];
  capabilities: Capability[];
}

export interface Provider {
  id: string;
  name: string;
  color: string;
  lastVerified: string;
  models: Model[];
}

export const PROVIDERS: Provider[] = [
  {
    id: 'gemini',
    name: 'Google Gemini',
    color: '#4285f4',
    lastVerified: 'Aug 2025',
    models: [
      {
        name: 'Gemini 2.5 Pro',
        releasedDate: 'May 2025',
        contextWindow: '1M tokens',
        speed: 'Medium',
        costTier: '$$',
        bestFor: 'Complex reasoning, long-context tasks, multimodal',
        isLatest: true,
        whatsNew: [
          'Best-in-class reasoning on MMLU and MATH benchmarks',
          'Native multimodal: text, image, audio, video input',
          '1M token context — full codebases in a single prompt',
          'Improved instruction following over 2.0 series',
        ],
        capabilities: [
          { name: 'Reasoning', score: 91 },
          { name: 'Coding', score: 88 },
          { name: 'Multimodal', score: 93 },
          { name: 'Speed', score: 55 },
          { name: 'Cost Efficiency', score: 52 },
        ],
      },
      {
        name: 'Gemini 2.5 Flash',
        releasedDate: 'May 2025',
        contextWindow: '1M tokens',
        speed: 'Fast',
        costTier: '$',
        bestFor: 'High-volume production, RAG pipelines',
        isLatest: false,
        whatsNew: [
          'Near-Pro quality at a fraction of the cost',
          '1M context with low latency',
          'Best value model in the 2.5 family',
        ],
        capabilities: [
          { name: 'Reasoning', score: 80 },
          { name: 'Coding', score: 82 },
          { name: 'Multimodal', score: 85 },
          { name: 'Speed', score: 84 },
          { name: 'Cost Efficiency', score: 80 },
        ],
      },
      {
        name: 'Gemini 2.5 Flash-Lite',
        releasedDate: 'Jun 2025',
        contextWindow: '1M tokens',
        speed: 'Very Fast',
        costTier: 'Free tier',
        bestFor: 'Categorization, classification, lightweight tasks',
        isLatest: false,
        whatsNew: [
          'Fastest model in the Gemini 2.5 family',
          'Ideal for high-frequency, low-complexity tasks',
          'Free tier available via Google AI Studio',
        ],
        capabilities: [
          { name: 'Reasoning', score: 65 },
          { name: 'Coding', score: 68 },
          { name: 'Multimodal', score: 70 },
          { name: 'Speed', score: 97 },
          { name: 'Cost Efficiency', score: 96 },
        ],
      },
      {
        name: 'Gemini 2.0 Flash',
        releasedDate: 'Feb 2025',
        contextWindow: '1M tokens',
        speed: 'Fast',
        costTier: '$',
        bestFor: 'Stable production workloads, legacy integration',
        isLatest: false,
        whatsNew: [
          'Previous generation — still widely used in production',
          'Solid multimodal performance, high reliability',
        ],
        capabilities: [
          { name: 'Reasoning', score: 72 },
          { name: 'Coding', score: 74 },
          { name: 'Multimodal', score: 78 },
          { name: 'Speed', score: 82 },
          { name: 'Cost Efficiency', score: 78 },
        ],
      },
    ],
  },

  {
    id: 'anthropic',
    name: 'Anthropic',
    color: '#d97757',
    lastVerified: 'Mar 2026',
    models: [
      {
        name: 'Claude Opus 4.6',
        releasedDate: '2025',
        contextWindow: '200K tokens',
        speed: 'Slow',
        costTier: '$$$',
        bestFor: 'Complex agentic tasks, deep analysis, strategic reasoning',
        isLatest: true,
        whatsNew: [
          'Most capable Claude model for multi-step agent workflows',
          'Strongest performance on complex reasoning and long-horizon tasks',
          'Best-in-class instruction following and nuanced output',
          'Designed for tasks where quality matters more than speed',
        ],
        capabilities: [
          { name: 'Reasoning', score: 94 },
          { name: 'Coding', score: 90 },
          { name: 'Multimodal', score: 78 },
          { name: 'Speed', score: 38 },
          { name: 'Cost Efficiency', score: 22 },
        ],
      },
      {
        name: 'Claude Sonnet 4.6',
        releasedDate: '2025',
        contextWindow: '200K tokens',
        speed: 'Medium',
        costTier: '$$',
        bestFor: 'Balanced production use, coding assistants, RAG',
        isLatest: false,
        whatsNew: [
          'Best performance-to-cost ratio in the Claude 4 family',
          'Strong at agentic coding and tool use',
          'Preferred choice for most production AI applications',
        ],
        capabilities: [
          { name: 'Reasoning', score: 86 },
          { name: 'Coding', score: 89 },
          { name: 'Multimodal', score: 75 },
          { name: 'Speed', score: 68 },
          { name: 'Cost Efficiency', score: 62 },
        ],
      },
      {
        name: 'Claude Haiku 4.5',
        releasedDate: '2025',
        contextWindow: '200K tokens',
        speed: 'Very Fast',
        costTier: '$',
        bestFor: 'High-throughput pipelines, summarization, quick responses',
        isLatest: false,
        whatsNew: [
          'Fastest model in the Claude 4 family',
          'Significant capability improvement over Haiku 3.5',
          'Ideal for cost-sensitive, high-volume applications',
        ],
        capabilities: [
          { name: 'Reasoning', score: 70 },
          { name: 'Coding', score: 72 },
          { name: 'Multimodal', score: 65 },
          { name: 'Speed', score: 94 },
          { name: 'Cost Efficiency', score: 88 },
        ],
      },
      {
        name: 'Claude 3.7 Sonnet',
        releasedDate: 'Feb 2025',
        contextWindow: '200K tokens',
        speed: 'Medium',
        costTier: '$$',
        bestFor: 'Extended thinking, step-by-step reasoning chains',
        isLatest: false,
        whatsNew: [
          'Introduced extended thinking — visible reasoning traces',
          'Strong performance on math and science benchmarks',
          'Previous generation, still used for reasoning-heavy tasks',
        ],
        capabilities: [
          { name: 'Reasoning', score: 88 },
          { name: 'Coding', score: 84 },
          { name: 'Multimodal', score: 72 },
          { name: 'Speed', score: 58 },
          { name: 'Cost Efficiency', score: 55 },
        ],
      },
    ],
  },

  {
    id: 'openai',
    name: 'OpenAI',
    color: '#10a37f',
    lastVerified: 'Aug 2025',
    models: [
      {
        name: 'o3',
        releasedDate: 'Apr 2025',
        contextWindow: '200K tokens',
        speed: 'Slow',
        costTier: '$$$',
        bestFor: 'Frontier reasoning, math, science, competitive coding',
        isLatest: true,
        whatsNew: [
          'Highest reasoning capability of any OpenAI model',
          'State-of-the-art on AIME, SWE-bench, and GPQA Diamond',
          'Extended thinking with transparent reasoning steps',
          'Best choice for tasks requiring deep, reliable reasoning',
        ],
        capabilities: [
          { name: 'Reasoning', score: 97 },
          { name: 'Coding', score: 93 },
          { name: 'Multimodal', score: 72 },
          { name: 'Speed', score: 28 },
          { name: 'Cost Efficiency', score: 18 },
        ],
      },
      {
        name: 'GPT-4o',
        releasedDate: 'May 2024',
        contextWindow: '128K tokens',
        speed: 'Fast',
        costTier: '$$',
        bestFor: 'Multimodal tasks, voice, real-time applications',
        isLatest: false,
        whatsNew: [
          'Native multimodal: text, image, and audio in one model',
          'Real-time voice capabilities',
          'Strong balance of speed, cost, and capability',
          'Most widely deployed OpenAI model in production',
        ],
        capabilities: [
          { name: 'Reasoning', score: 79 },
          { name: 'Coding', score: 82 },
          { name: 'Multimodal', score: 91 },
          { name: 'Speed', score: 80 },
          { name: 'Cost Efficiency', score: 58 },
        ],
      },
      {
        name: 'o1',
        releasedDate: 'Dec 2024',
        contextWindow: '200K tokens',
        speed: 'Slow',
        costTier: '$$$',
        bestFor: 'Complex multi-step reasoning, STEM problems',
        isLatest: false,
        whatsNew: [
          'First generation reasoning model from OpenAI',
          'Strong on STEM, math, and science tasks',
          'Predecessor to o3 — still used for cost-sensitive reasoning',
        ],
        capabilities: [
          { name: 'Reasoning', score: 88 },
          { name: 'Coding', score: 85 },
          { name: 'Multimodal', score: 60 },
          { name: 'Speed', score: 32 },
          { name: 'Cost Efficiency', score: 30 },
        ],
      },
      {
        name: 'GPT-4o mini',
        releasedDate: 'Jul 2024',
        contextWindow: '128K tokens',
        speed: 'Very Fast',
        costTier: '$',
        bestFor: 'High-volume, cost-sensitive production pipelines',
        isLatest: false,
        whatsNew: [
          'Best cost efficiency in the GPT-4o family',
          'Multimodal support at a fraction of GPT-4o cost',
          'Widely used for classification, extraction, and triage',
        ],
        capabilities: [
          { name: 'Reasoning', score: 62 },
          { name: 'Coding', score: 68 },
          { name: 'Multimodal', score: 74 },
          { name: 'Speed', score: 92 },
          { name: 'Cost Efficiency', score: 90 },
        ],
      },
    ],
  },
];
