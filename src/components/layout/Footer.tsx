import React from 'react';
import { Link } from 'react-router-dom';
import { MoonStar, Facebook, Twitter, Instagram, Mail, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-surface/50 backdrop-blur-md border-t border-white/5 mt-auto">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <MoonStar className="w-6 h-6 text-accent" />
              <h3 className="text-xl font-cinzel font-bold text-white">Mystic Banana</h3>
            </Link>
            <p className="text-white/70 text-sm mb-4">
              Your trusted source for spiritual guidance through astrology, tarot readings, and compatibility analysis.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/70 hover:text-accent transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-accent transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-accent transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-white font-cinzel font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/horoscope" className="text-white/70 hover:text-accent transition-colors">Daily Horoscope</Link></li>
              <li><Link to="/tarot" className="text-white/70 hover:text-accent transition-colors">Tarot Reading</Link></li>
              <li><Link to="/compatibility" className="text-white/70 hover:text-accent transition-colors">Compatibility</Link></li>
              <li><Link to="/login" className="text-white/70 hover:text-accent transition-colors">Login</Link></li>
              <li><Link to="/register" className="text-white/70 hover:text-accent transition-colors">Sign Up</Link></li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h4 className="text-white font-cinzel font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/70 hover:text-accent transition-colors">FAQ</a></li>
              <li><a href="#" className="text-white/70 hover:text-accent transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-white/70 hover:text-accent transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-white/70 hover:text-accent transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h4 className="text-white font-cinzel font-semibold mb-4">Subscribe</h4>
            <p className="text-white/70 text-sm mb-4">
              Get cosmic updates and spiritual insights delivered to your inbox.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="bg-background/50 text-white border border-white/10 rounded-l-lg px-4 py-2 w-full focus:outline-none focus:ring-1 focus:ring-accent"
              />
              <button type="submit" className="bg-accent text-background px-4 py-2 rounded-r-lg hover:bg-accent/90 transition-colors">
                <Mail className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/60 text-sm">
          <p className="flex items-center justify-center gap-1">
            Made with <Heart className="w-4 h-4 text-accent fill-accent" /> by Mystic Banana Team - &copy; {new Date().getFullYear()} All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;