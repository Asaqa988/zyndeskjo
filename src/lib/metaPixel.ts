/**
 * Meta (Facebook) Pixel helpers.
 * The pixel itself is injected by <MetaPixel /> (see components/analytics).
 * These helpers let any client component fire standard/custom events safely —
 * they no-op when the pixel isn't configured or hasn't loaded yet.
 */

export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/** Fire a Meta Pixel event. Safe to call anywhere — no-ops if the pixel is absent. */
export function fbqTrack(event: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') return;
  window.fbq('track', event, params);
}

/** Standard "Lead" conversion — call on a successful contact/lead form submit. */
export function trackLead(params?: Record<string, unknown>) {
  fbqTrack('Lead', params);
}
