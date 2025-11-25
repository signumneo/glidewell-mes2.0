'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, LoginCredentials, AuthMethod } from '@/types/auth';
import { AuthService } from '@/lib/auth/auth';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated on mount
    const currentUser = AuthService.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials, method: AuthMethod = 'basic') => {
    const response = await AuthService.login(credentials, method);
    
    if (response.success && response.user) {
      setUser(response.user);
      router.push('/routers');
      return { success: true };
    }

    return { 
      success: false, 
      message: response.message || 'Login failed' 
    };
  };

  const loginWithAzure = async () => {
    const response = await AuthService.loginWithAzure();
    
    if (response.success && response.user) {
      setUser(response.user);
      router.push('/routers');
      return { success: true };
    }

    return { 
      success: false, 
      message: response.message || 'Azure SSO login failed' 
    };
  };

  const logout = async () => {
    await AuthService.logout();
    setUser(null);
    router.push('/');
  };

  return {
    user,
    loading,
    login,
    loginWithAzure,
    logout,
    isAuthenticated: !!user,
  };
}
