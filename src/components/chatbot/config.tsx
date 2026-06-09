// src/components/chatbot/config.tsx

/**
 * Configuración del chatbot municipal "Beni"
 * v2.0: Widget de feedback agregado
 */

import { createChatBotMessage } from 'react-chatbot-kit'
import ActionProvider from './ActionProvider'
import MessageParser from './MessageParser'
import CustomBotMessage from './widgets/CustomBotMessage'
import FeedbackWidget from './widgets/FeedbackWidget'
import GeneralOptions from './widgets/GeneralOptions'
import LinkButton from './widgets/LinkButton'
import SmartSuggestions from './widgets/SmartSuggestions'
import TramiteOptions from './widgets/TramiteOptions'
import TypingIndicator from './widgets/TypingIndicator'
// Definimos la interfaz Config localmente para evitar problemas de importación
interface Config {
  botName: string
  initialMessages: any[]
  customStyles?: any
  state?: any
  widgets?: any[]
  customComponents?: any
  placeholderText?: string
  messageHistory?: boolean
  actionProvider: any
  messageParser: any
}

const botName = 'Beni'

const config: Config = {
  botName: botName,
  initialMessages: [
    createChatBotMessage(
      '¡Hola! Soy Beni, el asistente virtual de la Municipalidad de San Benito 🤖\n\n¿En qué puedo ayudarte hoy?',
      {
        widget: 'smartSuggestions',
        delay: 300,
      },
    ),
  ],
  placeholderText: 'Escribí tu consulta aquí...',
  messageHistory: true,
  customComponents: {
    // Custom bot message component to render links
    botChatMessage: (props: any) => <CustomBotMessage message={props.message} />,
    // Custom bot avatar with Beni image
    botAvatar: () => (
      <div
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          overflow: 'hidden',
          marginRight: '10px',
          flexShrink: 0,
          border: '2px solid #b6c544',
        }}
      >
        <img
          src="/beni-gaucho.png"
          alt="Beni"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>
    ),
    // Personalizar el header del chatbot - Simplificado
    header: () => (
      <div
        style={{
          background: 'linear-gradient(135deg, #076633 0%, #054d26 100%)',
          padding: '16px 20px',
          borderRadius: '16px 16px 0 0',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          flexShrink: 0,
        }}
      >
        {/* Avatar de Beni */}
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            overflow: 'hidden',
            flexShrink: 0,
            border: '2px solid #b6c544',
          }}
        >
          <img
            src="/beni-gaucho.png"
            alt="Beni"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
        <div>
          <div
            style={{
              fontWeight: '700',
              fontSize: '1.1rem',
            }}
          >
            Beni
          </div>
          <div
            style={{
              fontSize: '0.8rem',
              opacity: 0.85,
            }}
          >
            Asistente Virtual
          </div>
        </div>
      </div>
    ),
  },
  customStyles: {
    // Estilos generales del chatbot - Premium Design
    botMessageBox: {
      background: 'linear-gradient(135deg, #076633 0%, #054d26 100%)',
      color: '#ffffff',
      borderRadius: '20px 20px 20px 4px',
      padding: '16px 20px',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      boxShadow: '0 4px 15px rgba(7, 102, 51, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
      margin: '8px 0',
      maxWidth: '85%',
      lineHeight: '1.6',
      fontSize: '0.95rem',
      animation: 'slideInLeft 0.4s ease-out',
      border: 'none',
      position: 'relative',
    },
    userMessageBox: {
      background: 'linear-gradient(135deg, #7bcbe2 0%, #5bb8d3 100%)',
      color: '#1e3a5f',
      borderRadius: '20px 20px 4px 20px',
      padding: '16px 20px',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      boxShadow: '0 4px 15px rgba(123, 203, 226, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
      margin: '8px 0',
      maxWidth: '85%',
      lineHeight: '1.6',
      fontSize: '0.95rem',
      border: 'none',
      animation: 'slideInRight 0.4s ease-out',
      fontWeight: '500',
    },
    chatButton: {
      background: 'linear-gradient(135deg, #b6c544 0%, #9ab038 100%)',
      borderRadius: '50%',
      width: '64px',
      height: '64px',
      padding: '0',
      minWidth: 'unset',
      border: '3px solid #076633',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: '0 8px 30px rgba(182, 197, 68, 0.4), 0 0 0 0 rgba(182, 197, 68, 0.4)',
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
        text: 'Trámites',
        handler: (props: any) => props.actionProvider.handleTramiteIntro(),
        id: 1,
      },
      {
        text: 'Horarios',
        handler: (props: any) => props.actionProvider.handleHorarios(),
        id: 2,
      },
      {
        text: 'Contacto',
        handler: (props: any) => props.actionProvider.handleContactoInfo(),
        id: 3,
      },
      {
        text: 'Licencias',
        handler: (props: any) => props.actionProvider.handleLicencia(),
        id: 4,
      },
      {
        text: 'Obras Privadas',
        handler: (props: any) => props.actionProvider.handleObrasPrivadas(),
        id: 5,
      },
      {
        text: 'Servicios',
        handler: (props: any) => props.actionProvider.handleGeneralInquiry(),
        id: 6,
      },
    ],
    smartSuggestions: [
      {
        text: 'Pagar tasas e impuestos',
        handler: (props: any) => props.actionProvider.handleRentas(),
        icon: '💰',
      },
      {
        text: 'Licencia de conducir',
        handler: (props: any) => props.actionProvider.handleTramite('licencia'),
        icon: '🚗',
      },
      {
        text: 'Obras privadas',
        handler: (props: any) => props.actionProvider.handleObrasPrivadas(),
        icon: '🏗️',
      },
      {
        text: 'Habilitaciones comerciales',
        handler: (props: any) => props.actionProvider.handleHabilitaciones(),
        icon: '📋',
      },
      {
        text: 'Horarios de atención',
        handler: (props: any) => props.actionProvider.handleHorarios(),
        icon: '🕐',
      },
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
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
              border: '2px solid #b6c544',
            }}
          >
            <img
              src="/beni-gaucho.png"
              alt="Beni"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>
        </div>
      ),
    },
    {
      widgetName: 'feedback',
      widgetFunc: (props: any) => <FeedbackWidget {...props} />,
    },
    {
      widgetName: 'typingIndicator',
      widgetFunc: () => <TypingIndicator />,
    },
  ],
  messageParser: MessageParser,
  actionProvider: ActionProvider,
}

export default config
