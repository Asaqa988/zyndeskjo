import { NextResponse } from 'next/server';
import { takeToken, clientKey } from '@/lib/rateLimit';

/**
 * "Send me the course details."
 *
 * Forwards the address to n8n, which sends the email from asaqa001@gmail.com
 * and records the lead. The site never sends mail itself — the Gmail
 * credentials live in n8n and belong there.
 *
 * Someone can type an address that is not theirs, so the mail n8n sends has to
 * say plainly where it came from and be trivial to ignore. The daily cap here
 * is the other half of that: it stops the form being used to send repeated
 * mail to someone else.
 */
const DAILY_LIMIT = Number(process.env.COURSE_INFO_DAILY_LIMIT ?? 3);
const WEBHOOK = process.env.COURSE_INFO_WEBHOOK_URL ?? process.env.LEAD_WEBHOOK_URL;

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export async function POST(request: Request) {
  const limit = takeToken(`course-info:${clientKey(request)}`, DAILY_LIMIT);
  if (!limit.allowed) {
    return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const email = String(body.email ?? '').trim().slice(0, 200);
  if (!EMAIL.test(email)) {
    return NextResponse.json({ ok: false, error: 'invalid_email' }, { status: 422 });
  }

  const payload = {
    source: 'cv-check',
    intent: 'course-info',
    email,
    locale: body.locale === 'en' ? 'en' : 'ar',
    // What the CV was missing that the course covers — so the follow-up can be
    // about their situation rather than a form letter.
    covered: Array.isArray(body.covered) ? body.covered.slice(0, 12).map(String) : [],
    receivedAt: new Date().toISOString(),
  };

  if (!WEBHOOK) {
    console.info('[course-info] (no webhook configured) would send:', payload);
    return NextResponse.json({ ok: true });
  }

  try {
    const res = await fetch(WEBHOOK, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        ...(process.env.LEAD_WEBHOOK_TOKEN
          ? { 'x-zyndesk-token': process.env.LEAD_WEBHOOK_TOKEN }
          : {}),
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`webhook responded ${res.status}`);
  } catch (err) {
    console.error('[course-info] delivery failed:', err);
    return NextResponse.json({ ok: false, error: 'delivery_failed' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
