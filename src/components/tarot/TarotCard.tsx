import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface TarotCardProps {
  card: {
    id: number;
    name: string;
    image: string;
    isReversed?: boolean;
  };
  isFlipped: boolean;
  onFlip: () => void;
  isSelectable?: boolean;
}

const TarotCard: React.FC<TarotCardProps> = ({ 
  card, 
  isFlipped, 
  onFlip, 
  isSelectable = true 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div
      className={`relative h-64 md:h-80 w-44 md:w-56 perspective-1000 ${
        isSelectable ? 'cursor-pointer' : 'cursor-default'
      }`}
      onClick={isSelectable ? onFlip : undefined}
      onMouseEnter={() => isSelectable && setIsHovered(true)}
      onMouseLeave={() => isSelectable && setIsHovered(false)}
    >
      <motion.div
        className="absolute w-full h-full preserve-3d transition-all duration-500"
        initial={false}
        animate={{ 
          rotateY: isFlipped ? 0 : 180,
          y: isHovered && !isFlipped ? -10 : 0,
        }}
        transition={{ 
          duration: 0.8, 
          type: "spring", 
          stiffness: 80
        }}
      >
        {/* Card Front (Actual Tarot Card) */}
        <div className="absolute w-full h-full backface-hidden rounded-lg overflow-hidden">
          <motion.div 
            className="w-full h-full relative"
            animate={{ 
              rotateZ: card.isReversed ? 180 : 0 
            }}
          >
            <img 
              src={card.image} 
              alt={card.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-background/70 backdrop-blur-sm p-2 text-center">
              <h3 className="text-sm md:text-base font-cinzel font-bold text-white">{card.name}</h3>
              {card.isReversed && (
                <div className="badge badge-accent text-xs">Reversed</div>
              )}
            </div>
          </motion.div>
        </div>
        
        {/* Card Back */}
        <div 
          className="absolute w-full h-full backface-hidden rounded-lg overflow-hidden transform rotate-y-180"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <div className="w-full h-full bg-gradient-to-br from-primary to-secondary p-0.5 rounded-lg">
            <div className="bg-surface/90 w-full h-full rounded-lg overflow-hidden">
              <div className="w-full h-full bg-stars opacity-50"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-accent/20 rounded-full flex items-center justify-center">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-accent/30 rounded-full flex items-center justify-center">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="text-accent w-8 h-8 md:w-10 md:h-10"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 2a4.5 4.5 0 0 0 0 9 4.5 4.5 0 0 1 0 9 10 10 0 0 0 0-18Z" />
                      <path d="M12 2c-2.5 9 6.5 9 4 22" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TarotCard;