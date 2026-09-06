const STORE_KEY = '__rateLimitStore__';

function getStore() {
  if (!globalThis[STORE_KEY]) {
    globalThis[STORE_KEY] = new Map();
  }
  return globalThis[STORE_KEY];
}

function pruneBuckets(buckets, windowMs) {
  const cutoff = Date.now() - windowMs;
  for (const [key, list] of buckets) {
    const filtered = list.filter((ts) => ts > cutoff);
    if (filtered.length === 0) {
      buckets.delete(key);
    } else {
      buckets.set(key, filtered);
    }
  }
  if (buckets.size > 5000) {
    const entries = [...buckets.entries()].sort((a, b) => a[1].length - b[1].length);
    const toRemove = entries.slice(0, entries.length - 5000);
    for (const [key] of toRemove) buckets.delete(key);
  }
}

export function getClientIp(request) {
  const xff = request.headers.get('x-forwarded-for');
  if (xff) {
    return xff.split(',')[0].trim();
  }
  const realIp = request.headers.get('x-real-ip');
  if (realIp) return realIp.trim();
  return 'unknown';
}

export function rateLimit({ key, limit, windowMs }) {
  const buckets = getStore();
  const now = Date.now();
  const list = buckets.get(key) || [];
  const recent = list.filter((ts) => ts > now - windowMs);
  if (recent.length >= limit) {
    return {
      allowed: false,
      retryAfter: Math.ceil((recent[0] + windowMs - now) / 1000),
    };
  }
  recent.push(now);
  buckets.set(key, recent);
  if (Math.random() < 0.02) pruneBuckets(buckets, windowMs);
  return { allowed: true, remaining: limit - recent.length };
}

export function rateLimitResponse(retryAfter) {
  return new Response(
    JSON.stringify({ error: 'Çok fazla istek. Lütfen sonra tekrar deneyin.' }),
    {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        'Retry-After': String(retryAfter),
      },
    }
  );
}
