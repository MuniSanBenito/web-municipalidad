// src/components/chatbot/widgets/SmartSuggestions.tsx
import React, { useCallback, useState } from 'react'

interface Suggestion {
  text: string
  handler: () => void
  category?: string
  icon?: string
}

interface SmartSuggestionsProps {
  suggestions?: Suggestion[]
  payload?: {
    suggestions?: Suggestion[]
  }
  actionProvider: any
  setState: any
}

const SmartSuggestions: React.FC<SmartSuggestionsProps> = ({
  suggestions: propSuggestions,
  payload,
}) => {
  const suggestions = payload?.suggestions || propSuggestions
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const handleSuggestionClick = useCallback((index: number, handler: () => void) => {
    // Marcar como seleccionado
    setSelectedIndex(index)
    // Ejecutar el handler
    handler()
  }, [])

  if (!suggestions || !Array.isArray(suggestions) || suggestions.length === 0) {
    return null
  }

  return (
    <div className="chatbot-widget-card">
      <div className="chatbot-widget-title">
        <span>⭐</span>
        <span>Consultas frecuentes:</span>
      </div>

      <div className="chatbot-chip-grid">
        {suggestions.map((suggestion, index) => {
          const isSelected = selectedIndex === index
          const isDisabled = selectedIndex !== null

          return (
            <button
              key={index}
              onClick={() => handleSuggestionClick(index, suggestion.handler)}
              disabled={isDisabled}
              aria-label={suggestion.text}
              className={`chatbot-chip ${isSelected ? 'chatbot-chip--selected' : ''} ${isDisabled && !isSelected ? 'chatbot-chip--disabled' : ''}`}
            >
              {suggestion.icon && (
                <span className="chip-icon" aria-hidden="true">
                  {suggestion.icon}
                </span>
              )}
              <span className="chip-label">{suggestion.text}</span>
              <span className="chip-arrow" aria-hidden="true">
                →
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default SmartSuggestions
