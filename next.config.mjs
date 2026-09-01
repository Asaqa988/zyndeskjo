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
   * A path short enough to say out loud.
   *
   * "zyndeskjo.com slash register" is what gets said in a live lecture and
   * pasted into a WhatsApp group; nobody is going to type the locale prefix,
   * and locale negotiation would send an Arabic-speaking room to the English
   * page whenever their browser happens to be set to English.
   *
   * Temporary, not permanent: browsers cache a 308 forever, and this should
   * stay changeable.
   */
  async redirects() {
    return [{ source: '/register', destination: '/ar/register', permanent: false }];
  },
};

export default withNextIntl(nextConfig);
