'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon, Palette, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { themes, type ThemeName } from '@/lib/theme/themes';

interface ThemeToggleProps {
  variant?: 'default' | 'sidebar';
  showLabel?: boolean;
  isCollapsed?: boolean;
}

export function ThemeToggle({ variant = 'default', showLabel = true, isCollapsed = false }: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const { theme, setTheme } = useTheme();

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (showThemeMenu && !(e.target as Element).closest('[data-theme-menu]')) {
        setShowThemeMenu(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showThemeMenu]);

  if (!mounted) {
    return (
      <div className={cn(
        variant === 'sidebar' ? 'h-10 w-full' : 'h-9 w-9',
        'animate-pulse bg-gray-200 dark:bg-gray-700 rounded-md'
      )} />
    );
  }

  const currentTheme = themes[theme as ThemeName] || themes.light;

  if (variant === 'sidebar') {
    return (
      <div className="relative" data-theme-menu>
        <button
          onClick={() => setShowThemeMenu(!showThemeMenu)}
          className={cn(
            'group w-full flex items-center justify-center rounded-md',
            'text-sm font-medium',
            'text-gray-700 dark:text-gray-300',
            'hover:text-gray-900 dark:hover:text-white',
            'bg-transparent hover:bg-gray-100 dark:hover:bg-[#252525]',
            'border border-gray-200/60 dark:border-[#2f2f2f]',
            'transition-all duration-150 ease-out',
            isCollapsed ? 'p-2.5' : 'px-4 py-2.5 gap-3'
          )}
          aria-label="Change theme"
        >
          <Palette 
            className={cn(
              'flex-shrink-0 transition-transform duration-150',
              'group-hover:scale-110'
            )}
            size={20}
          />
          
          {!isCollapsed && showLabel && (
            <span className="flex-1 text-left">Theme</span>
          )}
        </button>

        {/* Theme Dropdown Menu */}
        {showThemeMenu && (
          <div className={cn(
            'absolute bottom-full mb-2 z-[100]',
            isCollapsed ? 'left-full ml-2' : 'left-0 right-0',
            'bg-white dark:bg-[#1f1f1f]',
            'border border-gray-200/60 dark:border-[#2f2f2f]',
            'rounded-lg shadow-xl',
            'py-2',
            'min-w-[200px]',
            'animate-in slide-in-from-bottom-2 duration-200'
          )}>
            {Object.values(themes).map((themeOption) => (
              <button
                key={themeOption.name}
                onClick={() => {
                  setTheme(themeOption.name);
                  setShowThemeMenu(false);
                }}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-2.5',
                  'text-sm font-medium text-left',
                  'transition-colors duration-150',
                  theme === themeOption.name
                    ? 'bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#252525]'
                )}
              >
                <div className={cn(
                  'w-5 h-5 rounded-full border-2 flex items-center justify-center',
                  theme === themeOption.name
                    ? 'border-blue-600 dark:border-blue-400 bg-blue-600 dark:bg-blue-400'
                    : 'border-gray-300 dark:border-gray-600'
                )}>
                  {theme === themeOption.name && (
                    <Check className="w-3 h-3 text-white" />
                  )}
                </div>
                <span className="flex-1">{themeOption.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Default icon-only variant
  return (
    <div className="relative" data-theme-menu>
      <button
        onClick={() => setShowThemeMenu(!showThemeMenu)}
        className={cn(
          'group relative w-9 h-9 rounded-md',
          'flex items-center justify-center',
          'text-gray-700 dark:text-gray-300',
          'hover:text-gray-900 dark:hover:text-white',
          'bg-transparent hover:bg-gray-100 dark:hover:bg-[#252525]',
          'border border-gray-200/60 dark:border-[#2f2f2f]',
          'transition-all duration-150 ease-out'
        )}
        aria-label="Change theme"
      >
        <Palette 
          className="transition-transform duration-150 group-hover:scale-110"
          size={20}
        />
      </button>

      {/* Theme Dropdown Menu */}
      {showThemeMenu && (
        <div className={cn(
          'absolute top-full mt-2 right-0 z-[100]',
          'bg-white dark:bg-[#1f1f1f]',
          'border border-gray-200/60 dark:border-[#2f2f2f]',
          'rounded-lg shadow-xl',
          'py-2',
          'min-w-[200px]',
          'animate-in slide-in-from-top-2 duration-200'
        )}>
          {Object.values(themes).map((themeOption) => (
            <button
              key={themeOption.name}
              onClick={() => {
                setTheme(themeOption.name);
                setShowThemeMenu(false);
              }}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-2.5',
                'text-sm font-medium text-left',
                'transition-colors duration-150',
                theme === themeOption.name
                  ? 'bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#252525]'
              )}
            >
              <div className={cn(
                'w-5 h-5 rounded-full border-2 flex items-center justify-center',
                theme === themeOption.name
                  ? 'border-blue-600 dark:border-blue-400 bg-blue-600 dark:bg-blue-400'
                  : 'border-gray-300 dark:border-gray-600'
              )}>
                {theme === themeOption.name && (
                  <Check className="w-3 h-3 text-white" />
                )}
              </div>
              <span className="flex-1">{themeOption.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
