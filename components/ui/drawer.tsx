/**
 * Drawer - Side panel component
 * Slides in from the right side
 */

'use client';

import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { transitions, typography } from '@/lib/design-system';
import { useThemeColors } from '@/hooks/useThemeColors';

interface DrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export function Drawer({ open, onOpenChange, children, title, description }: DrawerProps) {
  const theme = useThemeColors();

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm w-screen h-screen',
          transitions.default
        )}
        onClick={() => onOpenChange(false)}
        style={{ margin: 0, padding: 0 }}
      />

      {/* Drawer Panel */}
      <div
        className={cn(
          'fixed right-0 top-0 bottom-0 z-[9999] w-full sm:w-[400px] md:w-[500px]',
          theme.surfacePrimary,
          theme.border,
          'border-l shadow-2xl',
          'animate-in slide-in-from-right duration-300'
        )}
        style={{ margin: 0, padding: 0 }}
      >
        {/* Header */}
        <div className={cn('flex items-center justify-between p-6 border-b', theme.border)}>
          <div className="flex-1">
            {title && (
              <h2 className={typography.styles.cardTitle}>
                {title}
              </h2>
            )}
            {description && (
              <p className={cn(typography.styles.body, 'mt-1')}>
                {description}
              </p>
            )}
          </div>
          <button
            onClick={() => onOpenChange(false)}
            className={cn(
              'rounded-lg p-2 ml-4',
              theme.accentHover,
              transitions.default,
              theme.textTertiary,
              'hover:bg-gray-200 dark:hover:bg-gray-700'
            )}
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto h-[calc(100vh-88px)] p-6">
          {children}
        </div>
      </div>
    </>
  );
}
