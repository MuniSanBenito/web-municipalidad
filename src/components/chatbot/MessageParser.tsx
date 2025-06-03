// src/components/chatbot/MessageParser.tsx
import { IMessageParser } from 'react-chatbot-kit';

class MessageParser implements IMessageParser {
  actionProvider: any;

  constructor(actionProvider: any) {
    this.actionProvider = actionProvider;
  }

  parse(message: string): void {
    const lowerCaseMessage = message.toLowerCase();

    if (lowerCaseMessage.includes('hola') || lowerCaseMessage.includes('buenos') || lowerCaseMessage.includes('buenas')) {
      this.actionProvider.greet();
    } else if (lowerCaseMessage.includes('qué es esto') || lowerCaseMessage.includes('que es este sitio') || lowerCaseMessage.includes('info sitio')) {
      this.actionProvider.handleWebsiteInfo();
    } else if (lowerCaseMessage.includes('trámite') || lowerCaseMessage.includes('tramite') || lowerCaseMessage.includes('procedimiento')) {
      this.actionProvider.handleTramiteIntro();
    } else if (lowerCaseMessage.includes('noticia') || lowerCaseMessage.includes('novedades')) {
      this.actionProvider.handleNoticiasInfo();
    } else if (lowerCaseMessage.includes('transparencia') || lowerCaseMessage.includes('documentos publicos') || lowerCaseMessage.includes('licitaciones')) {
      this.actionProvider.handleTransparenciaInfo();
    } else if (lowerCaseMessage.includes('contacto') || lowerCaseMessage.includes('teléfono') || lowerCaseMessage.includes('email')) {
      this.actionProvider.handleContactoInfo();
    } else {
      this.actionProvider.handleUnknown();
    }
  }
}

export default MessageParser;
