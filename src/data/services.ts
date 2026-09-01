/**
 * Service pillars + the "Choose Your Goal" recommender.
 * All display strings are i18n keys resolved from messages -> services.*
 * `icon` = lucide-react icon name (mapped in components/ui/Icon.tsx).
 */

export interface ServicePillar {
  slug: string;
  icon: string;
  /** i18n key stems under services.pillars.<slug> */
  bullets: string[]; // bullet keys -> services.pillars.<slug>.bullets.<key>
  href: string;
}

export const pillars: ServicePillar[] = [
  {
    slug: 'aiAutomation',
    icon: 'BrainCircuit',
    href: '/ai-solutions',
    bullets: ['agents', 'chatbots', 'voice', 'rag', 'workflow', 'crm', 'bpa'],
  },
  {
    slug: 'training',
    icon: 'GraduationCap',
    href: '/training',
    bullets: ['ai', 'automation', 'qa', 'vibe', 'prompt', 'corporate'],
  },
  {
    slug: 'software',
    icon: 'Code2',
    href: '/development',
    bullets: ['websites', 'platforms', 'mobile', 'systems', 'dashboards', 'api', 'saas'],
  },
  {
    slug: 'creative',
    icon: 'Sparkles',
    href: '/marketing',
    bullets: ['branding', 'social', 'campaigns', 'content', 'uiux', 'seo', 'automation'],
  },
];

/**
 * Interactive goal recommender. Each goal maps to a recommended solution
 * (ordered phases) + a CTA. Text via messages -> goals.items.<id>.
 */
export interface Goal {
  id: string;
  icon: string;
  /** number of phase strings under goals.items.<id>.phases */
  phaseCount: number;
  ctaHref: string;
}

export const goals: Goal[] = [
  { id: 'automate', icon: 'Workflow', phaseCount: 6, ctaHref: '/consultation?goal=automate' },
  { id: 'buildAi', icon: 'Bot', phaseCount: 5, ctaHref: '/consultation?goal=buildAi' },
  { id: 'webApp', icon: 'MonitorSmartphone', phaseCount: 5, ctaHref: '/consultation?goal=webApp' },
  { id: 'trainTeam', icon: 'Users', phaseCount: 5, ctaHref: '/training?goal=trainTeam' },
  { id: 'quality', icon: 'ShieldCheck', phaseCount: 5, ctaHref: '/qa-testing?goal=quality' },
  { id: 'grow', icon: 'TrendingUp', phaseCount: 5, ctaHref: '/marketing?goal=grow' },
  { id: 'chatbot', icon: 'BotMessageSquare', phaseCount: 4, ctaHref: '/ai-solutions?goal=chatbot' },
  { id: 'launch', icon: 'Rocket', phaseCount: 5, ctaHref: '/consultation?goal=launch' },
];

/** Development lifecycle steps (messages -> process.steps.<id>). */
export const processSteps = [
  'discover',
  'analyze',
  'design',
  'prototype',
  'build',
  'test',
  'launch',
  'optimize',
] as const;

/** QA lab categories (messages -> qa.categories.<id>). */
export const qaCategories = [
  'manual',
  'automation',
  'api',
  'mobile',
  'performance',
  'security',
  'accessibility',
  'aiAssisted',
  'strategy',
] as const;

/** QA demo stats — UI EXAMPLES, not company claims. */
export const qaStats = [
  { key: 'coverage', value: 92, suffix: '%' },
  { key: 'automated', value: 480, suffix: '+' },
  { key: 'risks', value: 17, suffix: '' },
  { key: 'buildHealth', value: 96, suffix: '%' },
  { key: 'readiness', value: 88, suffix: '%' },
];
