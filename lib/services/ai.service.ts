/**
 * AI Assist Service - Handle AI-powered features
 */

import { apiClient, API_ENDPOINTS, type ApiResponse } from '@/lib/api';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface ChatSession {
  id: string;
  title?: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ChartRequest {
  dataSource: string;
  chartType: 'line' | 'bar' | 'pie' | 'scatter' | 'area';
  parameters: Record<string, any>;
  query?: string;
}

export interface ChartResponse {
  chartConfig: Record<string, any>;
  data: any[];
  insights?: string[];
}

export interface AnalysisRequest {
  data: any[];
  analysisType: 'trend' | 'anomaly' | 'prediction' | 'optimization';
  parameters?: Record<string, any>;
}

export interface AnalysisResponse {
  results: Record<string, any>;
  insights: string[];
  recommendations?: string[];
  confidence: number;
}

export class AIAssistService {
  /**
   * Send chat message
   */
  static async sendChatMessage(message: string, sessionId?: string): Promise<ApiResponse<ChatMessage>> {
    return apiClient.post<ChatMessage>(API_ENDPOINTS.AI_ASSIST.CHAT, {
      message,
      sessionId,
    });
  }

  /**
   * Generate chart
   */
  static async generateChart(request: ChartRequest): Promise<ApiResponse<ChartResponse>> {
    return apiClient.post<ChartResponse>(API_ENDPOINTS.AI_ASSIST.CHARTS, request);
  }

  /**
   * Analyze data
   */
  static async analyzeData(request: AnalysisRequest): Promise<ApiResponse<AnalysisResponse>> {
    return apiClient.post<AnalysisResponse>(API_ENDPOINTS.AI_ASSIST.ANALYZE, request);
  }
}
