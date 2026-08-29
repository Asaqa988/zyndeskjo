import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Play, Clock, Flame, CheckCircle2, ArrowRight, Lock } from 'lucide-react';
import { tutorialTarget } from '@/data/tutorials/targets';
import { pick } from '@/data/course/types';
import {
  course,
  progressPercent,
  completedLessons,
  allLessons,
  currentLesson,
  currentModule,
  minutesLearned,
} from '@/data/course/course';

export default async function DashboardPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations('learn.dashboard');

  const hours = Math.floor(minutesLearned / 60);
  const mins = minutesLearned % 60;

  /** The next few things to do, whatever module they sit in. */
  const upNext = allLessons
    .filter((l) => l.status === 'available' || l.status === 'in-progress')
    .slice(0, 3);

  return (
    <div {...tutorialTarget('student-dashboard')} className="flex flex-col gap-8">
      <header className="flex flex-col gap-1.5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-navy-medium">
          {t('eyebrow')}
        </p>
        <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">{t('greeting')}</h1>
        <p className="max-w-[62ch] text-sm leading-relaxed text-navy-medium">
          {pick(course.subtitle, locale)}
        </p>
      </header>

      {/* Continue — the single most important control on the page. */}
      <section
        {...tutorialTarget('continue-learning')}
        className="glass glass-strong glass-sheen overflow-hidden rounded-glass"
      >
        <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-medium">
              {t('continueLabel')} · {t('moduleN', { n: currentModule.order })}
            </p>
            <h2 className="mt-2 text-lg font-semibold leading-snug text-ink sm:text-xl">
              {pick(currentLesson.title, locale)}
            </h2>
            <p className="mt-1.5 flex items-center gap-3 text-xs text-navy-medium">
              <span className="inline-flex items-center gap-1.5">
                <Clock size={13} aria-hidden />
                {t('minutes', { n: currentLesson.minutes })}
              </span>
              <span aria-hidden className="text-navy-soft">
                |
              </span>
              <span className="truncate">{pick(currentModule.title, locale)}</span>
            </p>
          </div>

          <Link
            href={`/learn/modules/${currentModule.slug}`}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-pill bg-navy px-5 py-3 text-sm font-semibold text-white shadow-glass transition hover:bg-navy-medium"
          >
            <Play size={16} aria-hidden fill="currentColor" />
            {t('resume')}
          </Link>
        </div>
      </section>

      {/* At-a-glance numbers. */}
      <section {...tutorialTarget('progress-summary')} className="grid gap-4 sm:grid-cols-3">
        <Stat
          icon={<CheckCircle2 size={16} aria-hidden />}
          label={t('stats.lessons')}
          value={`${completedLessons}/${allLessons.length}`}
        />
        <Stat
          icon={<Clock size={16} aria-hidden />}
          label={t('stats.time')}
          value={hours > 0 ? `${hours}h ${mins}m` : `${mins}m`}
        />
        <Stat
          icon={<Flame size={16} aria-hidden />}
          label={t('stats.complete')}
          value={`${progressPercent}%`}
          bar={progressPercent}
        />
      </section>

      {/* What to do next. */}
      <section {...tutorialTarget('next-up')} className="flex flex-col gap-3">
        <div className="flex items-baseline justify-between">
          <h2 className="text-base font-semibold text-ink">{t('upNext')}</h2>
          <Link
            href="/learn/modules"
            className="inline-flex items-center gap-1 text-xs font-medium text-navy-medium transition hover:text-navy"
          >
            {t('allModules')}
            <ArrowRight size={13} aria-hidden className="rtl:rotate-180" />
          </Link>
        </div>

        <ul className="flex flex-col gap-2">
          {upNext.map((lesson) => {
            const owner = course.modules.find((m) => m.lessons.some((l) => l.id === lesson.id));
            const locked = lesson.status === 'locked';
            return (
              <li key={lesson.id}>
                <Link
                  href={`/learn/modules/${owner?.slug ?? ''}`}
                  className="glass flex items-center gap-4 rounded-[16px] px-4 py-3.5 transition hover:bg-white/75"
                >
                  <span
                    aria-hidden
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-[12px] ${
                      lesson.status === 'in-progress'
                        ? 'bg-navy text-white'
                        : 'bg-navy-ice text-navy-medium'
                    }`}
                  >
                    {locked ? <Lock size={15} /> : <Play size={15} />}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium text-ink">
                      {pick(lesson.title, locale)}
                    </span>
                    <span className="block truncate text-xs text-navy-medium">
                      {owner ? pick(owner.title, locale) : ''}
                    </span>
                  </span>

                  <span className="shrink-0 text-xs tabular-nums text-navy-medium">
                    {t('minutes', { n: lesson.minutes })}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
  bar,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  bar?: number;
}) {
  return (
    <div className="glass rounded-[16px] px-5 py-4">
      <p className="flex items-center gap-2 text-xs text-navy-medium">
        <span className="text-navy-soft">{icon}</span>
        {label}
      </p>
      <p className="mt-2 text-2xl font-bold tabular-nums tracking-tight text-ink">{value}</p>
      {bar !== undefined && (
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-navy-ice">
          <div className="h-full rounded-full bg-navy" style={{ width: `${bar}%` }} />
        </div>
      )}
    </div>
  );
}
