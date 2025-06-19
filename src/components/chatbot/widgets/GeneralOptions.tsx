// src/components/chatbot/widgets/GeneralOptions.tsx
import React from 'react';

interface Option {
  text: string;
  handler: () => void;
  id: number;
}

interface GeneralOptionsProps {
  options: Option[];
}

const GeneralOptions: React.FC<GeneralOptionsProps> = (props) => {
  // Add null check to prevent error when options is undefined
  const buttons = props.options?.map((option) => (
    <button
      key={option.id}
      onClick={option.handler}
      // Using DaisyUI/Tailwind classes
      className="btn btn-sm my-1 mx-1 normal-case transition-all hover:scale-105"
      // Enhanced styling to match website aesthetics
      style={{
        borderRadius: '20px',
        fontSize: '0.9rem',
        backgroundColor: '#2d6a84',
        color: 'white',
        border: 'none',
        padding: '8px 16px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
        cursor: 'pointer',
        fontWeight: '500',
        letterSpacing: '0.3px'
      }}
    >
      {option.text}
    </button>
  ));

  return (
    <div
      className="options-container flex flex-wrap justify-center items-center py-3 gap-2"
      style={{
        maxWidth: '100%',
        overflowX: 'auto',
        scrollbarWidth: 'thin',
        scrollbarColor: '#2d6a84 #f1f1f1',
        padding: '8px 4px',
        margin: '5px 0',
        borderRadius: '8px',
        background: 'rgba(45, 106, 132, 0.05)',
      }}
    >
      {buttons || <span className="text-sm text-gray-500">No hay opciones disponibles</span>}
    </div>
  );
};

export default GeneralOptions;
