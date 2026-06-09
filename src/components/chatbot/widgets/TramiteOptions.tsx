// src/components/chatbot/widgets/TramiteOptions.tsx
import React, { useCallback, useState } from 'react'

interface TramiteOption {
  text: string
  icon: string
  action: () => void
}

interface TramiteOptionsProps {
  actionProvider: any
  setState: any
}

const TramiteOptions: React.FC<TramiteOptionsProps> = ({ actionProvider }) => {
  const [showAll, setShowAll] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  // Opciones principales (siempre visibles)
  const mainOptions: TramiteOption[] = [
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
  const additionalOptions: TramiteOption[] = [
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

  const handleOptionClick = useCallback((index: number, action: () => void) => {
    setSelectedIndex(index)
    action()
  }, [])

  const handleToggleExpand = useCallback(() => {
    setShowAll((prev) => !prev)
  }, [])

  const allOptions = [...mainOptions, ...additionalOptions]
  const isAnySelected = selectedIndex !== null

  return (
    <div className="chatbot-widget-card">
      <div className="chatbot-widget-title">
        <span>📋</span>
        <span>Seleccioná un trámite:</span>
      </div>

      {/* Opciones principales - siempre visibles en grid 2 cols */}
      <div className="chatbot-chip-grid">
        {mainOptions.map((option, index) => {
          const isSelected = selectedIndex === index
          const isDisabled = isAnySelected

          return (
            <button
              key={index}
              onClick={() => handleOptionClick(index, option.action)}
              disabled={isDisabled}
              aria-label={option.text}
              className={`chatbot-chip ${isSelected ? 'chatbot-chip--selected' : ''} ${isDisabled && !isSelected ? 'chatbot-chip--disabled' : ''}`}
            >
              <span className="chip-icon" aria-hidden="true">
                {option.icon}
              </span>
              <span className="chip-label">{option.text}</span>
            </button>
          )
        })}
      </div>

      {/* Opciones adicionales - colapsables con animación */}
      <div className={`chatbot-expand-section ${showAll ? 'chatbot-expand-section--open' : ''}`}>
        <div className="chatbot-chip-grid">
          {additionalOptions.map((option, index) => {
            const actualIndex = mainOptions.length + index
            const isSelected = selectedIndex === actualIndex
            const isDisabled = isAnySelected

            return (
              <button
                key={actualIndex}
                onClick={() => handleOptionClick(actualIndex, option.action)}
                disabled={isDisabled}
                aria-label={option.text}
                className={`chatbot-chip ${isSelected ? 'chatbot-chip--selected' : ''} ${isDisabled && !isSelected ? 'chatbot-chip--disabled' : ''}`}
              >
                <span className="chip-icon" aria-hidden="true">
                  {option.icon}
                </span>
                <span className="chip-label">{option.text}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Botón para ver más / menos */}
      <button
        onClick={handleToggleExpand}
        className={`chatbot-expand-btn ${showAll ? 'chatbot-expand-btn--open' : ''}`}
        aria-expanded={showAll}
        aria-label={showAll ? 'Ver menos trámites' : 'Ver más trámites'}
      >
        <span className="chatbot-expand-btn--icon">▼</span>
        <span>{showAll ? 'Ver menos' : 'Ver más trámites'}</span>
      </button>

      <div className="chatbot-hint">💬 O escribí tu consulta directamente</div>
    </div>
  )
}

export default TramiteOptions
