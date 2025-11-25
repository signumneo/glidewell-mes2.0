'use client';

import { PublicClientApplication, AccountInfo, AuthenticationResult } from '@azure/msal-browser';
import { LoginCredentials, AuthResponse, User, AuthMethod } from '@/types/auth';
import { msalConfig, loginRequest } from './msal-config';

/**
 * Centralized Authentication Service
 * Handles all authentication methods: Azure SSO, Cognito, Basic Auth
 */
export class AuthService {
  private static readonly TOKEN_KEY = 'mes_auth_token';
  private static readonly USER_KEY = 'mes_user';
  private static readonly AUTH_METHOD_KEY = 'mes_auth_method';
  private static msalInstance: PublicClientApplication | null = null;

  /**
   * Initialize MSAL instance for Azure SSO
   */
  private static async getMsalInstance(): Promise<PublicClientApplication> {
    if (!this.msalInstance) {
      this.msalInstance = new PublicClientApplication(msalConfig);
      await this.msalInstance.initialize();
    }
    return this.msalInstance;
  }

  /**
   * Azure SSO Login
   */
  static async loginWithAzure(): Promise<AuthResponse> {
    try {
      const msalInstance = await this.getMsalInstance();
      
      // Try silent login first
      const accounts = msalInstance.getAllAccounts();
      if (accounts.length > 0) {
        try {
          const response = await msalInstance.acquireTokenSilent({
            ...loginRequest,
            account: accounts[0],
          });
          return this.handleAzureLoginSuccess(response);
        } catch (error) {
          // Silent login failed, fall through to popup
          console.log('Silent login failed, will show popup');
        }
      }

      // Show popup for login
      const response = await msalInstance.loginPopup(loginRequest);
      return this.handleAzureLoginSuccess(response);
    } catch (error: any) {
      console.error('Azure SSO login error:', error);
      return {
        success: false,
        message: error.message || 'Azure SSO login failed',
      };
    }
  }

  /**
   * Handle successful Azure login
   */
  private static handleAzureLoginSuccess(response: AuthenticationResult): AuthResponse {
    const account = response.account;
    
    const user: User = {
      id: account.localAccountId,
      username: account.username,
      email: account.username,
      name: account.name || account.username,
      role: 'operator', // Default role, should be determined by your backend
      authMethod: 'azure',
    };

    const token = response.accessToken;

    // Store in sessionStorage
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(this.TOKEN_KEY, token);
      sessionStorage.setItem(this.USER_KEY, JSON.stringify(user));
      sessionStorage.setItem(this.AUTH_METHOD_KEY, 'azure');
    }

    return {
      success: true,
      user,
      token,
    };
  }

  /**
   * Cognito Login (placeholder - to be implemented)
   */
  static async loginWithCognito(credentials: LoginCredentials): Promise<AuthResponse> {
    // TODO: Implement Cognito authentication
    // This is a placeholder for future Cognito integration
    
    await new Promise(resolve => setTimeout(resolve, 800));

    return {
      success: false,
      message: 'Cognito authentication not yet implemented',
    };
  }

  /**
   * Basic username/password login
   */
  static async loginWithCredentials(credentials: LoginCredentials): Promise<AuthResponse> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Demo credentials - replace with actual backend auth
    if (credentials.username === 'admin' && credentials.password === 'admin') {
      const user: User = {
        id: '1',
        username: credentials.username,
        email: 'admin@mes.com',
        role: 'admin',
        name: 'Admin User',
        authMethod: 'basic',
      };

      const token = btoa(`${credentials.username}:${Date.now()}`);
      
      // Store in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem(this.TOKEN_KEY, token);
        localStorage.setItem(this.USER_KEY, JSON.stringify(user));
        localStorage.setItem(this.AUTH_METHOD_KEY, 'basic');
      }

      return {
        success: true,
        user,
        token,
      };
    }

    return {
      success: false,
      message: 'Invalid credentials',
    };
  }

  /**
   * Main login method - routes to appropriate auth method
   */
  static async login(credentials: LoginCredentials, method: AuthMethod = 'basic'): Promise<AuthResponse> {
    switch (method) {
      case 'azure':
        return this.loginWithAzure();
      case 'cognito':
        return this.loginWithCognito(credentials);
      case 'basic':
      default:
        return this.loginWithCredentials(credentials);
    }
  }

  /**
   * Logout user
   */
  static async logout(): Promise<void> {
    const authMethod = this.getAuthMethod();

    // Clear storage
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.USER_KEY);
      localStorage.removeItem(this.AUTH_METHOD_KEY);
      sessionStorage.removeItem(this.TOKEN_KEY);
      sessionStorage.removeItem(this.USER_KEY);
      sessionStorage.removeItem(this.AUTH_METHOD_KEY);
    }

    // Azure SSO logout
    if (authMethod === 'azure' && this.msalInstance) {
      try {
        const accounts = this.msalInstance.getAllAccounts();
        if (accounts.length > 0) {
          await this.msalInstance.logoutPopup({
            account: accounts[0],
          });
        }
      } catch (error) {
        console.error('Azure logout error:', error);
      }
    }
  }

  /**
   * Get current user from storage
   */
  static getCurrentUser(): User | null {
    if (typeof window === 'undefined') return null;
    
    // Check sessionStorage first (Azure SSO), then localStorage (basic auth)
    let userStr = sessionStorage.getItem(this.USER_KEY);
    if (!userStr) {
      userStr = localStorage.getItem(this.USER_KEY);
    }
    
    if (!userStr) return null;

    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }

  /**
   * Get authentication method
   */
  static getAuthMethod(): AuthMethod | null {
    if (typeof window === 'undefined') return null;
    
    const method = sessionStorage.getItem(this.AUTH_METHOD_KEY) || localStorage.getItem(this.AUTH_METHOD_KEY);
    return method as AuthMethod | null;
  }

  /**
   * Check if user is authenticated
   */
  static isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    return !!(sessionStorage.getItem(this.TOKEN_KEY) || localStorage.getItem(this.TOKEN_KEY));
  }

  /**
   * Get auth token
   */
  static getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return sessionStorage.getItem(this.TOKEN_KEY) || localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Check Azure SSO availability
   */
  static async isAzureSSOAvailable(): Promise<boolean> {
    try {
      const msalInstance = await this.getMsalInstance();
      return !!msalInstance;
    } catch {
      return false;
    }
  }
}
