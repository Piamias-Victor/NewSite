// Map en mémoire : IP -> tableau de timestamps
const rateLimitMap = new Map<string, number[]>()

export function rateLimit(ip: string, limit = 3, windowMs = 60 * 60 * 1000): boolean {
  const now = Date.now()
  const windowStart = now - windowMs

  // Récupérer les timestamps existants pour cette IP
  const timestamps = rateLimitMap.get(ip) || []

  // Filtrer uniquement les timestamps dans la fenêtre de temps
  const recentTimestamps = timestamps.filter(ts => ts > windowStart)

  // Si limite atteinte, rejeter
  if (recentTimestamps.length >= limit) {
    return false
  }

  // Ajouter le nouveau timestamp et sauvegarder
  recentTimestamps.push(now)
  rateLimitMap.set(ip, recentTimestamps)

  return true
}

export function getClientIp(request: Request): string {
  // Récupérer l'IP depuis les headers (Vercel, Cloudflare, etc.)
  const forwarded = request.headers.get("x-forwarded-for")
  const realIp = request.headers.get("x-real-ip")

  if (forwarded) {
    return forwarded.split(",")[0]!.trim()
  }
  if (realIp) {
    return realIp
  }

  return "unknown"
}
