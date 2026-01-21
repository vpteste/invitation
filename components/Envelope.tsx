import React, { useState } from 'react';

interface EnvelopeProps {
  onOpen: () => void;
}

const Envelope: React.FC<EnvelopeProps> = ({ onOpen }) => {
  const [isFading, setIsFading] = useState(false);

  const handleClick = () => {
    setIsFading(true);
    setTimeout(onOpen, 500); // Fade out duration
  };

  return (
    <div 
      className={`fixed inset-0 flex flex-col justify-center items-center z-50 transition-opacity duration-500 ${isFading ? 'opacity-0' : 'opacity-100'} animate-navy-gradient`}
      onClick={handleClick}
    >
      <div className="relative cursor-pointer animate-tremble">
        <img src="/images/env.png" alt="Invitation" className="w-80 md:w-96" />
      </div>
      <div className="mt-8">
        <p className="text-lg font-semibold text-white animate-pulse">Cliquez pour continuer</p>
      </div>
    </div>
  );
};

export default Envelope;