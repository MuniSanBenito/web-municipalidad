import { SYSTEM_PROMPT } from '@/components/chatbot/knowledgeBaseEnhanced'
import { NextResponse } from 'next/server'

/**
 * API Route para Groq AI - Municipalidad de San Benito
 * Usa los modelos vigentes de Groq (gpt-oss / Qwen) para respuestas inteligentes
 *
 * FREE TIER LIMITS (Groq):
 * - 30 requests per minute
 * - 14,400 requests per day
 * - 6,000 tokens per minute
 */

// Variable de entorno para la API Key de Groq
export const API_KEY = process.env.GROQ_API_KEY || process.env.IA_API_KEY || ''

// Modelos en orden de preferencia (fallback ante rate limit o error)
export const MODELS = [
  'openai/gpt-oss-120b', // Reemplazo de llama-3.3-70b-versatile (deprecado ago 2026)
  'openai/gpt-oss-20b',
]
export const MODEL_NAME = MODELS[0]

// Endpoint de Groq (compatible con OpenAI)
export const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'

export { SYSTEM_PROMPT }

/**
 * GET: Verificar estado del servicio Groq
 */
export async function GET() {
  try {
    const isConfigured = Boolean(API_KEY)

    if (!isConfigured) {
      return NextResponse.json({
        configured: false,
        available: false,
        model: MODEL_NAME,
        provider: 'groq',
        error: 'GROQ_API_KEY no configurada',
      })
    }

    let lastError = 'Sin modelos disponibles'
    for (const model of MODELS) {
      const response = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model,
          messages: [{ role: 'user', content: 'Responde solo con OK' }],
          max_tokens: 10,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        lastError = `${model}: ${errorData.error?.message || `HTTP ${response.status}`}`
        console.warn(lastError)
        continue
      }

      return NextResponse.json({
        configured: true,
        available: true,
        model,
        provider: 'groq',
      })
    }

    throw new Error(lastError)
  } catch (error) {
    console.error('Error en GET /api/chat:', error)

    const errorMessage = error instanceof Error ? error.message : 'Error desconocido'
    const isRateLimited = errorMessage.includes('429') || errorMessage.includes('rate')

    return NextResponse.json(
      {
        configured: true,
        available: false,
        model: MODEL_NAME,
        provider: 'groq',
        error: isRateLimited
          ? 'Sistema temporalmente ocupado. Intenta en unos segundos.'
          : errorMessage,
      },
      { status: isRateLimited ? 429 : 500 },
    )
  }
}

/**
 * POST: Generar respuesta con Groq
 */
export async function POST(request: Request) {
  try {
    // Validar configuración
    if (!API_KEY) {
      return NextResponse.json(
        {
          success: false,
          response:
            'El servicio de IA no está configurado. Contactá a la Municipalidad al 343-4973454.',
          error: 'API Key no configurada',
        },
        { status: 503 },
      )
    }

    // Parsear body
    const body = await request.json()
    const { query, history } = body

    // Validar query
    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      return NextResponse.json(
        {
          success: false,
          response: 'Por favor, ingresa una consulta válida.',
          error: 'Query vacía o inválida',
        },
        { status: 400 },
      )
    }

    console.log('📨 Consulta recibida:', query.substring(0, 50) + '...')

    // Construir mensajes para el chat
    const messages: Array<{ role: string; content: string }> = [
      { role: 'system', content: SYSTEM_PROMPT },
    ]

    // Agregar historial si existe
    if (history && Array.isArray(history)) {
      for (const msg of history.slice(-6)) {
        // Últimos 6 mensajes
        messages.push({
          role: msg.role === 'user' ? 'user' : 'assistant',
          content: msg.content || msg.parts,
        })
      }
    }

    // Agregar la consulta actual
    messages.push({ role: 'user', content: query.trim() })

    // Llamar a Groq API con fallback de modelos
    let responseText = ''
    let lastError: Error | null = null

    for (const model of MODELS) {
      try {
        const response = await fetch(GROQ_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${API_KEY}`,
          },
          body: JSON.stringify({
            model,
            messages,
            max_tokens: 1024,
            temperature: 0.4,
            top_p: 0.9,
            reasoning_effort: 'low',
          }),
        })

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          const errorMsg = errorData.error?.message || `HTTP ${response.status}`

          // Rate limit en este modelo: probar el siguiente
          if (response.status === 429) {
            console.warn(`⚠️ Rate limit en modelo ${model}, probando siguiente...`)
            lastError = new Error('Rate limited')
            continue
          }

          throw new Error(errorMsg)
        }

        const data = await response.json()
        responseText = data.choices?.[0]?.message?.content || ''

        if (responseText) {
          console.log(`✅ Respuesta generada con modelo: ${model}`)
          break
        }
      } catch (modelError) {
        if (modelError instanceof Error && modelError.message === 'Rate limited') {
          continue
        }
        throw modelError
      }
    }

    // Si todos los modelos fallaron por rate limit
    if (!responseText && lastError?.message === 'Rate limited') {
      return NextResponse.json(
        {
          success: false,
          response:
            '🔄 El sistema está procesando muchas consultas. Por favor, esperá unos segundos e intentá de nuevo.',
          error: 'Rate limited en todos los modelos',
        },
        { status: 429 },
      )
    }

    console.log('✅ Respuesta generada:', responseText.substring(0, 50) + '...')

    return NextResponse.json({
      success: true,
      response: responseText,
      provider: 'groq',
      model: MODEL_NAME,
    })
  } catch (error) {
    console.error('❌ Error en POST /api/chat:', error)

    const errorMessage = error instanceof Error ? error.message : 'Error desconocido'

    return NextResponse.json(
      {
        success: false,
        response:
          'Lo siento, hubo un error al procesar tu consulta. Por favor, intenta de nuevo o contacta a la municipalidad al 343-4973454.',
        error: errorMessage,
      },
      { status: 500 },
    )
  }
}
