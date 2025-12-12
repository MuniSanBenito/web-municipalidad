// src/components/chatbot/widgets/FeedbackWidget.tsx

'use client'

import React, { useState } from 'react'
import { getFeedbackForMessage, submitFeedback } from '../feedbackService'

interface FeedbackWidgetProps {
  payload?: {
    messageId: string
  }
}

/**
 * Widget de feedback para calificar respuestas del chatbot
 * Muestra botones 👍/👎 y opcionalmente un campo de comentario
 */
const FeedbackWidget: React.FC<FeedbackWidgetProps> = ({ payload }) => {
  const [currentRating, setCurrentRating] = useState<'positive' | 'negative' | null>(null)
  const [showComment, setShowComment] = useState(false)
  const [comment, setComment] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const messageId = payload?.messageId || ''

  // Verificar si ya hay feedback para este mensaje
  React.useEffect(() => {
    if (messageId) {
      const existing = getFeedbackForMessage(messageId)
      if (existing?.rating) {
        setCurrentRating(existing.rating)
        setSubmitted(true)
      }
    }
  }, [messageId])

  const handleRating = (rating: 'positive' | 'negative') => {
    if (submitted) return

    setCurrentRating(rating)

    if (rating === 'negative') {
      setShowComment(true)
    } else {
      // Feedback positivo se envía directamente
      submitFeedback(messageId, rating)
      setSubmitted(true)
    }
  }

  const handleSubmitComment = () => {
    if (currentRating) {
      submitFeedback(messageId, currentRating, comment || undefined)
      setSubmitted(true)
      setShowComment(false)
    }
  }

  const handleSkipComment = () => {
    if (currentRating) {
      submitFeedback(messageId, currentRating)
      setSubmitted(true)
      setShowComment(false)
    }
  }

  if (!messageId) return null

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        padding: '12px 0',
        marginTop: '8px',
        borderTop: '1px solid rgba(123, 203, 226, 0.3)',
      }}
    >
      {!submitted ? (
        <>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: '0.85rem',
              color: '#6b7280',
            }}
          >
            <span>¿Te resultó útil esta respuesta?</span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => handleRating('positive')}
                disabled={submitted}
                style={{
                  background:
                    currentRating === 'positive'
                      ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
                      : '#f3f4f6',
                  border: 'none',
                  borderRadius: '20px',
                  padding: '8px 16px',
                  cursor: submitted ? 'default' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.9rem',
                  color: currentRating === 'positive' ? '#fff' : '#374151',
                  transition: 'all 0.2s ease',
                  boxShadow:
                    currentRating === 'positive' ? '0 4px 12px rgba(34, 197, 94, 0.3)' : 'none',
                }}
                onMouseEnter={(e) => {
                  if (!submitted && currentRating !== 'positive') {
                    e.currentTarget.style.background = '#dcfce7'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!submitted && currentRating !== 'positive') {
                    e.currentTarget.style.background = '#f3f4f6'
                  }
                }}
                aria-label="Respuesta útil"
              >
                <span style={{ fontSize: '1.1rem' }}>👍</span>
                <span>Sí</span>
              </button>

              <button
                onClick={() => handleRating('negative')}
                disabled={submitted}
                style={{
                  background:
                    currentRating === 'negative'
                      ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
                      : '#f3f4f6',
                  border: 'none',
                  borderRadius: '20px',
                  padding: '8px 16px',
                  cursor: submitted ? 'default' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.9rem',
                  color: currentRating === 'negative' ? '#fff' : '#374151',
                  transition: 'all 0.2s ease',
                  boxShadow:
                    currentRating === 'negative' ? '0 4px 12px rgba(239, 68, 68, 0.3)' : 'none',
                }}
                onMouseEnter={(e) => {
                  if (!submitted && currentRating !== 'negative') {
                    e.currentTarget.style.background = '#fee2e2'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!submitted && currentRating !== 'negative') {
                    e.currentTarget.style.background = '#f3f4f6'
                  }
                }}
                aria-label="Respuesta no útil"
              >
                <span style={{ fontSize: '1.1rem' }}>👎</span>
                <span>No</span>
              </button>
            </div>
          </div>

          {/* Campo de comentario para feedback negativo */}
          {showComment && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                marginTop: '8px',
                padding: '12px',
                background: '#fef2f2',
                borderRadius: '12px',
                border: '1px solid #fecaca',
              }}
            >
              <label
                style={{
                  fontSize: '0.85rem',
                  color: '#991b1b',
                  fontWeight: '500',
                }}
              >
                ¿Qué podríamos mejorar? (opcional)
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Contanos qué información faltó o qué estuvo incorrecto..."
                style={{
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid #fecaca',
                  fontSize: '0.9rem',
                  minHeight: '60px',
                  resize: 'vertical',
                  fontFamily: 'inherit',
                }}
              />
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                <button
                  onClick={handleSkipComment}
                  style={{
                    background: 'transparent',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    padding: '8px 16px',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    color: '#6b7280',
                  }}
                >
                  Omitir
                </button>
                <button
                  onClick={handleSubmitComment}
                  style={{
                    background: 'linear-gradient(135deg, #076633 0%, #054d26 100%)',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '8px 16px',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    color: '#fff',
                    fontWeight: '500',
                  }}
                >
                  Enviar
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.85rem',
            color: currentRating === 'positive' ? '#16a34a' : '#dc2626',
            padding: '8px 12px',
            background: currentRating === 'positive' ? '#f0fdf4' : '#fef2f2',
            borderRadius: '8px',
          }}
        >
          <span>{currentRating === 'positive' ? '✓' : '✗'}</span>
          <span>
            {currentRating === 'positive'
              ? '¡Gracias por tu feedback!'
              : 'Gracias, trabajaremos para mejorar.'}
          </span>
        </div>
      )}
    </div>
  )
}

export default FeedbackWidget
