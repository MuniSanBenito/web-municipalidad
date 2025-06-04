// src/components/chatbot/MessageParser.tsx
import { IMessageParser } from 'react-chatbot-kit';

interface TramiteMatcher {
  keywords: string[];
  handler: () => void;
}

class MessageParser implements IMessageParser {
  actionProvider: any;
  private tramiteMatchers: TramiteMatcher[];

  constructor(actionProvider: any) {
    this.actionProvider = actionProvider;

    // Initialize tramiteMatchers here to correctly bind actionProvider methods
    this.tramiteMatchers = [
      { keywords: ['actividades deportivas'], handler: () => this.actionProvider.handleActividadesDeportivas() },
      { keywords: ['area mujer', 'área mujer'], handler: () => this.actionProvider.handleAreaMujer() },
      { keywords: ['catastro'], handler: () => this.actionProvider.handleCatastro() },
      { keywords: ['cav'], handler: () => this.actionProvider.handleCav() },
      { keywords: ['cic barrio san pedro'], handler: () => this.actionProvider.handleCicBarrioSanPedro() },
      // Specific Habilitaciones slug keywords might be too dynamic for this simple list.
      // The general 'habilitaciones' keyword will lead to the main Habilitaciones page or options.
      { keywords: ['habilitaciones'], handler: () => this.actionProvider.handleHabilitaciones() },
      { keywords: ['licencia original'], handler: () => this.actionProvider.handleLicenciaOriginal() },
      { keywords: ['licencia renovacion', 'licencia renovación'], handler: () => this.actionProvider.handleLicenciaRenovacion() },
      { keywords: ['licencia ampliacion', 'licencia ampliación'], handler: () => this.actionProvider.handleLicenciaAmpliacion() },
      { keywords: ['licencia'], handler: () => this.actionProvider.handleLicencia() }, // General licencia if more specific not matched
      { keywords: ['mesa de entrada'], handler: () => this.actionProvider.handleMesaDeEntrada() },
      { keywords: ['inscripcion municipal', 'inscripción municipal'], handler: () => this.actionProvider.handleObrasInscripcionMunicipal() },
      { keywords: ['final de obra'], handler: () => this.actionProvider.handleObrasFinalDeObra() },
      { keywords: ['presentacion de proyecto', 'presentación de proyecto'], handler: () => this.actionProvider.handleObrasPresentacionProyecto() },
      { keywords: ['relevamiento'], handler: () => this.actionProvider.handleObrasRelevamiento() },
      { keywords: ['obras privadas'], handler: () => this.actionProvider.handleObrasPrivadas() }, // General Obras Privadas
      { keywords: ['punto digital', 'biblioteca'], handler: () => this.actionProvider.handlePuntoDigitalBiblioteca() },
      { keywords: ['rentas'], handler: () => this.actionProvider.handleRentas() },
      { keywords: ['talleres culturales'], handler: () => this.actionProvider.handleTalleresCulturales() },
    ];
  }

  parse(message: string): void {
    const lowerCaseMessage = message.toLowerCase();

    if (lowerCaseMessage.includes('hola') || lowerCaseMessage.includes('buenos') || lowerCaseMessage.includes('buenas')) {
      this.actionProvider.greet();
    } else if (lowerCaseMessage.includes('qué es esto') || lowerCaseMessage.includes('que es este sitio') || lowerCaseMessage.includes('info sitio')) {
      this.actionProvider.handleWebsiteInfo();
    } else if (lowerCaseMessage.includes('noticia') || lowerCaseMessage.includes('novedades')) {
      this.actionProvider.handleNoticiasInfo();
    } else if (lowerCaseMessage.includes('transparencia') || lowerCaseMessage.includes('documentos publicos') || lowerCaseMessage.includes('licitaciones')) {
      this.actionProvider.handleTransparenciaInfo();
    } else if (lowerCaseMessage.includes('contacto') || lowerCaseMessage.includes('teléfono') || lowerCaseMessage.includes('email')) {
      this.actionProvider.handleContactoInfo();
    } else if (lowerCaseMessage.includes('trámite') || lowerCaseMessage.includes('tramite') || lowerCaseMessage.includes('procedimiento') || lowerCaseMessage.includes('servicio')) {
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
      this.actionProvider.handleUnknown();
    }
  }
}
export default MessageParser;
