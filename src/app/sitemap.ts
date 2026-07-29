import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://zyndeskjo.com';

const LOCALES = ['en', 'ar'] as const;

const ROUTES = [
  '',
  '/services',
  '/training',
  '/ai-solutions',
  '/development',
  '/qa-testing',
  '/marketing',
  '/projects',
  '/about',
  '/contact',
  '/consultation',
  '/corporate-training',
  '/privacy',
  '/terms',
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    for (const route of ROUTES) {
      entries.push({
        url: `${BASE_URL}/${locale}${route}`,
        lastModified,
        changeFrequency: 'monthly',
        priority: route === '' ? 1.0 : 0.7,
        alternates: {
          languages: {
            en: `${BASE_URL}/en${route}`,
            ar: `${BASE_URL}/ar${route}`,
          },
        },
      });
    }
  }

  return entries;
}
