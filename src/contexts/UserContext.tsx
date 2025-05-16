import React, { createContext, useContext, useState, useEffect } from 'react';

type UserType = {
  id: string;
  name: string;
  email: string;
  birthDate?: string;
  birthTime?: string;
  birthPlace?: string;
  zodiacSign?: string;
  isPremium: boolean;
} | null;

interface UserContextType {
  user: UserType;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  updateUserProfile: (data: any) => Promise<void>;
}

const UserContext = createContext<UserContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  updateUserProfile: async () => {},
});

export const useUser = () => useContext(UserContext);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserType>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate getting user data from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('mysticBananaUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Mock authentication functions
  const login = async (email: string, password: string) => {
    // Simulate API call
    setIsLoading(true);
    
    // For demo purposes, we'll create a mock user
    const mockUser = {
      id: '123456',
      name: 'Demo User',
      email,
      birthDate: '1990-01-01',
      birthTime: '12:00',
      birthPlace: 'New York, USA',
      zodiacSign: 'Capricorn',
      isPremium: false
    };
    
    // Simulate a delay for API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setUser(mockUser);
    localStorage.setItem('mysticBananaUser', JSON.stringify(mockUser));
    setIsLoading(false);
  };

  const register = async (userData: any) => {
    // Simulate API call
    setIsLoading(true);
    
    // Create a user object with the provided data
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      name: userData.name,
      email: userData.email,
      birthDate: userData.birthDate,
      birthTime: userData.birthTime,
      birthPlace: userData.birthPlace,
      zodiacSign: userData.zodiacSign || 'Aries', // Default or calculate based on birth date
      isPremium: false
    };
    
    // Simulate a delay for API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setUser(newUser);
    localStorage.setItem('mysticBananaUser', JSON.stringify(newUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mysticBananaUser');
  };

  const updateUserProfile = async (data: any) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update user data
    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    localStorage.setItem('mysticBananaUser', JSON.stringify(updatedUser));
    
    setIsLoading(false);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateUserProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};