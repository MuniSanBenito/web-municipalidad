import { NextResponse } from 'next/server'
import { API_KEY, GROQ_API_URL, MODELS, SYSTEM_PROMPT } from '../route'

/**
 * API Route de STREAMING para Groq AI - Municipalidad de San Benito.
 *
 * Devuelve la respuesta token-por-token usando Server-Sent Events (SSE),
 * lo cual mejora drásticamente la sensación de velocidad. El cliente arma
 * la respuesta incrementalmente.
 *
 * Reusa el mismo SYSTEM_PROMPT y MODELS del endpoint no-streaming (route.ts)
 * para garantizar comportamiento idéntico.
 *
 * Formato SSE emitido:
 *   data: {"delta":"texto"}    ← chunk de texto
 *   data: {"done":true,"model":"..."}  ← fin del stream
 *   data: {"error":"..."}      ← error
 */

export const runtime = 'nodejs'

export async function POST(request: Request) {
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

  let body: any
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { success: false, error: 'Body inválido' },
      { status: 400 },
    )
  }

  const query: string = body?.query
  const history: Array<{ role: string; content: string }> | undefined = body?.history

  if (!query || typeof query !== 'string' || query.trim().length === 0) {
    return NextResponse.json(
      { success: false, error: 'Query vacía o inválida' },
      { status: 400 },
    )
  }

  const messages: Array<{ role: string; content: string }> = [
    { role: 'system', content: SYSTEM_PROMPT },
  ]
  if (history && Array.isArray(history)) {
    for (const msg of history.slice(-6)) {
      messages.push({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content || (msg as any).parts || '',
      })
    }
  }
  messages.push({ role: 'user', content: query.trim() })

  // Intenta cada modelo en orden hasta que uno responda OK (no rate-limited).
  let upstreamResp: Response | null = null
  let modelUsed = ''
  for (const model of MODELS) {
    const r = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model,
        messages,
        max_tokens: 512,
        temperature: 0.4,
        top_p: 0.9,
        stream: true,
      }),
    })
    if (r.ok && r.body) {
      upstreamResp = r
      modelUsed = model
      break
    }
    // 429: probar siguiente modelo
    if (r.status !== 429) {
      const errData = await r.json().catch(() => ({}))
      return NextResponse.json(
        {
          success: false,
          error: errData.error?.message || `HTTP ${r.status}`,
        },
        { status: r.status },
      )
    }
  }

  if (!upstreamResp || !upstreamResp.body) {
    return NextResponse.json(
      {
        success: false,
        response:
          '🔄 El sistema está procesando muchas consultas. Esperá unos segundos e intentá de nuevo.',
        error: 'Rate limited en todos los modelos',
      },
      { status: 429 },
    )
  }

  // Re-emitimos como SSE simplificado: parseamos el SSE de Groq y emitimos
  // sólo los deltas de contenido, ignorando metadata.
  const encoder = new TextEncoder()
  const decoder = new TextDecoder()

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const reader = upstreamResp!.body!.getReader()
      let buffer = ''

      const send = (obj: Record<string, unknown>) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(obj)}\n\n`))
      }

      try {
        while (true) {
          const { value, done } = await reader.read()
          if (done) break
          buffer += decoder.decode(value, { stream: true })

          // Cada evento SSE de Groq termina en \n\n
          const events = buffer.split('\n\n')
          buffer = events.pop() || ''

          for (const evt of events) {
            const line = evt.trim()
            if (!line.startsWith('data:')) continue
            const payload = line.slice(5).trim()
            if (payload === '[DONE]') {
              send({ done: true, model: modelUsed })
              continue
            }
            try {
              const parsed = JSON.parse(payload)
              const delta = parsed?.choices?.[0]?.delta?.content
              if (typeof delta === 'string' && delta.length > 0) {
                send({ delta })
              }
            } catch {
              // ignorar líneas SSE no-JSON
            }
          }
        }
        send({ done: true, model: modelUsed })
      } catch (err) {
        send({ error: err instanceof Error ? err.message : 'stream error' })
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
      'X-Accel-Buffering': 'no', // desactivar buffering en proxies
    },
  })
}
