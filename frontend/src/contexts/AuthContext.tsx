'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '@/types';
import { authService } from '@/services/authService';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (identifier: string) => Promise<void>;
  register: (data: Partial<User>) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  isLoginModalOpen: boolean;
  isRegisterModalOpen: boolean;
  openLoginModal: () => void;
  openRegisterModal: () => void;
  closeModals: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  useEffect(() => {
    authService.getProfile().then(profile => {
      setUser(profile);
      setLoading(false);
    });
  }, []);

  const login = async (identifier: string) => {
    const profile = await authService.login(identifier);
    setUser(profile);
  };

  const register = async (data: Partial<User>) => {
    const profile = await authService.register(data);
    setUser(profile);
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const refreshUser = async () => {
    const profile = await authService.getProfile();
    setUser(profile);
  };

  const openLoginModal = () => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(true);
  };

  const openRegisterModal = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(true);
  };

  const closeModals = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(false);
  };

  return (
    <AuthContext.Provider value={{ 
      user, loading, login, register, logout, refreshUser,
      isLoginModalOpen, isRegisterModalOpen, openLoginModal, openRegisterModal, closeModals
    }}>
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
