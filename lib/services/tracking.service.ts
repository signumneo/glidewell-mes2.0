/**
 * Tracking Service - Handle real-time tracking and history
 */

import { apiClient, API_ENDPOINTS, type ApiResponse } from '@/lib/api';

export interface TrackingEvent {
  id: string;
  eventType: 'start' | 'pause' | 'resume' | 'complete' | 'error' | 'quality-check';
  entityId: string;
  entityType: 'job' | 'order' | 'product' | 'batch';
  timestamp: Date;
  location: string;
  operator?: string;
  data: Record<string, any>;
}

export interface LiveTracking {
  activeJobs: number;
  currentCycle: {
    id: string;
    startTime: Date;
    progress: number;
  }[];
  recentEvents: TrackingEvent[];
}

export interface TrackingHistory {
  events: TrackingEvent[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export class TrackingService {
  /**
   * Get all tracking events
   */
  static async getTrackingEvents(filters?: { 
    entityId?: string; 
    entityType?: TrackingEvent['entityType'];
    eventType?: TrackingEvent['eventType'];
  }): Promise<ApiResponse<TrackingEvent[]>> {
    return apiClient.get<TrackingEvent[]>(API_ENDPOINTS.TRACKING.LIST, filters);
  }

  /**
   * Get tracking event by ID
   */
  static async getTrackingEvent(id: string): Promise<ApiResponse<TrackingEvent>> {
    return apiClient.get<TrackingEvent>(API_ENDPOINTS.TRACKING.GET(id));
  }

  /**
   * Get live tracking data
   */
  static async getLiveTracking(): Promise<ApiResponse<LiveTracking>> {
    return apiClient.get<LiveTracking>(API_ENDPOINTS.TRACKING.LIVE);
  }

  /**
   * Get tracking history
   */
  static async getHistory(params?: { 
    page?: number; 
    pageSize?: number; 
    startDate?: string; 
    endDate?: string 
  }): Promise<ApiResponse<TrackingHistory>> {
    return apiClient.get<TrackingHistory>(API_ENDPOINTS.TRACKING.HISTORY, params);
  }
}
