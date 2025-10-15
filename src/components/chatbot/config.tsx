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
        background: '#076633',
        padding: '18px 20px',
        borderRadius: '20px 20px 0 0',
        color: '#e6e6e6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 2px 8px rgba(7, 102, 51, 0.2)',
        borderBottom: '3px solid #b6c544',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Robot Beni - Amigable */}
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: '#b6c544',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            boxShadow: '0 4px 8px rgba(182, 197, 68, 0.3)',
          }}>
            {/* Cara del robot */}
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Antena */}
              <circle cx="16" cy="4" r="2" fill="#076633"/>
              <rect x="15" y="4" width="2" height="4" fill="#076633"/>
              {/* Cabeza */}
              <rect x="8" y="8" width="16" height="16" rx="3" fill="#076633"/>
              {/* Ojos amigables */}
              <circle cx="13" cy="14" r="2.5" fill="#b6c544"/>
              <circle cx="19" cy="14" r="2.5" fill="#b6c544"/>
              <circle cx="13" cy="14" r="1" fill="#076633"/>
              <circle cx="19" cy="14" r="1" fill="#076633"/>
              {/* Sonrisa */}
              <path d="M 11 19 Q 16 22 21 19" stroke="#b6c544" strokeWidth="2" strokeLinecap="round" fill="none"/>
              {/* Detalles */}
              <circle cx="10" cy="10" r="1" fill="#7bcbe2"/>
              <circle cx="22" cy="10" r="1" fill="#7bcbe2"/>
            </svg>
            {/* Indicador online */}
            <div style={{
              position: 'absolute',
              bottom: '-2px',
              right: '-2px',
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: '#b6c544',
              border: '2px solid #076633',
              boxShadow: '0 0 8px rgba(182, 197, 68, 0.8)',
              animation: 'pulse 2s ease-in-out infinite',
            }} />
          </div>
          <div>
            <div style={{ fontWeight: '700', fontSize: '1.1rem', letterSpacing: '0.5px' }}>Beni 🤖</div>
            <div style={{ fontSize: '0.8rem', opacity: 0.85, fontWeight: '400' }}>Tu asistente municipal</div>
          </div>
        </div>
        <div style={{
          fontSize: '0.75rem',
          backgroundColor: '#b6c544',
          color: '#076633',
          padding: '4px 10px',
          borderRadius: '12px',
          fontWeight: '700',
          boxShadow: '0 2px 4px rgba(182, 197, 68, 0.3)',
        }}>EN LÍNEA</div>
      </div>
    ),
  },
  customStyles: {
    // Estilos generales del chatbot
    botMessageBox: {
      background: '#076633',
      color: '#e6e6e6',
      borderRadius: '16px 16px 16px 4px',
      padding: '14px 16px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      boxShadow: '0 3px 10px rgba(7, 102, 51, 0.2)',
      margin: '10px 0',
      maxWidth: '80%',
      lineHeight: '1.5',
      fontSize: '0.95rem',
      animation: 'slideInLeft 0.3s ease-out',
      border: '2px solid #b6c544',
      position: 'relative',
    },
    userMessageBox: {
      background: '#7bcbe2',
      color: '#4d4d4d',
      borderRadius: '16px 16px 4px 16px',
      padding: '14px 16px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      boxShadow: '0 3px 10px rgba(123, 203, 226, 0.25)',
      margin: '10px 0',
      maxWidth: '80%',
      lineHeight: '1.5',
      fontSize: '0.95rem',
      border: '2px solid #076633',
      animation: 'slideInRight 0.3s ease-out',
      fontWeight: '500',
    },
    chatButton: {
      background: '#b6c544',
      borderRadius: '50%',
      width: '64px',
      height: '64px',
      padding: '0',
      minWidth: 'unset',
      border: '3px solid #076633',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: '0 6px 20px rgba(182, 197, 68, 0.4)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#076633',
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
