import { setRequestLocale, getTranslations } from 'next-intl/server';
import { PageHeader } from '@/components/learn/ui';
import { PlaygroundDemo } from '@/components/learn/PlaygroundDemo';
import { tutorialTarget } from '@/data/tutorials/targets';

export default async function PlaygroundPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations('learn.playground');

  return (
    <div {...tutorialTarget('ai-playground')} className="flex flex-col gap-8">
      <PageHeader eyebrow={t('eyebrow')} title={t('title')} lead={t('lead')} />
      <PlaygroundDemo />
      <p className="text-xs leading-relaxed text-navy-soft">{t('mockNote')}</p>
    </div>
  );
}
