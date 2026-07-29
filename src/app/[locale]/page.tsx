import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/sections/Hero';
import { TrustStrip } from '@/components/sections/TrustStrip';
import { WhatWeDo } from '@/components/sections/WhatWeDo';
import { GoalSelector } from '@/components/sections/GoalSelector';
import { AiShowcase } from '@/components/sections/AiShowcase';
import { TrainingTabs } from '@/components/sections/TrainingTabs';
import { ProcessTimeline } from '@/components/sections/ProcessTimeline';
import { QaLab } from '@/components/sections/QaLab';
import { ProjectsGrid } from '@/components/sections/ProjectsGrid';
import { WhyZyndesk } from '@/components/sections/WhyZyndesk';
import { Metrics } from '@/components/sections/Metrics';
import { Testimonials } from '@/components/sections/Testimonials';
import { FinalCta } from '@/components/sections/FinalCta';

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  return (
    <>
      <Hero />
      <TrustStrip />
      <WhatWeDo />
      <GoalSelector />
      <AiShowcase />
      <TrainingTabs />
      <ProcessTimeline />
      <QaLab />
      <ProjectsGrid featuredOnly />
      <WhyZyndesk />
      <Metrics />
      <Testimonials />
      <FinalCta />
    </>
  );
}
