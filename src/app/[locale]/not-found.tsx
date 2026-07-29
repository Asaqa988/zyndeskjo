import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  const t = useTranslations('notFound');
  return (
    <section className="grid min-h-[70vh] place-items-center px-4 pt-32">
      <div className="text-center">
        <p className="display text-7xl text-gradient md:text-9xl">404</p>
        <h1 className="mt-4 text-2xl font-bold text-ink">{t('title')}</h1>
        <p className="mt-2 text-[var(--text-dim)]">{t('subtitle')}</p>
        <div className="mt-7 flex justify-center">
          <Button href="/" icon="ArrowRight">
            {t('cta')}
          </Button>
        </div>
      </div>
    </section>
  );
}
