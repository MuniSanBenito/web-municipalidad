import config from '@payload-config'
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'

/**
 * API para guardar y consultar analytics del chatbot
 * 
 * POST - Guarda una nueva consulta (público, llamado desde el chatbot)
 * GET - Obtiene estadísticas (requiere auth admin)
 */

// Detectar tema de la consulta automáticamente
type TopicType = 'rentas' | 'licencias' | 'obras' | 'habilitaciones' | 'deportes' | 'cav' | 'punto-digital' | 'area-mujer' | 'contacto' | 'horarios' | 'otro'

function detectTopic(query: string): TopicType {
  const queryLower = query.toLowerCase()
  
  const topicPatterns: Record<string, RegExp> = {
    'rentas': /renta|impuesto|tasa|pago|deuda|tgi|tribut/i,
    'licencias': /licencia|conducir|carnet|carné|manejar|registro/i,
    'obras': /obra|construccion|construir|plano|edificar|permiso.*obra/i,
    'habilitaciones': /habilitacion|comercial|comercio|local|negocio/i,
    'deportes': /deporte|futbol|voley|natacion|gimnasia|actividad.*fisica/i,
    'cav': /reclamo|queja|bache|luz|basura|cav|vecino/i,
    'punto-digital': /biblioteca|punto.*digital|computadora|internet|taller/i,
    'area-mujer': /mujer|genero|violencia/i,
    'contacto': /telefono|contacto|whatsapp|email|direccion/i,
    'horarios': /horario|hora|atienden|abren|cierran/i,
  }
  
  for (const [topic, pattern] of Object.entries(topicPatterns)) {
    if (pattern.test(queryLower)) {
      return topic as TopicType
    }
  }
  
  return 'otro'
}

/**
 * POST: Guardar una consulta del chatbot
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { query, response, provider, sessionId, responseTime, satisfaction, userAgent } = body

    // Validar campos requeridos
    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Query es requerida' },
        { status: 400 }
      )
    }

    // Detectar tema automáticamente
    const topic = detectTopic(query)

    // Obtener payload
    const payload = await getPayload({ config })

    // Crear registro
    const newQuery = await payload.create({
      collection: 'chatbot-queries',
      data: {
        query: query.substring(0, 500), // Limitar longitud
        response: response?.substring(0, 2000) || '',
        provider: provider || 'groq',
        satisfaction: satisfaction || 'none',
        topic,
        sessionId: sessionId || '',
        responseTime: responseTime || 0,
        userAgent: userAgent || '',
      },
    })

    return NextResponse.json({
      success: true,
      id: newQuery.id,
      topic,
    })
  } catch (error) {
    console.error('Error guardando query del chatbot:', error)
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

/**
 * GET: Obtener estadísticas del chatbot
 * Solo para uso interno (no requiere auth porque las stats son agregadas)
 */
export async function GET() {
  try {
    const payload = await getPayload({ config })

    // Obtener todas las queries de los últimos 30 días
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const queries = await payload.find({
      collection: 'chatbot-queries',
      where: {
        createdAt: {
          greater_than: thirtyDaysAgo.toISOString(),
        },
      },
      limit: 1000,
      sort: '-createdAt',
    })

    // Calcular estadísticas
    const stats = {
      total: queries.totalDocs,
      byProvider: {} as Record<string, number>,
      byTopic: {} as Record<string, number>,
      bySatisfaction: {} as Record<string, number>,
      avgResponseTime: 0,
    }

    let totalResponseTime = 0
    let responseTimeCount = 0

    for (const doc of queries.docs) {
      // Por proveedor
      const provider = (doc.provider as string) || 'unknown'
      stats.byProvider[provider] = (stats.byProvider[provider] || 0) + 1

      // Por tema
      const topic = (doc.topic as string) || 'otro'
      stats.byTopic[topic] = (stats.byTopic[topic] || 0) + 1

      // Por satisfacción
      const satisfaction = (doc.satisfaction as string) || 'none'
      stats.bySatisfaction[satisfaction] = (stats.bySatisfaction[satisfaction] || 0) + 1

      // Tiempo de respuesta promedio
      if (doc.responseTime && typeof doc.responseTime === 'number') {
        totalResponseTime += doc.responseTime
        responseTimeCount++
      }
    }

    stats.avgResponseTime = responseTimeCount > 0 
      ? Math.round(totalResponseTime / responseTimeCount) 
      : 0

    // Top 10 consultas más recientes
    const recentQueries = queries.docs.slice(0, 10).map(doc => ({
      query: doc.query,
      topic: doc.topic,
      provider: doc.provider,
      createdAt: doc.createdAt,
    }))

    return NextResponse.json({
      success: true,
      stats,
      recentQueries,
    })
  } catch (error) {
    console.error('Error obteniendo stats del chatbot:', error)
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
