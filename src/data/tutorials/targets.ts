/**
 * The contract between the platform and the tutorial engine.
 *
 * A tour step names a target from this list; a screen marks the matching
 * element with `data-tutorial="…"`. Because the ids are a closed union, a step
 * pointing at something that doesn't exist is a compile error rather than a
 * step that silently does nothing at runtime.
 *
 * This file is the ONLY thing the engine and the platform are allowed to share.
 * Adding a target is a deliberate act: name it after what the student sees, not
 * after the component that happens to render it.
 */

import { currentModule } from '@/data/course/course';

/**
 * The module the tour opens to show a lesson list.
 *
 * Derived rather than written down: a hand-typed slug survives happily in this
 * file after the module it names has been renamed or removed, and the only
 * symptom is a 404 in the middle of the tour — which is where a first-time
 * visitor meets it. Following the course data means the two cannot disagree.
 */
const LESSON_LIST_ROUTE = `/learn/modules/${currentModule.slug}`;

export const TUTORIAL_TARGETS = [
  // Dashboard
  'student-dashboard',
  'progress-summary',
  'continue-learning',
  'next-up',

  // Navigation
  'nav-course',
  'nav-labs',
  'nav-playground',
  'nav-projects',

  // Course structure
  'course-overview',
  'learning-path',
  'modules-grid',
  'lesson-list',

  // Practice
  'labs',
  'ai-playground',
  'projects',
  'capstone',

  // Outcome
  'progress',
  'journey-flow',
  'certificate',
] as const;

export type TutorialTargetId = (typeof TUTORIAL_TARGETS)[number];

/**
 * Which screen each target lives on, so the engine can navigate before it looks
 * for the element. Targets on the persistent shell (the sidebar) have no route
 * — they are present everywhere.
 */
export const TARGET_ROUTES: Partial<Record<TutorialTargetId, string>> = {
  'student-dashboard': '/learn',
  'progress-summary': '/learn',
  'continue-learning': '/learn',
  'next-up': '/learn',

  'course-overview': '/learn/course',
  'learning-path': '/learn/path',
  'modules-grid': '/learn/modules',
  'lesson-list': LESSON_LIST_ROUTE,

  labs: '/learn/labs',
  'ai-playground': '/learn/playground',
  projects: '/learn/projects',
  capstone: '/learn/projects',

  progress: '/learn/progress',
  'journey-flow': '/learn/path',
  certificate: '/learn/certificate',
};

/** Convenience for marking an element: `<div {...tutorialTarget('labs')}>`. */
export function tutorialTarget(id: TutorialTargetId) {
  return { 'data-tutorial': id } as const;
}
