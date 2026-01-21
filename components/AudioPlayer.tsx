// components/AudioPlayer.tsx
import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';

interface AudioPlayerProps {
  src: string;
  autoPlayAfterOpen: boolean; // Nouvelle prop pour l'autoplay
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, autoPlayAfterOpen }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Fonction pour lancer/arrêter la musique
  const togglePlayPause = () => {
    const newIsPlaying = !isPlaying;
    if (newIsPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
    setIsPlaying(newIsPlaying);
  };

  // Effet pour gérer l'autoplay après l'ouverture de l'enveloppe
  useEffect(() => {
    if (autoPlayAfterOpen && audioRef.current) {
      // On attend un petit peu pour être sûr que tout est prêt
      setTimeout(() => {
        audioRef.current?.play().then(() => {
          setIsPlaying(true);
        }).catch(error => {
          // L'autoplay a été bloqué, ce qui est courant.
          // L'utilisateur devra cliquer sur le bouton.
          console.log("Autoplay a été bloqué par le navigateur:", error);
        });
      }, 500);
    }
  }, [autoPlayAfterOpen]);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* L'élément audio HTML, caché */}
      <audio ref={audioRef} src={src} loop />
      
      {/* Le bouton de contrôle */}
      <button 
        onClick={togglePlayPause}
        className="w-14 h-14 bg-[#B08D57] text-white rounded-full flex justify-center items-center shadow-lg focus:outline-none transition-transform transform hover:scale-110"
        aria-label={isPlaying ? "Mettre en pause" : "Lancer la musique"}
      >
        {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
      </button>
    </div>
  );
};

export default AudioPlayer;
