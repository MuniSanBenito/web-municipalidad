// src/components/chatbot/conversationSync.ts

/**
 * Servicio de sincronización de conversaciones con la base de datos
 * Envía la conversación completa y los feedbacks a la API
 */

import { getConversationHistory } from './conversationHistory'
import { getAllFeedback, type FeedbackEntry } from './feedbackService'
import type { AIProvider, ConversationEntry } from './types'

// ===============================================
// CONFIGURACIÓN
// ===============================================

const API_ENDPOINT = '/api/chatbot-conversations'
const SYNC_DEBOUNCE_MS = 5000 // Esperar 5 segundos después del último mensaje para sincronizar
const MIN_MESSAGES_TO_SYNC = 2 // Mínimo de mensajes para iniciar sincronización

// ===============================================
// ESTADO
// ===============================================

let syncTimeout: NodeJS.Timeout | null = null
let lastSyncedAt = 0
let isSyncing = false

// ===============================================
// TIPOS PARA LA API
// ===============================================

interface MessageForAPI {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
  provider?: AIProvider
  feedback?: {
    rating?: 'positive' | 'negative'
    comment?: string
    submittedAt?: number
  }
}

interface ConversationForAPI {
  sessionId: string
  messages: MessageForAPI[]
  startedAt: number
  lastUpdated: number
  userAgent?: string
}

// ===============================================
// FUNCIONES AUXILIARES
// ===============================================

function getUserAgent(): string {
  if (typeof window === 'undefined') return ''
  return navigator.userAgent || ''
}

/**
 * Combina los mensajes del historial con los feedbacks
 * Asocia feedback por contenido de respuesta, ya que los IDs del historial
 * y del sistema de feedback se generan de forma independiente.
 */
function buildMessagesWithFeedback(
  entries: ConversationEntry[],
  feedbacks: FeedbackEntry[],
): MessageForAPI[] {
  // Crear mapa de feedbacks por contenido de respuesta para hacer match
  const feedbackByResponse = new Map<string, FeedbackEntry>()
  for (const fb of feedbacks) {
    if (fb.response) {
      feedbackByResponse.set(fb.response.trim(), fb)
    }
  }

  return entries.map((entry) => {
    const message: MessageForAPI = {
      id: entry.id,
      role: entry.role,
      content: entry.content,
      timestamp: entry.timestamp,
      provider: entry.provider,
    }

    // Buscar feedback para mensajes del asistente por contenido
    if (entry.role === 'assistant') {
      const feedback = feedbackByResponse.get(entry.content.trim())
      if (feedback && feedback.rating) {
        message.feedback = {
          rating: feedback.rating,
          comment: feedback.comment,
          submittedAt: feedback.timestamp,
        }
      }
    }

    return message
  })
}

// ===============================================
// FUNCIONES DE SINCRONIZACIÓN
// ===============================================

/**
 * Sincroniza la conversación actual con la base de datos
 */
export async function syncConversation(): Promise<boolean> {
  if (typeof window === 'undefined') return false
  if (isSyncing) return false

  const history = getConversationHistory()
  if (!history || history.entries.length < MIN_MESSAGES_TO_SYNC) {
    return false
  }

  isSyncing = true

  try {
    const feedbacks = getAllFeedback()
    const messages = buildMessagesWithFeedback(history.entries, feedbacks)

    const payload: ConversationForAPI = {
      sessionId: history.sessionId,
      messages,
      startedAt: history.startedAt,
      lastUpdated: history.lastUpdated,
      userAgent: getUserAgent(),
    }

    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      console.warn('Error sincronizando conversación:', response.status)
      return false
    }

    const result = await response.json()

    if (result.success) {
      lastSyncedAt = Date.now()
      console.log(`📤 Conversación sincronizada: ${result.action}, ${messages.length} mensajes`)
      return true
    }

    return false
  } catch (error) {
    console.warn('Error en sincronización de conversación:', error)
    return false
  } finally {
    isSyncing = false
  }
}

/**
 * Programa una sincronización con debounce
 * Se usa para no enviar demasiadas requests mientras el usuario escribe
 */
export function scheduleSyncConversation(): void {
  if (typeof window === 'undefined') return

  // Cancelar sincronización pendiente
  if (syncTimeout) {
    clearTimeout(syncTimeout)
  }

  // Programar nueva sincronización
  syncTimeout = setTimeout(() => {
    syncConversation()
  }, SYNC_DEBOUNCE_MS)
}

/**
 * Envía feedback de un mensaje específico a la API
 */
export async function syncFeedback(
  messageId: string,
  rating: 'positive' | 'negative',
  comment?: string,
): Promise<boolean> {
  if (typeof window === 'undefined') return false

  const history = getConversationHistory()
  if (!history) return false

  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionId: history.sessionId,
        messageId,
        rating,
        comment,
      }),
    })

    if (!response.ok) {
      console.warn('Error sincronizando feedback:', response.status)
      return false
    }

    const result = await response.json()

    if (result.success) {
      console.log(`📤 Feedback sincronizado: ${rating} para mensaje ${messageId}`)
      return true
    }

    return false
  } catch (error) {
    console.warn('Error en sincronización de feedback:', error)
    return false
  }
}

/**
 * Sincroniza inmediatamente (sin debounce)
 * Útil para cuando el usuario cierra la página
 */
export function syncConversationNow(): void {
  if (syncTimeout) {
    clearTimeout(syncTimeout)
    syncTimeout = null
  }

  // Usar sendBeacon si está disponible para no bloquear el cierre
  if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
    const history = getConversationHistory()
    if (!history || history.entries.length < MIN_MESSAGES_TO_SYNC) return

    const feedbacks = getAllFeedback()
    const messages = buildMessagesWithFeedback(history.entries, feedbacks)

    const payload: ConversationForAPI = {
      sessionId: history.sessionId,
      messages,
      startedAt: history.startedAt,
      lastUpdated: history.lastUpdated,
      userAgent: getUserAgent(),
    }

    navigator.sendBeacon(API_ENDPOINT, JSON.stringify(payload))
    console.log('📤 Conversación enviada con sendBeacon')
  } else {
    // Fallback: sincronización normal
    syncConversation()
  }
}

/**
 * Registra listener para sincronizar cuando el usuario cierra la página
 */
export function initConversationSync(): void {
  if (typeof window === 'undefined') return

  // Sincronizar al cerrar/recargar la página
  window.addEventListener('beforeunload', () => {
    syncConversationNow()
  })

  // Sincronizar al cambiar de pestaña (por si el usuario abandona)
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      syncConversationNow()
    }
  })

  console.log('📝 Sistema de sincronización de conversaciones inicializado')
}

// ===============================================
// UTILIDADES
// ===============================================

/**
 * Obtiene el estado de la última sincronización
 */
export function getSyncStatus(): {
  lastSyncedAt: number
  isSyncing: boolean
  hasPendingSync: boolean
} {
  return {
    lastSyncedAt,
    isSyncing,
    hasPendingSync: syncTimeout !== null,
  }
}

/**
 * Fuerza sincronización inmediata
 */
export function forceSync(): Promise<boolean> {
  if (syncTimeout) {
    clearTimeout(syncTimeout)
    syncTimeout = null
  }
  return syncConversation()
}
