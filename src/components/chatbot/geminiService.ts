// src/components/chatbot/geminiService.ts
/**
 * Cliente para el servicio de Gemini
 * Llama a la API Route /api/gemini para mantener la API Key segura en el servidor
 */

const DEBUG_MODE = true
const API_ENDPOINT = '/api/gemini'

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
 * Verifica el estado del servicio Gemini
 */
async function checkGeminiStatus(): Promise<{
  configured: boolean
  available: boolean
  model: string
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
    console.error('Error verificando Gemini:', error)
    return {
      configured: false,
      available: false,
      model: 'gemini-1.5-flash',
      error: error instanceof Error ? error.message : 'Error de conexión',
    }
  }
}

/**
 * Verifica si Gemini está configurado (API key presente en servidor)
 */
export async function isGeminiConfigured(): Promise<boolean> {
  if (isCacheValid(isConfiguredCache)) {
    return isConfiguredCache!.value
  }

  try {
    const status = await checkGeminiStatus()
    isConfiguredCache = { value: status.configured, timestamp: Date.now() }
    if (DEBUG_MODE) {
      console.log(`🔧 Gemini configurado: ${status.configured}`)
    }
    return status.configured
  } catch (error) {
    console.error('Error verificando configuración de Gemini:', error)
    return false
  }
}

/**
 * Genera una respuesta usando Google Gemini API
 */
export async function generateGeminiResponse(userQuery: string): Promise<string> {
  try {
    if (DEBUG_MODE) {
      console.log('🤖 Generando respuesta con Gemini...')
    }

    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: userQuery }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`)
    }

    const data = await response.json()

    if (!data.success) {
      throw new Error(data.error || 'Error al generar respuesta')
    }

    if (DEBUG_MODE) {
      console.log('✅ Respuesta de Gemini generada:', data.response.substring(0, 100) + '...')
    }

    return data.response
  } catch (error) {
    console.error('❌ Error al generar respuesta con Gemini:', error)
    throw error
  }
}

/**
 * Verifica si el servicio de Gemini está disponible
 */
export async function isGeminiAvailable(): Promise<boolean> {
  if (isCacheValid(isAvailableCache)) {
    return isAvailableCache!.value
  }

  try {
    const status = await checkGeminiStatus()
    isAvailableCache = { value: status.available, timestamp: Date.now() }

    if (DEBUG_MODE) {
      if (status.available) {
        console.log(`✅ Gemini está disponible (modelo: ${status.model})`)
      } else {
        console.log(`⚠️ Gemini no está disponible: ${status.error}`)
      }
    }

    return status.available
  } catch (error) {
    console.error('❌ Error verificando disponibilidad de Gemini:', error)
    isAvailableCache = { value: false, timestamp: Date.now() }
    return false
  }
}

/**
 * Obtiene información sobre el estado del servicio
 */
export async function getGeminiStatus(): Promise<{
  configured: boolean
  modelName: string
  available: boolean
}> {
  const status = await checkGeminiStatus()

  return {
    configured: status.configured,
    modelName: status.model,
    available: status.available,
  }
}

/**
 * Resetea el cache de estado
 */
export function resetGeminiCache(): void {
  isConfiguredCache = null
  isAvailableCache = null
  if (DEBUG_MODE) {
    console.log('🔄 Cache de Gemini reseteado')
  }
}
