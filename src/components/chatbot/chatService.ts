// src/components/chatbot/chatService.ts
/**
 * Cliente para el servicio de Chat (Groq + Llama 3.3)
 * Llama a la API Route /api/chat para mantener la API Key segura en el servidor
 */

// Debug mode basado en entorno
const DEBUG_MODE = process.env.NODE_ENV === 'development'
const API_ENDPOINT = '/api/chat'

// Cache con expiración para verificar disponibilidad
let isConfiguredCache: { value: boolean; timestamp: number } | null = null
let isAvailableCache: { value: boolean; timestamp: number } | null = null
const CACHE_TTL = 60 * 1000 // 1 minuto de cache

/**
 * Verifica si el cache es válido
 */
function isCacheValid(cache: { value: boolean; timestamp: number } | null): boolean {
  if (!cache) return false
  return Date.now() - cache.timestamp < CACHE_TTL
}

/**
 * Verifica el estado del servicio de Chat
 */
async function checkChatStatus(): Promise<{
  configured: boolean
  available: boolean
  model: string
  provider: string
  error?: string
}> {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error verificando servicio de chat:', error)
    return {
      configured: false,
      available: false,
      model: 'llama-3.3-70b-versatile',
      provider: 'groq',
      error: error instanceof Error ? error.message : 'Error de conexión',
    }
  }
}

/**
 * Verifica si el servicio de chat está configurado (API key presente en servidor)
 */
export async function isChatConfigured(): Promise<boolean> {
  if (isCacheValid(isConfiguredCache)) {
    return isConfiguredCache!.value
  }

  try {
    const status = await checkChatStatus()
    isConfiguredCache = { value: status.configured, timestamp: Date.now() }
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
  history?: Array<{ role: string; content: string }>
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
  if (isCacheValid(isAvailableCache)) {
    return isAvailableCache!.value
  }

  try {
    const status = await checkChatStatus()
    isAvailableCache = { value: status.available, timestamp: Date.now() }

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
    isAvailableCache = { value: false, timestamp: Date.now() }
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
  isConfiguredCache = null
  isAvailableCache = null
  if (DEBUG_MODE) {
    console.log('🔄 Cache de chat reseteado')
  }
}
