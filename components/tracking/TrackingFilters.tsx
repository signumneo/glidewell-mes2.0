/**
 * TrackingFilters - Filter controls for tracking
 * Reusable components following design system
 */

'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useThemeColors } from '@/hooks/useThemeColors';
import { transitions } from '@/lib/design-system';

export function TrackingFilters() {
  const theme = useThemeColors();
  const [partNumber, setPartNumber] = useState('7928 - [fastmill.io] Crown Milling & ...');
  const [routerId, setRouterId] = useState('');

  return (
    <div className="flex items-end gap-3">
      {/* Part Number Dropdown */}
      <div className="flex-1">
        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
          Part Number
        </label>
        <div className="relative">
          <select
            value={partNumber}
            onChange={(e) => setPartNumber(e.target.value)}
            className={cn(
              'w-full h-11 px-4 pr-10 border rounded-md text-gray-900 dark:text-white appearance-none',
              theme.input,
              'focus:outline-none focus:ring-2 focus:ring-blue-500/50',
              transitions.default
            )}
          >
            <option className="bg-white dark:bg-gray-900">7928 - [fastmill.io] Crown Milling & ...</option>
            <option className="bg-white dark:bg-gray-900">7929 - Sample Part 2</option>
            <option className="bg-white dark:bg-gray-900">7930 - Sample Part 3</option>
          </select>
          <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none w-4 h-4 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <div className="flex-1">
        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
          Router ID
        </label>
        <Input
          value={routerId}
          onChange={(e) => setRouterId(e.target.value)}
          placeholder="Router ID"
          className="h-11"
        />
      </div>

      <Button className="gap-2">
        <Search className="w-4 h-4" />
        SEARCH
      </Button>

      <Button variant="outline">
        CLEAR
      </Button>
    </div>
  );
}
