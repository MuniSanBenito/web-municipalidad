// src/components/chatbot/widgets/GeneralOptions.tsx
import React from 'react'

interface Option {
  text: string
  handler: () => void
  id: number
}

interface GeneralOptionsProps {
  options: Option[]
}

const GeneralOptions: React.FC<GeneralOptionsProps> = (props) => {
  // Add null check to prevent error when options is undefined
  const buttons = props.options?.map((option) => (
    <button
      key={option.id}
      onClick={option.handler}
      className="btn btn-sm mx-1 my-1 normal-case transition-all"
      style={{
        borderRadius: '25px',
        fontSize: '0.9rem',
        background: 'linear-gradient(135deg, #076633 0%, #054d26 100%)',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        boxShadow: '0 4px 15px rgba(7, 102, 51, 0.2)',
        cursor: 'pointer',
        fontWeight: '600',
        letterSpacing: '0.3px',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px)'
        e.currentTarget.style.boxShadow = '0 8px 25px rgba(7, 102, 51, 0.35)'
        e.currentTarget.style.background = 'linear-gradient(135deg, #b6c544 0%, #9ab038 100%)'
        e.currentTarget.style.color = '#076633'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = '0 4px 15px rgba(7, 102, 51, 0.2)'
        e.currentTarget.style.background = 'linear-gradient(135deg, #076633 0%, #054d26 100%)'
        e.currentTarget.style.color = 'white'
      }}
    >
      {option.text}
    </button>
  ))

  return (
    <div
      className="options-container flex flex-wrap items-center justify-center gap-2 py-3"
      style={{
        maxWidth: '100%',
        overflowX: 'auto',
        scrollbarWidth: 'thin',
        scrollbarColor: '#b6c544 transparent',
        padding: '12px 8px',
        margin: '8px 0',
        borderRadius: '16px',
        background:
          'linear-gradient(135deg, rgba(182, 197, 68, 0.1) 0%, rgba(123, 203, 226, 0.1) 100%)',
        border: '1px solid rgba(182, 197, 68, 0.2)',
      }}
    >
      {buttons || <span className="text-sm text-gray-500">No hay opciones disponibles</span>}
    </div>
  )
}

export default GeneralOptions
