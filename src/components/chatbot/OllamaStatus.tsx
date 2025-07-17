// src/components/chatbot/OllamaStatus.tsx
import React, { useState, useEffect } from 'react';
import { isOllamaAvailable } from './ollamaService';

// Definir el tipo para window con las propiedades relacionadas con Ollama
declare global {
  interface Window {
    ollamaEnabled?: boolean;
    ollamaActive?: boolean;
  }
}

interface OllamaStatusProps {
  onStatusChange?: (available: boolean) => void;
}

/**
 * Componente para mostrar y gestionar el estado de la conexión con Ollama
 */
const OllamaStatus: React.FC<OllamaStatusProps> = ({ onStatusChange }) => {
  const [available, setAvailable] = useState<boolean | null>(null);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [enabled, setEnabled] = useState<boolean>(window.ollamaEnabled !== false);
  const [showAdminControls, setShowAdminControls] = useState<boolean>(false);
  const [adminPassword, setAdminPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [active, setActive] = useState<boolean>(window.ollamaActive !== false);
  const [usageCount, setUsageCount] = useState<number>(0);

  // Verificar disponibilidad al montar el componente
  useEffect(() => {
    checkOllamaStatus();
    
    // Inicializar la variable global si no existe
    if (typeof window.ollamaEnabled === 'undefined') {
      window.ollamaEnabled = true;
    }
    setEnabled(window.ollamaEnabled);
    
    // Configurar eventos para rastrear cuando Gemma 2B está activo
    const handleOllamaActiveStart = () => {
      setActive(true);
      window.ollamaActive = true;
    };
    
    const handleOllamaActiveEnd = () => {
      setActive(false);
      window.ollamaActive = false;
      // Incrementar el contador de uso cuando se completa una generación
      setUsageCount(prevCount => {
        const newCount = prevCount + 1;
        // Guardar en localStorage
        localStorage.setItem('gemma2bUsageCount', newCount.toString());
        return newCount;
      });
    };
    
    // Recuperar el contador de uso de localStorage si existe
    const savedCount = localStorage.getItem('gemma2bUsageCount');
    if (savedCount) {
      setUsageCount(parseInt(savedCount, 10));
    }
    
    // Registrar eventos personalizados
    window.addEventListener('ollamaActiveStart', handleOllamaActiveStart);
    window.addEventListener('ollamaActiveEnd', handleOllamaActiveEnd);
    
    // Limpiar eventos al desmontar
    return () => {
      window.removeEventListener('ollamaActiveStart', handleOllamaActiveStart);
      window.removeEventListener('ollamaActiveEnd', handleOllamaActiveEnd);
    };
  }, []);

  // Notificar cambios en la disponibilidad
  useEffect(() => {
    if (available !== null && onStatusChange) {
      onStatusChange(!!available && enabled);
    }
    
    // Publicar un evento personalizado cuando cambia el estado
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('ollamaStatusChange', { 
        detail: { available: !!available, enabled: enabled } 
      });
      window.dispatchEvent(event);
    }
  }, [available, enabled, onStatusChange]);

  // Función para verificar el estado de Ollama
  const checkOllamaStatus = async () => {
    setChecking(true);
    setError(null);
    
    try {
      const status = await isOllamaAvailable();
      setAvailable(status);
    } catch (err) {
      setError('Error al verificar la conexión con Ollama');
      setAvailable(false);
      console.error('Error al verificar Ollama:', err);
    } finally {
      setChecking(false);
    }
  };
  
  // Función para mostrar/ocultar controles de administrador
  const toggleAdminControls = () => {
    setShowAdminControls(!showAdminControls);
    setPasswordError(null);
    setAdminPassword('');
  };
  
  // Función para verificar la contraseña de administrador
  const verifyAdminPassword = () => {
    // Contraseña simple para demostración - en producción usar un método más seguro
    const correctPassword = 'admin123';
    
    if (adminPassword === correctPassword) {
      setPasswordError(null);
      setShowAdminControls(true);
      return true;
    } else {
      setPasswordError('Contraseña incorrecta');
      return false;
    }
  };
  
  // Función para activar/desactivar Ollama
  const toggleOllamaEnabled = () => {
    const newState = !enabled;
    setEnabled(newState);
    window.ollamaEnabled = newState;
    
    // Notificar el cambio
    if (onStatusChange) {
      // Fix TypeScript error by ensuring available is a boolean
      onStatusChange(!!available && newState);
    }
  };
  
  // Función para reiniciar el contador de uso
  const resetUsageCounter = () => {
    setUsageCount(0);
    localStorage.setItem('gemma2bUsageCount', '0');
  };

  // Estilos CSS para el componente
  const styles = {
    activeIndicator: {
      color: '#007bff',
      animation: 'spin 2s linear infinite',
      display: 'inline-block',
      marginRight: '5px'
    },
    '@keyframes spin': {
      '0%': { transform: 'rotate(0deg)' },
      '100%': { transform: 'rotate(360deg)' }
    },
    pulsingText: {
      animation: 'pulse 1.5s ease-in-out infinite',
      color: '#007bff',
      fontWeight: 'bold' as 'bold'
    },
    '@keyframes pulse': {
      '0%': { opacity: 0.6 },
      '50%': { opacity: 1 },
      '100%': { opacity: 0.6 }
    }
  };
  
  return (
    <div className="ollama-status">
      <div className="status-indicator">
        <span>Estado de Gemma 2B: </span>
        {checking ? (
          <span className="checking">Verificando...</span>
        ) : available ? (
          <span className={enabled ? "available" : "disabled"}>
            {active && enabled ? (
              <>
                <style>
                  {`
                    @keyframes spin {
                      0% { transform: rotate(0deg); }
                      100% { transform: rotate(360deg); }
                    }
                    @keyframes pulse {
                      0% { opacity: 0.6; }
                      50% { opacity: 1; }
                      100% { opacity: 0.6; }
                    }
                    .spin-icon {
                      display: inline-block;
                      animation: spin 2s linear infinite;
                    }
                    .pulse-text {
                      animation: pulse 1.5s ease-in-out infinite;
                      color: #007bff;
                      font-weight: bold;
                    }
                  `}
                </style>
                <span className="active-indicator">
                  <span className="spin-icon">🔄</span>{" "}
                  <span className="pulse-text">Generando respuesta con Gemma 2B...</span>
                </span>
              </>
            ) : (
              <span>✅ {enabled ? "Disponible" : "Disponible (Desactivado)"}</span>
            )}
          </span>
        ) : (
          <span className="unavailable">❌ No disponible</span>
        )}
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      <button 
        onClick={checkOllamaStatus}
        disabled={checking}
        className="check-button"
      >
        {checking ? 'Verificando...' : 'Verificar conexión'}
      </button>
      
      <div className="status-info">
        {available ? 
          enabled ?
            'El modelo Gemma 2B está disponible y activado para responder consultas complejas.' : 
            'El modelo Gemma 2B está disponible pero desactivado. Se usarán respuestas predeterminadas.' :
          'El modelo Gemma 2B no está disponible. Se usarán respuestas predeterminadas.'
        }
      </div>
      
      {/* Contador de uso */}
      <div className="usage-counter" style={{ marginTop: '10px', fontSize: '0.9em', color: '#666' }}>
        <strong>Estadísticas:</strong> Gemma 2B ha generado {usageCount} respuestas desde su activación.
      </div>
      
      {/* Admin controls toggle */}
      <div className="admin-section">
        <button 
          onClick={toggleAdminControls}
          className="admin-toggle-button"
        >
          {showAdminControls ? 'Ocultar controles de administrador' : 'Controles de administrador'}
        </button>
        
        {showAdminControls && (
          <div className="admin-controls">
            {passwordError && <div className="error-message">{passwordError}</div>}
            
            <div className="password-section">
              <input 
                type="password" 
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="Contraseña de administrador"
                className="password-input"
              />
              <button 
                onClick={verifyAdminPassword}
                className="verify-button"
              >
                Verificar
              </button>
            </div>
            
            {adminPassword === 'admin123' && (
              <>
                <div className="toggle-section">
                  <span>Activar/Desactivar Gemma 2B: </span>
                  <label className="switch">
                    <input 
                      type="checkbox" 
                      checked={enabled}
                      onChange={toggleOllamaEnabled}
                    />
                    <span className="slider round"></span>
                  </label>
                  <span>{enabled ? 'Activado' : 'Desactivado'}</span>
                </div>
                
                {/* Sección de estadísticas para administradores */}
                <div className="admin-stats" style={{ marginTop: '15px', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>
                  <h4 style={{ margin: '0 0 10px 0', fontSize: '1em' }}>Estadísticas de uso</h4>
                  <p style={{ margin: '5px 0' }}>
                    Total de respuestas generadas: <strong>{usageCount}</strong>
                  </p>
                  <button 
                    onClick={resetUsageCounter}
                    style={{
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      padding: '5px 10px',
                      borderRadius: '3px',
                      cursor: 'pointer',
                      fontSize: '0.8em',
                      marginTop: '5px'
                    }}
                  >
                    Reiniciar contador
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
      
      <style jsx>{`
        .ollama-status {
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 5px;
          margin: 10px 0;
          background-color: #f9f9f9;
        }
        .status-indicator {
          margin-bottom: 10px;
          font-weight: bold;
        }
        .available {
          color: green;
        }
        .disabled {
          color: orange;
        }
        .unavailable {
          color: red;
        }
        .checking {
          color: orange;
        }
        .error-message {
          color: red;
          margin: 5px 0;
        }
        .check-button, .admin-toggle-button, .verify-button {
          background-color: #2d6a84;
          color: white;
          border: none;
          padding: 5px 10px;
          border-radius: 4px;
          cursor: pointer;
          margin: 5px 0;
        }
        .admin-toggle-button {
          background-color: #666;
          font-size: 0.8em;
          margin-top: 15px;
        }
        .check-button:disabled, .admin-toggle-button:disabled {
          background-color: #cccccc;
        }
        .status-info {
          font-size: 0.9em;
          margin-top: 10px;
          color: #666;
        }
        .admin-section {
          margin-top: 15px;
          border-top: 1px dashed #ccc;
          padding-top: 10px;
        }
        .admin-controls {
          margin-top: 10px;
          padding: 10px;
          background-color: #f0f0f0;
          border-radius: 4px;
        }
        .password-section {
          display: flex;
          margin-bottom: 10px;
        }
        .password-input {
          flex: 1;
          padding: 5px;
          border: 1px solid #ccc;
          border-radius: 4px;
          margin-right: 5px;
        }
        .toggle-section {
          display: flex;
          align-items: center;
          margin-top: 10px;
        }
        /* Switch styling */
        .switch {
          position: relative;
          display: inline-block;
          width: 40px;
          height: 20px;
          margin: 0 10px;
        }
        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }
        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          transition: .4s;
        }
        .slider:before {
          position: absolute;
          content: "";
          height: 16px;
          width: 16px;
          left: 2px;
          bottom: 2px;
          background-color: white;
          transition: .4s;
        }
        input:checked + .slider {
          background-color: #2d6a84;
        }
        input:checked + .slider:before {
          transform: translateX(20px);
        }
        .slider.round {
          border-radius: 20px;
        }
        .slider.round:before {
          border-radius: 50%;
        }
      `}</style>
    </div>
  );
};

export default OllamaStatus;
