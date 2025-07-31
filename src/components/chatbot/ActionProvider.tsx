// src/components/chatbot/ActionProvider.tsx
import { createChatBotMessage } from 'react-chatbot-kit';
import { fetchAIResponse } from './aiService';

// Definir la interfaz IActionProvider ya que no se exporta directamente de react-chatbot-kit
interface IActionProvider {
  createChatBotMessage: any;
  setState: any;
  createClientMessage: any;
}

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
      'Puedes contactar a la municipalidad a través de:\n\n📧 Email: Modernizacion@sanbenito.gob.ar\n📞 Teléfono principal: (0343) 497-2222\n📞 Mesa de entrada: (0343) 497-2345\n📞 Rentas: (0343) 497-2678\n📞 Obras privadas: (0343) 497-2890\n\nTambién puedes visitar nuestra página web www.sanbenito.gob.ar para más detalles.'
    );
    this._updateChatbotState(message);
  }
  // Mostrar indicador de escritura
  private _showTypingIndicator() {
    this.setState((prevState: any) => ({
      ...prevState,
      typing: true
    }));
  }

  // Ocultar indicador de escritura
  private _hideTypingIndicator() {
    this.setState((prevState: any) => ({
      ...prevState,
      typing: false
    }));
  }

  // Mostrar sugerencias inteligentes
  private _showSuggestions() {
    const message = this.createChatBotMessage('¿En qué más te puedo ayudar?', {
      widget: 'smartSuggestions',
      loading: false,
      delay: 500
    });

    this._updateChatbotState(message);
  }

  // Manejar mensaje desconocido con mejor retroalimentación y validación
  async handleUnknown(userMessage: string) {
    // Validar entrada
    if (!userMessage || userMessage.trim().length === 0) {
      const errorMessage = this.createChatBotMessage(
        "Por favor, escribe tu consulta para que pueda ayudarte."
      );
      this._updateChatbotState(errorMessage);
      return;
    }

    // Mostrar indicador de escritura
    this._showTypingIndicator();
    
    try {
      // Mostrar mensaje temporal de procesamiento
      const processingMessage = this.createChatBotMessage(
        "Estoy buscando la información más precisa para ti... 🔍"
      );
      this._updateChatbotState(processingMessage);
      
      // Obtener respuesta de la IA con timeout
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout')), 15000)
      );
      
      const aiPromise = fetchAIResponse(userMessage);
      const { response: aiResponse, usedGemma } = await Promise.race([
        aiPromise,
        timeoutPromise
      ]) as { response: string; usedGemma: boolean };
      
      // Validar que la respuesta no esté vacía
      if (!aiResponse || aiResponse.trim().length === 0) {
        throw new Error('Respuesta vacía');
      }
      
      // Reemplazar mensaje de procesamiento con la respuesta real
      this.setState((prevState: any) => {
        const messages = [...prevState.messages];
        messages.pop(); // Eliminar mensaje de procesamiento
        return {
          ...prevState,
          messages: [...messages, this.createChatBotMessage(aiResponse)]
        };
      });
      
      // Si se usó Gemma 2B, mostrar indicador discreto
      if (usedGemma) {
        setTimeout(() => {
          const gemmaIndicator = this.createChatBotMessage(
            "🤖 Respuesta generada por IA - Gemma 2B", 
            { 
              widget: "ollamaStatus",
              delay: 500
            }
          );
          this._updateChatbotState(gemmaIndicator);
        }, 800);
      } else {
        this._showSuggestions();
      }
    } catch (error) {
      console.error('Error en handleUnknown:', error);
      
      // Determinar tipo de error y mostrar mensaje apropiado
      let errorMessage = '';
      
      if (error instanceof Error) {
        if (error.message === 'Timeout') {
          errorMessage = 'La consulta está tomando más tiempo del esperado. Por favor, inténtalo nuevamente o contacta directamente a la municipalidad al (0343) 497-2222.';
        } else if (error.message === 'Respuesta vacía') {
          errorMessage = 'No pude generar una respuesta para tu consulta. ¿Podrías reformular tu pregunta o contactar directamente al (0343) 497-2222?';
        } else {
          errorMessage = 'Ocurrió un problema técnico. Te recomiendo contactar directamente a la municipalidad al (0343) 497-2222 para obtener la información que necesitas.';
        }
      } else {
        errorMessage = 'Ocurrió un error inesperado. Por favor, inténtalo nuevamente.';
      }
      
      // Eliminar mensaje de procesamiento y mostrar error
      this.setState((prevState: any) => {
        const messages = [...prevState.messages];
        if (messages.length > 0 && messages[messages.length - 1].message?.includes('buscando')) {
          messages.pop(); // Eliminar mensaje de procesamiento
        }
        return {
          ...prevState, 
          messages: [...messages, this.createChatBotMessage(errorMessage)]
        };
      });
      
      // Mostrar opciones alternativas después del error
      setTimeout(() => {
        this._showSuggestions();
      }, 1500);
      
    } finally {
      this._hideTypingIndicator();
    }
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
    this._createLinkedMessage('Información sobre Renovación de Licencia:', 'Ver Renovación', '/tramites/licencia/renovacion');
  }
  handleLicenciaAmpliacion() {
    this._createLinkedMessage('Información sobre Ampliación de Licencia:', 'Ver Ampliación', '/tramites/licencia/ampliacion');
  }
  handleRentas() {
    this._createLinkedMessage('Información sobre Rentas e Impuestos Municipales:', 'Ver Rentas', '/tramites/rentas');
  }
  handleObrasPrivadas() {
    this._createLinkedMessage('Información sobre Obras Privadas:', 'Ver Obras Privadas', '/tramites/obras-privadas');
  }
  handleObrasInscripcionMunicipal() {
    this._createLinkedMessage('Información sobre Inscripción Municipal:', 'Ver Inscripción', '/tramites/obras-privadas/inscripcion');
  }
  handleObrasFinalDeObra() {
    this._createLinkedMessage('Información sobre Final de Obra:', 'Ver Final de Obra', '/tramites/obras-privadas/final');
  }
  handleObrasPresentacionProyecto() {
    this._createLinkedMessage('Información sobre Presentación de Proyecto:', 'Ver Presentación', '/tramites/obras-privadas/presentacion');
  }
  handleObrasRelevamiento() {
    this._createLinkedMessage('Información sobre Relevamiento:', 'Ver Relevamiento', '/tramites/obras-privadas/relevamiento');
  }
  handleMesaDeEntrada() {
    this._createLinkedMessage('Información sobre Mesa de Entrada:', 'Ver Mesa de Entrada', '/tramites/mesa-de-entrada');
  }
  handlePuntoDigitalBiblioteca() {
    this._createLinkedMessage('Información sobre Punto Digital y Biblioteca:', 'Ver Punto Digital', '/tramites/punto-digital-biblioteca');
  }
  handleTalleresCulturales() {
    this._createLinkedMessage('Información sobre Talleres Culturales:', 'Ver Talleres', '/tramites/talleres-culturales');
  }
  handleProduccionEmpleo() {
    this._createLinkedMessage('Información sobre Producción y Empleo:', 'Ver Producción y Empleo', '/tramites/produccion-empleo');
  }
  handleTerceraEdadDiscapacidad() {
    this._createLinkedMessage('Información sobre Tercera Edad y Discapacidad:', 'Ver Tercera Edad', '/tramites/tercera-edad-discapacidad');
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
      { text: 'Teléfonos Importantes', handler: () => this.handleContactoInfo(), id: 10 },
      { text: 'Consulta General', handler: () => this.handleGeneralInquiry(), id: 11 },
    ];

    this.setState((prevState: any) => ({
      ...prevState,
      tramiteOptions: options,
    }));
  }
  
  // Nuevos métodos para manejar consultas generales y búsqueda de información
  handleGeneralInquiry() {
    const message = this.createChatBotMessage(
      "¿Sobre qué tema te gustaría consultar? Puedes preguntarme sobre servicios municipales, trámites, horarios de atención, o cualquier otra información relacionada con la Municipalidad de San Benito."
    );
    this._updateChatbotState(message);
  }

  // Método para buscar información en la web municipal
  handleWebSearch(query: string) {
    // Aquí podríamos implementar una búsqueda más avanzada en el futuro
    const message = this.createChatBotMessage(
      `Estoy buscando información sobre "${query}" en nuestro sitio web...`,
    );
    this._updateChatbotState(message);
    
    // Simulamos una búsqueda y mostramos resultados después de un breve retraso
    setTimeout(() => {
      this.handleUnknown(query);
    }, 1000);
  }

  // Método para manejar horarios de atención
  handleHorarios() {
    const message = this.createChatBotMessage(
      "Los horarios de atención de la Municipalidad de San Benito son:\n\n" +
      "📍 Edificio Municipal: Lunes a Viernes de 7:00 a 13:00 hs\n" +
      "📍 Rentas: Lunes a Viernes de 7:00 a 13:00 hs\n" +
      "📍 Obras Privadas: Lunes a Viernes de 7:00 a 12:00 hs\n" +
      "📍 Punto Digital: Lunes a Viernes de 8:00 a 12:00 y 16:00 a 20:00 hs"
    );
    this._updateChatbotState(message);
  }
  
  // Método para mostrar el estado de Gemma 2B
  handleShowOllamaStatus() {
    const message = this.createChatBotMessage(
      "Aquí puedes ver el estado actual del modelo de IA Gemma 2B:",
      {
        widget: "ollamaStatus",
      }
    );
    this._updateChatbotState(message);
  }
}

export default ActionProvider;
