import { NextResponse } from 'next/server';
import { readSeats } from '@/lib/seats';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Read by the pages that show how full the cohort is. */
export async function GET() {
  return NextResponse.json(readSeats(), { headers: { 'cache-control': 'no-store' } });
}
