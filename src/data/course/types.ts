/**
 * Shapes for the demo course content.
 *
 * Deliberately narrow and serialisable: every field here is something a real
 * CMS or database row could supply later. Nothing in this file may reference
 * React, the tutorial engine, or a component — swapping the mock data for a
 * real backend should mean replacing the modules below, not these types.
 */

/** Every learner-facing string carries both locales. */
export interface LocalisedText {
  en: string;
  ar: string;
}

export type LessonKind = 'video' | 'reading' | 'lab' | 'quiz' | 'project';

/** Where the student stands. Mocked now; a progress table later. */
export type Status = 'completed' | 'in-progress' | 'locked' | 'available';

export interface Lesson {
  id: string;
  slug: string;
  title: LocalisedText;
  kind: LessonKind;
  /** Whole minutes — rendered as "12 min". */
  minutes: number;
  status: Status;
}

export interface Module {
  id: string;
  slug: string;
  /** 1-based; drives the "Module 03" label and ordering. */
  order: number;
  title: LocalisedText;
  summary: LocalisedText;
  /** lucide-react icon name, resolved by components/ui/Icon. */
  icon: string;
  /** Tech shown as chips on the module card. */
  stack: string[];
  lessons: Lesson[];
  status: Status;
}

export interface Lab {
  id: string;
  slug: string;
  title: LocalisedText;
  brief: LocalisedText;
  moduleId: string;
  difficulty: 'starter' | 'core' | 'advanced';
  minutes: number;
  stack: string[];
  status: Status;
}

export interface Project {
  id: string;
  slug: string;
  title: LocalisedText;
  brief: LocalisedText;
  /** The capstone renders larger and closes the learning path. */
  capstone: boolean;
  stack: string[];
  status: Status;
}

/** One node in the animated end-to-end journey. */
export interface JourneyNode {
  id: string;
  label: LocalisedText;
  /** What the tutor says while this node draws in. */
  note: LocalisedText;
  icon: string;
}

export interface Course {
  id: string;
  title: LocalisedText;
  subtitle: LocalisedText;
  instructor: LocalisedText;
  level: LocalisedText;
  totalMinutes: number;
  modules: Module[];
  labs: Lab[];
  projects: Project[];
  journey: JourneyNode[];
}

/** Convenience for components that only need one locale. */
export function pick(text: LocalisedText, locale: string): string {
  return locale === 'ar' ? text.ar : text.en;
}
