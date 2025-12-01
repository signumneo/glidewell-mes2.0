/**
 * DashboardLayout - Main layout template
 * Clean orchestration of Sidebar and main content
 */

'use client';

import { ReactNode, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Menu } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { useAuth } from '@/hooks/useAuth';
import { useThemeColors } from '@/hooks/useThemeColors';
import { cn } from '@/lib/utils';
import { AuthService } from '@/lib/auth/auth';

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
    console.log('[DashboardLayout] Component mounting');
    setIsMounted(true);

    // Auth check - redirect if not authenticated
    const isAuth = AuthService.isAuthenticated();
    console.log('[DashboardLayout] Auth check result:', isAuth);
    if (!isAuth) {
      console.log('[DashboardLayout] Not authenticated, redirecting to login');
      router.push('/');
      return;
    }
    console.log('[DashboardLayout] Authenticated, loading layout');

    // Restore sidebar state from localStorage
    const savedCollapsedState = localStorage.getItem('sidebar-collapsed');
    console.log('[DashboardLayout] Restored sidebar state:', savedCollapsedState);
    if (savedCollapsedState !== null) {
      setIsCollapsed(savedCollapsedState === 'true');
    }

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [router]);

  // Persist sidebar state to localStorage
  const handleToggleCollapse = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem('sidebar-collapsed', String(newState));
  };

  const handleLogout = () => {
    logout();
  };

  // Prevent hydration mismatch
  if (!isMounted) {
    return (
      <div className={cn('min-h-screen', themeColors.pageBackground)}>
        <div className="pl-52">
          <main>
            <div className="p-8">{children}</div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('min-h-screen', themeColors.pageBackground)}>
      {/* Mobile hamburger button */}
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

      {/* Mobile backdrop */}
      {isMobile && isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        isCollapsed={isCollapsed}
        isMobile={isMobile}
        isMobileMenuOpen={isMobileMenuOpen}
        user={user}
        onToggleCollapse={handleToggleCollapse}
        onCloseMobileMenu={() => setIsMobileMenuOpen(false)}
        onLogout={handleLogout}
      />

      {/* Main content */}
      <div
        className={cn(
          'transition-all duration-300',
          !isMobile && (isCollapsed ? 'pl-16' : 'pl-52'),
          isMobile && 'pl-0'
        )}
      >
        <main>
          <div className={cn('p-8', isMobile && 'pt-20')}>{children}</div>
        </main>
      </div>
    </div>
  );
}
