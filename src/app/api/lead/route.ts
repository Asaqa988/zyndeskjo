import { NextResponse } from 'next/server';

/**
 * Lead intake endpoint.
 * - If LEAD_WEBHOOK_URL is set, forwards the lead there (CRM / webhook / email).
 * - Otherwise runs in "mock" mode: logs to the server console and returns success,
 *   so the UI works out of the box during development.
 *
 * See README → "Connecting the contact form" to wire this to your CRM.
 */
export async function POST(request: Request) {
  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  // Basic honeypot spam check (field must be empty).
  if (typeof payload.company_website === 'string' && payload.company_website.length > 0) {
    return NextResponse.json({ ok: true }); // silently accept + drop bots
  }

  // Minimal server-side validation.
  const email = String(payload.email ?? '');
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: 'invalid_email' }, { status: 422 });
  }

  const lead = { ...payload, receivedAt: new Date().toISOString() };
  const webhook = process.env.LEAD_WEBHOOK_URL;

  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          ...(process.env.LEAD_WEBHOOK_TOKEN
            ? { 'x-zyndesk-token': process.env.LEAD_WEBHOOK_TOKEN }
            : {}),
        },
        body: JSON.stringify(lead),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    } catch (err) {
      console.error('[lead] webhook failed:', err);
      return NextResponse.json({ ok: false, error: 'delivery_failed' }, { status: 502 });
    }
  } else {
    // Mock mode — replace with real delivery in production.
    console.info('[lead] (mock mode, no LEAD_WEBHOOK_URL) received:', lead);
  }

  return NextResponse.json({ ok: true });
}
