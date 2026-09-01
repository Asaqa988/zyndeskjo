import { CATEGORIES, type Category, type Idea } from '@/lib/examples/automationIdea';

/**
 * What the room sees on the screen.
 *
 * In memory, deliberately. This exists for the length of one lecture: a total,
 * a breakdown, and the last few ideas scrolling past. Nothing here is worth a
 * database, and a restart mid-lecture losing the count is a smaller problem
 * than a database to run.
 *
 * It never stores who said it. Telegram gives us a name and a handle; none of
 * it is kept, because five hundred people are about to see this on a screen
 * and they did not agree to that.
 */

export interface WallEntry {
  job: string;
  category: Category;
  title: string;
  tools: string[];
  at: number;
}

const RECENT_MAX = 40;

let total = 0;
const counts = new Map<Category, number>();
const recent: WallEntry[] = [];
/** One entry per person, so a chatty tester cannot fill the wall. */
const seen = new Set<string>();

export function record(idea: Idea, personKey: string): { counted: boolean } {
  const isNew = !seen.has(personKey);
  if (isNew) {
    seen.add(personKey);
    total += 1;
    counts.set(idea.category, (counts.get(idea.category) ?? 0) + 1);
  }

  recent.unshift({
    job: idea.job.slice(0, 60),
    category: idea.category,
    title: idea.title,
    tools: idea.tools,
    at: Date.now(),
  });
  recent.length = Math.min(recent.length, RECENT_MAX);

  return { counted: isNew };
}

export interface WallState {
  total: number;
  breakdown: { category: Category; count: number }[];
  recent: WallEntry[];
}

export function readWall(limit = 12): WallState {
  return {
    total,
    breakdown: CATEGORIES.map((category) => ({
      category,
      count: counts.get(category) ?? 0,
    })).filter((c) => c.count > 0),
    recent: recent.slice(0, limit),
  };
}

/** For a clean start before the lecture, and for testing. */
export function resetWall(): void {
  total = 0;
  counts.clear();
  recent.length = 0;
  seen.clear();
}
