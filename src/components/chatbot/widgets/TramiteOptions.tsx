// src/components/chatbot/widgets/TramiteOptions.tsx
import React, { useState } from 'react'

interface TramiteOptionsProps {
  actionProvider: any
  setState: any
}

const TramiteOptions: React.FC<TramiteOptionsProps> = ({ actionProvider }) => {
  const [showAll, setShowAll] = useState(false)

  // Opciones principales (siempre visibles)
  const mainOptions = [
    {
      text: 'Licencia de Conducir',
      icon: '🚗',
      action: () => actionProvider.handleTramite('licencia'),
    },
    {
      text: 'Rentas e Impuestos',
      icon: '💰',
      action: () => actionProvider.handleRentas(),
    },
    {
      text: 'Obras Privadas',
      icon: '🏗️',
      action: () => actionProvider.handleObrasPrivadas(),
    },
    {
      text: 'Habilitaciones Comerciales',
      icon: '📋',
      action: () => actionProvider.handleHabilitaciones(),
    },
  ]

  // Opciones adicionales (colapsables)
  const additionalOptions = [
    {
      text: 'Catastro',
      icon: '📍',
      action: () => actionProvider.handleCatastro(),
    },
    {
      text: 'Mesa de Entrada',
      icon: '🏛️',
      action: () => actionProvider.handleMesaDeEntrada(),
    },
    {
      text: 'Área Mujer',
      icon: '👩',
      action: () => actionProvider.handleAreaMujer(),
    },
    {
      text: 'Tercera Edad',
      icon: '👴',
      action: () => actionProvider.handleTerceraEdadDiscapacidad(),
    },
    {
      text: 'Talleres Culturales',
      icon: '🎨',
      action: () => actionProvider.handleTalleresCulturales(),
    },
    {
      text: 'Actividades Deportivas',
      icon: '⚽',
      action: () => actionProvider.handleActividadesDeportivas(),
    },
  ]

  const displayOptions = showAll ? [...mainOptions, ...additionalOptions] : mainOptions

  const buttonStyle: React.CSSProperties = {
    backgroundColor: '#076633',
    border: 'none',
    borderRadius: '12px',
    padding: '14px 18px',
    fontSize: '0.9rem',
    color: '#ffffff',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontWeight: '500',
    textAlign: 'left',
    width: '100%',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  }

  return (
    <div
      className="tramite-options-container"
      style={{
        padding: '16px',
        background: '#ffffff',
        borderRadius: '16px',
        margin: '12px 0',
        border: '1px solid #e5e7eb',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
      }}
    >
      <div
        style={{
          fontSize: '0.85rem',
          fontWeight: '600',
          color: '#6b7280',
          marginBottom: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        <span>📋</span>
        <span>Seleccioná un trámite:</span>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        {displayOptions.map((option, index) => (
          <button
            key={index}
            onClick={option.action}
            style={buttonStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#054d26'
              e.currentTarget.style.transform = 'translateX(4px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#076633'
              e.currentTarget.style.transform = 'translateX(0)'
            }}
          >
            <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>{option.icon}</span>
            <span style={{ flex: 1 }}>{option.text}</span>
            <span style={{ opacity: 0.7, fontSize: '1rem' }}>→</span>
          </button>
        ))}

        {/* Botón para ver más / menos */}
        <button
          onClick={() => setShowAll(!showAll)}
          style={{
            backgroundColor: 'transparent',
            border: '2px solid #076633',
            borderRadius: '12px',
            padding: '12px 18px',
            fontSize: '0.85rem',
            color: '#076633',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            fontWeight: '600',
            width: '100%',
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
            marginTop: '4px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f0fdf4'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent'
          }}
        >
          <span>{showAll ? '▲ Ver menos' : '▼ Ver más trámites'}</span>
        </button>
      </div>

      <div
        style={{
          marginTop: '12px',
          padding: '10px',
          background: '#f8fafc',
          borderRadius: '10px',
          fontSize: '0.8rem',
          color: '#6b7280',
          textAlign: 'center',
        }}
      >
        💬 O escribí tu consulta directamente
      </div>
    </div>
  )
}

export default TramiteOptions
