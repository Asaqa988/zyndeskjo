import { NextResponse } from 'next/server';
import { PDFParse } from 'pdf-parse';
import { analyseCv, MAX_CV_CHARS, MAX_JD_CHARS } from '@/lib/cvAnalysis';
import { takeToken, clientKey } from '@/lib/rateLimit';

/** pdf-parse needs a real Node runtime, not the edge. */
export const runtime = 'nodejs';

/** Per visitor, per day. Enough to try a few roles, not enough to be farmed. */
const DAILY_LIMIT = Number(process.env.CV_DAILY_LIMIT ?? 5);
const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

/**
 * The free CV check.
 *
 * Accepts either a pasted CV or a PDF, compares it to a job description and
 * returns a structured match report.
 *
 * Nothing is stored. The CV is held in memory for the length of the request
 * and then gone — someone pasting their employment history into a stranger's
 * website deserves that to be true, and it is the honest thing to be able to
 * say on the page.
 */
export async function POST(request: Request) {
  const limit = takeToken(`cv:${clientKey(request)}`, DAILY_LIMIT);
  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, error: 'rate_limited', retryAfter: limit.retryAfter },
      { status: 429, headers: { 'retry-after': String(limit.retryAfter) } }
    );
  }

  let cv = '';
  let jobDescription = '';
  let locale = 'ar';

  const type = request.headers.get('content-type') ?? '';

  try {
    if (type.includes('multipart/form-data')) {
      const form = await request.formData();
      jobDescription = String(form.get('jobDescription') ?? '');
      locale = String(form.get('locale') ?? 'ar');
      cv = String(form.get('cv') ?? '');

      const file = form.get('file');
      if (file instanceof File && file.size > 0) {
        if (file.size > MAX_UPLOAD_BYTES) {
          return NextResponse.json({ ok: false, error: 'file_too_large' }, { status: 413 });
        }
        const parser = new PDFParse({ data: new Uint8Array(await file.arrayBuffer()) });
        try {
          cv = (await parser.getText()).text;
        } finally {
          await parser.destroy?.();
        }
      }
    } else {
      const body = (await request.json()) as Record<string, unknown>;
      cv = String(body.cv ?? '');
      jobDescription = String(body.jobDescription ?? '');
      locale = body.locale === 'en' ? 'en' : 'ar';
    }
  } catch (err) {
    // Log it: this branch covers form parsing and PDF extraction both, and a
    // silent 400 here is indistinguishable from a malformed request.
    console.error('[cv] could not read the submission:', err);
    return NextResponse.json({ ok: false, error: 'unreadable_input' }, { status: 400 });
  }

  cv = cv.trim();
  jobDescription = jobDescription.trim();

  // A PDF that is a scan rather than text extracts to almost nothing, and the
  // person deserves to be told that rather than handed a report built on air.
  if (cv.length < 200) {
    return NextResponse.json({ ok: false, error: 'cv_too_short' }, { status: 422 });
  }
  if (jobDescription.length < 60) {
    return NextResponse.json({ ok: false, error: 'jd_too_short' }, { status: 422 });
  }

  try {
    const analysis = await analyseCv({
      cv: cv.slice(0, MAX_CV_CHARS),
      jobDescription: jobDescription.slice(0, MAX_JD_CHARS),
      locale,
      signal: request.signal,
    });
    return NextResponse.json({ ok: true, analysis, remaining: limit.remaining });
  } catch (err) {
    console.error('[cv] analysis failed:', err);
    return NextResponse.json({ ok: false, error: 'analysis_failed' }, { status: 502 });
  }
}
