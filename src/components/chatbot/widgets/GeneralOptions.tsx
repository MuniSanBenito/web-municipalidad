// src/components/chatbot/widgets/GeneralOptions.tsx
import React, { useCallback, useState } from 'react'

interface Option {
  text: string
  handler: () => void
  id: number
}

interface GeneralOptionsProps {
  options: Option[]
}

const GeneralOptions: React.FC<GeneralOptionsProps> = (props) => {
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const options = props.options || []

  const handleClick = useCallback((id: number, handler: () => void) => {
    setSelectedId(id)
    handler()
  }, [])

  if (options.length === 0) {
    return (
      <div className="chatbot-widget-card">
        <div className="chatbot-hint">No hay opciones disponibles</div>
      </div>
    )
  }

  const isAnySelected = selectedId !== null

  return (
    <div className="chatbot-widget-card">
      <div className="chatbot-chip-grid">
        {options.map((option) => {
          const isSelected = selectedId === option.id
          const isDisabled = isAnySelected

          return (
            <button
              key={option.id}
              onClick={() => handleClick(option.id, option.handler)}
              disabled={isDisabled}
              aria-label={option.text}
              className={`chatbot-chip ${isSelected ? 'chatbot-chip--selected' : ''} ${isDisabled && !isSelected ? 'chatbot-chip--disabled' : ''}`}
            >
              <span className="chip-label">{option.text}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default GeneralOptions
