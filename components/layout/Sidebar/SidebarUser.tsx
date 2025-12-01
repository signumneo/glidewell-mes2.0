/**
 * SidebarUser - User profile and logout section
 * Bottom section of sidebar with theme toggle and user info
 */

'use client';

import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { cn } from '@/lib/utils';
import { useThemeColors } from '@/hooks/useThemeColors';
import { User } from '@/types/auth';

interface SidebarUserProps {
  user: User | null;
  isCollapsed: boolean;
  isMobile: boolean;
  onLogout: () => void;
}

export function SidebarUser({ user, isCollapsed, isMobile, onLogout }: SidebarUserProps) {
  const themeColors = useThemeColors();

  return (
    <div
      className={cn(
        'p-3',
        themeColors.sidebarBorder,
        'border-t',
        'space-y-2.5 transition-all duration-300'
      )}
    >
      <ThemeToggle variant="sidebar" isCollapsed={isCollapsed && !isMobile} />

      <div
        className={cn(
          'flex items-center',
          isCollapsed && !isMobile ? 'justify-center' : 'space-x-2.5 px-1.5'
        )}
      >
        <div className="w-8 h-8 bg-gradient-to-br from-slate-700 to-slate-600 dark:from-slate-600 dark:to-slate-500 rounded-full flex items-center justify-center text-white text-sm font-semibold shrink-0">
          {user?.name?.charAt(0) || 'U'}
        </div>
        {(!isCollapsed || isMobile) && (
          <div className="flex-1 min-w-0">
            <p className={cn('text-[15px] font-medium truncate', themeColors.textPrimary)}>
              {user?.name || 'User'}
            </p>
            <p className={cn('text-xs truncate', themeColors.textTertiary)}>{user?.email}</p>
          </div>
        )}
      </div>

      <Button
        onClick={onLogout}
        variant="outline"
        className={cn(
          'w-full justify-center text-[15px]',
          'text-rose-600 dark:text-rose-400',
          'hover:text-rose-700 dark:hover:text-rose-300',
          'hover:bg-rose-50 dark:hover:bg-rose-950/30',
          themeColors.border,
          'border',
          'rounded-md',
          'transition-all duration-200',
          'h-8'
        )}
        size="sm"
      >
        <LogOut className={cn('w-4 h-4', (!isCollapsed || isMobile) && 'mr-1.5')} />
        {(!isCollapsed || isMobile) && 'Sign Out'}
      </Button>
    </div>
  );
}
