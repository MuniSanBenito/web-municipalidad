// src/components/chatbot/widgets/TypingIndicator.tsx
import React from 'react'

/**
 * Indicador de "Beni está escribiendo..." con 3 puntitos animados.
 * Usa la clase `.typing-indicator` ya definida en chatbot-styles.css.
 */
const TypingIndicator: React.FC = () => {
  return (
    <div
      className="typing-indicator"
      role="status"
      aria-live="polite"
      aria-label="Beni está escribiendo"
    >
      <span />
      <span />
      <span />
    </div>
  )
}

export default TypingIndicator
