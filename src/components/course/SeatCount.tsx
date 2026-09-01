'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Icon } from '@/components/ui/Icon';

interface Seats {
  registered: number;
  remaining: number;
  show: 'none' | 'momentum' | 'scarcity';
}

/**
 * How full the cohort is — when that is worth saying.
 *
 * Renders nothing until it has a real number, and nothing at all if nobody has
 * registered yet. The first visitor of the day should not be told the room is
 * empty, and no visitor should be told a number we made up.
 */
export function SeatCount() {
  const t = useTranslations('pages.register.seats');
  const [seats, setSeats] = useState<Seats | null>(null);

  useEffect(() => {
    let alive = true;
    fetch('/api/seats', { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => alive && setSeats(d))
      .catch(() => {
        /* silence is the right failure here — it is a nice-to-have */
      });
    return () => {
      alive = false;
    };
  }, []);

  if (!seats || seats.show === 'none') return null;

  const scarce = seats.show === 'scarcity';

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-pill px-4 py-2 text-sm font-semibold ${
        scarce ? 'bg-[#8a2b1f] text-white' : 'bg-navy-ice text-navy'
      }`}
    >
      <Icon name={scarce ? 'Users' : 'TrendingUp'} size={15} />
      {scarce ? t('remaining', { count: seats.remaining }) : t('registered', { count: seats.registered })}
    </span>
  );
}
