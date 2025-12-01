/**
 * Sidebar - Main sidebar organism
 * Orchestrates all sidebar sections and navigation
 */

'use client';

import { Route, SlidersHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';
import { MESLogo } from '@/components/ui/MESLogo';
import { cn } from '@/lib/utils';
import { useThemeColors } from '@/hooks/useThemeColors';
import { brand } from '@/lib/theme';
import { User } from '@/types/auth';
import { SidebarNavItem } from './SidebarNavItem';
import { SidebarAdminSection } from './SidebarAdminSection';
import { SidebarAISection } from './SidebarAISection';
import { SidebarUser } from './SidebarUser';

interface SidebarProps {
  isCollapsed: boolean;
  isMobile: boolean;
  isMobileMenuOpen: boolean;
  user: User | null;
  onToggleCollapse: () => void;
  onCloseMobileMenu: () => void;
  onLogout: () => void;
}

export function Sidebar({
  isCollapsed,
  isMobile,
  isMobileMenuOpen,
  user,
  onToggleCollapse,
  onCloseMobileMenu,
  onLogout,
}: SidebarProps) {
  const themeColors = useThemeColors();
  const isAdmin = user?.role === 'admin';

  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-50 transition-all duration-300',
        themeColors.sidebarBackground,
        themeColors.sidebarBorder,
        'border-r',
        // Desktop behavior
        !isMobile && (isCollapsed ? 'w-16' : 'w-52'),
        // Mobile behavior
        isMobile && 'w-64',
        isMobile && (isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full')
      )}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div
          className={cn(
            'h-14 flex items-center transition-all duration-300',
            themeColors.sidebarBorder,
            'border-b',
            isCollapsed && !isMobile ? 'justify-center px-2' : 'px-5'
          )}
        >
          <div className={cn('flex items-center', isCollapsed && !isMobile ? '' : 'space-x-2.5')}>
            <MESLogo size="sm" />
            {(!isCollapsed || isMobile) && (
              <div>
                <h1 className={cn('text-base font-semibold', themeColors.sidebarText)}>
                  {brand.name}
                </h1>
                <p className={cn('text-xs', themeColors.textTertiary)}>{brand.tagline}</p>
              </div>
            )}
          </div>
        </div>

        {/* Desktop Toggle Button */}
        {!isMobile && (
          <div
            className={cn(
              'px-3 py-2.5',
              themeColors.sidebarBorder,
              'border-b',
              'transition-all duration-300'
            )}
          >
            <button
              onClick={onToggleCollapse}
              className={cn(
                'w-full flex items-center justify-center px-2 py-1.5 rounded-md',
                'text-sm font-medium',
                themeColors.sidebarText,
                themeColors.hoverBackground,
                'transition-all duration-200'
              )}
            >
              {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollbar-thin">
          <SidebarNavItem
            icon={Route}
            label="Routers"
            href="/routers"
            isCollapsed={isCollapsed && !isMobile}
            onMobileClose={onCloseMobileMenu}
          />
          <SidebarNavItem
            icon={SlidersHorizontal}
            label="Client Config"
            href="/client-config"
            isCollapsed={isCollapsed && !isMobile}
            onMobileClose={onCloseMobileMenu}
          />

          {/* Admin Controls */}
          {isAdmin && (
            <SidebarAdminSection
              isCollapsed={isCollapsed}
              isMobile={isMobile}
              onMobileClose={onCloseMobileMenu}
            />
          )}

          {/* AI Assist */}
          <SidebarAISection
            isCollapsed={isCollapsed}
            isMobile={isMobile}
            onMobileClose={onCloseMobileMenu}
          />
        </nav>

        {/* User Section */}
        <SidebarUser
          user={user}
          isCollapsed={isCollapsed}
          isMobile={isMobile}
          onLogout={onLogout}
        />
      </div>
    </aside>
  );
}
