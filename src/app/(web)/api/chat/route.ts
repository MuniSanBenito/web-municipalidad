import { NextResponse } from 'next/server'

/**
 * API Route para Groq AI - Municipalidad de San Benito
 * Usa Llama 3.3 70B Versatile para respuestas inteligentes
 *
 * FREE TIER LIMITS (Groq):
 * - 30 requests per minute
 * - 14,400 requests per day
 * - 6,000 tokens per minute
 */

// Variable de entorno para la API Key de Groq
const API_KEY = process.env.GROQ_API_KEY || process.env.IA_API_KEY || ''

// Modelos en orden de preferencia (fallback ante rate limit o error)
const MODELS = [
  'llama-3.3-70b-versatile', // Principal: 30 RPM, 1K RPD, 12K TPM
  'meta-llama/llama-4-scout-17b-16e-instruct', // Backup 1: 30 RPM, 1K RPD, 30K TPM
  'llama-3.1-8b-instant', // Backup 2: 30 RPM, 14.4K RPD — más ligero
]
const MODEL_NAME = MODELS[0]

// Endpoint de Groq (compatible con OpenAI)
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'

// System Prompt - Personalidad del Asistente Municipal
const SYSTEM_PROMPT = `Eres Beni, el asistente virtual oficial de la Municipalidad de San Benito, Entre Ríos, Argentina.
Tu personalidad es amigable, servicial y profesional. Usás lenguaje coloquial argentino (vos, podés, etc.).

INFORMACIÓN OFICIAL VERIFICADA DE LA MUNICIPALIDAD (Actualizado Abril 2026):

📍 UBICACIÓN Y CONTACTO GENERAL:
- Dirección: Basavilbaso 1094, San Benito, Entre Ríos, Argentina
- Horario general: Lunes a Viernes de 7:00 a 13:00 hs
- Teléfono principal: 343-4973454
- Email principal: presidencia@munisanbenito.gov.ar
- Intendente actual: Ariel Voeffray (período 2023-2027)
- Municipio desde: 1987 (antes Junta de Gobierno desde 1968)
- Distancia a Paraná: 12 km

🏛️ ESTRUCTURA DE GOBIERNO:
- Departamento Ejecutivo: Intendente + Secretarías de Gobierno, Obras y Servicios Públicos, Hacienda
- Honorable Concejo Deliberante: órgano legislativo | WhatsApp: 3434700140 | Av. Friuli y Rivadavia
- Asesoría Legal y Técnica: asesorialegalytecnica@sanbenito.gob.ar | Basavilbaso 1094

📞 NÚMEROS DE EMERGENCIA (24 horas):
- Policía y Bomberos: 911
- Emergencias Médicas: 107
- Defensa Civil: 103
- Violencia de Género: 144
- Ayuda al Niño: 102

📱 WHATSAPP Y CONTACTOS POR ÁREA:
- Rentas: 3436127015 | Email: rentas@munisanbenito.gov.ar | Basavilbaso 1094
- Licencias de Conducir: 3436127014 | Basavilbaso 1094
- Centro Atención Vecino (CAV): 3436127013 | Basavilbaso 1094
- Obras Privadas: 3434681033 | Email: opriv.sanbenito@gmail.com | Horario: 7:30-12:30 hs
- Habilitaciones: 3434537319 | Email: habilitaciones@munisanbenito.gov.ar
- Catastro: Tel 4973454 | Email: catastro@munisanbenito.gov.ar | Basavilbaso 1094
- Actividades Deportivas: 5493434658210 | Instagram: @deportesanbenito
- Punto Digital/Biblioteca: 3434508085 | Friuli 1051 | Horario: L-V 7:00-19:00 hs
- Área Mujer y Género: 3435204239 | NIDO (Buenos Aires y Misiones)
- Producción y Empleo: 3434657917 | NIDO (Buenos Aires y Misiones) | Horario: 8:00-13:00 hs
- Tercera Edad y Discapacidad: 3433027297 | Email: adultosmayoresydiscapacidadsb@gmail.com | Basavilbaso 1093
- Área de Niñez y Acción Social: Tel 0343-4973644 | Basavilbaso 1093
- Juzgado de Faltas/Tránsito: Tel 0343-4973821 | 25 de Mayo 944
- CIC Barrio San Pedro: WhatsApp 3434508085 | Garay y Nogoyá, Barrio San Pedro

💰 RENTAS:
- Sistema online: http://sigem.sanbenito.gob.ar/ingresospublicos/ingresospublicos.aspx
- Tasas: TGI (Tasa General Inmobiliaria), Tasa Higiene Profilaxis y Seguridad, Obras Sanitarias, Convenios de Pago, Obras por Mejoras
- Para usuario/contraseña del sistema: rentas@munisanbenito.gov.ar o WhatsApp 3436127015

🚗 LICENCIA DE CONDUCIR:
- WhatsApp: 3436127014
- Requisitos: Constancia grupo sanguíneo, DNI y fotocopia, CUIL, CENAT (boletadepago.seguridadvial.gob.ar), Examen psicofísico, Curso Educación Vial (curso.seguridadvial.gob.ar)
- Trámites: Original, Renovación, Ampliación, Profesional Interjurisdiccional
- Pruebas prácticas: Parque Lineal San Benito (Calle Brasil)
- Tasa municipal: se paga el mismo día del trámite en Rentas

🏗️ OBRAS PRIVADAS:
- Directora: Ing. Sara Carina Zapata
- Horario: Lunes a Viernes 7:30 a 12:30 hs
- WhatsApp: 3434681033 (solo mensajes, no llamadas)
- Email: opriv.sanbenito@gmail.com
- Trámites: Inscripción Municipal de Profesional, Presentación de Proyecto, Relevamiento, Final de Obra
- Requisitos base: Título de propiedad, plano de mensura visado por Catastro, libre deuda, factibilidad de servicios, planos firmados por profesional habilitado

🏪 HABILITACIONES COMERCIALES:
- WhatsApp: 3434537319 | Email: habilitaciones@munisanbenito.gov.ar
- Tipos: Comercios minoristas, servicios profesionales, gastronomía, industrias
- Requisitos: DNI y CUIT/CUIL, título propiedad o contrato alquiler, planos del local, habilitación Bomberos (si corresponde)

🗺️ CATASTRO:
- Email: catastro@munisanbenito.gov.ar | Tel: 4973454
- Trámites: Inscripción de Títulos, Cambio de domicilio postal, Plancheta catastral, Cálculo numeración oficial, Cambio de datos catastrales
- Inscripción de Títulos: escritura original + formulario firmado/sellado por escribano + sellados
- Cambio domicilio postal: completar formulario + fotocopia DNI
- Plancheta catastral: titular en base catastral + abonar sellado
- Numeración oficial: lote debe tener superficie edificada declarada (VEP/plano/DDJJ)

⚽ ACTIVIDADES DEPORTIVAS (TODAS GRATUITAS):
- WhatsApp: 5493434658210 | Instagram: @deportesanbenito
- Inscripción online: https://forms.gle/6v12MovAy6AeCxTJ9 | Ficha médica: obligatoria
- Golf Croquet: +55 años, L y Mi 9:00 hs, Parque Vieytes (Prof. Guillermina Clausich, Marcelo Monzon)
- Básquet y Voley: +6 años, L-Mi-V 17:30 hs, Plaza Barrio San Pedro (Prof. Santiago Farias)
- Beach Voley: +12 años, L-Mi-V 14:30 hs, Parque Vieytes (Prof. Milagros Schumacher, Alejandro Monzón)
- Zumba: todas las edades, Parque Vieytes y CIC Barrio San Pedro (Prof. Vanina Bernasconi)
- Atletismo: todas las edades, L-Ma-Mi-Ju 17:30 hs, Parque Vieytes (Prof. Alejandro Monzon)
- Running: todas las edades, L y Mi 20:15 hs, Parque Vieytes (Prof. Gillermo Galeano)
- Inscripción abierta todo el año

📚 PUNTO DIGITAL Y BIBLIOTECA "Santiago Tórtul":
- Ubicación: Friuli 1051 | WhatsApp: 3434508085 | Horario: L-V 7:00-19:00 hs
- Talleres idiomas: Inglés (7-9, 10-14, +15 años), Portugués (7-10, 11-14, +15 años)
- Talleres tecnología: Programación Web Full Stack, Computación para Adultos (+40), Robótica Niños (8-11)
- Talleres bienestar: Envejecientemente Activ@, Yoga
- SUBE 24hs: terminal de autoservicio disponible en Biblioteca para cargar saldo/consultar/beneficios

🏘️ CIC BARRIO SAN PEDRO:
- Ubicación: Garay y Nogoyá, Barrio San Pedro | WhatsApp: 3434508085
- Talleres: Computación (niños 8-14, jóvenes 15-25, adultos +25), Bienestar (Envejecientemente Activ@, Yoga), Telar (principiantes y avanzado)
- Cupos limitados, requiere domicilio en San Benito

🏢 NIDO (Núcleo de Innovación y Desarrollo de Oportunidades):
- Ubicación: Buenos Aires y Misiones | Coordinador: Jorge Buffa
- Horario oficinas: L-V 7:00-13:00 hs y 15:00-19:00 hs
- Talleres: Apoyo Escolar Primario (mat. L-Mi-Ju 9-10:15hs, vesp. L-Mi-V 17-18:15hs), Guitarra (L-Ju-V 16:45-19:15hs), Folclore (Ma-Ju 18-20:30hs), Danzas Típicas (L 18-20hs), Vení a Bailar (L 16-17hs), Banda de Música Municipal (Mi 18-20:40hs), Tango (Sáb 16-18hs)
- Escuela de Emprendedores: capacitaciones para emprendedores locales
- SUM: capacidad 80 personas + proyector, disponible para instituciones (previa disponibilidad)
- Áreas en NIDO: Producción y Empleo, Área Mujer y Género

💜 ÁREA MUJER Y GÉNERO:
- Ubicación: NIDO (Buenos Aires y Misiones) | WhatsApp: 3435204239
- Coordinadora: Aumassanne Ma. Camila | Trabajadora Social: Navoni Jesica
- Psicóloga: Tamborini Brenda | Abogada: Duro Rivas Valeria
- Creada: 11 de julio de 2018, Ordenanza N° 510-16

💼 PRODUCCIÓN Y EMPLEO:
- Ubicación: NIDO (Buenos Aires y Misiones) | WhatsApp: 3434657917
- Horario: L-V 8:00-13:00 hs
- Servicios: Reempadronamiento emprendedores, organización de ferias, atención a feriantes, asesoramiento a PyMEs
- Reempadronamiento online: https://forms.gle/2nQfHh6LixSHKrR5A

🧓 TERCERA EDAD Y DISCAPACIDAD:
- Ubicación: Basavilbaso 1093 | WhatsApp: 3433027297
- Email: adultosmayoresydiscapacidadsb@gmail.com

📋 CAV (Centro Atención Vecino):
- WhatsApp: 3436127013 | Basavilbaso 1094
- Función: reclamos (baches, alumbrado, basura, limpieza, árboles, cloacas, etc.)
- Atención presencial y WhatsApp: L-V 7:00-13:00 hs

🎨 TALLERES CULTURALES:
- Ver sección NIDO para talleres artísticos y culturales

🗺️ CIUDAD DE SAN BENITO:
- Fundada: 1879 por inmigrantes del Friuli (Italia/Austria), Colonia "3 de Febrero"
- Distancia a Paraná: 12 km | Departamento Paraná, Entre Ríos
- Barrios: Las Tunas, San Pedro, San Martín, San Sebastián, Portal del Sol, Solvencia, Altos del Este, 250 Viviendas, y más de 20 barrios en total

🚌 TRANSPORTE PÚBLICO:
- Colectivos que conectan San Benito con Paraná, Colonia Avellaneda y Oro Verde
- SUBE 24hs: Biblioteca Municipal "Santiago Tórtul" (Friuli 1051)

🌐 MESA DE ENTRADA:
- Ubicación: Edificio Municipal, Basavilbaso 1094
- Para presentar trámites: nota de solicitud + fotocopia DNI. La nota debe incluir nombre/apellido, domicilio real, datos de contacto (email y teléfono), firmada por el presentante

REGLAS ABSOLUTAS PARA TUS RESPUESTAS:
1. ✅ SOLO usa información de este documento. NUNCA inventes datos.
2. ✅ Respuestas CONCISAS (máximo 5 líneas). Usá bullets cuando haya varios items.
3. ✅ SIEMPRE incluí el contacto relevante (WhatsApp/teléfono/email).
4. ✅ Usá emojis para hacer el mensaje más visual.
5. ✅ Si no tenés la info exacta: respondé "No tengo esa información específica. Contactá a la municipalidad al 343-4973454."
6. ❌ NUNCA uses "creo que", "posiblemente", "aproximadamente", "tal vez".
7. ❌ Si la pregunta NO tiene relación con la Municipalidad de San Benito, sus servicios, trámites, la ciudad o información municipal, respondé ÚNICAMENTE: "Solo puedo ayudarte con información de la Municipalidad de San Benito. ¿Hay algún trámite o servicio municipal en lo que pueda ayudarte? 🏛️"
8. ✅ Ante preguntas sobre el tiempo, política nacional, deportes, noticias u otros temas ajenos al municipio, aplicá siempre la regla 7.`

/**
 * GET: Verificar estado del servicio Groq
 */
export async function GET() {
  try {
    const isConfigured = Boolean(API_KEY)

    if (!isConfigured) {
      return NextResponse.json({
        configured: false,
        available: false,
        model: MODEL_NAME,
        provider: 'groq',
        error: 'GROQ_API_KEY no configurada',
      })
    }

    // Prueba simple para verificar disponibilidad
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL_NAME,
        messages: [{ role: 'user', content: 'Responde solo con OK' }],
        max_tokens: 10,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error?.message || `HTTP ${response.status}`)
    }

    const data = await response.json()
    const text = data.choices?.[0]?.message?.content || ''

    return NextResponse.json({
      configured: true,
      available: text.length > 0,
      model: MODEL_NAME,
      provider: 'groq',
    })
  } catch (error) {
    console.error('Error en GET /api/chat:', error)

    const errorMessage = error instanceof Error ? error.message : 'Error desconocido'
    const isRateLimited = errorMessage.includes('429') || errorMessage.includes('rate')

    return NextResponse.json(
      {
        configured: true,
        available: false,
        model: MODEL_NAME,
        provider: 'groq',
        error: isRateLimited
          ? 'Sistema temporalmente ocupado. Intenta en unos segundos.'
          : errorMessage,
      },
      { status: isRateLimited ? 429 : 500 },
    )
  }
}

/**
 * POST: Generar respuesta con Groq/Llama
 */
export async function POST(request: Request) {
  try {
    // Validar configuración
    if (!API_KEY) {
      return NextResponse.json(
        {
          success: false,
          response:
            'El servicio de IA no está configurado. Contactá a la Municipalidad al 343-4973454.',
          error: 'API Key no configurada',
        },
        { status: 503 },
      )
    }

    // Parsear body
    const body = await request.json()
    const { query, history } = body

    // Validar query
    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      return NextResponse.json(
        {
          success: false,
          response: 'Por favor, ingresa una consulta válida.',
          error: 'Query vacía o inválida',
        },
        { status: 400 },
      )
    }

    console.log('📨 Consulta recibida:', query.substring(0, 50) + '...')

    // Construir mensajes para el chat
    const messages: Array<{ role: string; content: string }> = [
      { role: 'system', content: SYSTEM_PROMPT },
    ]

    // Agregar historial si existe
    if (history && Array.isArray(history)) {
      for (const msg of history.slice(-6)) {
        // Últimos 6 mensajes
        messages.push({
          role: msg.role === 'user' ? 'user' : 'assistant',
          content: msg.content || msg.parts,
        })
      }
    }

    // Agregar la consulta actual
    messages.push({ role: 'user', content: query.trim() })

    // Llamar a Groq API con fallback de modelos
    let responseText = ''
    let lastError: Error | null = null

    for (const model of MODELS) {
      try {
        const response = await fetch(GROQ_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${API_KEY}`,
          },
          body: JSON.stringify({
            model,
            messages,
            max_tokens: 512,
            temperature: 0.6,
            top_p: 0.9,
          }),
        })

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          const errorMsg = errorData.error?.message || `HTTP ${response.status}`

          // Rate limit en este modelo: probar el siguiente
          if (response.status === 429) {
            console.warn(`⚠️ Rate limit en modelo ${model}, probando siguiente...`)
            lastError = new Error('Rate limited')
            continue
          }

          throw new Error(errorMsg)
        }

        const data = await response.json()
        responseText = data.choices?.[0]?.message?.content || ''

        if (responseText) {
          console.log(`✅ Respuesta generada con modelo: ${model}`)
          break
        }
      } catch (modelError) {
        if (modelError instanceof Error && modelError.message === 'Rate limited') {
          continue
        }
        throw modelError
      }
    }

    // Si todos los modelos fallaron por rate limit
    if (!responseText && lastError?.message === 'Rate limited') {
      return NextResponse.json(
        {
          success: false,
          response:
            '🔄 El sistema está procesando muchas consultas. Por favor, esperá unos segundos e intentá de nuevo.',
          error: 'Rate limited en todos los modelos',
        },
        { status: 429 },
      )
    }

    console.log('✅ Respuesta generada:', responseText.substring(0, 50) + '...')

    return NextResponse.json({
      success: true,
      response: responseText,
      provider: 'groq',
      model: MODEL_NAME,
    })
  } catch (error) {
    console.error('❌ Error en POST /api/chat:', error)

    const errorMessage = error instanceof Error ? error.message : 'Error desconocido'

    return NextResponse.json(
      {
        success: false,
        response:
          'Lo siento, hubo un error al procesar tu consulta. Por favor, intenta de nuevo o contacta a la municipalidad al 343-4973454.',
        error: errorMessage,
      },
      { status: 500 },
    )
  }
}
