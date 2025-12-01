/**
 * ChartDisplay - Main chart visualization area
 */

'use client';

import { TrendingUp } from 'lucide-react';
import { useThemeColors } from '@/hooks/useThemeColors';
import { transitions, typography } from '@/lib/design-system';
import { cn } from '@/lib/utils';

interface ChartDisplayProps {
  hasData?: boolean;
}

export function ChartDisplay({ hasData = false }: ChartDisplayProps) {
  const theme = useThemeColors();

  return (
    <div
      className={cn(
        'flex-1 rounded-xl border p-8',
        'flex flex-col items-center justify-center',
        theme.surfacePrimary,
        theme.border,
        'shadow-sm',
        'min-h-[500px]'
      )}
    >
      {!hasData ? (
        <div className="text-center space-y-4 max-w-md">
          <div className={cn(
            'mx-auto w-16 h-16 rounded-full flex items-center justify-center',
            'bg-blue-500/10 dark:bg-blue-500/20'
          )}>
            <TrendingUp className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className={cn(typography.styles.cardHeader, 'mb-2')}>
              Configure your query in the Query Builder and click "Run Query" to see results here
            </h3>
            <p className={typography.styles.cardDescription}>
              Results will include charts, tables, and statistical summaries
            </p>
          </div>
        </div>
      ) : (
        <div className="w-full h-full">
          {/* Chart will render here */}
        </div>
      )}
    </div>
  );
}
