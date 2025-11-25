'use client';

import { ReactNode, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard,
  Activity,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  Menu,
  LogOut,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { MESLogo } from '@/components/ui/MESLogo';
import { useAuth } from '@/hooks/useAuth';
import { useThemeColors } from '@/hooks/useThemeColors';
import { colors, typography, spacing, themeColors, brand } from '@/lib/theme';
import { borderRadius, iconSizes, transitions, depth, interactive } from '@/lib/design-system';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const themeColors = useThemeColors();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleLogout = () => {
    logout();
  };

  // Prevent hydration mismatch by rendering consistent HTML on server
  if (!isMounted) {
    return (
      <div className={cn('min-h-screen', themeColors.pageBackground)}>
        <aside className={cn(
          'fixed inset-y-0 left-0 z-50 w-52',
          themeColors.sidebarBackground,
          'backdrop-blur-xl',
          themeColors.sidebarBorder,
          'border-r',
          'shadow-xl'
        )}>
          <div className="flex flex-col h-full">
            <div className={cn(
              'h-14 flex items-center px-5',
              themeColors.sidebarBorder,
              'border-b'
            )}>
              <div className="flex items-center space-x-2.5">
                <MESLogo size="sm" />
                <div>
                  <h1 className={cn('text-base font-bold', themeColors.textPrimary)}>{brand.name}</h1>
                  <p className={cn('text-xs', themeColors.textTertiary)}>{brand.tagline}</p>
                </div>
              </div>
            </div>
          </div>
        </aside>
        <div className="pl-52">
          <main>
            <div className="p-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('min-h-screen', themeColors.pageBackground)}>
      {/* Mobile hamburger button - only show when sidebar is closed */}
      {isMobile && !isMobileMenuOpen && (
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className={cn(
            'fixed top-4 left-4 z-[60]',
            'w-10 h-10 rounded-md',
            themeColors.surfacePrimary,
            themeColors.border,
            'border',
            'shadow-sm',
            'flex items-center justify-center',
            themeColors.hoverBackground,
            'transition-all duration-200',
            themeColors.textSecondary
          )}
        >
          <Menu size={20} />
        </button>
      )}

      {/* Backdrop for mobile */}
      {isMobile && isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar with minimal glass effect */}
      <aside className={cn(
        'fixed inset-y-0 left-0 z-50 transition-all duration-300',
        themeColors.sidebarBackground,
        themeColors.sidebarBorder,
        'border-r',
        // Desktop behavior
        !isMobile && (isCollapsed ? 'w-16' : 'w-52'),
        // Mobile behavior - always full width
        isMobile && 'w-64',
        isMobile && (isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full')
      )}>
        <div className="flex flex-col h-full">
          {/* Logo with minimal depth */}
          <div className={cn(
            'h-14 flex items-center transition-all duration-300',
            themeColors.sidebarBorder,
            'border-b',
            (isCollapsed && !isMobile) ? 'justify-center px-2' : 'px-5'
          )}>
            <div className={cn(
              'flex items-center',
              (isCollapsed && !isMobile) ? '' : 'space-x-2.5'
            )}>
              <MESLogo size="sm" />
              {(!isCollapsed || isMobile) && (
                <div>
                  <h1 className={cn('text-base font-semibold', themeColors.sidebarText)}>{brand.name}</h1>
                  <p className={cn('text-xs', themeColors.textTertiary)}>{brand.tagline}</p>
                </div>
              )}
            </div>
          </div>

          {/* Desktop Toggle Button - Below title */}
          {!isMobile && (
            <div className={cn(
              'px-3 py-2.5',
              themeColors.sidebarBorder,
              'border-b',
              'transition-all duration-300'
            )}>
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className={cn(
                  'w-full flex items-center justify-center px-2 py-1.5 rounded-md',
                  'text-sm font-medium',
                  themeColors.sidebarText,
                  themeColors.hoverBackground,
                  'transition-all duration-200'
                )}
              >
                {isCollapsed ? (
                  <ChevronRight size={16} />
                ) : (
                  <ChevronLeft size={16} />
                )}
              </button>
            </div>
          )}

          {/* Navigation with sections and scrolling */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollbar-thin">
            <button
              onClick={() => {
                router.push('/dashboard');
                if (isMobile) setIsMobileMenuOpen(false);
              }}
              className={cn(
                'w-full flex items-center font-medium rounded-md',
                themeColors.sidebarText,
                themeColors.hoverBackground,
                'hover:text-gray-900 dark:hover:text-white',
                'transition-all duration-200',
                'group relative',
                (isCollapsed && !isMobile) ? 'justify-center p-2.5 hover:scale-105' : 'space-x-2.5 px-2.5 py-2'
              )}
            >
              <LayoutDashboard className={cn(
                themeColors.textTertiary,
                'group-hover:text-blue-600 dark:group-hover:text-blue-400',
                'transition-all duration-200',
                (isCollapsed && !isMobile) ? 'w-5 h-5' : 'w-[18px] h-[18px]'
              )} />
              {(!isCollapsed || isMobile) && (
                <span className="text-[15px] flex-1 text-left">Dashboard</span>
              )}
              {isCollapsed && !isMobile && (
                <span className={cn(
                  'absolute left-full ml-2 px-2.5 py-1.5',
                  themeColors.surfaceTertiary,
                  themeColors.textPrimary,
                  'text-xs font-medium rounded-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity duration-200 z-50 shadow-lg'
                )}>
                  Dashboard
                </span>
              )}
            </button>

            <button
              onClick={() => {
                router.push('/routers');
                if (isMobile) setIsMobileMenuOpen(false);
              }}
              className={cn(
                'w-full flex items-center font-medium rounded-md',
                themeColors.sidebarText,
                themeColors.hoverBackground,
                'hover:text-gray-900 dark:hover:text-white',
                'transition-all duration-200',
                'group relative',
                (isCollapsed && !isMobile) ? 'justify-center p-2.5 hover:scale-105' : 'space-x-2.5 px-2.5 py-2'
              )}
            >
              <Activity className={cn(
                themeColors.textTertiary,
                'group-hover:text-blue-600 dark:group-hover:text-blue-400',
                'transition-all duration-200',
                (isCollapsed && !isMobile) ? 'w-5 h-5' : 'w-[18px] h-[18px]'
              )} />
              {(!isCollapsed || isMobile) && (
                <span className="text-[15px] flex-1 text-left">Routers</span>
              )}
              {isCollapsed && !isMobile && (
                <span className={cn(
                  'absolute left-full ml-2 px-2.5 py-1.5',
                  themeColors.surfaceTertiary,
                  themeColors.textPrimary,
                  'text-xs font-medium rounded-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity duration-200 z-50 shadow-lg'
                )}>
                  Routers
                </span>
              )}
            </button>

            <button
              onClick={() => {
                router.push('/users');
                if (isMobile) setIsMobileMenuOpen(false);
              }}
              className={cn(
                'w-full flex items-center font-medium rounded-md',
                themeColors.sidebarText,
                themeColors.hoverBackground,
                'hover:text-gray-900 dark:hover:text-white',
                'transition-all duration-200',
                'group relative',
                (isCollapsed && !isMobile) ? 'justify-center p-2.5 hover:scale-105' : 'space-x-2.5 px-2.5 py-2'
              )}
            >
              <Users className={cn(
                themeColors.textTertiary,
                'group-hover:text-blue-600 dark:group-hover:text-blue-400',
                'transition-all duration-200',
                (isCollapsed && !isMobile) ? 'w-5 h-5' : 'w-[18px] h-[18px]'
              )} />
              {(!isCollapsed || isMobile) && (
                <span className="text-[15px] flex-1 text-left">Users</span>
              )}
              {isCollapsed && !isMobile && (
                <span className={cn(
                  'absolute left-full ml-2 px-2.5 py-1.5',
                  themeColors.surfaceTertiary,
                  themeColors.textPrimary,
                  'text-xs font-medium rounded-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity duration-200 z-50 shadow-lg'
                )}>
                  Users
                </span>
              )}
            </button>

            <button
              onClick={() => {
                router.push('/settings');
                if (isMobile) setIsMobileMenuOpen(false);
              }}
              className={cn(
                'w-full flex items-center font-medium rounded-md',
                themeColors.sidebarText,
                themeColors.hoverBackground,
                'hover:text-gray-900 dark:hover:text-white',
                'transition-all duration-200',
                'group relative',
                (isCollapsed && !isMobile) ? 'justify-center p-2.5 hover:scale-105' : 'space-x-2.5 px-2.5 py-2'
              )}
            >
              <Settings className={cn(
                themeColors.textTertiary,
                'group-hover:text-blue-600 dark:group-hover:text-blue-400',
                'transition-all duration-200',
                (isCollapsed && !isMobile) ? 'w-5 h-5' : 'w-[18px] h-[18px]'
              )} />
              {(!isCollapsed || isMobile) && (
                <span className="text-[15px] flex-1 text-left">Settings</span>
              )}
              {isCollapsed && !isMobile && (
                <span className={cn(
                  'absolute left-full ml-2 px-2.5 py-1.5',
                  themeColors.surfaceTertiary,
                  themeColors.textPrimary,
                  'text-xs font-medium rounded-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity duration-200 z-50 shadow-lg'
                )}>
                  Settings
                </span>
              )}
            </button>
          </nav>

          {/* User section */}
          <div className={cn(
            'p-3',
            themeColors.sidebarBorder,
            'border-t',
            'space-y-2.5 transition-all duration-300'
          )}>
            {/* Theme Toggle */}
            <ThemeToggle variant="sidebar" isCollapsed={isCollapsed && !isMobile} />
            
            <div className={cn(
              'flex items-center',
              (isCollapsed && !isMobile) ? 'justify-center' : 'space-x-2.5 px-1.5'
            )}>
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
              onClick={handleLogout}
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
        </div>
      </aside>

      {/* Main content */}
      <div className={cn(
        'transition-all duration-300',
        // Desktop padding
        !isMobile && (isCollapsed ? 'pl-16' : 'pl-52'),
        // Mobile padding (no sidebar)
        isMobile && 'pl-0'
      )}>
        {/* Page content */}
        <main>
          <div className={cn(
            'p-8',
            isMobile && 'pt-20'
          )}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
