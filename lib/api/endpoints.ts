/**
 * API Endpoints - Centralized endpoint definitions
 * All API routes are defined here for easy maintenance and updates
 */

export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
  },

  // Routers
  ROUTERS: {
    LIST: '/routers',
    GET: (id: string) => `/routers/${id}`,
    CREATE: '/routers',
    UPDATE: (id: string) => `/routers/${id}`,
    DELETE: (id: string) => `/routers/${id}`,
  },

  // Client Config
  CLIENT_CONFIG: {
    LIST: '/client-config',
    GET: (id: string) => `/client-config/${id}`,
    UPDATE: (id: string) => `/client-config/${id}`,
  },

  // Definition
  DEFINITION: {
    LIST: '/definitions',
    GET: (id: string) => `/definitions/${id}`,
    CREATE: '/definitions',
    UPDATE: (id: string) => `/definitions/${id}`,
    DELETE: (id: string) => `/definitions/${id}`,
  },

  // Overview
  OVERVIEW: {
    ANALYTICS: '/overview/analytics',
    INVENTORY: '/overview/inventory',
    SUMMARY: '/overview/summary',
  },

  // Tracking
  TRACKING: {
    LIST: '/tracking',
    GET: (id: string) => `/tracking/${id}`,
    LIVE: '/tracking/live',
    HISTORY: '/tracking/history',
  },

  // AI Assist
  AI_ASSIST: {
    CHAT: '/ai/chat',
    CHARTS: '/ai/charts',
    ANALYZE: '/ai/analyze',
  },
} as const;

export type ApiEndpoints = typeof API_ENDPOINTS;
