import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Award, Lock } from 'lucide-react';
import { PageHeader, ProgressBar } from '@/components/learn/ui';
import { tutorialTarget } from '@/data/tutorials/targets';
import { pick } from '@/data/course/types';
import { course, progressPercent } from '@/data/course/course';

export default async function CertificatePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations('learn.certificate');
  const earned = progressPercent >= 100;

  return (
    <div {...tutorialTarget('certificate')} className="flex flex-col gap-8">
      <PageHeader eyebrow={t('eyebrow')} title={t('title')} lead={t('lead')} />

      <section className="glass glass-strong glass-sheen relative overflow-hidden rounded-glass p-8 sm:p-12">
        <div className="flex flex-col items-center gap-5 text-center">
          <span
            aria-hidden
            className={`grid h-16 w-16 place-items-center rounded-[18px] ${
              earned ? 'bg-navy text-white' : 'bg-navy-ice text-navy-soft'
            }`}
          >
            {earned ? <Award size={28} /> : <Lock size={26} />}
          </span>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-navy-medium">
              {t('awardedFor')}
            </p>
            <h2 className="mt-2 text-xl font-bold leading-snug text-ink sm:text-2xl">
              {pick(course.title, locale)}
            </h2>
            <p className="mt-1.5 text-sm text-navy-medium">
              {t('instructor')} · {pick(course.instructor, locale)}
            </p>
          </div>

          <div className="w-full max-w-sm">
            <div className="mb-2 flex items-baseline justify-between text-xs text-navy-medium">
              <span>{earned ? t('complete') : t('toUnlock')}</span>
              <span className="tabular-nums">{progressPercent}%</span>
            </div>
            <ProgressBar value={progressPercent} />
          </div>

          <p className="max-w-[52ch] text-sm leading-relaxed text-navy-medium">
            {earned ? t('earnedNote') : t('lockedNote')}
          </p>
        </div>
      </section>
    </div>
  );
}
