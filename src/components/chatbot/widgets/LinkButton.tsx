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
      className="btn btn-sm btn-info text-white my-1 mx-0.5 normal-case"
      // Fallback inline styles if classes don't apply perfectly or for minor tweaks
      style={{
        textDecoration: 'none',
        display: 'inline-block',
        // Ensure high contrast for accessibility if default btn-info doesn't provide it
      }}
    >
      {payload.label}
    </a>
  );
};

export default LinkButton;
