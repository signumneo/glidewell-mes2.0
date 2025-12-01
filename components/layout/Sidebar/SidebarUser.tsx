/**
 * SidebarUser - User profile and logout section
 * Bottom section of sidebar with theme toggle and user info
 * Shows: name, email, role, techId (when available)
 */

'use client';

import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { cn } from '@/lib/utils';
import { useThemeColors } from '@/hooks/useThemeColors';
import { User } from '@/types/auth';
import { useState, useEffect } from 'react';

interface SidebarUserProps {
  user: User | null;
  isCollapsed: boolean;
  isMobile: boolean;
  onLogout: () => void;
}

export function SidebarUser({ user, isCollapsed, isMobile, onLogout }: SidebarUserProps) {
  const themeColors = useThemeColors();
  const [techId, setTechId] = useState<string | null>(null);

  useEffect(() => {
    // Get techId from localStorage
    if (typeof window !== 'undefined') {
      const storedTechId = localStorage.getItem('techId');
      setTechId(storedTechId);
    }
  }, [user]);

  // Format role for display
  const formatRole = (role: string) => {
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

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

      {/* User Profile Card */}
      <div
        className={cn(
          'flex flex-col items-center',
          isCollapsed && !isMobile ? 'justify-center' : 'px-1.5'
        )}
      >
        {/* Avatar - Always show */}
        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-500 dark:from-blue-500 dark:to-blue-400 rounded-full flex items-center justify-center text-white text-base font-semibold shadow-sm">
          {user?.name?.charAt(0).toUpperCase() || 'U'}
        </div>

        {/* User Info - Only show when expanded */}
        {(!isCollapsed || isMobile) && (
          <div className="w-full text-center mt-2.5 space-y-1.5">
            {/* Name - No ellipsis, natural wrap */}
            <p className={cn('text-sm font-semibold leading-tight px-1', themeColors.textPrimary)}>
              {user?.name || 'User'}
            </p>
            
            {/* Email - Wrapped naturally */}
            <p className={cn('text-xs leading-tight break-all px-1', themeColors.textTertiary)}>
              {user?.email}
            </p>
            
            {/* Role and Tech ID - Centered */}
            <div className="flex items-center justify-center gap-1.5 flex-wrap pt-0.5">
              {/* Role Badge */}
              <span
                className={cn(
                  'inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium',
                  user?.role === 'admin' && 'bg-purple-100 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300',
                  user?.role === 'manager' && 'bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300',
                  user?.role === 'operator' && 'bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-300',
                  user?.role === 'viewer' && 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                )}
              >
                {formatRole(user?.role || 'viewer')}
              </span>
              
              {/* Tech ID Badge */}
              {techId && (
                <span
                  className={cn(
                    'inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium',
                    'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  )}
                >
                  ID: {techId}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Logout Button */}
      <Button
        onClick={onLogout}
        variant="outline"
        className={cn(
          'w-full justify-center text-sm font-medium',
          'text-rose-600 dark:text-rose-400',
          'hover:text-rose-700 dark:hover:text-rose-300',
          'hover:bg-rose-50 dark:hover:bg-rose-950/30',
          themeColors.border,
          'border',
          'rounded-md',
          'transition-all duration-200',
          'h-8.5'
        )}
        size="sm"
      >
        <LogOut className={cn('w-4 h-4', (!isCollapsed || isMobile) && 'mr-1.5')} />
        {(!isCollapsed || isMobile) && 'Sign Out'}
      </Button>
    </div>
  );
}
