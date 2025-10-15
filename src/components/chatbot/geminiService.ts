// src/components/chatbot/geminiService.ts
import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';

/**
 * Servicio para integrar Google Gemini API como alternativa premium a Ollama
 * Proporciona respuestas más confiables y rápidas con el modelo Gemini 1.5 Flash
 */

// Configuración
const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';
const MODEL_NAME = 'gemini-1.5-flash';
const DEBUG_MODE = true;

// Inicializar cliente de Gemini
let genAI: GoogleGenerativeAI | null = null;
let model: GenerativeModel | null = null;

// Verificar si Gemini está configurado
export function isGeminiConfigured(): boolean {
  return GEMINI_API_KEY.length > 0;
}

/**
 * Inicializa el servicio de Gemini
 */
function initializeGemini() {
  if (!isGeminiConfigured()) {
    console.warn('Gemini API Key no está configurada');
    return false;
  }

  try {
    genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    model = genAI.getGenerativeModel({
      model: MODEL_NAME,
      generationConfig: {
        temperature: 0.3, // Respuestas más consistentes y precisas
        topP: 0.8,
        topK: 20,
        maxOutputTokens: 500, // Respuestas concisas
      },
      safetySettings: [
        {
          category: 'HARM_CATEGORY_HARASSMENT',
          threshold: 'BLOCK_MEDIUM_AND_ABOVE',
        },
        {
          category: 'HARM_CATEGORY_HATE_SPEECH',
          threshold: 'BLOCK_MEDIUM_AND_ABOVE',
        },
        {
          category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
          threshold: 'BLOCK_MEDIUM_AND_ABOVE',
        },
        {
          category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
          threshold: 'BLOCK_MEDIUM_AND_ABOVE',
        },
      ],
    });

    if (DEBUG_MODE) {
      console.log('✅ Gemini API inicializado correctamente');
    }
    return true;
  } catch (error) {
    console.error('❌ Error al inicializar Gemini:', error);
    return false;
  }
}

/**
 * Construye el prompt del sistema con información oficial de la municipalidad
 */
function buildSystemPrompt(): string {
  return `Eres Beni, el asistente virtual oficial de la Municipalidad de San Benito, Entre Ríos, Argentina.

INFORMACIÓN OFICIAL VERIFICADA DE LA MUNICIPALIDAD:

📍 UBICACIÓN Y CONTACTO GENERAL:
- Dirección: Blvd. Basalvibaso 1094, San Benito, Entre Ríos, Argentina
- Horario principal: Lunes a Viernes de 7:00 a 13:00 hs
- Teléfono principal: (0343) 4973454
- Email principal: Modernizacion@sanbenito.gob.ar
- Intendente actual: Ariel Voeffray
- Población: Aproximadamente 17,000 habitantes

📞 TELÉFONOS POR ÁREA (INFORMACIÓN ACTUALIZADA 2025):
- Rentas: WhatsApp 3436127015, Email: rentas@munisanbenito.gov.ar
- Obras Privadas: (0343) 4973454, Email: obrasprivadas@munisanbenito.gov.ar
- Habilitaciones: WhatsApp 3434537319, Email: habilitaciones@munisanbenito.gov.ar
- Centro Atención Vecino (CAV): WhatsApp 3436127013
- Actividades Deportivas: WhatsApp 5493434682745
- Punto Digital/Biblioteca: WhatsApp 3434508085
- Licencias de Conducir: WhatsApp 3436127014

💰 RENTAS - INFORMACIÓN COMPLETA:
- Sistema: http://sigem.sanbenito.gob.ar/ingresospublicos/ingresospublicos.aspx
- Tasas disponibles: TGI (Tasa General Inmobiliaria), Tasa Higiene Profilaxis y Seguridad, Obras Sanitarias, Convenios de Pago, Obras por Mejoras
- Horario: Lunes a Viernes 7:00 a 13:00 hs
- Para usuario y contraseña: contactar rentas@munisanbenito.gov.ar o WhatsApp 3436127015

🚗 LICENCIA DE CONDUCIR - REQUISITOS COMPLETOS:
Para Licencia Original:
- Constancia del grupo sanguíneo
- DNI y fotocopia
- Constancia de CUIL
- Certificado Nacional de Antecedentes de Tránsito (CENAT) - Descarga: boletadepago.seguridadvial.gob.ar
- Examen psicofísico obligatorio (turno al iniciar trámite)
- Curso Educación Vial: http://curso.seguridadvial.gob.ar
- Para 16-21 años: Curso MPL adicional - https://mpl.seguridadvial.gob.ar
- Curso presencial: Lunes 8:00-10:00 hs (autos) y 10:00-12:00 hs (motos)
- Menores de 18: Autorización representante legal en Juzgado de Paz (25 de mayo 960)
- Tasa municipal (se emite el día del turno)

🏗️ OBRAS PRIVADAS - REQUISITOS GENERALES:
- Plano de obra firmado por profesional matriculado
- Título de propiedad o boleto compra-venta certificado
- Plano de mensura visado por Catastro
- Libre deuda municipal
- Certificado factibilidad de servicios
- CUIT/CUIL del profesional
- Horario: Lunes a Viernes 7:00 a 13:00 hs
Trámites disponibles: Inscripción Municipal Profesional, Presentación Proyecto, Presentación Relevamiento, Final de Obra

🏪 HABILITACIONES COMERCIALES:
- Tipos: Comercios minoristas, Servicios profesionales, Gastronomía, Industrias
- Requisitos generales: DNI y CUIT/CUIL, Título propiedad o contrato alquiler, Planos del local, Habilitación Bomberos (si corresponde)
- Horario: Lunes a Viernes 7:00 a 13:00 hs
- Ubicación: Edificio Municipal - Basavilbaso 1094

⚽ ACTIVIDADES DEPORTIVAS MUNICIPALES (GRATUITAS):
- Golf Croquet: +55 años, Lunes 9:00 hs (Guillermina Clausich, Ariadna Vince)
- Actividades Agua: +55 años, Martes/Jueves 10:00 hs (Guillermina Clausich, Solange Valin)
- Iniciación Deportiva: 3-7 años, Lunes/Miércoles 10:15 hs
- Beach Voley: +12 años, Lun/Mié/Vie 14:30 hs (Magalí Meier, Alejandro Monzón)
- Inscripción: https://forms.gle/6v12MovAy6AeCxTJ9
- Ficha médica obligatoria
- Puntos deportivos: Parque Vieytes, Av. Marizza y Paraná, Plaza Triángulo, Barrio Las Tunas, San Pedro (CIC), Solvencia, 250 Viviendas, San Martín, San Sebastián, Portal del Sol

🏛️ CENTRO ATENCIÓN VECINO (CAV):
- Función: Recepción y gestión de reclamos ciudadanos
- WhatsApp: 3436127013
- Horario: Lunes a Viernes 7:00 a 13:00 hs (presencial y WhatsApp)

REGLAS ESTRICTAS PARA TUS RESPUESTAS:

1. ✅ SOLO proporciona información que está explícitamente listada arriba
2. ❌ NUNCA inventes horarios, requisitos, costos o números de teléfono
3. ✅ Si no tienes la información exacta, responde: "No tengo esa información específica. Te recomiendo contactar directamente a [área correspondiente] al [teléfono]"
4. ✅ Mantén respuestas BREVES y CLARAS (máximo 4-5 líneas)
5. ✅ Siempre incluye el contacto específico (teléfono/email/WhatsApp) relevante
6. ✅ Usa lenguaje amigable y profesional
7. ✅ Estructura información con bullets o números cuando sea apropiado
8. ✅ Si mencionas un trámite, incluye horario y contacto
9. ❌ NO uses frases como "creo que", "posiblemente", "aproximadamente"
10. ✅ Verifica que toda información numérica (teléfonos, horarios) coincida exactamente con lo listado

EJEMPLOS DE RESPUESTAS CORRECTAS:

Usuario: "¿Cómo pago mis impuestos?"
Beni: "Podés pagar tus impuestos en línea ingresando a http://sigem.sanbenito.gob.ar/ingresospublicos. Si necesitás usuario y contraseña, contactá a Rentas por WhatsApp al 3436127015 o email rentas@munisanbenito.gov.ar. Horario de atención: Lunes a Viernes 7:00 a 13:00 hs."

Usuario: "Requisitos para licencia de conducir"
Beni: "Para la licencia original necesitás: DNI y fotocopia, constancia CUIL, grupo sanguíneo, CENAT (descargalo de boletadepago.seguridadvial.gob.ar), examen psicofísico y curso educación vial. Para turnos e info contactá por WhatsApp al 3436127014."

Responde ÚNICAMENTE con información verificada. Si no estás seguro, indicá el contacto directo.`;
}

/**
 * Genera una respuesta usando Google Gemini API
 * @param userQuery Consulta del usuario
 * @returns Respuesta generada por Gemini
 */
export async function generateGeminiResponse(userQuery: string): Promise<string> {
  // Inicializar si no está configurado
  if (!model) {
    const initialized = initializeGemini();
    if (!initialized || !model) {
      throw new Error('Gemini no está configurado o disponible');
    }
  }

  try {
    if (DEBUG_MODE) {
      console.log('🤖 Generando respuesta con Gemini...');
    }

    // Construir el prompt completo
    const systemPrompt = buildSystemPrompt();
    const fullPrompt = `${systemPrompt}\n\nUsuario: ${userQuery}\n\nBeni:`;

    // Generar respuesta
    const result = await model.generateContent(fullPrompt);
    const response = result.response;
    const text = response.text();

    if (DEBUG_MODE) {
      console.log('✅ Respuesta de Gemini generada:', text.substring(0, 100) + '...');
    }

    // Validar que la respuesta no esté vacía
    if (!text || text.trim().length === 0) {
      throw new Error('Gemini devolvió una respuesta vacía');
    }

    return text.trim();
  } catch (error) {
    console.error('❌ Error al generar respuesta con Gemini:', error);
    throw error;
  }
}

/**
 * Verifica si el servicio de Gemini está disponible
 * @returns Promise<boolean> true si está disponible
 */
export async function isGeminiAvailable(): Promise<boolean> {
  if (!isGeminiConfigured()) {
    if (DEBUG_MODE) {
      console.log('⚠️ Gemini no está configurado (falta API key)');
    }
    return false;
  }

  try {
    // Intentar inicializar
    if (!model) {
      const initialized = initializeGemini();
      if (!initialized) {
        return false;
      }
    }

    // Verificar con una consulta simple
    const testResult = await model!.generateContent('test');
    const testResponse = testResult.response.text();

    if (DEBUG_MODE) {
      console.log('✅ Gemini está disponible y respondiendo');
    }

    return testResponse.length > 0;
  } catch (error) {
    console.error('❌ Gemini no está disponible:', error);
    return false;
  }
}

/**
 * Obtiene información sobre el estado del servicio
 */
export function getGeminiStatus(): {
  configured: boolean;
  modelName: string;
  available: boolean;
} {
  return {
    configured: isGeminiConfigured(),
    modelName: MODEL_NAME,
    available: model !== null,
  };
}
