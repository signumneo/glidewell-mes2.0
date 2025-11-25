/**
 * Overview Service - Handle analytics and inventory data
 */

import { apiClient, API_ENDPOINTS, type ApiResponse } from '@/lib/api';

export interface AnalyticsData {
  productionMetrics: {
    efficiency: number;
    qualityRate: number;
    cycleTime: number;
    throughput: number;
  };
  timeSeriesData: {
    timestamp: Date;
    value: number;
    metric: string;
  }[];
  trends: {
    metric: string;
    change: number;
    period: string;
  }[];
}

export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  quantity: number;
  unit: string;
  location: string;
  minThreshold: number;
  maxThreshold: number;
  status: 'in-stock' | 'low' | 'out-of-stock' | 'overstock';
  lastUpdated: Date;
}

export interface OverviewSummary {
  activeLines: number;
  totalProduction: number;
  qualityRate: number;
  activeAlerts: number;
  activeWorkers: number;
}

export class OverviewService {
  /**
   * Get analytics data
   */
  static async getAnalytics(params?: { startDate?: string; endDate?: string; metrics?: string }): Promise<ApiResponse<AnalyticsData>> {
    return apiClient.get<AnalyticsData>(API_ENDPOINTS.OVERVIEW.ANALYTICS, params);
  }

  /**
   * Get inventory data
   */
  static async getInventory(filters?: { status?: InventoryItem['status']; location?: string }): Promise<ApiResponse<InventoryItem[]>> {
    return apiClient.get<InventoryItem[]>(API_ENDPOINTS.OVERVIEW.INVENTORY, filters);
  }

  /**
   * Get overview summary
   */
  static async getSummary(): Promise<ApiResponse<OverviewSummary>> {
    return apiClient.get<OverviewSummary>(API_ENDPOINTS.OVERVIEW.SUMMARY);
  }
}
