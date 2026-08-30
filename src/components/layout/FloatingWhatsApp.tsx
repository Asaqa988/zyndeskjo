'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { siteConfig } from '@/config/site';

/**
 * Floating WhatsApp CTA.
 *
 * The link comes from siteConfig as-is. It used to append ?text= with a
 * prefilled greeting, which a wa.link short link does not forward — the
 * preset message lives inside the link itself now.
 */
export function FloatingWhatsApp() {
  const t = useTranslations('common');
  const href = siteConfig.contact.whatsappUrl;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('whatsappAria')}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
      className="fixed z-40 bottom-5 inline-flex items-center gap-2 rounded-pill bg-[#25D366] px-4 py-3 text-white shadow-glass-lg hover:brightness-105"
      style={{ insetInlineEnd: '1.25rem' }}
    >
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden>
        <path d="M17.5 14.4c-.3-.2-1.7-.9-2-1-.3-.1-.5-.2-.7.1s-.8 1-1 1.2c-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.4.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3z" />
        <path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.5A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-2.9.9.9-2.8-.2-.3A8.2 8.2 0 1 1 12 20.2z" />
      </svg>
      <span className="hidden sm:inline text-sm font-semibold">{t('whatsapp')}</span>
    </motion.a>
  );
}
