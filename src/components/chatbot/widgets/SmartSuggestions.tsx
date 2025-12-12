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
  actionProvider,
  setState,
}) => {
  // Usar sugerencias del payload si están disponibles, sino usar las del state
  const suggestions = payload?.suggestions || propSuggestions

  const handleSuggestionClick = (handler: () => void) => {
    handler()
  }

  // Validar que suggestions existe y es un array
  if (!suggestions || !Array.isArray(suggestions) || suggestions.length === 0) {
    return (
      <div style={{ padding: '12px', textAlign: 'center', color: '#6c757d' }}>
        No hay sugerencias disponibles
      </div>
    )
  }

  // Agrupar sugerencias por categoría
  const groupedSuggestions = suggestions.reduce(
    (groups, suggestion) => {
      const category = suggestion.category || 'general'
      if (!groups[category]) {
        groups[category] = []
      }
      groups[category].push(suggestion)
      return groups
    },
    {} as Record<string, typeof suggestions>,
  )

  const categoryIcons: Record<string, string> = {
    tramites: '📋',
    contacto: '📞',
    horarios: '🕒',
    servicios: '🏛️',
    general: '💡',
  }

  const categoryNames: Record<string, string> = {
    tramites: 'Trámites',
    contacto: 'Contacto',
    horarios: 'Horarios',
    servicios: 'Servicios',
    general: 'Sugerencias',
  }

  return (
    <div
      className="smart-suggestions-container"
      style={{
        padding: '20px',
        background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
        borderRadius: '20px',
        margin: '12px 0',
        border: '2px solid #7bcbe2',
        boxShadow: '0 4px 20px rgba(123, 203, 226, 0.15)',
      }}
    >
      <div
        style={{
          fontSize: '0.95rem',
          fontWeight: '600',
          color: '#076633',
          marginBottom: '14px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span style={{ fontSize: '18px' }}>⭐</span>
        <span>Trámites más consultados:</span>
      </div>

      {Object.entries(groupedSuggestions).map(([category, categorySuggestions]) => (
        <div key={category} style={{ marginBottom: '12px' }}>
          {Object.keys(groupedSuggestions).length > 1 && (
            <div
              style={{
                fontSize: '12px',
                fontWeight: '500',
                color: '#6c757d',
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <span>{categoryIcons[category] || '📌'}</span>
              {categoryNames[category] || category}
            </div>
          )}

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
            }}
          >
            {categorySuggestions.map((suggestion, index) => (
              <button
                key={`${category}-${index}`}
                onClick={() => handleSuggestionClick(suggestion.handler)}
                style={{
                  backgroundColor: '#ffffff',
                  border: '2px solid #b6c544',
                  borderRadius: '25px',
                  padding: '12px 20px',
                  fontSize: '0.9rem',
                  color: '#076633',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  minHeight: '44px',
                  fontWeight: '600',
                  boxShadow: '0 2px 10px rgba(182, 197, 68, 0.15)',
                  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background =
                    'linear-gradient(135deg, #b6c544 0%, #9ab038 100%)'
                  e.currentTarget.style.color = '#076633'
                  e.currentTarget.style.transform = 'translateY(-3px)'
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(182, 197, 68, 0.35)'
                  e.currentTarget.style.borderColor = '#076633'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#ffffff'
                  e.currentTarget.style.color = '#076633'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 2px 10px rgba(182, 197, 68, 0.15)'
                  e.currentTarget.style.borderColor = '#b6c544'
                }}
              >
                {suggestion.icon && <span style={{ fontSize: '18px' }}>{suggestion.icon}</span>}
                {suggestion.text}
              </button>
            ))}
          </div>
        </div>
      ))}

      <div
        style={{
          marginTop: '14px',
          padding: '10px 14px',
          background: 'rgba(123, 203, 226, 0.2)',
          borderRadius: '12px',
          fontSize: '0.8rem',
          color: '#4b5563',
          textAlign: 'center',
          fontWeight: '500',
        }}
      >
        💬 O escribí tu consulta abajo
      </div>
    </div>
  )
}

export default SmartSuggestions
