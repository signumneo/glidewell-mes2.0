/**
 * TrackingTable - Router tracking table
 * Uses reusable Button component from design system
 */

'use client';

import { useThemeColors } from '@/hooks/useThemeColors';
import { cardVariants } from '@/lib/design-system';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ChevronUp } from 'lucide-react';

export function TrackingTable() {
  const theme = useThemeColors();

  return (
    <div className={cn(theme.surface, theme.border, cardVariants.elevated, 'overflow-hidden')}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
            <tr>
              <th className="w-12 px-4 py-3"></th>
              <th className="px-6 py-3 text-left">
                <button className="flex items-center gap-2 font-semibold text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  Router ID
                  <ChevronUp className="w-4 h-4" />
                </button>
              </th>
              <th className="px-6 py-3 text-left font-semibold text-sm text-gray-700 dark:text-gray-300">Part Number</th>
              <th className="px-6 py-3 text-left font-semibold text-sm text-gray-700 dark:text-gray-300">Description</th>
              <th className="px-6 py-3 text-left font-semibold text-sm text-gray-700 dark:text-gray-300">Current Process</th>
              <th className="px-6 py-3 text-left font-semibold text-sm text-gray-700 dark:text-gray-300">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={6} className="px-6 py-16 text-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="text-4xl">🔍</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    No tracking data available. Use the filters above to search.
                  </p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Showing <span className="text-gray-900 dark:text-white">0</span> of <span className="text-gray-900 dark:text-white">0</span> results
        </div>
        <div className="flex gap-2">
          <Button disabled variant="outline" size="sm">Previous</Button>
          <Button disabled variant="outline" size="sm">Next</Button>
        </div>
      </div>
    </div>
  );
}
