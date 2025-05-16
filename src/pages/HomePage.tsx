import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CloudMoon, 
  Sparkles, 
  HeartHandshake, 
  ArrowRight, 
  Star,
  FileText,
  Bot,
  ChevronRight
} from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';

const HomePage: React.FC = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  const features = [
    {
      icon: <CloudMoon className="w-6 h-6 text-accent" />,
      title: "Horoscope & Astrology",
      description: "Daily, weekly, and monthly horoscopes based on your exact birth details.",
      link: "/horoscope"
    },
    {
      icon: <Sparkles className="w-6 h-6 text-accent" />,
      title: "Tarot Readings",
      description: "Discover insights through mystical tarot card readings.",
      link: "/tarot"
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-accent" />,
      title: "Compatibility Analysis",
      description: "Find your perfect match with our compatibility reports.",
      link: "/compatibility"
    }
  ];

  const premiumFeatures = [
    {
      icon: <Star className="w-5 h-5" />,
      title: "Full Natal Chart Analysis",
      description: "Detailed analysis of your complete birth chart."
    },
    {
      icon: <FileText className="w-5 h-5" />,
      title: "PDF Reports & Downloads",
      description: "Save and download all your readings as beautiful PDFs."
    },
    {
      icon: <Bot className="w-5 h-5" />,
      title: "AI Oracle Consultations",
      description: "Ask questions and receive personalized guidance."
    }
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-cinzel font-bold mb-6 bg-clip-text text-transparent gold-gradient">
              Discover Your Cosmic Path
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8">
              Personalized astrology, tarot readings, and compatibility analysis
              to illuminate your spiritual journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="btn btn-accent py-3 px-8">
                Start Your Journey
              </Link>
              <Link to="/horoscope" className="btn btn-outline py-3 px-8">
                Free Horoscope
              </Link>
            </div>
          </motion.div>
          
          {/* Floating celestial elements */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute top-20 left-[10%] w-20 h-20 opacity-60"
              animate={{ rotate: 360 }}
              transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-full h-full rounded-full bg-gradient-to-r from-primary to-accent blur-xl"></div>
            </motion.div>
            <motion.div
              className="absolute bottom-10 right-[15%] w-16 h-16 opacity-40"
              animate={{ rotate: -360 }}
              transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-full h-full rounded-full bg-gradient-to-r from-accent to-highlight blur-xl"></div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-gradient-to-b from-background to-surface/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-cinzel font-bold mb-4"
            >
              Mystical Services
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              whileInView={{ opacity: 1, width: "80px" }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="h-1 bg-accent mx-auto mb-6"
            ></motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-white/70 max-w-2xl mx-auto"
            >
              Explore our spiritual offerings designed to provide clarity
              and guidance on your cosmic journey.
            </motion.p>
          </div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="card group hover:border-accent/30 transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-cinzel font-bold mb-3">{feature.title}</h3>
                  <p className="text-white/70 mb-6">{feature.description}</p>
                  <Link to={feature.link} className="flex items-center text-accent group-hover:text-white group-hover:bg-accent px-4 py-2 rounded-full transition-colors">
                    <span>Explore</span>
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Premium Features Section */}
      <section className="py-16 bg-surface/30 backdrop-blur-lg">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-cinzel font-bold mb-6">Unlock Premium Cosmic Powers</h2>
              <div className="h-1 w-20 bg-accent mb-6"></div>
              <p className="text-white/70 mb-8">
                Elevate your spiritual journey with our premium features. Gain deeper insights,
                save your readings, and access exclusive AI-powered guidance.
              </p>
              
              <ul className="space-y-4 mb-8">
                {premiumFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <div className="mt-1 bg-accent/20 p-2 rounded-full text-accent mr-4">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">{feature.title}</h4>
                      <p className="text-white/70 text-sm">{feature.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
              
              <Link to="/upgrade" className="btn btn-accent inline-flex items-center">
                <span>Upgrade to Premium</span>
                <ChevronRight className="ml-2 w-5 h-5" />
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square max-w-md mx-auto rounded-full bg-gradient-to-br from-primary/40 via-accent/20 to-highlight/30 p-0.5">
                <div className="w-full h-full rounded-full bg-surface/80 backdrop-blur-md overflow-hidden relative">
                  <div className="absolute inset-0 bg-stars opacity-30"></div>
                  
                  {/* Orbit elements */}
                  <motion.div 
                    className="absolute inset-0"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="absolute top-1/2 left-1/2 w-3/4 h-3/4 -translate-x-1/2 -translate-y-1/2 border border-accent/30 rounded-full"></div>
                    <div className="absolute top-[15%] left-[50%] w-3 h-3 bg-accent rounded-full shadow-neon"></div>
                  </motion.div>
                  
                  <motion.div 
                    className="absolute inset-0"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="absolute top-1/2 left-1/2 w-1/2 h-1/2 -translate-x-1/2 -translate-y-1/2 border border-white/20 rounded-full"></div>
                    <div className="absolute top-[70%] left-[50%] w-4 h-4 bg-highlight rounded-full shadow-sm"></div>
                  </motion.div>
                  
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center">
                    <Star className="w-8 h-8 text-accent" fill="currentColor" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-cinzel font-bold mb-4"
            >
              Cosmic Testimonials
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              whileInView={{ opacity: 1, width: "80px" }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="h-1 bg-accent mx-auto mb-6"
            ></motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Jessica R.",
                title: "Astrology Enthusiast",
                quote: "The birth chart reading was incredibly accurate! I've gained so much clarity about my life path.",
                stars: 5
              },
              {
                name: "Michael T.",
                title: "Premium Member",
                quote: "The compatibility report helped me understand my relationship dynamics. Well worth the premium upgrade!",
                stars: 5
              },
              {
                name: "Aisha K.",
                title: "Spiritual Seeker",
                quote: "I consult my tarot reading every morning. It's become an essential part of my daily routine.",
                stars: 4
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card hover:border-accent/30 transition-all duration-300"
              >
                <div className="flex flex-col">
                  <div className="flex mb-4">
                    {[...Array(testimonial.stars)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-accent fill-accent mr-1" />
                    ))}
                    {[...Array(5 - testimonial.stars)].map((_, i) => (
                      <Star key={i + testimonial.stars} className="w-5 h-5 text-accent/30 mr-1" />
                    ))}
                  </div>
                  <blockquote className="text-white/80 italic mb-6">"{testimonial.quote}"</blockquote>
                  <div className="mt-auto">
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-white/60 text-sm">{testimonial.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-cosmic-pattern opacity-10"></div>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-primary/40 to-secondary/60 rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto relative backdrop-blur-sm"
          >
            <div className="absolute inset-0 bg-stars opacity-20 rounded-2xl"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-cinzel font-bold mb-6">Begin Your Mystical Journey Today</h2>
              <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                Uncover the secrets of your cosmic path with our personalized readings. 
                Start with a free account and discover what the universe has in store for you.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/register" className="btn btn-accent py-3 px-8">
                  Create Free Account
                </Link>
                <Link to="/horoscope" className="btn btn-outline py-3 px-8">
                  Try Daily Horoscope
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
};

export default HomePage;