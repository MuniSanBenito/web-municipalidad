// src/components/chatbot/types.ts

/**
 * Tipos e interfaces para el chatbot municipal
 * Reemplaza el uso de 'any' por tipos estrictos
 */

// ===============================================
// TIPOS DE MENSAJES
// ===============================================

export interface ChatMessage {
  id: string
  message: string
  type: 'bot' | 'user'
  loading?: boolean
  widget?: string
  payload?: Record<string, unknown>
  delay?: number
}

export interface ChatState {
  messages: ChatMessage[]
  tramiteOptions: TramiteOption[]
  smartSuggestions: SmartSuggestion[]
  typing: boolean
  conversationHistory: ConversationEntry[]
}

// ===============================================
// TIPOS DE OPCIONES Y SUGERENCIAS
// ===============================================

export interface TramiteOption {
  id: number
  text: string
  handler: (props: ActionProviderProps) => void
}

export interface SmartSuggestion {
  text: string
  handler: (props: ActionProviderProps) => void
  category: 'tramites' | 'contacto' | 'horarios' | 'servicios' | 'general'
  icon: string
  query?: string
}

export interface ContextualSuggestion {
  text: string
  query: string
  icon: string
  category: string
}

// ===============================================
// TIPOS PARA ACTION PROVIDER
// ===============================================

export interface ActionProviderProps {
  actionProvider: IActionProvider
  setState: SetStateFunction
  state: ChatState
}

export type SetStateFunction = (updater: ChatState | ((prevState: ChatState) => ChatState)) => void

export interface IActionProvider {
  createChatBotMessage: CreateChatBotMessageFunction
  setState: SetStateFunction
  createClientMessage: CreateClientMessageFunction
  stateRef?: React.MutableRefObject<ChatState>
  addMessageToState?: (message: ChatMessage) => void
}

export type CreateChatBotMessageFunction = (
  message: string,
  options?: ChatMessageOptions,
) => ChatMessage

export type CreateClientMessageFunction = (message: string) => ChatMessage

export interface ChatMessageOptions {
  widget?: string
  payload?: Record<string, unknown>
  loading?: boolean
  delay?: number
}

// ===============================================
// TIPOS PARA MESSAGE PARSER
// ===============================================

export interface IMessageParser {
  parse(message: string): void
}

export interface TramiteMatcher {
  keywords: string[]
  handler: () => void
}

export interface PhoneNumberMatcher {
  keywords: string[]
  phoneNumber: string
  description: string
}

// ===============================================
// TIPOS PARA SERVICIOS DE IA
// ===============================================

export type AIProvider = 'knowledge-base' | 'gemini' | 'fallback'

export interface AIResponse {
  response: string
  provider: AIProvider
  cached: boolean
}

export interface AIStats {
  knowledgeBase: number
  gemini: number
  fallback: number
  total: number
  geminiPercentage: string
}

export interface CachedResponse {
  response: string
  timestamp: number
  provider: string
}

// ===============================================
// TIPOS PARA RATE LIMITING
// ===============================================

export interface RateLimitConfig {
  maxRequests: number
  windowMs: number
  minInterval: number
}

export interface RateLimitState {
  requests: number[]
  lastRequest: number
  blocked: boolean
  blockedUntil: number | null
}

// ===============================================
// TIPOS PARA HISTORIAL DE CONVERSACIÓN
// ===============================================

export interface ConversationEntry {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
  provider?: AIProvider
}

export interface ConversationHistory {
  entries: ConversationEntry[]
  sessionId: string
  startedAt: number
  lastUpdated: number
}

// ===============================================
// TIPOS PARA WIDGETS
// ===============================================

export interface WidgetProps {
  actionProvider: IActionProvider
  setState: SetStateFunction
  state?: ChatState
  payload?: Record<string, unknown>
}

export interface LinkButtonPayload {
  label: string
  url: string
}

export interface SmartSuggestionsPayload {
  suggestions: SmartSuggestion[]
}

// ===============================================
// TIPOS PARA CONFIGURACIÓN
// ===============================================

export interface ChatbotConfig {
  botName: string
  initialMessages: ChatMessage[]
  customStyles?: ChatbotStyles
  state?: Partial<ChatState>
  widgets?: WidgetConfig[]
  customComponents?: CustomComponents
  placeholderText?: string
  messageHistory?: boolean
  actionProvider: typeof ActionProviderClass
  messageParser: typeof MessageParserClass
}

export interface ChatbotStyles {
  botMessageBox?: React.CSSProperties
  userMessageBox?: React.CSSProperties
  chatButton?: React.CSSProperties
}

export interface WidgetConfig {
  widgetName: string
  widgetFunc: (props: WidgetProps) => React.ReactNode
  mapStateToProps?: string[]
}

export interface CustomComponents {
  header?: () => React.ReactNode
  botAvatar?: () => React.ReactNode
  userAvatar?: () => React.ReactNode
}

// Clases placeholder para tipos de config
declare class ActionProviderClass implements IActionProvider {
  createChatBotMessage: CreateChatBotMessageFunction
  setState: SetStateFunction
  createClientMessage: CreateClientMessageFunction
}

declare class MessageParserClass implements IMessageParser {
  parse(message: string): void
}

// ===============================================
// TIPOS PARA VALIDACIÓN DE CONTENIDO
// ===============================================

export interface ValidationResult {
  isValid: boolean
  issues: string[]
  suggestions: string[]
  confidence: number
}

export interface VerifiedInformation {
  contacto: {
    telefono_principal: string
    email: string
    direccion: string
    horario: string
  }
  whatsapp: Record<string, string>
  emails: Record<string, string>
  tramites: Record<string, TramiteInfo>
  general: Record<string, string>
  enlaces: Record<string, string>
}

export interface TramiteInfo {
  nombre: string
  requisitos: string[]
}

// ===============================================
// TIPOS PARA KNOWLEDGE BASE
// ===============================================

export interface ServiceInfo {
  nombre: string
  descripcion: string
  telefono?: string
  whatsapp?: string
  email?: string
  horario?: string
  ubicacion?: string
  requisitos?: string[]
  enlaces?: ServiceLink[]
  informacionAdicional?: string[]
}

export interface ServiceLink {
  texto: string
  url: string
}

// ===============================================
// EXPORT DE CONSTANTES ÚTILES
// ===============================================

export const STORAGE_KEYS = {
  CONVERSATION_HISTORY: 'chatbot_conversation_history',
  SESSION_ID: 'chatbot_session_id',
  RATE_LIMIT: 'chatbot_rate_limit',
} as const

// Límites ajustados para Gemini Free Tier (Febrero 2026)
// Free tier: 15 RPM, 1,500 RPD para gemini-2.0-flash
export const DEFAULT_RATE_LIMIT: RateLimitConfig = {
  maxRequests: 12, // máximo 12 requests por minuto (conservador vs 15 RPM del free tier)
  windowMs: 60 * 1000, // por minuto
  minInterval: 2000, // mínimo 2 segundos entre requests para evitar bursts
} as const
