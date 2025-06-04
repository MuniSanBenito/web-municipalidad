// src/components/chatbot/config.tsx
import { createChatBotMessage, Config } from 'react-chatbot-kit';
import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';
import GeneralOptions from './widgets/GeneralOptions';
import LinkButton from './widgets/LinkButton';

const botName = 'Asistente Municipal';

const config: Config = {
  botName: botName,
  initialMessages: [
    createChatBotMessage("¡Hola! Soy el Asistente Virtual de la Municipalidad de San Benito."),
    createChatBotMessage("¿Cómo puedo ayudarte hoy? Puedes preguntarme sobre trámites, noticias o información de la ciudad.", {
      delay: 500,
    })
  ],
  customStyles: {
    // Chatbot general container
    // .react-chatbot-kit-chat-container (Target with global CSS if needed, or accept default)

    // Header
    // .react-chatbot-kit-chat-header
    // For now, we'll accept the default header styling or assume it picks up some global styles.
    // Customizations here can be limited without deeper CSS.

    // Bot message bubble
    botMessageBox: {
      backgroundColor: '#2d6a84', // A slightly more muted, professional blue
      // color: 'white', // Ensure text is readable
    },
    // User message bubble
    // .react-chatbot-kit-user-chat-message
    userMessageBox: {
      backgroundColor: '#f1f1f1', // Light grey for user messages
      // color: '#333', // Darker text for readability
    },
    // Chat button (send button)
    chatButton: {
      backgroundColor: '#007bff', // A standard primary blue, can be themed with DaisyUI primary
      // Ensure this matches DaisyUI's primary button color if possible
    },
    // Chat input area
    // .react-chatbot-kit-chat-input-container
    // .react-chatbot-kit-chat-input
    // These are harder to style directly with customStyles for background/border of the whole input form.
    // Accept defaults or use global CSS targeting.
  },
  state: {
    tramiteOptions: [],
  },
  widgets: [
    {
      widgetName: 'generalOptions',
      widgetFunc: (props: any) => <GeneralOptions {...props} />,
      mapStateToProps: ['tramiteOptions'], // Corrected from ['messages'] to ['tramiteOptions'] based on previous reviews, assuming this was an oversight. If 'messages' is truly needed for a *different* generalOptions instance, this needs to be split. Given current usage, 'tramiteOptions' is the relevant state for the "tramiteOptions" named widget.
    },
    {
      widgetName: 'linkButton',
      widgetFunc: (props: any) => <LinkButton {...props} />,
    },
    {
      widgetName: 'tramiteOptions', // This is the one that uses GeneralOptions with tramiteOptions state
      widgetFunc: (props: any) => <GeneralOptions {...props} />,
      mapStateToProps: ['tramiteOptions'],
    },
  ],
  customComponents: {
    // Example: For more control over the header
    // header: (props) => <div style={{backgroundColor: 'grey', padding: '10px'}}>Chat Header</div>,
  },
  messageParser: MessageParser,
  actionProvider: ActionProvider,
};

export default config;
