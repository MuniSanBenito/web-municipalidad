// src/components/chatbot/ActionProvider.tsx
// ... (imports and constructor)
import { IActionProvider } from 'react-chatbot-kit';

class ActionProvider implements IActionProvider {
  // ... (constructor and other methods)
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

  private updateChatbotState(message: any) {
    this.setState((prevState: any) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  }

  // ... (greet, handleWebsiteInfo, etc.)
  greet() {
    const greetingMessage = this.createChatBotMessage('¡Hola! ¿En qué puedo ayudarte hoy?');
    this.updateChatbotState(greetingMessage);
  }

  handleWebsiteInfo() {
    const message = this.createChatBotMessage(
      'Este es el portal oficial de la Municipalidad de San Benito. Aquí encontrarás información sobre servicios municipales, noticias, transparencia y más.'
    );
    this.updateChatbotState(message);
  }

  handleTramiteIntro() {
    const messageText = "Claro, puedo ayudarte con información sobre trámites. ¿Qué tipo de trámite te interesa?";
    const botMessage = this.createChatBotMessage(
      messageText,
      {
        widget: 'tramiteOptions', // This widget will display the options
      }
    );
    this.updateChatbotState(botMessage);

    // Define options for the widget
    const options = [
      { text: 'Obras Privadas', handler: () => this.handleLinkToPage('Trámites de Obras Privadas', '/tramites/obras-privadas'), id: 1 },
      { text: 'Habilitaciones', handler: () => this.handleLinkToPage('Trámites de Habilitaciones', '/tramites/habilitaciones'), id: 2 },
      { text: 'Rentas', handler: () => this.handleLinkToPage('Trámites de Rentas', '/tramites/rentas'), id: 3 },
      { text: 'Ver todos', handler: () => this.handleLinkToPage('Todos los trámites', '/tramites'), id: 4 },
    ];

    // Update the global chatbot state so `tramiteOptions` widget receives these options
    this.setState((prevState: any) => ({
      ...prevState,
      tramiteOptions: options, // This will be picked up by the widget via mapStateToProps
    }));
  }

  handleNoticiasInfo() {
    const message = this.createChatBotMessage(
      "Puedes encontrar las últimas noticias y novedades en la sección 'Noticias'.",
      {
        widget: 'linkButton',
        payload: { label: 'Ir a Noticias', url: '/noticias' }
      }
    );
    this.updateChatbotState(message);
  }

  handleTransparenciaInfo() {
    const message = this.createChatBotMessage(
      "Toda la información sobre transparencia, como documentos públicos, licitaciones y concursos, está en la sección 'Transparencia'.",
      {
        widget: 'linkButton',
        payload: { label: 'Ir a Transparencia', url: '/transparencia' }
      }
    );
    this.updateChatbotState(message);
  }

  handleContactoInfo() {
    const message = this.createChatBotMessage(
      'Puedes contactar a la municipalidad a través de: Email: Modernizacion@sanbenito.gob.ar. También puedes visitar nuestra página web www.sanbenito.gob.ar para más detalles.'
    );
    this.updateChatbotState(message);
  }

  handleLinkToPage(pageName: string, pageUrl: string) {
    const message = this.createChatBotMessage(
      `Entendido. Puedes hacer clic aquí para ir a ${pageName}:`,
      {
        widget: 'linkButton',
        payload: { label: `Ir a ${pageName}`, url: pageUrl }
      }
    );
    this.updateChatbotState(message);
  }

  handleUnknown() {
    const message = this.createChatBotMessage(
      "Lo siento, no entendí tu pregunta. Puedes intentar reformularla. Para temas específicos, te recomiendo navegar por las secciones del sitio o contactar a Modernizacion@sanbenito.gob.ar."
    );
    this.updateChatbotState(message);
  }
}
// ... (export)
export default ActionProvider;
