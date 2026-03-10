import { NextResponse } from 'next/server'

/**
 * API Route para Groq AI - Municipalidad de San Benito
 * Usa Llama 3.3 70B Versatile para respuestas inteligentes
 * 
 * FREE TIER LIMITS (Groq):
 * - 30 requests per minute
 * - 14,400 requests per day
 * - 6,000 tokens per minute
 */

// Variable de entorno para la API Key de Groq
const API_KEY = process.env.GROQ_API_KEY || process.env.IA_API_KEY || ''

// Modelo a usar - Llama 3.3 70B es muy capaz y gratuito
const MODEL_NAME = 'llama-3.3-70b-versatile'

// Endpoint de Groq (compatible con OpenAI)
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'

// System Prompt - Personalidad del Asistente Municipal
const SYSTEM_PROMPT = `Eres Beni, el asistente virtual oficial de la Municipalidad de San Benito, Entre Ríos, Argentina.
Tu personalidad es amigable, servicial y profesional. Usás lenguaje coloquial argentino (vos, podés, etc.).

INFORMACIÓN OFICIAL VERIFICADA DE LA MUNICIPALIDAD (Actualizado Febrero 2026):

📍 UBICACIÓN Y CONTACTO GENERAL:
- Dirección: Basavilbaso 1094, San Benito, Entre Ríos, Argentina
- Horario principal: Lunes a Viernes de 7:00 a 13:00 hs
- Teléfono principal: 343-4973454
- Email principal: presidencia@munisanbenito.gov.ar
- Intendente actual: Ariel Voeffray

📞 NÚMEROS DE EMERGENCIA:
- Policía y Bomberos: 911
- Emergencias Médicas: 107
- Defensa Civil: 103
- Violencia de Género: 144

📱 WHATSAPP POR ÁREA:
- Rentas: 3436127015 | Email: rentas@munisanbenito.gov.ar
- Licencias de Conducir: 3436127014
- Centro Atención Vecino (CAV): 3436127013
- Obras Privadas: 3434681033 | Email: opriv.sanbenito@gmail.com
- Habilitaciones: 3434537319 | Email: habilitaciones@munisanbenito.gov.ar
- Actividades Deportivas: 5493434682745
- Punto Digital/Biblioteca: 3434508085
- Área Mujer: 3435204239
- Producción y Empleo: 3434470379
- Tercera Edad y Discapacidad: 3433027297

💰 RENTAS:
- Sistema online: http://sigem.sanbenito.gob.ar/ingresospublicos/ingresospublicos.aspx
- Tasas: TGI, Tasa Higiene Profilaxis y Seguridad, Obras Sanitarias

🚗 LICENCIA DE CONDUCIR:
- WhatsApp: 3436127014
- Requisitos: Grupo sanguíneo, DNI, CUIL, CENAT, Examen psicofísico, Curso Educación Vial
- Pruebas prácticas: Parque Lineal San Benito (Calle Brasil)

🏗️ OBRAS PRIVADAS:
- Directora: Ing. Sara Carina Zapata
- Horario: Lunes a Viernes 7:30 a 12:30 hs
- WhatsApp: 3434681033 (solo mensajes)

⚽ ACTIVIDADES DEPORTIVAS (GRATUITAS):
- Inscripción: https://forms.gle/6v12MovAy6AeCxTJ9
- WhatsApp: 5493434682745

📚 PUNTO DIGITAL Y BIBLIOTECA "Santiago Tórtul":
- Ubicación: Friuli 1051
- Talleres: Inglés, Portugués, Programación, Robótica, Yoga
- WhatsApp: 3434508085

💜 ÁREA MUJER Y GÉNERO:
- Ubicación: NIDO (Buenos Aires y Misiones)
- WhatsApp: 3435204239

📋 CAV (Centro Atención Vecino):
- WhatsApp: 3436127013
- Función: Recepción de reclamos (baches, alumbrado, limpieza, etc.)

REGLAS PARA TUS RESPUESTAS:
1. ✅ SOLO usa información de este documento
2. ✅ Respuestas CONCISAS (3-5 líneas máximo)
3. ✅ SIEMPRE incluí el contacto relevante (teléfono/WhatsApp/email)
4. ✅ Usá emojis para hacer el mensaje más visual
5. ✅ Si no tenés la info exacta: "No tengo esa información específica. Contactá a [área] al [contacto]"
6. ❌ NUNCA inventes datos, horarios o teléfonos
7. ❌ NUNCA uses "creo que", "posiblemente", "aproximadamente"
8. ✅ Estructurá con bullets cuando haya varios items`

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

    // Prueba simple para verificar disponibilidad
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL_NAME,
        messages: [{ role: 'user', content: 'Responde solo con OK' }],
        max_tokens: 10,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error?.message || `HTTP ${response.status}`)
    }

    const data = await response.json()
    const text = data.choices?.[0]?.message?.content || ''

    return NextResponse.json({
      configured: true,
      available: text.length > 0,
      model: MODEL_NAME,
      provider: 'groq',
    })
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
 * POST: Generar respuesta con Groq/Llama
 */
export async function POST(request: Request) {
  try {
    // Validar configuración
    if (!API_KEY) {
      return NextResponse.json(
        {
          success: false,
          response: 'El servicio de IA no está configurado. Contactá a la Municipalidad al 343-4973454.',
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
      for (const msg of history.slice(-6)) { // Últimos 6 mensajes
        messages.push({
          role: msg.role === 'user' ? 'user' : 'assistant',
          content: msg.content || msg.parts,
        })
      }
    }

    // Agregar la consulta actual
    messages.push({ role: 'user', content: query.trim() })

    // Llamar a Groq API
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL_NAME,
        messages,
        max_tokens: 1024,
        temperature: 0.7,
        top_p: 0.9,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      const errorMsg = errorData.error?.message || `HTTP ${response.status}`

      // Detectar rate limiting
      if (response.status === 429) {
        return NextResponse.json(
          {
            success: false,
            response: '🔄 El sistema está procesando muchas consultas. Por favor, esperá unos segundos e intentá de nuevo.',
            error: 'Rate limited',
          },
          { status: 429 },
        )
      }

      throw new Error(errorMsg)
    }

    const data = await response.json()
    const responseText = data.choices?.[0]?.message?.content || ''

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
        response: 'Lo siento, hubo un error al procesar tu consulta. Por favor, intenta de nuevo o contacta a la municipalidad al 343-4973454.',
        error: errorMessage,
      },
      { status: 500 },
    )
  }
}
