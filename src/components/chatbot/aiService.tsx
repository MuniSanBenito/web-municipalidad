// src/components/chatbot/aiService.ts
import { generateOllamaResponse, isOllamaAvailable } from './ollamaService';

// Cache para respuestas frecuentes
const responseCache = new Map<string, string>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutos

// Flag para controlar si usar Ollama
let useOllama = false;

// Declaración global para TypeScript
declare global {
  interface Window {
    ollamaEnabled?: boolean;
  }
}

// Inicializar la variable global si no existe
if (typeof window !== 'undefined' && typeof window.ollamaEnabled === 'undefined') {
  window.ollamaEnabled = true;
  
  // Escuchar cambios en el estado de Ollama
  window.addEventListener('ollamaStatusChange', ((event: CustomEvent) => {
    const { available, enabled } = event.detail;
    useOllama = available && enabled;
    console.log(`Estado de Ollama actualizado: ${useOllama ? 'Activo' : 'Inactivo'}`);
    console.log(`Disponible: ${available}, Habilitado: ${enabled}`);
  }) as EventListener);
}

// Verificar disponibilidad de Ollama al iniciar
isOllamaAvailable().then(available => {
  useOllama = available;
  console.log(`Ollama ${available ? 'está' : 'no está'} disponible`);
}).catch(error => {
  console.error('Error al verificar disponibilidad de Ollama:', error);
  useOllama = false;
});

// Función para generar una clave de caché
const getCacheKey = (query: string, context: string = ''): string => {
  return `${query.toLowerCase().trim()}_${context}`;
};

// Base de conocimiento mejorada para el chatbot
const knowledgeBase = {
  // Información general
  general: [
    'La Municipalidad de San Benito está ubicada en la provincia de Entre Ríos, Argentina.',
    'El intendente actual es Ariel Voeffray.',
    'San Benito es una ciudad en crecimiento con aproximadamente 17,000 habitantes.',
    'La municipalidad ofrece diversos servicios a los ciudadanos como trámites, actividades culturales y deportivas.',
  ],

  // Trámites detallados
  tramitesDetallados: {
    licenciaConducir: {
      nombre: 'Licencia de Conducir',
      descripcion: 'Trámite para obtener o renovar la licencia de conducir',
      requisitos: [
        'DNI original y fotocopia',
        'Certificado de domicilio',
        'Certificado de aptitud psicofísica',
        'Fotos 4x4 color',
        'Pago de tasa municipal'
      ],
      costo: '$5,000',
      duracion: '5 días hábiles',
      horario: 'Lunes a Viernes de 7:00 a 13:00 hs',
      lugar: 'Oficina de Tránsito - Municipalidad de San Benito',
      link: '/tramites/licencia'
    },
    obraPrivada: {
      nombre: 'Obra Privada',
      descripcion: 'Permiso para construcción y reformas en propiedades privadas',
      requisitos: [
        'Plano de obra firmado por profesional matriculado',
        'Título de propiedad o autorización del propietario',
        'CUIT/CUIL del profesional a cargo',
        'Pago de tasas municipales'
      ],
      costo: 'Varía según m2',
      duracion: '10-15 días hábiles',
      horario: 'Lunes a Viernes de 7:00 a 13:00 hs',
      lugar: 'Oficina de Obras Privadas - Municipalidad de San Benito',
      link: '/tramites/obras-privadas'
    },
    habilitacionComercial: {
      nombre: 'Habilitación Comercial',
      descripcion: 'Permiso para habilitar locales comerciales',
      requisitos: [
        'DNI y CUIT/CUIL',
        'Título de propiedad o contrato de alquiler',
        'Planos del local',
        'Habilitación Bomberos (si corresponde)'
      ],
      costo: 'Varía según rubro',
      duracion: '7-10 días hábiles',
      horario: 'Lunes a Viernes de 7:00 a 13:00 hs',
      lugar: 'Oficina de Habilitaciones - Municipalidad de San Benito',
      link: '/tramites/habilitaciones'
    }
  },

  // Preguntas frecuentes
  faq: [
    {
      pregunta: '¿Cómo saco turno para el registro civil?',
      respuesta: 'Puede solicitar turno a través de nuestra página web en la sección de trámites o personalmente en Mesa de Entrada.'
    },
    {
      pregunta: '¿Dónde pago mis impuestos?',
      respuesta: 'Puede realizar sus pagos en la oficina de Rentas de lunes a viernes de 7:00 a 13:00 hs, o a través de nuestra página web.'
    },
    {
      pregunta: '¿Cómo denuncio un problema en la vía pública?',
      respuesta: 'Puede realizar su denuncia en el Centro de Atención al Vecino (CAV) llamando al 3436127013 o personalmente en nuestras oficinas.'
    }
  ],

  // Contacto
  contacto: [
    '📧 Email principal: Modernizacion@sanbenito.gob.ar',
    '📞 Teléfono principal: (0343) 497-3454',
    '📱 WhatsApp: 3436127013',
    '📍 Dirección: Av. San Martín 1234, San Benito, Entre Ríos',
    '\n📌 Oficinas municipales:\n' +
    '• Mesa de entrada: (0343) 497-3454\n' +
    '• Rentas: 3436127015\n' +
    '• Licencia de Conducir: 3436127014\n' +
    '• Habilitaciones: 3434537319\n' +
    '• Punto Digital / Biblioteca: 3434508085\n' +
    '• Centro de Atención al Vecino: 3436127013'
  ],

  // Horarios
  horarios: [
    '🏛️ Edificio Municipal: Lunes a Viernes de 7:00 a 13:00 hs',
    '💰 Rentas: Lunes a Viernes de 7:00 a 13:00 hs',
    '🏗️ Obras Privadas: Lunes a Viernes de 7:00 a 13:00 hs',
    '💻 Punto Digital: Lunes a Viernes de 7:00 a 13:00 y 16:00 a 20:00 hs',
    '👥 Centro de Atención al Vecino: Lunes a Viernes de 7:00 a 13:00',
    '📚 Biblioteca Municipal: Lunes a Viernes de 8:00 a 12:00 y 15:00 a 19:00 hs',
    '⚽ Polideportivo: Lunes a Domingo de 8:00 a 22:00 hs'
  ],

  // Servicios
  servicios: [
    '🏋️ Actividades deportivas para todas las edades',
    '🎨 Talleres culturales gratuitos',
    '💻 Punto digital con acceso a computadoras e internet',
    '👩 Área de la mujer con asesoramiento y apoyo',
    '👥 Centro de Atención al Vecino (CAV)',
    '📚 Biblioteca pública con amplio catálogo',
    '🏛️ Asesoramiento legal gratuito (consultar horarios)',
    '🌳 Espacios verdes y plazas de juegos',
    '🚮 Servicio de recolección de residuos y limpieza'
  ]
};

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
 * Función para buscar en la base de conocimiento con coincidencias parciales mejorada
 * @param query Consulta del usuario
 * @returns Respuesta formateada o null
 */
function searchKnowledgeBase(query: string): string | null {
  const normalizedQuery = query.toLowerCase().trim();
  
  // Verificar caché primero
  const cacheKey = getCacheKey(normalizedQuery, 'search');
  if (responseCache.has(cacheKey)) {
    return responseCache.get(cacheKey) || null;
  }

  // 1. Buscar en preguntas frecuentes
  for (const faq of knowledgeBase.faq || []) {
    if (faq.pregunta.toLowerCase().includes(normalizedQuery) || 
        normalizedQuery.includes(faq.pregunta.toLowerCase())) {
      const response = `❓ ${faq.pregunta}\n\n${faq.respuesta}`;
      responseCache.set(cacheKey, response);
      setTimeout(() => responseCache.delete(cacheKey), CACHE_TTL);
      return response;
    }
  }

  // 2. Buscar en trámites detallados
  for (const [tramiteId, tramite] of Object.entries(knowledgeBase.tramitesDetallados || {})) {
    const tramiteInfo = tramite as any;
    const tramiteName = tramiteInfo.nombre?.toLowerCase() || '';
    
    if (normalizedQuery.includes(tramiteName) || 
        tramiteName.includes(normalizedQuery) ||
        normalizedQuery.includes(tramiteId.toLowerCase().replace(/([A-Z])/g, ' $1').toLowerCase())) {
      
      const response = `📋 *${tramiteInfo.nombre}*\n\n` +
        `ℹ️ ${tramiteInfo.descripcion}\n\n` +
        `📌 *Requisitos:*\n` +
        tramiteInfo.requisitos.map((r: string, i: number) => `  ${i+1}. ${r}`).join('\n') + '\n\n' +
        `💵 *Costo:* ${tramiteInfo.costo}\n` +
        `⏱️ *Duración:* ${tramiteInfo.duracion}\n` +
        `🕒 *Horario de atención:* ${tramiteInfo.horario}\n` +
        `📍 *Lugar:* ${tramiteInfo.lugar}\n\n` +
        `🔗 [Más información](${tramiteInfo.link})`;
      
      responseCache.set(cacheKey, response);
      setTimeout(() => responseCache.delete(cacheKey), CACHE_TTL);
      return response;
    }
  }

  // 3. Búsqueda por palabras clave en todas las categorías
  const queryWords = normalizedQuery.split(/\s+/).filter(word => word.length > 2);
  
  // Buscar en todas las categorías
  for (const [category, items] of Object.entries(knowledgeBase)) {
    // Saltar categorías que ya procesamos
    if (['tramitesDetallados', 'faq'].includes(category)) continue;
    
    // Si la categoría coincide con la consulta
    if (normalizedQuery.includes(category.toLowerCase())) {
      const response = formatCategoryResponse(category, items);
      if (response) return response;
    }
    
    // Buscar en los ítems de la categoría
    if (Array.isArray(items)) {
      for (const item of items) {
        const itemLower = typeof item === 'string' ? item.toLowerCase() : item.pregunta.toLowerCase();
        const matchScore = queryWords.reduce((score, word) => 
          itemLower.includes(word) ? score + word.length : score, 0);
          
        if (matchScore > 0) {
          const response = formatCategoryResponse(category, [item]);
          if (response) return response;
        }
      }
    }
  }
  
  return null;
}

/**
 * Formatea la respuesta para una categoría específica
 */
function formatCategoryResponse(category: string, items: any): string | null {
  // Si items es null o undefined, o un array vacío
  if (!items || (Array.isArray(items) && items.length === 0)) return null;
  
  const categoryTitles: {[key: string]: string} = {
    'contacto': '📞 *Contactos y Ubicación*',
    'horarios': '🕒 *Horarios de Atención*',
    'servicios': '🏛️ *Servicios Municipales*',
    'general': 'ℹ️ *Información General*',
  };
  
  const title = categoryTitles[category] || `📋 ${category.charAt(0).toUpperCase() + category.slice(1)}`;
  
  let formattedItems = '';
  
  // Manejar diferentes tipos de datos
  if (Array.isArray(items)) {
    // Si es un array, procesarlo como antes
    formattedItems = items.map(item => 
      typeof item === 'string' ? `• ${item}` : JSON.stringify(item)
    ).join('\n');
  } else if (typeof items === 'object') {
    // Si es un objeto, formatear sus propiedades
    formattedItems = Object.entries(items).map(([key, value]) => {
      const itemName = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
      return `• ${itemName}: ${typeof value === 'object' ? '(información detallada disponible)' : value}`;
    }).join('\n');
  } else {
    // Para cualquier otro tipo
    formattedItems = String(items);
  }
  
  return `${title}\n\n${formattedItems}`;
}

/**
 * Función para detectar la intención del usuario basada en palabras clave mejorada
 * @param query Consulta del usuario
 * @returns Intención detectada o null si no hay coincidencia
 */
export function detectIntent(query: string): string | null {
  const lowerQuery = query.toLowerCase();
  
  // Primero buscar coincidencias exactas
  for (const intent in keywords) {
    if (Object.prototype.hasOwnProperty.call(keywords, intent)) {
      const keywordList = keywords[intent as keyof typeof keywords];
      
      // Coincidencia exacta de palabras clave
      if (keywordList.some(keyword => {
        const regex = new RegExp(`\\b${keyword}\\b`, 'i');
        return regex.test(lowerQuery);
      })) {
        return intent;
      }
    }
  }
  
  // Si no hay coincidencia exacta, buscar coincidencias parciales
  const queryWords = lowerQuery.split(/\s+/);
  const wordScores: {[key: string]: number} = {};
  
  // Contar ocurrencias de palabras clave
  for (const intent in keywords) {
    if (Object.prototype.hasOwnProperty.call(keywords, intent)) {
      const keywordList = keywords[intent as keyof typeof keywords];
      
      keywordList.forEach(keyword => {
        queryWords.forEach(word => {
          if (word.length > 3 && keyword.includes(word)) {
            wordScores[intent] = (wordScores[intent] || 0) + word.length;
          }
        });
      });
    }
  }
  
  // Devolver la intención con mayor puntuación
  let bestMatch = { intent: '', score: 0 };
  for (const [intent, score] of Object.entries(wordScores)) {
    if (score > bestMatch.score) {
      bestMatch = { intent, score };
    }
  }
  
  return bestMatch.score > 0 ? bestMatch.intent : null;
}

/**
 * Función principal para obtener una respuesta de IA mejorada
 * @param query Consulta del usuario
 * @returns Objeto con la respuesta generada y si se usó Gemma 2B
 */
export async function fetchAIResponse(query: string): Promise<{ response: string; usedGemma: boolean }> {
  if (!query || typeof query !== 'string' || query.trim() === '') {
    return { 
      response: 'Por favor, ingresa una consulta para que pueda ayudarte.',
      usedGemma: false
    };
  }
  
  const normalizedQuery = query.toLowerCase().trim();
  
  // Verificar si hay una respuesta en caché
  const cacheKey = getCacheKey(normalizedQuery, 'response');
  const cachedResponse = responseCache.get(cacheKey);
  if (cachedResponse) {
    console.log('Respuesta recuperada de caché');
    return { response: cachedResponse, usedGemma: false };
  }
  
  // 1. Manejar saludos y despedidas
  if (/(hola|buen(a|o)s (días|tardes|noches)|saludos|hi|hello)/i.test(normalizedQuery)) {
    const saludos = [
      '¡Hola! Soy Beni, tu asistente virtual de la Municipalidad de San Benito. ¿En qué puedo ayudarte hoy?',
      '¡Buen día! ¿En qué puedo asistirte hoy?',
      '¡Hola! ¿Cómo estás? Estoy aquí para ayudarte con información sobre la Municipalidad de San Benito.'
    ];
    const respuesta = saludos[Math.floor(Math.random() * saludos.length)];
    responseCache.set(cacheKey, respuesta);
    setTimeout(() => responseCache.delete(cacheKey), CACHE_TTL);
    return { response: respuesta, usedGemma: false };
  }
  
  if (/(chau|adios|hasta luego|nos vemos|bye)/i.test(normalizedQuery)) {
    const despedidas = [
      '¡Hasta luego! Que tengas un excelente día. Si necesitas algo más, aquí estaré para ayudarte.',
      '¡Nos vemos! No dudes en consultarme si tienes más preguntas.',
      '¡Hasta pronto! Recuerda que estoy disponible cuando me necesites.'
    ];
    const respuesta = despedidas[Math.floor(Math.random() * despedidas.length)];
    responseCache.set(cacheKey, respuesta);
    setTimeout(() => responseCache.delete(cacheKey), CACHE_TTL);
    return { response: respuesta, usedGemma: false };
  }
  
  // 2. Buscar en la base de conocimiento mejorada
  const knowledgeMatch = searchKnowledgeBase(normalizedQuery);
  if (knowledgeMatch) {
    responseCache.set(cacheKey, knowledgeMatch);
    setTimeout(() => responseCache.delete(cacheKey), CACHE_TTL);
    return { response: knowledgeMatch, usedGemma: false };
  }
  
  // 3. Detectar intención
  const intent = detectIntent(normalizedQuery);
  
  // 4. Generar respuesta basada en la intención
  let response = '';
  
  let usedGemma = false;
  
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
      // Verificar si Ollama está disponible y habilitado globalmente
      const ollamaEnabled = typeof window !== 'undefined' ? window.ollamaEnabled !== false : true;
      
      if (useOllama && ollamaEnabled) {
        try {
          console.log('Usando Gemma 2B para generar respuesta...');
          
          // Notificar a la interfaz que estamos comenzando a usar Gemma 2B
          console.log('Iniciando generación con Gemma 2B');
          
          const ollamaResponse = await generateOllamaResponse(query);
          
          if (ollamaResponse && ollamaResponse.trim() !== '') {
            response = ollamaResponse;
            usedGemma = true;
            console.log('Respuesta generada exitosamente con Gemma 2B');
          } else {
            console.warn('Gemma 2B devolvió una respuesta vacía');
            throw new Error('Respuesta vacía de Gemma 2B');
          }
        } catch (error) {
          console.error('Error al obtener respuesta de Ollama:', error);
          response = getFallbackResponse();
          console.log('Usando respuesta alternativa debido a error en Gemma 2B');
        }
      } else {
        if (!ollamaEnabled) {
          console.log('Gemma 2B está desactivado por configuración del administrador');
        } else if (!useOllama) {
          console.log('Gemma 2B no está disponible - el servidor no responde');
        }
        response = getFallbackResponse();
        console.log('Usando respuesta alternativa sin Gemma 2B');
      }
  }
  
  // Guardar en caché y devolver la respuesta
  responseCache.set(cacheKey, response);
  setTimeout(() => responseCache.delete(cacheKey), CACHE_TTL);
  
  // Registrar en consola si se usó Gemma 2B
  if (usedGemma) {
    console.log('Respuesta generada con Gemma 2B:', { query, responseLength: response.length });
  } else {
    console.log('Respuesta generada sin Gemma 2B (usando base de conocimiento o respuestas predefinidas)');
  }
  
  return { response, usedGemma };
}

/**
 * Obtiene una respuesta predeterminada cuando no hay coincidencia clara
 * @returns Respuesta predeterminada
 */
function getFallbackResponse(): string {
  return 'No encontré información específica sobre tu consulta. ¿Quizás te refieres a alguno de estos temas?\n' +
    '• Trámites municipales\n' +
    '• Horarios de atención\n' +
    '• Contacto y ubicación\n' +
    '• Requisitos para licencias\n' +
    '• Habilitaciones comerciales';
}
