import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Clock, FlaskConical } from 'lucide-react';
import { PageHeader, Chip, StatusPill } from '@/components/learn/ui';
import { tutorialTarget } from '@/data/tutorials/targets';
import { pick, type Status } from '@/data/course/types';
import { course } from '@/data/course/course';

export default async function LabsPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations('learn.labs');
  const tS = await getTranslations('learn.status');

  const statusLabels = {
    completed: tS('completed'),
    'in-progress': tS('inProgress'),
    available: tS('available'),
    locked: tS('locked'),
  } as Record<Status, string>;

  const difficulty = {
    starter: t('difficulty.starter'),
    core: t('difficulty.core'),
    advanced: t('difficulty.advanced'),
  };

  return (
    <div className="flex flex-col gap-8">
      <PageHeader eyebrow={t('eyebrow')} title={t('title')} lead={t('lead')} />

      <section {...tutorialTarget('labs')} className="grid gap-4 md:grid-cols-2">
        {course.labs.map((lab) => {
          const owner = course.modules.find((m) => m.id === lab.moduleId);
          return (
            <article key={lab.id} className="glass glass-sheen flex flex-col gap-3.5 rounded-glass p-5">
              <div className="flex items-start justify-between gap-3">
                <span
                  aria-hidden
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-[13px] bg-navy-ice text-navy"
                >
                  <FlaskConical size={19} />
                </span>
                <StatusPill status={lab.status} labels={statusLabels} />
              </div>

              <div className="flex-1">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-navy-soft">
                  {difficulty[lab.difficulty]}
                  {owner ? ` · ${pick(owner.title, locale)}` : ''}
                </p>
                <h2 className="mt-1 text-base font-semibold leading-snug text-ink">
                  {pick(lab.title, locale)}
                </h2>
                <p className="mt-1.5 text-xs leading-relaxed text-navy-medium">
                  {pick(lab.brief, locale)}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="flex flex-wrap gap-1.5">
                  {lab.stack.map((s) => (
                    <Chip key={s}>{s}</Chip>
                  ))}
                </span>
                <span className="inline-flex items-center gap-1 text-xs tabular-nums text-navy-medium">
                  <Clock size={12} aria-hidden />
                  {lab.minutes} min
                </span>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}
