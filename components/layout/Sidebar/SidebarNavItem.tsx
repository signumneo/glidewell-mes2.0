/**
 * SidebarNavItem - Navigation item molecule
 * Single navigation button with icon, label, and tooltip
 */

'use client';

import { useRouter, usePathname } from 'next/navigation';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useThemeColors } from '@/hooks/useThemeColors';

interface SidebarNavItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
  isCollapsed?: boolean;
  onMobileClose?: () => void;
}

export function SidebarNavItem({
  icon: Icon,
  label,
  href,
  isCollapsed = false,
  onMobileClose,
}: SidebarNavItemProps) {
  const router = useRouter();
  const pathname = usePathname();
  const themeColors = useThemeColors();
  const isActive = pathname === href;

  const handleClick = () => {
    router.push(href);
    onMobileClose?.();
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        'w-full flex items-center font-medium rounded-md',
        themeColors.sidebarText,
        themeColors.hoverBackground,
        'hover:text-gray-900 dark:hover:text-white',
        'transition-all duration-200',
        'group relative',
        isActive && 'bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400',
        isCollapsed ? 'justify-center p-2.5 hover:scale-105' : 'space-x-2.5 px-2.5 py-2'
      )}
    >
      <Icon
        className={cn(
          themeColors.textTertiary,
          'group-hover:text-blue-600 dark:group-hover:text-blue-400',
          'transition-all duration-200',
          isActive && 'text-blue-600 dark:text-blue-400',
          isCollapsed ? 'w-5 h-5' : 'w-[18px] h-[18px]'
        )}
      />
      {!isCollapsed && <span className="text-[15px] flex-1 text-left">{label}</span>}
      {isCollapsed && (
        <span
          className={cn(
            'absolute left-full ml-2 px-2.5 py-1.5',
            themeColors.surfaceTertiary,
            themeColors.textPrimary,
            'text-xs font-medium rounded-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity duration-200 z-50 shadow-lg'
          )}
        >
          {label}
        </span>
      )}
    </button>
  );
}
