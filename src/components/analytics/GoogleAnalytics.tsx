'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { GA_ID, gaEvent } from '@/lib/gtag';

/**
 * Google Analytics 4 (gtag.js).
 * Renders nothing unless NEXT_PUBLIC_GA_ID is set, so it stays inert
 * until you add the Measurement ID (locally or in Railway env vars).
 *
 * - Loads gtag.js + config once via next/script (afterInteractive).
 * - Fires an extra page_view on client-side navigations (SPA routing).
 */
export function GoogleAnalytics() {
  const pathname = usePathname();
  const firstLoad = useRef(true);

  useEffect(() => {
    // gtag config already sends the initial page_view; skip it here,
    // then track each client-side route change.
    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }
    gaEvent('page_view', { page_path: pathname });
  }, [pathname]);

  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
      </Script>
    </>
  );
}
