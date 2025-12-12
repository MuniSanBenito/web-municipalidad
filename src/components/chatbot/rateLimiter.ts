// src/components/chatbot/rateLimiter.ts

/**
 * Sistema de Rate Limiting para proteger la API de Gemini
 * Evita costos excesivos y abuso del servicio
 */

import type { RateLimitConfig, RateLimitState } from './types'
import { DEFAULT_RATE_LIMIT, STORAGE_KEYS } from './types'

// Estado del rate limiter
let rateLimitState: RateLimitState = {
  requests: [],
  lastRequest: 0,
  blocked: false,
  blockedUntil: null,
}

// Configuración (puede ser sobrescrita)
let config: RateLimitConfig = { ...DEFAULT_RATE_LIMIT }

/**
 * Inicializa el rate limiter con configuración opcional
 */
export function initRateLimiter(customConfig?: Partial<RateLimitConfig>): void {
  if (customConfig) {
    config = { ...DEFAULT_RATE_LIMIT, ...customConfig }
  }

  // Intentar recuperar estado de sessionStorage
  if (typeof window !== 'undefined') {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEYS.RATE_LIMIT)
      if (stored) {
        const parsed = JSON.parse(stored) as RateLimitState
        // Solo restaurar si no ha pasado la ventana de tiempo
        const now = Date.now()
        const validRequests = parsed.requests.filter(
          (timestamp) => now - timestamp < config.windowMs,
        )
        rateLimitState = {
          ...parsed,
          requests: validRequests,
          blocked: parsed.blockedUntil ? now < parsed.blockedUntil : false,
        }
      }
    } catch (error) {
      console.warn('Error al recuperar estado de rate limit:', error)
    }
  }
}

/**
 * Guarda el estado en sessionStorage
 */
function saveState(): void {
  if (typeof window !== 'undefined') {
    try {
      sessionStorage.setItem(STORAGE_KEYS.RATE_LIMIT, JSON.stringify(rateLimitState))
    } catch (error) {
      console.warn('Error al guardar estado de rate limit:', error)
    }
  }
}

/**
 * Limpia requests antiguos fuera de la ventana de tiempo
 */
function cleanOldRequests(): void {
  const now = Date.now()
  rateLimitState.requests = rateLimitState.requests.filter(
    (timestamp) => now - timestamp < config.windowMs,
  )
}

/**
 * Verifica si se puede hacer una nueva request
 * @returns Objeto con información del estado
 */
export function canMakeRequest(): {
  allowed: boolean
  reason?: string
  retryAfter?: number
  requestsRemaining: number
} {
  const now = Date.now()

  // Verificar si está bloqueado temporalmente
  if (rateLimitState.blocked && rateLimitState.blockedUntil) {
    if (now < rateLimitState.blockedUntil) {
      const retryAfter = Math.ceil((rateLimitState.blockedUntil - now) / 1000)
      return {
        allowed: false,
        reason: `Demasiadas consultas. Esperá ${retryAfter} segundos.`,
        retryAfter,
        requestsRemaining: 0,
      }
    } else {
      // Desbloquear
      rateLimitState.blocked = false
      rateLimitState.blockedUntil = null
    }
  }

  // Limpiar requests antiguos
  cleanOldRequests()

  // Verificar intervalo mínimo entre requests
  const timeSinceLastRequest = now - rateLimitState.lastRequest
  if (timeSinceLastRequest < config.minInterval) {
    const waitTime = Math.ceil((config.minInterval - timeSinceLastRequest) / 1000)
    return {
      allowed: false,
      reason: `Esperá un momento antes de enviar otra consulta.`,
      retryAfter: waitTime,
      requestsRemaining: config.maxRequests - rateLimitState.requests.length,
    }
  }

  // Verificar límite de requests por ventana
  if (rateLimitState.requests.length >= config.maxRequests) {
    // Bloquear temporalmente
    rateLimitState.blocked = true
    rateLimitState.blockedUntil = now + config.windowMs
    saveState()

    return {
      allowed: false,
      reason: `Has alcanzado el límite de consultas. Intentá de nuevo en 1 minuto.`,
      retryAfter: Math.ceil(config.windowMs / 1000),
      requestsRemaining: 0,
    }
  }

  return {
    allowed: true,
    requestsRemaining: config.maxRequests - rateLimitState.requests.length - 1,
  }
}

/**
 * Registra una request exitosa
 */
export function recordRequest(): void {
  const now = Date.now()
  rateLimitState.requests.push(now)
  rateLimitState.lastRequest = now
  saveState()
}

/**
 * Obtiene estadísticas del rate limiter
 */
export function getRateLimitStats(): {
  requestsInWindow: number
  maxRequests: number
  windowMs: number
  isBlocked: boolean
  blockedUntil: number | null
  requestsRemaining: number
} {
  cleanOldRequests()

  return {
    requestsInWindow: rateLimitState.requests.length,
    maxRequests: config.maxRequests,
    windowMs: config.windowMs,
    isBlocked: rateLimitState.blocked,
    blockedUntil: rateLimitState.blockedUntil,
    requestsRemaining: Math.max(0, config.maxRequests - rateLimitState.requests.length),
  }
}

/**
 * Resetea el rate limiter (útil para testing o admin)
 */
export function resetRateLimiter(): void {
  rateLimitState = {
    requests: [],
    lastRequest: 0,
    blocked: false,
    blockedUntil: null,
  }

  if (typeof window !== 'undefined') {
    sessionStorage.removeItem(STORAGE_KEYS.RATE_LIMIT)
  }
}

/**
 * Wrapper para ejecutar funciones con rate limiting
 * @param fn Función a ejecutar
 * @returns Resultado de la función o error de rate limit
 */
export async function withRateLimit<T>(
  fn: () => Promise<T>,
  onRateLimited?: (reason: string, retryAfter: number) => void,
): Promise<T | null> {
  const check = canMakeRequest()

  if (!check.allowed) {
    if (onRateLimited && check.reason && check.retryAfter) {
      onRateLimited(check.reason, check.retryAfter)
    }
    return null
  }

  try {
    const result = await fn()
    recordRequest()
    return result
  } catch (error) {
    // No contar requests fallidas contra el límite
    throw error
  }
}

// Inicializar al cargar el módulo
if (typeof window !== 'undefined') {
  initRateLimiter()
}
