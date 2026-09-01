'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Icon } from '@/components/ui/Icon';

interface Entry {
  job: string;
  category: string;
  title: string;
  payoff: string;
  tools: string[];
  at: number;
}

interface Wall {
  total: number;
  breakdown: { category: string; count: number }[];
  recent: Entry[];
}

/**
 * The screen behind the speaker.
 *
 * Read from the back of a room on a projector, so the total is enormous and
 * everything else is secondary. It polls rather than streams: a lecture hall
 * on hotel wifi is the wrong place to depend on a socket staying open, and two
 * seconds of lag is invisible when the number is climbing anyway.
 */
export function LiveWall() {
  const t = useTranslations('pages.examples.live');
  const [wall, setWall] = useState<Wall>({ total: 0, breakdown: [], recent: [] });
  const [stale, setStale] = useState(false);

  useEffect(() => {
    let alive = true;

    async function pull() {
      try {
        const res = await fetch('/api/examples/wall', { cache: 'no-store' });
        if (!res.ok) throw new Error(String(res.status));
        const data = (await res.json()) as Wall;
        if (alive) {
          setWall(data);
          setStale(false);
        }
      } catch {
        // Keep showing the last good numbers; a blank screen mid-talk is worse
        // than numbers a few seconds old, but say which it is.
        if (alive) setStale(true);
      }
    }

    pull();
    const id = setInterval(pull, 2500);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div className="glass glass-strong flex flex-col items-center gap-2 rounded-glass px-6 py-10">
        <span className="text-[clamp(4rem,14vw,9rem)] font-bold leading-none tabular-nums text-ink">
          {wall.total}
        </span>
        <span className="text-lg font-semibold text-navy-medium sm:text-xl">
          {t('counter')}
        </span>
        {stale && (
          <span className="inline-flex items-center gap-1.5 pt-2 text-xs font-medium text-navy-soft">
            <Icon name="LoaderCircle" size={13} className="animate-spin" />
            {t('reconnecting')}
          </span>
        )}
      </div>

      {wall.breakdown.length > 0 && (
        <ul className="flex flex-wrap justify-center gap-2.5">
          {wall.breakdown.map((b) => (
            <li
              key={b.category}
              className="glass inline-flex items-center gap-2.5 rounded-pill px-5 py-2.5"
            >
              <span className="text-xl font-bold tabular-nums text-ink">{b.count}</span>
              <span className="text-sm font-medium text-navy-medium">{b.category}</span>
            </li>
          ))}
        </ul>
      )}

      {wall.recent.length === 0 ? (
        <p className="text-center text-lg leading-relaxed text-navy-medium">{t('waiting')}</p>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {wall.recent.map((e) => (
            <li key={`${e.at}-${e.title}`} className="glass flex flex-col gap-2 rounded-glass p-5">
              <span className="inline-flex w-fit rounded-pill bg-navy-ice px-3 py-1 text-[12px] font-semibold text-navy">
                {e.job}
              </span>
              <span className="text-[15px] font-bold leading-snug text-ink">{e.title}</span>
              {e.payoff && (
                <span className="text-[13.5px] leading-relaxed text-navy-medium">{e.payoff}</span>
              )}
              <span className="text-[13px] leading-relaxed text-navy-soft">
                {e.tools.join(' · ')}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
