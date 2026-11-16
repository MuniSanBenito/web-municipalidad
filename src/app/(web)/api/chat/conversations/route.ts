import config from '@/payload.config'
import type { ChatbotConversation } from '@/payload-types'
import { getPayload } from 'payload'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

type Topic = NonNullable<ChatbotConversation['mainTopic']>
type Satisfaction = NonNullable<ChatbotConversation['satisfaction']>
type StoredMessage = NonNullable<ChatbotConversation['messages']>[number]
type Provider = NonNullable<StoredMessage['provider']>

const TOPICS: Array<[RegExp, Topic]> = [
  [/rentas|impuesto|tasa|tgi/i, 'rentas'],
  [/licencia|conducir|carnet/i, 'licencias'],
  [/obra|construcci[oó]n|plano/i, 'obras'],
  [/habilitaci[oó]n|comercio/i, 'habilitaciones'],
  [/deporte/i, 'deportes'],
  [/\bcav\b|reclamo/i, 'cav'],
  [/punto digital|biblioteca/i, 'punto-digital'],
  [/mujer|g[eé]nero/i, 'area-mujer'],
  [/horario|atienden/i, 'horarios'],
  [/contacto|tel[eé]fono|direcci[oó]n/i, 'contacto'],
]

const PROVIDERS = new Set<Provider>(['knowledge-base', 'groq', 'fallback'])

function asTopic(text: string): Topic {
  const counts = new Map<Topic, number>()
  for (const [pattern, topic] of TOPICS) {
    if (pattern.test(text)) counts.set(topic, (counts.get(topic) ?? 0) + 1)
  }
  let best: Topic = 'otro'
  let bestCount = 0
  for (const [topic, count] of counts) {
    if (count > bestCount) {
      best = topic
      bestCount = count
    }
  }
  return best
}

function satisfactionOf(messages: StoredMessage[]): Satisfaction {
  const ratings = messages
    .map((message) => message.feedback?.rating)
    .filter(
      (rating): rating is 'positive' | 'negative' => rating === 'positive' || rating === 'negative',
    )

  if (ratings.length === 0) return 'none'
  const positives = ratings.filter((rating) => rating === 'positive').length
  if (positives === ratings.length) return 'positive'
  if (positives === 0) return 'negative'
  return 'mixed'
}

function parseMessages(value: unknown): StoredMessage[] | null {
  if (!Array.isArray(value) || value.length === 0) return null

  const messages: StoredMessage[] = []
  for (const item of value.slice(-50)) {
    if (!item || typeof item !== 'object') return null
    const raw = item as Record<string, unknown>
    const role = raw.role === 'user' || raw.role === 'assistant' ? raw.role : null
    const content = typeof raw.content === 'string' ? raw.content.trim().slice(0, 8000) : ''
    const id = typeof raw.id === 'string' ? raw.id.slice(0, 80) : ''
    const timestamp = typeof raw.timestamp === 'number' ? raw.timestamp : Date.now()
    if (!role || !content || !id) return null

    const message: StoredMessage = { id, role, content, timestamp }
    const provider = raw.provider === 'gemini' ? 'groq' : raw.provider
    if (typeof provider === 'string' && PROVIDERS.has(provider as Provider)) {
      message.provider = provider as Provider
    }

    if (raw.feedback && typeof raw.feedback === 'object') {
      const feedback = raw.feedback as Record<string, unknown>
      const rating =
        feedback.rating === 'positive' || feedback.rating === 'negative'
          ? feedback.rating
          : undefined
      if (rating) {
        message.feedback = {
          rating,
          comment:
            typeof feedback.comment === 'string' ? feedback.comment.slice(0, 500) : undefined,
          submittedAt: typeof feedback.submittedAt === 'number' ? feedback.submittedAt : Date.now(),
        }
      }
    }

    messages.push(message)
  }

  return messages.length > 0 ? messages : null
}

/**
 * Upsert de una conversación por sessionId.
 * La REST de Payload no actualiza por campo único y el cliente no puede leer el id.
 */
export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Body inválido' }, { status: 400 })
  }

  const raw = body && typeof body === 'object' ? (body as Record<string, unknown>) : null
  const sessionId = typeof raw?.sessionId === 'string' ? raw.sessionId.trim() : ''
  if (!/^session_[0-9]+_[a-z0-9]+$/i.test(sessionId)) {
    return NextResponse.json({ success: false, error: 'sessionId inválido' }, { status: 400 })
  }

  const messages = parseMessages(raw?.messages)
  if (!messages) {
    return NextResponse.json({ success: false, error: 'Mensajes inválidos' }, { status: 400 })
  }

  const userText = messages
    .filter((message) => message.role === 'user')
    .map((message) => message.content)
    .join('\n')

  const data: Omit<ChatbotConversation, 'id' | 'updatedAt' | 'createdAt'> = {
    sessionId,
    messages,
    messageCount: messages.length,
    mainTopic: asTopic(userText),
    satisfaction: satisfactionOf(messages),
    startedAt: typeof raw?.startedAt === 'number' ? raw.startedAt : messages[0]?.timestamp,
    lastUpdated: typeof raw?.lastUpdated === 'number' ? raw.lastUpdated : Date.now(),
    userAgent: typeof raw?.userAgent === 'string' ? raw.userAgent.slice(0, 300) : undefined,
  }

  try {
    const payload = await getPayload({ config })
    const existing = await payload.find({
      collection: 'chatbot-conversations',
      where: { sessionId: { equals: sessionId } },
      limit: 1,
      depth: 0,
      overrideAccess: true,
    })

    const current = existing.docs[0]
    if (current) {
      await payload.update({
        collection: 'chatbot-conversations',
        id: current.id,
        data,
        overrideAccess: true,
      })
      return NextResponse.json({ success: true, action: 'updated' })
    }

    try {
      await payload.create({
        collection: 'chatbot-conversations',
        data,
        overrideAccess: true,
      })
      return NextResponse.json({ success: true, action: 'created' })
    } catch (error) {
      const again = await payload.find({
        collection: 'chatbot-conversations',
        where: { sessionId: { equals: sessionId } },
        limit: 1,
        depth: 0,
        overrideAccess: true,
      })
      const raced = again.docs[0]
      if (!raced) throw error
      await payload.update({
        collection: 'chatbot-conversations',
        id: raced.id,
        data,
        overrideAccess: true,
      })
      return NextResponse.json({ success: true, action: 'updated' })
    }
  } catch (error) {
    console.error('Error guardando conversación del chatbot:', error)
    return NextResponse.json({ success: false, error: 'No se pudo guardar' }, { status: 500 })
  }
}
