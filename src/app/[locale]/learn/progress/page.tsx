import { setRequestLocale, getTranslations } from 'next-intl/server';
import { CheckCircle2, Clock, Flame, FlaskConical } from 'lucide-react';
import { PageHeader, ProgressBar, StatusPill } from '@/components/learn/ui';
import { tutorialTarget } from '@/data/tutorials/targets';
import { pick, type Status } from '@/data/course/types';
import {
  course,
  progressPercent,
  completedLessons,
  allLessons,
  minutesLearned,
} from '@/data/course/course';

export default async function ProgressPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations('learn.progress');
  const tS = await getTranslations('learn.status');

  const statusLabels = {
    completed: tS('completed'),
    'in-progress': tS('inProgress'),
    available: tS('available'),
    locked: tS('locked'),
  } as Record<Status, string>;

  const hours = Math.floor(minutesLearned / 60);
  const mins = minutesLearned % 60;
  const labsDone = course.labs.filter((l) => l.status === 'completed').length;

  return (
    <div {...tutorialTarget('progress')} className="flex flex-col gap-8">
      <PageHeader eyebrow={t('eyebrow')} title={t('title')} lead={t('lead')} />

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Metric icon={<Flame size={15} />} label={t('overall')} value={`${progressPercent}%`} />
        <Metric
          icon={<CheckCircle2 size={15} />}
          label={t('lessons')}
          value={`${completedLessons}/${allLessons.length}`}
        />
        <Metric
          icon={<FlaskConical size={15} />}
          label={t('labs')}
          value={`${labsDone}/${course.labs.length}`}
        />
        <Metric
          icon={<Clock size={15} />}
          label={t('time')}
          value={hours > 0 ? `${hours}h ${mins}m` : `${mins}m`}
        />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-base font-semibold text-ink">{t('byModule')}</h2>
        <ul className="flex flex-col gap-2.5">
          {course.modules.map((m) => {
            const done = m.lessons.filter((l) => l.status === 'completed').length;
            const pct = Math.round((done / m.lessons.length) * 100);
            return (
              <li key={m.id} className="glass rounded-[16px] px-5 py-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-sm font-medium text-ink">{pick(m.title, locale)}</span>
                  <span className="flex items-center gap-3">
                    <StatusPill status={m.status} labels={statusLabels} />
                    <span className="text-xs font-semibold tabular-nums text-navy">{pct}%</span>
                  </span>
                </div>
                <ProgressBar value={pct} className="mt-3" />
                <p className="mt-2 text-xs text-navy-medium">
                  {t('lessonsCount', { done, total: m.lessons.length })}
                </p>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

function Metric({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="glass rounded-[16px] px-5 py-4">
      <p className="flex items-center gap-2 text-xs text-navy-medium">
        <span className="text-navy-soft">{icon}</span>
        {label}
      </p>
      <p className="mt-2 text-2xl font-bold tabular-nums tracking-tight text-ink">{value}</p>
    </div>
  );
}
