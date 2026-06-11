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
  poblacion: '~25.000 habitantes aproximadamente',
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

export const EMERGENCIAS_INFO: ServiceInfo = {
  nombre: 'Números Útiles y de Emergencia',
  descripcion: 'Líneas directas gratuitas de asistencia y emergencias, activas las 24 horas.',
  telefono: '911',
  informacionAdicional: [
    '• Policía y Bomberos: 911 (24 horas)',
    '• Emergencias Médicas: 107 (24 horas)',
    '• Defensa Civil: 103 (24 horas)',
    '• Violencia de Género: 144 (24 horas)',
    '• Ayuda al Niño: 102 (24 horas)',
  ],
}

// ===========================================
// INFORMACIÓN DE CONTACTO GENERAL COMO SERVICIO
// ===========================================
export const CONTACTO_GENERAL_INFO: ServiceInfo = {
  nombre: 'Contacto Municipalidad y Autoridades',
  descripcion: 'Información general de contacto de la Municipalidad de San Benito.',
  telefono: '343-4973454',
  email: 'presidencia@munisanbenito.gov.ar',
  horario: 'Lunes a Viernes de 7:00 a 13:00 hs',
  ubicacion: 'Basavilbaso 1094, San Benito',
  informacionAdicional: [
    '• Intendente: Ariel Voeffray',
    '• Población: ~25.000 habitantes aproximadamente',
    '• Fundada en 1879. A 12 km del centro de Paraná (capital de Entre Ríos).',
  ],
}

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
    'Talleres municipales deportivos y recreativos gratuitos para todas las edades. ¡Sumate a la nueva temporada! Todas las actividades son gratuitas.',
  whatsapp: '5493434658210',
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
    '• Golf Croquet Municipal: +55 años, Lunes y Miércoles 9:00 hs (Prof. Guillermina Clausich, Marcelo Monzon) — Parque Vieytes',
    '• Escuela de Básquet y Voley: a partir de 6 años, Lunes, Miércoles y Viernes 17:30 hs (Prof. Santiago Farias) — Plaza Barrio San Pedro',
    '• Escuela de Beach Voley: +12 años, Lunes, Miércoles y Viernes 14:30 hs (Prof. Milagros Schumacher, Alejandro Monzón) — Parque Vieytes',
    '• Zumba: todas las edades, ver formulario para horarios (Prof. Vanina Bernasconi) — Parque Vieytes y CIC Barrio San Pedro',
    '• Iniciación al Atletismo: todas las edades, Lunes, Martes, Miércoles y Jueves 17:30 hs (Prof. Alejandro Monzon) — Parque Vieytes',
    '• Running: todas las edades, Lunes y Miércoles 20:15 hs (Prof. Gillermo Galeano) — Parque Vieytes',
    '',
    'REDES SOCIALES: Instagram @deportesanbenito',
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
// CIC BARRIO SAN PEDRO
// ===========================================
export const CIC_BARRIO_SAN_PEDRO: ServiceInfo = {
  nombre: 'CIC Barrio San Pedro',
  descripcion:
    'Centro Integrador Comunitario con talleres gratuitos de computación, bienestar y telar para toda la comunidad.',
  whatsapp: '3434503200',
  horario: 'Según actividad',
  ubicacion: 'Garay y Nogoyá, Barrio San Pedro',
  url: '/tramites/cic-barrio-san-pedro',
  informacionAdicional: [
    'Talleres Computación: Niños y adolescentes (8-14 años), Jóvenes (15-25 años), Adultos (+25 años)',
    'Talleres Bienestar: Envejecientemente Activ@, Yoga',
    'Talleres Telar: Principiantes y Avanzado',
    'Requisito: domicilio en San Benito. Cupos limitados.',
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
    'Espacio de apoyo a emprendedores locales y fomento del desarrollo productivo de San Benito. Apoyamos a quienes quieren emprender o tienen un negocio en marcha.',
  whatsapp: '3434657917',
  telefono: '3434657917',
  horario: 'Lunes a Viernes de 8:00 a 13:00 hs',
  ubicacion: 'NIDO - Buenos Aires y Misiones, San Benito',
  url: '/tramites/produccion-empleo',
  enlaces: [
    {
      texto: 'Reempadronamiento de Emprendedores',
      url: 'https://forms.gle/2nQfHh6LixSHKrR5A',
    },
  ],
  informacionAdicional: [
    'SERVICIOS DISPONIBLES:',
    '• Reempadronamiento de Emprendedores: actualizá tus datos para acceder a programas, capacitaciones y beneficios',
    '• Asesoramiento a emprendedores y PyMEs locales',
    '• Acceso a programas de apoyo productivo municipal',
    '',
    'CÓMO ACCEDER AL REGISTRO:',
    '• Completar el formulario online de reempadronamiento',
    '• Tener domicilio o actividad en San Benito',
    '',
    'Para consultas y asesoramiento, acercarse al edificio NIDO (Buenos Aires y Misiones)',
  ],
}

// ===========================================
// TERCERA EDAD Y DISCAPACIDAD
// ===========================================
export const TERCERA_EDAD: ServiceInfo = {
  nombre: 'Área de Tercera Edad y Discapacidad',
  descripcion:
    'Garantizamos y promovemos los derechos de personas mayores y con discapacidad, en base a la Convención Interamericana y la Convención Internacional sobre Derechos de las Personas con Discapacidad.',
  whatsapp: '3433027297',
  telefono: '3433027297',
  email: 'adultosmayoresydiscapacidadsb@gmail.com',
  horario: 'Lunes a Viernes de 7:00 a 13:00 hs',
  ubicacion: 'Edificio NIDO - Buenos Aires y Misiones, San Benito',
  url: '/tramites/tercera-edad-discapacidad',
  enlaces: [
    {
      texto: 'Formulario de Relevamiento de Personas con Discapacidad',
      url: 'https://docs.google.com/forms/d/e/1FAIpQLScmAJA6BYQWP403mdjR8p6Xb6pb5gnSVlwSnp7kL0duXh8XwA/viewform',
    },
  ],
  informacionAdicional: [
    'Equipo: Zampieri Ana María (Psicopedagoga - Coordinadora), Petrosino Natalia (Lic. en Terapia Ocupacional), Romero Melisa (Pasante Lic. Trabajo Social)',
    'Disponible formulario online de relevamiento para personas con discapacidad',
    'Video en Lengua de Señas Argentina (LSA) próximamente disponible',
  ],
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
// SECCIÓN ACCIÓN SOCIAL
// ===========================================
export const ACCION_SOCIAL: ServiceInfo = {
  nombre: 'Sección Acción Social',
  descripcion:
    'Asistencia a familias vulnerables: subsidios, traslados para discapacidad, programas alimentarios y banco ortopédico.',
  whatsapp: '3435107410',
  email: 'areatrabajosocialsb@gmail.com',
  horario: 'Lunes a Viernes de 7:00 a 13:00 hs',
  ubicacion: 'Basavilbaso 1030',
  url: '/tramites/accion-social',
  informacionAdicional: [
    'Políticas Alimentarias: módulos alimentarios, comedores municipales, Tarjeta Social por riesgo social',
    'Subsidios: atmosférico, cloacal, subsistencia, materiales de construcción, medicamentos, fallecimiento',
    'Ayudas directas: pañales, colchones, frazadas y otros elementos',
    'Traslados discapacidad: vehículo adaptado para personas con CUD. Solicitar con 24/48hs anticipación.',
    'Banco Ortopédico: préstamo de elementos ortopédicos en comodato',
    'Taller "El Carretel": costura, ropero comunitario, Programa Bienvenido Bebé',
    'Coordinadora: Sieber Stella',
  ],
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
  descripcion:
    'El Órgano Legislativo Municipal de San Benito. Sanción de ordenanzas, declaraciones, resoluciones y toda la normativa que rige la vida del municipio.',
  whatsapp: '3434700140',
  telefono: '3434700140',
  horario: 'Lunes a Viernes de 7:00 a 13:00 hs',
  ubicacion: 'Av. Friuli y Rivadavia, San Benito',
  url: 'https://ben-ent-hcd.paisdigital.innovacion.gob.ar/',
  informacionAdicional: [
    'Sitio oficial del HCD: https://ben-ent-hcd.paisdigital.innovacion.gob.ar/',
    'En el sitio del HCD podés consultar y descargar: Ordenanzas, Decretos, Resoluciones, Declaraciones y Comunicaciones.',
    'Funciones: sanción del presupuesto municipal, aprobación de normativa local, control del Departamento Ejecutivo.',
    'Las sesiones del HCD son públicas y pueden seguirse de forma presencial en Av. Friuli y Rivadavia.',
    'WhatsApp solo para consultas administrativas (no ordenanzas; esas se consultan en el sitio web oficial).',
  ],
}

// ===========================================
// OTROS SERVICIOS
// ===========================================
export const CATASTRO: ServiceInfo = {
  nombre: 'Catastro Municipal',
  descripcion:
    'El área de Catastro mantiene actualizado el registro de propiedades, realiza mediciones y valuaciones, y gestiona la información territorial del municipio.',
  telefono: '343-4973454',
  email: 'catastro@munisanbenito.gov.ar',
  horario: 'Lunes a Viernes de 7:00 a 13:00 hs',
  ubicacion: 'Edificio Municipal - Basavilbaso 1094',
  url: '/tramites/catastro',
  requisitos: [
    'Inscripción de Títulos: escritura original + formulario firmado y sellado por escribano, dinero para sellados',
    'Cambio de domicilio postal: formulario firmado por titular + fotocopia DNI',
    'Plancheta catastral: titular cargado en base catastral (si no, presentar escritura/boleto + DNI), abonar sellado',
    'Cálculo de numeración oficial: lote con declaración de superficie edificada o mejoras de construcción',
    'Cambio de datos catastrales: boleto de compra-venta, cesión de derechos o escritura con sellados y actas correspondientes',
  ],
  informacionAdicional: [
    '⚠️ ATENCIÓN PRESENCIAL OBLIGATORIA: todos los trámites se realizan exclusivamente de manera presencial. No se aceptan gestiones por correo ni medios digitales.',
    'Servicios: Consulta Catastral, Medición y Relevamiento, Certificados Catastrales',
    'Verificar montos de sellados actualizados el día del trámite',
    'Contacto alternativo: CAV 3436127013',
  ],
}

export const MESA_ENTRADA: ServiceInfo = {
  nombre: 'Mesa de Entrada',
  descripcion:
    'Punto inicial para la presentación de todo tipo de trámites administrativos en la Municipalidad. Aquí puede iniciar sus gestiones de forma ordenada y segura.',
  telefono: '343-4973454',
  horario: 'Lunes a Viernes de 7:00 a 13:00 hs',
  ubicacion: 'Edificio Municipal - Basavilbaso 1094',
  url: '/tramites/mesa-de-entrada',
  requisitos: [
    'Nota de solicitud dirigida a la autoridad correspondiente',
    'Fotocopia del DNI del solicitante',
  ],
  informacionAdicional: [
    'La nota debe incluir: nombre y apellido completos, domicilio real y legal (dentro de San Benito), firma del presentante, correo electrónico y teléfono de contacto',
    'Para profesionales: incluir número de matrícula individual en la nota',
    'Asegurarse de cumplir todos los requisitos para evitar demoras',
  ],
}

export const TALLERES_CULTURALES: ServiceInfo = {
  nombre: 'Talleres Culturales Municipales',
  descripcion:
    'Talleres artísticos gratuitos para niños, jóvenes y adultos con domicilio en San Benito. Cupos limitados.',
  whatsapp: '3434503200',
  horario: 'Horarios variados según taller y sede',
  url: '/tramites/talleres-culturales',
  enlaces: [{ texto: 'Inscripción Online', url: 'https://forms.gle/YMu2AjBLckmdZoF79' }],
  informacionAdicional: [
    'Sede NIDO (Buenos Aires y Misiones): Guitarra (+9 años), Danzas Inmigrantes (+9 años), Banda Municipal (+9 años), Tango (+18 años), Danzas Tradicionales (+9 años)',
    'Sede CIC (Garay y Nogoyá): Teatro (+16 años, Mi 18:30-20hs), Coro Municipal (+16 años, V 19:30-21:30hs)',
    'Sede Biblioteca Municipal (Friuli 1051): Piano (+9 años, Ma 16:30-21:30hs y V 16:30-20:30hs)',
    'Requisito: domicilio en San Benito. Cupos limitados.',
  ],
}

// ===========================================
// TURISMO
// ===========================================
export const TURISMO: ServiceInfo = {
  nombre: 'Turismo en San Benito',
  descripcion:
    'Descubrí una ciudad con casi 150 años de historia, tradición inmigrante y lugares únicos para conocer.',
  url: '/gobierno/turismo',
  informacionAdicional: [
    'San Benito fue fundada en 1879 por colonos europeos. A 12 km de Paraná, acceso por Ruta Provincial 11.',
    '',
    'PUNTOS DE INTERÉS:',
    '• Iglesia San Benito Abad (1888): Patrimonio histórico. Construida en menos de 4 meses.',
    '• Parque Vieytes: Corazón verde de la ciudad. Senderos, juegos y áreas verdes.',
    '• Cementerio Parroquial: Visitas guiadas con historia de familias inmigrantes fundadoras.',
    '• Batalla del Saucesito: Sitio histórico relevante de la región entrerriana.',
    '• Batalla de Las Tunas: Otro sitio histórico destacado de la región.',
    '',
    'ORÍGENES INMIGRANTES: Friuli (Italia), Eslovenia, Austria.',
    '',
    'EVENTOS DESTACADOS:',
    '• Fiesta Patronal San Benito Abad: 21 de marzo. Misas, procesiones y actividades culturales.',
    '• Fiesta del Gaucho: Jinetes, payadores, doma y música folklórica.',
  ],
}

// ===========================================
// NIDO - NÚCLEO DE INNOVACIÓN Y DESARROLLO
// ===========================================
export const NIDO: ServiceInfo = {
  nombre: 'NIDO - Núcleo de Innovación y Desarrollo de Oportunidades',
  descripcion:
    'Espacio comunitario que promueve la inclusión social y el desarrollo de las personas a través de capacitaciones, talleres, emprendimientos y empleo.',
  horario: 'Lunes a Viernes: Mañana 7:00 a 13:00 hs | Tarde 15:00 a 19:00 hs',
  ubicacion: 'Buenos Aires y Misiones, San Benito',
  url: '/tramites/nido',
  informacionAdicional: [
    'Coordinador: Jorge Buffa',
    '',
    'TALLERES DISPONIBLES:',
    '• Apoyo Escolar Primario: Matutino L/Mi/J 9-10:15hs | Vespertino L/Mi/V 17-18:15hs (con derivación escolar)',
    '• Taller de Guitarra: L/J/V 16:45 a 19:15 hs',
    '• Taller de Folclore: Ma/J 18 a 20:30 hs',
    '• Taller de Danzas Típicas: Lunes 18 a 20 hs',
    '• Vení a Bailar (Salud Mental en Movimiento - Min. Salud ER): Lunes 16 a 17 hs',
    '• Banda de Música Municipal: Miércoles 18 a 20:40 hs',
    '• Taller de Tango: Sábados 16 a 18 hs',
    '',
    'ESCUELA DE EMPRENDEDORES: capacitaciones para crear y gestionar proyectos locales.',
    '',
    'PRODUCCIÓN Y EMPLEO: Ferias emprendedoras, atención a feriantes, inscripción actividades deportivas y jardines municipales.',
    '',
    'SUM (Salón de Usos Múltiples): capacidad 80 personas + proyector. Disponible para instituciones locales (previa disponibilidad).',
    '',
    'Los cupos para los talleres se consultan en los días y horarios que funcionan.',
  ],
}

// ===========================================
// ASESORÍA LEGAL Y TÉCNICA
// ===========================================
export const ASESORIA_LEGAL: ServiceInfo = {
  nombre: 'Asesoría Legal y Técnica',
  descripcion:
    'Asesoramiento jurídico y técnico de la Municipalidad de San Benito para consultas legales y trámites administrativos.',
  email: 'asesorialegalytecnica@sanbenito.gob.ar',
  horario: 'Lunes a Viernes de 7:00 a 13:00 hs',
  ubicacion: 'Edificio Municipal - Basavilbaso 1094',
}

// ===========================================
// SERVICIOS EXTERNOS ÚTILES
// ===========================================
export const SERVICIOS_EXTERNOS: ServiceInfo = {
  nombre: 'Servicios Externos Útiles',
  descripcion: 'Servicios de utilidad pública de San Benito no dependientes del municipio.',
  informacionAdicional: [
    '⚡ ENERSA (Electricidad / corte de luz): 0800-777-0080 (24 horas)',
    '💧 Cooperativa de Agua San Benito: 0800-888-7278 (L-V 7:00 a 14:00 hs)',
    '🚓 Comisaría San Benito: emergencias llamar al 911',
  ],
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
  'ninez-accion-social': NINEZ_ACCION_SOCIAL,
  'accion-social': ACCION_SOCIAL,
  'trabajo-social': ACCION_SOCIAL,
  subsidios: ACCION_SOCIAL,
  cic: CIC_BARRIO_SAN_PEDRO,
  'cic-barrio-san-pedro': CIC_BARRIO_SAN_PEDRO,
  'juzgado-faltas': JUZGADO_FALTAS,
  transito: JUZGADO_FALTAS,
  concejo: CONCEJO_DELIBERANTE,
  hcd: CONCEJO_DELIBERANTE,
  hcdsb: CONCEJO_DELIBERANTE,
  'honorable-concejo': CONCEJO_DELIBERANTE,
  ordenanzas: CONCEJO_DELIBERANTE,
  ordenanza: CONCEJO_DELIBERANTE,
  legislativo: CONCEJO_DELIBERANTE,
  emergencias: EMERGENCIAS_INFO,
  emergencia: EMERGENCIAS_INFO,
  'numeros-utiles': EMERGENCIAS_INFO,
  policia: EMERGENCIAS_INFO,
  bomberos: EMERGENCIAS_INFO,
  ambulancia: EMERGENCIAS_INFO,
  contacto: CONTACTO_GENERAL_INFO,
  'contacto-general': CONTACTO_GENERAL_INFO,
  turismo: TURISMO,
  'gobierno-turismo': TURISMO,
  nido: NIDO,
  'nucleo-innovacion': NIDO,
  'asesoria-legal': ASESORIA_LEGAL,
  asesoria: ASESORIA_LEGAL,
  'servicios-externos': SERVICIOS_EXTERNOS,
  enersa: SERVICIOS_EXTERNOS,
  agua: SERVICIOS_EXTERNOS,
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
  catastro: [
    'catastro',
    'terreno',
    'lote',
    'parcela',
    'mensura',
    'subdivision',
    'subdivisión',
    'escritura',
    'titulo propiedad',
    'título propiedad',
    'plancheta catastral',
    'plancheta',
    'inscripcion de titulos',
    'inscripción de títulos',
    'numeracion oficial',
    'numeración oficial',
    'cambio de datos catastrales',
    'cambio de domicilio postal',
    'certificado catastral',
    'certificados catastrales',
  ],
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
    'guitarra',
    'tango',
    'folclore',
    'folklore',
    'coro',
    'piano',
    'banda',
    'danzas tipicas',
    'danzas tradicionales',
    'danzas inmigrantes',
    'talleres culturales',
    'taller cultural',
    'inscripcion talleres',
    'inscripción talleres',
  ],
  'accion-social': [
    'accion social',
    'acción social',
    'trabajo social',
    'asistencia social',
    'subsidio',
    'subsidios',
    'modulo alimentario',
    'módulo alimentario',
    'comedor municipal',
    'tarjeta social',
    'traslado discapacidad',
    'traslados discapacidad',
    'banco ortopedico',
    'banco ortopédico',
    'el carretel',
    'ropero comunitario',
    'bienvenido bebe',
    'bienvenido bebé',
    'asistencia familiar',
  ],
  cic: [
    'cic',
    'centro integrador',
    'centro integrador comunitario',
    'cic san pedro',
    'cic barrio san pedro',
    'telar',
  ],
  'mesa-entrada': [
    'mesa de entrada',
    'presentar tramite',
    'presentar trámite',
    'iniciar tramite',
    'iniciar trámite',
    'nota de solicitud',
    'nota solicitud',
    'tramite administrativo',
    'trámite administrativo',
    'gestionar tramite',
    'gestionar trámite',
    'ingresar expediente',
    'mesa entrada',
  ],
  nido: [
    'nido',
    'nucleo innovacion',
    'núcleo innovación',
    'escuela emprendedores',
    'sum municipalidad',
    'salon usos multiples',
    'salón usos múltiples',
    'apoyo escolar',
    'banda municipal',
    'buenos aires y misiones',
    'talleres nido',
  ],
  concejo: [
    'concejo',
    'concejo deliberante',
    'honorable concejo deliberante',
    'hcd',
    'hcdsb',
    'hcd san benito',
    'hdc',
    'deliberante',
    'legislativo',
    'legislacion municipal',
    'legislación municipal',
    'ordenanza',
    'ordenanzas',
    'consultar ordenanza',
    'ver ordenanzas',
    'buscar ordenanza',
    'texto ordenanza',
    'normativa municipal',
    'normativa',
    'concejal',
    'concejales',
    'sesion',
    'sesión',
    'sesion hcd',
    'declaracion municipal',
    'declaración municipal',
    'resolucion',
    'resolución',
    'decreto municipal',
    'comunicacion hcd',
    'comunicación hcd',
    'reglamento municipal',
    'presupuesto municipal',
    'codigo de edificacion',
    'código de edificación',
    'uso del suelo',
  ],
  turismo: [
    'turismo',
    'turistico',
    'turístico',
    'iglesia san benito',
    'iglesia',
    'parque vieytes',
    'cementerio',
    'batalla saucesito',
    'batalla tunas',
    'historia san benito',
    'patrimonio',
    'inmigrantes',
    'friulanos',
    'fiesta patronal',
    'fiesta del gaucho',
    'gaucho',
    'lugares turisticos',
    'lugares turísticos',
    'visitar san benito',
    'que ver en san benito',
    'que hacer en san benito',
    'colonia brugo',
    'ruta 11',
  ],
  'asesoria-legal': [
    'asesoria legal',
    'asesoría legal',
    'asesoramiento legal',
    'asesor legal',
    'asesoría jurídica',
    'asesoria juridica',
    'consulta legal',
    'consulta juridica',
    'consulta jurídica',
  ],
  emergencia: [
    'emergencia',
    'emergencias',
    'telefono emergencia',
    'urgencia',
    'urgencias',
    'policia',
    'policía',
    'bombero',
    'bomberos',
    'ambulancia',
    'hospital',
    'salita',
    'numero util',
    'numeros utiles',
    'número útil',
    'números útiles',
    'telefonos utiles',
    'teléfonos útiles',
    '911',
    '107',
    'defensa civil',
    '103',
  ],
  contacto: [
    'contacto',
    'contactar',
    'comunicar',
    'con quien hablo',
    'llamar municipalidad',
    'telefono municipalidad',
    'intendente',
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
    'Área de Tercera Edad y Discapacidad': '🧓',
    'Catastro Municipal': '🗺️',
    'Mesa de Entrada': '📝',
    'Talleres Culturales Municipales': '🎨',
    'Sección Acción Social': '🤝',
    'CIC Barrio San Pedro': '🏘️',
    'NIDO - Núcleo de Innovación y Desarrollo de Oportunidades': '🏠',
    'Asesoría Legal y Técnica': '⚖️',
    'Turismo en San Benito': '🏛️',
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

/**
 * Devuelve un bloque de contacto general unificado, leído de los servicios oficiales.
 * Fuente única de verdad: evita hardcodear teléfonos/emails en otros archivos.
 */
export function formatearContactoGeneral(): string {
  return (
    `📞 **Contactos de la Municipalidad de San Benito**\n\n` +
    `**📍 Sede principal:** ${CONTACTO_GENERAL.direccion}\n` +
    `**🕒 Horario general:** ${CONTACTO_GENERAL.horarioGeneral}\n` +
    `**☎️ Teléfono:** ${CONTACTO_GENERAL.telefonoPrincipal}\n` +
    `**📧 Email:** ${CONTACTO_GENERAL.emailPrincipal}\n\n` +
    `**Contactos por área (WhatsApp):**\n` +
    `• 💰 Rentas: ${RENTAS.whatsapp}\n` +
    `• 🚗 Licencias de Conducir: ${LICENCIA_CONDUCIR.whatsapp}\n` +
    `• 🏗️ Obras Privadas: ${OBRAS_PRIVADAS.whatsapp} (solo mensajes)\n` +
    `• 🏪 Habilitaciones: ${HABILITACIONES.whatsapp}\n` +
    `• 📋 CAV (Reclamos): ${CAV.whatsapp}\n` +
    `• ⚽ Deportes: ${ACTIVIDADES_DEPORTIVAS.whatsapp}\n` +
    `• 📚 Punto Digital / Biblioteca: ${PUNTO_DIGITAL.whatsapp}\n` +
    `• 💜 Área Mujer y Género: ${AREA_MUJER.whatsapp}\n` +
    `• 💼 Producción y Empleo: ${PRODUCCION_EMPLEO.whatsapp}\n` +
    `• 🧓 Tercera Edad y Discapacidad: ${TERCERA_EDAD.whatsapp}\n` +
    `• 🤝 Acción Social: ${ACCION_SOCIAL.whatsapp}\n` +
    `• 🏘️ CIC Barrio San Pedro: ${CIC_BARRIO_SAN_PEDRO.whatsapp}\n` +
    `• 🏛️ Concejo Deliberante: ${CONCEJO_DELIBERANTE.whatsapp}\n` +
    `• 🏠 NIDO (Talleres / Emprendedores): Buenos Aires y Misiones\n`
  )
}

/**
 * Devuelve los horarios de atención por área, leídos del KB.
 */
export function formatearHorariosGeneral(): string {
  return (
    `🕒 **Horarios de Atención**\n\n` +
    `**Horario general:** ${CONTACTO_GENERAL.horarioGeneral}\n\n` +
    `**Por área:**\n` +
    `• 💰 Rentas: ${RENTAS.horario}\n` +
    `• 🚗 Licencias de Conducir: ${LICENCIA_CONDUCIR.horario}\n` +
    `• 🏗️ Obras Privadas: ${OBRAS_PRIVADAS.horario}\n` +
    `• 🏪 Habilitaciones: ${HABILITACIONES.horario}\n` +
    `• 📋 CAV: ${CAV.horario}\n` +
    `• 📚 Punto Digital / Biblioteca: ${PUNTO_DIGITAL.horario}\n` +
    `• 💼 Producción y Empleo: ${PRODUCCION_EMPLEO.horario}\n` +
    `• 🏠 NIDO: ${NIDO.horario}`
  )
}
