// src/components/chatbot/OllamaTest.tsx
import React, { useState, useEffect } from 'react';
import { isOllamaAvailable, generateOllamaResponse } from './ollamaService';

const OllamaTest: React.FC = () => {
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [testResponse, setTestResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    checkAvailability();
  }, []);

  const checkAvailability = async () => {
    try {
      const available = await isOllamaAvailable();
      setIsAvailable(available);
      setError('');
    } catch (err) {
      setError(`Error checking availability: ${err}`);
      setIsAvailable(false);
    }
  };

  const testOllama = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await generateOllamaResponse('Hola, ¿cómo estás?');
      setTestResponse(response);
    } catch (err) {
      setError(`Error generating response: ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Prueba de Conexión Ollama</h3>
      
      <div className="space-y-4">
        <div>
          <h4 className="font-medium">Estado de Disponibilidad:</h4>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded text-sm ${
              isAvailable === null ? 'bg-gray-200 text-gray-700' :
              isAvailable ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
            }`}>
              {isAvailable === null ? 'Verificando...' : 
               isAvailable ? 'Disponible ✅' : 'No disponible ❌'}
            </span>
            <button 
              onClick={checkAvailability}
              className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
            >
              Verificar
            </button>
          </div>
        </div>

        <div>
          <h4 className="font-medium">Prueba de Respuesta:</h4>
          <button 
            onClick={testOllama}
            disabled={!isAvailable || isLoading}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Generando...' : 'Probar Ollama'}
          </button>
        </div>

        {testResponse && (
          <div>
            <h4 className="font-medium">Respuesta:</h4>
            <div className="p-3 bg-gray-100 rounded border">
              {testResponse}
            </div>
          </div>
        )}

        {error && (
          <div>
            <h4 className="font-medium text-red-600">Error:</h4>
            <div className="p-3 bg-red-100 text-red-800 rounded border">
              {error}
            </div>
          </div>
        )}

        <div className="text-sm text-gray-600">
          <h4 className="font-medium">Información de Configuración:</h4>
          <p>Endpoint: {process.env.NEXT_PUBLIC_OLLAMA_ENDPOINT || 'http://api-ollama.munisanbenito.gov.ar:21119'}</p>
          <p>Modelo: gemma:2b</p>
        </div>
      </div>
    </div>
  );
};

export default OllamaTest;
