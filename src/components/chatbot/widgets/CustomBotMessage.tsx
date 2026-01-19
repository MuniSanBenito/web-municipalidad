// src/components/chatbot/widgets/CustomBotMessage.tsx
import React from 'react'

interface CustomBotMessageProps {
  message: string
}

/**
 * Parsea el texto y convierte links markdown y URLs en elementos clicables
 */
const parseMessage = (text: string): React.ReactNode[] => {
  if (!text) return []

  const parts: React.ReactNode[] = []
  let remaining = text

  // Regex para detectar links markdown [texto](url) y URLs solas
  const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
  const urlRegex = /(https?:\/\/[^\s<]+)/g
  const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/g
  const phoneRegex = /(\(\d{3,4}\)\s*\d{3,4}[-\s]?\d{3,4})/g

  let key = 0

  // Primero, procesar links markdown
  let match
  let lastIndex = 0

  while ((match = markdownLinkRegex.exec(text)) !== null) {
    // Agregar texto antes del link
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index))
    }

    // Agregar el link
    const [, linkText, url] = match
    parts.push(
      <a
        key={`link-${key++}`}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="chatbot-link"
        style={{
          color: 'inherit',
          textDecoration: 'underline',
          fontWeight: 600,
        }}
      >
        {linkText}
      </a>
    )

    lastIndex = match.index + match[0].length
  }

  // Si hubo links markdown, agregar el resto del texto
  if (lastIndex > 0) {
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex))
    }
    remaining = ''
  }

  // Si no hubo links markdown, procesar el texto completo
  if (remaining) {
    // Procesar línea por línea para mejor formato
    const lines = remaining.split('\n')
    
    lines.forEach((line, lineIndex) => {
      if (lineIndex > 0) {
        parts.push(<br key={`br-${key++}`} />)
      }

      // Procesar URLs en la línea
      let lineRemaining = line
      let urlMatch
      let lineLastIndex = 0
      const lineParts: React.ReactNode[] = []

      // URLs
      urlRegex.lastIndex = 0
      while ((urlMatch = urlRegex.exec(line)) !== null) {
        if (urlMatch.index > lineLastIndex) {
          lineParts.push(line.substring(lineLastIndex, urlMatch.index))
        }
        const url = urlMatch[1]
        lineParts.push(
          <a
            key={`url-${key++}`}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="chatbot-link"
            style={{
              color: 'inherit',
              textDecoration: 'underline',
              fontWeight: 600,
              wordBreak: 'break-all',
            }}
          >
            🔗 Ver enlace
          </a>
        )
        lineLastIndex = urlMatch.index + urlMatch[0].length
      }

      if (lineLastIndex > 0) {
        if (lineLastIndex < line.length) {
          lineParts.push(line.substring(lineLastIndex))
        }
        parts.push(...lineParts)
      } else {
        // Procesar emails
        let emailMatch
        emailRegex.lastIndex = 0
        lineLastIndex = 0
        
        while ((emailMatch = emailRegex.exec(line)) !== null) {
          if (emailMatch.index > lineLastIndex) {
            lineParts.push(line.substring(lineLastIndex, emailMatch.index))
          }
          const email = emailMatch[1]
          lineParts.push(
            <a
              key={`email-${key++}`}
              href={`mailto:${email}`}
              className="chatbot-link"
              style={{
                color: 'inherit',
                textDecoration: 'underline',
                fontWeight: 600,
              }}
            >
              📧 {email}
            </a>
          )
          lineLastIndex = emailMatch.index + emailMatch[0].length
        }

        if (lineLastIndex > 0) {
          if (lineLastIndex < line.length) {
            lineParts.push(line.substring(lineLastIndex))
          }
          parts.push(...lineParts)
        } else {
          parts.push(line)
        }
      }
    })
  }

  return parts
}

const CustomBotMessage: React.FC<CustomBotMessageProps> = ({ message }) => {
  const parsedContent = parseMessage(message)

  return (
    <div
      style={{
        fontSize: '0.9rem',
        lineHeight: 1.7,
      }}
    >
      {parsedContent}
    </div>
  )
}

export default CustomBotMessage
