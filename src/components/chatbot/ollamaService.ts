// src/components/chatbot/ollamaService.ts

/**
 * Servicio para interactuar con el modelo Gemma 2B en Ollama
 */

// URL base del servidor Ollama
const OLLAMA_API_URL = 'https://ollama.munisanbenito.gov.ar/api'

// Configuración para las solicitudes a Ollama
interface OllamaRequestOptions {
  model: string
  prompt: string
  stream?: boolean
  options?: {
    temperature?: number
    top_p?: number
    top_k?: number
    num_predict?: number
  }
}

interface OllamaResponse {
  model: string
  created_at: string
  response: string
  done: boolean
}

/**
 * Genera una respuesta utilizando el modelo Gemma 2B en Ollama
 * @param prompt Consulta del usuario
 * @returns Respuesta generada por el modelo
 */
export async function generateOllamaResponse(prompt: string): Promise<string> {
  try {
    // Disparar evento de inicio de actividad
    if (typeof window !== 'undefined') {
      window.ollamaActive = true
      window.dispatchEvent(new CustomEvent('ollamaActiveStart'))
    }

    // Preparar la consulta con contexto sobre la municipalidad
    const enhancedPrompt = `Eres Beni, el asistente virtual de la Municipalidad de San Benito, Entre Ríos, Argentina.
    
    INFORMACIÓN IMPORTANTE SOBRE LA MUNICIPALIDAD:
    - Ubicación: Blvd. Basalvibaso 1094, San Benito, Entre Ríos, Argentina
    - Horario principal: Lunes a Viernes de 7:00 a 13:00 hs
    - Teléfono: (0343) 497-3454
    - Email: Modernizacion@sanbenito.gob.ar
    - Intendente actual: Ariel Voeffray
    - Población aproximada: 17,000 habitantes
    
    TRÁMITES PRINCIPALES:
    - Licencia de Conducir: Requiere DNI, certificado de domicilio, aptitud psicofísica, fotos 4x4
    - Obras Privadas: Requiere planos firmados por profesional matriculado
    - Habilitaciones Comerciales: Requiere DNI, CUIT, título de propiedad o contrato de alquiler
    
    SERVICIOS DESTACADOS:
    - Actividades deportivas para todas las edades
    - Talleres culturales gratuitos
    - Punto digital con acceso a computadoras e internet
    - Biblioteca pública
    
    INSTRUCCIONES ESPECÍFICAS:
    - Responde de manera cordial, precisa y concisa
    - Prioriza información oficial de la municipalidad
    - Si no sabes algo, indícalo claramente y sugiere contactar directamente a la municipalidad
    - Mantén respuestas breves y directas, máximo 3-4 oraciones
    - Usa lenguaje simple y accesible para todos los ciudadanos
    
    Consulta del usuario: ${prompt}`

    const requestOptions: OllamaRequestOptions = {
      model: 'gemma:2b',
      prompt: enhancedPrompt,
      stream: false,
      options: {
        temperature: 0.7,
        top_p: 0.9,
        top_k: 40,
        num_predict: 256,
      },
    }

    const response = await fetch(`${OLLAMA_API_URL}/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestOptions),
    })

    if (!response.ok) {
      console.error('Error al conectar con Ollama:', response.status, response.statusText)
      throw new Error(`Error al conectar con Ollama: ${response.status}`)
    }

    const data: OllamaResponse = await response.json()

    // Disparar evento de fin de actividad
    if (typeof window !== 'undefined') {
      window.ollamaActive = false
      window.dispatchEvent(new CustomEvent('ollamaActiveEnd'))
    }

    return data.response.trim()
  } catch (error) {
    console.error('Error al generar respuesta con Ollama:', error)

    // Asegurarse de disparar el evento de fin en caso de error
    if (typeof window !== 'undefined') {
      window.ollamaActive = false
      window.dispatchEvent(new CustomEvent('ollamaActiveEnd'))
    }

    throw error
  }
}

/**
 * Verifica si el servidor Ollama está disponible
 * @returns true si el servidor está disponible, false en caso contrario
 */
export async function isOllamaAvailable(): Promise<boolean> {
  try {
    const response = await fetch(`${OLLAMA_API_URL}/version`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.ok
  } catch (error) {
    console.error('Error al verificar disponibilidad de Ollama:', error)
    return false
  }
}
