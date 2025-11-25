'use client';

import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { themeColors } from '@/lib/theme';
import { cardStyles, interactive } from '@/lib/design-system';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  iconColor?: string;
  description?: string;
}

export function StatCard({
  title,
  value,
  change,
  changeType = 'neutral',
  icon: IconComponent,
  iconColor = 'bg-blue-500',
  description,
}: StatCardProps) {
  // Map old gradient classes to simple colors - elegant, minimal palette
  const getIconColor = () => {
    if (iconColor.includes('blue')) return 'text-slate-700 dark:text-slate-400';
    if (iconColor.includes('green') || iconColor.includes('emerald')) return 'text-emerald-600 dark:text-emerald-400';
    if (iconColor.includes('yellow') || iconColor.includes('orange')) return 'text-amber-600 dark:text-amber-400';
    if (iconColor.includes('purple')) return 'text-violet-600 dark:text-violet-400';
    if (iconColor.includes('indigo')) return 'text-slate-600 dark:text-slate-400';
    return 'text-slate-700 dark:text-slate-400';
  };

  return (
    <Card className={cn(
      'group relative overflow-hidden',
      cardStyles.elevated,
      interactive.card
    )}>
      <CardContent className="p-6 relative z-10">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className={`text-sm font-medium ${themeColors.textSecondary} mb-1`}>{title}</p>
            <h3 className={`text-3xl font-bold ${themeColors.textPrimary} mb-2 tracking-tight`}>{value}</h3>
            {change !== undefined && (
              <div className="flex items-center space-x-1">
                <span
                  className={cn(
                    'text-sm font-semibold',
                    changeType === 'positive' && 'text-emerald-600 dark:text-emerald-400',
                    changeType === 'negative' && 'text-rose-600 dark:text-rose-400',
                    changeType === 'neutral' && `${themeColors.textSecondary}`
                  )}
                >
                  {change > 0 ? '+' : ''}
                  {change}%
                </span>
                <span className={`text-xs ${themeColors.textTertiary}`}>vs last period</span>
              </div>
            )}
            {description && (
              <p className={`text-sm ${themeColors.textTertiary} mt-1`}>{description}</p>
            )}
          </div>
          {/* Icon only - no background bubble */}
          <IconComponent 
            className={cn(
              'w-10 h-10 transition-transform duration-200',
              'group-hover:scale-110',
              getIconColor()
            )}
            strokeWidth={1.5}
          />
        </div>
      </CardContent>
    </Card>
  );
}
