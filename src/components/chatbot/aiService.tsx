// src/components/chatbot/aiService.ts

// Cache para respuestas frecuentes
const responseCache = new Map<string, string>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutos

// Función para generar una clave de caché
const getCacheKey = (query: string, context: string = ''): string => {
  return `${query.toLowerCase().trim()}_${context}`;
};

// Base de conocimiento para el chatbot
const knowledgeBase = {
  // Información general
  general: [
    'La Municipalidad de San Benito está ubicada en la provincia de Entre Ríos, Argentina.',
    'El intendente actual es Ariel Voeffray.',
    'San Benito es una ciudad en crecimiento con aproximadamente 17,000 habitantes.',
    'La municipalidad ofrece diversos servicios a los ciudadanos como trámites, actividades culturales y deportivas.',
  ],

  // Trámites
  tramites: [
    'Para realizar trámites de licencia de conducir, debes dirigirte al área correspondiente en horario de 7:00 a 13:00 hs.',
    'Los trámites de obras privadas se realizan de lunes a viernes de 7:00 a 12:00 hs.',
    'Para habilitaciones comerciales, debes presentar documentación en Mesa de Entrada.',
    'Los pagos de impuestos municipales se pueden realizar en el área de Rentas.',
  ],

  // Contacto
  contacto: [
    'Email principal: Modernizacion@sanbenito.gob.ar',
    'Teléfono principal: (0343) 497-3454',
    'Mesa de entrada: (0343) 497-3454',
    'Rentas: 3436127015',
    'Licencia de Conducir: 3436127014',
    'Habilitaciones: 3434537319',
    'Punto Digital / Biblioteca: 3434508085',
    'Centro de Atencion al Vecino: 3436127013',
  ],

  // Horarios
  horarios: [
    'Edificio Municipal: Lunes a Viernes de 7:00 a 13:00 hs',
    'Rentas: Lunes a Viernes de 7:00 a 13:00 hs',
    'Obras Privadas: Lunes a Viernes de 7:00 a 13:00 hs',
    'Punto Digital: Lunes a Viernes de 7:00 a 13:00 y 16:00 a 20:00 hs',
    'Centro de Atencion al Vecino: Lunes a Viernes de 7:00 a 13:00',
  ],

  // Servicios
  servicios: [
    'Actividades deportivas para todas las edades',
    'Talleres culturales gratuitos',
    'Punto digital con acceso a computadoras e internet',
    'Área de la mujer con asesoramiento y apoyo',
    'Centro de Atención al Vecino (CAV)',
  ],
}

// URLs importantes del sitio web
const websiteUrls = {
  home: '/',
  noticias: '/noticias',
  tramites: '/tramites',
  contacto: '/contacto',
  transparencia: '/transparencia',
  licencias: '/tramites/licencia',
  obrasPrivadas: '/tramites/obras-privadas',
  habilitaciones: '/tramites/habilitaciones',
  rentas: '/tramites/rentas',
  catastro: '/tramites/catastro',
  mesaEntrada: '/tramites/mesa-de-entrada',
  deportes: '/tramites/actividades-deportivas',
  areaMujer: '/tramites/area-mujer',
  talleresCulturales: '/tramites/talleres-culturales',
  centroAtencionVecino: '/tramites/cav',
}

// Palabras clave para detectar intenciones
const keywords = {
  tramites: ['tramite', 'trámite', 'gestión', 'procedimiento', 'solicitud', 'formulario'],
  licencias: ['licencia', 'carnet', 'conducir', 'registro', 'brevete'],
  obras: ['obra', 'construcción', 'edificación', 'plano', 'permiso de obra'],
  habilitaciones: ['habilitación', 'habilitaciones', 'comercio', 'negocio', 'local'],
  rentas: ['renta', 'impuesto', 'tasa', 'pago', 'tributo', 'contribución'],
  horarios: ['horario', 'hora', 'atención', 'abierto', 'cerrado'],
  contacto: ['contacto', 'teléfono', 'telefono', 'email', 'correo', 'llamar', 'comunicar'],
  ubicacion: ['ubicación', 'ubicacion', 'dirección', 'direccion', 'donde', 'dónde', 'llegar'],
  centroAtencionVecino: [
    'centro',
    'atencion',
    'vecino',
    'cav',
    'centro de atencion al vecino',
    'reclamo',
    'queja',
    'quejas',
    'reclamos',
    'queja',
    'quejas',
    'reclamo',
    'reclamos',
  ],
}

/**
 * Función para buscar en la base de conocimiento con coincidencias parciales
 * @param query Consulta del usuario
 * @returns Respuesta encontrada o null
 */
function searchKnowledgeBase(query: string): string | null {
  const normalizedQuery = query.toLowerCase().trim();
  
  // Verificar caché primero
  const cacheKey = getCacheKey(normalizedQuery, 'search');
  if (responseCache.has(cacheKey)) {
    return responseCache.get(cacheKey) || null;
  }

  // Puntuación para encontrar la mejor coincidencia
  let bestMatch = { score: 0, response: '' };
  const queryWords = normalizedQuery.split(/\s+/);
  
  // Buscar en cada categoría
  Object.entries(knowledgeBase).forEach(([_, entries]) => {
    entries.forEach(entry => {
      const entryLower = entry.toLowerCase();
      let score = 0;
      
      // Puntuar según coincidencias de palabras
      queryWords.forEach(word => {
        if (word.length > 3 && entryLower.includes(word)) {
          score += word.length; // Palabras más largas tienen más peso
        }
      });
      
      // Actualizar mejor coincidencia si corresponde
      if (score > bestMatch.score) {
        bestMatch = { score, response: entry };
      }
    });
  });
  
  // Solo devolver si la puntuación es significativa
  if (bestMatch.score > 3) {
    responseCache.set(cacheKey, bestMatch.response);
    setTimeout(() => responseCache.delete(cacheKey), CACHE_TTL);
    return bestMatch.response;
  }
  
  return null;
}

/**
 * Función para detectar la intención del usuario basada en palabras clave
 * @param query Consulta del usuario
 * @returns Intención detectada o null si no hay coincidencia
 */
export function detectIntent(query: string): string | null {
  const lowerQuery = query.toLowerCase()

  for (const intent in keywords) {
    if (Object.prototype.hasOwnProperty.call(keywords, intent)) {
      const keywordList = keywords[intent as keyof typeof keywords]

      if (keywordList.some((keyword) => lowerQuery.includes(keyword))) {
        return intent
      }
    }
  }

  return null
}

/**
 * Función principal para obtener una respuesta de IA
 * @param query Consulta del usuario
 * @returns Respuesta generada
 */
export async function fetchAIResponse(query: string): Promise<string> {
  const normalizedQuery = query.toLowerCase().trim();
  
  // Verificar caché primero
  const cacheKey = getCacheKey(normalizedQuery, 'response');
  if (responseCache.has(cacheKey)) {
    return responseCache.get(cacheKey) || '';
  }
  
  // 1. Buscar en la base de conocimiento
  const knowledgeMatch = searchKnowledgeBase(normalizedQuery);
  if (knowledgeMatch) {
    responseCache.set(cacheKey, knowledgeMatch);
    setTimeout(() => responseCache.delete(cacheKey), CACHE_TTL);
    return knowledgeMatch;
  }
  
  // 2. Detectar intención
  const intent = detectIntent(normalizedQuery);
  
  // 3. Generar respuesta basada en la intención
  let response = '';
  
  switch (intent) {
    case 'tramites':
      response = 'Puedo ayudarte con información sobre trámites. ¿Podrías ser más específico sobre qué trámite necesitas realizar?';
      break;
    case 'licencias':
      response = 'Para obtener información sobre licencias de conducir, por favor especifica qué necesitas saber: requisitos, renovación o turnos.';
      break;
    case 'obras':
      response = 'Para consultas sobre obras privadas, necesitaría más detalles. ¿Es sobre permisos de construcción, planos u otra consulta?';
      break;
    case 'habilitaciones':
      response = 'Puedo ayudarte con información sobre habilitaciones comerciales. ¿Necesitas saber requisitos, documentación o estado de trámite?';
      break;
    case 'rentas':
      response = 'Para consultas sobre rentas, necesito más detalles. ¿Es sobre pagos, deuda, planes de pago u otra consulta?';
      break;
    case 'horarios':
      response = 'Los horarios de atención son de lunes a viernes de 7:00 a 13:00 hs. Algunas áreas tienen horarios especiales. ¿Qué área específica te interesa?';
      break;
    case 'contacto':
      response = 'Puedes contactarnos por teléfono al (0343) 497-3454, por email a Modernizacion@sanbenito.gob.ar o personalmente en nuestro horario de atención.';
      break;
    case 'ubicacion':
      response = 'La Municipalidad de San Benito se encuentra en [dirección completa]. ¿Necesitas indicaciones para llegar?';
      break;
    default:
      response = 'No encontré información específica sobre tu consulta. ¿Quizás te refieres a alguno de estos temas?\n' +
        '• Trámites municipales\n' +
        '• Horarios de atención\n' +
        '• Contacto y ubicación\n' +
        '• Requisitos para licencias\n' +
        '• Habilitaciones comerciales';
  }
  
  // Guardar en caché y devolver la respuesta
  responseCache.set(cacheKey, response);
  setTimeout(() => responseCache.delete(cacheKey), CACHE_TTL);
  return response;
}
