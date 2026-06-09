// src/components/chatbot/widgets/CustomBotMessage.tsx
import React from 'react'

interface CustomBotMessageProps {
  message: string
}

/**
 * Tokens detectados en el texto. El parser hace una sola pasada,
 * encontrando ocurrencias de cada patrón y eligiendo la más cercana
 * a la izquierda en cada iteración. Así nada se "come" entre sí
 * (ej: un link markdown que contenga una URL adentro).
 */
type Token =
  | { type: 'text'; value: string }
  | { type: 'bold'; value: string }
  | { type: 'mdLink'; text: string; url: string }
  | { type: 'url'; value: string }
  | { type: 'email'; value: string }

const PATTERNS: Array<{
  name: Token['type']
  regex: RegExp
  build: (m: RegExpExecArray) => Token
}> = [
  // Link markdown [texto](url) — debe ir primero para no romper con URLs anidadas
  {
    name: 'mdLink',
    regex: /\[([^\]]+)\]\(([^)\s]+)\)/g,
    build: (m) => ({ type: 'mdLink', text: m[1], url: m[2] }),
  },
  // Negritas **texto** (no captura ** vacíos ni multilínea)
  {
    name: 'bold',
    regex: /\*\*([^*\n]+)\*\*/g,
    build: (m) => ({ type: 'bold', value: m[1] }),
  },
  // URLs sueltas
  {
    name: 'url',
    regex: /(https?:\/\/[^\s<>)]+)/g,
    build: (m) => ({ type: 'url', value: m[1] }),
  },
  // Emails
  {
    name: 'email',
    regex: /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/g,
    build: (m) => ({ type: 'email', value: m[1] }),
  },
]

function tokenize(text: string): Token[] {
  const tokens: Token[] = []
  let cursor = 0

  while (cursor < text.length) {
    let nearest: { start: number; end: number; token: Token } | null = null

    for (const pat of PATTERNS) {
      pat.regex.lastIndex = cursor
      const m = pat.regex.exec(text)
      if (!m) continue
      if (!nearest || m.index < nearest.start) {
        nearest = {
          start: m.index,
          end: m.index + m[0].length,
          token: pat.build(m),
        }
      }
    }

    if (!nearest) {
      tokens.push({ type: 'text', value: text.slice(cursor) })
      break
    }

    if (nearest.start > cursor) {
      tokens.push({ type: 'text', value: text.slice(cursor, nearest.start) })
    }
    tokens.push(nearest.token)
    cursor = nearest.end
  }

  return tokens
}

const linkStyle: React.CSSProperties = {
  color: 'inherit',
  textDecoration: 'underline',
  fontWeight: 600,
}

function renderToken(token: Token, key: number): React.ReactNode {
  switch (token.type) {
    case 'text':
      // Preservamos saltos de línea convirtiendo \n en <br/>
      return token.value.split('\n').map((line, i, arr) => (
        <React.Fragment key={`txt-${key}-${i}`}>
          {line}
          {i < arr.length - 1 && <br />}
        </React.Fragment>
      ))
    case 'bold':
      return (
        <strong key={`b-${key}`} style={{ fontWeight: 700 }}>
          {token.value}
        </strong>
      )
    case 'mdLink':
      return (
        <a
          key={`mdl-${key}`}
          href={token.url}
          target={token.url.startsWith('http') ? '_blank' : undefined}
          rel="noopener noreferrer"
          className="chatbot-link"
          style={linkStyle}
        >
          {token.text}
        </a>
      )
    case 'url':
      return (
        <a
          key={`url-${key}`}
          href={token.value}
          target="_blank"
          rel="noopener noreferrer"
          className="chatbot-link"
          style={{ ...linkStyle, wordBreak: 'break-all' }}
        >
          🔗 Ver enlace
        </a>
      )
    case 'email':
      return (
        <a
          key={`em-${key}`}
          href={`mailto:${token.value}`}
          className="chatbot-link"
          style={linkStyle}
        >
          📧 {token.value}
        </a>
      )
  }
}

/**
 * Parsea el texto y convierte links markdown, URLs, emails y **negritas**
 * en elementos React renderables.
 */
const parseMessage = (text: string): React.ReactNode[] => {
  if (!text) return []
  return tokenize(text).map((tok, i) => renderToken(tok, i))
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
