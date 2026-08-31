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
};

export default withNextIntl(nextConfig);
