// src/components/chatbot/aiServiceEnhanced.ts

/**
 * Servicio de IA mejorado que integra múltiples proveedores con fallback inteligente
 * FLUJO: Gemini SIEMPRE mejora las respuestas cuando está disponible
 * Orden: Gemini (con contexto de KB) → Knowledge Base → Fallback
 *
 * Mejoras v2.0:
 * - Rate limiting para proteger costos de API
 * - Historial de conversación persistente
 * - DEBUG_MODE según entorno
 */

import { getVerifiedInformation, sanitizeResponse, validateResponse } from './contentValidator'
import { addAssistantMessage, addUserMessage, getContextForAI } from './conversationHistory'
import { generateGeminiResponse, isGeminiAvailable, isGeminiConfigured } from './geminiService'
import {
  buscarServicioPorKeyword,
  CONTACTO_GENERAL,
  formatearServicio,
} from './knowledgeBaseEnhanced'
import { canMakeRequest, recordRequest } from './rateLimiter'
import type { AIResponse, CachedResponse } from './types'

// Cache para respuestas frecuentes (aumentado a 30 min para info municipal estática)
const responseCache = new Map<string, CachedResponse>()
const CACHE_TTL = 30 * 60 * 1000 // 30 minutos

// Estadísticas de uso
let stats = {
  knowledgeBase: 0,
  gemini: 0,
  fallback: 0,
}

// DEBUG_MODE según entorno - desactivado en producción
const DEBUG_MODE = process.env.NODE_ENV !== 'production'

/**
 * Función principal mejorada para obtener respuestas de IA
 * NUEVO: Gemini se usa SIEMPRE que esté disponible para dar respuestas más naturales
 * v2.0: Integra rate limiting e historial de conversación
 */
export async function fetchEnhancedAIResponse(query: string): Promise<AIResponse> {
  if (!query || typeof query !== 'string' || query.trim() === '') {
    return {
      response: 'Por favor, ingresa una consulta para que pueda ayudarte.',
      provider: 'fallback',
      cached: false,
    }
  }

  const normalizedQuery = query.toLowerCase().trim()

  // Registrar mensaje del usuario en historial
  addUserMessage(query)

  // 1. Verificar caché primero
  const cacheKey = normalizedQuery
  const cachedResult = responseCache.get(cacheKey)

  if (cachedResult && Date.now() - cachedResult.timestamp < CACHE_TTL) {
    if (DEBUG_MODE) {
      console.log(`📦 Respuesta recuperada del cache (${cachedResult.provider})`)
    }
    return {
      response: cachedResult.response,
      provider: cachedResult.provider as any,
      cached: true,
    }
  }

  // 2. Manejar saludos y despedidas (rápido, sin IA)
  const greetingResponse = handleGreetingsAndFarewells(normalizedQuery)
  if (greetingResponse) {
    cacheResponse(cacheKey, greetingResponse, 'knowledge-base')
    return {
      response: greetingResponse,
      provider: 'knowledge-base',
      cached: false,
    }
  }

  // 3. Verificar rate limiting antes de llamar a Gemini
  const rateLimitCheck = canMakeRequest()

  // 4. Verificar si Gemini está disponible para dar respuestas mejoradas
  const geminiConfigured = await isGeminiConfigured()
  const geminiAvailable = geminiConfigured ? await isGeminiAvailable() : false

  if (geminiAvailable && rateLimitCheck.allowed) {
    try {
      if (DEBUG_MODE) {
        console.log('🤖 Gemini disponible - Generando respuesta mejorada con IA...')
        console.log(`📊 Rate limit: ${rateLimitCheck.requestsRemaining} consultas restantes`)
      }

      // Obtener contexto de conversación para mejor coherencia
      const conversationContext = getContextForAI(4)

      // Gemini tiene toda la información en su system prompt, así que puede responder directamente
      const geminiResponse = await generateGeminiResponse(
        conversationContext
          ? `Contexto previo:\n${conversationContext}\n\nNueva consulta: ${query}`
          : query,
      )

      // Registrar request exitosa
      recordRequest()

      // Validar respuesta de Gemini
      const validation = validateResponse(geminiResponse, query)

      if (validation.isValid || validation.confidence >= 50) {
        if (DEBUG_MODE) {
          console.log(`✅ Respuesta de Gemini válida (confianza: ${validation.confidence}%)`)
        }
        stats.gemini++
        cacheResponse(cacheKey, geminiResponse, 'gemini')
        // Guardar respuesta en historial
        addAssistantMessage(geminiResponse, 'gemini')
        return {
          response: geminiResponse,
          provider: 'gemini',
          cached: false,
        }
      } else {
        if (DEBUG_MODE) {
          console.warn(
            `⚠️ Respuesta de Gemini con baja confianza (${validation.confidence}%), intentando sanitizar...`,
          )
        }
        // Intentar sanitizar
        const sanitized = sanitizeResponse(geminiResponse, query)
        if (sanitized.length > 30) {
          stats.gemini++
          cacheResponse(cacheKey, sanitized, 'gemini')
          addAssistantMessage(sanitized, 'gemini')
          return {
            response: sanitized,
            provider: 'gemini',
            cached: false,
          }
        }
        // Si Gemini falla, continuar con Knowledge Base
        if (DEBUG_MODE) {
          console.log('⚠️ Gemini no dio respuesta válida, usando Knowledge Base...')
        }
      }
    } catch (error) {
      console.error('❌ Error con Gemini API:', error)
      // Continuar con fallbacks
    }
  } else {
    if (DEBUG_MODE) {
      if (!rateLimitCheck.allowed) {
        console.log(`⏳ Rate limit activo: ${rateLimitCheck.reason}`)
      } else {
        console.log('ℹ️ Gemini no disponible, usando Knowledge Base local...')
      }
    }
  }

  // 5. Buscar en Knowledge Base Enhanced (fallback si Gemini no está disponible)
  const kbResponse = searchEnhancedKnowledgeBase(normalizedQuery)
  if (kbResponse) {
    if (DEBUG_MODE) {
      console.log('✅ Respuesta encontrada en Knowledge Base Enhanced')
    }
    stats.knowledgeBase++
    cacheResponse(cacheKey, kbResponse, 'knowledge-base')
    addAssistantMessage(kbResponse, 'knowledge-base')
    return {
      response: kbResponse,
      provider: 'knowledge-base',
      cached: false,
    }
  }

  // 6. Fallback final: información verificada o respuesta genérica
  if (DEBUG_MODE) {
    console.log('⚠️ Usando respuesta de fallback')
  }

  const verifiedInfo = getVerifiedInformation(query)
  const fallbackResponse = verifiedInfo || generateSmartFallback(query)

  stats.fallback++
  cacheResponse(cacheKey, fallbackResponse, 'fallback')
  addAssistantMessage(fallbackResponse, 'fallback')

  return {
    response: fallbackResponse,
    provider: 'fallback',
    cached: false,
  }
}

/**
 * Busca en la base de conocimiento mejorada
 */
function searchEnhancedKnowledgeBase(query: string): string | null {
  const queryLower = query.toLowerCase()

  // Buscar por keywords en servicios
  const servicio = buscarServicioPorKeyword(query)

  if (servicio) {
    return formatearServicio(servicio)
  }

  // Detectar preguntas sobre "cómo" hacer algo
  if (/c[oó]mo\s+(puedo|hago|saco|obtengo|consigo|tramito)/i.test(queryLower)) {
    // Buscar el servicio relacionado
    const servicioRelacionado = buscarServicioPorKeyword(query)
    if (servicioRelacionado) {
      return formatearServicio(servicioRelacionado)
    }
  }

  // Detectar preguntas sobre requisitos
  if (/requisito|que\s+necesito|que\s+debo|documentos?\s+(necesario|para)/i.test(queryLower)) {
    const servicioRelacionado = buscarServicioPorKeyword(query)
    if (servicioRelacionado && servicioRelacionado.requisitos) {
      let respuesta = `📋 **Requisitos para ${servicioRelacionado.nombre}:**\n\n`
      servicioRelacionado.requisitos.forEach((req, i) => {
        respuesta += `${i + 1}. ${req}\n`
      })
      if (servicioRelacionado.whatsapp) {
        respuesta += `\n📱 Para más info: WhatsApp ${servicioRelacionado.whatsapp}`
      }
      return respuesta
    }
  }

  // Buscar información de contacto general
  if (/ubicaci[oó]n|direcci[oó]n|donde\s+(est[aá]|queda)|como\s+llego/i.test(queryLower)) {
    return `📍 **Ubicación de la Municipalidad:**\n${CONTACTO_GENERAL.direccion}\n\n🕒 Horario: ${CONTACTO_GENERAL.horarioGeneral}\n📞 Teléfono: ${CONTACTO_GENERAL.telefonoPrincipal}\n\n💡 Tip: Podés buscar "Municipalidad de San Benito" en Google Maps.`
  }

  if (/intendente|alcalde|autoridad|quien\s+gobierna/i.test(queryLower)) {
    return `👨‍💼 El intendente actual de San Benito es **${CONTACTO_GENERAL.intendente}**.`
  }

  if (/poblaci[oó]n|habitantes|cuantas?\s+personas?\s+viven|gente/i.test(queryLower)) {
    return `👥 San Benito tiene aproximadamente **${CONTACTO_GENERAL.poblacion}**.`
  }

  // Búsqueda de horarios generales
  if (/horario|a\s+qu[eé]\s+hora|cuando\s+abren?|cuando\s+atienden/i.test(queryLower)) {
    let horarios = `🕒 **Horarios de Atención:**\n\n`
    horarios += `**Horario General:** ${CONTACTO_GENERAL.horarioGeneral}\n\n`
    horarios += `**Por área:**\n`
    horarios += `• 💰 Rentas: Lunes a Viernes 7:00-13:00 hs\n`
    horarios += `• 🏗️ Obras Privadas: Lunes a Viernes 7:00-13:00 hs\n`
    horarios += `• 📚 Punto Digital: Lunes a Viernes 8:00-12:00 y 16:00-20:00 hs\n`
    horarios += `• 🏪 Habilitaciones: Lunes a Viernes 7:00-13:00 hs\n`
    horarios += `• 🚗 Licencias: Lunes a Viernes 7:00-13:00 hs`
    return horarios
  }

  // Búsqueda de teléfonos
  if (/tel[eé]fono|n[uú]mero|contacto|llamar|whatsapp/i.test(queryLower)) {
    return (
      `📞 **Contactos de la Municipalidad:**\n\n` +
      `**Principal:** ${CONTACTO_GENERAL.telefonoPrincipal}\n\n` +
      `**Por área (WhatsApp):**\n` +
      `• 💰 Rentas: 3436127015\n` +
      `• 🚗 Licencias: 3436127014\n` +
      `• 🏪 Habilitaciones: 3434537319\n` +
      `• 📋 CAV (Reclamos): 3436127013\n` +
      `• ⚽ Deportes: 5493434682745\n` +
      `• 📚 Punto Digital: 3434508085\n\n` +
      `📧 Email: ${CONTACTO_GENERAL.emailPrincipal}`
    )
  }

  // Búsqueda de todos los servicios
  if (/servicio|tr[aá]mite|que\s+puedo\s+hacer|que\s+ofrecen|ayuda/i.test(queryLower)) {
    return (
      `📋 **Servicios Disponibles:**\n\n` +
      `• 💰 **Rentas** - Pagos, tasas, TGI (WhatsApp: 3436127015)\n` +
      `• 🚗 **Licencia de Conducir** - Original y renovación (WhatsApp: 3436127014)\n` +
      `• 🏗️ **Obras Privadas** - Permisos de construcción (Tel: ${CONTACTO_GENERAL.telefonoPrincipal})\n` +
      `• 🏪 **Habilitaciones** - Comercios y locales (WhatsApp: 3434537319)\n` +
      `• ⚽ **Actividades Deportivas** - Talleres gratuitos (WhatsApp: 5493434682745)\n` +
      `• 📋 **CAV** - Centro Atención Vecino/Reclamos (WhatsApp: 3436127013)\n` +
      `• 📚 **Punto Digital** - Internet y biblioteca (WhatsApp: 3434508085)\n\n` +
      `¿Sobre cuál necesitas más información?`
    )
  }

  return null
}

/**
 * Maneja saludos y despedidas
 */
function handleGreetingsAndFarewells(query: string): string | null {
  // Normalizar query
  const normalized = query.toLowerCase().trim()

  // Patrones de saludo más flexibles
  const saludoPatterns = [
    /^(hola|buenas?|buen\s*(dia|día|dias|días|tarde|tardes|noche|noches)|hi|hello|saludos?|que\s*tal|qué\s*tal|ey|hey|epa)[\s\!\?\.\,]*$/i,
    /^(hola|buenas?|buen\s*(dia|día|dias|días|tarde|tardes|noche|noches))[\s\!\?\.\,]*(cómo\s*están?|como\s*están?)?$/i,
  ]

  for (const pattern of saludoPatterns) {
    if (pattern.test(normalized)) {
      const hora = new Date().getHours()
      let saludo = '¡Hola!'
      if (hora >= 6 && hora < 12) saludo = '¡Buen día!'
      else if (hora >= 12 && hora < 19) saludo = '¡Buenas tardes!'
      else saludo = '¡Buenas noches!'

      return `${saludo} Soy Beni, tu asistente virtual de la Municipalidad de San Benito. 🏛️\n\n¿En qué puedo ayudarte hoy?\n\nPuedo informarte sobre:\n• 💰 Rentas y pagos\n• 🚗 Licencias de conducir\n• 🏗️ Obras privadas\n• 🏪 Habilitaciones comerciales\n• ⚽ Actividades deportivas\n• 📋 Reclamos (CAV)`
    }
  }

  // Patrones de despedida más flexibles
  const despedidaPatterns = [
    /^(chau|adiós|adios|hasta\s*(luego|pronto|mañana)|nos\s*vemos|bye|gracias?|muchas\s*gracias|muy\s*amable)[\s\!\?\.\,]*$/i,
    /^(ok|listo|perfecto|genial|excelente|buenísimo|buenisimo)[\s\,]*(gracias?|chau)?[\s\!\?\.\,]*$/i,
  ]

  for (const pattern of despedidaPatterns) {
    if (pattern.test(normalized)) {
      const farewells = [
        '¡Hasta luego! 👋 Si necesitas algo más, aquí estaré para ayudarte.',
        '¡Gracias por tu consulta! 😊 No dudes en volver cuando lo necesites.',
        '¡Que tengas un excelente día! 🌟 Vuelve cuando necesites información sobre la municipalidad.',
      ]
      return farewells[Math.floor(Math.random() * farewells.length)]
    }
  }

  // Detectar agradecimientos simples
  if (/^(gracias?|muchas\s*gracias|te\s*agradezco|muy\s*amable)/i.test(normalized)) {
    return '¡De nada! 😊 ¿Hay algo más en lo que pueda ayudarte?'
  }

  return null
}

/**
 * Genera un fallback inteligente basado en la consulta
 */
function generateSmartFallback(query: string): string {
  const queryLower = query.toLowerCase()

  // Intentar identificar el tema de la consulta con patrones mejorados
  const temas: { [key: string]: { contacto: string; mensaje: string; emoji: string } } = {
    'renta|impuesto|tasa|pago|deuda|cuota|tribut': {
      contacto: 'WhatsApp 3436127015 o rentas@munisanbenito.gov.ar',
      mensaje: 'área de Rentas',
      emoji: '💰',
    },
    'licencia|conducir|carnet|carné|manejar|auto|moto|vehiculo': {
      contacto: 'WhatsApp 3436127014',
      mensaje: 'área de Licencias de Conducir',
      emoji: '🚗',
    },
    'obra|construccion|construir|plano|edificar|reforma|amplia': {
      contacto: `${CONTACTO_GENERAL.telefonoPrincipal} o obrasprivadas@munisanbenito.gov.ar`,
      mensaje: 'área de Obras Privadas',
      emoji: '🏗️',
    },
    'habilitacion|comercial|comercio|local|negocio|empresa|kiosco': {
      contacto: 'WhatsApp 3434537319 o habilitaciones@munisanbenito.gov.ar',
      mensaje: 'área de Habilitaciones',
      emoji: '🏪',
    },
    'deporte|futbol|voley|natacion|gimnasia|fitness|beach|actividad fisica': {
      contacto: 'WhatsApp 5493434682745',
      mensaje: 'área de Deportes',
      emoji: '⚽',
    },
    'reclamo|queja|vecino|denuncia|problema|bache|luz|basura|vereda': {
      contacto: 'WhatsApp 3436127013',
      mensaje: 'Centro de Atención al Vecino (CAV)',
      emoji: '📋',
    },
    'biblioteca|libro|computadora|internet|punto digital': {
      contacto: 'WhatsApp 3434508085',
      mensaje: 'Punto Digital y Biblioteca',
      emoji: '📚',
    },
    'cultura|taller|arte|musica|teatro|pintura': {
      contacto: `${CONTACTO_GENERAL.telefonoPrincipal}`,
      mensaje: 'área de Cultura',
      emoji: '🎨',
    },
    'mujer|genero|violencia': {
      contacto: `${CONTACTO_GENERAL.telefonoPrincipal}`,
      mensaje: 'Área de la Mujer',
      emoji: '💜',
    },
  }

  for (const [pattern, info] of Object.entries(temas)) {
    const regex = new RegExp(pattern, 'i')
    if (regex.test(queryLower)) {
      return `${info.emoji} No tengo información específica sobre tu consulta, pero podés contactar directamente al **${info.mensaje}** para obtener ayuda:\n\n📞 **Contacto:** ${info.contacto}\n🕒 **Horario:** Lunes a Viernes 7:00-13:00 hs\n\n💡 ¿Hay algo más en lo que pueda ayudarte?`
    }
  }

  // Fallback genérico mejorado
  return (
    `🤔 No encontré información específica sobre tu consulta.\n\n` +
    `Te recomiendo contactar directamente a la municipalidad:\n\n` +
    `📞 **Teléfono:** ${CONTACTO_GENERAL.telefonoPrincipal}\n` +
    `📧 **Email:** ${CONTACTO_GENERAL.emailPrincipal}\n` +
    `📍 **Dirección:** ${CONTACTO_GENERAL.direccion}\n` +
    `🕒 **Horario:** ${CONTACTO_GENERAL.horarioGeneral}\n\n` +
    `También podés preguntarme sobre:\n` +
    `• 💰 Rentas y pagos de impuestos\n` +
    `• 🚗 Licencias de conducir\n` +
    `• 🏗️ Permisos de obras privadas\n` +
    `• 🏪 Habilitaciones comerciales\n` +
    `• ⚽ Actividades deportivas\n` +
    `• 📋 Reclamos y atención al vecino`
  )
}

/**
 * Guarda respuesta en caché
 */
function cacheResponse(key: string, response: string, provider: string): void {
  responseCache.set(key, {
    response,
    timestamp: Date.now(),
    provider,
  })

  // Limpiar cache después del TTL
  setTimeout(() => {
    responseCache.delete(key)
  }, CACHE_TTL)
}

/**
 * Obtiene estadísticas de uso de los proveedores
 */
export function getProviderStats() {
  const total = stats.knowledgeBase + stats.gemini + stats.fallback

  return {
    knowledgeBase: {
      count: stats.knowledgeBase,
      percentage: total > 0 ? ((stats.knowledgeBase / total) * 100).toFixed(1) : '0',
    },
    gemini: {
      count: stats.gemini,
      percentage: total > 0 ? ((stats.gemini / total) * 100).toFixed(1) : '0',
    },
    fallback: {
      count: stats.fallback,
      percentage: total > 0 ? ((stats.fallback / total) * 100).toFixed(1) : '0',
    },
    total,
  }
}

/**
 * Resetea las estadísticas
 */
export function resetStats() {
  stats = {
    knowledgeBase: 0,
    gemini: 0,
    fallback: 0,
  }
}

/**
 * Limpia el cache
 */
export function clearCache() {
  responseCache.clear()
  if (DEBUG_MODE) {
    console.log('🗑️ Cache limpiado')
  }
}

/**
 * Genera sugerencias contextuales basadas en la última consulta y respuesta
 */
export function generateContextualSuggestions(
  lastQuery: string,
  lastResponse: string,
): Array<{
  text: string
  query: string
  icon: string
  category: string
}> {
  const queryLower = lastQuery.toLowerCase()
  const suggestions: Array<{ text: string; query: string; icon: string; category: string }> = []

  // Sugerencias basadas en el tema de la última consulta
  const temasSugerencias: {
    [pattern: string]: Array<{ text: string; query: string; icon: string; category: string }>
  } = {
    'renta|impuesto|tasa|pago': [
      {
        text: '¿Cómo pago online?',
        query: 'como pago mis impuestos online',
        icon: '💳',
        category: 'tramites',
      },
      {
        text: 'Tasas disponibles',
        query: 'cuales son las tasas municipales',
        icon: '📋',
        category: 'servicios',
      },
      {
        text: 'Contacto Rentas',
        query: 'contacto rentas municipales',
        icon: '📞',
        category: 'contacto',
      },
    ],
    'licencia|conducir|carnet': [
      {
        text: 'Requisitos completos',
        query: 'requisitos para licencia de conducir',
        icon: '📝',
        category: 'tramites',
      },
      {
        text: 'Curso de educación vial',
        query: 'como hago el curso de educacion vial',
        icon: '🎓',
        category: 'tramites',
      },
      {
        text: 'Renovar licencia',
        query: 'como renuevo mi licencia de conducir',
        icon: '🔄',
        category: 'tramites',
      },
    ],
    'obra|construccion|construir|plano': [
      {
        text: 'Requisitos obra nueva',
        query: 'requisitos para obra privada',
        icon: '📐',
        category: 'tramites',
      },
      {
        text: 'Final de obra',
        query: 'como tramito el final de obra',
        icon: '✅',
        category: 'tramites',
      },
      {
        text: 'Contacto Obras',
        query: 'contacto obras privadas',
        icon: '📞',
        category: 'contacto',
      },
    ],
    'habilitacion|comercio|local|negocio': [
      {
        text: 'Tipos de habilitación',
        query: 'tipos de habilitaciones comerciales',
        icon: '🏪',
        category: 'servicios',
      },
      {
        text: 'Requisitos comercio',
        query: 'requisitos habilitacion comercial',
        icon: '📋',
        category: 'tramites',
      },
      {
        text: 'Contacto Habilitaciones',
        query: 'contacto habilitaciones',
        icon: '📞',
        category: 'contacto',
      },
    ],
    'deporte|futbol|voley|actividad': [
      {
        text: 'Actividades disponibles',
        query: 'actividades deportivas municipales',
        icon: '🏃',
        category: 'servicios',
      },
      {
        text: 'Cómo inscribirse',
        query: 'como me inscribo en deportes',
        icon: '📝',
        category: 'tramites',
      },
      {
        text: 'Puntos deportivos',
        query: 'donde hay puntos deportivos',
        icon: '📍',
        category: 'servicios',
      },
    ],
    'reclamo|queja|cav|problema': [
      {
        text: 'Hacer un reclamo',
        query: 'como hago un reclamo al cav',
        icon: '📢',
        category: 'tramites',
      },
      {
        text: 'Contacto CAV',
        query: 'contacto centro atencion vecino',
        icon: '📞',
        category: 'contacto',
      },
    ],
  }

  // Buscar sugerencias relacionadas con el tema
  for (const [pattern, patternSuggestions] of Object.entries(temasSugerencias)) {
    if (new RegExp(pattern, 'i').test(queryLower)) {
      suggestions.push(...patternSuggestions.slice(0, 3))
      break
    }
  }

  // Si no hay sugerencias específicas, dar sugerencias generales
  if (suggestions.length === 0) {
    suggestions.push(
      {
        text: 'Trámites disponibles',
        query: 'que tramites puedo hacer',
        icon: '📋',
        category: 'servicios',
      },
      {
        text: 'Horarios de atención',
        query: 'horarios de atencion municipalidad',
        icon: '🕒',
        category: 'horarios',
      },
      {
        text: 'Teléfonos útiles',
        query: 'telefonos de contacto',
        icon: '📞',
        category: 'contacto',
      },
    )
  }

  return suggestions
}

/**
 * Extrae palabras clave de una consulta para mejorar el matching
 */
export function extractKeywords(query: string): string[] {
  const stopWords = [
    'el',
    'la',
    'los',
    'las',
    'un',
    'una',
    'unos',
    'unas',
    'de',
    'del',
    'al',
    'a',
    'en',
    'con',
    'por',
    'para',
    'que',
    'como',
    'cómo',
    'donde',
    'dónde',
    'cuando',
    'cuándo',
    'cual',
    'cuál',
    'es',
    'son',
    'hay',
    'tiene',
    'tienen',
    'puedo',
    'puede',
    'quiero',
    'necesito',
    'me',
    'mi',
    'mis',
    'su',
    'sus',
    'se',
    'si',
    'no',
    'y',
    'o',
    'pero',
  ]

  return query
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .split(/\s+/)
    .filter((word) => word.length > 2 && !stopWords.includes(word))
}

/**
 * Obtiene estadísticas de uso de los proveedores de IA
 * Útil para monitorear cuándo se usa Gemini vs Knowledge Base
 */
export function getAIStats(): {
  knowledgeBase: number
  gemini: number
  fallback: number
  total: number
  geminiPercentage: string
} {
  const total = stats.knowledgeBase + stats.gemini + stats.fallback
  const geminiPercentage = total > 0 ? ((stats.gemini / total) * 100).toFixed(1) : '0.0'

  return {
    ...stats,
    total,
    geminiPercentage: `${geminiPercentage}%`,
  }
}

/**
 * Resetea las estadísticas de uso
 */
export function resetAIStats(): void {
  stats = {
    knowledgeBase: 0,
    gemini: 0,
    fallback: 0,
  }
  if (DEBUG_MODE) {
    console.log('📊 Estadísticas de IA reseteadas')
  }
}

/**
 * Limpia el caché de respuestas
 */
export function clearResponseCache(): void {
  responseCache.clear()
  if (DEBUG_MODE) {
    console.log('🗑️ Caché de respuestas limpiado')
  }
}
