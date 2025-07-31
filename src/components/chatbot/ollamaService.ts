// src/components/chatbot/ollamaService.ts

/**
 * Servicio para interactuar con el modelo Gemma 2B en Ollama
 */

// Tiempo máximo de espera para verificar disponibilidad (ms)
const AVAILABILITY_TIMEOUT = 5000

// URL base del servidor Ollama desde variable de entorno
// Para Next.js, las variables que se usan en el cliente deben tener el prefijo NEXT_PUBLIC_
const OLLAMA_API_URL = process.env.NEXT_PUBLIC_OLLAMA_ENDPOINT

// Bandera para activar modo de depuración
const DEBUG_MODE = true

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
    repeat_penalty?: number
    stop?: string[]
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

    // Preparar la consulta con contexto mejorado y validación
    const enhancedPrompt = `Eres Beni, el asistente virtual oficial de la Municipalidad de San Benito, Entre Ríos, Argentina.
    
    INFORMACIÓN OFICIAL VERIFICADA:
    - Ubicación: Blvd. Basalvibaso 1094, San Benito, Entre Ríos, Argentina
    - Horario principal: Lunes a Viernes de 7:00 a 13:00 hs
    - Teléfono principal: (0343) 497-2222
    - Mesa de entrada: (0343) 497-2345
    - Email: Modernizacion@sanbenito.gob.ar
    - Intendente actual: Ariel Voeffray
    - Población aproximada: 17,000 habitantes
    
    TRÁMITES PRINCIPALES CON REQUISITOS EXACTOS:
    - Licencia de Conducir: DNI original y fotocopia, certificado de domicilio, certificado de aptitud psicofísica, fotos 4x4 color, pago de tasa municipal ($5,000)
    - Obras Privadas: Plano firmado por profesional matriculado, título de propiedad o autorización, CUIT/CUIL del profesional, pago de tasas
    - Habilitaciones Comerciales: DNI y CUIT/CUIL, título de propiedad o contrato de alquiler, planos del local, habilitación Bomberos si corresponde
    
    SERVICIOS MUNICIPALES DISPONIBLES:
    - Actividades deportivas (Tel: 0343-497-2456)
    - Talleres culturales (Tel: 0343-497-2789)
    - Punto Digital y Biblioteca (Tel: 0343-497-3010)
    - Área de la Mujer (Tel: 0343-497-2567)
    - Área de Rentas (Tel: 0343-497-2678)
    - Obras Privadas (Tel: 0343-497-2890)
    
    REGLAS ESTRICTAS DE RESPUESTA:
    1. SOLO responde con información que está explícitamente listada arriba
    2. Si no tienes la información exacta, di: "No tengo esa información específica. Te recomiendo contactar directamente a la municipalidad al (0343) 497-2222"
    3. NO inventes horarios, costos, requisitos o procedimientos
    4. Mantén respuestas breves (máximo 3 oraciones)
    5. Siempre ofrece el teléfono correspondiente para más detalles
    6. Usa lenguaje claro y cordial
    
    Consulta del usuario: ${prompt}
    
    Respuesta (solo información verificada):`

    const requestOptions: OllamaRequestOptions = {
      model: 'gemma:2b',
      prompt: enhancedPrompt,
      stream: false,
      options: {
        temperature: 0.3, // Reducido para respuestas más consistentes
        top_p: 0.8, // Más conservador para evitar alucinaciones
        top_k: 20, // Reducido para mayor precisión
        num_predict: 150, // Respuestas más concisas
        repeat_penalty: 1.1, // Evitar repeticiones
        stop: ['\n\n', 'Usuario:', 'Consulta:'], // Parar en ciertos tokens
      },
    }

    if (DEBUG_MODE) {
      console.log('Enviando solicitud a Ollama:', `${OLLAMA_API_URL}/generate`)
      console.log('Opciones:', JSON.stringify(requestOptions, null, 2))
    }

    // Asegurarse de que la URL esté correctamente formada
    // La documentación indica que el endpoint correcto es /api/generate
    const apiUrl = `${OLLAMA_API_URL!.replace(/\/$/, '')}/api/generate`

    if (DEBUG_MODE) {
      console.log('URL final para la solicitud:', apiUrl)
    }

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(requestOptions),
      cache: 'no-store',
    })

    if (!response.ok) {
      console.error('Error al conectar con Ollama:', response.status, response.statusText)

      if (DEBUG_MODE) {
        try {
          const errorText = await response.text()
          console.error('Respuesta de error completa:', errorText)
        } catch (e) {
          console.error('No se pudo leer el cuerpo de la respuesta de error')
        }
      }

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
 * Verifica si el servicio de Ollama está disponible
 * @returns Promise<boolean> true si está disponible, false en caso contrario
 */
export async function isOllamaAvailable(): Promise<boolean> {
  try {
    // Construir la URL correcta para verificar disponibilidad
    const apiUrl = `${OLLAMA_API_URL!.replace(/\/$/, '')}/api/tags`

    if (DEBUG_MODE) {
      console.log('Verificando disponibilidad de Ollama en:', apiUrl)
    }

    // Usar AbortController para establecer un timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), AVAILABILITY_TIMEOUT)

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (DEBUG_MODE) {
      console.log('Estado de disponibilidad de Ollama:', response.status, response.ok)
    }

    return response.ok
  } catch (error) {
    console.error('Error al verificar disponibilidad de Ollama:', error)
    return false
  }
}

/**
 * Verifica si el servicio de Ollama está disponible
 * @returns Promise<boolean> true si está disponible, false en caso contrario
 */
export async function checkOllamaAvailability(): Promise<boolean> {
  // Usar la función isOllamaAvailable con cache
  const available = await isOllamaAvailable()

  if (DEBUG_MODE) {
    console.log(
      'Resultado de verificación de disponibilidad de Ollama:',
      available ? 'DISPONIBLE' : 'NO DISPONIBLE',
    )
  }

  return available
}
