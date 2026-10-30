import { HttpError } from './http';

// Lightweight per-instance limiter for public forms. On serverless each instance keeps
// its own counters, which is enough to stop casual spam without extra infrastructure.
const buckets = globalThis.__rateBuckets ?? (globalThis.__rateBuckets = new Map());

export function rateLimit(req, { key = 'form', limit = 20, windowMs = 15 * 60 * 1000 } = {}) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local';
  const id = `${key}:${ip}`;
  const now = Date.now();
  const entry = buckets.get(id);

  if (!entry || entry.reset < now) {
    buckets.set(id, { count: 1, reset: now + windowMs });
    if (buckets.size > 5000) for (const [k, v] of buckets) if (v.reset < now) buckets.delete(k);
    return;
  }
  entry.count += 1;
  if (entry.count > limit) throw new HttpError(429, 'Too many requests. Please call or WhatsApp us directly.');
}
