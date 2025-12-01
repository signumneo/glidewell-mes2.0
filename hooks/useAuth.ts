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
    console.log('[useAuth] Checking authentication on mount');
    const currentUser = AuthService.getCurrentUser();
    console.log('[useAuth] Current user:', currentUser ? { email: currentUser.email, role: currentUser.role } : null);
    setUser(currentUser);
    setLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials, method: AuthMethod = 'basic') => {
    console.log('[useAuth] Login attempt:', { username: credentials.username, method });
    const response = await AuthService.login(credentials, method);
    console.log('[useAuth] Login response:', { success: response.success, hasUser: !!response.user });
    
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
    console.log('[useAuth] Logging out');
    await AuthService.logout();
    setUser(null);
    console.log('[useAuth] User logged out, redirecting to login');
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
