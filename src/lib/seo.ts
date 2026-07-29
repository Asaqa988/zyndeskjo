import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

/**
 * Per-page metadata builder. Produces a CORRECT canonical + hreflang set for
 * each route (the layout's alternates only cover the homepage). Title/description
 * flow through the layout's title template and OG/Twitter fallbacks automatically;
 * the OG image is injected site-wide by src/app/[locale]/opengraph-image.tsx.
 */
export function pageMetadata({
  locale,
  path,
  title,
  description,
}: {
  locale: string;
  /** route path WITHOUT locale prefix, e.g. '/services' (use '' for home) */
  path: string;
  title: string;
  description: string;
}): Metadata {
  const base = siteConfig.domain;
  const url = `${base}/${locale}${path}`;
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: `${base}/en${path}`,
        ar: `${base}/ar${path}`,
        'x-default': `${base}/en${path}`,
      },
    },
    openGraph: {
      type: 'website',
      siteName: siteConfig.name,
      locale: locale === 'ar' ? 'ar_JO' : 'en_US',
      url,
    },
  };
}
