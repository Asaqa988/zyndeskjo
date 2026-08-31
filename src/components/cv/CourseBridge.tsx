'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Icon } from '@/components/ui/Icon';
import { matchAgainstCourse } from '@/lib/courseMatch';
import { pick } from '@/data/course/types';
import type { CvAnalysis } from '@/lib/cvAnalysis';

type SendState = 'idle' | 'sending' | 'sent' | 'error';

/**
 * What to say after the report, if there is anything honest to say.
 *
 * Shown only when the syllabus genuinely covers what the CV was missing — see
 * courseMatch.ts. For the many visitors applying to roles the course has
 * nothing to do with, this renders nothing at all, which is the correct
 * outcome: the tool is useful on its own, and a pitch that does not fit costs
 * more than it earns.
 */
export function CourseBridge({ analysis }: { analysis: CvAnalysis }) {
  const t = useTranslations('pages.cvCheck.bridge');
  const locale = useLocale();
  const match = matchAgainstCourse(analysis);

  const [email, setEmail] = useState('');
  const [state, setState] = useState<SendState>('idle');

  if (!match.worthOffering) return null;

  async function send(e: React.FormEvent) {
    e.preventDefault();
    if (state === 'sending' || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return;

    setState('sending');
    try {
      const res = await fetch('/api/course-info', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, locale, covered: match.covered }),
      });
      setState(res.ok ? 'sent' : 'error');
    } catch {
      setState('error');
    }
  }

  return (
    <div className="glass glass-strong flex flex-col gap-5 rounded-glass border-s-4 border-s-cyan p-6 sm:p-8">
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-bold text-ink">
          {t('title', { count: match.covered.length })}
        </h3>
        <p className="max-w-[68ch] text-[15px] leading-relaxed text-navy-medium">{t('lead')}</p>
      </div>

      <ul className="flex flex-wrap gap-2">
        {match.modules.slice(0, 4).map((m) => (
          <li
            key={m.id}
            className="rounded-pill border border-navy-ice bg-white/60 px-3.5 py-1.5 text-[13px] font-medium text-navy"
          >
            {pick(m.title, locale)}
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/what-you-build"
          className="inline-flex items-center gap-2 rounded-pill bg-navy px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-medium"
        >
          {t('seeCourse')}
          <Icon name={locale === 'ar' ? 'ArrowLeft' : 'ArrowRight'} size={16} />
        </Link>
      </div>

      {/* Asked only now, after the report has already been given away. */}
      {state === 'sent' ? (
        <p className="inline-flex items-center gap-2 text-sm font-medium text-[#1f9d55]">
          <Icon name="CircleCheck" size={16} />
          {t('sent')}
        </p>
      ) : (
        <form onSubmit={send} className="flex flex-col gap-2.5 border-t border-white/50 pt-5">
          <label htmlFor="course-email" className="text-sm font-bold text-ink">
            {t('emailLabel')}
          </label>
          <div className="flex flex-wrap gap-2.5">
            <input
              id="course-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('emailPlaceholder')}
              className="min-w-0 flex-1 rounded-pill border border-navy-ice bg-white/70 px-4 py-2.5 text-sm text-ink outline-none transition placeholder:text-navy-soft focus:border-cyan"
            />
            <button
              type="submit"
              disabled={state === 'sending'}
              className="inline-flex items-center gap-2 rounded-pill border border-navy/20 bg-white/70 px-5 py-2.5 text-sm font-semibold text-navy transition hover:bg-white disabled:opacity-50"
            >
              {state === 'sending' ? (
                <Icon name="LoaderCircle" size={15} className="animate-spin" />
              ) : (
                <Icon name="Mail" size={15} />
              )}
              {t('emailSubmit')}
            </button>
          </div>
          <p className="text-xs text-navy-soft">{t('emailNote')}</p>
          {state === 'error' && (
            <p className="text-sm font-medium text-[#c0392b]">{t('emailError')}</p>
          )}
        </form>
      )}
    </div>
  );
}
