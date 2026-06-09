// src/components/chatbot/contentValidator.ts

/**
 * Sistema de validación de contenido para evitar alucinaciones del chatbot
 * Asegura que solo se proporcione información verificada de la municipalidad
 * Última actualización: Febrero 2026
 */

// Lista de información oficial verificada (actualizada Febrero 2026)
const VERIFIED_INFORMATION = {
  // Información de contacto oficial
  contacto: {
    telefono_principal: '343-4973454',
    email: 'presidencia@munisanbenito.gov.ar',
    direccion: 'Basavilbaso 1094, San Benito, Entre Ríos, Argentina',
    horario: 'Lunes a Viernes de 7:00 a 13:00 hs',
  },

  // WhatsApp por área (actualizado Febrero 2026)
  whatsapp: {
    rentas: '3436127015',
    licencias: '3436127014',
    habilitaciones: '3434537319',
    cav: '3436127013',
    deportes: '5493434658210',
    punto_digital: '3434508085',
    obras_privadas: '3434681033',
    area_mujer: '3435204239',
    tercera_edad: '3433027297',
    produccion_empleo: '3434657917',
    concejo: '3434700140',
  },

  // Emails por área
  emails: {
    rentas: 'rentas@munisanbenito.gov.ar',
    obras_privadas: 'opriv.sanbenito@gmail.com',
    habilitaciones: 'habilitaciones@munisanbenito.gov.ar',
    tercera_edad: 'adultosmayoresydiscapacidadsb@gmail.com',
    asesoria_legal: 'asesorialegalytecnica@sanbenito.gob.ar',
  },

  // Trámites con requisitos exactos
  tramites: {
    licencia_conducir: {
      nombre: 'Licencia de Conducir',
      requisitos: [
        'Constancia del grupo sanguíneo',
        'DNI y fotocopia',
        'Constancia de CUIL',
        'CENAT (boletadepago.seguridadvial.gob.ar)',
        'Examen psicofísico obligatorio',
        'Curso de Educación Vial',
      ],
    },
    obras_privadas: {
      nombre: 'Obras Privadas',
      requisitos: [
        'Título de propiedad o boleto compra-venta certificado',
        'Plano de mensura visado por Catastro',
        'Libre deuda municipal',
        'Certificado de factibilidad de servicios',
        'Planos firmados por profesional habilitado',
      ],
    },
    habilitacion_comercial: {
      nombre: 'Habilitación Comercial',
      requisitos: [
        'DNI y CUIT/CUIL',
        'Título de propiedad o contrato de alquiler',
        'Planos del local',
        'Habilitación Bomberos (si corresponde)',
      ],
    },
  },

  // Información general verificada
  general: {
    intendente: 'Ariel Voeffray',
    poblacion: '17,000 habitantes aproximadamente',
    provincia: 'Entre Ríos',
    pais: 'Argentina',
  },

  // Enlaces oficiales
  enlaces: {
    rentas: 'http://sigem.sanbenito.gob.ar/ingresospublicos/ingresospublicos.aspx',
    curso_vial: 'http://curso.seguridadvial.gob.ar/',
    cenat: 'https://boletadepago.seguridadvial.gob.ar/',
    deportes_inscripcion: 'https://forms.gle/6v12MovAy6AeCxTJ9',
    emprendedores: 'https://forms.gle/2nQfHh6LixSHKrR5A',
  },
}

// Palabras y frases que indican información no verificada
const UNCERTAINTY_INDICATORS = [
  'creo que',
  'posiblemente',
  'probablemente',
  'supongo',
  'me parece',
  'podría ser',
  'tal vez',
  'quizás',
  'quiz\u00e1s',
  'no estoy seguro',
  'aproximadamente',
  'más o menos',
  'según tengo entendido',
  'si no me equivoco',
  'imagino que',
  'debe ser',
  'debería ser',
  'puede que',
  'es posible que',
]

// Frases que indican información inventada
const HALLUCINATION_INDICATORS = [
  'he escuchado que',
  'según rumores',
  'me han dicho que',
  'tengo entendido que',
  'creo haber leído',
  'si mal no recuerdo',
  'por lo que sé',
  'según mi conocimiento',
  'basándome en',
  'de acuerdo a mi información',
]

/**
 * Valida si una respuesta contiene solo información verificada
 * @param response Respuesta a validar
 * @param query Consulta original del usuario
 * @returns Objeto con resultado de validación y sugerencias
 */
export function validateResponse(
  response: string,
  query: string,
): {
  isValid: boolean
  issues: string[]
  suggestions: string[]
  confidence: number
} {
  const issues: string[] = []
  const suggestions: string[] = []
  let confidence = 100

  const lowerResponse = response.toLowerCase()
  const lowerQuery = query.toLowerCase()

  // 1. Verificar indicadores de incertidumbre
  const uncertaintyFound = UNCERTAINTY_INDICATORS.filter((indicator) =>
    lowerResponse.includes(indicator),
  )

  if (uncertaintyFound.length > 0) {
    issues.push(`Contiene indicadores de incertidumbre: ${uncertaintyFound.join(', ')}`)
    confidence -= 30
  }

  // 2. Verificar indicadores de alucinación
  const hallucinationFound = HALLUCINATION_INDICATORS.filter((indicator) =>
    lowerResponse.includes(indicator),
  )

  if (hallucinationFound.length > 0) {
    issues.push(
      `Contiene indicadores de información no verificada: ${hallucinationFound.join(', ')}`,
    )
    confidence -= 50
  }

  // 3. Verificar si contiene información específica que debe ser exacta
  if (lowerResponse.includes('teléfono') || lowerResponse.includes('telefono')) {
    const hasVerifiedPhone =
      Object.values(VERIFIED_INFORMATION.whatsapp).some((phone) => response.includes(phone)) ||
      response.includes(VERIFIED_INFORMATION.contacto.telefono_principal)

    if (!hasVerifiedPhone && (lowerResponse.includes('(') || lowerResponse.includes('0343'))) {
      issues.push('Contiene números de teléfono no verificados')
      confidence -= 40
    }
  }

  // 4. Verificar costos y precios específicos
  if (
    lowerResponse.includes('$') ||
    lowerResponse.includes('peso') ||
    lowerResponse.includes('costo')
  ) {
    // Solo permitir costos verificados
    const verifiedCosts = ['$5,000', 'varía según', 'consultar']
    const hasVerifiedCost = verifiedCosts.some((cost) => lowerResponse.includes(cost.toLowerCase()))

    if (!hasVerifiedCost && /\$\d+/.test(response)) {
      issues.push('Contiene precios no verificados')
      confidence -= 35
    }
  }

  // 5. Verificar horarios específicos
  if (lowerResponse.includes('horario') || lowerResponse.includes('hora')) {
    if (!response.includes('7:00 a 13:00') && /\d{1,2}:\d{2}/.test(response)) {
      issues.push('Contiene horarios no verificados')
      confidence -= 30
    }
  }

  // 6. Generar sugerencias basadas en la consulta
  if (
    lowerQuery.includes('teléfono') ||
    lowerQuery.includes('telefono') ||
    lowerQuery.includes('contacto')
  ) {
    suggestions.push('Proporcionar solo números de teléfono oficiales verificados')
  }

  if (lowerQuery.includes('horario')) {
    suggestions.push('Confirmar horario oficial: Lunes a Viernes de 7:00 a 13:00 hs')
  }

  if (lowerQuery.includes('costo') || lowerQuery.includes('precio')) {
    suggestions.push('Indicar que los costos pueden variar y recomendar consultar directamente')
  }

  // Determinar si la respuesta es válida
  const isValid = confidence >= 70 && issues.length === 0

  return {
    isValid,
    issues,
    suggestions,
    confidence,
  }
}

/**
 * Obtiene información verificada específica para una consulta
 * @param query Consulta del usuario
 * @returns Información verificada relevante o null
 */
export function getVerifiedInformation(query: string): string | null {
  const lowerQuery = query.toLowerCase()

  // Información de contacto
  if (/tel[eé]fono|telefono|contacto|llamar|n[uú]mero/i.test(lowerQuery)) {
    if (/rentas?/i.test(lowerQuery)) {
      return `💰 **Contacto Rentas:**\n📱 WhatsApp: ${VERIFIED_INFORMATION.whatsapp.rentas}\n📧 Email: ${VERIFIED_INFORMATION.emails.rentas}`
    }
    if (/licencia|conducir/i.test(lowerQuery)) {
      return `🚗 **Contacto Licencias:**\n📱 WhatsApp: ${VERIFIED_INFORMATION.whatsapp.licencias}`
    }
    if (/habilitaci[oó]n|comercio/i.test(lowerQuery)) {
      return `🏪 **Contacto Habilitaciones:**\n📱 WhatsApp: ${VERIFIED_INFORMATION.whatsapp.habilitaciones}\n📧 Email: ${VERIFIED_INFORMATION.emails.habilitaciones}`
    }
    if (/deporte/i.test(lowerQuery)) {
      return `⚽ **Contacto Deportes:**\n📱 WhatsApp: ${VERIFIED_INFORMATION.whatsapp.deportes}`
    }
    if (/cav|reclamo|vecino/i.test(lowerQuery)) {
      return `📋 **Contacto CAV:**\n📱 WhatsApp: ${VERIFIED_INFORMATION.whatsapp.cav}`
    }
    // Información general de contacto
    return `📞 **Contactos oficiales:**\n• Principal: ${VERIFIED_INFORMATION.contacto.telefono_principal}\n• Email: ${VERIFIED_INFORMATION.contacto.email}\n\n📱 **WhatsApp por área:**\n• Rentas: ${VERIFIED_INFORMATION.whatsapp.rentas}\n• Licencias: ${VERIFIED_INFORMATION.whatsapp.licencias}\n• CAV: ${VERIFIED_INFORMATION.whatsapp.cav}`
  }

  // Horarios
  if (/horario|atienden|abren?|abierto/i.test(lowerQuery)) {
    return `🕒 **Horario de atención:** ${VERIFIED_INFORMATION.contacto.horario}`
  }

  // Dirección
  if (/direcci[oó]n|ubicaci[oó]n|donde\s+(est[aá]|queda)|como\s+llego/i.test(lowerQuery)) {
    return `📍 **Dirección:** ${VERIFIED_INFORMATION.contacto.direccion}\n🕒 **Horario:** ${VERIFIED_INFORMATION.contacto.horario}`
  }

  // Información sobre trámites específicos
  if (/licencia.*conducir|carnet/i.test(lowerQuery)) {
    const tramite = VERIFIED_INFORMATION.tramites.licencia_conducir
    return `🚗 **${tramite.nombre}:**\n\n**Requisitos:**\n${tramite.requisitos.map((r, i) => `${i + 1}. ${r}`).join('\n')}\n\n📱 WhatsApp: ${VERIFIED_INFORMATION.whatsapp.licencias}`
  }

  if (/obra|construcci[oó]n|plano/i.test(lowerQuery)) {
    const tramite = VERIFIED_INFORMATION.tramites.obras_privadas
    return `🏗️ **${tramite.nombre}:**\n\n**Requisitos:**\n${tramite.requisitos.map((r, i) => `${i + 1}. ${r}`).join('\n')}\n\n📧 Email: ${VERIFIED_INFORMATION.emails.obras_privadas}`
  }

  if (/habilitaci[oó]n.*comercial|habilitar.*comercio/i.test(lowerQuery)) {
    const tramite = VERIFIED_INFORMATION.tramites.habilitacion_comercial
    return `🏪 **${tramite.nombre}:**\n\n**Requisitos:**\n${tramite.requisitos.map((r, i) => `${i + 1}. ${r}`).join('\n')}\n\n📱 WhatsApp: ${VERIFIED_INFORMATION.whatsapp.habilitaciones}`
  }

  // Intendente
  if (/intendente|alcalde|quien\s+gobierna/i.test(lowerQuery)) {
    return `👨‍💼 El intendente actual de San Benito es **${VERIFIED_INFORMATION.general.intendente}**.`
  }

  return null
}

/**
 * Sanitiza una respuesta eliminando información no verificada
 * @param response Respuesta original
 * @param query Consulta del usuario
 * @returns Respuesta sanitizada
 */
export function sanitizeResponse(response: string, query: string): string {
  let sanitized = response

  // Eliminar frases de incertidumbre
  UNCERTAINTY_INDICATORS.forEach((indicator) => {
    const regex = new RegExp(indicator, 'gi')
    sanitized = sanitized.replace(regex, '')
  })

  // Eliminar frases de alucinación
  HALLUCINATION_INDICATORS.forEach((indicator) => {
    const regex = new RegExp(indicator, 'gi')
    sanitized = sanitized.replace(regex, '')
  })

  // Limpiar espacios extra y puntuación duplicada
  sanitized = sanitized
    .replace(/\s+/g, ' ')
    .replace(/[,\s]+,/g, ',')
    .replace(/[.\s]+\./g, '.')
    .trim()

  // Si la respuesta queda muy corta o vacía, usar información verificada
  if (sanitized.length < 20) {
    const verifiedInfo = getVerifiedInformation(query)
    if (verifiedInfo) {
      return verifiedInfo
    }
  }

  return sanitized
}

/**
 * Genera una respuesta de fallback con información verificada
 * @param query Consulta del usuario
 * @returns Respuesta de fallback segura
 */
export function generateFallbackResponse(query: string): string {
  const verifiedInfo = getVerifiedInformation(query)

  if (verifiedInfo) {
    return (
      verifiedInfo +
      `\n\n💡 Para más información, contactá al ${VERIFIED_INFORMATION.contacto.telefono_principal}.`
    )
  }

  return (
    `🤔 No tengo información específica sobre tu consulta.\n\n` +
    `Te recomiendo contactar directamente a la municipalidad:\n\n` +
    `📞 **Teléfono:** ${VERIFIED_INFORMATION.contacto.telefono_principal}\n` +
    `📧 **Email:** ${VERIFIED_INFORMATION.contacto.email}\n` +
    `🕒 **Horario:** ${VERIFIED_INFORMATION.contacto.horario}\n` +
    `📍 **Dirección:** ${VERIFIED_INFORMATION.contacto.direccion}`
  )
}
