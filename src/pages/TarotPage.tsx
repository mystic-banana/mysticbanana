import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, FileText, Star, Info, XCircle, RotateCcw } from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';
import TarotCard from '../components/tarot/TarotCard';
import { useUser } from '../contexts/UserContext';

// Example tarot card data
const tarotCards = [
  {
    id: 0,
    name: "The Fool",
    image: "https://images.pexels.com/photos/6776724/pexels-photo-6776724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    keywords: "Beginnings, innocence, spontaneity, free spirit",
    description: "The Fool represents new beginnings, having faith in the future, being inexperienced, not knowing what to expect, having beginner's luck, improvisation and believing in the universe."
  },
  {
    id: 1,
    name: "The Magician",
    image: "https://images.pexels.com/photos/6775241/pexels-photo-6775241.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    keywords: "Manifestation, resourcefulness, power, inspired action",
    description: "The Magician represents manifestation, resourcefulness, power, inspired action, creativity, and potential. It shows how your intentions and will create your reality."
  },
  {
    id: 2,
    name: "The High Priestess",
    image: "https://images.pexels.com/photos/6775267/pexels-photo-6775267.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    keywords: "Intuition, sacred knowledge, divine feminine, subconscious mind",
    description: "The High Priestess signifies wisdom, intuition, unconscious knowledge, and inner voice. She suggests that it's time to listen to your intuition rather than prioritizing intellect and conscious mind."
  },
  {
    id: 3,
    name: "The Empress",
    image: "https://images.pexels.com/photos/6775290/pexels-photo-6775290.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    keywords: "Femininity, beauty, nature, nurturing, abundance",
    description: "The Empress represents femininity, beauty, nature, nurturing, and abundance. She represents creation of life, romance, art, and business. The Empress calls on you to connect with your feminine energy."
  },
  {
    id: 4,
    name: "The Emperor",
    image: "https://images.pexels.com/photos/6775274/pexels-photo-6775274.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    keywords: "Authority, structure, control, fatherhood",
    description: "The Emperor represents masculine energy, authority, structure, and control. He creates order out of chaos by implementing rules, systems, and hierarchies. He encourages you to be methodical in your approach and to create systems that work well for you."
  },
  {
    id: 5, 
    name: "The Hierophant",
    image: "https://images.pexels.com/photos/6776545/pexels-photo-6776545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    keywords: "Spiritual wisdom, tradition, conformity, morality, ethics",
    description: "The Hierophant represents spiritual wisdom, religious beliefs, conformity, tradition and institutions. He can represent a counselor or mentor who will provide you with wisdom and guidance or a spiritual leader."
  },
  {
    id: 6,
    name: "The Lovers",
    image: "https://images.pexels.com/photos/6775307/pexels-photo-6775307.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    keywords: "Love, harmony, relationships, choices, alignment of values",
    description: "The Lovers represent relationships and choices. Its appearance in a spread indicates some decision about an existing relationship, a temptation of the heart, or a choice of potential partners."
  },
  {
    id: 7,
    name: "The Chariot",
    image: "https://images.pexels.com/photos/6775246/pexels-photo-6775246.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    keywords: "Control, willpower, victory, assertion, determination",
    description: "The Chariot represents control, willpower, victory, assertion, and determination. The Chariot calls on you to assert yourself and be courageous. Through determination and willpower, you'll overcome your obstacles."
  }
];

type SpreadType = 'single' | 'three' | 'celtic';

const TarotPage: React.FC = () => {
  const { user } = useUser();
  const [selectedSpread, setSelectedSpread] = useState<SpreadType>('single');
  const [cards, setCards] = useState<any[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [isReadingComplete, setIsReadingComplete] = useState(false);
  const [showSpreadInfo, setShowSpreadInfo] = useState(false);
  
  // Prepare the cards based on selected spread
  useEffect(() => {
    resetReading();
  }, [selectedSpread]);
  
  const resetReading = () => {
    // Shuffle the deck and make some random cards reversed
    const shuffled = [...tarotCards]
      .sort(() => Math.random() - 0.5)
      .map(card => ({
        ...card,
        isReversed: Math.random() > 0.7
      }));
    
    // Select cards based on spread type
    let selectedCards;
    if (selectedSpread === 'single') {
      selectedCards = shuffled.slice(0, 1);
    } else if (selectedSpread === 'three') {
      selectedCards = shuffled.slice(0, 3);
    } else {
      selectedCards = shuffled.slice(0, 10);
    }
    
    setCards(selectedCards);
    setFlippedCards([]);
    setIsReadingComplete(false);
  };
  
  const handleCardFlip = (index: number) => {
    if (!flippedCards.includes(index)) {
      const newFlippedCards = [...flippedCards, index];
      setFlippedCards(newFlippedCards);
      
      // Check if reading is complete (all cards flipped)
      if (newFlippedCards.length === cards.length) {
        setIsReadingComplete(true);
      }
    }
  };
  
  const getCardPosition = (index: number) => {
    if (selectedSpread === 'single') {
      return 'transform-none';
    }
    
    if (selectedSpread === 'three') {
      const positions = [
        'transform-none', // Past
        'transform translate-x-4 md:translate-x-6', // Present
        'transform translate-x-8 md:translate-x-12' // Future
      ];
      return positions[index] || 'transform-none';
    }
    
    // Add positioning for Celtic Cross spread if needed
    return 'transform-none';
  };
  
  const getCardLabel = (index: number) => {
    if (selectedSpread === 'single') {
      return 'Your Card';
    }
    
    if (selectedSpread === 'three') {
      const labels = ['Past', 'Present', 'Future'];
      return labels[index] || '';
    }
    
    // Add labels for Celtic Cross spread if needed
    return '';
  };
  
  // Determine if user can access this spread type
  const canAccessSpread = (type: SpreadType) => {
    if (type === 'single') return true;
    return user?.isPremium;
  };

  return (
    <MainLayout showSidebar>
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-cinzel font-bold flex items-center">
              <Sparkles className="mr-3 h-6 w-6 text-accent" />
              Tarot Reading
            </h1>
            <p className="text-white/70 mt-1">
              Discover insights through the ancient wisdom of tarot
            </p>
          </div>
          
          {isReadingComplete && user?.isPremium && (
            <button className="mt-4 md:mt-0 btn btn-outline flex items-center">
              <FileText className="mr-2 h-4 w-4" />
              Download as PDF
            </button>
          )}
        </div>
        
        {/* Spread Selection */}
        <div className="card mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h2 className="text-xl font-cinzel font-bold flex items-center mb-4 md:mb-0">
              Choose Your Spread
              <button 
                onClick={() => setShowSpreadInfo(!showSpreadInfo)}
                className="ml-2 text-white/60 hover:text-accent"
              >
                <Info className="h-4 w-4" />
              </button>
            </h2>
            
            {isReadingComplete && (
              <button 
                onClick={resetReading}
                className="btn btn-outline btn-sm flex items-center"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                New Reading
              </button>
            )}
          </div>
          
          {showSpreadInfo && (
            <div className="bg-background/40 rounded-lg p-4 mb-6 relative">
              <button 
                onClick={() => setShowSpreadInfo(false)}
                className="absolute top-2 right-2 text-white/60 hover:text-white"
              >
                <XCircle className="h-4 w-4" />
              </button>
              <h3 className="font-bold mb-2">About Tarot Spreads</h3>
              <p className="text-white/70 text-sm">
                Different spreads provide different insights. A single card gives quick daily guidance, 
                the three-card spread shows past, present, and future, while more complex spreads like 
                the Celtic Cross offer deeper insights into your situation.
              </p>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div 
              className={`relative rounded-lg border transition-all cursor-pointer overflow-hidden ${
                selectedSpread === 'single'
                  ? 'border-accent bg-accent/10'
                  : 'border-white/10 bg-surface hover:bg-surface/80'
              }`}
              onClick={() => setSelectedSpread('single')}
            >
              <div className="p-4">
                <h3 className="font-bold mb-1">Single Card</h3>
                <p className="text-white/70 text-sm">Quick daily guidance</p>
                <div className="mt-2 flex justify-end">
                  <div className="badge badge-primary">Free</div>
                </div>
              </div>
            </div>
            
            <div 
              className={`relative rounded-lg border transition-all overflow-hidden ${
                canAccessSpread('three')
                  ? 'cursor-pointer'
                  : 'opacity-60 cursor-not-allowed'
              } ${
                selectedSpread === 'three'
                  ? 'border-accent bg-accent/10'
                  : 'border-white/10 bg-surface hover:bg-surface/80'
              }`}
              onClick={() => canAccessSpread('three') && setSelectedSpread('three')}
            >
              <div className="p-4">
                <h3 className="font-bold mb-1">Three Card Spread</h3>
                <p className="text-white/70 text-sm">Past, present, and future</p>
                <div className="mt-2 flex justify-end">
                  <div className="badge flex items-center gap-1 bg-accent/20 text-accent">
                    <Star className="w-3 h-3" /> Premium
                  </div>
                </div>
              </div>
              
              {!canAccessSpread('three') && (
                <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center">
                  <a href="/upgrade" className="btn btn-accent btn-sm">
                    Upgrade to Access
                  </a>
                </div>
              )}
            </div>
            
            <div 
              className="relative rounded-lg border border-white/10 bg-surface/60 opacity-60 cursor-not-allowed overflow-hidden"
            >
              <div className="p-4">
                <h3 className="font-bold mb-1">Celtic Cross</h3>
                <p className="text-white/70 text-sm">Deep comprehensive reading</p>
                <div className="mt-2 flex justify-end">
                  <div className="badge flex items-center gap-1 bg-accent/20 text-accent">
                    <Star className="w-3 h-3" /> Coming Soon
                  </div>
                </div>
              </div>
              
              <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center">
                <span className="text-white/80 font-medium">Coming Soon</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Reading Area */}
        <div className="card">
          <h2 className="text-xl font-cinzel font-bold mb-6">
            {selectedSpread === 'single' ? 'Your Daily Card' : (
              selectedSpread === 'three' ? 'Past, Present & Future Reading' : 'Celtic Cross Reading'
            )}
          </h2>
          
          <div className="flex flex-col items-center">
            {/* Cards Display */}
            <div className={`relative flex ${selectedSpread === 'single' ? 'justify-center' : 'justify-start'} mb-8 w-full overflow-x-auto py-4`}>
              {cards.map((card, index) => (
                <div key={index} className={`${getCardPosition(index)} relative`}>
                  <TarotCard
                    card={card}
                    isFlipped={flippedCards.includes(index)}
                    onFlip={() => handleCardFlip(index)}
                  />
                  {flippedCards.includes(index) && (
                    <div className="text-center mt-4">
                      <div className="bg-accent/20 text-accent text-xs px-2 py-1 rounded-full inline-block">
                        {getCardLabel(index)}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Reading instructions */}
            {!isReadingComplete ? (
              <div className="text-center">
                <p className="text-white/70">
                  Click on {selectedSpread === 'single' ? 'the card' : 'each card'} to reveal {selectedSpread === 'single' ? 'it' : 'them'} and get your reading
                </p>
              </div>
            ) : (
              <div className="bg-surface/50 rounded-lg p-6 w-full max-w-3xl mx-auto mt-4">
                <h3 className="text-xl font-cinzel font-bold mb-4">Your Reading</h3>
                
                <div className="space-y-6">
                  {cards.map((card, index) => (
                    flippedCards.includes(index) && (
                      <div key={index} className="bg-background/40 rounded-lg p-4">
                        <div className="flex items-start">
                          <div className="bg-accent/20 rounded-full p-2 mr-4 shrink-0">
                            <Sparkles className="h-5 w-5 text-accent" />
                          </div>
                          <div>
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <h4 className="font-bold text-white">{card.name}</h4>
                              {card.isReversed && (
                                <span className="bg-warning/20 text-warning text-xs px-2 py-0.5 rounded-full">Reversed</span>
                              )}
                              <span className="bg-primary/20 text-white/80 text-xs px-2 py-0.5 rounded-full">
                                {getCardLabel(index)}
                              </span>
                            </div>
                            <p className="text-accent/80 text-sm mb-2">
                              <strong>Keywords:</strong> {card.keywords}
                            </p>
                            <p className="text-white/80 text-sm">
                              {card.description}
                              {card.isReversed && " When reversed, this card suggests blocked energy or the shadow aspects of these qualities."}
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  ))}
                  
                  {/* AI interpretation - Premium only */}
                  {isReadingComplete && user?.isPremium && (
                    <div className="bg-surface/70 rounded-lg p-4 border border-accent/20">
                      <h4 className="font-bold flex items-center mb-3">
                        <Star className="h-4 w-4 text-accent mr-2" fill="currentColor" />
                        AI-Enhanced Interpretation
                      </h4>
                      <p className="text-white/80 text-sm">
                        This spread suggests a period of transformation in your life. The cards indicate that 
                        you're moving from a phase of uncertainty into one of greater clarity and purpose. 
                        Pay attention to your intuition during this time, as it will guide you toward 
                        opportunities that align with your true path. This is an excellent time to pursue creative 
                        projects and to trust in your own abilities.
                      </p>
                    </div>
                  )}
                  
                  {isReadingComplete && !user?.isPremium && (
                    <div className="bg-surface/70 rounded-lg p-4 border border-accent/20">
                      <h4 className="font-bold flex items-center mb-3">
                        <Star className="h-4 w-4 text-accent mr-2" />
                        AI-Enhanced Interpretation
                      </h4>
                      <p className="text-white/80 text-sm mb-3">
                        Upgrade to Premium to unlock AI-enhanced interpretations that provide deeper
                        insights into how these cards relate to your personal situation.
                      </p>
                      <a href="/upgrade" className="btn btn-accent btn-sm">
                        Upgrade to Premium
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default TarotPage;