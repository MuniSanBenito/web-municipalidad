// src/components/chatbot/index.ts

/**
 * Índice de exportaciones del módulo chatbot
 * Facilita la importación de componentes y utilidades
 */

// Componentes principales
export { default as ActionProvider } from './ActionProvider'
export { default as config } from './config'
export { default as MessageParser } from './MessageParser'

// Servicios de IA
export {
  clearCache,
  clearResponseCache,
  fetchEnhancedAIResponse,
  fetchEnhancedAIResponseStreaming,
  generateContextualSuggestions,
  getAIStats,
  getProviderStats,
  resetAIStats,
  resetStats,
} from './aiServiceEnhanced'

// Servicio de Chat (Groq + Llama 3.3)
export {
  generateChatResponse,
  generateChatResponseStreaming,
  getChatStatus,
  isChatAvailable,
  isChatConfigured,
  resetChatCache,
} from './chatService'
export type { StreamOptions } from './chatService'

// Rate Limiter
export {
  canMakeRequest,
  getRateLimitStats,
  initRateLimiter,
  recordRequest,
  resetRateLimiter,
  withRateLimit,
} from './rateLimiter'

// Historial de conversación
export {
  addAssistantMessage,
  addUserMessage,
  clearHistory,
  exportHistoryAsText,
  getContextForAI,
  getConversationHistory,
  getHistoryStats,
  getLastAssistantMessage,
  getLastUserMessage,
  getRecentHistory,
  initConversationHistory,
} from './conversationHistory'

// Sincronización de conversaciones con base de datos
export {
  forceSync,
  getSyncStatus,
  initConversationSync,
  scheduleSyncConversation,
  syncConversation,
  syncFeedback,
} from './conversationSync'

// Validación de contenido
export {
  generateFallbackResponse,
  getVerifiedInformation,
  sanitizeResponse,
  validateResponse,
} from './contentValidator'

// Feedback y Analytics
export {
  exportAnalyticsReport,
  getAllFeedback,
  getAnalytics,
  getFeedbackForMessage,
  getMetricsSummary,
  getNegativeFeedback,
  getTopQueries,
  resetFeedbackData,
  submitFeedback,
  trackQuery,
} from './feedbackService'
export type { AnalyticsData, FeedbackEntry } from './feedbackService'

// Knowledge Base
export {
  ACCION_SOCIAL,
  ACTIVIDADES_DEPORTIVAS,
  CAV,
  CIC_BARRIO_SAN_PEDRO,
  CONTACTO_GENERAL,
  HABILITACIONES,
  LICENCIA_CONDUCIR,
  OBRAS_PRIVADAS,
  RENTAS,
  SERVICIOS_COMPLETOS,
  TALLERES_CULTURALES,
  buscarServicioPorKeyword,
  formatearContactoGeneral,
  formatearHorariosGeneral,
  formatearServicio,
} from './knowledgeBaseEnhanced'

// Tipos
export type {
  // IA
  AIProvider,
  AIResponse,
  AIStats,
  // ActionProvider
  ActionProviderProps,
  CachedResponse,
  // Mensajes
  ChatMessage,
  ChatMessageOptions,
  ChatState,
  // Config
  ChatbotConfig,
  ChatbotStyles,
  ContextualSuggestion,
  // Historial
  ConversationEntry,
  ConversationHistory,
  CreateChatBotMessageFunction,
  CreateClientMessageFunction,
  CustomComponents,
  IActionProvider,
  // MessageParser
  IMessageParser,
  LinkButtonPayload,
  PhoneNumberMatcher,
  // Rate Limiting
  RateLimitConfig,
  RateLimitState,
  // Knowledge Base
  ServiceInfo,
  ServiceLink,
  SetStateFunction,
  SmartSuggestion,
  SmartSuggestionsPayload,
  TramiteInfo,
  TramiteMatcher,
  // Opciones y sugerencias
  TramiteOption,
  // Validación
  ValidationResult,
  VerifiedInformation,
  WidgetConfig,
  // Widgets
  WidgetProps,
} from './types'

// Constantes
export { DEFAULT_RATE_LIMIT, STORAGE_KEYS } from './types'
