import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import {
  ArrowLeft,
  Clock,
  Video,
  FileText,
  FlaskConical,
  HelpCircle,
  FolderKanban,
  type LucideIcon,
} from 'lucide-react';
import { Icon } from '@/components/ui/Icon';
import { PageHeader, Chip, StatusPill, ProgressBar } from '@/components/learn/ui';
import { tutorialTarget } from '@/data/tutorials/targets';
import { pick, type Status, type LessonKind } from '@/data/course/types';
import { course } from '@/data/course/course';

export function generateStaticParams() {
  return course.modules.map((m) => ({ slug: m.slug }));
}

const kindIcon: Record<LessonKind, LucideIcon> = {
  video: Video,
  reading: FileText,
  lab: FlaskConical,
  quiz: HelpCircle,
  project: FolderKanban,
};

export default async function ModuleLessonsPage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  setRequestLocale(locale);
  const courseModule = course.modules.find((m) => m.slug === slug);
  if (!courseModule) notFound();

  const t = await getTranslations('learn.lessons');
  const tS = await getTranslations('learn.status');

  const statusLabels = {
    completed: tS('completed'),
    'in-progress': tS('inProgress'),
    available: tS('available'),
    locked: tS('locked'),
  } as Record<Status, string>;

  const done = courseModule.lessons.filter((l) => l.status === 'completed').length;
  const pct = Math.round((done / courseModule.lessons.length) * 100);

  return (
    <div className="flex flex-col gap-8">
      <Link
        href="/learn/modules"
        className="inline-flex w-fit items-center gap-1.5 text-xs font-medium text-navy-medium transition hover:text-navy"
      >
        <ArrowLeft size={14} aria-hidden className="rtl:rotate-180" />
        {t('backToModules')}
      </Link>

      <PageHeader
        eyebrow={t('moduleN', { n: courseModule.order })}
        title={pick(courseModule.title, locale)}
        lead={pick(courseModule.summary, locale)}
        aside={
          <span
            aria-hidden
            className="grid h-14 w-14 shrink-0 place-items-center rounded-[16px] bg-navy-ice text-navy"
          >
            <Icon name={courseModule.icon} size={24} />
          </span>
        }
      />

      <div className="flex flex-wrap gap-1.5">
        {courseModule.stack.map((s) => (
          <Chip key={s}>{s}</Chip>
        ))}
      </div>

      <section className="glass rounded-[16px] p-5">
        <div className="mb-2 flex items-baseline justify-between text-sm">
          <span className="font-medium text-ink">{t('moduleProgress')}</span>
          <span className="tabular-nums text-navy">{pct}%</span>
        </div>
        <ProgressBar value={pct} />
      </section>

      <section {...tutorialTarget('lesson-list')} className="flex flex-col gap-3">
        <h2 className="text-base font-semibold text-ink">{t('title')}</h2>

        <ol className="flex flex-col gap-2">
          {courseModule.lessons.map((lesson, i) => {
            const KindIcon = kindIcon[lesson.kind];
            return (
              <li
                key={lesson.id}
                className="glass flex items-center gap-4 rounded-[16px] px-4 py-3.5"
              >
                <span className="w-6 shrink-0 text-xs font-semibold tabular-nums text-navy-soft">
                  {String(i + 1).padStart(2, '0')}
                </span>

                <span
                  aria-hidden
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-[12px] bg-navy-ice text-navy"
                >
                  <KindIcon size={15} />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium text-ink">
                    {pick(lesson.title, locale)}
                  </span>
                  <span className="mt-0.5 flex items-center gap-2 text-xs text-navy-medium">
                    <span>{t(`kind.${lesson.kind}`)}</span>
                    <span aria-hidden className="text-navy-soft">|</span>
                    <span className="inline-flex items-center gap-1 tabular-nums">
                      <Clock size={11} aria-hidden />
                      {lesson.minutes} min
                    </span>
                  </span>
                </span>

                <StatusPill status={lesson.status} labels={statusLabels} />
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
}
