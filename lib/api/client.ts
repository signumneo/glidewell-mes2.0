/**
 * API Client - Centralized HTTP client for all API requests
 * Handles authentication, error handling, and request/response transformation
 */

import { appConfig } from '@/lib/config/app.config';

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface ApiRequestConfig {
  method?: RequestMethod;
  headers?: HeadersInit;
  body?: any;
  params?: Record<string, string | number | boolean>;
}

interface ApiResponse<T = any> {
  data: T;
  status: number;
  message?: string;
}

interface ApiError {
  message: string;
  status: number;
  code?: string;
  details?: any;
}

class ApiClient {
  private baseURL: string;
  private defaultHeaders: HeadersInit;
  private timeout: number;

  constructor() {
    this.baseURL = appConfig.api.baseUrl;
    this.timeout = appConfig.api.timeout;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  /**
   * Get authorization token from storage
   * Uses AccessToken for MES API authentication (per Confluence docs)
   */
  private getAuthToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('AccessToken');
  }

  /**
   * Build full URL with query parameters
   */
  private buildURL(endpoint: string, params?: Record<string, string | number | boolean>): string {
    const url = new URL(`${this.baseURL}${endpoint}`, window.location.origin);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }
    
    return url.toString();
  }

  /**
   * Handle API errors consistently
   */
  private handleError(error: any): never {
    const apiError: ApiError = {
      message: error.message || 'An unexpected error occurred',
      status: error.status || 500,
      code: error.code,
      details: error.details,
    };

    // Log error for debugging
    console.error('[API] Error:', apiError);

    throw apiError;
  }

  /**
   * Make HTTP request
   */
  private async request<T = any>(
    endpoint: string,
    config: ApiRequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const { method = 'GET', headers = {}, body, params } = config;

    try {
      const url = this.buildURL(endpoint, params);
      const token = this.getAuthToken();
      console.log('[API] 📤 Request:', method, endpoint, { 
        hasToken: !!token, 
        tokenPrefix: token ? token.substring(0, 20) + '...' : 'none',
        params,
        bodySize: body ? JSON.stringify(body).length : 0 
      });

      const requestHeaders: Record<string, string> = {
        ...this.defaultHeaders,
        ...headers,
      } as Record<string, string>;

      // Add auth token if available (MES API expects token without Bearer prefix)
      if (token) {
        requestHeaders['Authorization'] = token;
      }

      const requestOptions: RequestInit = {
        method,
        headers: requestHeaders,
      };

      // Add body for non-GET requests
      if (body && method !== 'GET') {
        requestOptions.body = JSON.stringify(body);
      }

      const response = await fetch(url, requestOptions);
      console.log('[API] 📥 Response:', method, endpoint, { 
        status: response.status, 
        ok: response.ok,
        statusText: response.statusText
      });

      // Parse response
      const data = await response.json();
      console.log('[API] 📋 Response Data:', JSON.stringify(data, null, 2).substring(0, 500) + '...');

      if (!response.ok) {
        throw {
          message: data.message || 'Request failed',
          status: response.status,
          code: data.code,
          details: data.details,
        };
      }

      return {
        data: data.data || data,
        status: response.status,
        message: data.message,
      };
    } catch (error: any) {
      console.error('[API] ❌ Error:', method, endpoint, error);
      this.handleError(error);
    }
  }

  /**
   * HTTP Methods
   */
  async get<T = any>(endpoint: string, params?: Record<string, string | number | boolean>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET', params });
  }

  async post<T = any>(endpoint: string, body?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'POST', body });
  }

  async put<T = any>(endpoint: string, body?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'PUT', body });
  }

  async patch<T = any>(endpoint: string, body?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'PATCH', body });
  }

  async delete<T = any>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  /**
   * Post MES message format (for IoT/API commands)
   * Handles MES-specific message structure with Header/Data
   */
  async postMESMessage<T = any>(endpoint: string, mesMessage: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'POST', body: mesMessage });
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export types
export type { ApiResponse, ApiError, ApiRequestConfig };
