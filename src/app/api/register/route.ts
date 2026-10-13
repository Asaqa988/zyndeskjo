import { NextResponse } from 'next/server';
import { takeToken, clientKey } from '@/lib/rateLimit';
import { countRegistration } from '@/lib/seats';

export const runtime = 'nodejs';

/**
 * Generous: a whole classroom can share one office or campus IP, and the cost
 * of turning away a real registration is far higher than the cost of a few
 * junk rows.
 */
const DAILY_LIMIT = Number(process.env.REGISTER_DAILY_LIMIT ?? 20);

/** Jordanian mobile, written the way people actually write it. */
const PHONE = /^(?:\+?962|00962|0)?7[789]\d{7}$/;
const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/** Digits only, so 07 9770 0235 and +962 79 770 0235 are the same person. */
const normalisePhone = (raw: string) => raw.replace(/[\s()-]/g, '');

/**
 * Someone claiming a seat.
 *
 * This exists because there was no way to register at all: the site could
 * capture an email and nothing else, so every actual decision had to be
 * finished by hand over WhatsApp. During a live lecture that is the one thing
 * the trainer cannot do.
 *
 * It takes a name, a phone and an email, hands them to the automation, and
 * says so. It does not take payment — the seat is confirmed by a human
 * afterwards, and the page says that plainly rather than implying the seat is
 * already paid for.
 */
export async function POST(request: Request) {
  const limit = takeToken(`register:${clientKey(request)}`, DAILY_LIMIT);
  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, error: 'rate_limited' },
      { status: 429, headers: { 'retry-after': String(limit.retryAfter) } }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const name = String(body.name ?? '').trim().slice(0, 120);
  const phone = normalisePhone(String(body.phone ?? '')).slice(0, 20);
  const email = String(body.email ?? '').trim().toLowerCase().slice(0, 200);
  const note = String(body.note ?? '').trim().slice(0, 500);
  const locale = body.locale === 'en' ? 'en' : 'ar';
  const source = String(body.source ?? 'register').slice(0, 40);
  // Which course the seat is for. Only known ids pass; anything else is the
  // original AI Automation & n8n course, which is what /register has always meant.
  const course = body.course === 'qa-manual-automation' ? 'qa-manual-automation' : 'ai-automation-n8n';

  // Ad attribution (utm_* / fbclid). Only known keys pass, each clamped, so a
  // hand-made request can't smuggle arbitrary fields into the lead sheet.
  const attribution: Record<string, string> = {};
  if (body.attribution && typeof body.attribution === 'object') {
    for (const k of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid']) {
      const v = (body.attribution as Record<string, unknown>)[k];
      if (typeof v === 'string' && v) attribution[k] = v.slice(0, 120);
    }
  }

  if (name.length < 2) return NextResponse.json({ ok: false, error: 'name' }, { status: 422 });
  if (!PHONE.test(phone)) return NextResponse.json({ ok: false, error: 'phone' }, { status: 422 });
  if (!EMAIL.test(email)) return NextResponse.json({ ok: false, error: 'email' }, { status: 422 });

  const hook = process.env.REGISTER_WEBHOOK_URL ?? process.env.LEAD_WEBHOOK_URL;
  if (!hook) {
    // Losing a registration silently is the worst outcome on the page whose
    // whole job is not to lose them, so this is loud in the logs.
    console.error('[register] no webhook configured; registration not delivered:', { name, phone, email });
    return NextResponse.json({ ok: false, error: 'unconfigured' }, { status: 503 });
  }

  try {
    const res = await fetch(hook, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      signal: AbortSignal.timeout(15_000),
      body: JSON.stringify({
        source,
        intent: 'course-registration',
        course,
        ...attribution,
        name,
        phone,
        email,
        note,
        locale,
        receivedAt: new Date().toISOString(),
      }),
    });
    if (!res.ok) throw new Error(`webhook responded ${res.status}`);
  } catch (err) {
    console.error('[register] could not deliver registration:', { name, phone, email }, err);
    return NextResponse.json({ ok: false, error: 'delivery_failed' }, { status: 502 });
  }

  // Only once it is delivered: a seat nobody heard about is not taken. The seat
  // counter belongs to the AI Automation cohort, so other courses don't move it.
  if (course === 'ai-automation-n8n') countRegistration();
  return NextResponse.json({ ok: true });
}
