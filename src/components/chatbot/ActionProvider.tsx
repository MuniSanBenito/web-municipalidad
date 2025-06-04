// src/components/chatbot/ActionProvider.tsx
import { IActionProvider } from 'react-chatbot-kit';

class ActionProvider implements IActionProvider {
  createChatBotMessage: any;
  setState: any;
  stateRef: any;
  createClientMessage: any;
  addMessageToState: any;

  constructor(
    createChatBotMessage: any,
    setStateFunc: any,
    createClientMessage: any,
    stateRef?: any,
    addMessageToState?: any,
  ) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
    this.stateRef = stateRef;
    this.addMessageToState = addMessageToState;
  }

  private _updateChatbotState(message: any) {
    this.setState((prevState: any) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  }

  private _createLinkedMessage(text: string, linkLabel: string, linkUrl: string) {
    const message = this.createChatBotMessage(text, {
      widget: 'linkButton',
      payload: { label: linkLabel, url: linkUrl },
    });
    this._updateChatbotState(message);
  }

  greet() {
    const greetingMessage = this.createChatBotMessage('¡Hola! ¿En qué puedo ayudarte hoy?');
    this._updateChatbotState(greetingMessage);
  }
  handleWebsiteInfo() {
    const message = this.createChatBotMessage(
      'Este es el portal oficial de la Municipalidad de San Benito. Aquí encontrarás información sobre servicios municipales, noticias, transparencia y más.'
    );
    this._updateChatbotState(message);
  }
  handleNoticiasInfo() {
    this._createLinkedMessage(
      "Puedes encontrar las últimas noticias y novedades en la sección 'Noticias'.",
      'Ir a Noticias',
      '/noticias'
    );
  }
  handleTransparenciaInfo() {
    this._createLinkedMessage(
      "Toda la información sobre transparencia, como documentos públicos, licitaciones y concursos, está en la sección 'Transparencia'.",
      'Ir a Transparencia',
      '/transparencia'
    );
  }
  handleContactoInfo() {
    const message = this.createChatBotMessage(
      'Puedes contactar a la municipalidad a través de: Email: Modernizacion@sanbenito.gob.ar. También puedes visitar nuestra página web www.sanbenito.gob.ar para más detalles.'
    );
    this._updateChatbotState(message);
  }
  handleUnknown() {
     const message = this.createChatBotMessage(
      "Lo siento, no entendí tu pregunta. Puedes intentar reformularla. Para temas específicos, te recomiendo navegar por las secciones del sitio o contactar a Modernizacion@sanbenito.gob.ar."
    );
    this._updateChatbotState(message);
  }
  handleLinkToPage(pageName: string, pageUrl: string) {
    this._createLinkedMessage(
      `Entendido. Puedes hacer clic aquí para ir a ${pageName}:`,
      `Ir a ${pageName}`,
      pageUrl
    );
  }

  // --- New Trámite Handlers ---
  handleActividadesDeportivas() {
    this._createLinkedMessage('Información sobre Actividades Deportivas:', 'Ver Actividades Deportivas', '/tramites/actividades-deportivas');
  }
  handleAreaMujer() {
    this._createLinkedMessage('Información sobre el Área Mujer:', 'Ver Área Mujer', '/tramites/area-mujer');
  }
  handleCatastro() {
    this._createLinkedMessage('Información sobre Catastro:', 'Ver Catastro', '/tramites/catastro');
  }
  handleCav() {
    this._createLinkedMessage('Información sobre CAV (Centro de Atención al Vecino):', 'Ver CAV', '/tramites/cav');
  }
  handleCicBarrioSanPedro() {
    this._createLinkedMessage('Información sobre CIC Barrio San Pedro:', 'Ver CIC Barrio San Pedro', '/tramites/cic-barrio-san-pedro');
  }
  handleHabilitaciones() {
    this._createLinkedMessage('Información general sobre Habilitaciones:', 'Ver Habilitaciones', '/tramites/habilitaciones');
  }
  handleLicencia() {
    this._createLinkedMessage('Información general sobre Licencias de Conducir:', 'Ver Licencias', '/tramites/licencia');
  }
  handleLicenciaOriginal() {
    this._createLinkedMessage('Información sobre Licencia de Conducir Original:', 'Ver Licencia Original', '/tramites/licencia/original');
  }
  handleLicenciaRenovacion() {
    this._createLinkedMessage('Información sobre Renovación de Licencia de Conducir:', 'Ver Renovación de Licencia', '/tramites/licencia/renovaciones');
  }
  handleLicenciaAmpliacion() {
    this._createLinkedMessage('Información sobre Ampliación de Licencia de Conducir:', 'Ver Ampliación de Licencia', '/tramites/licencia/ampliacion');
  }
  handleMesaDeEntrada() {
    this._createLinkedMessage('Información sobre Mesa de Entrada:', 'Ver Mesa de Entrada', '/tramites/mesa-de-entrada');
  }
  handleObrasPrivadas() {
    this._createLinkedMessage('Información general sobre Obras Privadas:', 'Ver Obras Privadas', '/tramites/obras-privadas');
  }
  handleObrasInscripcionMunicipal() {
    this._createLinkedMessage('Información sobre Inscripción Municipal para Obras Privadas:', 'Ver Inscripción Municipal', '/tramites/obras-privadas/inscripcion-municipal');
  }
  handleObrasFinalDeObra() {
    this._createLinkedMessage('Información sobre Presentación de Final de Obra:', 'Ver Final de Obra', '/tramites/obras-privadas/presentacion-de-final-de-obra');
  }
  handleObrasPresentacionProyecto() {
    this._createLinkedMessage('Información sobre Presentación de Proyecto de Obra:', 'Ver Presentación de Proyecto', '/tramites/obras-privadas/presentacion-de-proyecto');
  }
  handleObrasRelevamiento() {
    this._createLinkedMessage('Información sobre Presentación de Relevamiento de Obra:', 'Ver Relevamiento de Obra', '/tramites/obras-privadas/presentacion-de-relevamiento');
  }
  handlePuntoDigitalBiblioteca() {
    this._createLinkedMessage('Información sobre Punto Digital Biblioteca:', 'Ver Punto Digital', '/tramites/punto-digital-biblioteca');
  }
  handleRentas() {
    this._createLinkedMessage('Información sobre Rentas:', 'Ver Rentas', '/tramites/rentas');
  }
  handleTalleresCulturales() {
    this._createLinkedMessage('Información sobre Talleres Culturales:', 'Ver Talleres Culturales', '/tramites/talleres-culturales');
  }

  // Updated handleTramiteIntro
  handleTramiteIntro() {
    const messageText = "Puedo ayudarte con información sobre varios trámites y servicios. ¿Cuál te interesa?";
    const botMessage = this.createChatBotMessage(messageText, {
      widget: 'tramiteOptions', // This widget will display the options
    });
    this._updateChatbotState(botMessage);

    const options = [
      // Grouping some for brevity, direct access via keywords is still possible
      { text: 'Licencias de Conducir', handler: () => this.handleLicencia(), id: 1 },
      { text: 'Obras Privadas', handler: () => this.handleObrasPrivadas(), id: 2 },
      { text: 'Habilitaciones', handler: () => this.handleHabilitaciones(), id: 3 },
      { text: 'Rentas', handler: () => this.handleRentas(), id: 4 },
      { text: 'Catastro', handler: () => this.handleCatastro(), id: 5 },
      { text: 'Mesa de Entrada', handler: () => this.handleMesaDeEntrada(), id: 6 },
      // Adding a few more direct common ones
      { text: 'Actividades Deportivas', handler: () => this.handleActividadesDeportivas(), id: 7 },
      { text: 'Área Mujer', handler: () => this.handleAreaMujer(), id: 8 },
      { text: 'Talleres Culturales', handler: () => this.handleTalleresCulturales(), id: 9 },
      // A "More options" or "All Trámites" could be added if this list gets too long,
      // leading to another message with more buttons. For now, this is a selection.
      // The user can also type the specific trámite name.
    ];

    this.setState((prevState: any) => ({
      ...prevState,
      tramiteOptions: options,
    }));
  }
}
export default ActionProvider;
