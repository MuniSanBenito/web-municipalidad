// src/components/chatbot/knowledgeBaseEnhanced.ts

/**
 * Base de conocimiento mejorada con información REAL extraída de las páginas del sitio
 * Esta información está sincronizada con el contenido actual de las páginas TSX
 * Última actualización: Febrero 2026
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
  url?: string // URL de la página con información detallada
}

// ===========================================
// INFORMACIÓN DE CONTACTO GENERAL
// ===========================================
export const CONTACTO_GENERAL = {
  direccion: 'Basavilbaso 1094, San Benito, Entre Ríos, Argentina',
  telefonoPrincipal: '343-4973454',
  emailPrincipal: 'presidencia@munisanbenito.gov.ar',
  horarioGeneral: 'Lunes a Viernes de 7:00 a 13:00 hs',
  intendente: 'Ariel Voeffray',
  poblacion: '17,000 habitantes aproximadamente',
}

// ===========================================
// NÚMEROS DE EMERGENCIA
// ===========================================
export const EMERGENCIAS = [
  { nombre: 'Policía y Bomberos', telefono: '911', disponibilidad: '24 horas' },
  { nombre: 'Emergencias Médicas', telefono: '107', disponibilidad: '24 horas' },
  { nombre: 'Defensa Civil', telefono: '103', disponibilidad: '24 horas' },
  { nombre: 'Violencia de Género', telefono: '144', disponibilidad: '24 horas' },
  { nombre: 'Ayuda al Niño', telefono: '102', disponibilidad: '24 horas' },
]

// ===========================================
// RENTAS - INFORMACIÓN COMPLETA
// ===========================================
export const RENTAS: ServiceInfo = {
  nombre: 'Rentas Municipales',
  descripcion:
    'La Dirección de Rentas se encarga de la recaudación de tasas y contribuciones municipales, brindando a los contribuyentes herramientas para facilitar el cumplimiento de sus obligaciones tributarias.',
  whatsapp: '3436127015',
  telefono: '343-4973454',
  email: 'rentas@munisanbenito.gov.ar',
  horario: 'Lunes a Viernes de 7:00 a 13:00 hs',
  ubicacion: 'Edificio Municipal - Basavilbaso 1094, San Benito',
  url: '/tramites/rentas',
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
  descripcion:
    'La Licencia Nacional de Conducir es un documento único que la autoridad competente otorga a un ciudadano para habilitarlo legalmente a conducir un vehículo.',
  whatsapp: '3436127014',
  horario: 'Lunes a Viernes de 7:00 a 13:00 hs',
  url: '/tramites/licencia',
  requisitos: [
    'Constancia del grupo sanguíneo',
    'DNI y fotocopia del mismo',
    'Constancia de CUIL',
    'Certificado Nacional de Antecedentes de Tránsito (CENAT) - Descarga: https://boletadepago.seguridadvial.gob.ar/',
    'Examen psicofísico obligatorio (turnos al iniciar trámite)',
    'Curso de Educación Vial - Acceso: http://curso.seguridadvial.gob.ar/',
    'Menores de 18 años: Autorización representante legal en Juzgado de Paz (25 de mayo 960, San Benito)',
    'Tasa municipal (se emite el día del turno en área de Rentas)',
    'Saber leer para clases A y B; saber leer y escribir para clases C, D y E',
  ],
  informacionAdicional: [
    'Trámites disponibles: Licencia Original, Renovación, Ampliación, Licencia Profesional Interjurisdiccional',
    'Ubicación de pruebas prácticas: Parque Lineal San Benito (Calle Brasil)',
    'La tasa municipal se abona el mismo día del trámite',
    'El certificado CENAT debe descargarse y pagarse según centros de pago establecidos',
    'Cambio de jurisdicción: licencia caduca a los 90 días de producido el cambio no denunciado',
  ],
}

// ===========================================
// OBRAS PRIVADAS - INFORMACIÓN COMPLETA
// ===========================================
export const OBRAS_PRIVADAS: ServiceInfo = {
  nombre: 'Obras Privadas',
  descripcion:
    'La Dirección de Obras Privadas regula y controla las construcciones dentro del municipio, garantizando el cumplimiento de las normativas vigentes y el desarrollo urbano ordenado.',
  whatsapp: '3434681033',
  email: 'opriv.sanbenito@gmail.com',
  horario: 'Lunes a Viernes de 7:30 a 12:30 hs',
  ubicacion: 'Edificio Municipal - Basavilbaso 1094',
  url: '/tramites/obras-privadas',
  requisitos: [
    'Título de propiedad o boleto de compra-venta certificado',
    'Plano de mensura visado por la Dirección de Catastro',
    'Libre deuda municipal',
    'Certificado de factibilidad de servicios',
    'Planos firmados por profesional habilitado',
  ],
  informacionAdicional: [
    'Directora: Ing. Sara Carina Zapata',
    'Trámites disponibles: Inscripción Municipal de Profesional, Presentación de Proyecto, Presentación de Relevamiento, Presentación de Finalización de Obra',
    'Normativa aplicable: Código de Edificación Municipal, Ordenanza de Uso del Suelo, Reglamentaciones sobre retiros y factores de ocupación, Normativas de seguridad e higiene',
    'WhatsApp solo para mensajes (no llamadas)',
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
  url: '/tramites/habilitaciones',
  requisitos: [
    'DNI y CUIT/CUIL',
    'Título de propiedad o contrato de alquiler',
    'Planos del local',
    'Habilitación de Bomberos (si corresponde)',
  ],
  informacionAdicional: [
    'Tipos de habilitaciones: Comercios Minoristas, Servicios Profesionales, Gastronomía, Industrias',
    'La documentación debe presentarse en el Área de Habilitaciones Comerciales',
  ],
}

// ===========================================
// ACTIVIDADES DEPORTIVAS
// ===========================================
export const ACTIVIDADES_DEPORTIVAS: ServiceInfo = {
  nombre: 'Actividades Deportivas Municipales',
  descripcion:
    'Talleres municipales deportivos y recreativos gratuitos para todas las edades',
  whatsapp: '5493434682745',
  horario: 'Horarios variados según actividad',
  url: '/tramites/actividades-deportivas',
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
    '• Golf Croquet Municipal: +55 años, Lunes 9:00 hs (Prof. Guillermina Clausich, Ariadna Vince)',
    '• Actividades Recreativas en Agua: +55 años, Martes y Jueves 10:00 hs (Prof. Guillermina Clausich, Solange Valin)',
    '• Iniciación Deportiva: 3-7 años, Lunes y Miércoles 10:15 hs (Prof. Guillermina Clausich, Solange Valin)',
    '• Escuela de Beach Voley: +12 años, Lunes, Miércoles y Viernes 14:30 hs (Prof. Magalí Meier, Alejandro Monzón)',
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
    'IMPORTANTE: Es obligatorio presentar la ficha médica completa para participar. La inscripción está abierta todo el año.',
  ],
}

// ===========================================
// CENTRO DE ATENCIÓN AL VECINO (CAV)
// ===========================================
export const CAV: ServiceInfo = {
  nombre: 'Centro de Atención Al Vecino (CAV)',
  descripcion:
    'Recepción y gestión de reclamos ciudadanos, atención personalizada presencial y por WhatsApp para mejorar la calidad de vida en la comunidad',
  whatsapp: '3436127013',
  telefono: '343-6127013',
  horario: 'Lunes a Viernes de 7:00 a 13:00 hs (presencial y WhatsApp)',
  ubicacion: 'Basavilbaso 1094',
  url: '/tramites/cav',
  informacionAdicional: [
    'Canales de atención: WhatsApp y presencial',
    'Se encarga de recibir y gestionar reclamos para mejorar la calidad de vida en la comunidad',
  ],
}

// ===========================================
// PUNTO DIGITAL Y BIBLIOTECA
// ===========================================
export const PUNTO_DIGITAL: ServiceInfo = {
  nombre: 'Punto Digital y Biblioteca Municipal "Santiago Tórtul"',
  descripcion:
    'Espacio cultural y educativo que ofrece acceso a computadoras, internet, biblioteca y talleres educativos gratuitos',
  whatsapp: '3434508085',
  telefono: '3434508085',
  horario: 'Lunes a Viernes de 7:00 a 19:00 hs',
  ubicacion: 'Friuli 1051',
  url: '/tramites/punto-digital-biblioteca',
  informacionAdicional: [
    'TALLERES DE IDIOMAS:',
    '• Inglés Inicial (7 a 9 años, 10 a 14 años, +15 años)',
    '• Portugués Inicial (7 a 10 años, 11 a 14 años, +15 años)',
    '',
    'TALLERES DE TECNOLOGÍA:',
    '• Programación Web Full Stack',
    '• Computación para Adultos (+40 años)',
    '• Robótica para Niños (8 a 11 años)',
    '',
    'TALLERES DE BIENESTAR:',
    '• Envejecientemente Activ@',
    '• Yoga en el Vieytes',
    '',
    'REQUISITOS: Cupos limitados. Requisito tener domicilio en San Benito.',
  ],
}

// ===========================================
// ÁREA DE LA MUJER Y GÉNERO
// ===========================================
export const AREA_MUJER: ServiceInfo = {
  nombre: 'Área Mujer y Género',
  descripcion:
    'Espacio dedicado a trabajar para erradicar la violencia de género, brindando acompañamiento, asesoramiento legal y contención psicológica',
  whatsapp: '3435204239',
  telefono: '3435204239',
  horario: 'Lunes a Viernes de 7:00 a 13:00 hs',
  ubicacion: 'NIDO - Buenos Aires y Misiones',
  url: '/tramites/area-mujer',
  informacionAdicional: [
    'Creada el 11 de julio de 2018 bajo Ordenanza N° 510-16',
    'Equipo de trabajo:',
    '• Coordinadora: Aumassanne Ma. Camila',
    '• Trabajadora Social: Navoni Jesica',
    '• Psicóloga (equipo técnico): Tamborini Brenda',
    '• Equipo técnico: Vicentin Silvana',
    '• Psicóloga (tratamiento individual): Yoris María Laura',
    '• Abogada (asesoramiento legal): Duro Rivas Valeria',
    '• Administrativa: Beber Claudia',
    '• Promotora de derechos: Romero Celestina',
  ],
}

// ===========================================
// PRODUCCIÓN Y EMPLEO
// ===========================================
export const PRODUCCION_EMPLEO: ServiceInfo = {
  nombre: 'Área de Producción y Empleo',
  descripcion:
    'Espacio de apoyo a emprendedores locales y fomento del desarrollo productivo de San Benito',
  whatsapp: '3434470379',
  telefono: '3434470379',
  horario: 'Lunes a Viernes de 8:00 a 13:00 hs',
  ubicacion: 'NIDO - Buenos Aires y Misiones',
  url: '/tramites/produccion-empleo',
  enlaces: [
    {
      texto: 'Reempadronamiento de Emprendedores',
      url: 'https://forms.gle/2nQfHh6LixSHKrR5A',
    },
  ],
  informacionAdicional: [
    'Registro de emprendedores para acceso a programas, capacitaciones y beneficios',
  ],
}

// ===========================================
// TERCERA EDAD Y DISCAPACIDAD
// ===========================================
export const TERCERA_EDAD: ServiceInfo = {
  nombre: 'Tercera Edad y Discapacidad',
  descripcion: 'Atención y servicios para adultos mayores y personas con discapacidad',
  whatsapp: '3433027297',
  telefono: '3433027297',
  email: 'adultosmayoresydiscapacidadsb@gmail.com',
  horario: 'Lunes a Viernes de 7:00 a 13:00 hs',
  ubicacion: 'Basavilbaso 1093',
  url: '/tramites/tercera-edad-discapacidad',
}

// ===========================================
// ÁREA NIÑEZ Y ACCIÓN SOCIAL
// ===========================================
export const NINEZ_ACCION_SOCIAL: ServiceInfo = {
  nombre: 'Área de Niñez, Adolescencia y Acción Social',
  descripcion: 'Atención y servicios para niños, adolescentes y acción social',
  telefono: '0343-4973644',
  horario: 'Lunes a Viernes de 7:00 a 13:00 hs',
  ubicacion: 'Basavilbaso 1093',
}

// ===========================================
// JUZGADO DE FALTAS
// ===========================================
export const JUZGADO_FALTAS: ServiceInfo = {
  nombre: 'Juzgado de Faltas/Tránsito, Transporte e Inspección General',
  descripcion: 'Atención de faltas, tránsito, transporte e inspección general',
  telefono: '0343-4973821',
  horario: 'Lunes a Viernes de 7:00 a 13:00 hs',
  ubicacion: '25 de Mayo 944',
}

// ===========================================
// HONORABLE CONCEJO DELIBERANTE
// ===========================================
export const CONCEJO_DELIBERANTE: ServiceInfo = {
  nombre: 'Honorable Concejo Deliberante',
  descripcion: 'Órgano legislativo municipal',
  whatsapp: '3434700140',
  telefono: '3434700140',
  horario: 'Lunes a Viernes de 7:00 a 13:00 hs',
  ubicacion: 'Av. Friuli y Rivadavia',
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
  telefono: '343-4973454',
  horario: 'Lunes a Viernes de 7:00 a 13:00 hs',
  ubicacion: 'Edificio Municipal',
}

export const TALLERES_CULTURALES: ServiceInfo = {
  nombre: 'Talleres Culturales',
  descripcion: 'Talleres gratuitos de arte y cultura para la comunidad',
  telefono: '343-4973454',
  horario: 'Horarios variados según taller',
  url: '/tramites/talleres-culturales',
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
  biblioteca: PUNTO_DIGITAL,
  'talleres-culturales': TALLERES_CULTURALES,
  'area-mujer': AREA_MUJER,
  mujer: AREA_MUJER,
  genero: AREA_MUJER,
  'produccion-empleo': PRODUCCION_EMPLEO,
  empleo: PRODUCCION_EMPLEO,
  emprendedores: PRODUCCION_EMPLEO,
  'tercera-edad': TERCERA_EDAD,
  discapacidad: TERCERA_EDAD,
  ninez: NINEZ_ACCION_SOCIAL,
  'accion-social': NINEZ_ACCION_SOCIAL,
  'juzgado-faltas': JUZGADO_FALTAS,
  transito: JUZGADO_FALTAS,
  concejo: CONCEJO_DELIBERANTE,
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
    'inmobiliario',
    'patente',
    'higiene',
    'profilaxis',
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
    'coche',
    'camioneta',
    'camion',
    'camión',
    'renovacion',
    'renovación',
    'original',
    'ampliacion',
    'ampliación',
    'profesional',
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
    'relevamiento',
    'final de obra',
    'proyecto',
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
    'pyme',
    'tienda',
    'despensa',
    'farmacia',
    'peluqueria',
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
    'santiago tortul',
    'ingles',
    'inglés',
    'portugues',
    'portugués',
    'programacion',
    'programación',
    'robotica',
    'robótica',
    'yoga',
    'taller',
    'curso',
    'cursos',
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
    'violencia de genero',
    'violencia de género',
    '144',
  ],
  'produccion-empleo': [
    'empleo',
    'trabajo',
    'emprendedor',
    'emprendedores',
    'produccion',
    'producción',
    'pyme',
    'microemprendimiento',
    'reempadronamiento',
  ],
  'tercera-edad': [
    'tercera edad',
    'adultos mayores',
    'jubilados',
    'discapacidad',
    'discapacitados',
    'abuelos',
    'pension',
    'pensión',
  ],
  'talleres-culturales': [
    'cultura',
    'cultural',
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
 * Formatea la información de un servicio de forma CONCISA con link a página
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
    'Punto Digital y Biblioteca Municipal "Santiago Tórtul"': '📚',
    'Talleres Culturales': '🎨',
    'Área Mujer y Género': '💜',
    'Área de Producción y Empleo': '💼',
    'Tercera Edad y Discapacidad': '🧓',
    Catastro: '🗺️',
    'Mesa de Entrada': '📝',
  }

  const emoji = emojis[servicio.nombre] || '📋'

  // Descripción corta (máximo 100 caracteres)
  const descripcionCorta =
    servicio.descripcion.length > 100
      ? servicio.descripcion.substring(0, 100) + '...'
      : servicio.descripcion

  let texto = `${emoji} **${servicio.nombre}**\n${descripcionCorta}\n\n`

  // Contacto rápido (solo lo esencial)
  if (servicio.whatsapp) {
    texto += `📱 WhatsApp: ${servicio.whatsapp}\n`
  } else if (servicio.telefono) {
    texto += `📞 Tel: ${servicio.telefono}\n`
  }

  if (servicio.horario) {
    texto += `🕒 ${servicio.horario}\n`
  }

  if (servicio.ubicacion) {
    texto += `📍 ${servicio.ubicacion}\n`
  }

  // Link a la página con información completa
  if (servicio.url) {
    texto += `\n👉 **[Ver información completa](${servicio.url})**`
  } else if (servicio.enlaces && servicio.enlaces.length > 0) {
    texto += `\n🔗 [${servicio.enlaces[0].texto}](${servicio.enlaces[0].url})`
  }

  return texto.trim()
}
