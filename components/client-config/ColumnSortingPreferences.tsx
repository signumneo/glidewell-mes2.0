/**
 * ColumnSortingPreferences - Column sorting configuration
 */

'use client';

import { useState } from 'react';
import { ArrowUpDown, Check, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { themeColors } from '@/lib/theme';
import { cardVariants, transitions, buttonVariants, typography } from '@/lib/design-system';
import { useThemeColors } from '@/hooks/useThemeColors';
import { cn } from '@/lib/utils';

const SORT_COLUMNS = [
  'Router ID',
  'Part Number',
  'Status',
  'Priority',
  'Created Date',
  'Updated Date',
];

const SORT_ORDERS = ['Ascending', 'Descending'];

export function ColumnSortingPreferences() {
  const [sortColumn, setSortColumn] = useState('Router ID');
  const [sortOrder, setSortOrder] = useState('Descending');
  const [saved, setSaved] = useState(false);
  const theme = useThemeColors();

  const handleUpdate = () => {
    console.log('Update sort preferences:', { sortColumn, sortOrder });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div
      className={cn(
        'group relative overflow-hidden',
        'p-6 rounded-xl',
        themeColors.surface,
        'border border-gray-800/50',
        'hover:border-purple-500/30',
        cardVariants.elevated,
        transitions.default
      )}
    >
      {/* Gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50" />
      
      <div className="flex flex-col items-center gap-3 mb-6">
        <div className="p-2.5 rounded-lg bg-purple-500/10 border border-purple-500/20">
          <ArrowUpDown className="w-5 h-5 text-purple-400" />
        </div>
        <div>
          <h3 className={typography.styles.cardHeader}>Default Sorting</h3>
          <p className={typography.styles.cardDescription}>Configure table sort preferences</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Default Sort Column */}
          <div>
            <Label className="text-sm font-medium text-gray-300 mb-2 block">Sort Column</Label>
            <div className="relative">
              <select
                value={sortColumn}
                onChange={(e) => setSortColumn(e.target.value)}
                className={cn(
                  'w-full h-11 px-4 pr-10 rounded-lg appearance-none cursor-pointer',
                  'border text-gray-900 dark:text-white',
                  theme.input,
                  'focus:outline-none focus:ring-2 focus:ring-blue-500/50'
                )}
              >
                {SORT_COLUMNS.map((column) => (
                  <option key={column} value={column} className="bg-white dark:bg-gray-900">
                    {column}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Sort Order */}
          <div>
            <Label className="text-sm font-medium text-gray-300 mb-2 block">Sort Order</Label>
            <div className="relative">
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className={cn(
                  'w-full h-11 px-4 pr-10 rounded-lg appearance-none cursor-pointer',
                  'border text-gray-900 dark:text-white',
                  theme.input,
                  'focus:outline-none focus:ring-2 focus:ring-blue-500/50'
                )}
              >
                {SORT_ORDERS.map((order) => (
                  <option key={order} value={order} className="bg-white dark:bg-gray-900">
                    {order}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        <Button
          onClick={handleUpdate}
          className={cn(
            'w-full max-w-xs mx-auto block',
            saved && buttonVariants.success
          )}
        >
          {saved ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Saved
            </>
          ) : (
            'Apply Sorting Preferences'
          )}
        </Button>
      </div>
    </div>
  );
}
