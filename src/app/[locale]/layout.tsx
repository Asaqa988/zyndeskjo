import type { Metadata, Viewport } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Plus_Jakarta_Sans, IBM_Plex_Sans_Arabic } from 'next/font/google';
import { routing } from '@/i18n/routing';
import { siteConfig } from '@/config/site';
import { Providers } from '@/components/Providers';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp';
import { OrganizationSchema } from '@/components/seo/JsonLd';
import '../globals.css';

const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});
const arabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-arabic',
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta.home' });
  const base = siteConfig.domain;
  return {
    metadataBase: new URL(base),
    title: { default: t('title'), template: `%s · ${siteConfig.name}` },
    description: t('description'),
    applicationName: siteConfig.name,
    alternates: {
      canonical: `${base}/${locale}`,
      languages: { en: `${base}/en`, ar: `${base}/ar`, 'x-default': `${base}/en` },
    },
    openGraph: {
      type: 'website',
      siteName: siteConfig.name,
      locale: locale === 'ar' ? 'ar_JO' : 'en_US',
      url: `${base}/${locale}`,
      title: t('title'),
      description: t('description'),
    },
    twitter: { card: 'summary_large_image', title: t('title'), description: t('description') },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    icons: { icon: '/favicon.svg' },
  };
}

export const viewport: Viewport = {
  themeColor: '#102A43',
  width: 'device-width',
  initialScale: 1,
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!routing.locales.includes(locale as never)) notFound();
  setRequestLocale(locale);

  const messages = await getMessages();
  const tA11y = await getTranslations({ locale, namespace: 'a11y' });
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir} className={`${sans.variable} ${arabic.variable}`}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <div className="aurora-bg" aria-hidden />
            <div className="grid-overlay" aria-hidden />
            <a href="#main" className="skip-link">
              {tA11y('skipToContent')}
            </a>
            <Navbar />
            <main id="main">{children}</main>
            <Footer />
            <FloatingWhatsApp />
          </Providers>
        </NextIntlClientProvider>
        <OrganizationSchema locale={locale} />
      </body>
    </html>
  );
}
