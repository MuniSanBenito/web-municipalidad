// src/components/chatbot/widgets/TramiteOptions.tsx
import React from 'react'

interface TramiteOptionsProps {
  actionProvider: any
  setState: any
}

const TramiteOptions: React.FC<TramiteOptionsProps> = ({ actionProvider, setState }) => {
  const tramiteCategories = [
    {
      category: 'Licencias de Conducir',
      icon: '🚗',
      items: [
        { text: 'Licencia Original', action: () => actionProvider.handleLicenciaOriginal() },
        { text: 'Renovación de Licencia', action: () => actionProvider.handleLicenciaRenovacion() },
        { text: 'Ampliación de Licencia', action: () => actionProvider.handleLicenciaAmpliacion() },
      ],
    },
    {
      category: 'Impuestos y Tasas',
      icon: '💰',
      items: [
        { text: 'Rentas e Impuestos', action: () => actionProvider.handleRentas() },
        { text: 'Información de Pagos', action: () => actionProvider.handleRentas() },
      ],
    },
    {
      category: 'Obras Privadas',
      icon: '🏗️',
      items: [
        { text: 'Información General', action: () => actionProvider.handleObrasPrivadas() },
        {
          text: 'Inscripción Municipal',
          action: () => actionProvider.handleObrasInscripcionMunicipal(),
        },
        { text: 'Final de Obra', action: () => actionProvider.handleObrasFinalDeObra() },
        {
          text: 'Presentación de Proyecto',
          action: () => actionProvider.handleObrasPresentacionProyecto(),
        },
        { text: 'Relevamiento', action: () => actionProvider.handleObrasRelevamiento() },
      ],
    },
    {
      category: 'Habilitaciones',
      icon: '📋',
      items: [
        { text: 'Habilitaciones Comerciales', action: () => actionProvider.handleHabilitaciones() },
      ],
    },
    {
      category: 'Servicios Sociales',
      icon: '👥',
      items: [
        { text: 'Área Mujer', action: () => actionProvider.handleAreaMujer() },
        { text: 'Tercera Edad', action: () => actionProvider.handleTerceraEdadDiscapacidad() },
        { text: 'Producción y Empleo', action: () => actionProvider.handleProduccionEmpleo() },
      ],
    },
    {
      category: 'Cultura y Deportes',
      icon: '🎨',
      items: [
        { text: 'Talleres Culturales', action: () => actionProvider.handleTalleresCulturales() },
        {
          text: 'Actividades Deportivas',
          action: () => actionProvider.handleActividadesDeportivas(),
        },
      ],
    },
    {
      category: 'Servicios Generales',
      icon: '🏛️',
      items: [
        { text: 'Mesa de Entrada', action: () => actionProvider.handleMesaDeEntrada() },
        { text: 'Catastro', action: () => actionProvider.handleCatastro() },
        { text: 'CAV - Centro de Atención', action: () => actionProvider.handleCav() },
        {
          text: 'Punto Digital y Biblioteca',
          action: () => actionProvider.handlePuntoDigitalBiblioteca(),
        },
        { text: 'CIC Barrio San Pedro', action: () => actionProvider.handleCicBarrioSanPedro() },
      ],
    },
  ]

  return (
    <div
      className="tramite-options-container"
      style={{
        padding: '20px',
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
        borderRadius: '20px',
        margin: '12px 0',
        border: '2px solid rgba(182, 197, 68, 0.3)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      }}
    >
      <div
        style={{
          fontSize: '1rem',
          fontWeight: '700',
          color: '#076633',
          marginBottom: '18px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          paddingBottom: '12px',
          borderBottom: '2px solid rgba(182, 197, 68, 0.3)',
        }}
      >
        <span style={{ fontSize: '24px' }}>📋</span>
        ¿En qué trámite puedo ayudarte?
      </div>

      {tramiteCategories.map((category, categoryIndex) => (
        <div key={categoryIndex} style={{ marginBottom: '18px' }}>
          <div
            style={{
              fontSize: '0.85rem',
              fontWeight: '600',
              color: '#076633',
              marginBottom: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              opacity: 0.9,
            }}
          >
            <span style={{ fontSize: '18px' }}>{category.icon}</span>
            {category.category}
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
            }}
          >
            {category.items.map((item, index) => (
              <button
                key={`${categoryIndex}-${index}`}
                onClick={item.action}
                style={{
                  backgroundColor: '#ffffff',
                  border: '2px solid #b6c544',
                  borderRadius: '25px',
                  padding: '10px 18px',
                  fontSize: '0.85rem',
                  color: '#076633',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  minHeight: '40px',
                  fontWeight: '600',
                  boxShadow: '0 2px 8px rgba(182, 197, 68, 0.15)',
                  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background =
                    'linear-gradient(135deg, #b6c544 0%, #9ab038 100%)'
                  e.currentTarget.style.color = '#076633'
                  e.currentTarget.style.transform = 'translateY(-3px)'
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(182, 197, 68, 0.35)'
                  e.currentTarget.style.borderColor = '#076633'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#ffffff'
                  e.currentTarget.style.color = '#076633'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(182, 197, 68, 0.15)'
                  e.currentTarget.style.borderColor = '#b6c544'
                }}
              >
                {item.text}
              </button>
            ))}
          </div>
        </div>
      ))}

      <div
        style={{
          marginTop: '16px',
          padding: '14px 18px',
          background: 'linear-gradient(135deg, #7bcbe2 0%, #5bb8d3 100%)',
          borderRadius: '16px',
          fontSize: '0.9rem',
          color: '#1e3a5f',
          textAlign: 'center',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          boxShadow: '0 4px 15px rgba(123, 203, 226, 0.25)',
        }}
      >
        <span style={{ fontSize: '18px' }}>💬</span>
        También puedes escribir tu consulta directamente
      </div>
    </div>
  )
}

export default TramiteOptions
