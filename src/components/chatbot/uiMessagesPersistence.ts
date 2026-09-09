// src/components/chatbot/uiMessagesPersistence.ts

/**
 * Persistencia de los mensajes UI del chatbot en sessionStorage.
 *
 * react-chatbot-kit acepta:
 *   - messageHistory: array inicial de mensajes a hidratar
 *   - saveMessages: callback que se invoca cada vez que cambia el historial
 *
 * Acá guardamos un snapshot serializable (sólo lo esencial) con TTL para
 * evitar mostrar conversaciones rancias y para respetar privacidad.
 *
 * IMPORTANTE: NO se persisten widgets ricos (botones, opciones), porque
 * los handlers de los widgets son funciones no serializables. Sólo los
 * mensajes de texto del bot/usuario y mensajes con widget de tipo seguro.
 */

import { STORAGE_KEYS, UI_MESSAGES_TTL } from './types'

interface SerializedMessage {
  message: string
  type: string
  id?: number | string
  loading?: boolean
  // Sólo widgets "seguros" cuyos props se reconstruyen vía mapStateToProps
  widget?: string
}

interface PersistedSnapshot {
  messages: SerializedMessage[]
  savedAt: number
}

// Lista blanca de widgets cuyo estado vive en `state` (vía mapStateToProps)
// y se rehidrata correctamente al montar el bot.
const SAFE_WIDGETS = new Set<string>([
  'smartSuggestions',
  'tramiteOptions',
  'generalOptions',
  'botAvatar',
])

/**
 * Filtra y serializa mensajes para persistir solo lo seguro.
 */
function serialize(messages: any[]): SerializedMessage[] {
  if (!Array.isArray(messages)) return []
  return messages
    .filter((m) => m && typeof m === 'object')
    .map((m) => {
      const out: SerializedMessage = {
        message: typeof m.message === 'string' ? m.message : '',
        type: typeof m.type === 'string' ? m.type : 'bot',
        id: m.id,
        loading: Boolean(m.loading),
      }
      if (m.widget && SAFE_WIDGETS.has(m.widget)) {
        out.widget = m.widget
      }
      return out
    })
    // Descartar mensajes vacíos sin widget (artefactos)
    .filter((m) => m.message.length > 0 || m.widget)
}

/**
 * Guarda mensajes en sessionStorage de forma segura (con manejo de errores).
 */
export function saveUIMessages(messages: any[]): void {
  if (typeof window === 'undefined') return

  try {
    const snapshot: PersistedSnapshot = {
      messages: serialize(messages),
      savedAt: Date.now(),
    }
    sessionStorage.setItem(STORAGE_KEYS.UI_MESSAGES, JSON.stringify(snapshot))
  } catch (error) {
    // Cuota excedida o error: ignorar silenciosamente, no es crítico
    if (process.env.NODE_ENV !== 'production') {
      console.warn('No se pudieron guardar mensajes UI:', error)
    }
  }
}

/**
 * Carga mensajes desde sessionStorage. Devuelve [] si:
 *   - estamos en SSR
 *   - no hay snapshot
 *   - el snapshot está expirado (> 24 hs)
 *   - el snapshot está corrupto
 */
export function loadUIMessages(): any[] {
  if (typeof window === 'undefined') return []

  try {
    const raw = sessionStorage.getItem(STORAGE_KEYS.UI_MESSAGES)
    if (!raw) return []

    const snapshot = JSON.parse(raw) as PersistedSnapshot
    if (!snapshot || !Array.isArray(snapshot.messages)) return []

    // TTL check
    if (Date.now() - snapshot.savedAt > UI_MESSAGES_TTL) {
      sessionStorage.removeItem(STORAGE_KEYS.UI_MESSAGES)
      return []
    }

    return snapshot.messages
  } catch {
    return []
  }
}

/**
 * Limpia los mensajes UI persistidos (ej: al limpiar conversación).
 */
export function clearUIMessages(): void {
  if (typeof window === 'undefined') return
  try {
    sessionStorage.removeItem(STORAGE_KEYS.UI_MESSAGES)
  } catch {
    // ignorar
  }
}

/**
 * Crea una versión throttled de saveUIMessages para no escribir en cada keystroke.
 */
export function createThrottledSaver(delayMs: number = 500): (messages: any[]) => void {
  let timer: ReturnType<typeof setTimeout> | null = null
  let pending: any[] | null = null

  return (messages: any[]) => {
    pending = messages
    if (timer) return
    timer = setTimeout(() => {
      if (pending) saveUIMessages(pending)
      pending = null
      timer = null
    }, delayMs)
  }
}
