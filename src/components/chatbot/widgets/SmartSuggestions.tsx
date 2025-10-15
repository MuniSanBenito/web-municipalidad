// src/components/chatbot/widgets/SmartSuggestions.tsx
import React from 'react';

interface SmartSuggestionsProps {
  suggestions: Array<{
    text: string;
    handler: () => void;
    category?: string;
    icon?: string;
  }>;
  actionProvider: any;
  setState: any;
}

const SmartSuggestions: React.FC<SmartSuggestionsProps> = ({ 
  suggestions, 
  actionProvider, 
  setState 
}) => {
  const handleSuggestionClick = (handler: () => void) => {
    handler();
  };

  // Validar que suggestions existe y es un array
  if (!suggestions || !Array.isArray(suggestions)) {
    return (
      <div style={{ padding: '12px', textAlign: 'center', color: '#6c757d' }}>
        No hay sugerencias disponibles
      </div>
    );
  }

  // Agrupar sugerencias por categoría
  const groupedSuggestions = suggestions.reduce((groups, suggestion) => {
    const category = suggestion.category || 'general';
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(suggestion);
    return groups;
  }, {} as Record<string, typeof suggestions>);

  const categoryIcons: Record<string, string> = {
    tramites: '📋',
    contacto: '📞',
    horarios: '🕒',
    servicios: '🏛️',
    general: '💡'
  };

  const categoryNames: Record<string, string> = {
    tramites: 'Trámites',
    contacto: 'Contacto',
    horarios: 'Horarios',
    servicios: 'Servicios',
    general: 'Sugerencias'
  };

  return (
    <div className="smart-suggestions-container" style={{
      padding: '18px',
      background: '#f0f9ff',
      borderRadius: '16px',
      margin: '10px 0',
      border: '2px solid #7bcbe2',
      boxShadow: '0 3px 10px rgba(123, 203, 226, 0.2)',
    }}>
      <div style={{
        fontSize: '15px',
        fontWeight: '700',
        color: '#076633',
        marginBottom: '14px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <span style={{ fontSize: '20px' }}>🤖</span>
        ¿Te puedo ayudar con alguno de estos temas?
      </div>

      {Object.entries(groupedSuggestions).map(([category, categorySuggestions]) => (
        <div key={category} style={{ marginBottom: '16px' }}>
          {Object.keys(groupedSuggestions).length > 1 && (
            <div style={{
              fontSize: '12px',
              fontWeight: '500',
              color: '#6c757d',
              marginBottom: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <span>{categoryIcons[category] || '📌'}</span>
              {categoryNames[category] || category}
            </div>
          )}
          
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px'
          }}>
            {categorySuggestions.map((suggestion, index) => (
              <button
                key={`${category}-${index}`}
                onClick={() => handleSuggestionClick(suggestion.handler)}
                style={{
                  backgroundColor: '#ffffff',
                  border: '2px solid #b6c544',
                  borderRadius: '20px',
                  padding: '10px 18px',
                  fontSize: '13.5px',
                  color: '#076633',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  minHeight: '40px',
                  fontWeight: '600',
                  boxShadow: '0 2px 8px rgba(182, 197, 68, 0.2)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#b6c544';
                  e.currentTarget.style.color = '#076633';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(182, 197, 68, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.color = '#076633';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(182, 197, 68, 0.2)';
                }}
              >
                {suggestion.icon && <span style={{ fontSize: '16px' }}>{suggestion.icon}</span>}
                {suggestion.text}
              </button>
            ))}
          </div>
        </div>
      ))}

      <div style={{
        marginTop: '16px',
        padding: '12px 16px',
        background: '#7bcbe2',
        borderRadius: '12px',
        fontSize: '13px',
        color: '#4d4d4d',
        textAlign: 'center',
        fontWeight: '600',
        border: '2px solid #076633',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        boxShadow: '0 2px 6px rgba(123, 203, 226, 0.3)'
      }}>
        <span style={{ fontSize: '16px' }}>💬</span>
        También puedes escribir tu consulta directamente
      </div>
    </div>
  );
};

export default SmartSuggestions;
