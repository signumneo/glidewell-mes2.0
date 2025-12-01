'use client';

import { useThemeColors } from '@/hooks/useThemeColors';
import { cardVariants, transitions, typography } from '@/lib/design-system';
import { cn } from '@/lib/utils';
import { ChevronUp } from 'lucide-react';

export function TrackingTable() {
  const theme = useThemeColors();

  return (
    <div className={cn(
      theme.surface,
      theme.border,
      cardVariants.elevated,
      'overflow-hidden'
    )}>
      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className={cn(theme.surface, 'border-b', theme.border)}>
            <tr>
              {/* Expand Column */}
              <th className={cn('w-12 px-4 py-4 text-left')}>
                {/* Empty for expand icon */}
              </th>

              {/* Router ID */}
              <th className={cn('px-6 py-4 text-left', theme.text)}>
                <button className="flex items-center gap-2 font-semibold text-sm group">
                  Router ID
                  <ChevronUp className={cn(
                    'w-4 h-4',
                    theme.textSecondary,
                    'group-hover:text-current',
                    transitions.default
                  )} />
                </button>
              </th>

              {/* Part Number */}
              <th className={cn('px-6 py-4 text-left', theme.text)}>
                <span className="font-semibold text-sm">Part Number</span>
              </th>

              {/* Description */}
              <th className={cn('px-6 py-4 text-left', theme.text)}>
                <span className="font-semibold text-sm">Description</span>
              </th>

              {/* Current Process */}
              <th className={cn('px-6 py-4 text-left', theme.text)}>
                <span className="font-semibold text-sm">Current Process</span>
              </th>

              {/* Status */}
              <th className={cn('px-6 py-4 text-left', theme.text)}>
                <span className="font-semibold text-sm">Status</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Empty state - will be populated later */}
            <tr>
              <td colSpan={6} className="px-6 py-16 text-center">
                <div className="flex flex-col items-center gap-3">
                  <div className={cn('text-4xl', theme.textSecondary)}>🔍</div>
                  <p className={cn('text-sm', theme.textSecondary)}>
                    No tracking data available. Use the filters above to search.
                  </p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className={cn(
        'flex items-center justify-between px-6 py-4 border-t',
        theme.border,
        theme.surface
      )}>
        <div className={cn('text-sm', theme.textSecondary)}>
          Showing <span className={theme.text}>0</span> of <span className={theme.text}>0</span> results
        </div>
        <div className="flex gap-2">
          <button
            disabled
            className={cn(
              'px-4 py-2 rounded-md text-sm font-medium border',
              theme.border,
              theme.textSecondary,
              'opacity-50 cursor-not-allowed',
              transitions.default
            )}
          >
            Previous
          </button>
          <button
            disabled
            className={cn(
              'px-4 py-2 rounded-md text-sm font-medium border',
              theme.border,
              theme.textSecondary,
              'opacity-50 cursor-not-allowed',
              transitions.default
            )}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
