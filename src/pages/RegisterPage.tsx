import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUser } from '../contexts/UserContext';
import { User, Mail, Lock, Calendar, MapPin, Clock, ArrowRight, Loader2 } from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';

const RegisterPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthDate: '',
    birthTime: '',
    birthPlace: '',
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register } = useUser();
  const navigate = useNavigate();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const validateStep1 = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('All fields are required');
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    
    return true;
  };
  
  const validateStep2 = () => {
    if (!formData.birthDate) {
      setError('Birth date is required');
      return false;
    }
    
    return true;
  };
  
  const nextStep = () => {
    if (step === 1 && validateStep1()) {
      setError('');
      setStep(2);
    }
  };
  
  const prevStep = () => {
    setError('');
    setStep(1);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep2()) {
      return;
    }
    
    try {
      setIsSubmitting(true);
      setError('');
      
      // Calculate zodiac sign based on birth date
      const birthDate = new Date(formData.birthDate);
      const month = birthDate.getMonth() + 1;
      const day = birthDate.getDate();
      
      let zodiacSign;
      if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) zodiacSign = "Aries";
      else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) zodiacSign = "Taurus";
      else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) zodiacSign = "Gemini";
      else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) zodiacSign = "Cancer";
      else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) zodiacSign = "Leo";
      else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) zodiacSign = "Virgo";
      else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) zodiacSign = "Libra";
      else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) zodiacSign = "Scorpio";
      else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) zodiacSign = "Sagittarius";
      else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) zodiacSign = "Capricorn";
      else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) zodiacSign = "Aquarius";
      else zodiacSign = "Pisces";
      
      await register({
        ...formData,
        zodiacSign,
      });
      
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to create account. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <MainLayout>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="card relative overflow-hidden"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full -mt-16 -mr-16 backdrop-blur-xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/20 rounded-full -mb-12 -ml-12 backdrop-blur-xl"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-cinzel font-bold mb-2">
                  {step === 1 ? 'Create Your Account' : 'Your Cosmic Birth Details'}
                </h2>
                <p className="text-white/70">
                  {step === 1 
                    ? 'Begin your journey into cosmic wisdom' 
                    : 'We need these details for accurate astrological readings'}
                </p>
              </div>
              
              {/* Progress Indicator */}
              <div className="flex justify-center mb-8">
                <div className="flex items-center space-x-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step === 1 ? 'bg-accent text-background' : 'bg-accent text-background'
                  }`}>
                    1
                  </div>
                  <div className={`w-16 h-1 ${
                    step > 1 ? 'bg-accent' : 'bg-white/20'
                  }`}></div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step === 2 ? 'bg-accent text-background' : 'bg-white/20 text-white'
                  }`}>
                    2
                  </div>
                </div>
              </div>
              
              {error && (
                <div className="bg-error/20 text-white border border-error/30 rounded-lg p-3 mb-6 text-sm">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {step === 1 ? (
                  /* Step 1: Account Information */
                  <>
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-1">
                        Full Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-white/50" />
                        </div>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="input pl-10 w-full"
                          placeholder="Enter your full name"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-1">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-white/50" />
                        </div>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="input pl-10 w-full"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-1">
                          Password
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-white/50" />
                          </div>
                          <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className="input pl-10 w-full"
                            placeholder="Create password"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-white/80 mb-1">
                          Confirm Password
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-white/50" />
                          </div>
                          <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            autoComplete="new-password"
                            required
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="input pl-10 w-full"
                            placeholder="Confirm password"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <button
                        type="button"
                        onClick={nextStep}
                        className="btn btn-accent w-full flex items-center justify-center"
                      >
                        Continue
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </button>
                    </div>
                  </>
                ) : (
                  /* Step 2: Birth Information */
                  <>
                    <div>
                      <label htmlFor="birthDate" className="block text-sm font-medium text-white/80 mb-1">
                        Birth Date
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Calendar className="h-5 w-5 text-white/50" />
                        </div>
                        <input
                          id="birthDate"
                          name="birthDate"
                          type="date"
                          required
                          value={formData.birthDate}
                          onChange={handleChange}
                          className="input pl-10 w-full"
                        />
                      </div>
                      <p className="mt-1 text-xs text-white/50">Required for accurate readings</p>
                    </div>
                    
                    <div>
                      <label htmlFor="birthTime" className="block text-sm font-medium text-white/80 mb-1">
                        Birth Time (if known)
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Clock className="h-5 w-5 text-white/50" />
                        </div>
                        <input
                          id="birthTime"
                          name="birthTime"
                          type="time"
                          value={formData.birthTime}
                          onChange={handleChange}
                          className="input pl-10 w-full"
                        />
                      </div>
                      <p className="mt-1 text-xs text-white/50">Optional but recommended for precise charts</p>
                    </div>
                    
                    <div>
                      <label htmlFor="birthPlace" className="block text-sm font-medium text-white/80 mb-1">
                        Birth Place (if known)
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MapPin className="h-5 w-5 text-white/50" />
                        </div>
                        <input
                          id="birthPlace"
                          name="birthPlace"
                          type="text"
                          value={formData.birthPlace}
                          onChange={handleChange}
                          className="input pl-10 w-full"
                          placeholder="City, Country"
                        />
                      </div>
                      <p className="mt-1 text-xs text-white/50">Optional but enhances reading accuracy</p>
                    </div>
                    
                    <div className="flex space-x-4">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="btn btn-outline flex-1"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn btn-accent flex-1 flex items-center justify-center"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin mr-2" />
                            Creating...
                          </>
                        ) : (
                          <>
                            <ArrowRight className="mr-2 w-5 h-5" />
                            Create Account
                          </>
                        )}
                      </button>
                    </div>
                  </>
                )}
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-white/70 text-sm">
                  Already have an account?{' '}
                  <Link to="/login" className="text-accent hover:text-accent/80">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
};

export default RegisterPage;