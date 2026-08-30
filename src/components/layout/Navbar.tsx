'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';
import { clsx } from 'clsx';
import { Link, usePathname } from '@/i18n/navigation';
import { navLinks } from '@/config/nav';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Logo } from './Logo';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Navbar() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll + close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 md:pt-4">
        <motion.nav
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={clsx(
            'container-z flex items-center justify-between gap-4 rounded-glass border transition-all duration-300',
            scrolled
              ? 'glass-strong border-[var(--glass-border)] py-2.5 shadow-glass'
              : 'border-transparent bg-transparent py-3'
          )}
          style={{ maxWidth: '1200px' }}
        >
          <Link href="/" aria-label={t('home')} className="shrink-0">
            <Logo />
          </Link>

          {/* xl, not lg: seven Arabic labels wrap onto two lines in the
              1024–1279 range, which reads as a broken bar. Below that width
              the menu button takes over. */}
          <ul className="hidden xl:flex items-center gap-1">
            {navLinks.map((l) => {
              const active = pathname === l.href;
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={active ? 'page' : undefined}
                    className={clsx(
                      'px-3.5 py-2 rounded-pill text-sm font-medium transition-colors relative whitespace-nowrap',
                      active ? 'text-navy' : 'text-[var(--text-dim)] hover:text-navy'
                    )}
                  >
                    {t(l.label)}
                    {active && (
                      <motion.span
                        layoutId="nav-dot"
                        className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-cyan"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <LanguageSwitcher className="hidden sm:inline-flex" />
            <Button href="/contact" className="hidden md:inline-flex !py-2.5 !px-4 text-sm">
              {t('cta')}
            </Button>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="xl:hidden chip !p-2.5"
              aria-label={t('openMenu')}
              aria-expanded={open}
            >
              <Icon name="Menu" size={20} />
            </button>
          </div>
        </motion.nav>
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const t = useTranslations('nav');
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[60] lg:hidden"
          role="dialog"
          aria-modal="true"
        >
          <div className="absolute inset-0 glass-strong" style={{ backdropFilter: 'blur(24px)' }} />
          <div className="relative flex h-full flex-col p-5">
            <div className="flex items-center justify-between">
              <Logo />
              <button
                type="button"
                onClick={onClose}
                className="chip !p-2.5"
                aria-label={t('closeMenu')}
              >
                <Icon name="X" size={20} />
              </button>
            </div>
            <ul className="mt-8 flex flex-col gap-1">
              {navLinks.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                >
                  <Link
                    href={l.href}
                    onClick={onClose}
                    className="block py-3 text-2xl font-bold text-ink display border-b border-[var(--glass-border-soft)]"
                  >
                    {t(l.label)}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="mt-auto flex flex-col gap-3 pt-6">
              <LanguageSwitcher />
              <Button href="/contact" className="w-full justify-center" magnetic={false}>
                {t('cta')}
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
