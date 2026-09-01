import { setRequestLocale } from 'next-intl/server';
import { AgentStage } from '@/components/agent/AgentStage';
import { LectureBanner } from '@/components/course/LectureBanner';

/**
 * Home is now the assistant and nothing else.
 *
 * The marketing sections (Hero, WhatWeDo, GoalSelector, AiShowcase,
 * TrainingTabs, ProcessTimeline, QaLab, ProjectsGrid, WhyZyndesk, Metrics,
 * Testimonials, FinalCta, TrustStrip) still exist under
 * src/components/sections — they are unlinked, not deleted, so restoring the
 * old page is a matter of importing them back here.
 *
 * The banner above it is the one exception, and it removes itself once the
 * session it announces is over.
 */
export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  return (
    <>
      <div className="container-z pt-24 sm:pt-28">
        <LectureBanner />
      </div>
      <AgentStage />
    </>
  );
}
