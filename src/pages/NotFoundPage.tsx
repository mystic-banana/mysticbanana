import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MoonStar, Home } from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';

const NotFoundPage: React.FC = () => {
  return (
    <MainLayout>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0.8, rotate: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ duration: 1, type: "spring" }}
            className="mb-8 inline-block"
          >
            <MoonStar className="h-24 w-24 text-accent" />
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-cinzel font-bold mb-6">
            <span className="text-transparent bg-clip-text gold-gradient">404</span>
            <span className="block mt-2">Cosmic Void</span>
          </h1>
          
          <p className="text-white/70 text-lg mb-8 max-w-md mx-auto">
            The stars couldn't align to find the page you're looking for. 
            Perhaps it's been lost in the cosmic expanse.
          </p>
          
          <Link to="/" className="btn btn-accent inline-flex items-center">
            <Home className="mr-2 h-5 w-5" />
            Return to the Observatory
          </Link>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default NotFoundPage;