// src/pages/test-ollama.tsx
import React from 'react';
import OllamaTest from '../components/chatbot/OllamaTest';

const TestOllamaPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">
            Prueba de Conexión Ollama
          </h1>
          <OllamaTest />
        </div>
      </div>
    </div>
  );
};

export default TestOllamaPage;
