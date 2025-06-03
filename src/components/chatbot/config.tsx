// src/components/chatbot/config.tsx
// ... (other imports)
import { createChatBotMessage, Config } from 'react-chatbot-kit';
import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';
import GeneralOptions from './widgets/GeneralOptions';
import LinkButton from './widgets/LinkButton';

// ... (botName, initialMessages, customStyles)

const botName = 'Asistente Municipal';

const config: Config = {
  // ... (botName, initialMessages, customStyles)
  botName: botName,
  initialMessages: [
    createChatBotMessage("¡Hola! Soy el Asistente Virtual de la Municipalidad de San Benito."),
    createChatBotMessage("¿Cómo puedo ayudarte hoy? Puedes preguntarme sobre trámites, noticias o información de la ciudad.", {
      delay: 500,
    })
  ],
  customStyles: {
    botMessageBox: {
      backgroundColor: '#376B7E',
    },
    chatButton: {
      backgroundColor: '#34D399',
    },
  },
  state: {
    // Initialize expected state properties that widgets might depend on
    tramiteOptions: [], // Initialize as empty array
    // Add other states if your widgets/actionProvider depend on them
  },
  widgets: [
    {
      widgetName: 'generalOptions',
      widgetFunc: (props: any) => <GeneralOptions {...props} />,
      mapStateToProps: ['messages'],
    },
    {
      widgetName: 'linkButton',
      widgetFunc: (props: any) => <LinkButton {...props} />,
    },
    {
      widgetName: 'tramiteOptions',
      widgetFunc: (props: any) => <GeneralOptions {...props} />,
      // Make sure 'tramiteOptions' from the global state is mapped to this widget's props
      mapStateToProps: ['tramiteOptions'],
    },
  ],
  // ... (customComponents, messageParser, actionProvider)
  customComponents: {},
  messageParser: MessageParser,
  actionProvider: ActionProvider,
};

export default config;
