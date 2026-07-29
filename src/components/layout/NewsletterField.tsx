'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { Icon } from '@/components/ui/Icon';

/** Newsletter capture (client). Wire to your ESP in the submit handler. */
export function NewsletterField() {
  const t = useTranslations('footer.newsletter');
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return;
    // TODO: POST to your newsletter provider (Mailchimp / Resend / CRM).
    setDone(true);
  }

  if (done) {
    return (
      <p className="chip !bg-cyan/10 border-cyan/30 text-navy-deep">
        <Icon name="Check" size={16} /> {t('success')}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <label htmlFor="nl-email" className="sr-only">
        {t('label')}
      </label>
      <input
        id="nl-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t('placeholder')}
        className="min-w-0 flex-1 rounded-[12px] border border-[var(--glass-border)] bg-white/60 px-3.5 py-2.5 text-sm outline-none focus:border-cyan"
      />
      <button type="submit" className="btn btn-primary !px-4 !py-2.5" aria-label={t('label')}>
        <Icon name="Send" size={16} />
      </button>
    </form>
  );
}
