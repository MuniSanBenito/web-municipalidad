// src/components/chatbot/config.tsx

/**
 * Configuración del chatbot municipal "Beni"
 * v2.0: Widget de feedback agregado
 */

import { createChatBotMessage } from 'react-chatbot-kit'
import ActionProvider from './ActionProvider'
import MessageParser from './MessageParser'
import FeedbackWidget from './widgets/FeedbackWidget'
import GeneralOptions from './widgets/GeneralOptions'
import LinkButton from './widgets/LinkButton'
import SmartSuggestions from './widgets/SmartSuggestions'
import TramiteOptions from './widgets/TramiteOptions'
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
    // Personalizar el header del chatbot - Premium Design
    header: () => (
      <div
        style={{
          background: 'linear-gradient(135deg, #076633 0%, #054d26 100%)',
          padding: '20px 24px',
          borderRadius: '20px 20px 0 0',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 4px 20px rgba(7, 102, 51, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          borderBottom: '3px solid #b6c544',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background Pattern */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.05,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Robot Beni - Modernizado */}
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #b6c544 0%, #9ab038 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              boxShadow:
                '0 6px 20px rgba(182, 197, 68, 0.4), inset 0 2px 0 rgba(255, 255, 255, 0.3)',
              border: '2px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            {/* Cara del robot mejorada */}
            <svg
              width="36"
              height="36"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Antena */}
              <circle cx="16" cy="3" r="2.5" fill="#076633" />
              <rect x="14.5" y="3" width="3" height="5" rx="1" fill="#076633" />
              {/* Cabeza */}
              <rect x="6" y="8" width="20" height="18" rx="4" fill="#076633" />
              {/* Pantalla facial */}
              <rect x="8" y="10" width="16" height="12" rx="2" fill="#054d26" />
              {/* Ojos LED */}
              <circle cx="12" cy="15" r="2.5" fill="#b6c544">
                <animate
                  attributeName="opacity"
                  values="1;0.5;1"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="20" cy="15" r="2.5" fill="#b6c544">
                <animate
                  attributeName="opacity"
                  values="1;0.5;1"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>
              {/* Pupilas */}
              <circle cx="12" cy="15" r="1" fill="#076633" />
              <circle cx="20" cy="15" r="1" fill="#076633" />
              {/* Sonrisa digital */}
              <path
                d="M 10 19 Q 16 23 22 19"
                stroke="#7bcbe2"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
              {/* Detalles LED */}
              <circle cx="8" cy="11" r="1.5" fill="#7bcbe2" />
              <circle cx="24" cy="11" r="1.5" fill="#7bcbe2" />
            </svg>
            {/* Indicador online pulsante */}
            <div
              style={{
                position: 'absolute',
                bottom: '-3px',
                right: '-3px',
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                border: '2px solid #ffffff',
                boxShadow: '0 0 12px rgba(34, 197, 94, 0.8)',
                animation: 'pulse 2s ease-in-out infinite',
              }}
            />
          </div>
          <div>
            <div
              style={{
                fontWeight: '700',
                fontSize: '1.2rem',
                letterSpacing: '0.5px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              }}
            >
              Beni
              <span style={{ fontSize: '1.3rem' }}>🤖</span>
            </div>
            <div
              style={{
                fontSize: '0.85rem',
                opacity: 0.9,
                fontWeight: '400',
                marginTop: '2px',
              }}
            >
              Asistente Virtual Municipal
            </div>
          </div>
        </div>
        <div
          style={{
            fontSize: '0.75rem',
            background: 'linear-gradient(135deg, #b6c544 0%, #9ab038 100%)',
            color: '#076633',
            padding: '6px 14px',
            borderRadius: '20px',
            fontWeight: '700',
            boxShadow: '0 4px 12px rgba(182, 197, 68, 0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <span
            style={{
              width: '8px',
              height: '8px',
              background: '#076633',
              borderRadius: '50%',
              animation: 'pulse 1.5s ease-in-out infinite',
            }}
          />
          EN LÍNEA
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
        text: 'Pagar boletas de Rentas',
        handler: (props: any) =>
          props.actionProvider.handleUnknown('como pago mis boletas de rentas municipales'),
        category: 'tramites',
        icon: '💰',
      },
      {
        text: 'Licencia de conducir',
        handler: (props: any) =>
          props.actionProvider.handleUnknown('requisitos para licencia de conducir'),
        category: 'tramites',
        icon: '🚗',
      },
      {
        text: 'Obras privadas',
        handler: (props: any) => props.actionProvider.handleUnknown('requisitos para obra privada'),
        category: 'tramites',
        icon: '🏗️',
      },
      {
        text: 'Catastro',
        handler: (props: any) =>
          props.actionProvider.handleUnknown('informacion sobre catastro municipal'),
        category: 'tramites',
        icon: '📍',
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
              width: '48px',
              height: '48px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #b6c544 0%, #9ab038 100%)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow:
                '0 4px 15px rgba(182, 197, 68, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
              border: '2px solid #076633',
              animation: 'float 3s ease-in-out infinite',
            }}
          >
            <span style={{ fontSize: '24px', fontWeight: '800', color: '#076633' }}>B</span>
          </div>
        </div>
      ),
    },
    {
      widgetName: 'feedback',
      widgetFunc: (props: any) => <FeedbackWidget {...props} />,
    },
  ],
  messageParser: MessageParser,
  actionProvider: ActionProvider,
}

export default config
