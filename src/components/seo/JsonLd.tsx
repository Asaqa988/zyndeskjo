import { siteConfig } from '@/config/site';

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Organization + LocalBusiness — rendered site-wide. */
export function OrganizationSchema({ locale }: { locale: string }) {
  const base = siteConfig.domain;
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': ['Organization', 'LocalBusiness', 'ProfessionalService'],
        name: siteConfig.name,
        url: `${base}/${locale}`,
        image: `${base}/og.png`,
        telephone: siteConfig.contact.phoneDisplay,
        email: siteConfig.contact.email,
        areaServed: 'JO',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'University Street',
          addressLocality: siteConfig.contact.city,
          addressCountry: siteConfig.contact.countryCode,
        },
        sameAs: [siteConfig.social.linkedin],
        knowsAbout: [
          'Artificial Intelligence',
          'Business Automation',
          'Software Testing',
          'Web Development',
          'Digital Marketing',
          'Corporate Training',
        ],
      }}
    />
  );
}

/** Service schema for service pages. */
export function ServiceSchema({
  name,
  description,
  locale,
  path,
}: {
  name: string;
  description: string;
  locale: string;
  path: string;
}) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: name,
        description,
        provider: { '@type': 'Organization', name: siteConfig.name },
        areaServed: { '@type': 'Country', name: 'Jordan' },
        url: `${siteConfig.domain}/${locale}${path}`,
      }}
    />
  );
}

/** Course schema for training programs. */
export function CourseSchema({
  name,
  description,
  locale,
}: {
  name: string;
  description: string;
  locale: string;
}) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Course',
        name,
        description,
        inLanguage: locale,
        provider: {
          '@type': 'Organization',
          name: siteConfig.name,
          sameAs: siteConfig.domain,
        },
      }}
    />
  );
}

/** FAQ schema — pass Q/A pairs. */
export function FaqSchema({ items }: { items: { q: string; a: string }[] }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map((it) => ({
          '@type': 'Question',
          name: it.q,
          acceptedAnswer: { '@type': 'Answer', text: it.a },
        })),
      }}
    />
  );
}

/** Breadcrumb schema. */
export function BreadcrumbSchema({
  items,
  locale,
}: {
  items: { name: string; path: string }[];
  locale: string;
}) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((it, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: it.name,
          item: `${siteConfig.domain}/${locale}${it.path}`,
        })),
      }}
    />
  );
}
