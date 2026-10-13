import type { Metadata } from 'next';
import type { ReactNode } from 'react';

/**
 * Kept for the students already enrolled in the earlier cohort, not for
 * search or for the campaign: unlinked from the site and kept out of results.
 */
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function PrivateLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
