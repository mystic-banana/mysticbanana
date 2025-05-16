import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { format, addDays } from 'date-fns';
import { useUser } from '../contexts/UserContext';
import MainLayout from '../components/layout/MainLayout';
import { CloudMoon, ChevronRight, Star, FileText, CalendarDays, Sun, Moon, Sparkles, ArrowRight, ArrowLeft, Heart, Briefcase, Brain, Coins, Merge as Energy, Clock } from 'lucide-react';

// Sample zodiac data
const zodiacSigns = [
  { name: 'Aries', dates: 'Mar 21 - Apr 19', element: 'Fire', ruling: 'Mars' },
  { name: 'Taurus', dates: 'Apr 20 - May 20', element: 'Earth', ruling: 'Venus' },
  { name: 'Gemini', dates: 'May 21 - Jun 20', element: 'Air', ruling: 'Mercury' },
  { name: 'Cancer', dates: 'Jun 21 - Jul 22', element: 'Water', ruling: 'Moon' },
  { name: 'Leo', dates: 'Jul 23 - Aug 22', element: 'Fire', ruling: 'Sun' },
  { name: 'Virgo', dates: 'Aug 23 - Sep 22', element: 'Earth', ruling: 'Mercury' },
  { name: 'Libra', dates: 'Sep 23 - Oct 22', element: 'Air', ruling: 'Venus' },
  { name: 'Scorpio', dates: 'Oct 23 - Nov 21', element: 'Water', ruling: 'Pluto' },
  { name: 'Sagittarius', dates: 'Nov 22 - Dec 21', element: 'Fire', ruling: 'Jupiter' },
  { name: 'Capricorn', dates: 'Dec 22 - Jan 19', element: 'Earth', ruling: 'Saturn' },
  { name: 'Aquarius', dates: 'Jan 20 - Feb 18', element: 'Air', ruling: 'Uranus' },
  { name: 'Pisces', dates: 'Feb 19 - Mar 20', element: 'Water', ruling: 'Neptune' }
];

type HoroscopeType = 'daily' | 'weekly' | 'monthly' | 'yearly';

const HoroscopePage: React.FC = () => {
  const { user } = useUser();
  const [selectedSign, setSelectedSign] = useState(user?.zodiacSign || 'Aries');
  const [horoscopeType, setHoroscopeType] = useState<HoroscopeType>('daily');
  const [currentDayOffset, setCurrentDayOffset] = useState(0);
  
  // Get selected zodiac sign details
  const selectedZodiacDetails = zodiacSigns.find(sign => sign.name === selectedSign) || zodiacSigns[0];
  
  // Format the date based on horoscope type and day offset
  const getFormattedDate = () => {
    const today = new Date();
    const targetDate = addDays(today, currentDayOffset);
    
    if (horoscopeType === 'daily') {
      return format(targetDate, 'EEEE, MMMM do, yyyy');
    } else if (horoscopeType === 'weekly') {
      const endOfWeek = addDays(targetDate, 6);
      return `${format(targetDate, 'MMM do')} - ${format(endOfWeek, 'MMM do, yyyy')}`;
    } else if (horoscopeType === 'monthly') {
      return format(targetDate, 'MMMM yyyy');
    } else {
      return format(targetDate, 'yyyy');
    }
  };
  
  // Determine if user can access this horoscope type
  const canAccessHoroscopeType = (type: HoroscopeType) => {
    if (type === 'daily') return true;
    return user?.isPremium;
  };
  
  // Handle navigation for day/week/month/year
  const handlePrevious = () => {
    let offset = currentDayOffset;
    if (horoscopeType === 'daily') offset -= 1;
    else if (horoscopeType === 'weekly') offset -= 7;
    else if (horoscopeType === 'monthly') offset -= 30;
    else offset -= 365;
    setCurrentDayOffset(offset);
  };
  
  const handleNext = () => {
    let offset = currentDayOffset;
    if (horoscopeType === 'daily') offset += 1;
    else if (horoscopeType === 'weekly') offset += 7;
    else if (horoscopeType === 'monthly') offset += 30;
    else offset += 365;
    setCurrentDayOffset(offset);
  };
  
  const resetToToday = () => {
    setCurrentDayOffset(0);
  };

  return (
    <MainLayout showSidebar>
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-cinzel font-bold flex items-center">
              <CloudMoon className="mr-3 h-6 w-6 text-accent" />
              Horoscope
            </h1>
            <p className="text-white/70 mt-1">
              Cosmic insights for your zodiac sign
            </p>
          </div>
          
          {user?.isPremium && (
            <div className="mt-4 md:mt-0 flex items-center">
              <div className="mr-3 bg-accent/20 text-accent text-xs px-3 py-1 rounded-full flex items-center">
                <Star className="w-3 h-3 mr-1" fill="currentColor" />
                Premium Access
              </div>
              <button className="btn btn-outline flex items-center">
                <FileText className="mr-2 h-4 w-4" />
                Download as PDF
              </button>
            </div>
          )}
        </div>
        
        {/* Zodiac Sign Selection */}
        <div className="card mb-8">
          <h2 className="text-xl font-cinzel font-bold mb-6 flex items-center">
            <Sun className="mr-2 h-5 w-5 text-accent" />
            Choose Your Zodiac Sign
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {zodiacSigns.map(sign => (
              <div
                key={sign.name}
                className={`rounded-lg border transition-all cursor-pointer overflow-hidden ${
                  selectedSign === sign.name
                    ? 'border-accent bg-accent/10'
                    : 'border-white/10 bg-surface hover:bg-surface/80'
                }`}
                onClick={() => setSelectedSign(sign.name)}
              >
                <div className="p-4 text-center">
                  <h3 className="font-bold mb-1">{sign.name}</h3>
                  <p className="text-white/70 text-xs">{sign.dates}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Horoscope Type Selection */}
        <div className="card mb-8">
          <h2 className="text-xl font-cinzel font-bold mb-6 flex items-center">
            <CalendarDays className="mr-2 h-5 w-5 text-accent" />
            Choose Reading Type
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div 
              className={`relative rounded-lg border transition-all cursor-pointer overflow-hidden ${
                horoscopeType === 'daily'
                  ? 'border-accent bg-accent/10'
                  : 'border-white/10 bg-surface hover:bg-surface/80'
              }`}
              onClick={() => setHoroscopeType('daily')}
            >
              <div className="p-4 text-center">
                <h3 className="font-bold mb-1">Daily</h3>
                <p className="text-white/70 text-xs">Today's cosmic weather</p>
                <div className="mt-2">
                  <div className="badge badge-primary">Free</div>
                </div>
              </div>
            </div>
            
            {['weekly', 'monthly', 'yearly'].map((type) => (
              <div 
                key={type}
                className={`relative rounded-lg border transition-all overflow-hidden ${
                  canAccessHoroscopeType(type as HoroscopeType)
                    ? 'cursor-pointer'
                    : 'opacity-60 cursor-not-allowed'
                } ${
                  horoscopeType === type
                    ? 'border-accent bg-accent/10'
                    : 'border-white/10 bg-surface hover:bg-surface/80'
                }`}
                onClick={() => canAccessHoroscopeType(type as HoroscopeType) && setHoroscopeType(type as HoroscopeType)}
              >
                <div className="p-4 text-center">
                  <h3 className="font-bold mb-1 capitalize">{type}</h3>
                  <p className="text-white/70 text-xs">
                    {type === 'weekly' ? '7-day forecast' : 
                     type === 'monthly' ? 'Month ahead' : 'Year ahead'}
                  </p>
                  <div className="mt-2">
                    <div className="badge flex items-center gap-1 bg-accent/20 text-accent">
                      <Star className="w-3 h-3" /> Premium
                    </div>
                  </div>
                </div>
                
                {!canAccessHoroscopeType(type as HoroscopeType) && (
                  <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center">
                    <a href="/upgrade" className="btn btn-accent btn-sm">
                      Upgrade to Access
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Horoscope Display */}
        <div className="card">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <h2 className="text-2xl font-cinzel font-bold flex items-center mb-2 md:mb-0">
              {selectedSign} {horoscopeType.charAt(0).toUpperCase() + horoscopeType.slice(1)} Horoscope
            </h2>
            
            <div className="flex items-center">
              <button 
                onClick={handlePrevious}
                className="btn btn-outline btn-sm mr-2"
                disabled={currentDayOffset <= (horoscopeType === 'daily' ? -7 : -1)}
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              
              <button 
                onClick={resetToToday}
                className="btn btn-outline btn-sm mr-2"
                disabled={currentDayOffset === 0}
              >
                Today
              </button>
              
              <button 
                onClick={handleNext}
                className="btn btn-outline btn-sm"
                disabled={currentDayOffset >= (horoscopeType === 'daily' ? 7 : 1)}
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <div className="bg-surface/50 rounded-lg p-6">
            {/* Zodiac Sign Details */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 pb-6 border-b border-white/10">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mr-4">
                  <Sun className="h-8 w-8 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{selectedSign}</h3>
                  <p className="text-white/70">{selectedZodiacDetails.dates}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <div className="bg-surface/70 rounded-lg px-4 py-2">
                  <p className="text-white/70 text-xs">Element</p>
                  <p className="font-semibold">{selectedZodiacDetails.element}</p>
                </div>
                <div className="bg-surface/70 rounded-lg px-4 py-2">
                  <p className="text-white/70 text-xs">Ruling Planet</p>
                  <p className="font-semibold">{selectedZodiacDetails.ruling}</p>
                </div>
                <div className="bg-surface/70 rounded-lg px-4 py-2">
                  <p className="text-white/70 text-xs">For</p>
                  <p className="font-semibold">{getFormattedDate()}</p>
                </div>
              </div>
            </div>
            
            {/* Main Horoscope Content */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-3">Overview</h3>
                <p className="text-white/80">
                  Today brings a surge of creative energy for {selectedSign}. You may feel inspired
                  to start new projects or revisit old ones with fresh perspective. Your natural 
                  {selectedZodiacDetails.element === 'Fire' ? ' passion' : 
                   selectedZodiacDetails.element === 'Earth' ? ' practicality' : 
                   selectedZodiacDetails.element === 'Air' ? ' intellect' : ' intuition'} 
                  will guide you through any challenges. Take time to connect with loved ones,
                  as meaningful conversations will strengthen your bonds.
                </p>
              </div>
              
              {/* Aspect Ratings */}
              <div>
                <h3 className="text-lg font-bold mb-3">Cosmic Ratings</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { name: 'Love', icon: <Heart className="h-4 w-4" />, rating: 4 },
                    { name: 'Career', icon: <Briefcase className="h-4 w-4" />, rating: 3 },
                    { name: 'Wellness', icon: <Energy className="h-4 w-4" />, rating: 5 },
                    { name: 'Money', icon: <Coins className="h-4 w-4" />, rating: 3 },
                    { name: 'Wisdom', icon: <Brain className="h-4 w-4" />, rating: 4 },
                    { name: 'Luck', icon: <Sparkles className="h-4 w-4" />, rating: 2 }
                  ].map(aspect => (
                    <div key={aspect.name} className="bg-surface/70 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className="bg-accent/20 p-1.5 rounded-full mr-2">
                            {aspect.icon}
                          </div>
                          <span className="font-medium">{aspect.name}</span>
                        </div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-3.5 h-3.5 ${i < aspect.rating ? 'text-accent fill-accent' : 'text-white/30'} mr-0.5`} 
                            />
                          ))}
                        </div>
                      </div>
                      <div className="w-full bg-background/50 rounded-full h-1.5">
                        <div 
                          className="bg-accent h-1.5 rounded-full"
                          style={{ width: `${aspect.rating * 20}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Detailed Sections - Only for Premium Users */}
              {user?.isPremium ? (
                <>
                  <div>
                    <h3 className="text-lg font-bold mb-3 flex items-center">
                      <Star className="mr-2 h-4 w-4 text-accent" fill="currentColor" />
                      Love & Relationships
                    </h3>
                    <p className="text-white/80">
                      Your ruling planet {selectedZodiacDetails.ruling} is forming a harmonious aspect with Venus today,
                      highlighting connections and intimacy. For singles, this is an excellent time to put yourself
                      out there as your natural charisma is enhanced. Those in relationships will find deep satisfaction
                      in honest conversations and shared activities with their partner.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold mb-3 flex items-center">
                      <Star className="mr-2 h-4 w-4 text-accent" fill="currentColor" />
                      Career & Finance
                    </h3>
                    <p className="text-white/80">
                      Professional matters require careful attention as Mercury influences your work sector.
                      Your communication skills are heightened, making this an ideal time for presentations,
                      interviews, or important meetings. Financially, be cautious with impulse purchases and
                      consider long-term investments rather than quick gains.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold mb-3 flex items-center">
                      <Star className="mr-2 h-4 w-4 text-accent" fill="currentColor" />
                      Health & Wellness
                    </h3>
                    <p className="text-white/80">
                      Your energy levels are strong today, but be mindful not to overextend yourself.
                      The Moon's position suggests focusing on balance in your routines. Activities that
                      connect mind and body, such as yoga or walking in nature, will be particularly
                      beneficial for your overall wellbeing.
                    </p>
                  </div>
                </>
              ) : (
                <div className="bg-surface/70 rounded-lg p-4 border border-accent/20">
                  <h3 className="font-bold flex items-center mb-3">
                    <Star className="h-4 w-4 text-accent mr-2" />
                    Detailed Insights
                  </h3>
                  <p className="text-white/80 text-sm mb-3">
                    Upgrade to Premium to unlock detailed insights about love, career, finance,
                    health, and personalized cosmic guidance based on your birth chart.
                  </p>
                  <a href="/upgrade" className="btn btn-accent btn-sm">
                    Upgrade to Premium
                  </a>
                </div>
              )}
              
              {/* Lucky Elements */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  { name: 'Lucky Color', value: 'Emerald Green' },
                  { name: 'Lucky Number', value: '7' },
                  { name: 'Lucky Time', value: '3:00 PM' },
                  { name: 'Power Crystal', value: 'Amethyst' }
                ].map(item => (
                  <div key={item.name} className="bg-surface/70 rounded-lg p-3 text-center">
                    <p className="text-white/70 text-xs uppercase tracking-wider mb-1">{item.name}</p>
                    <p className="font-semibold">{item.value}</p>
                  </div>
                ))}
              </div>
              
              {/* Planetary Aspects - Premium Only */}
              {user?.isPremium && (
                <div>
                  <h3 className="text-lg font-bold mb-3 flex items-center">
                    <Star className="mr-2 h-4 w-4 text-accent" fill="currentColor" />
                    Planetary Aspects
                  </h3>
                  <div className="space-y-3">
                    {[
                      { planets: 'Sun trine Moon', impact: 'Emotional harmony and balance in your personal life' },
                      { planets: 'Venus square Mars', impact: 'Tension between desires and actions, particularly in relationships' },
                      { planets: 'Mercury sextile Jupiter', impact: 'Enhanced communication and learning opportunities' }
                    ].map((aspect, index) => (
                      <div key={index} className="bg-surface/70 rounded-lg p-3">
                        <div className="flex items-center">
                          <div className="bg-accent/20 p-1.5 rounded-full mr-3">
                            <Moon className="h-4 w-4 text-accent" />
                          </div>
                          <div>
                            <h4 className="font-medium">{aspect.planets}</h4>
                            <p className="text-white/70 text-sm">{aspect.impact}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Tomorrow Preview */}
              <div className="bg-surface/70 rounded-lg p-4 border-l-4 border-accent">
                <div className="flex items-center">
                  <div className="bg-accent/20 p-2 rounded-full mr-4">
                    <Clock className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Tomorrow's Preview</h3>
                    <p className="text-white/80 text-sm">
                      Prepare for a day of unexpected opportunities as Jupiter aligns with your sign.
                      Social connections will play a key role in your personal growth.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default HoroscopePage;