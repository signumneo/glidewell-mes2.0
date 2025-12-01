/**
 * SidebarSection - Collapsible section molecule
 * Used for expandable sections like Definition, Overview
 */

'use client';

import { ReactNode } from 'react';
import { LucideIcon, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useThemeColors } from '@/hooks/useThemeColors';

interface SidebarSectionProps {
  icon: LucideIcon;
  label: string;
  isExpanded: boolean;
  onToggle: () => void;
  children: ReactNode;
}

export function SidebarSection({
  icon: Icon,
  label,
  isExpanded,
  onToggle,
  children,
}: SidebarSectionProps) {
  const themeColors = useThemeColors();

  return (
    <div className="space-y-1">
      <button
        onClick={onToggle}
        className={cn(
          'w-full flex items-center font-medium rounded-md',
          themeColors.sidebarText,
          themeColors.hoverBackground,
          'hover:text-gray-900 dark:hover:text-white',
          'transition-all duration-200',
          'group relative',
          'space-x-2.5 px-2.5 py-2'
        )}
      >
        <Icon
          className={cn(
            themeColors.textTertiary,
            'group-hover:text-blue-600 dark:group-hover:text-blue-400',
            'transition-all duration-200',
            'w-[18px] h-[18px]'
          )}
        />
        <span className="text-[15px] flex-1 text-left">{label}</span>
        <ChevronDown
          className={cn(
            'w-4 h-4 transition-transform duration-200',
            isExpanded && 'rotate-180'
          )}
        />
      </button>

      {isExpanded && (
        <div className="ml-6 pl-3 border-l border-gray-200/60 dark:border-gray-700/60 space-y-1">
          {children}
        </div>
      )}
    </div>
  );
}
