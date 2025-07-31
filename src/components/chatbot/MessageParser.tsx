// src/components/chatbot/MessageParser.tsx
import { createChatBotMessage } from 'react-chatbot-kit';
import { detectIntent } from './aiService';

// Definir la interfaz IMessageParser ya que no se exporta directamente de react-chatbot-kit
interface IMessageParser {
  parse(message: string): void;
}

interface TramiteMatcher {
  keywords: string[];
  handler: () => void;
}

interface PhoneNumberMatcher {
  keywords: string[];
  phoneNumber: string;
  description: string;
}

class MessageParser implements IMessageParser {
  actionProvider: any;
  private tramiteMatchers: TramiteMatcher[];
  private phoneNumberMatchers: PhoneNumberMatcher[];

  constructor(actionProvider: any) {
    this.actionProvider = actionProvider;

    // Inicializar los matchers de números de teléfono
    this.phoneNumberMatchers = [
      { keywords: ['teléfono principal', 'telefono principal', 'número principal', 'numero principal'], phoneNumber: '(0343) 497-2222', description: 'Teléfono principal de la Municipalidad' },
      { keywords: ['mesa de entrada', 'mesa entrada'], phoneNumber: '(0343) 497-2345', description: 'Mesa de Entrada' },
      { keywords: ['rentas', 'impuestos', 'tasas'], phoneNumber: '(0343) 497-2678', description: 'Área de Rentas' },
      { keywords: ['obras privadas', 'obras', 'construcción', 'construccion'], phoneNumber: '(0343) 497-2890', description: 'Área de Obras Privadas' },
      { keywords: ['punto digital', 'biblioteca'], phoneNumber: '(0343) 497-3010', description: 'Punto Digital y Biblioteca' },
      { keywords: ['deportes', 'actividades deportivas'], phoneNumber: '(0343) 497-2456', description: 'Área de Deportes' },
      { keywords: ['cultura', 'talleres culturales'], phoneNumber: '(0343) 497-2789', description: 'Área de Cultura' },
      { keywords: ['área mujer', 'area mujer', 'mujer'], phoneNumber: '(0343) 497-2567', description: 'Área de la Mujer' },
    ];

    // Initialize tramiteMatchers here to correctly bind actionProvider methods
    this.tramiteMatchers = [
      // Licencias
      { keywords: ['licencia de conducir', 'licencia conducir', 'carnet de conducir'], handler: () => this.actionProvider.handleLicencia() },
      { keywords: ['licencia original', 'primera licencia'], handler: () => this.actionProvider.handleLicenciaOriginal() },
      { keywords: ['licencia renovacion', 'licencia renovación', 'renovar licencia'], handler: () => this.actionProvider.handleLicenciaRenovacion() },
      { keywords: ['licencia ampliacion', 'licencia ampliación', 'ampliar licencia'], handler: () => this.actionProvider.handleLicenciaAmpliacion() },
      
      // Rentas e impuestos
      { keywords: ['rentas', 'impuestos', 'tasas', 'tributos', 'pagar impuestos'], handler: () => this.actionProvider.handleRentas() },
      
      // Obras privadas
      { keywords: ['obras privadas', 'construccion', 'construcción', 'edificacion', 'edificación'], handler: () => this.actionProvider.handleObrasPrivadas() },
      { keywords: ['inscripcion municipal', 'inscripción municipal'], handler: () => this.actionProvider.handleObrasInscripcionMunicipal() },
      { keywords: ['final de obra'], handler: () => this.actionProvider.handleObrasFinalDeObra() },
      { keywords: ['presentacion de proyecto', 'presentación de proyecto'], handler: () => this.actionProvider.handleObrasPresentacionProyecto() },
      { keywords: ['relevamiento'], handler: () => this.actionProvider.handleObrasRelevamiento() },
      
      // Habilitaciones
      { keywords: ['habilitaciones', 'habilitacion comercial', 'habilitación comercial', 'local comercial'], handler: () => this.actionProvider.handleHabilitaciones() },
      
      // Servicios municipales
      { keywords: ['actividades deportivas', 'deportes', 'polideportivo'], handler: () => this.actionProvider.handleActividadesDeportivas() },
      { keywords: ['area mujer', 'área mujer', 'mujer y genero', 'mujer y género'], handler: () => this.actionProvider.handleAreaMujer() },
      { keywords: ['catastro', 'catastro municipal'], handler: () => this.actionProvider.handleCatastro() },
      { keywords: ['cav', 'centro de atencion', 'centro de atención', 'atencion al vecino', 'atención al vecino'], handler: () => this.actionProvider.handleCav() },
      { keywords: ['cic barrio san pedro', 'cic san pedro', 'centro integrador'], handler: () => this.actionProvider.handleCicBarrioSanPedro() },
      { keywords: ['mesa de entrada', 'tramites generales', 'trámites generales'], handler: () => this.actionProvider.handleMesaDeEntrada() },
      { keywords: ['punto digital', 'biblioteca', 'biblioteca municipal'], handler: () => this.actionProvider.handlePuntoDigitalBiblioteca() },
      { keywords: ['talleres culturales', 'cultura', 'talleres artisticos', 'talleres artísticos'], handler: () => this.actionProvider.handleTalleresCulturales() },
      { keywords: ['produccion y empleo', 'producción y empleo', 'empleo', 'trabajo'], handler: () => this.actionProvider.handleProduccionEmpleo() },
      { keywords: ['tercera edad', 'discapacidad', 'adultos mayores'], handler: () => this.actionProvider.handleTerceraEdadDiscapacidad() },
    ];
  }

  parse(message: string): void {
    const lowerCaseMessage = message.toLowerCase();

    // Verificar si es una consulta sobre el modelo de IA o Gemma 2B
    if (lowerCaseMessage.includes('gemma') || 
        lowerCaseMessage.includes('modelo de ia') || 
        lowerCaseMessage.includes('modelo ia') || 
        lowerCaseMessage.includes('inteligencia artificial') ||
        lowerCaseMessage.includes('ollama')) {
      this.actionProvider.handleShowOllamaStatus();
      return;
    }
    
    // Verificar si es una consulta de horarios
    if (lowerCaseMessage.includes('horario') || lowerCaseMessage.includes('hora de atención') || lowerCaseMessage.includes('cuando atienden')) {
      this.actionProvider.handleHorarios();
      return;
    }

    // Verificar si es una consulta de teléfono específico
    const phoneMatch = this.findPhoneNumberMatch(lowerCaseMessage);
    if (phoneMatch) {
      const phoneMessage = this.createPhoneNumberMessage(phoneMatch);
      this.actionProvider.handleUnknown(phoneMessage);
      return;
    }

    // Verificar saludos
    if (lowerCaseMessage.includes('hola') || lowerCaseMessage.includes('buenos') || lowerCaseMessage.includes('buenas')) {
      this.actionProvider.greet();
    } 
    // Verificar información del sitio
    else if (lowerCaseMessage.includes('qué es esto') || lowerCaseMessage.includes('que es este sitio') || lowerCaseMessage.includes('info sitio')) {
      this.actionProvider.handleWebsiteInfo();
    } 
    // Verificar noticias
    else if (lowerCaseMessage.includes('noticia') || lowerCaseMessage.includes('novedades')) {
      this.actionProvider.handleNoticiasInfo();
    } 
    // Verificar transparencia
    else if (lowerCaseMessage.includes('transparencia') || lowerCaseMessage.includes('documentos publicos') || lowerCaseMessage.includes('licitaciones')) {
      this.actionProvider.handleTransparenciaInfo();
    } 
    // Verificar contacto
    else if (lowerCaseMessage.includes('contacto') || lowerCaseMessage.includes('teléfono') || lowerCaseMessage.includes('telefono') || lowerCaseMessage.includes('email')) {
      this.actionProvider.handleContactoInfo();
    } 
    // Verificar trámites
    else if (lowerCaseMessage.includes('trámite') || lowerCaseMessage.includes('tramite') || lowerCaseMessage.includes('procedimiento') || lowerCaseMessage.includes('servicio')) {
      let matchedSpecificTramite = false;
      // Iterate in order: more specific matches should ideally be earlier in the array or have more unique keywords.
      // The current keyword list has some overlaps (e.g. 'licencia' and 'licencia original').
      // The .some() and .find() or a loop like this will pick the first match.
      // For overlapping keywords, the order in `tramiteMatchers` array can matter if a message contains keywords for multiple entries.
      // Example: "licencia original" also contains "licencia". If 'licencia' matcher is first, it might incorrectly match.
      // So, order `tramiteMatchers` from most specific to least specific if keyword sets overlap.
      // The current list seems okay as "licencia original" is more specific than just "licencia".

      for (const matcher of this.tramiteMatchers) {
        if (matcher.keywords.some(keyword => lowerCaseMessage.includes(keyword))) {
          // Check if this is a more specific match than a previous one if there was one (advanced).
          // For simplicity, first match wins here.
          matcher.handler();
          matchedSpecificTramite = true;
          break;
        }
      }

      if (!matchedSpecificTramite) {
        this.actionProvider.handleTramiteIntro(); // Fallback for general "trámite" query
      }
    } else {
      // Si no coincide con ninguna de las opciones anteriores, enviamos al servicio de IA
      this.actionProvider.handleUnknown(message);
    }
  }

  /**
   * Busca coincidencias de números de teléfono en el mensaje
   * @param message Mensaje del usuario en minúsculas
   * @returns Matcher de teléfono encontrado o null
   */
  private findPhoneNumberMatch(message: string): PhoneNumberMatcher | null {
    for (const matcher of this.phoneNumberMatchers) {
      if (matcher.keywords.some(keyword => message.includes(keyword))) {
        return matcher;
      }
    }
    return null;
  }

  /**
   * Crea un mensaje con la información del número de teléfono
   * @param matcher Matcher de teléfono encontrado
   * @returns Mensaje formateado
   */
  private createPhoneNumberMessage(matcher: PhoneNumberMatcher): string {
    return `El número de teléfono para ${matcher.description} es ${matcher.phoneNumber}.`;
  }
}
export default MessageParser;
