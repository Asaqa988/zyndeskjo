import { COURSE } from '@/data/course-facts';

/**
 * How full the cohort is, from the registrations that actually arrived.
 *
 * Honest scarcity or none: the number moves because somebody registered, and
 * if nobody has, it says nothing rather than inventing urgency. A course with
 * a real cap does not need help.
 *
 * In memory, like the lecture wall. A restart forgets the count, which is a
 * real limitation — it is a display, not a ledger, and the registrations
 * themselves are safe in his inbox either way.
 */

let registered = 0;

export function countRegistration(): void {
  registered += 1;
}

export interface Seats {
  registered: number;
  remaining: number;
  /**
   * Which fact to lead with.
   *
   * Early on, "twelve people registered today" is social proof and "eighteen
   * seats left" is a half-empty room. Once it is genuinely tight the reverse
   * is true. Below the threshold, scarcity; above it, momentum; at zero,
   * silence — an empty count shown to the first visitor of the day helps
   * nobody.
   */
  show: 'none' | 'momentum' | 'scarcity';
}

/** Under this many seats left, the shortage is the more useful fact. */
const SCARCITY_AT = 15;

export function readSeats(): Seats {
  const remaining = Math.max(0, COURSE.seats - registered);
  const show = registered === 0 ? 'none' : remaining <= SCARCITY_AT ? 'scarcity' : 'momentum';
  return { registered, remaining, show };
}
