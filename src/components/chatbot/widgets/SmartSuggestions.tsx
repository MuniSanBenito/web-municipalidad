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
      padding: '16px',
      backgroundColor: 'oklch(96% 0.003 264.542)', // base-200
      borderRadius: '12px',
      margin: '8px 0',
      border: '1px solid oklch(92% 0.004 286.32)', // base-300
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
    }}>
      <div style={{
        fontSize: '14px',
        fontWeight: '600',
        color: '#4d4d4d', // base-content
        marginBottom: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
      }}>
        <span>💡</span>
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
                  border: '1px solid #b6c544', // primary
                  borderRadius: '20px',
                  padding: '8px 16px',
                  fontSize: '13px',
                  color: '#b6c544', // primary
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  minHeight: '36px',
                  fontWeight: '500'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#b6c544'; // primary
                  e.currentTarget.style.color = 'oklch(37% 0 0)'; // primary-content
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(182, 197, 68, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.color = '#b6c544'; // primary
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {suggestion.icon && <span>{suggestion.icon}</span>}
                {suggestion.text}
              </button>
            ))}
          </div>
        </div>
      ))}

      <div style={{
        marginTop: '12px',
        padding: '8px',
        backgroundColor: '#7bcbe2', // accent
        borderRadius: '6px',
        fontSize: '12px',
        color: '#4d4d4d', // accent-content
        textAlign: 'center'
      }}>
        💬 También puedes escribir tu consulta directamente
      </div>
    </div>
  );
};

export default SmartSuggestions;
