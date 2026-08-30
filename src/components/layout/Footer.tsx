import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { siteConfig, isLive } from '@/config/site';
import { footerColumns } from '@/config/nav';
import { Logo } from './Logo';
import { Icon } from '@/components/ui/Icon';
import { NewsletterField } from './NewsletterField';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();
  // A profile we do not have yet is left out entirely — a dead icon costs
  // more trust than a missing one.
  const socials = [
    { name: 'Linkedin', href: siteConfig.social.linkedin },
    { name: 'Instagram', href: siteConfig.social.instagram },
    { name: 'Facebook', href: siteConfig.social.facebook },
    { name: 'Youtube', href: siteConfig.social.youtube },
  ].filter((s) => isLive(s.href));

  return (
    <footer className="relative mt-20">
      <div className="container-z">
        <div className="glass rounded-glass p-8 md:p-12">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
            <div className="flex flex-col gap-4">
              <Logo />
              <p className="text-sm text-[var(--text-dim)] max-w-xs leading-relaxed">
                {t('footer.summary')}
              </p>
              <div className="flex flex-col gap-2 text-sm">
                <a href={`tel:${siteConfig.contact.phoneHref}`} className="inline-flex items-center gap-2 text-[var(--text-dim)] hover:text-navy">
                  <Icon name="Phone" size={16} /> <span className="tel">{siteConfig.contact.phoneDisplay}</span>
                </a>
                <a href={`mailto:${siteConfig.contact.email}`} className="inline-flex items-center gap-2 text-[var(--text-dim)] hover:text-navy">
                  <Icon name="Mail" size={16} /> {siteConfig.contact.email}
                </a>
                <span className="inline-flex items-center gap-2 text-[var(--text-dim)]">
                  <Icon name="MapPin" size={16} /> {t('footer.address')}
                </span>
              </div>
            </div>

            {footerColumns.map((col) => (
              <nav key={col.title} aria-label={t(`footer.cols.${col.title}`)} className="flex flex-col gap-3">
                <h3 className="text-sm font-bold text-ink">{t(`footer.cols.${col.title}`)}</h3>
                <ul className="flex flex-col gap-2">
                  {col.links.map((l, i) => (
                    <li key={`${l.href}-${i}`}>
                      <Link href={l.href} className="text-sm text-[var(--text-dim)] hover:text-navy transition-colors">
                        {t(`footer.links.${l.label}`)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          <div className="mt-10 grid gap-6 border-t border-[var(--glass-border-soft)] pt-6 md:grid-cols-2 md:items-center">
            <div className="max-w-md">
              <h3 className="text-sm font-bold text-ink mb-2">{t('footer.newsletter.title')}</h3>
              <NewsletterField />
            </div>
            <div className="flex items-center gap-3 md:justify-end">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="chip !p-2.5 hover:border-navy-soft"
                >
                  <Icon name={s.name} size={18} />
                </a>
              ))}
              <LanguageSwitcher />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 py-6 text-center text-xs text-[var(--text-dim)] md:flex-row md:justify-between">
          <span>
            © {year} {siteConfig.name}. {t('footer.rights')}
          </span>
          <span className="flex items-center justify-center gap-4">
            <Link href="/privacy" className="hover:text-navy">{t('footer.links.privacy')}</Link>
            <Link href="/terms" className="hover:text-navy">{t('footer.links.terms')}</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
