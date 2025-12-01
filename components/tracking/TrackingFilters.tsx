'use client';

import { useState } from 'react';
import { useThemeColors } from '@/hooks/useThemeColors';
import { cardVariants, transitions } from '@/lib/design-system';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, RotateCcw, Info } from 'lucide-react';

export function TrackingFilters() {
  const theme = useThemeColors();
  const [partNumber, setPartNumber] = useState('7928 - [fastmill.io] Crown Milling & ...');
  const [routerId, setRouterId] = useState('');

  const handleSearch = () => {
    // TODO: Implement search
    console.log('Search:', { partNumber, routerId });
  };

  const handleClear = () => {
    setPartNumber('');
    setRouterId('');
  };

  return (
    <div className={cn(
      theme.surface,
      theme.border,
      cardVariants.elevated,
      'p-6'
    )}>
      <div className="flex items-end gap-4">
        {/* Part Number Dropdown */}
        <div className="flex-1">
          <label className={cn('block text-sm font-medium mb-2', theme.textSecondary)}>
            Part Number
          </label>
          <div className="relative">
            <select
              value={partNumber}
              onChange={(e) => setPartNumber(e.target.value)}
              className={cn(
                'w-full h-12 px-4 pr-10 border rounded-md text-gray-900 dark:text-white appearance-none',
                theme.input,
                'focus:ring-2',
                transitions.default
              )}
            >
              <option value="7928 - [fastmill.io] Crown Milling & ...">
                7928 - [fastmill.io] Crown Milling & ...
              </option>
              <option value="7929 - Sample Part 2">7929 - Sample Part 2</option>
              <option value="7930 - Sample Part 3">7930 - Sample Part 3</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className={cn('w-4 h-4', theme.textSecondary)} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Refresh Button */}
        <Button
          className={cn(
            'h-12 px-4',
            theme.surface,
            theme.border,
            'border',
            theme.accentHover,
            transitions.default
          )}
          variant="outline"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>

        {/* Router ID Input */}
        <div className="flex-1">
          <label className={cn('block text-sm font-medium mb-2', theme.textSecondary)}>
            Router ID
          </label>
          <Input
            value={routerId}
            onChange={(e) => setRouterId(e.target.value)}
            placeholder="Router ID"
            className={cn(
              'h-12 border text-gray-900 dark:text-white',
              theme.input,
              'focus:ring-2',
              transitions.default
            )}
          />
        </div>

        {/* Search Button */}
        <Button
          onClick={handleSearch}
          className={cn(
            'h-12 px-6',
            theme.accentPrimary,
            theme.accentHover,
            transitions.default,
            'flex items-center gap-2'
          )}
        >
          <Search className="w-4 h-4" />
          SEARCH
        </Button>

        {/* Clear Button */}
        <Button
          onClick={handleClear}
          className={cn(
            'h-12 px-6',
            theme.surface,
            theme.border,
            'border',
            theme.accentHover,
            transitions.default
          )}
          variant="outline"
        >
          CLEAR
        </Button>

        {/* Info Button */}
        <Button
          className={cn(
            'h-12 px-4',
            theme.accentPrimary,
            theme.accentHover,
            transitions.default
          )}
        >
          <Info className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
