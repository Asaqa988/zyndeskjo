/**
 * Primary navigation. `label` is an i18n key under nav.<label>.
 *
 * The site is one page while the QA course campaign runs, so the navigation is
 * the page's own sections. Every other route either redirects here (see
 * `redirects()` in next.config.mjs) or is kept for students already enrolled
 * in the earlier cohort and is deliberately not linked.
 */
export const navLinks = [
  { href: '/#curriculum', label: 'curriculum' },
  { href: '/#trainer', label: 'trainer' },
  { href: '/#ask', label: 'ask' },
  { href: '/#faq', label: 'faq' },
] as const;

/** Footer link columns. Each `label`/`href` under footer.links.* */
export const footerColumns = [
  {
    title: 'company',
    links: [
      { href: '/#register', label: 'register' },
      { href: '/#curriculum', label: 'curriculum' },
      { href: '/privacy', label: 'privacy' },
      { href: '/terms', label: 'terms' },
    ],
  },
] as const;
