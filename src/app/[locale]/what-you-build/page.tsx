import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { pageMetadata } from '@/lib/seo';
import { PageHero } from '@/components/layout/PageHero';
import { BreadcrumbSchema } from '@/components/seo/JsonLd';
import { builds, type BuildBlock } from '@/data/builds';
import { pick } from '@/data/course/types';
import { Maximize2 } from 'lucide-react';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta.whatYouBuild' });
  return pageMetadata({
    locale,
    path: '/what-you-build',
    title: t('title'),
    description: t('description'),
  });
}

/**
 * What a student walks away having built.
 *
 * Laid out one system per row rather than as a grid: the diagrams are dense,
 * with labels small enough that a thumbnail would show three unreadable
 * rectangles. Each one gets the full column width and opens at full size on
 * click, and the explanation sits directly beneath the picture it belongs to.
 */
export default async function WhatYouBuildPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations('pages.whatYouBuild');
  const tn = await getTranslations('nav');

  return (
    <>
      <BreadcrumbSchema
        locale={locale}
        items={[
          { name: tn('home'), path: '' },
          { name: tn('whatYouBuild'), path: '/what-you-build' },
        ]}
      />

      <PageHero
        badge={t('hero.badge')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        breadcrumb={[{ label: tn('home'), href: '/' }, { label: tn('whatYouBuild') }]}
      />

      <section className="pb-24">
        <div className="container-z flex flex-col gap-16">
          {builds.map((build) => (
            <article key={build.id} className="flex flex-col gap-6">
              {/* The diagram carries the detail, so it leads and it opens big. */}
              <a
                href={build.image}
                target="_blank"
                rel="noreferrer"
                className="group glass relative block overflow-hidden rounded-glass p-2 transition hover:shadow-glass-lg"
              >
                <Image
                  src={build.image}
                  alt={pick(build.title, locale)}
                  width={build.width}
                  height={build.height}
                  sizes="(max-width: 1024px) 100vw, 960px"
                  className="h-auto w-full rounded-[14px]"
                  priority={build.id === builds[0].id}
                />
                <span className="pointer-events-none absolute bottom-4 end-4 inline-flex items-center gap-1.5 rounded-pill bg-ink/75 px-3 py-1.5 text-[11px] font-medium text-white opacity-0 transition group-hover:opacity-100">
                  <Maximize2 size={13} aria-hidden />
                  {t('enlarge')}
                </span>
              </a>

              <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold leading-snug text-ink sm:text-3xl">
                  {pick(build.title, locale)}
                </h2>

                <p className="max-w-[68ch] text-base leading-relaxed text-navy-medium">
                  {pick(build.lead, locale)}
                </p>

                {build.blocks.map((block, i) => (
                  <Block key={i} block={block} locale={locale} index={stepNumber(build.blocks, i)} />
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

/** Steps number themselves in sequence, ignoring the prose between them. */
function stepNumber(blocks: BuildBlock[], upTo: number): number {
  return blocks.slice(0, upTo + 1).filter((b) => b.kind === 'step').length;
}

function Block({
  block,
  locale,
  index,
}: {
  block: BuildBlock;
  locale: string;
  index: number;
}) {
  if (block.kind === 'text') {
    return (
      <p className="max-w-[68ch] text-[15px] leading-relaxed text-navy-medium">
        {pick(block.text, locale)}
      </p>
    );
  }

  if (block.kind === 'list') {
    return (
      <ul className="flex max-w-[68ch] flex-col gap-2">
        {block.items.map((item, i) => (
          <li
            key={i}
            className="relative ps-5 text-[15px] leading-relaxed text-navy-medium before:absolute before:start-0 before:top-[0.6em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-navy-soft"
          >
            {pick(item, locale)}
          </li>
        ))}
      </ul>
    );
  }

  if (block.kind === 'note') {
    return (
      <p className="glass max-w-[68ch] rounded-glass border-s-4 border-s-navy px-5 py-4 text-[15px] font-medium leading-relaxed text-ink">
        {pick(block.text, locale)}
      </p>
    );
  }

  // A stage in the pipeline — numbered, because the order is how it runs.
  return (
    <div className="flex max-w-[68ch] gap-3.5">
      <span
        aria-hidden
        className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy text-xs font-bold tabular-nums text-white"
      >
        {index}
      </span>
      <div className="min-w-0">
        <p className="text-[15px] font-semibold text-ink">{pick(block.heading, locale)}</p>
        <p className="mt-1 text-[15px] leading-relaxed text-navy-medium">
          {pick(block.text, locale)}
        </p>
      </div>
    </div>
  );
}
