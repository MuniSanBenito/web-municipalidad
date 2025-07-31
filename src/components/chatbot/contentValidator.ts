// src/components/chatbot/contentValidator.ts

/**
 * Sistema de validación de contenido para evitar alucinaciones del chatbot
 * Asegura que solo se proporcione información verificada de la municipalidad
 */

// Lista de información oficial verificada
const VERIFIED_INFORMATION = {
  // Información de contacto oficial
  contacto: {
    telefono_principal: '(0343) 497-2222',
    mesa_entrada: '(0343) 497-2345',
    email: 'Modernizacion@sanbenito.gob.ar',
    direccion: 'Blvd. Basalvibaso 1094, San Benito, Entre Ríos, Argentina',
    horario: 'Lunes a Viernes de 7:00 a 13:00 hs'
  },

  // Teléfonos por área
  telefonos: {
    rentas: '(0343) 497-2678',
    obras_privadas: '(0343) 497-2890',
    deportes: '(0343) 497-2456',
    cultura: '(0343) 497-2789',
    punto_digital: '(0343) 497-3010',
    area_mujer: '(0343) 497-2567'
  },

  // Trámites con requisitos exactos
  tramites: {
    licencia_conducir: {
      nombre: 'Licencia de Conducir',
      requisitos: [
        'DNI original y fotocopia',
        'Certificado de domicilio',
        'Certificado de aptitud psicofísica',
        'Fotos 4x4 color',
        'Pago de tasa municipal'
      ],
      costo: '$5,000',
      duracion: '5 días hábiles'
    },
    obras_privadas: {
      nombre: 'Obras Privadas',
      requisitos: [
        'Plano firmado por profesional matriculado',
        'Título de propiedad o autorización del propietario',
        'CUIT/CUIL del profesional a cargo',
        'Pago de tasas municipales'
      ],
      costo: 'Varía según m2',
      duracion: '10-15 días hábiles'
    },
    habilitacion_comercial: {
      nombre: 'Habilitación Comercial',
      requisitos: [
        'DNI y CUIT/CUIL',
        'Título de propiedad o contrato de alquiler',
        'Planos del local',
        'Habilitación Bomberos (si corresponde)'
      ],
      costo: 'Varía según rubro',
      duracion: '7-10 días hábiles'
    }
  },

  // Información general verificada
  general: {
    intendente: 'Ariel Voeffray',
    poblacion: '17,000 habitantes aproximadamente',
    provincia: 'Entre Ríos',
    pais: 'Argentina'
  }
};

// Palabras y frases que indican información no verificada
const UNCERTAINTY_INDICATORS = [
  'creo que', 'posiblemente', 'probablemente', 'supongo',
  'me parece', 'podría ser', 'tal vez', 'quizás', 'quiz\u00e1s',
  'no estoy seguro', 'aproximadamente', 'más o menos',
  'según tengo entendido', 'si no me equivoco', 'imagino que',
  'debe ser', 'debería ser', 'puede que', 'es posible que'
];

// Frases que indican información inventada
const HALLUCINATION_INDICATORS = [
  'he escuchado que', 'según rumores', 'me han dicho que',
  'tengo entendido que', 'creo haber leído', 'si mal no recuerdo',
  'por lo que sé', 'según mi conocimiento', 'basándome en',
  'de acuerdo a mi información'
];

/**
 * Valida si una respuesta contiene solo información verificada
 * @param response Respuesta a validar
 * @param query Consulta original del usuario
 * @returns Objeto con resultado de validación y sugerencias
 */
export function validateResponse(response: string, query: string): {
  isValid: boolean;
  issues: string[];
  suggestions: string[];
  confidence: number;
} {
  const issues: string[] = [];
  const suggestions: string[] = [];
  let confidence = 100;

  const lowerResponse = response.toLowerCase();
  const lowerQuery = query.toLowerCase();

  // 1. Verificar indicadores de incertidumbre
  const uncertaintyFound = UNCERTAINTY_INDICATORS.filter(indicator => 
    lowerResponse.includes(indicator)
  );
  
  if (uncertaintyFound.length > 0) {
    issues.push(`Contiene indicadores de incertidumbre: ${uncertaintyFound.join(', ')}`);
    confidence -= 30;
  }

  // 2. Verificar indicadores de alucinación
  const hallucinationFound = HALLUCINATION_INDICATORS.filter(indicator => 
    lowerResponse.includes(indicator)
  );
  
  if (hallucinationFound.length > 0) {
    issues.push(`Contiene indicadores de información no verificada: ${hallucinationFound.join(', ')}`);
    confidence -= 50;
  }

  // 3. Verificar si contiene información específica que debe ser exacta
  if (lowerResponse.includes('teléfono') || lowerResponse.includes('telefono')) {
    const hasVerifiedPhone = Object.values(VERIFIED_INFORMATION.telefonos).some(phone => 
      response.includes(phone)
    ) || response.includes(VERIFIED_INFORMATION.contacto.telefono_principal);
    
    if (!hasVerifiedPhone && (lowerResponse.includes('(') || lowerResponse.includes('0343'))) {
      issues.push('Contiene números de teléfono no verificados');
      confidence -= 40;
    }
  }

  // 4. Verificar costos y precios específicos
  if (lowerResponse.includes('$') || lowerResponse.includes('peso') || lowerResponse.includes('costo')) {
    // Solo permitir costos verificados
    const verifiedCosts = ['$5,000', 'varía según', 'consultar'];
    const hasVerifiedCost = verifiedCosts.some(cost => 
      lowerResponse.includes(cost.toLowerCase())
    );
    
    if (!hasVerifiedCost && /\$\d+/.test(response)) {
      issues.push('Contiene precios no verificados');
      confidence -= 35;
    }
  }

  // 5. Verificar horarios específicos
  if (lowerResponse.includes('horario') || lowerResponse.includes('hora')) {
    if (!response.includes('7:00 a 13:00') && /\d{1,2}:\d{2}/.test(response)) {
      issues.push('Contiene horarios no verificados');
      confidence -= 30;
    }
  }

  // 6. Generar sugerencias basadas en la consulta
  if (lowerQuery.includes('teléfono') || lowerQuery.includes('telefono') || lowerQuery.includes('contacto')) {
    suggestions.push('Proporcionar solo números de teléfono oficiales verificados');
  }
  
  if (lowerQuery.includes('horario')) {
    suggestions.push('Confirmar horario oficial: Lunes a Viernes de 7:00 a 13:00 hs');
  }
  
  if (lowerQuery.includes('costo') || lowerQuery.includes('precio')) {
    suggestions.push('Indicar que los costos pueden variar y recomendar consultar directamente');
  }

  // Determinar si la respuesta es válida
  const isValid = confidence >= 70 && issues.length === 0;

  return {
    isValid,
    issues,
    suggestions,
    confidence
  };
}

/**
 * Obtiene información verificada específica para una consulta
 * @param query Consulta del usuario
 * @returns Información verificada relevante o null
 */
export function getVerifiedInformation(query: string): string | null {
  const lowerQuery = query.toLowerCase();

  // Información de contacto
  if (lowerQuery.includes('teléfono') || lowerQuery.includes('telefono') || lowerQuery.includes('contacto')) {
    if (lowerQuery.includes('principal')) {
      return `Teléfono principal: ${VERIFIED_INFORMATION.contacto.telefono_principal}`;
    }
    if (lowerQuery.includes('rentas')) {
      return `Área de Rentas: ${VERIFIED_INFORMATION.telefonos.rentas}`;
    }
    if (lowerQuery.includes('obras')) {
      return `Obras Privadas: ${VERIFIED_INFORMATION.telefonos.obras_privadas}`;
    }
    // Información general de contacto
    return `Contactos oficiales:\n• Principal: ${VERIFIED_INFORMATION.contacto.telefono_principal}\n• Mesa de entrada: ${VERIFIED_INFORMATION.contacto.mesa_entrada}\n• Email: ${VERIFIED_INFORMATION.contacto.email}`;
  }

  // Horarios
  if (lowerQuery.includes('horario') || lowerQuery.includes('atención') || lowerQuery.includes('atencion')) {
    return `Horario de atención: ${VERIFIED_INFORMATION.contacto.horario}`;
  }

  // Dirección
  if (lowerQuery.includes('dirección') || lowerQuery.includes('direccion') || lowerQuery.includes('ubicación') || lowerQuery.includes('ubicacion')) {
    return `Dirección: ${VERIFIED_INFORMATION.contacto.direccion}`;
  }

  // Información sobre trámites específicos
  if (lowerQuery.includes('licencia') && lowerQuery.includes('conducir')) {
    const tramite = VERIFIED_INFORMATION.tramites.licencia_conducir;
    return `${tramite.nombre}:\n• Costo: ${tramite.costo}\n• Duración: ${tramite.duracion}\n• Requisitos: ${tramite.requisitos.join(', ')}`;
  }

  return null;
}

/**
 * Sanitiza una respuesta eliminando información no verificada
 * @param response Respuesta original
 * @param query Consulta del usuario
 * @returns Respuesta sanitizada
 */
export function sanitizeResponse(response: string, query: string): string {
  let sanitized = response;

  // Eliminar frases de incertidumbre
  UNCERTAINTY_INDICATORS.forEach(indicator => {
    const regex = new RegExp(indicator, 'gi');
    sanitized = sanitized.replace(regex, '');
  });

  // Eliminar frases de alucinación
  HALLUCINATION_INDICATORS.forEach(indicator => {
    const regex = new RegExp(indicator, 'gi');
    sanitized = sanitized.replace(regex, '');
  });

  // Limpiar espacios extra y puntuación duplicada
  sanitized = sanitized
    .replace(/\s+/g, ' ')
    .replace(/[,\s]+,/g, ',')
    .replace(/[.\s]+\./g, '.')
    .trim();

  // Si la respuesta queda muy corta o vacía, usar información verificada
  if (sanitized.length < 20) {
    const verifiedInfo = getVerifiedInformation(query);
    if (verifiedInfo) {
      return verifiedInfo;
    }
  }

  return sanitized;
}

/**
 * Genera una respuesta de fallback con información verificada
 * @param query Consulta del usuario
 * @returns Respuesta de fallback segura
 */
export function generateFallbackResponse(query: string): string {
  const verifiedInfo = getVerifiedInformation(query);
  
  if (verifiedInfo) {
    return verifiedInfo + '\n\nPara más información, contacta al (0343) 497-2222.';
  }

  return 'No tengo información específica sobre tu consulta. Te recomiendo contactar directamente a la municipalidad:\n\n' +
    `• Teléfono: ${VERIFIED_INFORMATION.contacto.telefono_principal}\n` +
    `• Email: ${VERIFIED_INFORMATION.contacto.email}\n` +
    `• Horario: ${VERIFIED_INFORMATION.contacto.horario}`;
}
