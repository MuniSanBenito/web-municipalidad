// src/components/chatbot/feedbackService.ts

/**
 * Sistema de feedback y analytics para el chatbot
 * Permite a los usuarios calificar respuestas y rastrea métricas
 */

import type { AIProvider } from './types'

// ===============================================
// TIPOS
// ===============================================

export interface FeedbackEntry {
  id: string
  messageId: string
  query: string
  response: string
  provider: AIProvider
  rating: 'positive' | 'negative' | null
  timestamp: number
  comment?: string
}

export interface AnalyticsData {
  totalQueries: number
  positiveRatings: number
  negativeRatings: number
  unratedResponses: number
  queriesByProvider: Record<AIProvider, number>
  topQueries: Array<{ query: string; count: number }>
  averageSatisfaction: number
  sessionStartedAt: number
}

// ===============================================
// STORAGE KEYS
// ===============================================

const FEEDBACK_STORAGE_KEY = 'chatbot_feedback'
const ANALYTICS_STORAGE_KEY = 'chatbot_analytics'

// ===============================================
// ESTADO EN MEMORIA
// ===============================================

let feedbackEntries: FeedbackEntry[] = []
let analyticsData: AnalyticsData = createInitialAnalytics()

// ===============================================
// FUNCIONES AUXILIARES
// ===============================================

function generateId(): string {
  return `fb_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
}

function createInitialAnalytics(): AnalyticsData {
  return {
    totalQueries: 0,
    positiveRatings: 0,
    negativeRatings: 0,
    unratedResponses: 0,
    queriesByProvider: {
      'knowledge-base': 0,
      gemini: 0,
      fallback: 0,
    },
    topQueries: [],
    averageSatisfaction: 0,
    sessionStartedAt: Date.now(),
  }
}

function loadFromStorage(): void {
  if (typeof window === 'undefined') return

  try {
    const storedFeedback = sessionStorage.getItem(FEEDBACK_STORAGE_KEY)
    if (storedFeedback) {
      feedbackEntries = JSON.parse(storedFeedback)
    }

    const storedAnalytics = sessionStorage.getItem(ANALYTICS_STORAGE_KEY)
    if (storedAnalytics) {
      analyticsData = JSON.parse(storedAnalytics)
    }
  } catch (error) {
    console.warn('Error al cargar datos de feedback:', error)
  }
}

function saveToStorage(): void {
  if (typeof window === 'undefined') return

  try {
    sessionStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(feedbackEntries))
    sessionStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(analyticsData))
  } catch (error) {
    console.warn('Error al guardar datos de feedback:', error)
  }
}

function updateTopQueries(query: string): void {
  const normalizedQuery = query.toLowerCase().trim()
  const existingIndex = analyticsData.topQueries.findIndex(
    (q) => q.query.toLowerCase() === normalizedQuery,
  )

  if (existingIndex >= 0) {
    analyticsData.topQueries[existingIndex].count++
  } else {
    analyticsData.topQueries.push({ query: normalizedQuery, count: 1 })
  }

  // Ordenar por frecuencia y mantener solo top 20
  analyticsData.topQueries.sort((a, b) => b.count - a.count)
  analyticsData.topQueries = analyticsData.topQueries.slice(0, 20)
}

function recalculateSatisfaction(): void {
  const totalRated = analyticsData.positiveRatings + analyticsData.negativeRatings
  if (totalRated > 0) {
    analyticsData.averageSatisfaction = Math.round(
      (analyticsData.positiveRatings / totalRated) * 100,
    )
  } else {
    analyticsData.averageSatisfaction = 0
  }
}

// ===============================================
// FUNCIONES PRINCIPALES
// ===============================================

/**
 * Registra una nueva consulta para analytics
 */
export function trackQuery(
  messageId: string,
  query: string,
  response: string,
  provider: AIProvider,
): FeedbackEntry {
  const entry: FeedbackEntry = {
    id: generateId(),
    messageId,
    query,
    response,
    provider,
    rating: null,
    timestamp: Date.now(),
  }

  feedbackEntries.push(entry)

  // Actualizar analytics
  analyticsData.totalQueries++
  analyticsData.unratedResponses++
  analyticsData.queriesByProvider[provider]++
  updateTopQueries(query)

  // Limitar a últimas 100 entradas
  if (feedbackEntries.length > 100) {
    feedbackEntries = feedbackEntries.slice(-100)
  }

  saveToStorage()
  return entry
}

/**
 * Registra feedback positivo o negativo para una respuesta
 */
export function submitFeedback(
  messageId: string,
  rating: 'positive' | 'negative',
  comment?: string,
): boolean {
  const entry = feedbackEntries.find((e) => e.messageId === messageId)

  if (!entry) {
    console.warn('No se encontró la entrada para feedback:', messageId)
    return false
  }

  // Si ya tenía rating, ajustar contadores
  if (entry.rating === 'positive') {
    analyticsData.positiveRatings--
  } else if (entry.rating === 'negative') {
    analyticsData.negativeRatings--
  } else {
    analyticsData.unratedResponses--
  }

  // Aplicar nuevo rating
  entry.rating = rating
  entry.comment = comment

  if (rating === 'positive') {
    analyticsData.positiveRatings++
  } else {
    analyticsData.negativeRatings++
  }

  recalculateSatisfaction()
  saveToStorage()

  return true
}

/**
 * Obtiene el feedback de un mensaje específico
 */
export function getFeedbackForMessage(messageId: string): FeedbackEntry | null {
  return feedbackEntries.find((e) => e.messageId === messageId) || null
}

/**
 * Obtiene todas las entradas de feedback
 */
export function getAllFeedback(): FeedbackEntry[] {
  return [...feedbackEntries]
}

/**
 * Obtiene los datos de analytics actuales
 */
export function getAnalytics(): AnalyticsData {
  return { ...analyticsData }
}

/**
 * Obtiene las consultas más frecuentes
 */
export function getTopQueries(limit: number = 10): Array<{ query: string; count: number }> {
  return analyticsData.topQueries.slice(0, limit)
}

/**
 * Obtiene feedback negativo para análisis de mejoras
 */
export function getNegativeFeedback(): FeedbackEntry[] {
  return feedbackEntries.filter((e) => e.rating === 'negative')
}

/**
 * Obtiene métricas resumidas para dashboard
 */
export function getMetricsSummary(): {
  totalQueries: number
  satisfactionRate: string
  geminiUsage: string
  topQueryCategory: string
} {
  const total = analyticsData.totalQueries

  // Calcular porcentaje de uso de Gemini
  const geminiPercentage =
    total > 0 ? Math.round((analyticsData.queriesByProvider.gemini / total) * 100) : 0

  // Encontrar categoría más consultada
  let topCategory = 'general'
  const categoryKeywords: Record<string, string[]> = {
    rentas: ['rentas', 'impuesto', 'pago', 'tasa'],
    licencias: ['licencia', 'conducir', 'carnet'],
    obras: ['obra', 'construccion', 'plano'],
    deportes: ['deporte', 'actividad', 'taller'],
  }

  const categoryCounts: Record<string, number> = {}
  for (const { query } of analyticsData.topQueries) {
    for (const [category, keywords] of Object.entries(categoryKeywords)) {
      if (keywords.some((kw) => query.includes(kw))) {
        categoryCounts[category] = (categoryCounts[category] || 0) + 1
      }
    }
  }

  const topCategoryEntry = Object.entries(categoryCounts).sort(([, a], [, b]) => b - a)[0]
  if (topCategoryEntry) {
    topCategory = topCategoryEntry[0]
  }

  return {
    totalQueries: total,
    satisfactionRate: `${analyticsData.averageSatisfaction}%`,
    geminiUsage: `${geminiPercentage}%`,
    topQueryCategory: topCategory,
  }
}

/**
 * Exporta datos de analytics como JSON (para reporting)
 */
export function exportAnalyticsReport(): string {
  const report = {
    generatedAt: new Date().toISOString(),
    sessionDuration: Date.now() - analyticsData.sessionStartedAt,
    analytics: analyticsData,
    recentFeedback: feedbackEntries.slice(-20),
    negativeFeedbackSummary: getNegativeFeedback().map((e) => ({
      query: e.query,
      provider: e.provider,
      comment: e.comment,
    })),
  }

  return JSON.stringify(report, null, 2)
}

/**
 * Resetea todos los datos de feedback y analytics
 */
export function resetFeedbackData(): void {
  feedbackEntries = []
  analyticsData = createInitialAnalytics()

  if (typeof window !== 'undefined') {
    sessionStorage.removeItem(FEEDBACK_STORAGE_KEY)
    sessionStorage.removeItem(ANALYTICS_STORAGE_KEY)
  }
}

// ===============================================
// INICIALIZACIÓN
// ===============================================

// Cargar datos al iniciar el módulo
if (typeof window !== 'undefined') {
  if (document.readyState === 'complete') {
    loadFromStorage()
  } else {
    window.addEventListener('load', loadFromStorage)
  }
}
