export interface DashboardStats {
  label: string;
  value: string | number;
  change?: number;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: string;
}

export interface ProductionMetrics {
  efficiency: number;
  output: number;
  quality: number;
  downtime: number;
}

export interface RecentActivity {
  id: string;
  title: string;
  description: string;
  timestamp: Date;
  type: 'info' | 'warning' | 'error' | 'success';
}
