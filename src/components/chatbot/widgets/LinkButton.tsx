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
      target="_blank" // Open in new tab for external/page links
      rel="noopener noreferrer"
      // Using DaisyUI/Tailwind classes. Assumes Tailwind is processed for these class names.
      className="btn btn-sm btn-info text-white my-2 mx-1 normal-case transition-all hover:scale-105 hover:brightness-110"
      // Fallback inline styles if classes don't apply perfectly or for minor tweaks
      style={{
        textDecoration: 'none',
        display: 'inline-block',
        borderRadius: '20px',
        fontSize: '0.9rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        background: 'linear-gradient(135deg, #2d6a84, #1e4e63)',
        padding: '0.5rem 1rem',
      }}
    >
      <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"/>
          <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z"/>
        </svg>
        {payload.label}
      </span>
    </a>
  );
};

export default LinkButton;
