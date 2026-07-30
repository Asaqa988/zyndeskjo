/**
 * Google Analytics 4 (gtag.js) helpers.
 * The tag itself is injected by <GoogleAnalytics /> (components/analytics).
 * These helpers fire events safely — they no-op when GA isn't configured/loaded.
 */

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/** Fire a GA4 event. Safe to call anywhere — no-ops if GA is absent. */
export function gaEvent(action: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', action, params);
}

/** GA4 recommended "generate_lead" event — call on a successful lead form submit. */
export function gaLead(params?: Record<string, unknown>) {
  gaEvent('generate_lead', params);
}
