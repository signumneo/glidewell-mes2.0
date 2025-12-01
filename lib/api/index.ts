/**
 * API Index - Re-export all API utilities
 */

export { apiClient } from './client';
export { API_ENDPOINTS } from './endpoints';
export type { ApiResponse, ApiError, ApiRequestConfig } from './client';

// Also export config-based endpoints
import { appConfig } from '@/lib/config/app.config';
export const CONFIG_ENDPOINTS = appConfig.api.endpoints;
