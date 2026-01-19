import { askBeni, checkGeminiHealth, isGeminiServerConfigured } from '@/actions/geminiAction'
import { NextResponse } from 'next/server'

/**
 * API Route para Gemini AI
 * Conecta el servicio del cliente (geminiService.ts) con los Server Actions de Gemini
 */

/**
 * GET: Verificar estado del servicio Gemini
 * Retorna si está configurado y disponible
 */
export async function GET() {
  try {
    const configured = await isGeminiServerConfigured()

    if (!configured) {
      return NextResponse.json({
        configured: false,
        available: false,
        model: 'gemini-1.5-flash',
        error: 'API Key no configurada',
      })
    }

    const health = await checkGeminiHealth()

    return NextResponse.json({
      configured: true,
      available: health.available,
      model: health.model,
      error: health.error,
    })
  } catch (error) {
    console.error('Error en GET /api/gemini:', error)
    return NextResponse.json(
      {
        configured: false,
        available: false,
        model: 'gemini-1.5-flash',
        error: error instanceof Error ? error.message : 'Error desconocido',
      },
      { status: 500 },
    )
  }
}

/**
 * POST: Generar respuesta con Gemini
 * Recibe una query y retorna la respuesta de Beni
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { query } = body

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

    // Usar askBeni que es la función simplificada sin historial
    const result = await askBeni(query.trim())

    return NextResponse.json({
      success: result.success,
      response: result.response,
      error: result.error,
    })
  } catch (error) {
    console.error('Error en POST /api/gemini:', error)
    return NextResponse.json(
      {
        success: false,
        response:
          'Lo siento, hubo un error al procesar tu consulta. Por favor, intentá de nuevo o contactá a la municipalidad al (0343) 4973454.',
        error: error instanceof Error ? error.message : 'Error desconocido',
      },
      { status: 500 },
    )
  }
}
