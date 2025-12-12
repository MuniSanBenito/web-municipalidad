// src/components/chatbot/knowledgeBaseEnhanced.ts

/**
 * Base de conocimiento mejorada con información REAL extraída de las páginas del sitio
 * Esta información está sincronizada con el contenido actual de las páginas TSX
 * Última actualización: Octubre 2025
 */

export interface ServiceInfo {
  nombre: string
  descripcion: string
  telefono?: string
  whatsapp?: string
  email?: string
  horario?: string
  ubicacion?: string
  requisitos?: string[]
  enlaces?: { texto: string; url: string }[]
  informacionAdicional?: string[]
}

// ===========================================
// INFORMACIÓN DE CONTACTO GENERAL
// ===========================================
export const CONTACTO_GENERAL = {
  direccion: 'Blvd. Basalvibaso 1094, San Benito, Entre Ríos, Argentina',
  telefonoPrincipal: '(0343) 4973454',
  emailPrincipal: 'Modernizacion@sanbenito.gob.ar',
  horarioGeneral: 'Lunes a Viernes de 7:00 a 13:00 hs',
  intendente: 'Ariel Voeffray',
  poblacion: '17,000 habitantes aproximadamente',
}

// ===========================================
// RENTAS - INFORMACIÓN COMPLETA
// ===========================================
export const RENTAS: ServiceInfo = {
  nombre: 'Rentas Municipales',
  descripcion:
    'La Dirección de Rentas se encarga de la recaudación de tasas y contribuciones municipales, brindando a los contribuyentes herramientas para facilitar el cumplimiento de sus obligaciones tributarias.',
  whatsapp: '3436127015',
  telefono: '(0343) 4973454',
  email: 'rentas@munisanbenito.gov.ar',
  horario: 'Lunes a Viernes de 7:00 a 13:00 hs',
  ubicacion: 'Edificio Municipal - Blvd. Basalvibaso 1094, San Benito',
  enlaces: [
    {
      texto: 'Sistema de Gestión Tributaria',
      url: 'http://sigem.sanbenito.gob.ar/ingresospublicos/ingresospublicos.aspx',
    },
  ],
  informacionAdicional: [
    'Tasas disponibles: Tasa General Inmobiliaria (TGI), Tasa de Higiene Profilaxis y Seguridad, Obras Sanitarias, Convenios de Pagos, Obras por Mejoras',
    'Para solicitar usuario y contraseña del sistema: enviar email a rentas@munisanbenito.gov.ar o contactar por WhatsApp 3436127015',
    'Instructivos disponibles para generación y pago de tasas',
  ],
}

// ===========================================
// LICENCIA DE CONDUCIR - INFORMACIÓN COMPLETA
// ===========================================
export const LICENCIA_CONDUCIR: ServiceInfo = {
  nombre: 'Licencia Nacional de Conducir',
  descripcion: 'Trámite para obtener la licencia de conducir original, renovación o ampliación',
  whatsapp: '3436127014',
  horario: 'Lunes a Viernes de 7:00 a 13:00 hs',
  requisitos: [
    'Constancia del grupo sanguíneo',
    'DNI y fotocopia del mismo',
    'Constancia de CUIL',
    'Certificado Nacional de Antecedentes de Tránsito (CENAT) - Descarga: https://boletadepago.seguridadvial.gob.ar/',
    'Examen psicofísico obligatorio (turnos al iniciar trámite)',
    'Curso de Educación Vial - Acceso: http://curso.seguridadvial.gob.ar/',
    'Curso presencial: Lunes 8:00-10:00 hs (autos) y 10:00-12:00 hs (motos)',
    'Menores de 18 años: Autorización representante legal en Juzgado de Paz (25 de mayo 960, San Benito) con fotocopia de libreta de familia o partida de nacimiento',
    'Para jóvenes 16-21 años: Curso MPL adicional - https://mpl.seguridadvial.gob.ar/',
    'Tasa municipal (se emite el día del turno en área de Rentas)',
    'Es requisito obligatorio saber leer para solicitar clases A y B',
  ],
  informacionAdicional: [
    'La tasa municipal se abona el mismo día del trámite',
    'El certificado CENAT debe descargarse y pagarse según centros de pago establecidos',
  ],
}

// ===========================================
// OBRAS PRIVADAS - INFORMACIÓN COMPLETA
// ===========================================
export const OBRAS_PRIVADAS: ServiceInfo = {
  nombre: 'Obras Privadas',
  descripcion:
    'La Dirección de Obras Privadas regula y controla las construcciones dentro del municipio, garantizando el cumplimiento de las normativas vigentes y el desarrollo urbano ordenado.',
  telefono: '(0343) 4973454',
  email: 'obrasprivadas@munisanbenito.gov.ar',
  horario: 'Lunes a Viernes de 7:00 a 13:00 hs',
  ubicacion: 'Edificio Municipal',
  requisitos: [
    'Título de propiedad o boleto de compra-venta certificado',
    'Plano de mensura visado por la Dirección de Catastro',
    'Libre deuda municipal',
    'Certificado de factibilidad de servicios',
    'Planos firmados por profesional habilitado',
  ],
  informacionAdicional: [
    'Trámites disponibles: Inscripción Municipal de Profesional, Presentación de Proyecto, Presentación de Relevamiento, Presentación de Final de Obra',
    'Normativa aplicable: Código de Edificación Municipal, Ordenanza de Uso del Suelo, Reglamentaciones sobre retiros y factores de ocupación, Normativas de seguridad e higiene',
  ],
}

// ===========================================
// HABILITACIONES COMERCIALES
// ===========================================
export const HABILITACIONES: ServiceInfo = {
  nombre: 'Habilitaciones Comerciales',
  descripcion:
    'Trámites para habilitar comercios, servicios, gastronomía e industrias en San Benito',
  whatsapp: '3434537319',
  email: 'habilitaciones@munisanbenito.gov.ar',
  horario: 'Lunes a Viernes de 7:00 a 13:00 hs',
  ubicacion: 'Edificio Municipal - Basavilbaso 1094, San Benito, Entre Ríos',
  requisitos: [
    'DNI y CUIT/CUIL',
    'Título de propiedad o contrato de alquiler',
    'Planos del local',
    'Habilitación de Bomberos (si corresponde)',
  ],
  informacionAdicional: [
    'Tipos de habilitaciones: Comercios minoristas, Servicios profesionales, Gastronomía, Industrias',
    'La documentación debe presentarse en el Área de Habilitaciones Comerciales',
  ],
}

// ===========================================
// ACTIVIDADES DEPORTIVAS
// ===========================================
export const ACTIVIDADES_DEPORTIVAS: ServiceInfo = {
  nombre: 'Actividades Deportivas Municipales',
  descripcion: 'Talleres municipales deportivos y recreativos gratuitos para todas las edades',
  whatsapp: '5493434682745',
  horario: 'Horarios variados según actividad',
  enlaces: [
    {
      texto: 'Inscripción Online',
      url: 'https://forms.gle/6v12MovAy6AeCxTJ9',
    },
    {
      texto: 'Descargar Ficha Médica',
      url: '/documents/FICHA-MEDICA-DEPORTES-SAN-BENITO.docx',
    },
  ],
  informacionAdicional: [
    'ACTIVIDADES DISPONIBLES:',
    '• Golf Croquet Municipal: +55 años, Lunes 9:00 hs (Guillermina Clausich, Ariadna Vince)',
    '• Actividades Recreativas en Agua: +55 años, Martes y Jueves 10:00 hs (Guillermina Clausich, Solange Valin)',
    '• Iniciación Deportiva: 3-7 años, Lunes y Miércoles 10:15 hs (Guillermina Clausich, Solange Valin)',
    '• Escuela de Beach Voley: +12 años, Lunes, Miércoles y Viernes 14:30 hs (Magalí Meier, Alejandro Monzón)',
    '',
    'PUNTOS DEPORTIVOS:',
    '• Parque Vieytes',
    '• Av. Marizza y Av. Paraná',
    '• Plaza el Triángulo (Echague y Gob Mihura)',
    '• Barrio Las Tunas (Plaza)',
    '• Barrio San Pedro (Salón - CIC)',
    '• Barrios Solvencia - Altos del Este',
    '• Barrio 250 Viviendas Mutual Modelo',
    '• Barrio San Martín (Plaza)',
    '• Barrio San Sebastián (Gob. Quirós y Tibiletti)',
    '• Barrio Portal del Sol',
    '',
    'IMPORTANTE: Es obligatorio presentar la ficha médica completa para participar',
  ],
}

// ===========================================
// CENTRO DE ATENCIÓN AL VECINO (CAV)
// ===========================================
export const CAV: ServiceInfo = {
  nombre: 'Centro de Atención Al Vecino (CAV)',
  descripcion:
    'Recepción y gestión de reclamos ciudadanos, atención personalizada presencial y por WhatsApp',
  whatsapp: '3436127013',
  horario: 'Lunes a Viernes de 7:00 a 13:00 hs (presencial y WhatsApp)',
  informacionAdicional: [
    'Canales de atención: WhatsApp y presencial',
    'Se encarga de recibir y gestionar reclamos para mejorar la calidad de vida en la comunidad',
  ],
}

// ===========================================
// OTROS SERVICIOS
// ===========================================
export const CATASTRO: ServiceInfo = {
  nombre: 'Catastro',
  descripcion: 'Servicio de catastro municipal',
  horario: 'Lunes a Viernes de 7:00 a 13:00 hs',
  ubicacion: 'Edificio Municipal',
}

export const MESA_ENTRADA: ServiceInfo = {
  nombre: 'Mesa de Entrada',
  descripcion: 'Recepción de trámites generales',
  telefono: '(0343) 4973454',
  horario: 'Lunes a Viernes de 7:00 a 13:00 hs',
  ubicacion: 'Edificio Municipal',
}

export const PUNTO_DIGITAL: ServiceInfo = {
  nombre: 'Punto Digital y Biblioteca',
  descripcion: 'Acceso a computadoras, internet y biblioteca municipal',
  whatsapp: '3434508085',
  horario: 'Lunes a Viernes de 8:00 a 12:00 y 16:00 a 20:00 hs',
}

export const TALLERES_CULTURALES: ServiceInfo = {
  nombre: 'Talleres Culturales',
  descripcion: 'Talleres gratuitos de arte y cultura para la comunidad',
  telefono: '(0343) 4973454',
  horario: 'Horarios variados según taller',
}

export const AREA_MUJER: ServiceInfo = {
  nombre: 'Área de la Mujer',
  descripcion: 'Asesoramiento y apoyo para mujeres',
  telefono: '(0343) 4973454',
  horario: 'Lunes a Viernes de 7:00 a 13:00 hs',
}

// ===========================================
// ÍNDICE COMPLETO DE SERVICIOS
// ===========================================
export const SERVICIOS_COMPLETOS: { [key: string]: ServiceInfo } = {
  rentas: RENTAS,
  licencia: LICENCIA_CONDUCIR,
  'licencia-conducir': LICENCIA_CONDUCIR,
  obras: OBRAS_PRIVADAS,
  'obras-privadas': OBRAS_PRIVADAS,
  habilitaciones: HABILITACIONES,
  deportes: ACTIVIDADES_DEPORTIVAS,
  'actividades-deportivas': ACTIVIDADES_DEPORTIVAS,
  cav: CAV,
  catastro: CATASTRO,
  'mesa-entrada': MESA_ENTRADA,
  'punto-digital': PUNTO_DIGITAL,
  'talleres-culturales': TALLERES_CULTURALES,
  'area-mujer': AREA_MUJER,
}

// ===========================================
// KEYWORDS PARA BÚSQUEDA (MEJORADO)
// ===========================================

// Mapa de sinónimos y variaciones ortográficas
const SINONIMOS: { [key: string]: string[] } = {
  rentas: [
    'rentas',
    'impuesto',
    'impuestos',
    'tasa',
    'tasas',
    'pago',
    'pagos',
    'pagar',
    'abonar',
    'tributo',
    'tributario',
    'tgi',
    'obras sanitarias',
    'deuda',
    'deudas',
    'cuota',
    'cuotas',
    'contribucion',
    'contribución',
    'factura',
    'boleta',
    // Variantes regionales argentinas
    'guita',
    'morfi', // coloquial para deuda
    'afip',
    'monotributo',
    'inmobiliario',
    'ABL',
    'patente',
  ],
  licencia: [
    'licencia',
    'conducir',
    'carnet',
    'carné',
    'registro',
    'manejar',
    'manejo',
    'auto',
    'moto',
    'vehiculo',
    'vehículo',
    'chofer',
    'conduccion',
    'conducción',
    'cenat',
    'psicofisico',
    'psicofísico',
    // Variantes regionales argentinas
    'birro', // coloquial para auto
    'movil',
    'coche',
    'camioneta',
    'camion',
    'camión',
    'colectivo',
    'combi',
    'bici',
    'bicicleta',
  ],
  obras: [
    'obra',
    'obras',
    'construccion',
    'construcción',
    'edificar',
    'edificacion',
    'edificación',
    'plano',
    'planos',
    'construir',
    'reforma',
    'reformar',
    'ampliacion',
    'ampliación',
    'edificio',
    'permiso de obra',
    'arquitecto',
    'ingeniero',
  ],
  habilitaciones: [
    'habilitacion',
    'habilitación',
    'habilitar',
    'comercial',
    'comercio',
    'comercios',
    'local',
    'locales',
    'negocio',
    'negocios',
    'empresa',
    'emprendimiento',
    'kiosco',
    'almacen',
    'almacén',
    'restaurante',
    'bar',
    'gastronomia',
    'gastronomía',
    'industria',
    // Variantes regionales argentinas
    'boliche', // bar/negocio
    'pyme',
    'microemprendimiento',
    'tienda',
    'despensa',
    'maxikiosco',
    'verduleria',
    'carniceria',
    'panaderia',
    'farmacia',
    'peluqueria',
    'taller mecanico',
  ],
  deportes: [
    'deporte',
    'deportes',
    'deportivo',
    'deportiva',
    'deportivas',
    'futbol',
    'fútbol',
    'voley',
    'vóley',
    'volleyball',
    'natacion',
    'natación',
    'pileta',
    'piscina',
    'golf',
    'croquet',
    'gimnasia',
    'fitness',
    'entrenar',
    'entrenamiento',
    'actividad fisica',
    'actividad física',
    'beach',
    'taller deportivo',
    'ficha medica',
    'ficha médica',
  ],
  cav: [
    'cav',
    'reclamo',
    'reclamos',
    'reclamar',
    'queja',
    'quejas',
    'vecino',
    'vecinos',
    'denuncia',
    'denunciar',
    'problema',
    'problemas',
    'arreglar',
    'bache',
    'luz',
    'alumbrado',
    'basura',
    'limpieza',
    'calle rota',
    'vereda',
    // Variantes regionales argentinas
    'quilombo', // problema coloquial
    'bardear',
    'pozo',
    'inundacion',
    'inundación',
    'arbol caido',
    'árbol caído',
    'corte de luz',
    'sin agua',
    'cloacas',
    'desague',
    'zanja',
    'perro suelto',
    'ruido',
    'molestia',
  ],
  'punto-digital': [
    'punto digital',
    'biblioteca',
    'computadora',
    'computadoras',
    'internet',
    'wifi',
    'impresion',
    'impresión',
    'imprimir',
    'escanear',
    'libro',
    'libros',
  ],
  catastro: ['catastro', 'terreno', 'lote', 'parcela', 'mensura', 'subdivision', 'subdivisión'],
  'area-mujer': [
    'mujer',
    'mujeres',
    'genero',
    'género',
    'violencia',
    'asistencia mujer',
    'ayuda mujer',
  ],
  'talleres-culturales': [
    'cultura',
    'cultural',
    'taller',
    'talleres',
    'arte',
    'artístico',
    'artistico',
    'pintura',
    'musica',
    'música',
    'teatro',
    'danza',
    'baile',
  ],
}

export const KEYWORDS_MAP: { [keyword: string]: string } = {}

// Construir el mapa de keywords dinámicamente
for (const [servicio, keywords] of Object.entries(SINONIMOS)) {
  for (const keyword of keywords) {
    KEYWORDS_MAP[keyword] = servicio
  }
}

/**
 * Normaliza texto removiendo acentos y caracteres especiales
 */
function normalizarTexto(texto: string): string {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Calcula la similitud entre dos palabras usando distancia de Levenshtein simplificada
 */
function calcularSimilitud(a: string, b: string): number {
  if (a === b) return 1
  if (a.length < 3 || b.length < 3) return a === b ? 1 : 0

  // Verificar si una contiene a la otra
  if (a.includes(b) || b.includes(a)) return 0.8

  // Verificar inicio común
  const minLen = Math.min(a.length, b.length)
  let commonPrefix = 0
  for (let i = 0; i < minLen; i++) {
    if (a[i] === b[i]) commonPrefix++
    else break
  }

  return commonPrefix / Math.max(a.length, b.length)
}

/**
 * Busca un servicio por palabra clave con búsqueda inteligente
 */
export function buscarServicioPorKeyword(query: string): ServiceInfo | null {
  const queryNormalizado = normalizarTexto(query)
  const palabrasQuery = queryNormalizado.split(' ').filter((p) => p.length > 2)

  // Puntuación para cada servicio
  const puntuaciones: { [key: string]: number } = {}

  // Buscar coincidencias en keywords
  for (const [keyword, serviceKey] of Object.entries(KEYWORDS_MAP)) {
    const keywordNorm = normalizarTexto(keyword)

    // Coincidencia exacta en la query
    if (queryNormalizado.includes(keywordNorm)) {
      puntuaciones[serviceKey] = (puntuaciones[serviceKey] || 0) + 10
      continue
    }

    // Verificar similitud con cada palabra de la query
    for (const palabra of palabrasQuery) {
      const similitud = calcularSimilitud(palabra, keywordNorm)
      if (similitud >= 0.7) {
        puntuaciones[serviceKey] = (puntuaciones[serviceKey] || 0) + similitud * 5
      }
    }
  }

  // Encontrar el servicio con mayor puntuación
  let mejorServicio: string | null = null
  let mejorPuntuacion = 0

  for (const [servicio, puntuacion] of Object.entries(puntuaciones)) {
    if (puntuacion > mejorPuntuacion) {
      mejorPuntuacion = puntuacion
      mejorServicio = servicio
    }
  }

  // Solo devolver si la puntuación es significativa
  if (mejorServicio && mejorPuntuacion >= 3) {
    return SERVICIOS_COMPLETOS[mejorServicio] || null
  }

  return null
}

/**
 * Formatea la información de un servicio como texto optimizado
 */
export function formatearServicio(servicio: ServiceInfo): string {
  // Determinar emoji según el servicio
  const emojis: { [key: string]: string } = {
    'Rentas Municipales': '💰',
    'Licencia Nacional de Conducir': '🚗',
    'Obras Privadas': '🏗️',
    'Habilitaciones Comerciales': '🏪',
    'Actividades Deportivas Municipales': '⚽',
    'Centro de Atención Al Vecino (CAV)': '📋',
    'Punto Digital y Biblioteca': '📚',
    'Talleres Culturales': '🎨',
    'Área de la Mujer': '💜',
    Catastro: '🗺️',
    'Mesa de Entrada': '📝',
  }

  const emoji = emojis[servicio.nombre] || '📋'

  let texto = `${emoji} **${servicio.nombre}**\n\n`
  texto += `${servicio.descripcion}\n\n`

  // Sección de contacto compacta
  const contactos: string[] = []
  if (servicio.whatsapp) contactos.push(`📱 WhatsApp: ${servicio.whatsapp}`)
  if (servicio.telefono) contactos.push(`📞 Tel: ${servicio.telefono}`)
  if (servicio.email) contactos.push(`📧 ${servicio.email}`)

  if (contactos.length > 0) {
    texto += contactos.join('\n') + '\n'
  }

  if (servicio.horario) {
    texto += `🕒 ${servicio.horario}\n`
  }

  if (servicio.ubicacion) {
    texto += `📍 ${servicio.ubicacion}\n`
  }

  // Requisitos formateados
  if (servicio.requisitos && servicio.requisitos.length > 0) {
    texto += `\n**📝 Requisitos:**\n`
    servicio.requisitos.slice(0, 6).forEach((req, i) => {
      texto += `${i + 1}. ${req}\n`
    })
    if (servicio.requisitos.length > 6) {
      texto += `_(y ${servicio.requisitos.length - 6} requisitos más...)_\n`
    }
  }

  // Información adicional resumida
  if (servicio.informacionAdicional && servicio.informacionAdicional.length > 0) {
    const infoRelevante = servicio.informacionAdicional
      .filter((info) => info.trim().length > 0)
      .slice(0, 3)
    if (infoRelevante.length > 0) {
      texto += `\n**💡 Info adicional:**\n`
      infoRelevante.forEach((info) => {
        texto += `${info}\n`
      })
    }
  }

  // Enlaces útiles
  if (servicio.enlaces && servicio.enlaces.length > 0) {
    texto += `\n**🔗 Enlaces:**\n`
    servicio.enlaces.forEach((enlace) => {
      texto += `• [${enlace.texto}](${enlace.url})\n`
    })
  }

  return texto.trim()
}
