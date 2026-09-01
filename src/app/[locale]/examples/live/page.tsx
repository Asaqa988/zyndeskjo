import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { pageMetadata } from '@/lib/seo';
import { Icon } from '@/components/ui/Icon';
import { LiveWall } from '@/components/examples/LiveWall';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta.examplesLive' });
  return pageMetadata({
    locale,
    path: '/examples/live',
    title: t('title'),
    description: t('description'),
  });
}

/**
 * The screen for the room.
 *
 * Wide, sparse and readable from the back: one enormous number, the breakdown
 * under it, and the ideas arriving. Nothing else competes — this is projected
 * while somebody is talking over it.
 */
export default async function LivePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations('pages.examples.live');
  const bot = process.env.NEXT_PUBLIC_TELEGRAM_BOT_URL ?? '';

  return (
    <section className="pb-24 pt-28 sm:pt-32">
      <div className="container-z flex max-w-5xl flex-col gap-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-4xl font-bold leading-[1.15] text-ink sm:text-5xl">
            {t('title')}
          </h1>
          <p className="max-w-[60ch] text-lg leading-relaxed text-navy-medium">{t('lead')}</p>

          {bot && (
            <a
              href={bot}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-2 rounded-pill bg-navy px-7 py-4 text-base font-bold text-white transition hover:bg-navy-medium"
            >
              <Icon name="Send" size={18} />
              {t('openBot')}
            </a>
          )}
        </div>

        <LiveWall />
      </div>
    </section>
  );
}
