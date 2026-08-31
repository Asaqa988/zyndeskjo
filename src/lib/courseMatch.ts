import { course } from '@/data/course/course';
import type { Module } from '@/data/course/types';
import type { CvAnalysis } from '@/lib/cvAnalysis';

/**
 * Whether the course actually covers what a CV was found to be missing.
 *
 * The point of this file is to be able to say no.
 *
 * Most people who use the CV checker are applying for jobs the course has
 * nothing to do with — a React role, a DevOps role — and their gaps will be
 * Kubernetes and AWS. Telling that person "our course fills your gaps" is a
 * lie they can disprove by clicking through to the syllabus, and it costs more
 * than the sale is worth. So the match has to be real before anything is
 * offered, and a weak overlap is treated as no overlap.
 *
 * Matching is deliberately narrow: a term counts only if it appears in a
 * module's own stack or lesson titles. No synonyms, no "automation-adjacent"
 * guessing — the failure mode of a loose matcher is exactly the false promise
 * this exists to prevent.
 */

/** Words too generic to mean the course covers anything in particular. */
const TOO_BROAD = new Set([
  'api',
  'apis',
  'cloud',
  'ci',
  'cd',
  'ci/cd',
  'testing',
  'agile',
  'scrum',
  'git',
  'sql',
  'database',
  'databases',
  'communication',
  'teamwork',
  'leadership',
  'english',
]);

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9+#. ]/g, ' ').replace(/\s+/g, ' ').trim();

/** Everything a module can legitimately claim to teach. */
function moduleTerms(m: Module): string[] {
  return [...m.stack, ...m.lessons.map((l) => l.title.en), m.title.en].map(norm);
}

export interface CourseMatch {
  /** Missing terms the syllabus genuinely covers. */
  covered: string[];
  /** The modules that cover them, in course order. */
  modules: Module[];
  /**
   * True when the overlap is substantial enough to mention the course at all.
   * Below this we say nothing rather than stretch.
   */
  worthOffering: boolean;
}

export function matchAgainstCourse(analysis: CvAnalysis): CourseMatch {
  const wanted = analysis.missingKeywords
    .map(norm)
    .filter((k) => k.length > 1 && !TOO_BROAD.has(k));

  const covered: string[] = [];
  const modules: Module[] = [];

  for (const m of course.modules) {
    const terms = moduleTerms(m);
    const hits = wanted.filter((k) => terms.some((t) => t === k || t.includes(k)));
    if (hits.length === 0) continue;

    modules.push(m);
    for (const h of hits) if (!covered.includes(h)) covered.push(h);
  }

  return {
    covered,
    modules,
    /*
     * Two distinct terms covered, or the covered terms are at least half of
     * what was missing.
     *
     * Counting modules instead was wrong: "n8n" appears in six of them, so a
     * DevOps candidate whose gaps were Kubernetes, AWS and n8n was shown the
     * course on the strength of one term out of three. The share matters, not
     * the reach — one gap out of three is not a course that fits, while a
     * single gap that is the only gap is.
     */
    worthOffering:
      covered.length >= 2 || (wanted.length > 0 && covered.length / wanted.length >= 0.5),
  };
}
