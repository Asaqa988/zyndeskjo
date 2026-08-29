import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Clock, Layers, FlaskConical, FolderKanban, ArrowRight } from 'lucide-react';
import { Icon } from '@/components/ui/Icon';
import { PageHeader, Chip, StatusPill, ProgressBar } from '@/components/learn/ui';
import { tutorialTarget } from '@/data/tutorials/targets';
import { pick, type Status } from '@/data/course/types';
import { course, progressPercent, allLessons, completedLessons } from '@/data/course/course';

export default async function CourseOverviewPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations('learn.course');
  const tS = await getTranslations('learn.status');

  const statusLabels = {
    completed: tS('completed'),
    'in-progress': tS('inProgress'),
    available: tS('available'),
    locked: tS('locked'),
  } as Record<Status, string>;

  const hours = Math.round(course.totalMinutes / 60);

  return (
    <div {...tutorialTarget('course-overview')} className="flex flex-col gap-8">
      <PageHeader
        eyebrow={t('eyebrow')}
        title={pick(course.title, locale)}
        lead={pick(course.subtitle, locale)}
      />

      {/* What the course is, in numbers. */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Fact icon={<Layers size={15} />} label={t('facts.modules')} value={`${course.modules.length}`} />
        <Fact icon={<Clock size={15} />} label={t('facts.hours')} value={`${hours}h`} />
        <Fact icon={<FlaskConical size={15} />} label={t('facts.labs')} value={`${course.labs.length}`} />
        <Fact
          icon={<FolderKanban size={15} />}
          label={t('facts.projects')}
          value={`${course.projects.length}`}
        />
      </section>

      {/* Where the student stands. */}
      <section className="glass glass-strong rounded-glass p-6">
        <div className="flex items-baseline justify-between">
          <h2 className="text-base font-semibold text-ink">{t('yourProgress')}</h2>
          <span className="text-sm font-semibold tabular-nums text-navy">{progressPercent}%</span>
        </div>
        <ProgressBar value={progressPercent} className="mt-3" />
        <p className="mt-3 text-xs text-navy-medium">
          {t('lessonsDone', { done: completedLessons, total: allLessons.length })}
        </p>
      </section>

      {/* The syllabus. */}
      <section className="flex flex-col gap-3">
        <h2 className="text-base font-semibold text-ink">{t('syllabus')}</h2>

        <ol className="flex flex-col gap-2.5">
          {course.modules.map((m) => {
            const done = m.lessons.filter((l) => l.status === 'completed').length;
            const mins = m.lessons.reduce((s, l) => s + l.minutes, 0);
            return (
              <li key={m.id}>
                <Link
                  href={`/learn/modules/${m.slug}`}
                  className="glass group flex flex-col gap-3 rounded-[16px] p-5 transition hover:bg-white/75 sm:flex-row sm:items-center sm:gap-5"
                >
                  <span
                    aria-hidden
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-[13px] bg-navy-ice text-navy"
                  >
                    <Icon name={m.icon} size={19} />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-navy-soft">
                        {t('moduleN', { n: m.order })}
                      </span>
                      <StatusPill status={m.status} labels={statusLabels} />
                    </span>
                    <span className="mt-1 block text-sm font-semibold text-ink">
                      {pick(m.title, locale)}
                    </span>
                    <span className="mt-1 block max-w-[60ch] text-xs leading-relaxed text-navy-medium">
                      {pick(m.summary, locale)}
                    </span>
                    <span className="mt-2.5 flex flex-wrap gap-1.5">
                      {m.stack.map((s) => (
                        <Chip key={s}>{s}</Chip>
                      ))}
                    </span>
                  </span>

                  <span className="flex shrink-0 items-center gap-4 sm:flex-col sm:items-end sm:gap-1.5">
                    <span className="text-xs tabular-nums text-navy-medium">
                      {t('lessonsCount', { done, total: m.lessons.length })}
                    </span>
                    <span className="text-xs tabular-nums text-navy-soft">{mins} min</span>
                    <ArrowRight
                      size={15}
                      aria-hidden
                      className="text-navy-soft transition group-hover:text-navy rtl:rotate-180"
                    />
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
}

function Fact({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="glass rounded-[16px] px-5 py-4">
      <p className="flex items-center gap-2 text-xs text-navy-medium">
        <span className="text-navy-soft">{icon}</span>
        {label}
      </p>
      <p className="mt-1.5 text-xl font-bold tabular-nums text-ink">{value}</p>
    </div>
  );
}
