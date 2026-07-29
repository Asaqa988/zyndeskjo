/**
 * Case-study PLACEHOLDERS. No real clients, partnerships, or measured results.
 * Replace text (messages -> projects.items.<slug>) and metrics before launch.
 * `metrics` values are illustrative UI examples only.
 */
export interface CaseStudy {
  slug: string;
  icon: string;
  /** i18n key under projects.industries.<industry> */
  industry: string;
  category: 'ai' | 'automation' | 'mobile' | 'training' | 'ecommerce' | 'qa' | 'marketing';
  tech: string[];
  /** three [value, labelKey] metric placeholders */
  metrics: [string, string][];
  featured?: boolean;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'ai-support-platform',
    icon: 'Headset',
    industry: 'retail',
    category: 'ai',
    tech: ['OpenAI', 'Next.js', 'Supabase', 'n8n'],
    metrics: [['-45%', 'supportCost'], ['24/7', 'availability'], ['+30%', 'csat']],
    featured: true,
  },
  {
    slug: 'business-automation',
    icon: 'Workflow',
    industry: 'logistics',
    category: 'automation',
    tech: ['n8n', 'Odoo', 'Python', 'Google Cloud'],
    metrics: [['120+', 'workflows'], ['-60%', 'manualWork'], ['3x', 'throughput']],
    featured: true,
  },
  {
    slug: 'mobile-service-app',
    icon: 'Smartphone',
    industry: 'services',
    category: 'mobile',
    tech: ['Flutter', 'Firebase', 'Supabase'],
    metrics: [['4.8★', 'rating'], ['10k+', 'installs'], ['-35%', 'churn']],
    featured: true,
  },
  {
    slug: 'corporate-ai-training',
    icon: 'GraduationCap',
    industry: 'enterprise',
    category: 'training',
    tech: ['Claude', 'ChatGPT', 'n8n'],
    metrics: [['200+', 'trained'], ['12', 'workshops'], ['+40%', 'productivity']],
  },
  {
    slug: 'ecommerce-website',
    icon: 'ShoppingBag',
    industry: 'retail',
    category: 'ecommerce',
    tech: ['Next.js', 'Supabase', 'Stripe'],
    metrics: [['+55%', 'conversion'], ['1.2s', 'loadTime'], ['+70%', 'traffic']],
  },
  {
    slug: 'automated-qa-framework',
    icon: 'ShieldCheck',
    industry: 'fintech',
    category: 'qa',
    tech: ['Playwright', 'Selenium', 'Appium'],
    metrics: [['92%', 'coverage'], ['480+', 'scenarios'], ['-50%', 'regressions']],
  },
  {
    slug: 'social-growth-campaign',
    icon: 'TrendingUp',
    industry: 'hospitality',
    category: 'marketing',
    tech: ['Meta Ads', 'Make', 'Analytics'],
    metrics: [['+3.4x', 'reach'], ['+120%', 'leads'], ['-28%', 'cpl']],
  },
];

/**
 * Testimonial PLACEHOLDERS — replace with REAL, approved testimonials
 * before production launch. Do not ship these to a live site as-is.
 */
export interface Testimonial {
  id: string;
  /** avatar initials shown in a glass token (no fabricated photos) */
  initials: string;
}

export const testimonials: Testimonial[] = [
  { id: 't1', initials: 'RA' },
  { id: 't2', initials: 'MK' },
  { id: 't3', initials: 'LS' },
];
