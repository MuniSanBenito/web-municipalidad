// src/components/chatbot/ActionProvider.tsx

/**
 * ActionProvider: Maneja todas las acciones del chatbot
 * v2.0: Tipado TypeScript mejorado, rate limiting integrado
 * v2.1: Sistema de feedback y handlers refactorizados
 */

import type React from 'react'
import {
  fetchEnhancedAIResponseStreaming,
  generateContextualSuggestions,
} from './aiServiceEnhanced'
import { initConversationSync, scheduleSyncConversation } from './conversationSync'
import { trackQuery } from './feedbackService'
import {
  CONTACTO_GENERAL,
  formatearContactoGeneral,
  formatearHorariosGeneral,
} from './knowledgeBaseEnhanced'
import { canMakeRequest } from './rateLimiter'
import type {
  AIProvider,
  ChatMessage,
  ChatMessageOptions,
  ChatState,
  ContextualSuggestion,
  CreateChatBotMessageFunction,
  CreateClientMessageFunction,
  SetStateFunction,
} from './types'

// ===============================================
// CONFIGURACIÓN DE TRÁMITES (Factory Pattern)
// ===============================================

interface TramiteConfig {
  nombre: string
  descripcion: string
  url: string
  etiquetaBoton: string
}

/**
 * Configuración centralizada de todos los trámites municipales
 * Evita la repetición de handlers similares
 */
const TRAMITES_CONFIG: Record<string, TramiteConfig> = {
  actividadesDeportivas: {
    nombre: 'Actividades Deportivas',
    descripcion: 'Información sobre Actividades Deportivas:',
    url: '/tramites/actividades-deportivas',
    etiquetaBoton: 'Ver Actividades Deportivas',
  },
  areaMujer: {
    nombre: 'Área Mujer',
    descripcion: 'Información sobre el Área Mujer:',
    url: '/tramites/area-mujer',
    etiquetaBoton: 'Ver Área Mujer',
  },
  catastro: {
    nombre: 'Catastro',
    descripcion: 'Información sobre Catastro:',
    url: '/tramites/catastro',
    etiquetaBoton: 'Ver Catastro',
  },
  cav: {
    nombre: 'CAV',
    descripcion: 'Información sobre CAV (Centro de Atención al Vecino):',
    url: '/tramites/cav',
    etiquetaBoton: 'Ver CAV',
  },
  cicBarrioSanPedro: {
    nombre: 'CIC Barrio San Pedro',
    descripcion: 'Información sobre CIC Barrio San Pedro:',
    url: '/tramites/cic-barrio-san-pedro',
    etiquetaBoton: 'Ver CIC Barrio San Pedro',
  },
  habilitaciones: {
    nombre: 'Habilitaciones',
    descripcion: 'Información general sobre Habilitaciones:',
    url: '/tramites/habilitaciones',
    etiquetaBoton: 'Ver Habilitaciones',
  },
  licencia: {
    nombre: 'Licencias de Conducir',
    descripcion: 'Información general sobre Licencias de Conducir:',
    url: '/tramites/licencia',
    etiquetaBoton: 'Ver Licencias',
  },
  licenciaOriginal: {
    nombre: 'Licencia Original',
    descripcion: 'Información sobre Licencia de Conducir Original:',
    url: '/tramites/licencia/original',
    etiquetaBoton: 'Ver Licencia Original',
  },
  licenciaRenovacion: {
    nombre: 'Renovación de Licencia',
    descripcion: 'Información sobre Renovación de Licencia:',
    url: '/tramites/licencia/renovacion',
    etiquetaBoton: 'Ver Renovación',
  },
  licenciaAmpliacion: {
    nombre: 'Ampliación de Licencia',
    descripcion: 'Información sobre Ampliación de Licencia:',
    url: '/tramites/licencia/ampliacion',
    etiquetaBoton: 'Ver Ampliación',
  },
  rentas: {
    nombre: 'Rentas',
    descripcion: 'Información sobre Rentas e Impuestos Municipales:',
    url: '/tramites/rentas',
    etiquetaBoton: 'Ver Rentas',
  },
  obrasPrivadas: {
    nombre: 'Obras Privadas',
    descripcion: 'Información sobre Obras Privadas:',
    url: '/tramites/obras-privadas',
    etiquetaBoton: 'Ver Obras Privadas',
  },
  obrasInscripcion: {
    nombre: 'Inscripción Municipal',
    descripcion: 'Información sobre Inscripción Municipal:',
    url: '/tramites/obras-privadas/inscripcion',
    etiquetaBoton: 'Ver Inscripción',
  },
  obrasFinal: {
    nombre: 'Final de Obra',
    descripcion: 'Información sobre Final de Obra:',
    url: '/tramites/obras-privadas/final',
    etiquetaBoton: 'Ver Final de Obra',
  },
  obrasPresentacion: {
    nombre: 'Presentación de Proyecto',
    descripcion: 'Información sobre Presentación de Proyecto:',
    url: '/tramites/obras-privadas/presentacion',
    etiquetaBoton: 'Ver Presentación',
  },
  obrasRelevamiento: {
    nombre: 'Relevamiento',
    descripcion: 'Información sobre Relevamiento:',
    url: '/tramites/obras-privadas/relevamiento',
    etiquetaBoton: 'Ver Relevamiento',
  },
  mesaDeEntrada: {
    nombre: 'Mesa de Entrada',
    descripcion: 'Información sobre Mesa de Entrada:',
    url: '/tramites/mesa-de-entrada',
    etiquetaBoton: 'Ver Mesa de Entrada',
  },
  puntoDigital: {
    nombre: 'Punto Digital y Biblioteca',
    descripcion: 'Información sobre Punto Digital y Biblioteca:',
    url: '/tramites/punto-digital-biblioteca',
    etiquetaBoton: 'Ver Punto Digital',
  },
  talleresCulturales: {
    nombre: 'Talleres Culturales',
    descripcion: 'Información sobre Talleres Culturales:',
    url: '/tramites/talleres-culturales',
    etiquetaBoton: 'Ver Talleres',
  },
  produccionEmpleo: {
    nombre: 'Producción y Empleo',
    descripcion: 'Información sobre Producción y Empleo:',
    url: '/tramites/produccion-empleo',
    etiquetaBoton: 'Ver Producción y Empleo',
  },
  terceraEdad: {
    nombre: 'Tercera Edad y Discapacidad',
    descripcion: 'Información sobre Tercera Edad y Discapacidad:',
    url: '/tramites/tercera-edad-discapacidad',
    etiquetaBoton: 'Ver Tercera Edad',
  },
  emergencias: {
    nombre: 'Números Útiles y de Emergencia',
    descripcion: 'Aquí tienes los números de emergencia y contactos útiles rápidos:',
    url: '', // Se deja vacío ya que la IA contestará con la info de forma directa
    etiquetaBoton: '',
  },
}

/**
 * Clase principal que maneja las acciones del chatbot
 */
class ActionProvider {
  createChatBotMessage: CreateChatBotMessageFunction
  setState: SetStateFunction
  stateRef: React.MutableRefObject<ChatState> | undefined
  createClientMessage: CreateClientMessageFunction
  addMessageToState: ((message: ChatMessage) => void) | undefined
  lastQuery: string = ''
  lastResponse: string = ''

  constructor(
    createChatBotMessage: CreateChatBotMessageFunction,
    setStateFunc: SetStateFunction,
    createClientMessage: CreateClientMessageFunction,
    stateRef?: React.MutableRefObject<ChatState>,
    addMessageToState?: (message: ChatMessage) => void,
  ) {
    this.createChatBotMessage = createChatBotMessage
    this.setState = setStateFunc
    this.createClientMessage = createClientMessage
    this.stateRef = stateRef
    this.addMessageToState = addMessageToState

    // Inicializar sistema de sincronización de conversaciones
    initConversationSync()
  }

  private _updateChatbotState(message: ChatMessage): void {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }))
  }

  private _createLinkedMessage(text: string, linkLabel: string, linkUrl: string): void {
    const options: ChatMessageOptions = {
      widget: 'linkButton',
      payload: { label: linkLabel, url: linkUrl },
    }
    const message = this.createChatBotMessage(text, options)
    this._updateChatbotState(message)
  }

  /**
   * Genera un ID único para mensajes (usado para tracking de feedback)
   */
  private _generateMessageId(): string {
    return `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
  }

  /**
   * Crea un mensaje con widget de feedback adjunto
   */
  private _createMessageWithFeedback(
    text: string,
    query: string,
    provider: AIProvider = 'knowledge-base',
  ): void {
    const messageId = this._generateMessageId()
    const message = this.createChatBotMessage(text)
    this._updateChatbotState(message)

    // Registrar para analytics
    trackQuery(messageId, query, text, provider)

    // Mostrar widget de feedback después de un delay
    setTimeout(() => {
      const feedbackMessage = this.createChatBotMessage('', {
        widget: 'feedback',
        payload: { messageId },
        delay: 0,
      })
      this._updateChatbotState(feedbackMessage)
    }, 500)
  }

  /**
   * Factory method: Crea handler para un trámite específico.
   */
  handleTramite(tramiteKey: string): void {
    const config = TRAMITES_CONFIG[tramiteKey]
    if (config) {
      this._createLinkedMessage(config.descripcion, config.etiquetaBoton, config.url)
    }
  }

  greet(): void {
    const greetingMessage = this.createChatBotMessage('¡Hola! ¿En qué puedo ayudarte hoy?')
    this._updateChatbotState(greetingMessage)
  }

  handleWebsiteInfo(): void {
    const message = this.createChatBotMessage(
      'Este es el portal oficial de la Municipalidad de San Benito. Aquí encontrarás información sobre servicios municipales, noticias, transparencia y más.',
    )
    this._updateChatbotState(message)
  }
  handleNoticiasInfo() {
    this._createLinkedMessage(
      "Puedes encontrar las últimas noticias y novedades en la sección 'Noticias'.",
      'Ir a Noticias',
      '/noticias',
    )
  }
  handleTransparenciaInfo() {
    this._createLinkedMessage(
      "Toda la información sobre transparencia, como documentos públicos, licitaciones y concursos, está en la sección 'Transparencia'.",
      'Ir a Transparencia',
      '/transparencia',
    )
  }
  handleContactoInfo() {
    // Fuente única de verdad: knowledgeBaseEnhanced
    const message = this.createChatBotMessage(formatearContactoGeneral())
    this._updateChatbotState(message)
  }
  // Mostrar indicador de escritura
  private _showTypingIndicator(): void {
    this.setState((prevState) => ({
      ...prevState,
      typing: true,
    }))
  }

  // Ocultar indicador de escritura
  private _hideTypingIndicator(): void {
    this.setState((prevState) => ({
      ...prevState,
      typing: false,
    }))
  }

  // Mostrar sugerencias inteligentes contextuales
  private _showSuggestions(contextQuery?: string, contextResponse?: string): void {
    // Generar sugerencias basadas en el contexto de la conversación
    const suggestions: ContextualSuggestion[] = generateContextualSuggestions(
      contextQuery || this.lastQuery || '',
      contextResponse || this.lastResponse || '',
    )

    // Si hay sugerencias contextuales, mostrarlas
    if (suggestions.length > 0) {
      const options: ChatMessageOptions = {
        widget: 'smartSuggestions',
        payload: {
          suggestions: suggestions.map((s) => ({
            text: s.text,
            handler: () => this.handleUnknown(s.query),
            icon: s.icon,
            category: s.category,
          })),
        },
        loading: false,
        delay: 300,
      }
      const message = this.createChatBotMessage('', options)
      this._updateChatbotState(message)
    } else {
      // Sugerencias por defecto
      const message = this.createChatBotMessage('¿Hay algo más en lo que pueda ayudarte?', {
        widget: 'smartSuggestions',
        loading: false,
        delay: 500,
      })
      this._updateChatbotState(message)
    }
  }

  // Manejar mensaje desconocido con mejor retroalimentación y validación
  async handleUnknown(userMessage: string): Promise<void> {
    // Validar entrada
    if (!userMessage || userMessage.trim().length === 0) {
      const errorMessage = this.createChatBotMessage(
        'Por favor, escribe tu consulta para que pueda ayudarte. 😊',
      )
      this._updateChatbotState(errorMessage)
      return
    }

    // Guardar la query para contexto
    this.lastQuery = userMessage

    // Verificar rate limiting antes de procesar
    const rateLimitCheck = canMakeRequest()
    if (!rateLimitCheck.allowed && rateLimitCheck.reason) {
      const rateLimitMessage = this.createChatBotMessage(
        `⏳ ${rateLimitCheck.reason}\n\nMientras tanto, podés consultar nuestra página web o llamar al ${CONTACTO_GENERAL.telefonoPrincipal}.`,
      )
      this._updateChatbotState(rateLimitMessage)
      return
    }

    // Mostrar indicador de escritura: typing flag + burbuja con widget animado.
    // Le ponemos un ID propio para luego reemplazarla de forma segura (sin string match).
    this._showTypingIndicator()
    const typingMessageId = `typing_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`
    const typingPlaceholder = this.createChatBotMessage('', {
      widget: 'typingIndicator',
      payload: { __typingId: typingMessageId },
    })
    // Anotamos el id en el propio mensaje para identificarlo después
    ;(typingPlaceholder as any).__typingId = typingMessageId
    this._updateChatbotState(typingPlaceholder)

    // Helper: remueve el placeholder (por id) si todavía está en la lista.
    const removeTypingPlaceholder = (): void => {
      this.setState((prevState) => ({
        ...prevState,
        messages: prevState.messages.filter((m: any) => (m as any).__typingId !== typingMessageId),
      }))
    }

    try {
      // Estrategia de streaming:
      //   - El primer chunk REEMPLAZA el placeholder de typing por una burbuja
      //     de texto con el mismo __typingId (para poder seguir actualizándola).
      //   - Cada chunk siguiente actualiza el `.message` de esa misma burbuja.
      //   - Si streaming falla, fetchEnhancedAIResponseStreaming hace fallback
      //     a la respuesta no-streaming y devuelve el texto completo igual.
      let firstChunkArrived = false

      const onChunk = (_delta: string, accumulated: string) => {
        this.setState((prevState) => {
          const idx = prevState.messages.findIndex(
            (m: any) => (m as any).__typingId === typingMessageId,
          )
          if (idx === -1) return prevState

          if (!firstChunkArrived) {
            firstChunkArrived = true
            // Reemplazar placeholder (widget) por mensaje de texto streaming
            const newMsg: any = this.createChatBotMessage(accumulated)
            newMsg.__typingId = typingMessageId
            const newMessages = [...prevState.messages]
            newMessages[idx] = newMsg
            return { ...prevState, messages: newMessages }
          }

          // Actualización incremental: clonar el mensaje y reemplazar texto
          const newMessages = [...prevState.messages]
          const current: any = newMessages[idx]
          newMessages[idx] = { ...current, message: accumulated }
          return { ...prevState, messages: newMessages }
        })
      }

      // Timeout global de 20s (más laxo que antes porque streaming va llegando)
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Timeout')), 20000),
      )

      const aiResult = (await Promise.race([
        fetchEnhancedAIResponseStreaming(userMessage, onChunk),
        timeoutPromise,
      ])) as { response: string; provider: AIProvider; cached: boolean }

      const aiResponse = aiResult.response

      if (!aiResponse || aiResponse.trim().length === 0) {
        throw new Error('Respuesta vacía')
      }

      this.lastResponse = aiResponse
      const messageId = this._generateMessageId()
      const provider: AIProvider = aiResult.provider

      // Si nunca llegaron chunks (KB / cache / fallback), inyectar la respuesta ahora
      // reemplazando el placeholder de typing.
      // Si llegaron chunks pero el texto final difiere por sanitización, actualizar.
      this.setState((prevState) => {
        const idx = prevState.messages.findIndex(
          (m: any) => (m as any).__typingId === typingMessageId,
        )
        if (idx === -1) {
          return {
            ...prevState,
            messages: [...prevState.messages, this.createChatBotMessage(aiResponse)],
          }
        }
        const newMsg: any = this.createChatBotMessage(aiResponse)
        // limpiamos el marcador para que no se confunda con futuros placeholders
        delete newMsg.__typingId
        const newMessages = [...prevState.messages]
        newMessages[idx] = newMsg
        return { ...prevState, messages: newMessages }
      })

      // Registrar para analytics y feedback
      trackQuery(messageId, userMessage, aiResponse, provider)

      // Sincronizar conversación con la base de datos (con debounce)
      scheduleSyncConversation()

      // Mostrar widget de feedback después de la respuesta
      setTimeout(() => {
        const feedbackWidget = this.createChatBotMessage('', {
          widget: 'feedback',
          payload: { messageId },
          delay: 0,
        })
        this._updateChatbotState(feedbackWidget)
      }, 800)

      // Siempre mostrar sugerencias contextuales después de responder
      setTimeout(() => {
        this._showSuggestions(userMessage, aiResponse)
      }, 1000)
    } catch (error) {
      console.error('Error en handleUnknown:', error)

      // Determinar tipo de error y mostrar mensaje apropiado
      let errorMessage = ''

      const tel = CONTACTO_GENERAL.telefonoPrincipal
      if (error instanceof Error) {
        if (error.message === 'Timeout') {
          errorMessage = `⏱️ La consulta está tomando más tiempo del esperado. Por favor, intentá de nuevo o contactá directamente a la municipalidad al ${tel}.`
        } else if (error.message === 'Respuesta vacía') {
          errorMessage = `🤔 No pude generar una respuesta para tu consulta. ¿Podrías reformular tu pregunta o contactar directamente al ${tel}?`
        } else {
          errorMessage = `⚠️ Ocurrió un problema técnico. Te recomiendo contactar directamente a la municipalidad al ${tel} para obtener la información que necesitas.`
        }
      } else {
        errorMessage = '❌ Ocurrió un error inesperado. Por favor, intentá nuevamente.'
      }

      // Limpiar placeholder de typing y mostrar mensaje de error
      removeTypingPlaceholder()
      this._updateChatbotState(this.createChatBotMessage(errorMessage))

      // Mostrar opciones alternativas después del error
      setTimeout(() => {
        this._showSuggestions()
      }, 1500)
    } finally {
      this._hideTypingIndicator()
    }
  }
  handleLinkToPage(pageName: string, pageUrl: string) {
    this._createLinkedMessage(
      `Entendido. Puedes hacer clic aquí para ir a ${pageName}:`,
      `Ir a ${pageName}`,
      pageUrl,
    )
  }

  // Updated handleTramiteIntro
  handleTramiteIntro() {
    const messageText =
      'Puedo ayudarte con información sobre varios trámites y servicios. ¿Cuál te interesa?'
    const botMessage = this.createChatBotMessage(messageText, {
      widget: 'tramiteOptions', // This widget will display the options
    })
    this._updateChatbotState(botMessage)

    const options = [
      { text: 'Números Útiles', handler: () => this.handleTramite('emergencias'), id: 1 },
      { text: 'Licencias de Conducir', handler: () => this.handleTramite('licencia'), id: 2 },
      { text: 'Obras Privadas', handler: () => this.handleTramite('obrasPrivadas'), id: 3 },
      { text: 'Habilitaciones', handler: () => this.handleTramite('habilitaciones'), id: 4 },
      { text: 'Rentas', handler: () => this.handleTramite('rentas'), id: 5 },
      { text: 'Catastro', handler: () => this.handleTramite('catastro'), id: 6 },
      { text: 'Mesa de Entrada', handler: () => this.handleTramite('mesaDeEntrada'), id: 7 },
      {
        text: 'Actividades Deportivas',
        handler: () => this.handleTramite('actividadesDeportivas'),
        id: 8,
      },
      { text: 'Área Mujer', handler: () => this.handleTramite('areaMujer'), id: 9 },
      {
        text: 'Talleres Culturales',
        handler: () => this.handleTramite('talleresCulturales'),
        id: 10,
      },
      { text: 'Teléfonos Importantes', handler: () => this.handleContactoInfo(), id: 11 },
      { text: 'Consulta General', handler: () => this.handleGeneralInquiry(), id: 12 },
    ]

    this.setState((prevState: any) => ({
      ...prevState,
      tramiteOptions: options,
    }))
  }

  // Nuevos métodos para manejar consultas generales y búsqueda de información
  handleGeneralInquiry() {
    const message = this.createChatBotMessage(
      '¿Sobre qué tema te gustaría consultar? Puedes preguntarme sobre servicios municipales, trámites, horarios de atención, o cualquier otra información relacionada con la Municipalidad de San Benito.',
    )
    this._updateChatbotState(message)
  }

  // Método para buscar información en la web municipal
  handleWebSearch(query: string) {
    // Aquí podríamos implementar una búsqueda más avanzada en el futuro
    const message = this.createChatBotMessage(
      `Estoy buscando información sobre "${query}" en nuestro sitio web...`,
    )
    this._updateChatbotState(message)

    // Simulamos una búsqueda y mostramos resultados después de un breve retraso
    setTimeout(() => {
      this.handleUnknown(query)
    }, 1000)
  }

  // Método para manejar horarios de atención (lee del KB)
  handleHorarios() {
    const message = this.createChatBotMessage(formatearHorariosGeneral())
    this._updateChatbotState(message)
  }
}

export default ActionProvider
