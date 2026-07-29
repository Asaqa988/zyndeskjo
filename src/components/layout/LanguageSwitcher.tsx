'use client';

import { useLocale } from 'next-intl';
import { useTransition } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { Icon } from '@/components/ui/Icon';

/** Toggles between en/ar, preserving the current path. */
export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();
  const next = locale === 'en' ? 'ar' : 'en';

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => startTransition(() => router.replace(pathname, { locale: next }))}
      className={`chip hover:border-navy-soft transition-colors ${className ?? ''}`}
      aria-label={next === 'ar' ? 'التبديل إلى العربية' : 'Switch to English'}
    >
      <Icon name="Globe" size={15} />
      <span className="font-semibold">{next === 'ar' ? 'العربية' : 'EN'}</span>
    </button>
  );
}
