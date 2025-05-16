import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '../contexts/UserContext';
import MainLayout from '../components/layout/MainLayout';
import { 
  HeartHandshake,
  FileText,
  Star,
  Info,
  X,
  Check,
  Sparkles,
  Heart,
  UserCircle,
  Search,
  ChevronDown,
  Download
} from 'lucide-react';

// Sample zodiac signs and their compatibility data
const zodiacSigns = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

// Compatibility matrix (simplified for demo)
const getCompatibilityScore = (sign1: string, sign2: string): number => {
  const sameElement = (sign: string): string => {
    const elements: Record<string, string[]> = {
      'Fire': ['Aries', 'Leo', 'Sagittarius'],
      'Earth': ['Taurus', 'Virgo', 'Capricorn'],
      'Air': ['Gemini', 'Libra', 'Aquarius'],
      'Water': ['Cancer', 'Scorpio', 'Pisces']
    };
    
    for (const [element, signs] of Object.entries(elements)) {
      if (signs.includes(sign)) {
        return element;
      }
    }
    return '';
  };
  
  // Calculate basic compatibility
  const element1 = sameElement(sign1);
  const element2 = sameElement(sign2);
  
  if (sign1 === sign2) {
    return 80; // Same sign
  } else if (element1 === element2) {
    return 90; // Same element (high compatibility)
  } else if (
    (element1 === 'Fire' && element2 === 'Air') || 
    (element1 === 'Air' && element2 === 'Fire') ||
    (element1 === 'Earth' && element2 === 'Water') || 
    (element1 === 'Water' && element2 === 'Earth')
  ) {
    return 85; // Complementary elements
  } else if (
    (element1 === 'Fire' && element2 === 'Earth') || 
    (element1 === 'Earth' && element2 === 'Fire') ||
    (element1 === 'Air' && element2 === 'Water') || 
    (element1 === 'Water' && element2 === 'Air')
  ) {
    return 60; // Challenging elements
  } else {
    return 75; // Other combinations
  }
};

// Aspect compatibility areas
const compatibilityAreas = ['Overall', 'Romance', 'Friendship', 'Communication', 'Trust', 'Emotions', 'Values', 'Intellect'];

const CompatibilityPage: React.FC = () => {
  const { user } = useUser();
  const [sign1, setSign1] = useState(user?.zodiacSign || 'Aries');
  const [sign2, setSign2] = useState('Libra');
  const [birthDateTime1, setBirthDateTime1] = useState('');
  const [birthDateTime2, setBirthDateTime2] = useState('');
  const [birthPlace1, setBirthPlace1] = useState('');
  const [birthPlace2, setBirthPlace2] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  
  // Calculate compatibility score between the two signs
  const compatibilityScore = hasSubmitted ? getCompatibilityScore(sign1, sign2) : null;
  
  // Get random scores for different compatibility areas
  const getRandomScores = () => {
    const baseScore = compatibilityScore || 70;
    return compatibilityAreas.reduce((acc, area) => {
      // Slightly randomize scores around the base score
      let score = baseScore + Math.floor(Math.random() * 20) - 10;
      // Keep score between 40 and 100
      score = Math.max(40, Math.min(100, score));
      return { ...acc, [area]: score };
    }, {});
  };
  
  // Generate compatibility scores for different areas
  const areaScores = hasSubmitted ? getRandomScores() : null;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSubmitted(true);
  };
  
  const getMatchDescription = (score: number | null) => {
    if (!score) return '';
    
    if (score >= 90) return 'Celestial Match';
    if (score >= 80) return 'Highly Compatible';
    if (score >= 70) return 'Good Match';
    if (score >= 60) return 'Average Compatibility';
    return 'Challenging Match';
  };
  
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 80) return 'text-accent';
    if (score >= 70) return 'text-amber-500';
    if (score >= 60) return 'text-orange-500';
    return 'text-red-500';
  };

  return (
    <MainLayout showSidebar>
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-cinzel font-bold flex items-center">
              <HeartHandshake className="mr-3 h-6 w-6 text-accent" />
              Compatibility Analysis
            </h1>
            <p className="text-white/70 mt-1">
              Discover how your stars align with another person
            </p>
          </div>
        </div>
        
        {/* Compatibility Calculator */}
        <div className="card mb-8">
          <h2 className="text-xl font-cinzel font-bold mb-6">Zodiac Compatibility Calculator</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Person 1 */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg">Person 1</h3>
                  {user && (
                    <button 
                      type="button"
                      className="text-accent text-sm flex items-center"
                      onClick={() => {
                        setSign1(user.zodiacSign || 'Aries');
                        if (user.birthDate) {
                          setBirthDateTime1(`${user.birthDate}${user.birthTime ? `T${user.birthTime}` : ''}`);
                        }
                        setBirthPlace1(user.birthPlace || '');
                      }}
                    >
                      <UserCircle className="mr-1 h-4 w-4" />
                      Use my details
                    </button>
                  )}
                </div>
                
                <div>
                  <label htmlFor="sign1" className="block text-sm font-medium text-white/80 mb-1">
                    Zodiac Sign
                  </label>
                  <select
                    id="sign1"
                    value={sign1}
                    onChange={(e) => setSign1(e.target.value)}
                    className="input w-full"
                    required
                  >
                    {zodiacSigns.map(sign => (
                      <option key={sign} value={sign}>{sign}</option>
                    ))}
                  </select>
                </div>
                
                {showAdvancedOptions && (
                  <>
                    <div>
                      <label htmlFor="birthDateTime1" className="block text-sm font-medium text-white/80 mb-1">
                        Birth Date & Time (optional)
                      </label>
                      <input
                        id="birthDateTime1"
                        type="datetime-local"
                        value={birthDateTime1}
                        onChange={(e) => setBirthDateTime1(e.target.value)}
                        className="input w-full"
                      />
                      <p className="mt-1 text-xs text-white/50">For more accurate results</p>
                    </div>
                    
                    <div>
                      <label htmlFor="birthPlace1" className="block text-sm font-medium text-white/80 mb-1">
                        Birth Place (optional)
                      </label>
                      <input
                        id="birthPlace1"
                        type="text"
                        value={birthPlace1}
                        onChange={(e) => setBirthPlace1(e.target.value)}
                        placeholder="City, Country"
                        className="input w-full"
                      />
                      <p className="mt-1 text-xs text-white/50">Enhances reading accuracy</p>
                    </div>
                  </>
                )}
              </div>
              
              {/* Person 2 */}
              <div className="space-y-4">
                <h3 className="font-bold text-lg">Person 2</h3>
                
                <div>
                  <label htmlFor="sign2" className="block text-sm font-medium text-white/80 mb-1">
                    Zodiac Sign
                  </label>
                  <select
                    id="sign2"
                    value={sign2}
                    onChange={(e) => setSign2(e.target.value)}
                    className="input w-full"
                    required
                  >
                    {zodiacSigns.map(sign => (
                      <option key={sign} value={sign}>{sign}</option>
                    ))}
                  </select>
                </div>
                
                {showAdvancedOptions && (
                  <>
                    <div>
                      <label htmlFor="birthDateTime2" className="block text-sm font-medium text-white/80 mb-1">
                        Birth Date & Time (optional)
                      </label>
                      <input
                        id="birthDateTime2"
                        type="datetime-local"
                        value={birthDateTime2}
                        onChange={(e) => setBirthDateTime2(e.target.value)}
                        className="input w-full"
                      />
                      <p className="mt-1 text-xs text-white/50">For more accurate results</p>
                    </div>
                    
                    <div>
                      <label htmlFor="birthPlace2" className="block text-sm font-medium text-white/80 mb-1">
                        Birth Place (optional)
                      </label>
                      <input
                        id="birthPlace2"
                        type="text"
                        value={birthPlace2}
                        onChange={(e) => setBirthPlace2(e.target.value)}
                        placeholder="City, Country"
                        className="input w-full"
                      />
                      <p className="mt-1 text-xs text-white/50">Enhances reading accuracy</p>
                    </div>
                  </>
                )}
              </div>
            </div>
            
            <div>
              <button
                type="button"
                onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                className="text-accent text-sm flex items-center"
              >
                <Info className="mr-1 h-4 w-4" />
                {showAdvancedOptions ? 'Hide' : 'Show'} advanced options
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${showAdvancedOptions ? 'rotate-180' : ''}`} />
              </button>
              
              <p className="mt-2 text-white/70 text-sm">
                For the most accurate compatibility reading, we recommend providing birth date, time, and location.
                This allows for a detailed synastry chart analysis.
              </p>
            </div>
            
            <div className="pt-4">
              <button type="submit" className="btn btn-accent w-full md:w-auto flex items-center justify-center">
                <Search className="mr-2 h-5 w-5" />
                Calculate Compatibility
              </button>
            </div>
          </form>
        </div>
        
        {/* Results Section */}
        {hasSubmitted && compatibilityScore !== null && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="card"
          >
            <h2 className="text-xl font-cinzel font-bold mb-6 flex items-center">
              <Heart className="mr-2 h-5 w-5 text-accent" fill="currentColor" />
              {sign1} & {sign2} Compatibility
            </h2>
            
            <div className="bg-surface/50 rounded-lg p-6">
              {/* Overall Score */}
              <div className="flex flex-col md:flex-row items-center justify-between mb-8 pb-8 border-b border-white/10">
                <div className="flex flex-col items-center mb-6 md:mb-0">
                  <div className="relative">
                    <svg className="w-32 h-32">
                      <circle
                        className="text-surface/80"
                        strokeWidth="8"
                        stroke="currentColor"
                        fill="transparent"
                        r="58"
                        cx="64"
                        cy="64"
                      />
                      <circle
                        className="text-accent"
                        strokeWidth="8"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r="58"
                        cx="64"
                        cy="64"
                        strokeDasharray={`${365 * (compatibilityScore / 100)} 365`}
                        strokeDashoffset="0"
                        transform="rotate(-90 64 64)"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-bold">{compatibilityScore}%</span>
                      <span className="text-white/70 text-xs">Overall</span>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <h3 className="font-bold text-lg">{getMatchDescription(compatibilityScore)}</h3>
                    <p className="text-white/70 text-sm">Match Rating</p>
                  </div>
                </div>
                
                <div className="flex-1 max-w-md">
                  <h3 className="font-bold text-lg mb-3">Compatibility Summary</h3>
                  <p className="text-white/80 mb-4">
                    {sign1} and {sign2} {compatibilityScore >= 80 ? 'have a natural affinity' : 
                      compatibilityScore >= 70 ? 'generally work well together' : 
                      compatibilityScore >= 60 ? 'have moderate compatibility' : 
                      'may face some challenges'} as a pair. {compatibilityScore >= 75 ? 
                      'Your connection is characterized by mutual understanding and complementary traits.' : 
                      'With effort and awareness, you can overcome the natural friction in this relationship.'}
                  </p>
                  {user?.isPremium && (
                    <button className="btn btn-outline text-sm flex items-center">
                      <Download className="mr-2 h-4 w-4" />
                      Download Full Report
                    </button>
                  )}
                </div>
              </div>
              
              {/* Compatibility Areas */}
              <div>
                <h3 className="font-bold text-lg mb-4">Compatibility Areas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {areaScores && Object.entries(areaScores).map(([area, score]) => (
                    <div key={area} className="bg-surface/70 rounded-lg p-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{area}</span>
                        <span className={`font-bold ${getScoreColor(score)}`}>{score}%</span>
                      </div>
                      <div className="w-full bg-background/50 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className={`h-1.5 rounded-full ${
                            score >= 80 ? 'bg-accent' : 
                            score >= 70 ? 'bg-amber-500' : 
                            score >= 60 ? 'bg-orange-500' : 
                            'bg-red-500'
                          }`}
                          style={{ width: `${score}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Strengths & Challenges */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="bg-surface/70 rounded-lg p-4">
                  <h3 className="font-bold text-lg mb-3 flex items-center">
                    <Check className="mr-2 h-5 w-5 text-highlight" />
                    Relationship Strengths
                  </h3>
                  <ul className="space-y-2">
                    {[
                      `${sign1}'s ${compatibilityScore > 75 ? 'passion' : 'patience'} complements ${sign2}'s ${compatibilityScore > 75 ? 'stability' : 'creativity'}`,
                      `You share ${compatibilityScore > 80 ? 'strong' : 'some'} common interests and values`,
                      `Communication flows ${compatibilityScore > 70 ? 'naturally' : 'adequately'} between you`,
                      `You balance each other's ${compatibilityScore > 75 ? 'energies perfectly' : 'weaknesses somewhat'}`
                    ].map((strength, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-highlight mr-2">•</span>
                        <span className="text-white/80 text-sm">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-surface/70 rounded-lg p-4">
                  <h3 className="font-bold text-lg mb-3 flex items-center">
                    <X className="mr-2 h-5 w-5 text-error" />
                    Relationship Challenges
                  </h3>
                  <ul className="space-y-2">
                    {[
                      `${sign1}'s ${compatibilityScore < 75 ? 'stubbornness' : 'independence'} may clash with ${sign2}'s ${compatibilityScore < 75 ? 'need for control' : 'sensitivity'}`,
                      `Different approaches to ${compatibilityScore < 70 ? 'handling conflict' : 'making decisions'}`,
                      `Potential misunderstandings in ${compatibilityScore < 80 ? 'emotional expression' : 'communication styles'}`,
                      `Balancing ${compatibilityScore < 75 ? 'personal space and togetherness' : 'long-term goals'}`
                    ].map((challenge, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-error mr-2">•</span>
                        <span className="text-white/80 text-sm">{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Premium Details */}
              {!user?.isPremium ? (
                <div className="mt-8 bg-surface/70 rounded-lg p-4 border border-accent/20">
                  <h3 className="font-bold flex items-center mb-3">
                    <Star className="h-4 w-4 text-accent mr-2" />
                    Detailed Synastry Analysis
                  </h3>
                  <p className="text-white/80 text-sm mb-3">
                    Upgrade to Premium for a complete relationship compatibility analysis, 
                    including planetary aspects between birth charts, long-term predictions, 
                    and personalized advice for your relationship.
                  </p>
                  <a href="/upgrade" className="btn btn-accent btn-sm">
                    Upgrade to Premium
                  </a>
                </div>
              ) : (
                <div className="mt-8">
                  <h3 className="font-bold text-lg mb-4 flex items-center">
                    <Star className="mr-2 h-5 w-5 text-accent" fill="currentColor" />
                    Planetary Aspects & Synastry
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="bg-surface/70 rounded-lg p-4">
                      <h4 className="font-bold mb-2">Sun-Moon Aspects</h4>
                      <p className="text-white/80 text-sm">
                        {sign1}'s Sun forms a {compatibilityScore > 75 ? 'harmonious trine' : 'challenging square'} with {sign2}'s Moon, 
                        indicating {compatibilityScore > 75 ? 'a natural emotional connection and mutual understanding' : 
                        'some tension between personal identity and emotional needs'}. This aspect is fundamental 
                        to how you relate to each other on a core level.
                      </p>
                    </div>
                    
                    <div className="bg-surface/70 rounded-lg p-4">
                      <h4 className="font-bold mb-2">Venus-Mars Dynamics</h4>
                      <p className="text-white/80 text-sm">
                        The relationship between your Venus and Mars positions suggests 
                        {compatibilityScore > 80 ? ' strong physical attraction and complementary approaches to love and desire' : 
                        compatibilityScore > 70 ? ' moderate romantic compatibility with some work needed to align your love languages' :
                        ' potential challenges in how you express affection and desire that will require open communication'}.
                      </p>
                    </div>
                    
                    <div className="bg-surface/70 rounded-lg p-4">
                      <h4 className="font-bold mb-2">Mercury Compatibility</h4>
                      <p className="text-white/80 text-sm">
                        Your Mercury signs are in {compatibilityScore > 75 ? 'complementary elements' : 'challenging aspects'}, 
                        which means communication between you is {compatibilityScore > 75 ? 'generally fluid and understanding' : 
                        'an area requiring conscious effort'}. Learning each other's communication styles will 
                        be {compatibilityScore > 75 ? 'intuitive and natural' : 'important for relationship growth'}.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Compatibility Tips */}
              <div className="mt-8 bg-surface/70 rounded-lg p-4 border-l-4 border-accent">
                <h3 className="font-bold mb-3 flex items-center">
                  <Sparkles className="mr-2 h-5 w-5 text-accent" />
                  Cosmic Tips for Your Relationship
                </h3>
                <ul className="space-y-2">
                  {[
                    `Embrace your ${compatibilityScore > 75 ? 'complementary' : 'different'} qualities as strengths rather than obstacles`,
                    `Practice active listening to ${compatibilityScore > 80 ? 'enhance' : 'improve'} your already ${compatibilityScore > 80 ? 'strong' : 'developing'} communication`,
                    `Schedule quality time that honors both your needs and preferences`,
                    `Remember that cosmic compatibility is a guide, not a guarantee - relationships require nurturing regardless of the stars`
                  ].map((tip, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-accent mr-2">•</span>
                      <span className="text-white/80 text-sm">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </MainLayout>
  );
};

export default CompatibilityPage;