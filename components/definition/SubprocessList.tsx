'use client';

import { useThemeColors } from '@/hooks/useThemeColors';
import { cardVariants, transitions } from '@/lib/design-system';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Plus, List, FileSpreadsheet, Save } from 'lucide-react';

export function SubprocessList() {
  const theme = useThemeColors();

  return (
    <div className={cn(
      theme.surfacePrimary,
      theme.border,
      cardVariants.elevated,
      'p-6'
    )}>
      <div className="flex items-center justify-between mb-6">
        <h3 className={cn('text-lg font-semibold', theme.textPrimary)}>
          Subprocess List
        </h3>
        <div className="flex gap-2">
          <button
            className={cn(
              'p-2 rounded border',
              theme.border,
              theme.textSecondary,
              theme.accentHover,
              transitions.default
            )}
            title="Copy"
          >
            <Save className="w-4 h-4" />
          </button>
          <button
            className={cn(
              'p-2 rounded border',
              theme.border,
              theme.textSecondary,
              theme.accentHover,
              transitions.default
            )}
            title="Download"
          >
            <FileSpreadsheet className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Empty State */}
      <div className="flex flex-col items-center justify-center py-16 border-2 border-dashed rounded-lg" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
        <List className={cn('w-12 h-12 mb-3', theme.textSecondary)} />
        <p className={cn('text-sm', theme.textSecondary)}>
          No subprocesses added yet
        </p>
      </div>

      {/* Bottom Action Buttons */}
      <div className="flex gap-3 pt-6">
        <Button
          className={cn(
            'flex-1 h-11',
            theme.accentPrimary,
            theme.accentHover,
            transitions.default,
            'flex items-center justify-center gap-2'
          )}
        >
          <Plus className="w-4 h-4" />
          Add Process
        </Button>
        <Button
          className={cn(
            'flex-1 h-11',
            theme.accentPrimary,
            theme.accentHover,
            transitions.default,
            'flex items-center justify-center gap-2'
          )}
        >
          <FileSpreadsheet className="w-4 h-4" />
          Excel Mapping
        </Button>
      </div>
    </div>
  );
}
