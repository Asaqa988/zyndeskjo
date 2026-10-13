import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { siteConfig } from '@/config/site';
import { QaLanding } from '@/components/qa/QaLanding';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta.qaCourse' });
  // The canonical is the home page: the course now lives there, and this URL
  // is kept only because it was already linked from ads and the footer. Two
  // addresses for one page would split the ranking between them.
  //
  // openGraph is left to the layout rather than built by pageMetadata, because
  // declaring one here would replace the layout's and drop its share card —
  // a link to this URL would then preview with no image.
  const base = siteConfig.domain;
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `${base}/${locale}`,
      languages: { en: `${base}/en`, ar: `${base}/ar`, 'x-default': `${base}/en` },
    },
  };
}

/** The same page as `/`, kept reachable for links that already point here. */
export default function QaCoursePage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  return <QaLanding locale={locale} />;
}
