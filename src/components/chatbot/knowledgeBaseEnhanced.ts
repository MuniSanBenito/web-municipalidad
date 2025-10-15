// src/components/chatbot/knowledgeBaseEnhanced.ts

/**
 * Base de conocimiento mejorada con información REAL extraída de las páginas del sitio
 * Esta información está sincronizada con el contenido actual de las páginas TSX
 * Última actualización: Octubre 2025
 */

export interface ServiceInfo {
  nombre: string;
  descripcion: string;
  telefono?: string;
  whatsapp?: string;
  email?: string;
  horario?: string;
  ubicacion?: string;
  requisitos?: string[];
  enlaces?: { texto: string; url: string }[];
  informacionAdicional?: string[];
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
};

// ===========================================
// RENTAS - INFORMACIÓN COMPLETA
// ===========================================
export const RENTAS: ServiceInfo = {
  nombre: 'Rentas Municipales',
  descripcion: 'La Dirección de Rentas se encarga de la recaudación de tasas y contribuciones municipales, brindando a los contribuyentes herramientas para facilitar el cumplimiento de sus obligaciones tributarias.',
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
};

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
};

// ===========================================
// OBRAS PRIVADAS - INFORMACIÓN COMPLETA
// ===========================================
export const OBRAS_PRIVADAS: ServiceInfo = {
  nombre: 'Obras Privadas',
  descripcion: 'La Dirección de Obras Privadas regula y controla las construcciones dentro del municipio, garantizando el cumplimiento de las normativas vigentes y el desarrollo urbano ordenado.',
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
};

// ===========================================
// HABILITACIONES COMERCIALES
// ===========================================
export const HABILITACIONES: ServiceInfo = {
  nombre: 'Habilitaciones Comerciales',
  descripcion: 'Trámites para habilitar comercios, servicios, gastronomía e industrias en San Benito',
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
};

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
};

// ===========================================
// CENTRO DE ATENCIÓN AL VECINO (CAV)
// ===========================================
export const CAV: ServiceInfo = {
  nombre: 'Centro de Atención Al Vecino (CAV)',
  descripcion: 'Recepción y gestión de reclamos ciudadanos, atención personalizada presencial y por WhatsApp',
  whatsapp: '3436127013',
  horario: 'Lunes a Viernes de 7:00 a 13:00 hs (presencial y WhatsApp)',
  informacionAdicional: [
    'Canales de atención: WhatsApp y presencial',
    'Se encarga de recibir y gestionar reclamos para mejorar la calidad de vida en la comunidad',
  ],
};

// ===========================================
// OTROS SERVICIOS
// ===========================================
export const CATASTRO: ServiceInfo = {
  nombre: 'Catastro',
  descripcion: 'Servicio de catastro municipal',
  horario: 'Lunes a Viernes de 7:00 a 13:00 hs',
  ubicacion: 'Edificio Municipal',
};

export const MESA_ENTRADA: ServiceInfo = {
  nombre: 'Mesa de Entrada',
  descripcion: 'Recepción de trámites generales',
  telefono: '(0343) 4973454',
  horario: 'Lunes a Viernes de 7:00 a 13:00 hs',
  ubicacion: 'Edificio Municipal',
};

export const PUNTO_DIGITAL: ServiceInfo = {
  nombre: 'Punto Digital y Biblioteca',
  descripcion: 'Acceso a computadoras, internet y biblioteca municipal',
  whatsapp: '3434508085',
  horario: 'Lunes a Viernes de 8:00 a 12:00 y 16:00 a 20:00 hs',
};

export const TALLERES_CULTURALES: ServiceInfo = {
  nombre: 'Talleres Culturales',
  descripcion: 'Talleres gratuitos de arte y cultura para la comunidad',
  telefono: '(0343) 4973454',
  horario: 'Horarios variados según taller',
};

export const AREA_MUJER: ServiceInfo = {
  nombre: 'Área de la Mujer',
  descripcion: 'Asesoramiento y apoyo para mujeres',
  telefono: '(0343) 4973454',
  horario: 'Lunes a Viernes de 7:00 a 13:00 hs',
};

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
};

// ===========================================
// KEYWORDS PARA BÚSQUEDA
// ===========================================
export const KEYWORDS_MAP: { [keyword: string]: string } = {
  // Rentas
  'rentas': 'rentas',
  'impuesto': 'rentas',
  'impuestos': 'rentas',
  'tasa': 'rentas',
  'tasas': 'rentas',
  'pago': 'rentas',
  'pagos': 'rentas',
  'tributo': 'rentas',
  'tgi': 'rentas',
  'obras sanitarias': 'rentas',
  
  // Licencia
  'licencia': 'licencia',
  'conducir': 'licencia',
  'carnet': 'licencia',
  'registro': 'licencia',
  
  // Obras Privadas
  'obra': 'obras',
  'construccion': 'obras',
  'construcción': 'obras',
  'edificacion': 'obras',
  'plano': 'obras',
  'construir': 'obras',
  
  // Habilitaciones
  'habilitacion': 'habilitaciones',
  'habilitación': 'habilitaciones',
  'comercial': 'habilitaciones',
  'comercio': 'habilitaciones',
  'local': 'habilitaciones',
  'negocio': 'habilitaciones',
  
  // Deportes
  'deporte': 'deportes',
  'deportes': 'deportes',
  'deportivo': 'deportes',
  'deportiva': 'deportes',
  'futbol': 'deportes',
  'voley': 'deportes',
  'natacion': 'deportes',
  'golf': 'deportes',
  
  // CAV
  'cav': 'cav',
  'reclamo': 'cav',
  'queja': 'cav',
  'vecino': 'cav',
  'atencion': 'cav',
};

/**
 * Busca un servicio por palabra clave
 */
export function buscarServicioPorKeyword(query: string): ServiceInfo | null {
  const queryLower = query.toLowerCase();
  
  // Buscar coincidencia exacta
  for (const [keyword, serviceKey] of Object.entries(KEYWORDS_MAP)) {
    if (queryLower.includes(keyword)) {
      return SERVICIOS_COMPLETOS[serviceKey] || null;
    }
  }
  
  return null;
}

/**
 * Formatea la información de un servicio como texto
 */
export function formatearServicio(servicio: ServiceInfo): string {
  let texto = `📋 **${servicio.nombre}**\n\n`;
  texto += `${servicio.descripcion}\n\n`;
  
  if (servicio.horario) {
    texto += `🕒 **Horario:** ${servicio.horario}\n`;
  }
  
  if (servicio.whatsapp) {
    texto += `📱 **WhatsApp:** ${servicio.whatsapp}\n`;
  }
  
  if (servicio.telefono) {
    texto += `📞 **Teléfono:** ${servicio.telefono}\n`;
  }
  
  if (servicio.email) {
    texto += `📧 **Email:** ${servicio.email}\n`;
  }
  
  if (servicio.ubicacion) {
    texto += `📍 **Ubicación:** ${servicio.ubicacion}\n`;
  }
  
  if (servicio.requisitos && servicio.requisitos.length > 0) {
    texto += `\n**Requisitos:**\n`;
    servicio.requisitos.forEach((req, i) => {
      texto += `${i + 1}. ${req}\n`;
    });
  }
  
  if (servicio.informacionAdicional && servicio.informacionAdicional.length > 0) {
    texto += `\n${servicio.informacionAdicional.join('\n')}`;
  }
  
  return texto;
}
