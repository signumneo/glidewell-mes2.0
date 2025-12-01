'use client';

import { useState } from 'react';
import { useThemeColors } from '@/hooks/useThemeColors';
import { cardVariants, transitions } from '@/lib/design-system';
import { cn } from '@/lib/utils';
import { AddSubprocessForm } from './AddSubprocessForm';
import { SubprocessList } from './SubprocessList';

export function SubprocessConfig() {
  const theme = useThemeColors();
  const [processFlow, setProcessFlow] = useState('');

  return (
    <div className="space-y-4">
      {/* Process Flow Dropdown */}
      <div className={cn(
        theme.surfacePrimary,
        theme.border,
        cardVariants.elevated,
        'p-4'
      )}>
        <select
          value={processFlow}
          onChange={(e) => setProcessFlow(e.target.value)}
          className={cn(
            'w-full h-11 px-3 border rounded-md text-gray-900 dark:text-white',
            
            'focus:ring-2',
            transitions.default
          )}
        >
          <option value="">Process Flow</option>
          <option value="flow1">Flow 1</option>
          <option value="flow2">Flow 2</option>
        </select>
      </div>

      {/* Main Content - Two Column Layout */}
      <div className="grid grid-cols-2 gap-4">
        <AddSubprocessForm />
        <SubprocessList />
      </div>
    </div>
  );
}
