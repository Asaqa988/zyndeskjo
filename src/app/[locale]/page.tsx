import { setRequestLocale } from 'next-intl/server';
import { QaLanding } from '@/components/qa/QaLanding';

/**
 * Home is the QA Manual & Automation course and nothing else.
 *
 * The site is pointed at one thing while the Facebook and Instagram campaign
 * runs: an ad click lands here and the page is the course. The earlier home
 * (the Zyn assistant stage) and the marketing sections under
 * src/components/sections are untouched in the repository — they are
 * unlinked, not deleted — so putting the wider site back is a matter of
 * restoring this file from git history.
 *
 * Zyn is still on the page as the floating assistant, now answering about
 * this course.
 */
export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  return <QaLanding locale={locale} />;
}
