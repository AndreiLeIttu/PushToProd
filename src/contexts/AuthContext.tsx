import React, { createContext, useState, useContext, ReactNode } from 'react';

type User = {
  id: string;
  email: string;
  name: string;
} | null;

type AuthContextType = {
  user: User;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);

  const login = async (email: string, password: string) => {
    // TODO: Replace with actual Supabase authentication
    // For now, mock successful login
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
    
    setUser({
      id: '1',
      email: email,
      name: 'Demo User',
    });
  };

  const register = async (name: string, email: string, password: string) => {
    // TODO: Replace with actual Supabase authentication
    // For now, mock successful registration
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
    
    setUser({
      id: '1',
      email: email,
      name: name,
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
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

