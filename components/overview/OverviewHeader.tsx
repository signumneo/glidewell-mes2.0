/**
 * OverviewHeader - Dropdown selector and refresh button
 */

'use client';

import { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { useThemeColors } from '@/hooks/useThemeColors';
import { transitions } from '@/lib/design-system';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface OverviewHeaderProps {
  onRefresh: () => void;
  loading?: boolean;
}

export function OverviewHeader({ onRefresh, loading }: OverviewHeaderProps) {
  const theme = useThemeColors();
  const [selectedRouter, setSelectedRouter] = useState('');

  return (
    <div className="flex items-center justify-center gap-4">
      {/* Dropdown Selector */}
      <select
        value={selectedRouter}
        onChange={(e) => setSelectedRouter(e.target.value)}
        className={cn(
          'w-full max-w-md h-11 px-4 rounded-lg border text-sm',
          'text-gray-900 dark:text-white',
          theme.input,
          theme.border,
          'focus:outline-none focus:ring-2 focus:ring-blue-500/50',
          transitions.default
        )}
      >
        <option value="">Select a router...</option>
      </select>

      {/* Refresh Button */}
      <Button
        onClick={onRefresh}
        disabled={loading}
        variant="outline"
        size="sm"
        className={cn(
          'gap-2 flex-shrink-0',
          theme.border,
          theme.hoverBackground,
          transitions.default
        )}
      >
        <RefreshCw className={cn('w-4 h-4', loading && 'animate-spin')} />
        Refresh
      </Button>
    </div>
  );
}
