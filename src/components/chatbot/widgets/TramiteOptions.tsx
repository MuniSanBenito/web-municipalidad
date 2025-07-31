// src/components/chatbot/widgets/TramiteOptions.tsx
import React from 'react';

interface TramiteOptionsProps {
  actionProvider: any;
  setState: any;
}

const TramiteOptions: React.FC<TramiteOptionsProps> = ({ actionProvider, setState }) => {
  const tramiteCategories = [
    {
      category: "Licencias de Conducir",
      icon: "🚗",
      items: [
        { text: "Licencia Original", action: () => actionProvider.handleLicenciaOriginal() },
        { text: "Renovación de Licencia", action: () => actionProvider.handleLicenciaRenovacion() },
        { text: "Ampliación de Licencia", action: () => actionProvider.handleLicenciaAmpliacion() }
      ]
    },
    {
      category: "Impuestos y Tasas",
      icon: "💰",
      items: [
        { text: "Rentas e Impuestos", action: () => actionProvider.handleRentas() },
        { text: "Información de Pagos", action: () => actionProvider.handleRentas() }
      ]
    },
    {
      category: "Obras Privadas",
      icon: "🏗️",
      items: [
        { text: "Información General", action: () => actionProvider.handleObrasPrivadas() },
        { text: "Inscripción Municipal", action: () => actionProvider.handleObrasInscripcionMunicipal() },
        { text: "Final de Obra", action: () => actionProvider.handleObrasFinalDeObra() },
        { text: "Presentación de Proyecto", action: () => actionProvider.handleObrasPresentacionProyecto() },
        { text: "Relevamiento", action: () => actionProvider.handleObrasRelevamiento() }
      ]
    },
    {
      category: "Habilitaciones",
      icon: "📋",
      items: [
        { text: "Habilitaciones Comerciales", action: () => actionProvider.handleHabilitaciones() }
      ]
    },
    {
      category: "Servicios Sociales",
      icon: "👥",
      items: [
        { text: "Área Mujer", action: () => actionProvider.handleAreaMujer() },
        { text: "Tercera Edad", action: () => actionProvider.handleTerceraEdadDiscapacidad() },
        { text: "Producción y Empleo", action: () => actionProvider.handleProduccionEmpleo() }
      ]
    },
    {
      category: "Cultura y Deportes",
      icon: "🎨",
      items: [
        { text: "Talleres Culturales", action: () => actionProvider.handleTalleresCulturales() },
        { text: "Actividades Deportivas", action: () => actionProvider.handleActividadesDeportivas() }
      ]
    },
    {
      category: "Servicios Generales",
      icon: "🏛️",
      items: [
        { text: "Mesa de Entrada", action: () => actionProvider.handleMesaDeEntrada() },
        { text: "Catastro", action: () => actionProvider.handleCatastro() },
        { text: "CAV - Centro de Atención", action: () => actionProvider.handleCav() },
        { text: "Punto Digital y Biblioteca", action: () => actionProvider.handlePuntoDigitalBiblioteca() },
        { text: "CIC Barrio San Pedro", action: () => actionProvider.handleCicBarrioSanPedro() }
      ]
    }
  ];

  return (
    <div className="tramite-options-container" style={{
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
        marginBottom: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
      }}>
        <span>💡</span>
        ¿Te puedo ayudar con alguno de estos trámites?
      </div>

      {tramiteCategories.map((category, categoryIndex) => (
        <div key={categoryIndex} style={{ marginBottom: '16px' }}>
          <div style={{
            fontSize: '12px',
            fontWeight: '500',
            color: '#6c757d',
            marginBottom: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <span>{category.icon}</span>
            {category.category}
          </div>
          
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px'
          }}>
            {category.items.map((item, index) => (
              <button
                key={`${categoryIndex}-${index}`}
                onClick={item.action}
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
                {item.text}
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

export default TramiteOptions;
