'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { themeColors } from '@/lib/theme';
import { cardStyles } from '@/lib/design-system';

interface ProductionLine {
  id: string;
  name: string;
  status: 'running' | 'idle' | 'maintenance' | 'error';
  efficiency: number;
  output: number;
}

const productionLines: ProductionLine[] = [
  { id: '1', name: 'Line A', status: 'running', efficiency: 94, output: 1250 },
  { id: '2', name: 'Line B', status: 'running', efficiency: 87, output: 1180 },
  { id: '3', name: 'Line C', status: 'idle', efficiency: 0, output: 0 },
  { id: '4', name: 'Line D', status: 'maintenance', efficiency: 0, output: 0 },
];

const statusColors = {
  running: 'bg-green-500',
  idle: 'bg-gray-400',
  maintenance: 'bg-yellow-500',
  error: 'bg-red-500',
};

const statusLabels = {
  running: 'Running',
  idle: 'Idle',
  maintenance: 'Maintenance',
  error: 'Error',
};

export function ProductionOverview() {
  return (
    <Card className={cn(cardStyles.elevated, 'overflow-hidden')}>
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent dark:from-white/[0.02] pointer-events-none" />
      
      <CardHeader className="relative z-10">
        <CardTitle className={`text-lg font-semibold ${themeColors.textPrimary}`}>Production Lines</CardTitle>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="space-y-4">
          {productionLines.map((line) => (
            <div key={line.id} className="flex items-center space-x-4">
              <div className={cn(
                'w-3 h-3 rounded-full shadow-sm ring-2 ring-white dark:ring-gray-800',
                statusColors[line.status]
              )} />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-sm font-medium ${themeColors.textPrimary}`}>{line.name}</span>
                  <span className={`text-xs ${themeColors.textTertiary}`}>{statusLabels[line.status]}</span>
                </div>
                {line.status === 'running' && (
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <div className={`flex items-center justify-between text-xs ${themeColors.textSecondary} mb-1`}>
                        <span>Efficiency</span>
                        <span className="font-medium">{line.efficiency}%</span>
                      </div>
                      <div className={cn(
                        'w-full h-2 rounded-full overflow-hidden shadow-inner',
                        'bg-gray-200 dark:bg-gray-700'
                      )}>
                        <div
                          className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all shadow-sm"
                          style={{ width: `${line.efficiency}%` }}
                        />
                      </div>
                    </div>
                    <div className={`text-xs ${themeColors.textSecondary}`}>
                      <span className={`font-medium ${themeColors.textPrimary}`}>{line.output}</span> units
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
