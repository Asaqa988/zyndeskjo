import type { ReactNode } from 'react';
import { setRequestLocale } from 'next-intl/server';
import { Sidebar } from '@/components/learn/Sidebar';
import { TutorialProvider } from '@/components/tutorial/TutorialProvider';
import { TutorialOverlay } from '@/components/tutorial/TutorialOverlay';
import { onboardingTutorial } from '@/data/tutorials/onboarding';

/**
 * Shell for the student platform.
 *
 * Shares the marketing site's identity — the same aurora ground, the same
 * glass surfaces, the same navy and cyan — so moving from the public site into
 * the course feels like going deeper into one product rather than landing in a
 * different one. What changes is the furniture, not the palette: a persistent
 * left rail replaces the marketing navbar, and there is no footer.
 */
export default function LearnLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  setRequestLocale(locale);

  return (
    <TutorialProvider tutorial={onboardingTutorial}>
      <div className="aurora-bg" aria-hidden />
      <div className="grid-overlay" aria-hidden />

      <div className="relative mx-auto flex min-h-screen w-full max-w-[1500px]">
        <div className="sticky top-0 hidden h-screen w-[268px] shrink-0 p-4 lg:block">
          <Sidebar />
        </div>

        <main className="min-w-0 flex-1 px-5 py-8 sm:px-7 lg:px-8">{children}</main>
      </div>

      <TutorialOverlay />
    </TutorialProvider>
  );
}
