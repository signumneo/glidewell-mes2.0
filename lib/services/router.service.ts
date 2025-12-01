/**
 * Router Service - Handle all router-related API calls
 */

import { apiClient, API_ENDPOINTS, type ApiResponse } from '@/lib/api';
import { 
  MESMessage, 
  createMESHeader, 
  ScanRequestData, 
  ScanResponseData,
  RouterData 
} from '@/types/mes';

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

  /**
   * Scan all routers using IoT message format
   * @param filters Optional filters (PartNumber, CurrentProcess)
   * @returns Array of router data from MES backend
   */
  static async scanRouters(filters?: ScanRequestData): Promise<ApiResponse<ScanResponseData>> {
    // Create MES message with IoT,Scan control
    const mesMessage: MESMessage<ScanRequestData> = {
      Header: createMESHeader('IoT,Scan'),
      Data: filters || {},
    };

    console.log('[RouterService] 🔍 IoT Scan Request:', JSON.stringify(mesMessage, null, 2));

    // Send POST request with MES message format
    const response = await apiClient.postMESMessage<MESMessage<ScanResponseData>>(
      '/api',
      mesMessage
    );

    console.log('[RouterService] ✅ IoT Scan Raw Response:', JSON.stringify(response, null, 2));

    // Extract Data.Routers array from MES response
    // Response format: { Header: {...}, Data: { Routers: [...], LastEvaluatedKey: {...} } }
    const mesResponse = response.data as any;
    const routerData = mesResponse.Data?.Routers || mesResponse.data?.Routers || [];

    console.log('[RouterService] 📊 Scan Results:', { 
      totalRouters: routerData.length,
      hasData: routerData.length > 0,
      hasLastEvaluatedKey: !!mesResponse.Data?.LastEvaluatedKey,
      firstRouter: routerData[0] ? {
        PartNumber: routerData[0].PartNumber,
        RouterId: routerData[0].RouterId,
        Status: routerData[0].Status,
        CurrentProcess: routerData[0].CurrentProcess
      } : null
    });

    return {
      data: routerData,
      status: response.status,
      message: response.message,
    };
  }
}
