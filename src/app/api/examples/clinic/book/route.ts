import { NextResponse } from 'next/server';
import { buildClinicEmail } from '@/lib/examples/clinicEmail';
import { CLINIC_SERVICES } from '@/data/examples/clinic';
import { takeToken, clientKey } from '@/lib/rateLimit';

export const runtime = 'nodejs';

/** Low on purpose: this endpoint sends mail to whatever address it is given. */
const DAILY_LIMIT = Number(process.env.CLINIC_BOOK_DAILY_LIMIT ?? 5);
const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const SERVICES: readonly string[] = CLINIC_SERVICES.map((s) => s.name);

/**
 * The demo booking.
 *
 * Builds the confirmation the clinic's patient would receive and hands it to
 * the automation to send. The service has to be one the clinic actually
 * offers — a free-text field here would let anyone put arbitrary wording into
 * an email that carries a real doctor's name.
 *
 * Nothing is booked. The email says so, twice.
 */
export async function POST(request: Request) {
  const limit = takeToken(`clinic-book:${clientKey(request)}`, DAILY_LIMIT);
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

  const name = String(body.name ?? '').trim().slice(0, 80);
  const email = String(body.email ?? '').trim().toLowerCase().slice(0, 200);
  const service = String(body.service ?? '').trim();
  const note = String(body.note ?? '').trim().slice(0, 200);

  if (name.length < 2) return NextResponse.json({ ok: false, error: 'name' }, { status: 422 });
  if (!EMAIL.test(email)) return NextResponse.json({ ok: false, error: 'email' }, { status: 422 });
  if (!SERVICES.includes(service)) {
    return NextResponse.json({ ok: false, error: 'service' }, { status: 422 });
  }

  const hook = process.env.LEAD_WEBHOOK_URL;
  if (!hook) {
    console.error('[clinic-book] no webhook configured');
    return NextResponse.json({ ok: false, error: 'unconfigured' }, { status: 503 });
  }

  try {
    const res = await fetch(hook, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      signal: AbortSignal.timeout(15_000),
      body: JSON.stringify({
        source: 'examples/clinic-booking',
        intent: 'demo-booking',
        name,
        email,
        service,
        note,
        subject: 'طلب موعد — عيادة الدكتور خالد السيد (عرض توضيحي)',
        html: buildClinicEmail({ name, service, note }),
        receivedAt: new Date().toISOString(),
      }),
    });
    if (!res.ok) throw new Error(`webhook responded ${res.status}`);
  } catch (err) {
    console.error('[clinic-book] delivery failed:', err);
    return NextResponse.json({ ok: false, error: 'delivery_failed' }, { status: 502 });
  }

  return NextResponse.json({ ok: true, remaining: limit.remaining });
}
