// src/components/chatbot/conversationHistory.ts

/**
 * Sistema de persistencia del historial de conversación
 * Guarda y recupera el historial usando sessionStorage
 */

import type { AIProvider, ConversationEntry, ConversationHistory } from './types'
import { STORAGE_KEYS } from './types'

// Configuración del historial
const MAX_ENTRIES = 50 // Máximo de entradas a guardar
const SESSION_TTL = 30 * 60 * 1000 // 30 minutos de inactividad máxima

// Estado en memoria
let currentHistory: ConversationHistory | null = null

/**
 * Genera un ID único para la sesión
 */
function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
}

/**
 * Genera un ID único para una entrada
 */
function generateEntryId(): string {
  return `entry_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
}

/**
 * Inicializa o recupera el historial de conversación
 */
export function initConversationHistory(): ConversationHistory {
  if (typeof window === 'undefined') {
    return createNewHistory()
  }

  try {
    const stored = sessionStorage.getItem(STORAGE_KEYS.CONVERSATION_HISTORY)

    if (stored) {
      const parsed = JSON.parse(stored) as ConversationHistory
      const now = Date.now()

      // Verificar si la sesión expiró
      if (now - parsed.lastUpdated > SESSION_TTL) {
        console.log('📝 Sesión de chat expirada, iniciando nueva...')
        return createNewHistory()
      }

      currentHistory = parsed
      console.log(`📝 Historial recuperado: ${parsed.entries.length} mensajes`)
      return parsed
    }
  } catch (error) {
    console.warn('Error al recuperar historial:', error)
  }

  return createNewHistory()
}

/**
 * Crea un nuevo historial vacío
 */
function createNewHistory(): ConversationHistory {
  const history: ConversationHistory = {
    entries: [],
    sessionId: generateSessionId(),
    startedAt: Date.now(),
    lastUpdated: Date.now(),
  }

  currentHistory = history
  saveHistory()
  return history
}

/**
 * Guarda el historial en sessionStorage
 */
function saveHistory(): void {
  if (typeof window === 'undefined' || !currentHistory) return

  try {
    // Limitar número de entradas
    if (currentHistory.entries.length > MAX_ENTRIES) {
      currentHistory.entries = currentHistory.entries.slice(-MAX_ENTRIES)
    }

    currentHistory.lastUpdated = Date.now()
    sessionStorage.setItem(STORAGE_KEYS.CONVERSATION_HISTORY, JSON.stringify(currentHistory))
  } catch (error) {
    console.warn('Error al guardar historial:', error)
    // Si hay error de cuota, limpiar entradas antiguas
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      currentHistory.entries = currentHistory.entries.slice(-10)
      try {
        sessionStorage.setItem(STORAGE_KEYS.CONVERSATION_HISTORY, JSON.stringify(currentHistory))
      } catch {
        // Si sigue fallando, no guardar
      }
    }
  }
}

/**
 * Agrega un mensaje del usuario al historial
 * @param content - Contenido del mensaje
 * @param customId - ID opcional para usar en lugar del generado automáticamente
 */
export function addUserMessage(content: string, customId?: string): ConversationEntry {
  if (!currentHistory) {
    initConversationHistory()
  }

  const entry: ConversationEntry = {
    id: customId || generateEntryId(),
    role: 'user',
    content,
    timestamp: Date.now(),
  }

  currentHistory!.entries.push(entry)
  saveHistory()

  return entry
}

/**
 * Agrega una respuesta del asistente al historial
 * @param content - Contenido del mensaje
 * @param provider - Proveedor de IA que generó la respuesta
 * @param customId - ID opcional para usar en lugar del generado automáticamente (usado para tracking de feedback)
 */
export function addAssistantMessage(
  content: string,
  provider?: AIProvider,
  customId?: string,
): ConversationEntry {
  if (!currentHistory) {
    initConversationHistory()
  }

  const entry: ConversationEntry = {
    id: customId || generateEntryId(),
    role: 'assistant',
    content,
    timestamp: Date.now(),
    provider,
  }

  currentHistory!.entries.push(entry)
  saveHistory()

  return entry
}

/**
 * Obtiene el historial actual
 */
export function getConversationHistory(): ConversationHistory | null {
  if (!currentHistory) {
    initConversationHistory()
  }
  return currentHistory
}

/**
 * Obtiene las últimas N entradas del historial
 */
export function getRecentHistory(count: number = 10): ConversationEntry[] {
  if (!currentHistory) {
    initConversationHistory()
  }
  return currentHistory?.entries.slice(-count) || []
}

/**
 * Obtiene el contexto de conversación para enviar a la IA
 * Formato optimizado para prompts
 */
export function getContextForAI(maxEntries: number = 6): string {
  const recent = getRecentHistory(maxEntries)

  if (recent.length === 0) return ''

  return recent
    .map((entry) => {
      const role = entry.role === 'user' ? 'Usuario' : 'Asistente'
      return `${role}: ${entry.content}`
    })
    .join('\n')
}

/**
 * Obtiene el último mensaje del usuario
 */
export function getLastUserMessage(): ConversationEntry | null {
  if (!currentHistory) return null

  const userMessages = currentHistory.entries.filter((e) => e.role === 'user')
  return userMessages[userMessages.length - 1] || null
}

/**
 * Obtiene la última respuesta del asistente
 */
export function getLastAssistantMessage(): ConversationEntry | null {
  if (!currentHistory) return null

  const assistantMessages = currentHistory.entries.filter((e) => e.role === 'assistant')
  return assistantMessages[assistantMessages.length - 1] || null
}

/**
 * Limpia el historial de la sesión actual
 */
export function clearHistory(): void {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem(STORAGE_KEYS.CONVERSATION_HISTORY)
  }
  currentHistory = createNewHistory()
}

/**
 * Obtiene estadísticas del historial
 */
export function getHistoryStats(): {
  totalMessages: number
  userMessages: number
  assistantMessages: number
  sessionDuration: number
  providers: Record<string, number>
} {
  if (!currentHistory) {
    return {
      totalMessages: 0,
      userMessages: 0,
      assistantMessages: 0,
      sessionDuration: 0,
      providers: {},
    }
  }

  const userMessages = currentHistory.entries.filter((e) => e.role === 'user').length
  const assistantMessages = currentHistory.entries.filter((e) => e.role === 'assistant').length

  const providers: Record<string, number> = {}
  currentHistory.entries
    .filter((e) => e.provider)
    .forEach((e) => {
      providers[e.provider!] = (providers[e.provider!] || 0) + 1
    })

  return {
    totalMessages: currentHistory.entries.length,
    userMessages,
    assistantMessages,
    sessionDuration: Date.now() - currentHistory.startedAt,
    providers,
  }
}

/**
 * Exporta el historial como texto (para soporte/debugging)
 */
export function exportHistoryAsText(): string {
  if (!currentHistory || currentHistory.entries.length === 0) {
    return 'No hay historial de conversación.'
  }

  const header = `=== Historial de Conversación ===
Sesión: ${currentHistory.sessionId}
Inicio: ${new Date(currentHistory.startedAt).toLocaleString()}
Última actualización: ${new Date(currentHistory.lastUpdated).toLocaleString()}
Total de mensajes: ${currentHistory.entries.length}
================================\n\n`

  const messages = currentHistory.entries
    .map((entry) => {
      const time = new Date(entry.timestamp).toLocaleTimeString()
      const role = entry.role === 'user' ? '👤 Usuario' : '🤖 Beni'
      const provider = entry.provider ? ` [${entry.provider}]` : ''
      return `[${time}] ${role}${provider}:\n${entry.content}\n`
    })
    .join('\n---\n\n')

  return header + messages
}

// Inicializar al cargar el módulo (solo en cliente)
if (typeof window !== 'undefined') {
  // Inicializar después de que el DOM esté listo
  if (document.readyState === 'complete') {
    initConversationHistory()
  } else {
    window.addEventListener('load', () => {
      initConversationHistory()
    })
  }
}
