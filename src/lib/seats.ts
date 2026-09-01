import { COURSE } from '@/data/course-facts';

/**
 * How full the cohort is.
 *
 * Honest or absent: the number only moves because somebody registered, and if
 * there is nothing true to say it says nothing. A course with a real cap does
 * not need invented urgency.
 *
 * SEATS_TAKEN is the count that already happened — the registrations sitting
 * in the inbox and the sheet before this container started. Live registrations
 * add to it. Without that baseline the figure would be in memory alone, and a
 * restart mid-lecture would drop "12 registered" to nothing in front of a
 * room, which is worse than never showing it. Update the variable as real
 * registrations come in; never above the truth.
 */

const baseline = Math.max(0, Number(process.env.SEATS_TAKEN ?? 0) || 0);

let sinceStart = 0;

export function countRegistration(): void {
  sinceStart += 1;
}

export interface Seats {
  registered: number;
  remaining: number;
  /**
   * Which fact to lead with.
   *
   * Early, "twelve have registered" is momentum and "eighteen seats left" is a
   * half-empty room. Once it is genuinely tight the reverse is true. At zero,
   * neither — silence beats announcing an empty room.
   */
  show: 'none' | 'momentum' | 'scarcity';
}

/** Under this many left, the shortage is the more useful fact. */
const SCARCITY_AT = 15;

export function readSeats(): Seats {
  const registered = baseline + sinceStart;
  const remaining = Math.max(0, COURSE.seats - registered);
  const show = registered === 0 ? 'none' : remaining <= SCARCITY_AT ? 'scarcity' : 'momentum';
  return { registered, remaining, show };
}
