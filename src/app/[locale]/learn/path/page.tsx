import { setRequestLocale, getTranslations } from 'next-intl/server';
import { PageHeader } from '@/components/learn/ui';
import { JourneyFlow } from '@/components/learn/JourneyFlow';
import { tutorialTarget } from '@/data/tutorials/targets';

export default async function LearningPathPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations('learn.path');

  return (
    <div {...tutorialTarget('learning-path')} className="flex flex-col gap-8">
      <PageHeader eyebrow={t('eyebrow')} title={t('title')} lead={t('lead')} />
      <JourneyFlow />
    </div>
  );
}
