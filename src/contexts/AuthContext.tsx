import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, getCurrentUser, setCurrentUser, getUserByEmail, createUser } from '@/data/mockData';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: { email: string; password: string; fullName: string; phone: string }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const foundUser = getUserByEmail(email);
    
    if (!foundUser) {
      return { success: false, error: 'User not found' };
    }
    
    if (foundUser.password !== password) {
      return { success: false, error: 'Invalid password' };
    }
    
    setUser(foundUser);
    setCurrentUser(foundUser);
    return { success: true };
  };

  const register = async (data: { email: string; password: string; fullName: string; phone: string }): Promise<{ success: boolean; error?: string }> => {
    const existingUser = getUserByEmail(data.email);
    
    if (existingUser) {
      return { success: false, error: 'Email already registered' };
    }
    
    const newUser = createUser({
      ...data,
      role: 'citizen',
    });
    
    setUser(newUser);
    setCurrentUser(newUser);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
