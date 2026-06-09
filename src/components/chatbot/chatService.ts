// src/components/chatbot/chatService.ts
/**
 * Cliente para el servicio de Chat (Groq + Llama 3.3)
 * Llama a la API Route /api/chat para mantener la API Key segura en el servidor
 */

// Debug mode basado en entorno
const DEBUG_MODE = process.env.NODE_ENV === 'development'
const API_ENDPOINT = '/api/chat'
const API_ENDPOINT_STREAM = '/api/chat/stream'

// Cache UNIFICADO con expiración para evitar doble fetch al verificar disponibilidad.
// Antes había 2 caches separados (configured/available) que causaban 2 llamadas
// al endpoint en cada consulta. Ahora 1 sola llamada con dedupe in-flight.
type StatusPayload = {
  configured: boolean
  available: boolean
  model: string
  provider: string
  error?: string
}
let statusCache: { value: StatusPayload; timestamp: number } | null = null
let inFlightStatus: Promise<StatusPayload> | null = null
const CACHE_TTL = 60 * 1000 // 1 minuto de cache

/**
 * Verifica el estado del servicio de Chat (deduplica llamadas concurrentes).
 */
async function checkChatStatus(): Promise<StatusPayload> {
  // Cache válido → reutilizar
  if (statusCache && Date.now() - statusCache.timestamp < CACHE_TTL) {
    return statusCache.value
  }
  // Llamada en vuelo → esperar la misma promesa (dedupe)
  if (inFlightStatus) return inFlightStatus

  inFlightStatus = (async () => {
    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`)
      }

      const data = (await response.json()) as StatusPayload
      statusCache = { value: data, timestamp: Date.now() }
      return data
    } catch (error) {
      console.error('Error verificando servicio de chat:', error)
      const fallback: StatusPayload = {
        configured: false,
        available: false,
        model: 'llama-3.3-70b-versatile',
        provider: 'groq',
        error: error instanceof Error ? error.message : 'Error de conexión',
      }
      statusCache = { value: fallback, timestamp: Date.now() }
      return fallback
    } finally {
      inFlightStatus = null
    }
  })()

  return inFlightStatus
}

/**
 * Verifica si el servicio de chat está configurado (API key presente en servidor)
 */
export async function isChatConfigured(): Promise<boolean> {
  try {
    const status = await checkChatStatus()
    if (DEBUG_MODE) {
      console.log(`🔧 Chat configurado: ${status.configured} (${status.provider})`)
    }
    return status.configured
  } catch (error) {
    console.error('Error verificando configuración de chat:', error)
    return false
  }
}

/**
 * Genera una respuesta usando el servicio de Chat (Groq/Llama)
 */
export async function generateChatResponse(
  userQuery: string,
  history?: Array<{ role: string; content: string }>,
): Promise<string> {
  try {
    if (DEBUG_MODE) {
      console.log('🤖 Generando respuesta con Llama 3.3...')
    }

    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: userQuery, history }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`)
    }

    const data = await response.json()

    if (!data.success) {
      throw new Error(data.error || 'Error al generar respuesta')
    }

    if (DEBUG_MODE) {
      console.log('✅ Respuesta de Llama generada:', data.response.substring(0, 100) + '...')
    }

    return data.response
  } catch (error) {
    console.error('❌ Error al generar respuesta:', error)
    throw error
  }
}

/**
 * Verifica si el servicio de chat está disponible
 */
export async function isChatAvailable(): Promise<boolean> {
  try {
    const status = await checkChatStatus()
    if (DEBUG_MODE) {
      if (status.available) {
        console.log(`✅ Chat disponible (${status.provider}: ${status.model})`)
      } else {
        console.log(`⚠️ Chat no disponible: ${status.error}`)
      }
    }
    return status.available
  } catch (error) {
    console.error('❌ Error verificando disponibilidad de chat:', error)
    return false
  }
}

/**
 * Obtiene información sobre el estado del servicio
 */
export async function getChatStatus(): Promise<{
  configured: boolean
  modelName: string
  provider: string
  available: boolean
}> {
  const status = await checkChatStatus()

  return {
    configured: status.configured,
    modelName: status.model,
    provider: status.provider,
    available: status.available,
  }
}

/**
 * Resetea el cache de estado
 */
export function resetChatCache(): void {
  statusCache = null
  inFlightStatus = null
  if (DEBUG_MODE) {
    console.log('🔄 Cache de chat reseteado')
  }
}

/**
 * Opciones para el streaming.
 */
export interface StreamOptions {
  history?: Array<{ role: string; content: string }>
  signal?: AbortSignal
  /** Callback invocado por cada chunk de texto recibido */
  onChunk?: (delta: string, accumulated: string) => void
  /** Callback invocado al cerrar el stream con éxito */
  onDone?: (full: string) => void
  /** Callback invocado en caso de error */
  onError?: (err: Error) => void
}

/**
 * Genera una respuesta usando el endpoint de STREAMING (/api/chat/stream).
 * Devuelve la respuesta completa una vez terminado, e invoca onChunk
 * con cada delta a medida que llega.
 *
 * Si el navegador no soporta ReadableStream (extremadamente raro hoy),
 * el caller debe hacer fallback a generateChatResponse() no-streaming.
 */
export async function generateChatResponseStreaming(
  query: string,
  options: StreamOptions = {},
): Promise<string> {
  const { history, signal, onChunk, onDone, onError } = options

  let response: Response
  try {
    response = await fetch(API_ENDPOINT_STREAM, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, history }),
      signal,
    })
  } catch (err) {
    const e = err instanceof Error ? err : new Error('Network error')
    onError?.(e)
    throw e
  }

  if (!response.ok || !response.body) {
    let detail = `HTTP ${response.status}`
    try {
      const data = await response.json()
      detail = data?.error || detail
    } catch {
      // ignorar
    }
    const e = new Error(detail)
    onError?.(e)
    throw e
  }

  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''
  let accumulated = ''

  try {
    while (true) {
      const { value, done } = await reader.read()
      if (done) break
      buffer += decoder.decode(value, { stream: true })

      const events = buffer.split('\n\n')
      buffer = events.pop() || ''

      for (const evt of events) {
        const line = evt.trim()
        if (!line.startsWith('data:')) continue
        const payload = line.slice(5).trim()
        if (!payload) continue
        try {
          const parsed = JSON.parse(payload)
          if (parsed.error) {
            const e = new Error(parsed.error)
            onError?.(e)
            throw e
          }
          if (parsed.done) {
            // fin del stream
            continue
          }
          if (typeof parsed.delta === 'string' && parsed.delta.length > 0) {
            accumulated += parsed.delta
            onChunk?.(parsed.delta, accumulated)
          }
        } catch (parseErr) {
          if (parseErr instanceof Error && parseErr.message !== 'stream error') {
            // re-lanzar errores reales del backend (no errores de parse)
            if (parseErr.message && !parseErr.message.includes('JSON')) throw parseErr
          }
          // ignorar líneas que no son JSON válido (ej. eventos de keep-alive)
        }
      }
    }

    if (DEBUG_MODE) {
      console.log(`✅ Stream completado (${accumulated.length} chars)`)
    }
    onDone?.(accumulated)
    return accumulated
  } catch (err) {
    const e = err instanceof Error ? err : new Error('Stream error')
    onError?.(e)
    throw e
  } finally {
    try {
      reader.releaseLock()
    } catch {
      // ignorar
    }
  }
}
