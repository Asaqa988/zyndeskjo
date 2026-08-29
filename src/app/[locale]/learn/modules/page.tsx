import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Icon } from '@/components/ui/Icon';
import { PageHeader, Chip, StatusPill, ProgressBar } from '@/components/learn/ui';
import { tutorialTarget } from '@/data/tutorials/targets';
import { pick, type Status } from '@/data/course/types';
import { course } from '@/data/course/course';

export default async function ModulesPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations('learn.modules');
  const tS = await getTranslations('learn.status');

  const statusLabels = {
    completed: tS('completed'),
    'in-progress': tS('inProgress'),
    available: tS('available'),
    locked: tS('locked'),
  } as Record<Status, string>;

  return (
    <div className="flex flex-col gap-8">
      <PageHeader eyebrow={t('eyebrow')} title={t('title')} lead={t('lead')} />

      <section {...tutorialTarget('modules-grid')} className="grid gap-4 md:grid-cols-2">
        {course.modules.map((m) => {
          const done = m.lessons.filter((l) => l.status === 'completed').length;
          const pct = Math.round((done / m.lessons.length) * 100);
          return (
            <Link
              key={m.id}
              href={`/learn/modules/${m.slug}`}
              className="glass glass-sheen flex flex-col gap-4 rounded-glass p-5 transition hover:bg-white/75"
            >
              <div className="flex items-start justify-between gap-3">
                <span
                  aria-hidden
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-[13px] bg-navy-ice text-navy"
                >
                  <Icon name={m.icon} size={19} />
                </span>
                <StatusPill status={m.status} labels={statusLabels} />
              </div>

              <div className="flex-1">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-navy-soft">
                  {t('moduleN', { n: m.order })}
                </p>
                <h2 className="mt-1 text-base font-semibold leading-snug text-ink">
                  {pick(m.title, locale)}
                </h2>
                <p className="mt-1.5 text-xs leading-relaxed text-navy-medium">
                  {pick(m.summary, locale)}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {m.stack.map((s) => (
                  <Chip key={s}>{s}</Chip>
                ))}
              </div>

              <div>
                <div className="mb-1.5 flex items-baseline justify-between text-xs text-navy-medium">
                  <span>{t('lessonsCount', { done, total: m.lessons.length })}</span>
                  <span className="tabular-nums">{pct}%</span>
                </div>
                <ProgressBar value={pct} />
              </div>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
