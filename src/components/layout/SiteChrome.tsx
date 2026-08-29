'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Hides the marketing shell — navbar, footer, WhatsApp button, assistant —
 * inside the student platform.
 *
 * /learn is a product, not a page on the site: it has its own rail, its own
 * dark surface and its own idea of navigation, so the public chrome would both
 * look wrong and get in the tutorial's way.
 *
 * Done by pathname rather than by moving every marketing page into a route
 * group. That refactor is the tidier long-term shape, but it touches thirteen
 * route folders for a result the visitor cannot tell apart from this.
 */
export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const inPlatform = /^\/(en|ar)\/learn(\/|$)/.test(pathname);

  if (inPlatform) return null;
  return <>{children}</>;
}
