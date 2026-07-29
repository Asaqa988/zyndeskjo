/** Primary navigation. `label` is an i18n key under nav.<label>. */
export const navLinks = [
  { href: '/', label: 'home' },
  { href: '/services', label: 'services' },
  { href: '/training', label: 'training' },
  { href: '/ai-solutions', label: 'aiSolutions' },
  { href: '/projects', label: 'projects' },
  { href: '/about', label: 'about' },
  { href: '/contact', label: 'contact' },
] as const;

/** Footer link columns. Each `label`/`href` under footer.links.* */
export const footerColumns = [
  {
    title: 'services',
    links: [
      { href: '/ai-solutions', label: 'ai' },
      { href: '/development', label: 'development' },
      { href: '/qa-testing', label: 'qa' },
      { href: '/marketing', label: 'marketing' },
    ],
  },
  {
    title: 'training',
    links: [
      { href: '/training', label: 'allPrograms' },
      { href: '/training', label: 'corporate' },
      { href: '/corporate-training', label: 'requestTraining' },
    ],
  },
  {
    title: 'company',
    links: [
      { href: '/about', label: 'about' },
      { href: '/projects', label: 'projects' },
      { href: '/contact', label: 'contact' },
      { href: '/consultation', label: 'consultation' },
    ],
  },
  {
    title: 'legal',
    links: [
      { href: '/privacy', label: 'privacy' },
      { href: '/terms', label: 'terms' },
    ],
  },
] as const;
