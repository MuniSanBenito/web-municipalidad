// src/components/chatbot/contentValidator.ts

/**
 * Validación de respuestas del chatbot.
 * Los datos salen de knowledgeBaseEnhanced: no hay una segunda lista de teléfonos,
 * horarios ni población.
 */

import {
  buscarServicioPorKeyword,
  CONTACTO_GENERAL,
  EMERGENCIAS,
  formatearContactoGeneral,
  formatearHorariosGeneral,
  formatearServicio,
  SERVICIOS_COMPLETOS,
  type ServiceInfo,
} from './knowledgeBaseEnhanced'

function fichasUnicas(): ServiceInfo[] {
  return [...new Set(Object.values(SERVICIOS_COMPLETOS))]
}

function digitos(valor: string): string {
  return valor.replace(/\D/g, '')
}

function normalizarHora(valor: string): string {
  const [hora, minutos] = valor.split(':')
  return `${Number(hora)}:${minutos}`
}

const FICHAS = fichasUnicas()

const TEXTO_CONOCIDO = [
  CONTACTO_GENERAL.direccion,
  CONTACTO_GENERAL.horarioGeneral,
  CONTACTO_GENERAL.telefonoPrincipal,
  CONTACTO_GENERAL.emailPrincipal,
  CONTACTO_GENERAL.intendente,
  CONTACTO_GENERAL.poblacion,
  ...EMERGENCIAS.flatMap((item) => [item.nombre, item.telefono, item.disponibilidad]),
  ...FICHAS.flatMap((servicio) => [
    servicio.horario,
    servicio.telefono,
    servicio.whatsapp,
    servicio.email,
    servicio.descripcion,
    ...(servicio.informacionAdicional ?? []),
    ...(servicio.requisitos ?? []),
  ]),
]
  .filter((linea): linea is string => Boolean(linea))
  .join('\n')

const HORARIOS_CONOCIDOS = new Set(
  [...TEXTO_CONOCIDO.matchAll(/\d{1,2}:\d{2}/g)].map((match) => normalizarHora(match[0])),
)

const TELEFONOS_CONOCIDOS = [
  CONTACTO_GENERAL.telefonoPrincipal,
  ...EMERGENCIAS.map((item) => item.telefono),
  ...FICHAS.flatMap((servicio) => [servicio.telefono, servicio.whatsapp]),
]
  .filter((telefono): telefono is string => Boolean(telefono))
  .map(digitos)
  .filter((telefono) => telefono.length >= 3)

function telefonoConocido(numero: string): boolean {
  return TELEFONOS_CONOCIDOS.some(
    (conocido) => conocido === numero || conocido.endsWith(numero) || numero.endsWith(conocido),
  )
}

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
  'más o menos',
  'según tengo entendido',
  'si no me equivoco',
  'imagino que',
  'debe ser',
  'debería ser',
  'puede que',
  'es posible que',
]

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

  const uncertaintyFound = UNCERTAINTY_INDICATORS.filter((indicator) =>
    lowerResponse.includes(indicator),
  )

  if (uncertaintyFound.length > 0) {
    issues.push(`Contiene indicadores de incertidumbre: ${uncertaintyFound.join(', ')}`)
    confidence -= 30
  }

  const hallucinationFound = HALLUCINATION_INDICATORS.filter((indicator) =>
    lowerResponse.includes(indicator),
  )

  if (hallucinationFound.length > 0) {
    issues.push(
      `Contiene indicadores de información no verificada: ${hallucinationFound.join(', ')}`,
    )
    confidence -= 50
  }

  if (/tel[eé]fono|whatsapp|celular/i.test(lowerResponse)) {
    const candidatos = response.match(/\d[\d\s().-]{6,}\d/g) ?? []
    const noVerificado = candidatos.some((candidato) => {
      const numero = digitos(candidato)
      return numero.length >= 8 && !telefonoConocido(numero)
    })

    if (noVerificado) {
      issues.push('Contiene números de teléfono no verificados')
      confidence -= 40
    }
  }

  if (/\$\s?\d/.test(response)) {
    const montos = response.match(/\$\s?[\d.]+/g) ?? []
    const montoDesconocido = montos.some(
      (monto) => !TEXTO_CONOCIDO.includes(monto.replace(/\s/g, '')),
    )
    if (montoDesconocido) {
      issues.push('Contiene precios no verificados')
      confidence -= 35
    }
  }

  // Un horario de área (7:30, 19:00, etc.) es válido si esa hora está en alguna ficha.
  if (/\bhorarios?\b|\bhoras?\b/i.test(lowerResponse)) {
    const horas = response.match(/\d{1,2}:\d{2}/g) ?? []
    const horaDesconocida = horas.some((hora) => !HORARIOS_CONOCIDOS.has(normalizarHora(hora)))
    if (horaDesconocida) {
      issues.push('Contiene horarios no verificados')
      confidence -= 30
    }
  }

  if (
    lowerQuery.includes('teléfono') ||
    lowerQuery.includes('telefono') ||
    lowerQuery.includes('contacto')
  ) {
    suggestions.push('Proporcionar solo números de teléfono oficiales verificados')
  }

  if (lowerQuery.includes('horario')) {
    suggestions.push(
      `Horario general: ${CONTACTO_GENERAL.horarioGeneral}. Algunas áreas tienen otro horario.`,
    )
  }

  if (lowerQuery.includes('costo') || lowerQuery.includes('precio')) {
    suggestions.push('Indicar que los costos pueden variar y recomendar consultar directamente')
  }

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
  if (/poblaci[oó]n|habitantes/i.test(query)) {
    return `San Benito tiene ${CONTACTO_GENERAL.poblacion}.`
  }

  if (/intendente|alcalde|quien\s+gobierna/i.test(query)) {
    return `El intendente actual de San Benito es **${CONTACTO_GENERAL.intendente}** (período ${CONTACTO_GENERAL.periodoIntendencia}).`
  }

  const servicio = buscarServicioPorKeyword(query)
  if (servicio) return formatearServicio(servicio)

  if (/horario|atienden|abren?|abierto/i.test(query)) {
    return formatearHorariosGeneral()
  }

  if (
    /direcci[oó]n|ubicaci[oó]n|d[oó]nde\s+(est[aá]|queda)|c[oó]mo\s+llego|tel[eé]fono|contacto|whatsapp|llamar/i.test(
      query,
    )
  ) {
    return formatearContactoGeneral()
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

  UNCERTAINTY_INDICATORS.forEach((indicator) => {
    const regex = new RegExp(indicator, 'gi')
    sanitized = sanitized.replace(regex, '')
  })

  HALLUCINATION_INDICATORS.forEach((indicator) => {
    const regex = new RegExp(indicator, 'gi')
    sanitized = sanitized.replace(regex, '')
  })

  sanitized = sanitized
    .replace(/\s+/g, ' ')
    .replace(/[,\s]+,/g, ',')
    .replace(/[.\s]+\./g, '.')
    .trim()

  if (sanitized.length < 20) {
    const verifiedInfo = getVerifiedInformation(query)
    if (verifiedInfo) return verifiedInfo
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
      verifiedInfo + `\n\nPara más información, contactá al ${CONTACTO_GENERAL.telefonoPrincipal}.`
    )
  }

  return (
    `No tengo información específica sobre tu consulta.\n\n` +
    `Te recomiendo contactar directamente a la municipalidad:\n\n` +
    `${formatearContactoGeneral()}`
  )
}
