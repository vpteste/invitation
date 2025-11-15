
import React, { useState, useEffect, useRef, PropsWithChildren } from 'react';
import { MdLocationOn, MdOutlineWbIncandescent, MdOutlineCardGiftcard, MdOutlineArrowDownward, MdPhone, MdCheck } from 'react-icons/md';
import confetti from 'canvas-confetti';

// Composant pour animer les sections au défilement
const AnimatedSection = ({ children, className, delay = 0 }: PropsWithChildren<{ className?: string, delay?: number }>) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`${className || ''} opacity-0 translate-y-5 transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0 is-visible' : ''
      }`}
      style={{
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};


const App: React.FC = () => {
  const [guestName, setGuestName] = useState('Mme, Mlle, Mr, Couple');
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoaded(true);
    }, 100); // Short delay to ensure CSS is applied
    return () => clearTimeout(timer);
  }, []);

      useEffect(() => {

        if (pageLoaded) {

          console.log("Confetti effect triggered!"); // Debug log

          // Add a small delay before calling confetti

          setTimeout(() => {

            confetti({

              particleCount: 50, // Reduced for testing

              spread: 70,

              origin: { y: 0.6 } // From bottom-center for a simple burst

            });

          }, 500); // 500ms delay

        }

      }, [pageLoaded]);






  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const guest = urlParams.get('guest');
    if (guest) {
      setGuestName(decodeURIComponent(guest));
    }
  }, []);

  const paperTextureUrl = "https://img.freepik.com/free-photo/old-paper-texture-background_1182-100.jpg";
  const coupleImageUrl = "https://media.istockphoto.com/id/1819424371/fr/photo/couple-se-tenant-la-main-et-bijoux-pour-mariage-fian%C3%A7ailles-ou-union-matrimoniale-ou.jpg?s=612x612&w=0&k=20&c=l-Yt1TI1IRyEmYms6lk-0qSKO7nsuIXe3W76vHzy7zQ=";


  const mairieMapUrl = "https://www.google.com/maps/search/?api=1&query=Mairie+annexe+de+Djrogobite,Abidjan";
  const egliseMapUrl = "https://www.google.com/maps/search/?api=1&query=Eglise+Sainte+Famille+Riviera+2,Abidjan";
  const salleMapUrl = "https://www.google.com/maps/search/?api=1&query=Corne+d'abondance+Faya,Abidjan";
  const rsvpUrl = `https://wa.me/2250757059977?text=Bonjour%2C%20je%20confirme%20ma%20pr%C3%A9sence%20au%20mariage%20d'Afefa%20et%20Christian%20en%20tant%20que%20${encodeURIComponent(guestName)}.`;
  const phoneUrl = "tel:+2250757059977";
  const moonservicesUrl = "https://wa.me/2250576535792";
  
  const accentGold = '#B08D57';
  const textDark = '#3A3238';
  const textMedium = '#5C4B51';

  const colorPalette = [
    { name: 'Bleu Marine', hex: '#003366' },
    { name: 'Bleu Nuit', hex: '#002D62' },
    { name: 'Or', hex: '#B08D57' },
    { name: 'Crème', hex: '#F5F5DC' },
    { name: 'Blanc', hex: '#FFFFFF' },
  ];

  const weddingDate = new Date('2025-12-20T12:30:00');

  const calculateTimeLeft = () => {
    const difference = +weddingDate - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        jours: Math.floor(difference / (1000 * 60 * 60 * 24)),
        heures: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        secondes: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  const [rsvpConfirmed, setRsvpConfirmed] = useState(false);
  const handleRsvpClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setRsvpConfirmed(true);
    setTimeout(() => {
        window.location.href = rsvpUrl;
    }, 500);
  };

  const names = "Afefa & Christian".split('');

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#F5F5DC] shadow-2xl overflow-hidden">

      <main className={`p-6 md:p-8 text-center transition-opacity duration-1000 ease-in ${pageLoaded ? 'opacity-100' : 'opacity-0'}`} style={{ color: textDark }}>
        
        <AnimatedSection className="mb-6">
          <h1 className="font-dancing text-6xl" style={{ color: accentGold }}>Invitation</h1>
        </AnimatedSection>
        
        <AnimatedSection className="mb-6" delay={200}>
          <h2 className="font-playfair text-4xl font-bold tracking-wider">
             {names.map((char, index) => (
                <span
                  key={index}
                  className="cascade-char"
                  style={{ animationDelay: `${50 + index * 50}ms` }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
          </h2>
           <p className="mt-4 text-lg font-semibold" style={{ color: textMedium }}>{guestName}</p>
        </AnimatedSection>

        <AnimatedSection className="mb-8" delay={400}>
          <img src={coupleImageUrl} alt="Afefa et Christian" className="rounded-lg shadow-lg w-full h-auto object-cover" />
        </AnimatedSection>

        <AnimatedSection className="mb-8" delay={200}>
          <p className="text-lg leading-relaxed" style={{ color: textMedium }}>
            Ont l'immense honneur de vous convier à la cérémonie de leur mariage. Ce moment privilégié marquera l'union de leur vie dans un esprit de fête, de gratitude et d'élégance.
          </p>
        </AnimatedSection>

        <AnimatedSection className="mb-10 p-6 bg-white/50 rounded-lg shadow-inner">
          <h3 className="font-playfair text-4xl font-bold mb-4" style={{ color: accentGold }}>Retenez la Date</h3>
          <div className="text-3xl font-bold tracking-widest" style={{ color: textDark }}>
            SAMEDI <span className="text-5xl font-playfair mx-2" style={{ color: accentGold }}>20</span> DÉCEMBRE 2025
          </div>
          {Object.keys(timeLeft).length > 0 && (
            <div className="flex justify-center space-x-4 md:space-x-8 mt-6 text-sm md:text-base">
              {Object.entries(timeLeft).map(([interval, value]) => (
                <div key={interval} className="flex flex-col items-center">
                  <span className="text-3xl font-playfair font-bold" style={{ color: accentGold }}>{String(value).padStart(2, '0')}</span>
                  <span className="uppercase tracking-wider" style={{ color: textMedium }}>{interval}</span>
                </div>
              ))}
            </div>
          )}
        </AnimatedSection>
        
        <div className="space-y-8">
            {/* Cérémonie Civile */}
            <AnimatedSection>
                 <div className="flex items-center space-x-4 bg-white/50 p-4 rounded-lg shadow-inner">
                    <a href={mairieMapUrl} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 icon-glow icon-to-pulse">
                      <MdLocationOn className="w-12 h-12" style={{ color: accentGold }}/>
                    </a>
                    <div className="text-left">
                        <p className="font-bold text-xl" style={{ color: textDark }}>12H30 : Cérémonie Civile</p>
                        <p style={{ color: textMedium }}>À la Mairie annexe de Djrogobite</p>
                        <p className="text-xs italic mt-1" style={{ color: accentGold }}>Cliquez sur l'icône pour l'itinéraire</p>
                    </div>
                </div>
            </AnimatedSection>
            {/* Cérémonie Religieuse */}
            <AnimatedSection>
                 <div className="flex items-center space-x-4 bg-white/50 p-4 rounded-lg shadow-inner">
                    <a href={egliseMapUrl} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 icon-glow icon-to-pulse">
                      <MdLocationOn className="w-12 h-12" style={{ color: accentGold }}/>
                    </a>
                    <div className="text-left">
                        <p className="font-bold text-xl" style={{ color: textDark }}>15H00 : Cérémonie Religieuse</p>
                        <p style={{ color: textMedium }}>À l'église Ste Famille Riviera 2</p>
                        <p className="text-xs italic mt-1" style={{ color: accentGold }}>Cliquez sur l'icône pour l'itinéraire</p>
                    </div>
                </div>
            </AnimatedSection>
             {/* Réception */}
            <AnimatedSection>
                 <div className="flex items-center space-x-4 bg-white/50 p-4 rounded-lg shadow-inner">
                    <a href={salleMapUrl} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 icon-glow icon-to-pulse">
                      <MdLocationOn className="w-12 h-12" style={{ color: accentGold }}/>
                    </a>
                    <div className="text-left">
                        <p className="font-bold text-xl" style={{ color: textDark }}>18H00 : Réception</p>
                        <p style={{ color: textMedium }}>À la Corne d’abondance, Faya</p>
                        <p className="text-xs italic mt-1" style={{ color: accentGold }}>Cliquez sur l'icône pour l'itinéraire</p>
                    </div>
                </div>
            </AnimatedSection>
        </div>
        
        <div className="my-10 space-y-8">
          <AnimatedSection className="p-4 bg-white/50 rounded-lg shadow-inner">
            <MdOutlineWbIncandescent className="w-10 h-10 mx-auto mb-2" style={{ color: accentGold }}/>
            <h4 className="font-playfair text-2xl font-bold mb-2">Dress code</h4>
            <p className="font-semibold text-lg" style={{ color: textMedium }}>CHIC & GLAMOUR</p>
            <div className="flex justify-center items-center space-x-3 mt-4">
              {colorPalette.map((color, index) => (
                <div key={color.name} className="flex flex-col items-center">
                   <div 
                      className="w-10 h-10 rounded-full border-2 border-white shadow-md animate-color-pulse" 
                      style={{ 
                        backgroundColor: color.hex, 
                        animationDelay: `${index * 200}ms`,
                        // @ts-ignore
                        '--glow-color': color.hex,
                      }}
                   ></div>
                   <span className="text-xs mt-2" style={{ color: textMedium }}>{color.name}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection className="p-4 bg-white/50 rounded-lg shadow-inner">
            <MdOutlineCardGiftcard className="w-10 h-10 mx-auto mb-2 icon-glow icon-to-pulse" style={{ color: accentGold }}/>
            <h4 className="font-playfair text-2xl font-bold mb-2">Cadeaux</h4>
            <p style={{ color: textMedium }}>MERCI DE PRIVILEGIER LES CARDEAUX EN EXPERCE</p>
          </AnimatedSection>

          <AnimatedSection className="p-4 bg-white/50 rounded-lg shadow-inner">
            <a href={rsvpUrl} onClick={handleRsvpClick} className="block group">
              <div className="flex items-center justify-center space-x-3 transition-transform transform group-hover:scale-105">
                {rsvpConfirmed ? (
                    <>
                      <MdCheck className="w-8 h-8 animate-checkmark" style={{ color: 'green' }}/>
                      <span className="font-playfair text-xl font-bold" style={{ color: textMedium }}>Merci ! Confirmation en cours...</span>
                    </>
                ) : (
                    <>
                      <span className="font-playfair text-xl font-bold" style={{ color: textMedium }}>Merci de confirmer votre présence ici</span>
                      <MdOutlineArrowDownward className="w-6 h-6 animate-bounce" style={{ color: accentGold }}/>
                    </>
                )}
              </div>
            </a>
          </AnimatedSection>
          
          <AnimatedSection className="p-6 bg-white/50 rounded-lg shadow-inner">
            <h4 className="font-playfair text-2xl font-bold mb-4">Un Mariage Déconnecté</h4>
            <div className="flex justify-center items-center space-x-4">
              <img src="/images/icon.png" alt="Social Media Crossed Out" className="w-48 h-auto" />
            </div>
          </AnimatedSection>

        </div>
        <AnimatedSection className="mt-10">
          <p className="font-semibold" style={{ color: textMedium }}>Merci de respecter l'heure pour le bon déroulement de la cérémonie.</p>
        </AnimatedSection>
      </main>
      
      <footer className="py-6 px-4 text-center" style={{ backgroundColor: textDark, color: '#F5F5DC' }}>
          <a href={phoneUrl} className="inline-flex items-center space-x-2 group icon-glow">
              <MdPhone className="w-5 h-5 transition-transform transform group-hover:scale-110" />
              <span>{phoneUrl.replace('tel:', '')}</span>
          </a>
          <p className="text-xs mt-3 opacity-70">
            <a href={moonservicesUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
              Cree par Moonservices
            </a>
          </p>
      </footer>

    </div>
  );
};

export default App;