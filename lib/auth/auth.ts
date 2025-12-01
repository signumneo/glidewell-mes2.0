'use client';

import { PublicClientApplication, AccountInfo, AuthenticationResult } from '@azure/msal-browser';
import { LoginCredentials, AuthResponse, User, AuthMethod } from '@/types/auth';
import { msalConfig, loginRequest } from './msal-config';

/**
 * Centralized Authentication Service
 * Handles all authentication methods: Azure SSO, Cognito, Basic Auth
 */
export class AuthService {
  private static readonly TOKEN_KEY = 'IdToken'; // Single token key
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
   * Handle redirect response after Azure login
   * Call this on app initialization to handle return from Microsoft login
   */
  static async handleRedirectResponse(): Promise<AuthResponse | null> {
    try {
      console.log('[Auth] Handling redirect response...');
      const msalInstance = await this.getMsalInstance();
      const response = await msalInstance.handleRedirectPromise();
      
      if (response) {
        console.log('[Auth] Azure redirect response received:', { username: response.account?.username });
        // User just logged in via redirect
        return this.handleAzureLoginSuccess(response);
      }
      console.log('[Auth] No redirect response found');
      
      // No redirect response, check if user is already logged in
      const accounts = msalInstance.getAllAccounts();
      if (accounts.length > 0) {
        try {
          const tokenResponse = await msalInstance.acquireTokenSilent({
            ...loginRequest,
            account: accounts[0],
          });
          return this.handleAzureLoginSuccess(tokenResponse);
        } catch (error) {
          // Silent token acquisition failed
          console.log('Silent token acquisition failed');
        }
      }
      
      return null; // No user logged in
    } catch (error: any) {
      console.error('Error handling redirect:', error);
      return {
        success: false,
        message: error.message || 'Failed to handle redirect',
      };
    }
  }

  /**
   * Azure SSO Login
   */
  static async loginWithAzure(): Promise<AuthResponse> {
    try {
      console.log('[Auth] Starting Azure SSO login...');
      const msalInstance = await this.getMsalInstance();
      
      // Try silent login first
      const accounts = msalInstance.getAllAccounts();
      console.log('[Auth] Found', accounts.length, 'existing Azure accounts');
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

      // Use redirect instead of popup for full-page authentication
      await msalInstance.loginRedirect(loginRequest);
      // loginRedirect doesn't return - the page will redirect
      // The callback will be handled on return to the app
      return {
        success: true,
        message: 'Redirecting to Microsoft login...',
      };
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
    console.log('[Auth] Processing Azure SSO login success');
    const account = response.account;
    const idToken = response.idToken;
    const accessToken = response.accessToken;
    
    console.log('[Auth] Azure account:', { 
      username: account.username, 
      name: account.name,
      localAccountId: account.localAccountId 
    });

    // Parse ID token to extract custom claims (employeeId, roles, etc.)
    let employeeId: string | undefined;
    let accessLevel: string | undefined;
    
    if (idToken) {
      try {
        const payload = this.parseJwt(idToken);
        console.log('[Auth] ID Token claims:', payload);
        
        employeeId = payload.employeeId || payload.employee_id;
        accessLevel = payload.roles?.[0] || payload.role;
      } catch (error) {
        console.warn('[Auth] Failed to parse ID token:', error);
      }
    }
    
    // Map access level to role
    const role = accessLevel ? this.mapAccessLevelToRole(accessLevel) : 'operator';
    console.log('[Auth] Role mapped:', accessLevel, '→', role);
    
    const user: User = {
      id: account.localAccountId,
      username: account.username,
      email: account.username,
      name: account.name || account.username,
      role,
      authMethod: 'azure',
    };

    // Store in localStorage (SSO uses localStorage for persistence)
    if (typeof window !== 'undefined') {
      // Store both tokens - IdToken for identity, AccessToken for API calls
      localStorage.setItem(this.TOKEN_KEY, idToken);
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
      localStorage.setItem(this.AUTH_METHOD_KEY, 'azure');
      
      // Store AccessToken for MES API authentication (required)
      if (accessToken) {
        localStorage.setItem('AccessToken', accessToken);
        console.log('[Auth] Stored AccessToken for MES API calls');
      }
      
      // Store MES-specific data
      if (employeeId) {
        localStorage.setItem('techId', employeeId);
        console.log('[Auth] Stored techId from Azure:', employeeId);
      }
      if (accessLevel) {
        localStorage.setItem('accessLevel', String(accessLevel));
      }
      
      console.log('[Auth] Azure SSO user stored:', { 
        email: user.email, 
        role: user.role,
        techId: employeeId 
      });
    }

    return {
      success: true,
      user,
      token: idToken, // Use IdToken as primary auth token
    };
  }

  /**
   * Parse JWT token to extract payload
   */
  private static parseJwt(token: string): any {
    try {
      const base64 = token.split('.')[1];
      const decoded = atob(base64.replace(/-/g, '+').replace(/_/g, '/'));
      return JSON.parse(decoded);
    } catch (e) {
      console.error('[Auth] JWT parse error:', e);
      return {};
    }
  }

  /**
   * MES Backend Login (via User API)
   * Two-step authentication:
   * 1. Authenticate with Cognito using fixed credentials
   * 2. Validate user-entered credentials via User API
   */
  static async loginWithMESBackend(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      console.log('[Auth] Attempting MES Backend login for:', credentials.username);
      // Use Next.js API route to handle two-step authentication
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: credentials.username,
          password: credentials.password,
        }),
      });

      const data = await response.json();
      console.log('[Auth] MES Backend response:', { 
        status: response.status, 
        hasToken: !!data.token,
        hasIdToken: !!data.idToken,
        hasRefreshToken: !!data.refreshToken,
        userEmail: data.useremail,
        accessLevel: data.accesslevel,
        error: data.error 
      });

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      // Check for error in response
      if (data.error || !data.useremail) {
        console.log('[Auth] Login failed:', data.error || 'No user email in response');
        return {
          success: false,
          message: data.error || 'Invalid credentials',
        };
      }

      // Map accesslevel to role
      const role = this.mapAccessLevelToRole(data.accesslevel);
      console.log('[Auth] Access level mapped:', data.accesslevel, '→', role);

      // Format name from email: remove dots and capitalize
      const rawName = data.useremail.split('@')[0];
      const formattedName = rawName
        .split('.')
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');

      const user: User = {
        id: data.useremail,
        username: data.useremail,
        email: data.useremail,
        name: formattedName,
        role,
        authMethod: 'basic',
      };

      console.log('[Auth] Created user object:', user);

      // Store Cognito tokens - IdToken for identity, AccessToken for MES API
      const token = data.token; // This is IdToken from backend

      // Store in localStorage
      if (typeof window !== 'undefined') {
        // Primary auth token (IdToken for identity)
        localStorage.setItem(this.TOKEN_KEY, token);
        localStorage.setItem(this.USER_KEY, JSON.stringify(user));
        localStorage.setItem(this.AUTH_METHOD_KEY, 'basic');
        
        // Store AccessToken for MES API calls (REQUIRED per Confluence docs)
        if (data.accessToken) {
          localStorage.setItem('AccessToken', data.accessToken);
          console.log('[Auth] Stored AccessToken for MES API calls');
        } else {
          console.warn('[Auth] No AccessToken received - MES API calls may fail');
        }
        if (data.refreshToken) {
          localStorage.setItem('RefreshToken', data.refreshToken);
          console.log('[Auth] Stored RefreshToken');
        }
        
        // Store MES-specific data
        if (data.techId) {
          localStorage.setItem('techId', data.techId);
          console.log('[Auth] Stored techId:', data.techId);
        }
        if (data.accesslevel) {
          localStorage.setItem('accessLevel', String(data.accesslevel));
        }
      }

      return {
        success: true,
        user,
        token,
      };
    } catch (error: any) {
      console.error('MES Backend login error:', error);
      
      // Provide more specific error messages
      let errorMessage = 'Login failed';
      
      if (error.message?.includes('Failed to fetch')) {
        errorMessage = 'Cannot connect to server. Please check your network connection.';
      } else if (error.message?.includes('User not found') || error.message?.includes('invalid password')) {
        errorMessage = 'Invalid email or password';
      } else if (error.message?.includes('Cognito')) {
        errorMessage = 'Service authentication error. Please contact support.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      return {
        success: false,
        message: errorMessage,
      };
    }
  }

  /**
   * Map access level from API to user role
   * MES access levels: 0-10 where 0 = admin (highest), 10 = viewer (lowest)
   */
  private static mapAccessLevelToRole(accessLevel: string): User['role'] {
    const level = parseInt(accessLevel, 10);
    
    console.log('[Auth] Mapping access level:', { accessLevel, level, type: typeof level });
    
    // 0 = admin, 1-3 = supervisor, 4-7 = operator, 8-10 = viewer
    if (level === 0) return 'admin';
    if (level <= 3) return 'supervisor';
    if (level <= 7) return 'operator';
    return 'viewer';
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
      case 'basic':
      default:
        // Use MES Backend User API for username/password authentication
        return this.loginWithMESBackend(credentials);
    }
  }

  /**
   * Logout user
   */
  static async logout(): Promise<void> {
    const authMethod = this.getAuthMethod();
    console.log('[Auth] Logging out, method:', authMethod);

    // Clear storage
    if (typeof window !== 'undefined') {
      // Clear auth tokens
      localStorage.removeItem(this.TOKEN_KEY); // IdToken
      localStorage.removeItem(this.USER_KEY);
      localStorage.removeItem(this.AUTH_METHOD_KEY);
      
      // Clear MES-specific data
      localStorage.removeItem('AccessToken');
      localStorage.removeItem('RefreshToken');
      localStorage.removeItem('techId');
      localStorage.removeItem('accessLevel');
      localStorage.removeItem('userName');
      
      // Legacy cleanup
      localStorage.removeItem('mes_auth_token');
      
      console.log('[Auth] Storage cleared');
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
    const isAuth = !!(sessionStorage.getItem(this.TOKEN_KEY) || localStorage.getItem(this.TOKEN_KEY));
    console.log('[Auth] Authentication check:', isAuth);
    return isAuth;
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
