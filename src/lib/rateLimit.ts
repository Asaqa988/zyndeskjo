/**
 * A daily cap per visitor on endpoints that cost money to serve.
 *
 * The CV analyser is a public endpoint that calls a paid model on every hit.
 * Without a cap, one script can spend the whole OpenAI budget in an afternoon
 * and the tool is simply down for everyone else.
 *
 * Deliberately in memory: no store to run, nothing to go wrong, and it resets
 * when the container does. That is a real limitation — a restart hands
 * everyone a fresh allowance, and a second instance would keep its own count —
 * but it turns "unbounded" into "bounded", which is the whole point. Move it to
 * Redis or Upstash the day this runs on more than one instance.
 */

interface Bucket {
  count: number;
  /** Epoch ms when this bucket stops counting. */
  resetsAt: number;
}

const buckets = new Map<string, Bucket>();
const DAY_MS = 24 * 60 * 60 * 1000;

/** Stops the map growing forever on a long-lived container. */
function sweep(now: number) {
  if (buckets.size < 5000) return;
  for (const [key, b] of buckets) if (b.resetsAt <= now) buckets.delete(key);
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  /** Seconds until the allowance resets — for a Retry-After header. */
  retryAfter: number;
}

export function takeToken(key: string, limit: number): RateLimitResult {
  const now = Date.now();
  sweep(now);

  const existing = buckets.get(key);
  const bucket = existing && existing.resetsAt > now ? existing : { count: 0, resetsAt: now + DAY_MS };

  const retryAfter = Math.max(1, Math.ceil((bucket.resetsAt - now) / 1000));

  if (bucket.count >= limit) {
    buckets.set(key, bucket);
    return { allowed: false, remaining: 0, retryAfter };
  }

  bucket.count += 1;
  buckets.set(key, bucket);
  return { allowed: true, remaining: limit - bucket.count, retryAfter };
}

/**
 * Who is asking.
 *
 * Behind Railway's proxy the socket address is the proxy, so the first hop in
 * x-forwarded-for is the closest thing to the visitor. It is spoofable by
 * anyone determined — this is a cost guard, not an access control.
 */
export function clientKey(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return request.headers.get('x-real-ip')?.trim() || 'unknown';
}
