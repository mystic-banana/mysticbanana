import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUser } from '../../contexts/UserContext';
import { 
  Home, 
  PieChart, 
  User, 
  Settings, 
  Star, 
  CloudMoon, 
  Sparkles, 
  HeartHandshake,
  History,
  FileText,
  Crown
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { user } = useUser();
  
  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <Home className="w-5 h-5" /> },
    { path: '/horoscope', label: 'Horoscope', icon: <CloudMoon className="w-5 h-5" /> },
    { path: '/tarot', label: 'Tarot', icon: <Sparkles className="w-5 h-5" /> },
    { path: '/compatibility', label: 'Compatibility', icon: <HeartHandshake className="w-5 h-5" /> },
    { path: '/history', label: 'Reading History', icon: <History className="w-5 h-5" /> },
    { path: '/profile', label: 'Profile', icon: <User className="w-5 h-5" /> },
    { path: '/settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
  ];
  
  if (user?.isPremium) {
    navItems.splice(4, 0, { path: '/reports', label: 'PDF Reports', icon: <FileText className="w-5 h-5" /> });
  }
  
  return (
    <div className="hidden md:block w-64 bg-surface/50 backdrop-blur-md border-r border-white/5 fixed h-full">
      <div className="h-full flex flex-col overflow-y-auto">
        {/* User Profile Summary */}
        <div className="p-4">
          <div className="text-center p-4">
            <div className="w-16 h-16 mx-auto bg-primary/30 rounded-full flex items-center justify-center mb-2 border-2 border-accent">
              <User className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-white font-medium truncate">{user?.name || 'Guest User'}</h3>
            <p className="text-white/60 text-sm truncate">{user?.zodiacSign || 'Unknown Sign'}</p>
            
            {user?.isPremium ? (
              <div className="mt-2 flex items-center justify-center gap-1 text-accent">
                <Crown className="w-4 h-4" />
                <span className="text-sm font-medium">Premium Member</span>
              </div>
            ) : (
              <Link to="/upgrade" className="mt-2 inline-flex items-center gap-1 text-sm text-white/80 hover:text-accent">
                <Star className="w-4 h-4" />
                <span>Upgrade to Premium</span>
              </Link>
            )}
          </div>
        </div>
        
        {/* Cosmic Stats */}
        <div className="px-4 mb-4">
          <div className="bg-background/40 rounded-lg p-3 border border-white/5">
            <h4 className="text-white/80 text-xs font-medium mb-2">Cosmic Stats</h4>
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center">
                <div className="text-accent font-bold text-lg">7</div>
                <div className="text-white/60 text-xs">Readings</div>
              </div>
              <div className="text-center">
                <div className="text-accent font-bold text-lg">3</div>
                <div className="text-white/60 text-xs">Forecasts</div>
              </div>
              <div className="text-center">
                <div className="text-accent font-bold text-lg">12</div>
                <div className="text-white/60 text-xs">Days</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? 'bg-accent/20 text-accent'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  
                  {location.pathname === item.path && (
                    <motion.div
                      layoutId="sidebar-active-indicator"
                      className="absolute right-0 w-1 h-8 bg-accent rounded-l-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Premium Upgrade Banner (only for non-premium users) */}
        {!user?.isPremium && (
          <div className="p-4">
            <div className="bg-gradient-to-br from-primary to-secondary p-4 rounded-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-stars opacity-30"></div>
              
              <div className="relative z-10">
                <h4 className="text-accent font-cinzel font-bold mb-2">Unlock Premium</h4>
                <p className="text-white/80 text-sm mb-3">Access full readings, PDF reports, and exclusive features.</p>
                <Link to="/upgrade" className="btn btn-accent text-sm py-1.5 w-full">
                  Upgrade Now
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;