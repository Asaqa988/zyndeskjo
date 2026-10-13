'use client';

import { useEffect, useState } from 'react';
import { QA_COURSE, QA_COPY } from '@/data/qa-course';

/** "4 days" / "٤ أيام", with the Arabic dual and plural forms. */
function days(n: number, lang: 'en' | 'ar'): string {
  if (lang === 'en') return `${n} day${n === 1 ? '' : 's'}`;
  if (n === 1) return 'يوم واحد';
  if (n === 2) return 'يومين';
  return n <= 10 ? `${n} أيام` : `${n} يوم`;
}

/**
 * Days until the first session, worked out in the visitor's browser after
 * mount: the server's clock and the visitor's disagree, and a chip that shows
 * and then changes on hydration reads as broken. Renders nothing once the
 * course has started, so nobody has to remember to take it down.
 */
export function StartsIn({ lang }: { lang: 'en' | 'ar' }) {
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const ms = new Date(QA_COURSE.startsAt).getTime() - Date.now();
    if (ms <= 0) return setLabel(null);
    const n = Math.floor(ms / 86_400_000);
    setLabel(n === 0 ? QA_COPY.startsToday[lang] : `${QA_COPY.startsIn[lang]} ${days(n, lang)}`);
  }, [lang]);

  if (!label) return null;
  return (
    <span className="inline-flex items-center rounded-pill bg-cyan/15 px-3 py-1 text-xs font-bold text-navy">
      {label}
    </span>
  );
}
