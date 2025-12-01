/**
 * SidebarSubItem - Sub-navigation item for nested menus
 * Used inside expandable sections
 */

'use client';

import { useRouter } from 'next/navigation';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useThemeColors } from '@/hooks/useThemeColors';

interface SidebarSubItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
  onMobileClose?: () => void;
}

export function SidebarSubItem({
  icon: Icon,
  label,
  href,
  onMobileClose,
}: SidebarSubItemProps) {
  const router = useRouter();
  const themeColors = useThemeColors();

  const handleClick = () => {
    router.push(href);
    onMobileClose?.();
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        'w-full flex items-center text-sm font-medium rounded-md',
        themeColors.textSecondary,
        themeColors.hoverBackground,
        'hover:text-gray-900 dark:hover:text-white',
        'transition-all duration-200',
        'space-x-2 px-2.5 py-1.5'
      )}
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </button>
  );
}
