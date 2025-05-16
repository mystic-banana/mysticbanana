import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUser } from '../../contexts/UserContext';
import Navbar from './Navbar';
import Footer from './Footer';
import Sidebar from './Sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, showSidebar = false }) => {
  const { isAuthenticated } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  // Check if user is trying to access protected routes
  React.useEffect(() => {
    const protectedRoutes = ['/dashboard', '/horoscope', '/tarot', '/compatibility'];
    if (protectedRoutes.includes(location.pathname) && !isAuthenticated) {
      navigate('/login', { state: { from: location.pathname } });
    }
  }, [location.pathname, isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
      {/* Background elements */}
      <div className="fixed inset-0 bg-stars opacity-30 pointer-events-none"></div>
      <div className="fixed inset-0 bg-gradient-to-b from-primary/20 via-background to-background pointer-events-none"></div>
      
      {/* Animated stars/particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7 + 0.3,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
      
      <Navbar />
      
      <div className="flex-1 flex flex-col md:flex-row">
        {showSidebar && isAuthenticated && (
          <Sidebar />
        )}
        
        <main className={`flex-1 px-4 py-6 md:p-8 ${showSidebar ? 'md:ml-64' : ''}`}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            className="container mx-auto"
          >
            {children}
          </motion.div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default MainLayout;