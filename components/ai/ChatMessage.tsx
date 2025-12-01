/**
 * ChatMessage - Individual chat message bubble (Molecule)
 */

'use client';

import { Bot, User } from 'lucide-react';
import { useThemeColors } from '@/hooks/useThemeColors';
import { cardVariants, transitions } from '@/lib/design-system';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
}

export function ChatMessage({ role, content, timestamp }: ChatMessageProps) {
  const theme = useThemeColors();
  const isUser = role === 'user';

  return (
    <div className={cn('flex gap-3', isUser ? 'flex-row-reverse' : 'flex-row')}>
      {/* Avatar */}
      <div
        className={cn(
          'w-8 h-8 rounded-full flex items-center justify-center shrink-0',
          isUser
            ? cn(theme.accentPrimary)
            : 'bg-purple-100 dark:bg-purple-900/30'
        )}
      >
        {isUser ? (
          <User className="w-4 h-4 text-white" />
        ) : (
          <Bot className="w-4 h-4 text-purple-600 dark:text-purple-400" />
        )}
      </div>

      {/* Message bubble */}
      <div className={cn('flex flex-col gap-1 max-w-[75%]', isUser && 'items-end')}>
        <div
          className={cn(
            'px-4 py-3 rounded-2xl',
            isUser
              ? cn(theme.accentSecondary)
              : cn(theme.surfaceSecondary, theme.border, cardVariants.default),
            transitions.default
          )}
        >
          <p className="text-sm text-gray-900 dark:text-gray-100 whitespace-pre-wrap">
            {content}
          </p>
        </div>
        {timestamp && (
          <p className="text-xs text-gray-400 dark:text-gray-500 px-2">
            {timestamp}
          </p>
        )}
      </div>
    </div>
  );
}
