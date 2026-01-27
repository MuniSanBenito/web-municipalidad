import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextResponse } from 'next/server'

/**
 * API Route para Gemini AI - Municipalidad de San Benito
 * 
 * NOTA IMPORTANTE: El modelo gemini-1.5-flash fue DISCONTINUADO por Google.
 * Se usa gemini-2.0-flash-lite que es el más eficiente para free tier.
 * Alternativas: gemini-2.0-flash, gemini-2.5-flash (si 2.0 falla)
 */

// Inicializar cliente de Gemini
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '')

// System Prompt - Personalidad del Asistente Municipal
const SYSTEM_INSTRUCTION = `Eres el Asistente Virtual Oficial de la Municipalidad de San Benito. Tu objetivo es ayudar a los vecinos con información clara sobre trámites, servicios y horarios.

Directrices:
- Tono: Profesional, empático y servicial.
- Formato: Usa listas y negritas (Markdown) para facilitar la lectura.
- Seguridad: Nunca inventes información. Si no sabes, deriva al teléfono oficial.

Datos Base (Contexto):
- Horario: Lunes a Viernes de 7:00 a 13:00hs.
- Ubicación: Municipalidad de San Benito.
- Temas permitidos: Impuestos, licencias, recolección de residuos, eventos.`

// Modelo a usar - gemini-2.0-flash-lite es el más eficiente para free tier
// NOTA: gemini-1.5-flash ya no existe en la API de Google (404)
const MODEL_NAME = 'gemini-2.0-flash-lite'

// Configurar modelo con system instruction
const model = genAI.getGenerativeModel({
  model: MODEL_NAME,
  systemInstruction: SYSTEM_INSTRUCTION,
})

/**
 * GET: Verificar estado del servicio Gemini
 */
export async function GET() {
  try {
    const isConfigured = Boolean(process.env.GOOGLE_API_KEY)

    if (!isConfigured) {
      return NextResponse.json({
        configured: false,
        available: false,
        model: MODEL_NAME,
        error: 'GOOGLE_API_KEY no configurada',
      })
    }

    // Prueba simple para verificar disponibilidad
    const result = await model.generateContent('Responde solo con OK')
    const response = result.response.text()

    return NextResponse.json({
      configured: true,
      available: response.length > 0,
      model: MODEL_NAME,
    })
  } catch (error) {
    console.error('Error en GET /api/gemini:', error)

    // Detectar error de cuota
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido'
    const isQuotaError =
      errorMessage.includes('429') ||
      errorMessage.includes('quota') ||
      errorMessage.includes('RESOURCE_EXHAUSTED')

    return NextResponse.json(
      {
        configured: true,
        available: false,
        model: MODEL_NAME,
        error: isQuotaError
          ? 'Sistema temporalmente ocupado. Intenta en unos minutos.'
          : errorMessage,
      },
      { status: isQuotaError ? 429 : 500 },
    )
  }
}

/**
 * POST: Generar respuesta con Gemini
 */
export async function POST(request: Request) {
  try {
    // Parsear body
    const body = await request.json()
    const { query } = body

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

    // Generar respuesta con Gemini
    const result = await model.generateContent(query.trim())
    const responseText = result.response.text()

    console.log('✅ Respuesta generada:', responseText.substring(0, 50) + '...')

    return NextResponse.json({
      success: true,
      response: responseText,
    })
  } catch (error) {
    console.error('❌ Error en POST /api/gemini:', error)

    // Detectar error de cuota (429)
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido'
    const isQuotaError =
      errorMessage.includes('429') ||
      errorMessage.includes('quota') ||
      errorMessage.includes('RESOURCE_EXHAUSTED')

    if (isQuotaError) {
      return NextResponse.json(
        {
          success: false,
          response:
            '🔄 El sistema está temporalmente ocupado debido a alta demanda. Por favor, intenta nuevamente en unos minutos o contacta directamente a la Municipalidad al (0343) 4973454.',
          error: 'Cuota excedida',
        },
        { status: 429 },
      )
    }

    return NextResponse.json(
      {
        success: false,
        response:
          'Lo siento, hubo un error al procesar tu consulta. Por favor, intenta de nuevo o contacta a la municipalidad al (0343) 4973454.',
        error: errorMessage,
      },
      { status: 500 },
    )
  }
}
