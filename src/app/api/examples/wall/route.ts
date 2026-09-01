import { NextResponse } from 'next/server';
import { readWall, resetWall } from '@/lib/examples/liveWall';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** What the screen is showing. Polled every couple of seconds during a talk. */
export async function GET() {
  return NextResponse.json(readWall(), {
    headers: { 'cache-control': 'no-store' },
  });
}

/**
 * Clears the wall before a session.
 *
 * Behind the same secret as the bot: this is projected in front of a room, and
 * anyone who can find the URL should not be able to blank it mid-sentence.
 */
export async function POST(request: Request) {
  const secret = process.env.TELEGRAM_DEMO_SECRET;
  if (!secret) {
    return NextResponse.json({ ok: false, error: 'unconfigured' }, { status: 503 });
  }

  let given = '';
  try {
    given = String(((await request.json()) as { secret?: unknown }).secret ?? '');
  } catch {
    /* an empty body simply fails the check below */
  }
  if (given !== secret) {
    return NextResponse.json({ ok: false, error: 'unauthorised' }, { status: 401 });
  }

  resetWall();
  return NextResponse.json({ ok: true });
}
