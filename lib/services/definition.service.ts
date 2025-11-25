/**
 * Definition Service - Handle all definition-related API calls
 */

import { apiClient, API_ENDPOINTS, type ApiResponse } from '@/lib/api';

export interface Definition {
  id: string;
  name: string;
  type: 'process' | 'product' | 'quality' | 'custom';
  description?: string;
  parameters: Record<string, any>;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

export interface CreateDefinitionDto {
  name: string;
  type: Definition['type'];
  description?: string;
  parameters: Record<string, any>;
}

export interface UpdateDefinitionDto extends Partial<CreateDefinitionDto> {
  isActive?: boolean;
}

export class DefinitionService {
  /**
   * Get all definitions
   */
  static async getDefinitions(filters?: { type?: Definition['type']; isActive?: boolean }): Promise<ApiResponse<Definition[]>> {
    return apiClient.get<Definition[]>(API_ENDPOINTS.DEFINITION.LIST, filters);
  }

  /**
   * Get definition by ID
   */
  static async getDefinition(id: string): Promise<ApiResponse<Definition>> {
    return apiClient.get<Definition>(API_ENDPOINTS.DEFINITION.GET(id));
  }

  /**
   * Create new definition
   */
  static async createDefinition(data: CreateDefinitionDto): Promise<ApiResponse<Definition>> {
    return apiClient.post<Definition>(API_ENDPOINTS.DEFINITION.CREATE, data);
  }

  /**
   * Update definition
   */
  static async updateDefinition(id: string, data: UpdateDefinitionDto): Promise<ApiResponse<Definition>> {
    return apiClient.put<Definition>(API_ENDPOINTS.DEFINITION.UPDATE(id), data);
  }

  /**
   * Delete definition
   */
  static async deleteDefinition(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(API_ENDPOINTS.DEFINITION.DELETE(id));
  }
}
