/**
 * InventoryTable - Data table for inventory information
 */

'use client';

import { useThemeColors } from '@/hooks/useThemeColors';
import { transitions, typography } from '@/lib/design-system';
import { cn } from '@/lib/utils';

export function InventoryTable() {
  const theme = useThemeColors();

  const columns = [
    'Part Number',
    'Total Count',
    'Current Count',
    'Incoming Qty',
    'Outgoing Qty',
    'Create Inventory',
    'Trace Inventory',
  ];

  return (
    <div className={cn('rounded-xl overflow-hidden', theme.surfacePrimary)}>
      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* Table Header */}
          <thead>
            <tr className={cn('border-b', theme.border)}>
              {columns.map((column) => (
                <th
                  key={column}
                  className={cn(
                    'px-6 py-4 text-left text-sm font-semibold',
                    'text-gray-700 dark:text-gray-300',
                    transitions.default
                  )}
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body - Empty State */}
          <tbody>
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-16 text-center"
              >
                <p className={typography.styles.cardDescription}>
                  No inventory data available
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div
        className={cn(
          'px-6 py-4 border-t flex items-center justify-between',
          theme.border
        )}
      >
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Rows per page:
          </span>
          <select
            className={cn(
              'px-3 py-1 rounded-md border text-sm',
              
              theme.border,
              'focus:outline-none focus:ring-2 focus:ring-blue-500/50',
              transitions.default
            )}
          >
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            1–10 of 33
          </span>
          <div className="flex items-center gap-2">
            <button
              className={cn(
                'p-2 rounded-md',
                theme.hoverBackground,
                'disabled:opacity-50 disabled:cursor-not-allowed',
                transitions.default
              )}
              disabled
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              className={cn(
                'p-2 rounded-md',
                theme.hoverBackground,
                transitions.default
              )}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
