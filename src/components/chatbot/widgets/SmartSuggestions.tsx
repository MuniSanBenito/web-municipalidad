// src/components/chatbot/widgets/SmartSuggestions.tsx
import React from 'react'

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

  const handleSuggestionClick = (handler: () => void) => {
    handler()
  }

  if (!suggestions || !Array.isArray(suggestions) || suggestions.length === 0) {
    return null
  }

  return (
    <div
      className="smart-suggestions-container"
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
        <span>⭐</span>
        <span>Consultas frecuentes:</span>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => handleSuggestionClick(suggestion.handler)}
            style={{
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
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#054d26'
              e.currentTarget.style.transform = 'translateX(4px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#076633'
              e.currentTarget.style.transform = 'translateX(0)'
            }}
          >
            {suggestion.icon && (
              <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>{suggestion.icon}</span>
            )}
            <span style={{ flex: 1 }}>{suggestion.text}</span>
            <span style={{ opacity: 0.7, fontSize: '1rem' }}>→</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default SmartSuggestions
