/**
 * SidebarAISection - AI Assist section organism
 * BETA feature with expandable submenu
 */

'use client';

import { useState } from 'react';
import { Sparkles, MessageSquare, LineChart, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useThemeColors } from '@/hooks/useThemeColors';
import { SidebarSubItem } from './SidebarSubItem';

interface SidebarAISectionProps {
  isCollapsed: boolean;
  isMobile: boolean;
  onMobileClose?: () => void;
}

export function SidebarAISection({
  isCollapsed,
  isMobile,
  onMobileClose,
}: SidebarAISectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const themeColors = useThemeColors();

  // Collapsed state for desktop
  if (isCollapsed && !isMobile) {
    return (
      <button
        onClick={() => {}}
        className={cn(
          'w-full flex items-center justify-center p-2.5 rounded-md',
          'text-gray-700 dark:text-gray-300',
          'hover:bg-gray-50 dark:hover:bg-gray-800/50',
          'transition-all duration-200',
          'group relative'
        )}
      >
        <Sparkles 
          className={cn(
            'w-5 h-5',
            themeColors.textTertiary,
            'group-hover:text-blue-600 dark:group-hover:text-blue-400',
            'transition-all duration-200'
          )}
        />
        <span
          className={cn(
            'absolute left-full ml-2 px-2.5 py-1.5',
            'bg-white dark:bg-gray-800',
            'text-gray-900 dark:text-gray-100',
            'text-xs font-medium rounded-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity duration-200 z-50 shadow-lg'
          )}
        >
          AI Assist (BETA)
        </span>
      </button>
    );
  }

  return (
    <div className="space-y-1">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          'w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md',
          'text-gray-700 dark:text-gray-300',
          'hover:bg-gray-50 dark:hover:bg-gray-800/50',
          'hover:text-gray-900 dark:hover:text-white',
          'transition-all duration-200',
          'font-medium group'
        )}
      >
        <Sparkles className={cn(
          'w-[18px] h-[18px] flex-shrink-0',
          themeColors.textTertiary,
          'group-hover:text-blue-600 dark:group-hover:text-blue-400',
          'transition-all duration-200'
        )} />
        <span className="text-[15px] flex-1 text-left">AI Assist</span>
        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500 text-white">
          BETA
        </span>
        <ChevronDown
          className={cn(
            'w-4 h-4 transition-transform duration-200',
            isExpanded && 'rotate-180'
          )}
        />
      </button>

      {isExpanded && (
        <div className="ml-6 pl-3 border-l border-gray-200/60 dark:border-gray-700/60 space-y-1">
          <SidebarSubItem
            icon={MessageSquare}
            label="Chat"
            href="/ai/chat"
            onMobileClose={onMobileClose}
          />
          <SidebarSubItem
            icon={LineChart}
            label="Charts"
            href="/ai/charts"
            onMobileClose={onMobileClose}
          />
          <SidebarSubItem
            icon={Sparkles}
            label="Google Gemini"
            href="/ai/gemini"
            onMobileClose={onMobileClose}
          />
        </div>
      )}
    </div>
  );
}
