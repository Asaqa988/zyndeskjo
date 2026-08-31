'use client';

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Icon } from '@/components/ui/Icon';
import { COURSE } from '@/data/course-facts';

type State = 'idle' | 'sending' | 'sent' | 'error';

/**
 * The one thing this page is for.
 *
 * Repeated at the top and the bottom, because a visitor who is convinced by
 * the first screen should not have to scroll to act, and one who is convinced
 * by the last should not have to scroll back.
 */
export function CourseInfoForm({ id }: { id?: string }) {
  const t = useTranslations('pages.courseInfo.form');
  const locale = useLocale();
  const [email, setEmail] = useState('');
  const [state, setState] = useState<State>('idle');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (state === 'sending' || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return;

    setState('sending');
    try {
      const res = await fetch('/api/course-info', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, locale, source: 'course-info' }),
      });
      setState(res.ok ? 'sent' : 'error');
    } catch {
      setState('error');
    }
  }

  if (state === 'sent') {
    return (
      <div className="glass glass-strong flex items-start gap-3 rounded-glass border-s-4 border-s-[#1f9d55] p-6">
        <Icon name="CircleCheck" size={22} className="mt-0.5 shrink-0 text-[#1f9d55]" />
        <div className="flex flex-col gap-1">
          <p className="font-bold text-ink">{t('sentTitle')}</p>
          <p className="text-sm leading-relaxed text-navy-medium">{t('sentBody', { email })}</p>
        </div>
      </div>
    );
  }

  return (
    <form
      id={id}
      onSubmit={submit}
      className="glass glass-strong flex flex-col gap-3 rounded-glass p-6 sm:p-7"
    >
      <label htmlFor={`${id}-email`} className="text-base font-bold text-ink">
        {t('label')}
      </label>

      <div className="flex flex-col gap-2.5 sm:flex-row">
        <input
          id={`${id}-email`}
          type="email"
          required
          dir="ltr"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('placeholder')}
          className="min-w-0 flex-1 rounded-pill border border-navy-ice bg-white/80 px-5 py-3 text-sm text-ink outline-none transition placeholder:text-navy-soft focus:border-cyan"
        />
        <button
          type="submit"
          disabled={state === 'sending'}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-pill bg-navy px-6 py-3 text-sm font-semibold text-white transition hover:bg-navy-medium disabled:opacity-50"
        >
          {state === 'sending' ? (
            <Icon name="LoaderCircle" size={16} className="animate-spin" />
          ) : (
            <Icon name="Send" size={16} />
          )}
          {t('submit')}
        </button>
      </div>

      <p className="text-xs leading-relaxed text-navy-soft">{t('note')}</p>

      {state === 'error' && (
        <p className="inline-flex items-center gap-2 text-sm font-medium text-[#c0392b]">
          <Icon name="TriangleAlert" size={15} />
          {t('error')}
        </p>
      )}
    </form>
  );
}

/**
 * Days until the first session.
 *
 * Rendered only once mounted: the server and the visitor's clock disagree, and
 * a number that changes on hydration is worse than one that arrives a beat
 * late. Past the start date it says nothing rather than counting backwards.
 */
export function Countdown() {
  const t = useTranslations('pages.courseInfo');
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    const ms = new Date(COURSE.startsAt).getTime() - Date.now();
    setDays(Math.max(0, Math.ceil(ms / 86_400_000)));
  }, []);

  if (days === null || days === 0) return null;

  return (
    <span className="inline-flex items-center gap-2 rounded-pill bg-navy px-4 py-2 text-sm font-semibold text-white">
      <Icon name="CalendarClock" size={16} />
      {t('startsIn', { days })}
    </span>
  );
}
