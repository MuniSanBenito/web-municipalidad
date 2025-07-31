// src/components/chatbot/config.tsx
import { createChatBotMessage } from 'react-chatbot-kit';
// Definimos la interfaz Config localmente para evitar problemas de importación
interface Config {
  botName: string;
  initialMessages: any[];
  customStyles?: any;
  state?: any;
  widgets?: any[];
  customComponents?: any;
  placeholderText?: string;
  messageHistory?: boolean;
  actionProvider: any;
  messageParser: any;
}
import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';
import GeneralOptions from './widgets/GeneralOptions';
import LinkButton from './widgets/LinkButton';
import SmartSuggestions from './widgets/SmartSuggestions';
import TramiteOptions from './widgets/TramiteOptions';
import OllamaStatus from './OllamaStatus';

const botName = 'Beni';

const config: Config = {
  botName: botName,
  initialMessages: [
    createChatBotMessage("¡Hola! Soy Beni, tu asistente virtual de la Municipalidad de San Benito 😊", {
      delay: 200,
    }),
    createChatBotMessage("Estoy aquí para ayudarte con información precisa sobre trámites, horarios, contactos y servicios municipales.", {
      delay: 800,
    }),
    createChatBotMessage("¿En qué puedo ayudarte hoy?", {
      widget: "smartSuggestions",
      delay: 1200,
    })
  ],
  placeholderText: "Pregúntame lo que necesites...",
  messageHistory: true,
  customComponents: {
    // Personalizar el header del chatbot
    header: () => (
      <div style={{
        backgroundColor: '#b6c544', // primary
        padding: '12px',
        borderRadius: '8px 8px 0 0',
        fontWeight: 'bold',
        fontSize: '1.2rem',
        color: 'oklch(37% 0 0)', // primary-content
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        borderBottom: '2px solid #9fb03a' // primary darker
      }}>
        <span style={{ marginRight: '8px' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
          </svg>
        </span>
        Beni - Asistente Municipal
      </div>
    ),
  },
  customStyles: {
    // Estilos generales del chatbot
    botMessageBox: {
      backgroundColor: '#b6c544', // primary
      color: 'oklch(37% 0 0)', // primary-content
      borderRadius: '12px 12px 12px 0',
      padding: '12px',
      fontFamily: 'Arial, sans-serif',
      boxShadow: '0 2px 8px rgba(182, 197, 68, 0.15)',
      margin: '8px 0',
      maxWidth: '85%',
      lineHeight: '1.4',
    },
    userMessageBox: {
      backgroundColor: '#f1f1f1',
      color: '#333',
      borderRadius: '12px 12px 0 12px',
      padding: '12px',
      fontFamily: 'Arial, sans-serif',
      boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
      margin: '8px 0',
      maxWidth: '85%',
      lineHeight: '1.4',
      border: '1px solid #e0e0e0',
    },
    chatButton: {
      backgroundColor: '#b6c544', // primary
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      padding: '0',
      minWidth: 'unset',
      borderWidth: '0',
      transition: 'all 0.3s ease',
      boxShadow: '0 2px 5px rgba(182, 197, 68, 0.2)',
      cursor: 'pointer',
    },
  },
  state: {
    tramiteOptions: [
      {
        text: "Trámites",
        handler: (props: any) => props.actionProvider.handleTramiteIntro(),
        id: 1
      },
      {
        text: "Horarios",
        handler: (props: any) => props.actionProvider.handleHorarios(),
        id: 2
      },
      {
        text: "Contacto",
        handler: (props: any) => props.actionProvider.handleContactoInfo(),
        id: 3
      },
      {
        text: "Licencias",
        handler: (props: any) => props.actionProvider.handleLicencia(),
        id: 4
      },
      {
        text: "Obras Privadas",
        handler: (props: any) => props.actionProvider.handleObrasPrivadas(),
        id: 5
      },
      {
        text: "Servicios",
        handler: (props: any) => props.actionProvider.handleGeneralInquiry(),
        id: 6
      }
    ],
    smartSuggestions: [
      {
        text: "¿Qué trámites puedo hacer?",
        handler: (props: any) => props.actionProvider.handleTramiteIntro(),
        category: "tramites",
        icon: "📋"
      },
      {
        text: "Horarios de atención",
        handler: (props: any) => props.actionProvider.handleHorarios(),
        category: "horarios",
        icon: "🕒"
      },
      {
        text: "Teléfonos y contacto",
        handler: (props: any) => props.actionProvider.handleContactoInfo(),
        category: "contacto",
        icon: "📞"
      },
      {
        text: "Licencia de conducir",
        handler: (props: any) => props.actionProvider.handleLicencia(),
        category: "tramites",
        icon: "🚗"
      },
      {
        text: "Obras privadas",
        handler: (props: any) => props.actionProvider.handleObrasPrivadas(),
        category: "tramites",
        icon: "🏠"
      },
      {
        text: "Servicios municipales",
        handler: (props: any) => props.actionProvider.handleGeneralInquiry(),
        category: "servicios",
        icon: "🏢"
      }
    ],
  },
  widgets: [
    {
      widgetName: 'generalOptions',
      widgetFunc: (props: any) => <GeneralOptions {...props} />,
      mapStateToProps: ['tramiteOptions'],
    },
    {
      widgetName: 'linkButton',
      widgetFunc: (props: any) => <LinkButton {...props} />,
    },
    {
      widgetName: 'smartSuggestions',
      widgetFunc: (props: any) => <SmartSuggestions {...props} />,
      mapStateToProps: ['smartSuggestions'],
    },
    {
      widgetName: 'tramiteOptions',
      widgetFunc: (props: any) => <TramiteOptions {...props} />,
      mapStateToProps: ['tramiteOptions'],
    },
    {
      widgetName: 'botAvatar',
      widgetFunc: () => (
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
          <div style={{
            width: '45px',
            height: '45px',
            borderRadius: '50%',
            backgroundColor: '#2d6a84',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            fontSize: '22px',
            fontWeight: 'bold',
            boxShadow: '0 3px 8px rgba(0,0,0,0.2)',
            border: '2px solid #ffffff'
          }}>
            B
          </div>
        </div>
      ),
    },
    {
      widgetName: 'ollamaStatus',
      widgetFunc: (props: any) => <OllamaStatus {...props} />,
    },
  ],
  messageParser: MessageParser,
  actionProvider: ActionProvider,
};

export default config;
