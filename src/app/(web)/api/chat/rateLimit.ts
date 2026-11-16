/**
 * Límite corto en memoria para las llamadas a Groq.
 * Una instancia del proceso; no reemplaza el límite de la cuenta de Groq.
 */

const WINDOW_MS = 60_000
const MAX_REQUESTS = 12

type Bucket = { timestamps: number[] }

const buckets = new Map<string, Bucket>()

export function clientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    const ip = forwarded.split(',')[0]?.trim()
    if (ip) return ip
  }
  return request.headers.get('x-real-ip')?.trim() || 'local'
}

export function consumeChatRateLimit(request: Request): {
  allowed: boolean
  retryAfter: number
} {
  const now = Date.now()
  const ip = clientIp(request)
  const bucket = buckets.get(ip) ?? { timestamps: [] }
  bucket.timestamps = bucket.timestamps.filter((timestamp) => now - timestamp < WINDOW_MS)

  if (bucket.timestamps.length >= MAX_REQUESTS) {
    const oldest = bucket.timestamps[0] ?? now
    buckets.set(ip, bucket)
    return {
      allowed: false,
      retryAfter: Math.max(1, Math.ceil((WINDOW_MS - (now - oldest)) / 1000)),
    }
  }

  bucket.timestamps.push(now)
  buckets.set(ip, bucket)

  if (buckets.size > 500) {
    for (const [key, value] of buckets) {
      if (value.timestamps.every((timestamp) => now - timestamp >= WINDOW_MS)) {
        buckets.delete(key)
      }
    }
  }

  return { allowed: true, retryAfter: 0 }
}
