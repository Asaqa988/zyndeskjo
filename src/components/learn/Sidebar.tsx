'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import {
  LayoutDashboard,
  BookOpen,
  Route,
  Layers,
  FlaskConical,
  Sparkles,
  FolderKanban,
  TrendingUp,
  Award,
  type LucideIcon,
} from 'lucide-react';
import { tutorialTarget, type TutorialTargetId } from '@/data/tutorials/targets';
import { course, progressPercent } from '@/data/course/course';
import { pick } from '@/data/course/types';
import { TutorialLauncher } from '@/components/tutorial/TutorialLauncher';

interface NavItem {
  href: string;
  labelKey: string;
  icon: LucideIcon;
  target?: TutorialTargetId;
}

const items: NavItem[] = [
  { href: '/learn', labelKey: 'dashboard', icon: LayoutDashboard },
  { href: '/learn/course', labelKey: 'course', icon: BookOpen, target: 'nav-course' },
  { href: '/learn/path', labelKey: 'path', icon: Route },
  { href: '/learn/modules', labelKey: 'modules', icon: Layers },
  { href: '/learn/labs', labelKey: 'labs', icon: FlaskConical, target: 'nav-labs' },
  { href: '/learn/playground', labelKey: 'playground', icon: Sparkles, target: 'nav-playground' },
  { href: '/learn/projects', labelKey: 'projects', icon: FolderKanban, target: 'nav-projects' },
  { href: '/learn/progress', labelKey: 'progress', icon: TrendingUp },
  { href: '/learn/certificate', labelKey: 'certificate', icon: Award },
];

export function Sidebar() {
  const t = useTranslations('learn.nav');
  const locale = useLocale();
  const pathname = usePathname();

  /** next-intl prefixes routes with the locale; compare on the tail. */
  const current = pathname.replace(/^\/(en|ar)/, '') || '/learn';

  return (
    <aside className="glass glass-strong flex h-full w-full flex-col gap-6 rounded-glass px-4 py-6">
      <div className="px-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-navy-medium">
          {t('eyebrow')}
        </p>
        <p className="mt-1.5 text-sm font-semibold leading-snug text-ink">
          {pick(course.title, locale)}
        </p>
      </div>

      <nav className="flex flex-1 flex-col gap-1">
        {items.map(({ href, labelKey, icon: Icon, target }) => {
          const active = current === href;
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? 'page' : undefined}
              {...(target ? tutorialTarget(target) : {})}
              className={`flex items-center gap-3 rounded-pill px-3 py-2.5 text-sm transition ${
                active
                  ? 'bg-navy font-semibold text-white shadow-glass'
                  : 'text-navy-medium hover:bg-white/60 hover:text-navy'
              }`}
            >
              <Icon size={17} aria-hidden className={active ? '' : 'text-navy-soft'} />
              {t(labelKey)}
            </Link>
          );
        })}
      </nav>

      <TutorialLauncher />

      {/* Course progress — the one number a student checks constantly. */}
      <div className="rounded-[16px] border border-white/60 bg-white/60 px-4 py-3.5">
        <div className="flex items-baseline justify-between">
          <span className="text-xs text-navy-medium">{t('courseProgress')}</span>
          <span className="text-sm font-semibold tabular-nums text-ink">{progressPercent}%</span>
        </div>
        <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-navy-ice">
          <div
            className="h-full rounded-full bg-navy transition-[width] duration-700"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </aside>
  );
}
