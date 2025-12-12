// src/components/chatbot/aiService.tsx
/**
 * Servicio de IA del Chatbot
 * Este archivo actúa como wrapper que delega a aiServiceEnhanced.ts
 * Mantiene compatibilidad con el resto del código del chatbot
 */

import { fetchEnhancedAIResponse, getProviderStats } from './aiServiceEnhanced'

// Re-exportar funciones del servicio mejorado
export { fetchEnhancedAIResponse, getProviderStats }

/**
 * Obtiene una respuesta de la IA para la consulta del usuario
 * @param query La consulta del usuario
 * @returns Objeto con la respuesta y si se usó Gemini
 */
export async function fetchAIResponse(
  query: string,
): Promise<{ response: string; usedGemma: boolean }> {
  try {
    const result = await fetchEnhancedAIResponse(query)

    return {
      response: result.response,
      // usedGemma es true si se usó Gemini (mantener nombre por compatibilidad)
      usedGemma: result.provider === 'gemini',
    }
  } catch (error) {
    console.error('Error en fetchAIResponse:', error)
    return {
      response:
        'Lo siento, hubo un error al procesar tu consulta. Por favor, intentá de nuevo o contactá a la municipalidad al (0343) 4973454.',
      usedGemma: false,
    }
  }
}

/**
 * Alias para fetchAIResponse (compatibilidad)
 */
export const getAIResponse = fetchAIResponse
