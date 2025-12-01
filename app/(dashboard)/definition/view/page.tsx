'use client';

import { useState } from 'react';
import { useThemeColors } from '@/hooks/useThemeColors';
import { cardVariants, transitions } from '@/lib/design-system';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, RotateCcw } from 'lucide-react';

export default function DefinitionViewPage() {
  const theme = useThemeColors();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    // TODO: Implement search
    console.log('Search:', searchQuery);
  };

  const handleRefresh = () => {
    // TODO: Implement refresh
    console.log('Refresh');
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter by Part Number or Description..."
            className="pl-9"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
          />
        </div>
        <Button variant="outline" size="icon" onClick={handleRefresh}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {/* Process List - Coming Soon */}
      <div className={cn(
        theme.surfacePrimary,
        theme.border,
        cardVariants.elevated,
        'p-16'
      )}>
        <div className="flex flex-col items-center gap-3">
          <div className={cn('text-4xl', theme.textSecondary)}>📋</div>
          <p className={cn('text-sm', theme.textSecondary)}>
            Process list will appear here
          </p>
        </div>
      </div>
    </div>
  );
}
