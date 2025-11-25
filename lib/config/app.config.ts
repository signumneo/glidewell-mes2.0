/**
 * Centralized Application Configuration
 * Update values here and run the app - all changes propagate automatically
 */

export const appConfig = {
  // Application Info
  app: {
    name: 'MES',
    fullName: 'Manufacturing Execution System',
    tagline: 'Dashboard',
    version: '2.0.0',
  },

  // Authentication Configuration
  auth: {
    // Azure AD SSO
    azure: {
      enabled: true,
      clientId: process.env.NEXT_PUBLIC_AZURE_CLIENT_ID || '1753a5dc-cbe6-4cc1-8c38-9567f2366bbf',
      authority: process.env.NEXT_PUBLIC_AZURE_AUTHORITY || 'https://login.microsoftonline.com/organizations',
      redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI || (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'),
      scopes: ['User.Read', 'openid', 'profile', 'email'],
    },
    
    // Cognito (future)
    cognito: {
      enabled: false,
      userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID || '',
      clientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID || '',
      region: process.env.NEXT_PUBLIC_COGNITO_REGION || 'us-east-1',
    },
    
    // Basic auth (demo/dev)
    basic: {
      enabled: true,
      demoCredentials: {
        username: 'admin',
        password: 'admin',
      },
    },
  },

  // API Configuration
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api',
    version: 'v1',
    timeout: 30000, // 30 seconds
    endpoints: {
      auth: '/auth',
      workOrders: '/work-orders',
      routers: '/routers',
      analytics: '/analytics',
      definitions: '/definitions',
    },
  },

  // Theme Configuration
  theme: {
    defaultMode: 'light' as 'light' | 'dark' | 'claude' | 'forest' | 'ocean' | 'sunset',
    availableThemes: ['light', 'dark', 'claude', 'forest', 'ocean', 'sunset'] as const,
    colors: {
      primary: '#2563eb',    // Blue
      secondary: '#4f46e5',  // Indigo
      accent: '#8b5cf6',     // Purple
    },
    darkMode: {
      background: '#1e1e1e',
      surface: '#242424',
      border: '#3a3a3a',
      text: '#f0f0f0',
    },
  },

  // Feature Flags
  features: {
    aiAnalytics: true,
    workOrderTracking: true,
    routerDataAccess: true,
    customAnalytics: true,
    realTimeUpdates: false,
  },

  // Dashboard Configuration
  dashboard: {
    refreshInterval: 30000, // 30 seconds
    maxRecentActivities: 10,
    chartsEnabled: true,
  },
} as const;

// Type-safe config access
export type AppConfig = typeof appConfig;

// Helper to get nested config values
export function getConfig<K extends keyof AppConfig>(key: K): AppConfig[K] {
  return appConfig[key];
}

// Check if a feature is enabled
export function isFeatureEnabled(feature: keyof typeof appConfig.features): boolean {
  return appConfig.features[feature];
}

// Get API endpoint URL
export function getApiUrl(endpoint: keyof typeof appConfig.api.endpoints): string {
  return `${appConfig.api.baseUrl}/${appConfig.api.version}${appConfig.api.endpoints[endpoint]}`;
}
