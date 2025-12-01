/**
 * Centralized Application Configuration
 * Update values here and run the app - all changes propagate automatically
 */

// MES Platform & Environment Configuration
export const MES_PLATFORM = (process.env.NEXT_PUBLIC_MES_PLATFORM || 'fmmmes') as 'burmes' | 'fmmmes' | '3dpmes' | 'prkmes' | 'engmes';
export const MES_ENVIRONMENT = (process.env.NEXT_PUBLIC_MES_ENV || 'unsdev') as 'unsdev' | 'unsqa' | 'unsprod';

// Environment-specific configurations
const MES_CONFIGS = {
  burmes: {
    unsdev: {
      apiUrl: 'https://burmes-service.unsdev.glidewellengineering.com/api',
      cognitoClientId: '6l2ch9ogih7g34dpdqn8h105t6',
      azureClientId: '1753a5dc-cbe6-4cc1-8c38-9567f2366bbf',
      azureRedirectUri: 'https://burmes-v2.unsdev.glidewellengineering.com/technician',
      cognitoUsername: 'Eng-BurMES-User',
    },
    unsqa: {
      apiUrl: 'https://burmes-service.unsqa.glidewellengineering.com/api',
      cognitoClientId: '21dvefcq2vgf78qn7edp1p6pjr',
      azureClientId: '1753a5dc-cbe6-4cc1-8c38-9567f2366bbf',
      azureRedirectUri: 'https://burmes-v2.unsqa.glidewellengineering.com/technician',
      cognitoUsername: 'Eng-BurMES-User',
    },
    unsprod: {
      apiUrl: 'https://burmes-service.unsprod.glidewellengineering.com/api',
      cognitoClientId: '',
      azureClientId: '1753a5dc-cbe6-4cc1-8c38-9567f2366bbf',
      azureRedirectUri: 'https://burmes-v2.unsprod.glidewellengineering.com/technician',
      cognitoUsername: 'Eng-BurMES-User',
    },
  },
  fmmmes: {
    unsdev: {
      apiUrl: 'https://fmmmes-service.unsdev.glidewellengineering.com',
      cognitoClientId: '5o44pb3bp05kejsbd6lro327bl',
      azureClientId: '5b52f267-eedf-4cd6-820c-ccb45abc97e7',
      azureRedirectUri: 'https://fmmmes-v2.unsdev.glidewellengineering.com/technician',
      cognitoUsername: 'Eng-FmmMES-User',
    },
    unsqa: {
      apiUrl: 'https://fmmmes-service.unsqa.glidewellengineering.com',
      cognitoClientId: '5ie43srcjgu9qijek0fic5ctis',
      azureClientId: '5b52f267-eedf-4cd6-820c-ccb45abc97e7',
      azureRedirectUri: 'https://fmmmes-v2.unsqa.glidewellengineering.com/technician',
      cognitoUsername: 'Eng-FmmMES-User',
    },
    unsprod: {
      apiUrl: 'https://fmmmes-service.unsprod.glidewellengineering.com',
      cognitoClientId: '',
      azureClientId: '5b52f267-eedf-4cd6-820c-ccb45abc97e7',
      azureRedirectUri: 'https://fmmmes-v2.unsprod.glidewellengineering.com/technician',
      cognitoUsername: 'Eng-FmmMES-User',
    },
  },
  '3dpmes': {
    unsdev: {
      apiUrl: 'https://3dpmes-service.unsdev.glidewellengineering.com/api',
      cognitoClientId: '6j3rjurdv7hf2028ho83ssntkk',
      azureClientId: 'aeb0d3cb-8dc4-4859-bd17-af6b9fbd43f3',
      azureRedirectUri: 'https://3dpmes-v2.unsdev.glidewellengineering.com/technician',
      cognitoUsername: 'Eng-3dpMES-User',
    },
    unsqa: {
      apiUrl: 'https://3dpmes-service.unsqa.glidewellengineering.com/api',
      cognitoClientId: '5b50i25ro22lsvkdciig56lh3f',
      azureClientId: 'aeb0d3cb-8dc4-4859-bd17-af6b9fbd43f3',
      azureRedirectUri: 'https://3dpmes-v2.unsqa.glidewellengineering.com/technician',
      cognitoUsername: 'Eng-3dpMES-User',
    },
    unsprod: {
      apiUrl: 'https://3dpmes-service.unsprod.glidewellengineering.com/api',
      cognitoClientId: '',
      azureClientId: 'aeb0d3cb-8dc4-4859-bd17-af6b9fbd43f3',
      azureRedirectUri: 'https://3dpmes-v2.unsprod.glidewellengineering.com/technician',
      cognitoUsername: 'Eng-3dpMES-User',
    },
  },
  prkmes: {
    unsdev: {
      apiUrl: 'https://prkmes-service.unsdev.glidewellengineering.com/api',
      cognitoClientId: '52s5f8ug6ggmqq22f514mdke6j',
      azureClientId: '',
      azureRedirectUri: 'https://prkmes-v2.unsdev.glidewellengineering.com/technician',
      cognitoUsername: 'Eng-PrkMES-User',
    },
    unsqa: {
      apiUrl: 'https://prkmes-service.unsqa.glidewellengineering.com/api',
      cognitoClientId: '2u66lab6l3vpol2pgf7khr7ccn',
      azureClientId: '',
      azureRedirectUri: 'https://prkmes-v2.unsqa.glidewellengineering.com/technician',
      cognitoUsername: 'Eng-PrkMES-User',
    },
    unsprod: {
      apiUrl: 'https://prkmes-service.unsprod.glidewellengineering.com/api',
      cognitoClientId: '',
      azureClientId: '',
      azureRedirectUri: 'https://prkmes-v2.unsprod.glidewellengineering.com/technician',
      cognitoUsername: 'Eng-PrkMES-User',
    },
  },
  engmes: {
    unsdev: {
      apiUrl: 'https://engmes-service.unsdev.glidewellengineering.com/api',
      cognitoClientId: '',
      azureClientId: '',
      azureRedirectUri: 'https://engmes-v2.unsdev.glidewellengineering.com/technician',
      cognitoUsername: 'Eng-EngMES-User',
    },
    unsqa: {
      apiUrl: 'https://engmes-service.unsqa.glidewellengineering.com/api',
      cognitoClientId: '52qf7ea7c9ofb2ifdj25b69stf',
      azureClientId: '',
      azureRedirectUri: 'https://engmes-v2.unsqa.glidewellengineering.com/technician',
      cognitoUsername: 'Eng-EngMES-User',
    },
    unsprod: {
      apiUrl: 'https://engmes-service.unsprod.glidewellengineering.com/api',
      cognitoClientId: '',
      azureClientId: '',
      azureRedirectUri: 'https://engmes-v2.unsprod.glidewellengineering.com/technician',
      cognitoUsername: 'Eng-EngMES-User',
    },
  },
} as const;

// Get current environment config
const currentConfig = MES_CONFIGS[MES_PLATFORM][MES_ENVIRONMENT];

export const appConfig = {
  // Application Info
  app: {
    name: 'MES',
    fullName: 'Manufacturing Execution System',
    tagline: 'Dashboard',
    version: '2.0.0',
    platform: MES_PLATFORM,
    environment: MES_ENVIRONMENT,
  },

  // Authentication Configuration
  auth: {
    // Azure AD SSO
    azure: {
      enabled: true,
      tenantId: process.env.NEXT_PUBLIC_AZURE_TENANT_ID || 'c9340d0a-8762-4b43-a2d1-f59bd6ef8726',
      clientId: process.env.NEXT_PUBLIC_AZURE_CLIENT_ID || currentConfig.azureClientId,
      authority: process.env.NEXT_PUBLIC_AZURE_AUTHORITY || 'https://login.microsoftonline.com/c9340d0a-8762-4b43-a2d1-f59bd6ef8726',
      redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI || currentConfig.azureRedirectUri,
      scopes: ['openid', 'profile', 'email'],
    },
    
    // AWS Cognito (MES Backend Auth)
    cognito: {
      enabled: true,
      clientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID || currentConfig.cognitoClientId,
      region: process.env.NEXT_PUBLIC_COGNITO_REGION || 'us-east-1',
      authEndpoint: 'https://cognito-idp.us-east-1.amazonaws.com/',
      authFlow: 'USER_PASSWORD_AUTH',
      // Dev credentials (move to env vars in production)
      credentials: {
        username: process.env.NEXT_PUBLIC_COGNITO_USERNAME || currentConfig.cognitoUsername,
        password: process.env.NEXT_PUBLIC_COGNITO_PASSWORD || 'P@ssw0rd!',
      },
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
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || currentConfig.apiUrl,
    version: 'v1',
    timeout: 30000, // 30 seconds
    
    // Message Protocol Configuration (MES API V3)
    messageProtocol: {
      version: '10.0.0',
      dataEncoding: 'Json',
      communicationProtocol: 'API' as 'API' | 'IoT', // 'API' for HTTP, 'IoT' for MQTT
    },
    
    // All API Endpoints - Centralized
    endpoints: {
      // Authentication
      auth: {
        login: '/user', // User API endpoint
        logout: '/auth/logout',
        refresh: '/auth/refresh',
        me: '/auth/me',
      },

      // User Management
      user: {
        getUserInfo: '/user', // actionType: getUserInfo
        addUserInfo: '/user', // actionType: addUserInfo
        updateUserInfo: '/user', // actionType: updateUserInfo
        getAllUsers: '/user', // actionType: getAllUsers
        deleteUser: '/user', // actionType: deleteUser
        hashAllUsers: '/user', // actionType: hashAllUsers
      },

      // Routers
      routers: {
        list: '/routers',
        get: (id: string) => `/routers/${id}`,
        create: '/routers',
        update: (id: string) => `/routers/${id}`,
        delete: (id: string) => `/routers/${id}`,
      },

      // Client Config
      clientConfig: {
        list: '/client-config',
        get: (id: string) => `/client-config/${id}`,
        update: (id: string) => `/client-config/${id}`,
      },

      // Definition
      definition: {
        list: '/definitions',
        get: (id: string) => `/definitions/${id}`,
        create: '/definitions',
        update: (id: string) => `/definitions/${id}`,
        delete: (id: string) => `/definitions/${id}`,
        addSubprocess: (id: string) => `/definitions/${id}/subprocess`,
        uploadConfig: (id: string) => `/definitions/${id}/config`,
      },

      // Overview
      overview: {
        analytics: '/overview/analytics',
        inventory: '/overview/inventory',
        summary: '/overview/summary',
        charts: '/overview/charts',
      },

      // Tracking (Manufacturing)
      tracking: {
        list: '/tracking',
        get: (id: string) => `/tracking/${id}`,
        live: '/tracking/live',
        history: '/tracking/history',
      },

      // AI Assist
      aiAssist: {
        chat: '/ai/chat',
        charts: '/ai/charts',
        analyze: '/ai/analyze',
        gemini: '/ai/gemini',
      },

      // Work Orders
      workOrders: {
        list: '/work-orders',
        get: (id: string) => `/work-orders/${id}`,
        create: '/work-orders',
        update: (id: string) => `/work-orders/${id}`,
        delete: (id: string) => `/work-orders/${id}`,
      },

      // Analytics (User Activity)
      analytics: {
        events: '/analytics/events',
        session: '/analytics/session',
        export: '/analytics/export',
      },
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
    userActivityTracking: false, // Toggle to enable activity tracking
  },

  // Dashboard Configuration
  dashboard: {
    refreshInterval: 30000, // 30 seconds
    maxRecentActivities: 10,
    chartsEnabled: true,
  },

  // User Activity Tracking Configuration
  activityTracking: {
    enabled: false, // Master toggle - when true, starts tracking
    trackPageViews: true,
    trackClicks: true,
    trackApiCalls: true,
    trackFormSubmissions: true,
    trackErrors: true,
    
    // Storage settings (for when backend is ready)
    storage: {
      type: 'memory' as 'memory' | 'localStorage' | 'backend', // Change to 'backend' when API ready
      flushInterval: 60000, // Flush to backend every 60 seconds
      maxQueueSize: 100, // Max events before auto-flush
      persistQueue: false, // Save queue to localStorage on page unload
    },
    
    // Backend settings (for future use)
    backend: {
      endpoint: '/analytics/events',
      batchSize: 50, // Send events in batches
      retryAttempts: 3,
      retryDelay: 1000,
    },
    
    // Privacy settings
    privacy: {
      anonymizeIp: true,
      excludePaths: ['/api/health', '/api/ping'],
      excludeQueryParams: ['token', 'key', 'password'],
      sessionTimeout: 30 * 60 * 1000, // 30 minutes
    },
    
    // What to track
    events: {
      pageView: true,
      click: true,
      apiCall: true,
      apiError: true,
      formSubmit: true,
      formError: true,
      navigation: true,
      error: true,
      performance: false, // Track page load times, etc.
    },
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
export function getApiUrl(endpoint: string): string {
  return `${appConfig.api.baseUrl}/${appConfig.api.version}${endpoint}`;
}

// Get full endpoint path with base URL
export function getFullEndpoint(path: string): string {
  return `${appConfig.api.baseUrl}${path}`;
}

// Check if activity tracking is enabled
export function isActivityTrackingEnabled(): boolean {
  return appConfig.activityTracking.enabled && appConfig.features.userActivityTracking;
}

// ============================================================================
// CONSTANTS - All application constants in one place
// ============================================================================

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_DATA: 'user_data',
  THEME: 'theme',
  SIDEBAR_COLLAPSED: 'sidebar_collapsed',
} as const;

export const QUERY_KEYS = {
  ROUTERS: 'routers',
  ROUTER: 'router',
  DEFINITIONS: 'definitions',
  DEFINITION: 'definition',
  ANALYTICS: 'analytics',
  INVENTORY: 'inventory',
  TRACKING: 'tracking',
  TRACKING_LIVE: 'tracking_live',
  TRACKING_HISTORY: 'tracking_history',
  AI_CHAT: 'ai_chat',
} as const;

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
} as const;

export const DATE_FORMATS = {
  DISPLAY: 'MMM dd, yyyy',
  DISPLAY_WITH_TIME: 'MMM dd, yyyy HH:mm',
  ISO: "yyyy-MM-dd'T'HH:mm:ss",
  API: 'yyyy-MM-dd',
} as const;

export const STATUS_COLORS = {
  SUCCESS: 'emerald',
  WARNING: 'amber',
  ERROR: 'rose',
  INFO: 'blue',
  NEUTRAL: 'gray',
} as const;
