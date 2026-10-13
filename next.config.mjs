import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  /**
   * pdf-parse loads a pdf.js worker from a file next to itself at runtime.
   * Bundled into the route, that file is not there and every upload fails
   * with "Setting up fake worker failed". Left external, it is required from
   * node_modules where the worker is, and it resolves.
   */
  experimental: {
    serverComponentsExternalPackages: ['pdf-parse'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  /**
   * One course, one site.
   *
   * While the Facebook and Instagram campaign for the QA course runs, every
   * page that talked about something else sends the visitor to the course
   * instead of leaving them on a page the ad never promised. The pages
   * themselves are untouched in the repository — this list is the only thing
   * hiding them, so removing an entry brings that page back.
   *
   * Deliberately NOT here: /learn, /examples and /trainer/feedback, which the
   * students already enrolled in the earlier cohort are using right now (they
   * are noindexed instead), plus /privacy and /terms, which an ad account
   * needs to be able to link to.
   *
   * All temporary (307): browsers cache a 308 forever, and this should stay
   * changeable. Query strings (utm_*, fbclid) are carried through by Next.
   *
   * "zyndeskjo.com/register" is the short path that was said aloud in the
   * earlier lecture; it now lands on the QA registration form.
   */
  async redirects() {
    const retired = [
      'about',
      'after-the-course',
      'ai-solutions',
      'consultation',
      'contact',
      'corporate-training',
      'course-info',
      'cv-check',
      'development',
      'marketing',
      'projects',
      'qa-testing',
      'services',
      'trainer',
      'training',
      'what-you-build',
      'why-ai-automation',
    ].join('|');

    return [
      { source: '/register', destination: '/ar#register', permanent: false },
      { source: '/:locale(en|ar)/register', destination: '/:locale#register', permanent: false },
      { source: `/:locale(en|ar)/:page(${retired})`, destination: '/:locale', permanent: false },
      { source: `/:page(${retired})`, destination: '/', permanent: false },
    ];
  },
};

export default withNextIntl(nextConfig);
