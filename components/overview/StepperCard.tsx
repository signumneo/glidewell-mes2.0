/**
 * StepperCard - Process stepper visualization card
 */

'use client';

import { useThemeColors } from '@/hooks/useThemeColors';
import { cardVariants, transitions, typography } from '@/lib/design-system';
import { cn } from '@/lib/utils';

export function StepperCard() {
  const theme = useThemeColors();

  return (
    <div
      className={cn(
        'rounded-xl border p-5',
        theme.surfacePrimary,
        theme.border,
        cardVariants.elevated,
        transitions.default
      )}
    >
      <h3 className={cn(typography.styles.cardHeader, 'mb-4')}>
        Process Workflow
      </h3>

      {/* Stepper placeholder - room for horizontal flow nodes */}
      <div className="flex items-center justify-center h-32">
        <p className={cn(typography.styles.cardDescription)}>
          Stepper visualization will appear here
        </p>
      </div>
    </div>
  );
}
