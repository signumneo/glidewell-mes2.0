'use client';

import { useThemeColors } from '@/hooks/useThemeColors';
import { transitions } from '@/lib/design-system';
import { cn } from '@/lib/utils';
import { X, Settings } from 'lucide-react';

interface GeminiDebugConsoleProps {
  onClose: () => void;
}

interface LogEntry {
  type: 'INFO' | 'SUCCESS' | 'ERROR';
  timestamp: string;
  message: string;
}

export function GeminiDebugConsole({ onClose }: GeminiDebugConsoleProps) {
  const theme = useThemeColors();

  const logs: LogEntry[] = [
    {
      type: 'INFO',
      timestamp: '11:56:06 AM',
      message: 'Debug console initialized',
    },
    {
      type: 'SUCCESS',
      timestamp: '11:56:40 AM',
      message: 'Chat session and file search service initialized successfully',
    },
    {
      type: 'SUCCESS',
      timestamp: '11:56:40 AM',
      message: 'Knowledge base loaded: 1 files found',
    },
  ];

  const getLogColor = (type: LogEntry['type']) => {
    switch (type) {
      case 'INFO':
        return 'text-blue-400';
      case 'SUCCESS':
        return 'text-green-400';
      case 'ERROR':
        return 'text-red-400';
    }
  };

  return (
    <div className={cn(
      'w-96 h-full p-6',
      theme.surface,
      theme.border,
      'border-l'
    )}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Settings className={cn('w-5 h-5', theme.text)} />
          <h3 className={cn('text-lg font-semibold', theme.text)}>
            Debug Console
          </h3>
        </div>
        <button
          onClick={onClose}
          className={cn(
            'p-1 rounded',
            theme.accentHover,
            transitions.default
          )}
        >
          <X className={cn('w-5 h-5', theme.textSecondary)} />
        </button>
      </div>

      {/* Log Entries */}
      <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-120px)]">
        {logs.map((log, index) => (
          <div
            key={index}
            className={cn(
              'p-4 rounded-lg border',
              theme.border,
              theme.surface
            )}
          >
            <div className={cn('text-xs font-semibold mb-1', getLogColor(log.type))}>
              {log.type} {log.timestamp}
            </div>
            <pre className={cn('text-xs font-mono whitespace-pre-wrap break-words', theme.text)}>
              {JSON.stringify({ message: log.message }, null, 2)}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}
