/**
 * The CV analyser behind the free tool.
 *
 * Kept apart from the route so the prompt and the shape of a result are one
 * thing you can read, and the route stays about HTTP.
 *
 * The model is asked for JSON and the result is validated before it reaches a
 * page: a score that arrives as "eighty-six" or a missing array would render
 * as a broken report to someone who just trusted us with their CV.
 */

const OPENAI_BASE = 'https://api.openai.com/v1';
const MODEL = process.env.OPENAI_CV_MODEL ?? process.env.OPENAI_MODEL ?? 'gpt-5.4-mini';

/** Enough CV to judge, small enough that one submission cannot run up a bill. */
export const MAX_CV_CHARS = 18_000;
export const MAX_JD_CHARS = 8_000;

export interface CvBreakdown {
  skills: number;
  experience: number;
  education: number;
  keywords: number;
}

export interface CvAnalysis {
  /** 0–100. */
  score: number;
  verdict: string;
  breakdown: CvBreakdown;
  strengths: string[];
  gaps: string[];
  missingKeywords: string[];
  recommendations: string[];
}

const clamp = (n: unknown, lo = 0, hi = 100) =>
  Math.max(lo, Math.min(hi, Math.round(Number(n) || 0)));

const strings = (v: unknown, max: number): string[] =>
  Array.isArray(v)
    ? v.filter((x): x is string => typeof x === 'string' && x.trim().length > 0)
        .map((s) => s.trim().slice(0, 240))
        .slice(0, max)
    : [];

/**
 * Coerces whatever the model returned into something safe to render.
 * Anything missing becomes empty rather than undefined, so the page never
 * has to guard every field.
 */
export function normalise(raw: unknown): CvAnalysis {
  const o = (raw ?? {}) as Record<string, unknown>;
  const b = (o.breakdown ?? {}) as Record<string, unknown>;

  return {
    score: clamp(o.score),
    verdict: typeof o.verdict === 'string' ? o.verdict.trim().slice(0, 300) : '',
    breakdown: {
      skills: clamp(b.skills),
      experience: clamp(b.experience),
      education: clamp(b.education),
      keywords: clamp(b.keywords),
    },
    strengths: strings(o.strengths, 6),
    gaps: strings(o.gaps, 6),
    missingKeywords: strings(o.missingKeywords, 12),
    recommendations: strings(o.recommendations, 6),
  };
}

function systemPrompt(locale: string): string {
  const language =
    locale === 'ar'
      ? 'Write every piece of text in Arabic — clear Modern Standard Arabic, addressed to the candidate as "أنت".'
      : 'Write every piece of text in English, addressed to the candidate as "you".';

  return `You compare a CV against a job description and report how well they match.

${language}

Return ONLY a JSON object, no prose around it, in exactly this shape:

{
  "score": 0-100,
  "verdict": "one sentence on where this candidate stands for this role",
  "breakdown": { "skills": 0-100, "experience": 0-100, "education": 0-100, "keywords": 0-100 },
  "strengths": ["what genuinely fits, from the CV"],
  "gaps": ["what the job asks for and the CV does not show"],
  "missingKeywords": ["terms in the job description absent from the CV"],
  "recommendations": ["specific, actionable edits to this CV for this role"]
}

Rules:
- Judge only what the CV actually says. Never invent experience, and never assume a skill from a job title.
- "score" is your honest overall match. Do not inflate it to be kind — a candidate who is told 90% and then never hears back has been failed by this tool.
- A weak match is useful information. Say so plainly, and put the effort into the recommendations.
- Recommendations must be things this person can do to this document: a section to add, a phrasing to change, a project worth including. Not "gain more experience".
- 3 to 5 items per list. Fewer if there genuinely are fewer.
- Keep every string short enough to read at a glance.`;
}

/** Calls the model and returns a validated analysis, or throws. */
export async function analyseCv({
  cv,
  jobDescription,
  locale,
  signal,
}: {
  cv: string;
  jobDescription: string;
  locale: string;
  signal?: AbortSignal;
}): Promise<CvAnalysis> {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error('OPENAI_API_KEY is not set');

  const res = await fetch(`${OPENAI_BASE}/chat/completions`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: `Bearer ${key}` },
    signal,
    body: JSON.stringify({
      model: MODEL,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: systemPrompt(locale) },
        {
          role: 'user',
          content: `JOB DESCRIPTION:\n${jobDescription.slice(0, MAX_JD_CHARS)}\n\n---\n\nCV:\n${cv.slice(0, MAX_CV_CHARS)}`,
        },
      ],
    }),
  });

  if (!res.ok) {
    throw new Error(`OpenAI responded ${res.status}: ${(await res.text()).slice(0, 200)}`);
  }

  const json = (await res.json()) as { choices?: { message?: { content?: string } }[] };
  const content = json.choices?.[0]?.message?.content;
  if (!content) throw new Error('empty response from the model');

  return normalise(JSON.parse(content));
}
