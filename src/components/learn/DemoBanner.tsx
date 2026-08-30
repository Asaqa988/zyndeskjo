'use client';

import { useLocale, useTranslations } from 'next-intl';
import { ArrowLeft, ArrowRight, Info } from 'lucide-react';
import { Link } from '@/i18n/navigation';

/**
 * The strip across the top of the student platform.
 *
 * It carries two things that both have to be visible everywhere, which is why
 * they share one bar rather than living in the sidebar:
 *
 * The notice, because the platform is dressed as a logged-in student's — it
 * opens on "welcome back" and a progress bar partway through Module 3. That
 * reads as someone's real account, and a visitor evaluating the course would
 * reasonably wonder whose 15% they are looking at. Saying it is an example
 * costs one line and removes the question.
 *
 * The way out, because the marketing header is hidden inside /learn and the
 * sidebar only renders from `lg` up. On a phone there was no route back to the
 * site at all — you arrived and the browser's back button was the only exit.
 */
export function DemoBanner() {
  const t = useTranslations('learn.banner');
  const locale = useLocale();

  // "Back" points the way the reader came from, which flips with the script.
  const BackArrow = locale === 'ar' ? ArrowRight : ArrowLeft;

  return (
    <div className="glass mb-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 rounded-glass px-4 py-3">
      <Link
        href="/"
        className="inline-flex shrink-0 items-center gap-2 rounded-pill px-3 py-1.5 text-sm font-semibold text-navy transition hover:bg-white/70"
      >
        <BackArrow size={16} aria-hidden />
        {t('home')}
      </Link>

      <p className="inline-flex items-center gap-2 text-xs leading-relaxed text-navy-medium">
        <Info size={15} aria-hidden className="shrink-0 text-navy-soft" />
        {t('notice')}
      </p>
    </div>
  );
}
