import { SYSTEM_PROMPT } from '@/components/chatbot/knowledgeBaseEnhanced'
import { API_KEY, GROQ_API_URL, MODELS } from '../route'

export const runtime = 'nodejs'

function sse(payload: unknown) {
  return `data: ${JSON.stringify(payload)}\n\n`
}

/**
 * POST: misma base que /api/chat, en streaming.
 * El cliente espera eventos { delta }, { done } o { error }.
 */
export async function POST(request: Request) {
  if (!API_KEY) {
    return new Response(sse({ error: 'API Key no configurada' }), {
      status: 503,
      headers: { 'Content-Type': 'text/event-stream; charset=utf-8' },
    })
  }

  let query = ''
  let history: Array<{ role?: string; content?: string; parts?: string }> = []
  try {
    const body = await request.json()
    query = typeof body?.query === 'string' ? body.query.trim() : ''
    if (Array.isArray(body?.history)) history = body.history
  } catch {
    return new Response(sse({ error: 'Body inválido' }), {
      status: 400,
      headers: { 'Content-Type': 'text/event-stream; charset=utf-8' },
    })
  }

  if (!query) {
    return new Response(sse({ error: 'Query vacía o inválida' }), {
      status: 400,
      headers: { 'Content-Type': 'text/event-stream; charset=utf-8' },
    })
  }

  const messages: Array<{ role: string; content: string }> = [
    { role: 'system', content: SYSTEM_PROMPT },
  ]
  for (const msg of history.slice(-6)) {
    const content = msg.content || msg.parts
    if (!content) continue
    messages.push({
      role: msg.role === 'user' ? 'user' : 'assistant',
      content,
    })
  }
  messages.push({ role: 'user', content: query })

  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    async start(controller) {
      const send = (payload: unknown) => {
        controller.enqueue(encoder.encode(sse(payload)))
      }

      try {
        let upstream: Response | null = null
        let lastStatus = 500

        for (const model of MODELS) {
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
              stream: true,
            }),
          })

          if (response.status === 429) {
            lastStatus = 429
            continue
          }

          if (!response.ok || !response.body) {
            lastStatus = response.status
            continue
          }

          upstream = response
          break
        }

        if (!upstream?.body) {
          send({
            error:
              lastStatus === 429
                ? 'Sistema temporalmente ocupado. Intentá en unos segundos.'
                : 'No se pudo generar la respuesta.',
          })
          return
        }

        const reader = upstream.body.getReader()
        const decoder = new TextDecoder()
        let buffer = ''

        while (true) {
          const { value, done } = await reader.read()
          if (done) break
          buffer += decoder.decode(value, { stream: true })
          const lines = buffer.split('\n')
          buffer = lines.pop() || ''

          for (const line of lines) {
            const trimmed = line.trim()
            if (!trimmed.startsWith('data:')) continue
            const data = trimmed.slice(5).trim()
            if (!data || data === '[DONE]') continue
            try {
              const json = JSON.parse(data)
              const delta = json.choices?.[0]?.delta?.content
              if (typeof delta === 'string' && delta.length > 0) {
                send({ delta })
              }
            } catch {
              // línea parcial o keep-alive
            }
          }
        }

        send({ done: true })
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Error desconocido'
        send({ error: message })
      } finally {
        controller.close()
      }
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  })
}
