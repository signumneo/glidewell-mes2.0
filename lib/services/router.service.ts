/**
 * Router Service - Handle all router-related API calls
 */

import { apiClient, API_ENDPOINTS, type ApiResponse } from '@/lib/api';

export interface Router {
  id: string;
  name: string;
  ipAddress: string;
  status: 'online' | 'offline' | 'maintenance';
  location?: string;
  lastSeen?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateRouterDto {
  name: string;
  ipAddress: string;
  location?: string;
}

export interface UpdateRouterDto extends Partial<CreateRouterDto> {
  status?: Router['status'];
}

export class RouterService {
  /**
   * Get all routers
   */
  static async getRouters(): Promise<ApiResponse<Router[]>> {
    return apiClient.get<Router[]>(API_ENDPOINTS.ROUTERS.LIST);
  }

  /**
   * Get router by ID
   */
  static async getRouter(id: string): Promise<ApiResponse<Router>> {
    return apiClient.get<Router>(API_ENDPOINTS.ROUTERS.GET(id));
  }

  /**
   * Create new router
   */
  static async createRouter(data: CreateRouterDto): Promise<ApiResponse<Router>> {
    return apiClient.post<Router>(API_ENDPOINTS.ROUTERS.CREATE, data);
  }

  /**
   * Update router
   */
  static async updateRouter(id: string, data: UpdateRouterDto): Promise<ApiResponse<Router>> {
    return apiClient.put<Router>(API_ENDPOINTS.ROUTERS.UPDATE(id), data);
  }

  /**
   * Delete router
   */
  static async deleteRouter(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(API_ENDPOINTS.ROUTERS.DELETE(id));
  }
}
