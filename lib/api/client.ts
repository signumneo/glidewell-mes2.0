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
   */
  private getAuthToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('auth_token');
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
    console.error('API Error:', apiError);

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

      const requestHeaders: Record<string, string> = {
        ...this.defaultHeaders,
        ...headers,
      } as Record<string, string>;

      // Add auth token if available
      if (token) {
        requestHeaders['Authorization'] = `Bearer ${token}`;
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

      // Parse response
      const data = await response.json();

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
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export types
export type { ApiResponse, ApiError, ApiRequestConfig };
