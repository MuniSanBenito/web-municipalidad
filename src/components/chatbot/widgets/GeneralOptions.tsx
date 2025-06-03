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
  const buttons = props.options.map((option) => (
    <button
      key={option.id}
      onClick={option.handler}
      className="react-chatbot-kit-chat-btn-send" // Basic styling
      style={{
        padding: '8px 12px',
        borderRadius: '5px',
        fontSize: '0.9rem',
        margin: '5px',
        backgroundColor: '#f0f0f0',
        border: '1px solid #ccc',
        cursor: 'pointer',
      }}
    >
      {option.text}
    </button>
  ));

  return <div className="options-container" style={{ display: 'flex', flexWrap: 'wrap' }}>{buttons}</div>;
};

export default GeneralOptions;
