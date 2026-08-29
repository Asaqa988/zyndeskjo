import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Trophy, FolderKanban } from 'lucide-react';
import { PageHeader, Chip, StatusPill } from '@/components/learn/ui';
import { tutorialTarget } from '@/data/tutorials/targets';
import { pick, type Status } from '@/data/course/types';
import { course } from '@/data/course/course';

export default async function ProjectsPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations('learn.projects');
  const tS = await getTranslations('learn.status');

  const statusLabels = {
    completed: tS('completed'),
    'in-progress': tS('inProgress'),
    available: tS('available'),
    locked: tS('locked'),
  } as Record<Status, string>;

  const regular = course.projects.filter((p) => !p.capstone);
  const capstone = course.projects.find((p) => p.capstone);

  return (
    <div className="flex flex-col gap-8">
      <PageHeader eyebrow={t('eyebrow')} title={t('title')} lead={t('lead')} />

      <section {...tutorialTarget('projects')} className="grid gap-4 md:grid-cols-2">
        {regular.map((p) => (
          <article key={p.id} className="glass flex flex-col gap-3.5 rounded-glass p-5">
            <div className="flex items-start justify-between gap-3">
              <span
                aria-hidden
                className="grid h-11 w-11 shrink-0 place-items-center rounded-[13px] bg-navy-ice text-navy"
              >
                <FolderKanban size={19} />
              </span>
              <StatusPill status={p.status} labels={statusLabels} />
            </div>
            <div className="flex-1">
              <h2 className="text-base font-semibold leading-snug text-ink">
                {pick(p.title, locale)}
              </h2>
              <p className="mt-1.5 text-xs leading-relaxed text-navy-medium">
                {pick(p.brief, locale)}
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {p.stack.map((s) => (
                <Chip key={s}>{s}</Chip>
              ))}
            </div>
          </article>
        ))}
      </section>

      {/* The capstone closes the course, so it gets the weight to match. */}
      {capstone && (
        <section
          {...tutorialTarget('capstone')}
          className="glass glass-strong glass-sheen flex flex-col gap-4 rounded-glass p-6 sm:p-8"
        >
          <div className="flex items-start justify-between gap-4">
            <span
              aria-hidden
              className="grid h-14 w-14 shrink-0 place-items-center rounded-[16px] bg-navy text-white"
            >
              <Trophy size={24} />
            </span>
            <StatusPill status={capstone.status} labels={statusLabels} />
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-medium">
              {t('capstoneLabel')}
            </p>
            <h2 className="mt-1.5 text-xl font-bold leading-snug text-ink">
              {pick(capstone.title, locale)}
            </h2>
            <p className="mt-2 max-w-[62ch] text-sm leading-relaxed text-navy-medium">
              {pick(capstone.brief, locale)}
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {capstone.stack.map((s) => (
              <Chip key={s}>{s}</Chip>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
