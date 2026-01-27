'use server'

import { GoogleGenAI } from '@google/genai'

/**
 * Server Action para integrar Google Gemini API de forma segura
 * La API Key se mantiene oculta en el servidor, nunca expuesta al cliente
 * Migrado a @google/genai (nuevo SDK oficial - Enero 2026)
 */

// NOTA: Sin NEXT_PUBLIC_ para mantenerla oculta en el servidor
const API_KEY = process.env.GEMINI_API_KEY || ''
const MODEL_NAME = 'gemini-2.0-flash' // Modelo estable disponible
const DEBUG_MODE = process.env.NODE_ENV === 'development'

// Prompt del sistema con información oficial de la municipalidad
const SYSTEM_INSTRUCTION = `Eres Beni, el asistente virtual oficial de la Municipalidad de San Benito, Entre Ríos, Argentina.
Tu personalidad es amigable, servicial y profesional. Usás lenguaje coloquial argentino (vos, podés, etc.).

INFORMACIÓN OFICIAL VERIFICADA DE LA MUNICIPALIDAD:

📍 UBICACIÓN Y CONTACTO GENERAL:
- Dirección: Blvd. Basalvibaso 1094, San Benito, Entre Ríos, Argentina
- Horario principal: Lunes a Viernes de 7:00 a 13:00 hs
- Teléfono principal: (0343) 4973454
- Email principal: Modernizacion@sanbenito.gob.ar
- Intendente actual: Ariel Voeffray
- Población: Aproximadamente 17,000 habitantes

📞 TELÉFONOS POR ÁREA (WHATSAPP):
- Rentas: 3436127015 | Email: rentas@munisanbenito.gov.ar
- Obras Privadas: (0343) 4973454 | Email: obrasprivadas@munisanbenito.gov.ar
- Habilitaciones: 3434537319 | Email: habilitaciones@munisanbenito.gov.ar
- Centro Atención Vecino (CAV): 3436127013
- Actividades Deportivas: 5493434682745
- Punto Digital/Biblioteca: 3434508085
- Licencias de Conducir: 3436127014

💰 RENTAS - INFORMACIÓN COMPLETA:
- Sistema online: http://sigem.sanbenito.gob.ar/ingresospublicos/ingresospublicos.aspx
- Tasas: TGI (Tasa General Inmobiliaria), Tasa Higiene Profilaxis y Seguridad, Obras Sanitarias
- Para usuario/contraseña: contactar rentas@munisanbenito.gov.ar o WhatsApp 3436127015

🚗 LICENCIA DE CONDUCIR - REQUISITOS:
- Constancia grupo sanguíneo
- DNI y fotocopia
- Constancia de CUIL
- CENAT (boletadepago.seguridadvial.gob.ar)
- Examen psicofísico (turno al iniciar)
- Curso Educación Vial: http://curso.seguridadvial.gob.ar
- Menores 16-21 años: Curso MPL adicional (mpl.seguridadvial.gob.ar)
- Curso presencial: Lunes 8:00-10:00 hs (autos), 10:00-12:00 hs (motos)
- Menores 18: Autorización en Juzgado de Paz (25 de mayo 960)

🏗️ OBRAS PRIVADAS - REQUISITOS:
- Título propiedad o boleto compra-venta certificado
- Plano mensura visado por Catastro
- Libre deuda municipal
- Certificado factibilidad servicios
- Planos firmados por profesional habilitado

🏪 HABILITACIONES COMERCIALES:
- Tipos: Comercios minoristas, Servicios profesionales, Gastronomía, Industrias
- Requisitos: DNI y CUIT/CUIL, Título/contrato alquiler, Planos local, Habilitación Bomberos

⚽ ACTIVIDADES DEPORTIVAS (GRATUITAS):
- Golf Croquet: +55 años, Lunes 9:00 hs
- Actividades Agua: +55 años, Martes/Jueves 10:00 hs
- Iniciación Deportiva: 3-7 años, Lunes/Miércoles 10:15 hs
- Beach Voley: +12 años, Lun/Mié/Vie 14:30 hs
- Inscripción: https://forms.gle/6v12MovAy6AeCxTJ9
- Requiere ficha médica obligatoria

📋 CAV (Centro Atención Vecino):
- WhatsApp: 3436127013
- Función: Recepción de reclamos (baches, alumbrado, limpieza, etc.)

REGLAS PARA TUS RESPUESTAS:

1. ✅ SOLO usa información de este documento
2. ✅ Respuestas CONCISAS (3-5 líneas máximo)
3. ✅ SIEMPRE incluí el contacto relevante (teléfono/WhatsApp/email)
4. ✅ Usá emojis para hacer el mensaje más visual
5. ✅ Si no tenés la info exacta: "No tengo esa información específica. Contactá a [área] al [contacto]"
6. ❌ NUNCA inventes datos, horarios o teléfonos
7. ❌ NUNCA uses "creo que", "posiblemente", "aproximadamente"
8. ✅ Estructurá con bullets cuando haya varios items
9. ✅ Al final podés preguntar "¿Hay algo más en lo que pueda ayudarte?"

FORMATO DE RESPUESTA IDEAL:
[Emoji] Título breve
- Dato 1
- Dato 2
📞 Contacto: [número/email]
🕒 Horario: [si aplica]`

// Tipo para el historial de mensajes
export interface ChatMessage {
  role: 'user' | 'model'
  parts: string
}

// Tipo para la respuesta del chat
export interface ChatResponse {
  success: boolean
  response: string
  error?: string
}

// Inicializar cliente de Gemini (nuevo SDK)
let genAI: GoogleGenAI | null = null

function getGenAIClient(): GoogleGenAI | null {
  if (!API_KEY) return null
  if (!genAI) {
    genAI = new GoogleGenAI({ apiKey: API_KEY })
  }
  return genAI
}

/**
 * Verifica si la API de Gemini está configurada
 */
export async function isGeminiServerConfigured(): Promise<boolean> {
  return API_KEY.length > 0
}

/**
 * Función principal del Server Action para chatear con Beni
 * Usa el nuevo SDK @google/genai
 *
 * @param history - Historial de mensajes previos de la conversación
 * @param newMessage - Nuevo mensaje del usuario
 * @returns Respuesta del chatbot
 */
export async function chatWithBeni(
  history: ChatMessage[],
  newMessage: string,
): Promise<ChatResponse> {
  // Validar configuración
  if (!API_KEY) {
    console.error('❌ GEMINI_API_KEY no está configurada en las variables de entorno del servidor')
    return {
      success: false,
      response:
        'Lo siento, el servicio de IA no está disponible en este momento. Por favor, contactá directamente a la Municipalidad al (0343) 4973454.',
      error: 'API Key no configurada',
    }
  }

  // Validar mensaje
  if (!newMessage || newMessage.trim().length === 0) {
    return {
      success: false,
      response: 'Por favor, escribí tu consulta para que pueda ayudarte. 😊',
      error: 'Mensaje vacío',
    }
  }

  try {
    if (DEBUG_MODE) {
      console.log('🤖 Iniciando chat con Gemini (Server Action)...')
      console.log(`📝 Historial: ${history.length} mensajes`)
      console.log(`💬 Nuevo mensaje: ${newMessage.substring(0, 50)}...`)
    }

    // Inicializar cliente de Gemini
    const client = getGenAIClient()
    if (!client) {
      throw new Error('No se pudo inicializar el cliente de Gemini')
    }

    // Construir el historial de conversación como contexto
    let conversationContext = ''
    if (history.length > 0) {
      conversationContext =
        'Historial de conversación:\n' +
        history.map((msg) => `${msg.role === 'user' ? 'Usuario' : 'Beni'}: ${msg.parts}`).join('\n') +
        '\n\n'
    }

    // Preparar el prompt completo
    const fullPrompt = `${SYSTEM_INSTRUCTION}

${conversationContext}Usuario: ${newMessage}

Responde como Beni:`

    // Generar respuesta con el nuevo SDK (sintaxis oficial)
    const response = await client.models.generateContent({
      model: MODEL_NAME,
      contents: fullPrompt,
    })

    // Extraer respuesta del nuevo formato
    const responseText = response.text || ''

    if (DEBUG_MODE) {
      console.log('✅ Respuesta de Gemini generada:', responseText.substring(0, 100) + '...')
    }

    // Validar que la respuesta no esté vacía
    if (!responseText || responseText.trim().length === 0) {
      throw new Error('Gemini devolvió una respuesta vacía')
    }

    return {
      success: true,
      response: responseText.trim(),
    }
  } catch (error) {
    console.error('❌ Error en chatWithBeni:', error)

    // Mensaje de error amigable para el usuario
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido'

    return {
      success: false,
      response:
        'Lo siento, hubo un error de conexión. Por favor, intentá de nuevo en unos segundos. Si el problema persiste, contactá a la Municipalidad al (0343) 4973454.',
      error: errorMessage,
    }
  }
}

/**
 * Función simplificada para una sola consulta (sin historial)
 * Útil para consultas rápidas que no necesitan contexto previo
 *
 * @param query - Consulta del usuario
 * @returns Respuesta del chatbot
 */
export async function askBeni(query: string): Promise<ChatResponse> {
  return chatWithBeni([], query)
}

/**
 * Verifica si el servicio de Gemini está disponible y funcionando
 * @returns Promise<boolean> true si está disponible
 */
export async function checkGeminiHealth(): Promise<{
  available: boolean
  model: string
  error?: string
}> {
  if (!API_KEY) {
    return {
      available: false,
      model: MODEL_NAME,
      error: 'API Key no configurada',
    }
  }

  try {
    const client = getGenAIClient()
    if (!client) {
      throw new Error('No se pudo inicializar el cliente')
    }

    // Prueba simple con el nuevo SDK (sintaxis oficial)
    const response = await client.models.generateContent({
      model: MODEL_NAME,
      contents: 'Respondé solo con "OK"',
    })

    const responseText = response.text || ''

    return {
      available: responseText.length > 0,
      model: MODEL_NAME,
    }
  } catch (error) {
    return {
      available: false,
      model: MODEL_NAME,
      error: error instanceof Error ? error.message : 'Error desconocido',
    }
  }
}
