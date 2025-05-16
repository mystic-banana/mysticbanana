import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../../contexts/UserContext';
import { Menu, X, MoonStar, Sun, User, LogOut, Star } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, isAuthenticated, logout } = useUser();
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/90 backdrop-blur-md shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              className="text-accent"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <MoonStar className="w-8 h-8 text-accent" />
            </motion.div>
            <h1 className="text-xl md:text-2xl font-cinzel font-bold bg-clip-text text-transparent gold-gradient">
              Mystic Banana
            </h1>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'text-accent' : 'text-white/80'}`}>
              Home
            </Link>
            <Link to="/horoscope" className={`nav-link ${location.pathname === '/horoscope' ? 'text-accent' : 'text-white/80'}`}>
              Horoscope
            </Link>
            <Link to="/tarot" className={`nav-link ${location.pathname === '/tarot' ? 'text-accent' : 'text-white/80'}`}>
              Tarot
            </Link>
            <Link to="/compatibility" className={`nav-link ${location.pathname === '/compatibility' ? 'text-accent' : 'text-white/80'}`}>
              Compatibility
            </Link>
          </div>
          
          {/* User Account / Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                {user?.isPremium && (
                  <span className="inline-flex items-center gap-1 bg-accent/20 text-accent text-xs px-2 py-1 rounded-full">
                    <Star className="w-3 h-3" /> Premium
                  </span>
                )}
                <Link to="/dashboard" className="flex items-center space-x-2 text-white/80 hover:text-accent">
                  <User className="w-5 h-5" />
                  <span>Dashboard</span>
                </Link>
                <button 
                  onClick={logout}
                  className="flex items-center space-x-2 text-white/80 hover:text-accent"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="btn btn-outline py-1.5">Login</Link>
                <Link to="/register" className="btn btn-accent py-1.5">Sign Up</Link>
              </div>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white focus:outline-none"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-surface/95 backdrop-blur-lg"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <Link to="/" className="py-2 text-white/80 hover:text-accent">
                Home
              </Link>
              <Link to="/horoscope" className="py-2 text-white/80 hover:text-accent">
                Horoscope
              </Link>
              <Link to="/tarot" className="py-2 text-white/80 hover:text-accent">
                Tarot
              </Link>
              <Link to="/compatibility" className="py-2 text-white/80 hover:text-accent">
                Compatibility
              </Link>
              
              <div className="pt-2 border-t border-white/10">
                {isAuthenticated ? (
                  <>
                    <Link to="/dashboard" className="flex items-center space-x-2 py-2 text-white/80 hover:text-accent">
                      <User className="w-5 h-5" />
                      <span>Dashboard</span>
                    </Link>
                    <button 
                      onClick={logout}
                      className="flex items-center space-x-2 py-2 text-white/80 hover:text-accent"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <Link to="/login" className="btn btn-outline w-full">Login</Link>
                    <Link to="/register" className="btn btn-accent w-full">Sign Up</Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;