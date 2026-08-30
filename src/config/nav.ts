/**
 * Primary navigation. `label` is an i18n key under nav.<label>.
 *
 * The site is currently stripped back to the assistant: Home (the avatar), the
 * course platform, and Contact. The other routes still exist and still render
 * if visited directly — they are simply not linked. To bring the full site
 * back, restore the entries below and the sections in src/app/[locale]/page.tsx.
 */
export const navLinks = [
  { href: '/', label: 'home' },
  { href: '/learn', label: 'learn' },
  { href: '/what-you-build', label: 'whatYouBuild' },
  { href: '/contact', label: 'contact' },
  // Unlinked for now:
  // { href: '/services', label: 'services' },
  // { href: '/training', label: 'training' },
  // { href: '/ai-solutions', label: 'aiSolutions' },
  // { href: '/projects', label: 'projects' },
  // { href: '/about', label: 'about' },
] as const;

/** Footer link columns. Each `label`/`href` under footer.links.* */
export const footerColumns = [
  {
    title: 'company',
    links: [
      { href: '/contact', label: 'contact' },
      { href: '/privacy', label: 'privacy' },
      { href: '/terms', label: 'terms' },
    ],
  },
] as const;
