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
      // Using DaisyUI/Tailwind classes
      className="btn btn-sm btn-outline btn-primary my-1 mx-0.5 normal-case"
      // Fallback inline styles for minor tweaks
      style={{
        // Example: Adjust padding if btn-sm is too small/large
        // padding: '0.4rem 0.8rem',
      }}
    >
      {option.text}
    </button>
  ));

  return (
    <div
      className="options-container flex flex-wrap justify-start items-center py-2"
    >
      {buttons}
    </div>
  );
};

export default GeneralOptions;
