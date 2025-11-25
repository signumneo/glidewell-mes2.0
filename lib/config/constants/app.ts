/**
 * Application Constants
 */

export const APP_CONFIG = {
  NAME: 'MES Dashboard 2.0',
  VERSION: '2.0.0',
  ENVIRONMENT: process.env.NODE_ENV || 'development',
} as const;

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
