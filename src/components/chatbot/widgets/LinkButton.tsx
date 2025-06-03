// src/components/chatbot/widgets/LinkButton.tsx
import React from 'react';

interface LinkButtonProps {
  payload: {
    label: string;
    url: string;
  };
}

const LinkButton: React.FC<LinkButtonProps> = ({ payload }) => {
  return (
    <a
      href={payload.url}
      target="_blank"
      rel="noopener noreferrer"
      className="react-chatbot-kit-chat-btn-send" // Basic styling, can be customized
      style={{
        padding: '8px 12px',
        borderRadius: '5px',
        fontSize: '0.9rem',
        margin: '5px',
        backgroundColor: '#5ccc9d', // Match chat button color
        color: 'white',
        textDecoration: 'none',
        display: 'inline-block',
      }}
    >
      {payload.label}
    </a>
  );
};

export default LinkButton;
