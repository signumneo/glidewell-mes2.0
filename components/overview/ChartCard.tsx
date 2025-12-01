/**
 * ChartCard - Empty chart/graph placeholder card
 */

'use client';

import { LucideIcon } from 'lucide-react';
import { useThemeColors } from '@/hooks/useThemeColors';
import { cardVariants, transitions, typography } from '@/lib/design-system';
import { cn } from '@/lib/utils';

interface ChartCardProps {
  title: string;
  icon?: LucideIcon;
  height?: string;
}

export function ChartCard({ title, icon: Icon, height = 'h-64' }: ChartCardProps) {
  const theme = useThemeColors();

  return (
    <div
      className={cn(
        'rounded-xl p-6',
        'shadow-sm hover:shadow-md',
        'border border-gray-200/50 dark:border-gray-700/50',
        theme.surfacePrimary,
        transitions.default
      )}
    >
      <div className="flex items-center gap-2 mb-4">
        {Icon && <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />}
        <h3 className={typography.styles.cardHeader}>{title}</h3>
      </div>

      {/* Empty chart placeholder */}
      <div className={cn('flex items-center justify-center', height)}>
        <p className={typography.styles.cardDescription}>
          Chart will be rendered here
        </p>
      </div>
    </div>
  );
}
