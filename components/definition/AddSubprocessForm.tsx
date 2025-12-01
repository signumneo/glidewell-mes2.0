'use client';

import { useState } from 'react';
import { useThemeColors } from '@/hooks/useThemeColors';
import { cardVariants, transitions } from '@/lib/design-system';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Play, GitBranch, List } from 'lucide-react';

export function AddSubprocessForm() {
  const theme = useThemeColors();
  
  const [processId, setProcessId] = useState('');
  const [processDescription, setProcessDescription] = useState('');
  const [operatorId, setOperatorId] = useState('');
  const [date, setDate] = useState('');

  return (
    <div className={cn(
      theme.surface,
      theme.border,
      cardVariants.elevated,
      'p-6'
    )}>
      <h3 className={cn('text-lg font-semibold mb-6 text-center', theme.text)}>
        Add Subprocess
      </h3>

      <div className="space-y-4">
        {/* Process ID */}
        <div>
          <label className={cn('block text-sm font-medium mb-2', theme.textSecondary)}>
            Process ID
          </label>
          <Input
            value={processId}
            onChange={(e) => setProcessId(e.target.value)}
            placeholder="4000"
            className={cn(
              'h-11 border text-gray-900 dark:text-white',
              theme.input,
              'focus:ring-2',
              transitions.default
            )}
          />
        </div>

        {/* Process Description */}
        <div>
          <label className={cn('block text-sm font-medium mb-2', theme.textSecondary)}>
            Process Description
          </label>
          <Input
            value={processDescription}
            onChange={(e) => setProcessDescription(e.target.value)}
            placeholder="Process Description"
            className={cn(
              'h-11 border text-gray-900 dark:text-white',
              theme.input,
              'focus:ring-2',
              transitions.default
            )}
          />
        </div>

        {/* Operator ID and Date */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={cn('block text-sm font-medium mb-2', theme.textSecondary)}>
              Operator ID
            </label>
            <Input
              value={operatorId}
              onChange={(e) => setOperatorId(e.target.value)}
              placeholder="000000"
              className={cn(
                'h-11 border text-gray-900 dark:text-white',
                theme.input,
                'focus:ring-2',
                transitions.default
              )}
            />
          </div>
          <div>
            <label className={cn('block text-sm font-medium mb-2', theme.textSecondary)}>
              Date
            </label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={cn(
                'h-11 border text-gray-900 dark:text-white',
                theme.input,
                'focus:ring-2',
                transitions.default
              )}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-3 pt-4">
          <Button
            className={cn(
              'h-12',
              theme.accentPrimary,
              theme.accentHover,
              transitions.default,
              'flex items-center gap-2'
            )}
          >
            <Plus className="w-4 h-4" />
            Add Item
          </Button>
          <Button
            className={cn(
              'h-12',
              theme.accentPrimary,
              theme.accentHover,
              transitions.default,
              'flex items-center gap-2'
            )}
          >
            <Play className="w-4 h-4" />
            Add Actions
          </Button>
          <Button
            className={cn(
              'h-12',
              theme.accentPrimary,
              theme.accentHover,
              transitions.default,
              'flex items-center gap-2'
            )}
          >
            <GitBranch className="w-4 h-4" />
            Add Conditions
          </Button>
        </div>

        {/* Create Subprocess Button */}
        <div className="pt-4">
          <Button
            className={cn(
              'w-full h-12',
              theme.surface,
              theme.border,
              theme.textSecondary,
              theme.accentHover,
              transitions.default,
              'flex items-center justify-center gap-2'
            )}
            variant="outline"
          >
            <List className="w-4 h-4" />
            Create Subprocess
          </Button>
        </div>
      </div>
    </div>
  );
}
