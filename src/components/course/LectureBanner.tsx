'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Icon } from '@/components/ui/Icon';
import { LECTURE } from '@/data/course-facts';

/**
 * The free session, announced until it is over.
 *
 * It renders nothing once the lecture has ended, which is the point: the ads
 * are already out, and a banner still advertising last night's session is
 * worse than no banner. Nobody has to remember to take it down.
 *
 * Client-side and after mount, because the server's clock and the visitor's
 * disagree, and a banner that appears and then vanishes on hydration reads as
 * a broken page.
 */
export function LectureBanner() {
  const t = useTranslations('lecture');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(Date.now() < new Date(LECTURE.endsAt).getTime());
  }, []);

  if (!visible) return null;

  return (
    <div className="glass glass-strong flex flex-col gap-4 rounded-glass border-s-4 border-s-cyan p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-6">
        <div className="flex items-start gap-3.5">
          <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-navy-ice text-navy">
            <Icon name="CalendarClock" size={20} />
          </span>
          <div className="flex flex-col gap-1">
            <p className="text-[15px] font-bold leading-snug text-ink sm:text-base">
              {t('title')}
            </p>
            <p className="text-[13.5px] leading-relaxed text-navy-medium">{t('body')}</p>
          </div>
        </div>

        <a
          href={LECTURE.groupUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-pill bg-navy px-5 py-3 text-sm font-bold text-white transition hover:bg-navy-medium"
        >
          <Icon name="MessageCircle" size={16} />
          {t('cta')}
        </a>
    </div>
  );
}
