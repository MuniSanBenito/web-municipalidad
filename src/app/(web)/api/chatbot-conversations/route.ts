import config from '@payload-config'
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'

/**
 * API para guardar y actualizar conversaciones completas del chatbot
 *
 * POST - Crea o actualiza una conversación completa
 * PATCH - Actualiza feedback de un mensaje específico
 * GET - Obtiene estadísticas de conversaciones
 */

type TopicType =
  | 'rentas'
  | 'licencias'
  | 'obras'
  | 'habilitaciones'
  | 'deportes'
  | 'cav'
  | 'punto-digital'
  | 'area-mujer'
  | 'contacto'
  | 'horarios'
  | 'otro'
type SatisfactionType = 'positive' | 'mixed' | 'negative' | 'none'

interface MessageData {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
  provider?: string
  topic?: TopicType
  feedback?: {
    rating?: 'positive' | 'negative'
    comment?: string
    submittedAt?: number
  }
}

interface ConversationData {
  sessionId: string
  messages: MessageData[]
  startedAt: number
  lastUpdated: number
  userAgent?: string
}

function detectTopic(query: string): TopicType {
  const queryLower = query.toLowerCase()

  const topicPatterns: Record<string, RegExp> = {
    rentas: /renta|impuesto|tasa|pago|deuda|tgi|tribut/i,
    licencias: /licencia|conducir|carnet|carné|manejar|registro/i,
    obras: /obra|construccion|construir|plano|edificar|permiso.*obra/i,
    habilitaciones: /habilitacion|comercial|comercio|local|negocio/i,
    deportes: /deporte|futbol|voley|natacion|gimnasia|actividad.*fisica/i,
    cav: /reclamo|queja|bache|luz|basura|cav|vecino/i,
    'punto-digital': /biblioteca|punto.*digital|computadora|internet|taller/i,
    'area-mujer': /mujer|genero|violencia/i,
    contacto: /telefono|contacto|whatsapp|email|direccion/i,
    horarios: /horario|hora|atienden|abren|cierran/i,
  }

  for (const [topic, pattern] of Object.entries(topicPatterns)) {
    if (pattern.test(queryLower)) {
      return topic as TopicType
    }
  }

  return 'otro'
}

function calculateMainTopic(messages: MessageData[]): TopicType {
  const topicCounts: Record<string, number> = {}

  for (const msg of messages) {
    if (msg.role === 'user') {
      const topic = detectTopic(msg.content)
      topicCounts[topic] = (topicCounts[topic] || 0) + 1
    }
  }

  let mainTopic: TopicType = 'otro'
  let maxCount = 0

  for (const [topic, count] of Object.entries(topicCounts)) {
    if (count > maxCount && topic !== 'otro') {
      mainTopic = topic as TopicType
      maxCount = count
    }
  }

  return mainTopic
}

function calculateSatisfaction(messages: MessageData[]): SatisfactionType {
  let positive = 0
  let negative = 0

  for (const msg of messages) {
    if (msg.role === 'assistant' && msg.feedback?.rating) {
      if (msg.feedback.rating === 'positive') positive++
      if (msg.feedback.rating === 'negative') negative++
    }
  }

  if (positive === 0 && negative === 0) return 'none'
  if (positive > 0 && negative === 0) return 'positive'
  if (negative > 0 && positive === 0) return 'negative'
  return 'mixed'
}

/**
 * POST: Crear o actualizar una conversación completa
 */
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ConversationData
    const { sessionId, messages, startedAt, lastUpdated, userAgent } = body

    if (!sessionId || typeof sessionId !== 'string') {
      return NextResponse.json({ success: false, error: 'sessionId es requerido' }, { status: 400 })
    }

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ success: false, error: 'messages es requerido' }, { status: 400 })
    }

    const payload = await getPayload({ config })

    // Procesar mensajes para agregar topic a cada uno
    const processedMessages = messages.map((msg) => ({
      ...msg,
      topic: msg.role === 'user' ? detectTopic(msg.content) : msg.topic,
      content: msg.content.substring(0, 2000), // Limitar longitud
    }))

    // Calcular métricas
    const mainTopic = calculateMainTopic(processedMessages)
    const satisfaction = calculateSatisfaction(processedMessages)
    const messageCount = processedMessages.length

    // Buscar conversación existente
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const existing = await (payload as any).find({
      collection: 'chatbot-conversations',
      where: {
        sessionId: { equals: sessionId },
      },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      // Actualizar conversación existente
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const updated = await (payload as any).update({
        collection: 'chatbot-conversations',
        id: existing.docs[0].id,
        data: {
          messages: processedMessages,
          messageCount,
          mainTopic,
          satisfaction,
          lastUpdated: lastUpdated || Date.now(),
        },
      })

      return NextResponse.json({
        success: true,
        id: updated.id,
        action: 'updated',
        messageCount,
        mainTopic,
        satisfaction,
      })
    } else {
      // Crear nueva conversación
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const created = await (payload as any).create({
        collection: 'chatbot-conversations',
        data: {
          sessionId,
          messages: processedMessages,
          messageCount,
          mainTopic,
          satisfaction,
          startedAt: startedAt || Date.now(),
          lastUpdated: lastUpdated || Date.now(),
          userAgent: userAgent || '',
        },
      })

      return NextResponse.json({
        success: true,
        id: created.id,
        action: 'created',
        messageCount,
        mainTopic,
        satisfaction,
      })
    }
  } catch (error) {
    console.error('Error guardando conversación del chatbot:', error)
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 },
    )
  }
}

/**
 * PATCH: Actualizar feedback de un mensaje específico
 */
export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const { sessionId, messageId, rating, comment } = body

    if (!sessionId || !messageId) {
      return NextResponse.json(
        { success: false, error: 'sessionId y messageId son requeridos' },
        { status: 400 },
      )
    }

    const payload = await getPayload({ config })

    // Buscar conversación
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const existing = await (payload as any).find({
      collection: 'chatbot-conversations',
      where: {
        sessionId: { equals: sessionId },
      },
      limit: 1,
    })

    if (existing.docs.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Conversación no encontrada' },
        { status: 404 },
      )
    }

    const conversation = existing.docs[0]
    const messages = (conversation.messages || []) as MessageData[]

    // Buscar y actualizar el mensaje con el feedback
    const messageIndex = messages.findIndex((m) => m.id === messageId)

    if (messageIndex === -1) {
      return NextResponse.json({ success: false, error: 'Mensaje no encontrado' }, { status: 404 })
    }

    // Actualizar feedback del mensaje
    messages[messageIndex] = {
      ...messages[messageIndex],
      feedback: {
        rating,
        comment: comment || undefined,
        submittedAt: Date.now(),
      },
    }

    // Recalcular satisfacción general
    const satisfaction = calculateSatisfaction(messages)

    // Guardar cambios
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (payload as any).update({
      collection: 'chatbot-conversations',
      id: conversation.id,
      data: {
        messages,
        satisfaction,
        lastUpdated: Date.now(),
      },
    })

    return NextResponse.json({
      success: true,
      messageId,
      rating,
      satisfaction,
    })
  } catch (error) {
    console.error('Error actualizando feedback:', error)
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 },
    )
  }
}

/**
 * GET: Obtener estadísticas de conversaciones
 */
export async function GET() {
  try {
    const payload = await getPayload({ config })

    // Obtener conversaciones de los últimos 30 días
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const conversations = await (payload as any).find({
      collection: 'chatbot-conversations',
      where: {
        createdAt: {
          greater_than: thirtyDaysAgo.toISOString(),
        },
      },
      limit: 500,
      sort: '-createdAt',
    })

    // Calcular estadísticas
    const stats = {
      totalConversations: conversations.totalDocs,
      totalMessages: 0,
      byTopic: {} as Record<string, number>,
      bySatisfaction: {} as Record<string, number>,
      avgMessagesPerConversation: 0,
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    for (const conv of conversations.docs as any[]) {
      const msgCount = (conv.messageCount as number) || 0
      stats.totalMessages += msgCount

      const topic = (conv.mainTopic as string) || 'otro'
      stats.byTopic[topic] = (stats.byTopic[topic] || 0) + 1

      const satisfaction = (conv.satisfaction as string) || 'none'
      stats.bySatisfaction[satisfaction] = (stats.bySatisfaction[satisfaction] || 0) + 1
    }

    stats.avgMessagesPerConversation =
      conversations.totalDocs > 0 ? Math.round(stats.totalMessages / conversations.totalDocs) : 0

    // Últimas 10 conversaciones
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const recentConversations = (conversations.docs as any[]).slice(0, 10).map((conv) => ({
      sessionId: conv.sessionId,
      messageCount: conv.messageCount,
      mainTopic: conv.mainTopic,
      satisfaction: conv.satisfaction,
      createdAt: conv.createdAt,
    }))

    return NextResponse.json({
      success: true,
      stats,
      recentConversations,
    })
  } catch (error) {
    console.error('Error obteniendo stats de conversaciones:', error)
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 },
    )
  }
}
