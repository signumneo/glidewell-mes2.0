/**
 * ChartControls - Sidebar for chart configuration
 */

'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useThemeColors } from '@/hooks/useThemeColors';
import { transitions, typography } from '@/lib/design-system';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface ChartControlsProps {
  onRunQuery: () => void;
  onClear: () => void;
  loading?: boolean;
}

export function ChartControls({ onRunQuery, onClear, loading }: ChartControlsProps) {
  const theme = useThemeColors();
  const [metrics, setMetrics] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [groupBy, setGroupBy] = useState('');
  const [partNumber, setPartNumber] = useState('');

  return (
    <div
      className={cn(
        'w-80 rounded-xl border p-6 space-y-6',
        theme.surfacePrimary,
        theme.border,
        'shadow-sm'
      )}
    >
      {/* Header */}
      <div>
        <h2 className={cn(typography.styles.cardHeader, 'mb-1')}>
          Controls
        </h2>
      </div>

      {/* Metrics */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Metrics (Select 1 or more)
        </label>
        <select
          value={metrics}
          onChange={(e) => setMetrics(e.target.value)}
          className={cn(
            'w-full h-11 px-4 rounded-lg border text-sm',
            'text-gray-900 dark:text-white',
            
            theme.border,
            'focus:outline-none focus:ring-2 focus:ring-blue-500/50',
            transitions.default
          )}
        >
          <option value="">Select Metrics</option>
        </select>
      </div>

      {/* Date Range */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Date Range
        </label>
        <div className="space-y-2">
          <div>
            <label className="text-xs text-gray-600 dark:text-gray-400">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className={cn(
                'w-full h-10 px-3 rounded-lg border text-sm',
                'text-gray-900 dark:text-white',
                
                theme.border,
                'focus:outline-none focus:ring-2 focus:ring-blue-500/50',
                transitions.default
              )}
            />
          </div>
          <div>
            <label className="text-xs text-gray-600 dark:text-gray-400">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className={cn(
                'w-full h-10 px-3 rounded-lg border text-sm',
                'text-gray-900 dark:text-white',
                
                theme.border,
                'focus:outline-none focus:ring-2 focus:ring-blue-500/50',
                transitions.default
              )}
            />
          </div>
        </div>
      </div>

      {/* Group By */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Group By
        </label>
        <select
          value={groupBy}
          onChange={(e) => setGroupBy(e.target.value)}
          className={cn(
            'w-full h-11 px-4 rounded-lg border text-sm',
            'text-gray-900 dark:text-white',
            
            theme.border,
            'focus:outline-none focus:ring-2 focus:ring-blue-500/50',
            transitions.default
          )}
        >
          <option value="">Select grouping</option>
        </select>
      </div>

      {/* Part Number */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Part Number *
          </label>
          <span className="text-xs text-gray-500 dark:text-gray-400 italic">
            * Optional - filter by specific part
          </span>
        </div>
        <select
          value={partNumber}
          onChange={(e) => setPartNumber(e.target.value)}
          className={cn(
            'w-full h-11 px-4 rounded-lg border text-sm',
            'text-gray-900 dark:text-white',
            
            theme.border,
            'focus:outline-none focus:ring-2 focus:ring-blue-500/50',
            transitions.default
          )}
        >
          <option value="">Select part number</option>
        </select>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 pt-4">
        <Button
          onClick={onRunQuery}
          disabled={loading}
          className={cn(
            'w-full h-11',
            theme.accentPrimary,
            theme.accentHover,
            transitions.default
          )}
        >
          {loading ? 'Running...' : 'RUN QUERY'}
        </Button>
        <Button
          onClick={onClear}
          variant="outline"
          className={cn(
            'w-full h-11',
            theme.border,
            theme.hoverBackground,
            transitions.default
          )}
        >
          CLEAR
        </Button>
      </div>

      {/* Add Tab */}
      <button
        className={cn(
          'w-full h-11 rounded-lg border flex items-center justify-center gap-2',
          'text-sm font-medium',
          theme.border,
          theme.hoverBackground,
          transitions.default
        )}
      >
        <Plus className="w-4 h-4" />
        ADD TAB (1/5)
      </button>
    </div>
  );
}
