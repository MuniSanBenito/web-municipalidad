// src/components/chatbot/aiServiceEnhanced.ts

/**
 * Servicio de IA mejorado que integra múltiples proveedores con fallback inteligente
 * Orden de prioridad: Knowledge Base Enhanced → Gemini API → Ollama → Fallback
 */

import { generateGeminiResponse, isGeminiAvailable, isGeminiConfigured } from './geminiService';
import { generateOllamaResponse, isOllamaAvailable } from './ollamaService';
import { validateResponse, sanitizeResponse, getVerifiedInformation } from './contentValidator';
import { buscarServicioPorKeyword, formatearServicio, CONTACTO_GENERAL, SERVICIOS_COMPLETOS } from './knowledgeBaseEnhanced';

// Cache para respuestas frecuentes
const responseCache = new Map<string, { response: string; timestamp: number; provider: string }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutos

// Estadísticas de uso
let stats = {
  knowledgeBase: 0,
  gemini: 0,
  ollama: 0,
  fallback: 0,
};

const DEBUG_MODE = true;

/**
 * Función principal mejorada para obtener respuestas de IA
 * Implementa cascada de fallback: KB Enhanced → Gemini → Ollama → Fallback
 */
export async function fetchEnhancedAIResponse(query: string): Promise<{
  response: string;
  provider: 'knowledge-base' | 'gemini' | 'ollama' | 'fallback';
  cached: boolean;
}> {
  if (!query || typeof query !== 'string' || query.trim() === '') {
    return {
      response: 'Por favor, ingresa una consulta para que pueda ayudarte.',
      provider: 'fallback',
      cached: false,
    };
  }

  const normalizedQuery = query.toLowerCase().trim();

  // 1. Verificar caché primero
  const cacheKey = normalizedQuery;
  const cachedResult = responseCache.get(cacheKey);
  
  if (cachedResult && Date.now() - cachedResult.timestamp < CACHE_TTL) {
    if (DEBUG_MODE) {
      console.log(`📦 Respuesta recuperada del cache (${cachedResult.provider})`);
    }
    return {
      response: cachedResult.response,
      provider: cachedResult.provider as any,
      cached: true,
    };
  }

  // 2. Manejar saludos y despedidas (rápido, sin IA)
  const greetingResponse = handleGreetingsAndFarewells(normalizedQuery);
  if (greetingResponse) {
    cacheResponse(cacheKey, greetingResponse, 'knowledge-base');
    return {
      response: greetingResponse,
      provider: 'knowledge-base',
      cached: false,
    };
  }

  // 3. Buscar en Knowledge Base Enhanced
  const kbResponse = searchEnhancedKnowledgeBase(normalizedQuery);
  if (kbResponse) {
    if (DEBUG_MODE) {
      console.log('✅ Respuesta encontrada en Knowledge Base Enhanced');
    }
    stats.knowledgeBase++;
    cacheResponse(cacheKey, kbResponse, 'knowledge-base');
    return {
      response: kbResponse,
      provider: 'knowledge-base',
      cached: false,
    };
  }

  // 4. Intentar con Gemini API (prioridad)
  if (isGeminiConfigured()) {
    try {
      const geminiAvailable = await isGeminiAvailable();
      
      if (geminiAvailable) {
        if (DEBUG_MODE) {
          console.log('🤖 Intentando respuesta con Gemini API...');
        }

        const geminiResponse = await generateGeminiResponse(query);
        
        // Validar respuesta de Gemini
        const validation = validateResponse(geminiResponse, query);
        
        if (validation.isValid || validation.confidence >= 60) {
          if (DEBUG_MODE) {
            console.log(`✅ Respuesta de Gemini válida (confianza: ${validation.confidence}%)`);
          }
          stats.gemini++;
          cacheResponse(cacheKey, geminiResponse, 'gemini');
          return {
            response: geminiResponse,
            provider: 'gemini',
            cached: false,
          };
        } else {
          if (DEBUG_MODE) {
            console.warn(`⚠️ Respuesta de Gemini con baja confianza (${validation.confidence}%)`);
          }
          // Intentar sanitizar
          const sanitized = sanitizeResponse(geminiResponse, query);
          if (sanitized.length > 30) {
            stats.gemini++;
            cacheResponse(cacheKey, sanitized, 'gemini');
            return {
              response: sanitized,
              provider: 'gemini',
              cached: false,
            };
          }
        }
      }
    } catch (error) {
      console.error('❌ Error con Gemini API:', error);
    }
  }

  // 5. Intentar con Ollama (fallback secundario)
  try {
    const ollamaAvailable = await isOllamaAvailable();
    
    if (ollamaAvailable) {
      if (DEBUG_MODE) {
        console.log('🤖 Intentando respuesta con Ollama (Gemma 2B)...');
      }

      const ollamaResponse = await generateOllamaResponse(query);
      
      // Validar respuesta de Ollama
      const validation = validateResponse(ollamaResponse, query);
      
      if (validation.isValid || validation.confidence >= 60) {
        if (DEBUG_MODE) {
          console.log(`✅ Respuesta de Ollama válida (confianza: ${validation.confidence}%)`);
        }
        stats.ollama++;
        cacheResponse(cacheKey, ollamaResponse, 'ollama');
        return {
          response: ollamaResponse,
          provider: 'ollama',
          cached: false,
        };
      } else {
        const sanitized = sanitizeResponse(ollamaResponse, query);
        if (sanitized.length > 30) {
          stats.ollama++;
          cacheResponse(cacheKey, sanitized, 'ollama');
          return {
            response: sanitized,
            provider: 'ollama',
            cached: false,
          };
        }
      }
    }
  } catch (error) {
    console.error('❌ Error con Ollama:', error);
  }

  // 6. Fallback final: información verificada o respuesta genérica
  if (DEBUG_MODE) {
    console.log('⚠️ Usando respuesta de fallback');
  }
  
  const verifiedInfo = getVerifiedInformation(query);
  const fallbackResponse = verifiedInfo || generateSmartFallback(query);
  
  stats.fallback++;
  cacheResponse(cacheKey, fallbackResponse, 'fallback');
  
  return {
    response: fallbackResponse,
    provider: 'fallback',
    cached: false,
  };
}

/**
 * Busca en la base de conocimiento mejorada
 */
function searchEnhancedKnowledgeBase(query: string): string | null {
  // Buscar por keywords en servicios
  const servicio = buscarServicioPorKeyword(query);
  
  if (servicio) {
    return formatearServicio(servicio);
  }

  // Buscar información de contacto general
  if (query.includes('ubicacion') || query.includes('ubicación') || query.includes('direccion') || query.includes('dirección')) {
    return `📍 **Ubicación de la Municipalidad:**\n${CONTACTO_GENERAL.direccion}\n\n🕒 Horario: ${CONTACTO_GENERAL.horarioGeneral}\n📞 Teléfono: ${CONTACTO_GENERAL.telefonoPrincipal}`;
  }

  if (query.includes('intendente') || query.includes('alcalde')) {
    return `👨‍💼 El intendente actual de San Benito es ${CONTACTO_GENERAL.intendente}.`;
  }

  if (query.includes('poblacion') || query.includes('población') || query.includes('habitantes')) {
    return `👥 San Benito tiene aproximadamente ${CONTACTO_GENERAL.poblacion}.`;
  }

  // Búsqueda de horarios generales
  if (query.includes('horario') && !query.includes('especifico')) {
    let horarios = `🕒 **Horarios de Atención:**\n\n`;
    horarios += `**General:** ${CONTACTO_GENERAL.horarioGeneral}\n\n`;
    horarios += `**Por área:**\n`;
    horarios += `• Rentas: Lunes a Viernes 7:00-13:00 hs\n`;
    horarios += `• Obras Privadas: Lunes a Viernes 7:00-13:00 hs\n`;
    horarios += `• Punto Digital: Lunes a Viernes 8:00-12:00 y 16:00-20:00 hs\n`;
    horarios += `• Habilitaciones: Lunes a Viernes 7:00-13:00 hs`;
    return horarios;
  }

  // Búsqueda de todos los servicios
  if (query.includes('servicio') || query.includes('tramite') || query.includes('trámite')) {
    return `📋 **Servicios Disponibles:**\n\n` +
      `• Rentas (WhatsApp: 3436127015)\n` +
      `• Licencia de Conducir (WhatsApp: 3436127014)\n` +
      `• Obras Privadas (Tel: ${CONTACTO_GENERAL.telefonoPrincipal})\n` +
      `• Habilitaciones (WhatsApp: 3434537319)\n` +
      `• Actividades Deportivas (WhatsApp: 5493434682745)\n` +
      `• CAV - Centro Atención Vecino (WhatsApp: 3436127013)\n` +
      `• Punto Digital (WhatsApp: 3434508085)\n\n` +
      `¿Sobre cuál necesitas más información?`;
  }

  return null;
}

/**
 * Maneja saludos y despedidas
 */
function handleGreetingsAndFarewells(query: string): string | null {
  // Saludos
  if (/^(hola|buen(a|o)s?\s*(dia|días|tarde|tardes|noche|noches)?|hi|hello|saludos?)$/i.test(query)) {
    const greetings = [
      '¡Hola! Soy Beni, tu asistente virtual de la Municipalidad de San Benito. ¿En qué puedo ayudarte hoy?',
      '¡Hola! ¿En qué puedo asistirte hoy con información sobre la municipalidad?',
      '¡Buen día! Estoy aquí para ayudarte con información sobre servicios y trámites municipales. ¿Qué necesitas?',
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }

  // Despedidas
  if (/^(chau|adios|adiós|hasta\s*luego|nos\s*vemos|bye|gracias?)$/i.test(query)) {
    const farewells = [
      '¡Hasta luego! Si necesitas algo más, aquí estaré para ayudarte.',
      '¡Nos vemos! No dudes en consultarme cuando lo necesites.',
      '¡Que tengas un excelente día! Vuelve cuando necesites información.',
    ];
    return farewells[Math.floor(Math.random() * farewells.length)];
  }

  return null;
}

/**
 * Genera un fallback inteligente basado en la consulta
 */
function generateSmartFallback(query: string): string {
  // Intentar identificar el tema de la consulta
  const temas: { [key: string]: { contacto: string; mensaje: string } } = {
    'renta|impuesto|tasa|pago': {
      contacto: 'WhatsApp 3436127015 o rentas@munisanbenito.gov.ar',
      mensaje: 'área de Rentas',
    },
    'licencia|conducir|carnet': {
      contacto: 'WhatsApp 3436127014',
      mensaje: 'área de Licencias',
    },
    'obra|construccion|construir|plano': {
      contacto: `${CONTACTO_GENERAL.telefonoPrincipal} o obrasprivadas@munisanbenito.gov.ar`,
      mensaje: 'área de Obras Privadas',
    },
    'habilitacion|comercial|comercio|local': {
      contacto: 'WhatsApp 3434537319 o habilitaciones@munisanbenito.gov.ar',
      mensaje: 'área de Habilitaciones',
    },
    'deporte|futbol|voley|natacion': {
      contacto: 'WhatsApp 5493434682745',
      mensaje: 'área de Deportes',
    },
    'reclamo|queja|vecino': {
      contacto: 'WhatsApp 3436127013',
      mensaje: 'Centro de Atención al Vecino (CAV)',
    },
  };

  for (const [pattern, info] of Object.entries(temas)) {
    const regex = new RegExp(pattern, 'i');
    if (regex.test(query)) {
      return `No tengo información específica sobre tu consulta, pero podés contactar directamente al ${info.mensaje} para obtener ayuda:\n\n📞 ${info.contacto}\n🕒 Horario: Lunes a Viernes 7:00-13:00 hs`;
    }
  }

  // Fallback genérico
  return `No encontré información específica sobre tu consulta. Te recomiendo contactar directamente a la municipalidad:\n\n` +
    `📞 Teléfono: ${CONTACTO_GENERAL.telefonoPrincipal}\n` +
    `📧 Email: ${CONTACTO_GENERAL.emailPrincipal}\n` +
    `🕒 Horario: ${CONTACTO_GENERAL.horarioGeneral}\n\n` +
    `También podés consultar sobre:\n` +
    `• Rentas y pagos\n` +
    `• Licencias de conducir\n` +
    `• Obras privadas\n` +
    `• Habilitaciones comerciales\n` +
    `• Actividades deportivas`;
}

/**
 * Guarda respuesta en caché
 */
function cacheResponse(key: string, response: string, provider: string): void {
  responseCache.set(key, {
    response,
    timestamp: Date.now(),
    provider,
  });

  // Limpiar cache después del TTL
  setTimeout(() => {
    responseCache.delete(key);
  }, CACHE_TTL);
}

/**
 * Obtiene estadísticas de uso de los proveedores
 */
export function getProviderStats() {
  const total = stats.knowledgeBase + stats.gemini + stats.ollama + stats.fallback;
  
  return {
    knowledgeBase: {
      count: stats.knowledgeBase,
      percentage: total > 0 ? ((stats.knowledgeBase / total) * 100).toFixed(1) : '0',
    },
    gemini: {
      count: stats.gemini,
      percentage: total > 0 ? ((stats.gemini / total) * 100).toFixed(1) : '0',
    },
    ollama: {
      count: stats.ollama,
      percentage: total > 0 ? ((stats.ollama / total) * 100).toFixed(1) : '0',
    },
    fallback: {
      count: stats.fallback,
      percentage: total > 0 ? ((stats.fallback / total) * 100).toFixed(1) : '0',
    },
    total,
  };
}

/**
 * Resetea las estadísticas
 */
export function resetStats() {
  stats = {
    knowledgeBase: 0,
    gemini: 0,
    ollama: 0,
    fallback: 0,
  };
}

/**
 * Limpia el cache
 */
export function clearCache() {
  responseCache.clear();
  if (DEBUG_MODE) {
    console.log('🗑️ Cache limpiado');
  }
}
