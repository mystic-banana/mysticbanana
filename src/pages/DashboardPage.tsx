import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { useUser } from '../contexts/UserContext';
import MainLayout from '../components/layout/MainLayout';
import { 
  CloudMoon, 
  Sparkles, 
  HeartHandshake, 
  ChevronRight,
  Star,
  CloudSun,
  Moon,
  FileText,
  Calendar
} from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { user } = useUser();
  const today = new Date();
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <MainLayout showSidebar>
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-8"
      >
        {/* Header */}
        <motion.div variants={item}>
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-cinzel font-bold">
                Welcome Back, {user?.name?.split(' ')[0] || 'Seeker'}
              </h1>
              <p className="text-white/70">
                {format(today, 'EEEE, MMMM do, yyyy')} | {user?.zodiacSign} {user?.isPremium && '• Premium'}
              </p>
            </div>
            
            {!user?.isPremium && (
              <div className="mt-4 md:mt-0">
                <a href="/upgrade" className="btn btn-accent inline-flex items-center text-sm">
                  <Star className="mr-2 h-4 w-4" />
                  Upgrade to Premium
                </a>
              </div>
            )}
          </div>
        </motion.div>
        
        {/* Today's Cosmic Insights */}
        <motion.div variants={item}>
          <div className="card bg-gradient-to-br from-primary/30 to-surface border-t border-l border-white/10">
            <h2 className="text-xl font-cinzel font-bold mb-4 flex items-center">
              <CloudSun className="mr-2 h-5 w-5 text-accent" />
              Today's Cosmic Insights
            </h2>
            
            <div className="bg-background/40 rounded-lg p-4 mb-4">
              <div className="flex items-start">
                <div className="bg-accent/20 rounded-full p-2 mr-4">
                  <CloudMoon className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Daily Horoscope for {user?.zodiacSign}</h3>
                  <p className="text-white/80 text-sm">
                    Today brings powerful energy for creative projects. You'll feel a surge of inspiration 
                    around midday that could lead to an exciting breakthrough. Personal connections are 
                    highlighted, with meaningful conversations deepening your relationships.
                  </p>
                  <div className="mt-2">
                    <a href="/horoscope" className="text-accent text-sm flex items-center hover:underline">
                      Full horoscope <ChevronRight className="ml-1 h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-background/40 rounded-lg p-4">
                <div className="flex items-start">
                  <div className="bg-accent/20 rounded-full p-2 mr-4">
                    <Moon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Planetary Transits</h3>
                    <p className="text-white/80 text-sm">
                      Venus is entering your house of creativity, bringing harmonious energy 
                      to your personal projects and relationships for the next month.
                    </p>
                    {user?.isPremium ? (
                      <div className="mt-2">
                        <a href="/transits" className="text-accent text-sm flex items-center hover:underline">
                          View transit chart <ChevronRight className="ml-1 h-4 w-4" />
                        </a>
                      </div>
                    ) : (
                      <div className="mt-2 flex items-center">
                        <Star className="h-4 w-4 text-accent mr-1" />
                        <span className="text-white/60 text-xs">Premium feature</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="bg-background/40 rounded-lg p-4">
                <div className="flex items-start">
                  <div className="bg-accent/20 rounded-full p-2 mr-4">
                    <Calendar className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Upcoming Events</h3>
                    <ul className="text-white/80 text-sm space-y-1">
                      <li className="flex justify-between">
                        <span>Full Moon in Libra</span>
                        <span className="text-accent">Apr 23</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Mercury Retrograde Ends</span>
                        <span className="text-accent">May 14</span>
                      </li>
                    </ul>
                    <div className="mt-2">
                      <a href="/calendar" className="text-accent text-sm flex items-center hover:underline">
                        Full calendar <ChevronRight className="ml-1 h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Quick Access */}
        <motion.div variants={item}>
          <h2 className="text-xl font-cinzel font-bold mb-4">Quick Access</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a href="/tarot" className="card group hover:border-accent/30 transition-all duration-300">
              <div className="flex flex-col items-center text-center p-2">
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <Sparkles className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-cinzel font-bold mb-2">Daily Tarot</h3>
                <p className="text-white/70 text-sm mb-4">Draw your daily card for guidance</p>
                <span className="text-accent text-sm flex items-center">
                  Draw a card <ChevronRight className="ml-1 h-4 w-4" />
                </span>
              </div>
            </a>
            
            <a href="/horoscope" className="card group hover:border-accent/30 transition-all duration-300">
              <div className="flex flex-col items-center text-center p-2">
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <CloudMoon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-cinzel font-bold mb-2">Weekly Forecast</h3>
                <p className="text-white/70 text-sm mb-4">Your detailed weekly horoscope</p>
                <span className="text-accent text-sm flex items-center">
                  View forecast <ChevronRight className="ml-1 h-4 w-4" />
                </span>
              </div>
            </a>
            
            <a href="/compatibility" className="card group hover:border-accent/30 transition-all duration-300">
              <div className="flex flex-col items-center text-center p-2">
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <HeartHandshake className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-cinzel font-bold mb-2">Compatibility</h3>
                <p className="text-white/70 text-sm mb-4">Check your match with someone</p>
                <span className="text-accent text-sm flex items-center">
                  Check match <ChevronRight className="ml-1 h-4 w-4" />
                </span>
              </div>
            </a>
          </div>
        </motion.div>
        
        {/* Recent Readings */}
        <motion.div variants={item}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-cinzel font-bold">Recent Readings</h2>
            {user?.isPremium ? (
              <a href="/history" className="text-accent text-sm flex items-center hover:underline">
                View all <ChevronRight className="ml-1 h-4 w-4" />
              </a>
            ) : (
              <div className="flex items-center">
                <Star className="h-4 w-4 text-accent mr-1" />
                <span className="text-white/60 text-xs mr-2">Premium feature</span>
                <a href="/upgrade" className="text-accent text-sm hover:underline">Upgrade</a>
              </div>
            )}
          </div>
          
          <div className="bg-surface/50 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-background/40">
                  <th className="py-3 px-4 text-left text-xs font-medium text-white/60 uppercase tracking-wider">Type</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-white/60 uppercase tracking-wider">Date</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-white/60 uppercase tracking-wider">Summary</th>
                  {user?.isPremium && (
                    <th className="py-3 px-4 text-left text-xs font-medium text-white/60 uppercase tracking-wider">Actions</th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr>
                  <td className="py-3 px-4 whitespace-nowrap text-sm">
                    <div className="flex items-center">
                      <Sparkles className="h-4 w-4 text-accent mr-2" />
                      <span>Tarot Reading</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap text-sm text-white/70">Today</td>
                  <td className="py-3 px-4 text-sm text-white/70">Three Card Spread - Career Path</td>
                  {user?.isPremium && (
                    <td className="py-3 px-4 whitespace-nowrap text-sm">
                      <div className="flex space-x-2">
                        <button className="text-accent hover:text-accent/80">View</button>
                        <button className="text-accent hover:text-accent/80 flex items-center">
                          <FileText className="h-3 w-3 mr-1" /> PDF
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
                <tr>
                  <td className="py-3 px-4 whitespace-nowrap text-sm">
                    <div className="flex items-center">
                      <CloudMoon className="h-4 w-4 text-accent mr-2" />
                      <span>Horoscope</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap text-sm text-white/70">Yesterday</td>
                  <td className="py-3 px-4 text-sm text-white/70">Daily Forecast - {user?.zodiacSign}</td>
                  {user?.isPremium && (
                    <td className="py-3 px-4 whitespace-nowrap text-sm">
                      <div className="flex space-x-2">
                        <button className="text-accent hover:text-accent/80">View</button>
                        <button className="text-accent hover:text-accent/80 flex items-center">
                          <FileText className="h-3 w-3 mr-1" /> PDF
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
                <tr>
                  <td className="py-3 px-4 whitespace-nowrap text-sm">
                    <div className="flex items-center">
                      <HeartHandshake className="h-4 w-4 text-accent mr-2" />
                      <span>Compatibility</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap text-sm text-white/70">2 days ago</td>
                  <td className="py-3 px-4 text-sm text-white/70">Match with Aquarius</td>
                  {user?.isPremium && (
                    <td className="py-3 px-4 whitespace-nowrap text-sm">
                      <div className="flex space-x-2">
                        <button className="text-accent hover:text-accent/80">View</button>
                        <button className="text-accent hover:text-accent/80 flex items-center">
                          <FileText className="h-3 w-3 mr-1" /> PDF
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
        
        {/* Premium Banner - only show to non-premium users */}
        {!user?.isPremium && (
          <motion.div variants={item}>
            <div className="card bg-gradient-to-r from-primary to-secondary p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-stars opacity-30"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between">
                <div className="mb-6 md:mb-0 md:mr-6">
                  <h2 className="text-2xl font-cinzel font-bold text-accent mb-2">Unlock Premium Features</h2>
                  <p className="text-white/80 mb-4 max-w-xl">
                    Get full access to detailed birth charts, unlimited reading history, 
                    PDF exports of all your readings, and exclusive premium content.
                  </p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                    <li className="flex items-center text-white/80 text-sm">
                      <Star className="h-4 w-4 text-accent mr-2" />
                      Complete natal chart analysis
                    </li>
                    <li className="flex items-center text-white/80 text-sm">
                      <Star className="h-4 w-4 text-accent mr-2" />
                      Unlimited reading history
                    </li>
                    <li className="flex items-center text-white/80 text-sm">
                      <Star className="h-4 w-4 text-accent mr-2" />
                      PDF exports of all readings
                    </li>
                    <li className="flex items-center text-white/80 text-sm">
                      <Star className="h-4 w-4 text-accent mr-2" />
                      Exclusive premium content
                    </li>
                  </ul>
                  <a href="/upgrade" className="btn btn-accent inline-flex items-center">
                    <Star className="mr-2 h-5 w-5" />
                    Upgrade Now
                  </a>
                </div>
                
                <div className="hidden md:block relative">
                  <div className="w-40 h-40 bg-accent/20 rounded-full flex items-center justify-center animate-pulse-slow">
                    <div className="w-32 h-32 bg-accent/30 rounded-full flex items-center justify-center">
                      <div className="w-24 h-24 bg-accent/40 rounded-full flex items-center justify-center">
                        <Star className="h-16 w-16 text-accent" fill="currentColor" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </MainLayout>
  );
};

export default DashboardPage;