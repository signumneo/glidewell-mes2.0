'use client';

import { useThemeColors } from '@/hooks/useThemeColors';
import { transitions } from '@/lib/design-system';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  Code, 
  Download, 
  Upload, 
  Trash2, 
  RefreshCw,
  Settings,
  Key
} from 'lucide-react';

interface GeminiSidebarProps {
  maxRetries: number;
  onMaxRetriesChange: (value: number) => void;
  useKnowledgeBase: boolean;
  onUseKnowledgeBaseChange: (value: boolean) => void;
  showDebugConsole: boolean;
  onToggleDebugConsole: () => void;
  onClearApiKey: () => void;
  apiKey: string;
}

export function GeminiSidebar({
  maxRetries,
  onMaxRetriesChange,
  useKnowledgeBase,
  onUseKnowledgeBaseChange,
  showDebugConsole,
  onToggleDebugConsole,
  onClearApiKey,
  apiKey,
}: GeminiSidebarProps) {
  const theme = useThemeColors();

  return (
    <div className={cn(
      'w-80 h-full p-6 space-y-6',
      theme.surface,
      theme.border,
      'border-r'
    )}>
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Code className={cn('w-5 h-5', theme.text)} />
          <h2 className={cn('text-lg font-semibold', theme.text)}>
            Gemini Analyst
          </h2>
        </div>
        <p className={cn('text-sm', theme.textSecondary)}>
          Configure your AI assistant settings
        </p>
      </div>

      {/* Max Tool Retries */}
      <div className="space-y-3">
        <label className={cn('text-sm font-medium', theme.text)}>
          Max Tool Retries
        </label>
        <input
          type="range"
          min="1"
          max="10"
          value={maxRetries}
          onChange={(e) => onMaxRetriesChange(Number(e.target.value))}
          className={cn('w-full', transitions.default)}
        />
        <p className={cn('text-xs', theme.textSecondary)}>
          Max attempts for the model to self-correct on errors.
        </p>
      </div>

      {/* Use Knowledge Base Toggle */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="knowledge-base"
          checked={useKnowledgeBase}
          onChange={(e) => onUseKnowledgeBaseChange(e.target.checked)}
          className={cn('w-4 h-4 rounded', transitions.default)}
        />
        <label htmlFor="knowledge-base" className={cn('text-sm', theme.text)}>
          Use Knowledge Base
        </label>
        <button
          className={cn(
            'ml-auto w-5 h-5 rounded-full flex items-center justify-center text-xs',
            theme.surface,
            theme.border,
            'border'
          )}
          title="Information about Knowledge Base"
        >
          ?
        </button>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        <Button
          onClick={onToggleDebugConsole}
          className={cn(
            'w-full h-10 justify-start gap-2',
            showDebugConsole ? theme.accentPrimary : theme.surface,
            theme.accentHover,
            theme.border,
            'border',
            transitions.default
          )}
          variant={showDebugConsole ? 'default' : 'outline'}
        >
          <Code className="w-4 h-4" />
          Debug Console
        </Button>

        <Button
          className={cn(
            'w-full h-10 justify-start gap-2',
            theme.surface,
            theme.accentHover,
            theme.border,
            'border',
            transitions.default
          )}
          variant="outline"
        >
          <Download className="w-4 h-4" />
          Export Chat
        </Button>

        <Button
          className={cn(
            'w-full h-10 justify-start gap-2',
            theme.surface,
            theme.accentHover,
            theme.border,
            'border',
            transitions.default
          )}
          variant="outline"
        >
          <Upload className="w-4 h-4" />
          Import from AI Chat
        </Button>

        <Button
          className={cn(
            'w-full h-10 justify-start gap-2',
            theme.surface,
            'hover:bg-orange-700/50',
            theme.border,
            'border border-orange-500/50',
            transitions.default
          )}
          variant="outline"
        >
          <Trash2 className="w-4 h-4" />
          Clear Chat
        </Button>

        <Button
          className={cn(
            'w-full h-10 justify-start gap-2',
            theme.surface,
            'hover:bg-red-700/50',
            theme.border,
            'border border-red-500/50',
            transitions.default
          )}
          variant="outline"
          onClick={onClearApiKey}
        >
          <RefreshCw className="w-4 h-4" />
          Clear All Data
        </Button>
      </div>

      {/* API Key Info */}
      <div className={cn(
        'p-3 rounded-lg border',
        theme.border,
        theme.surface,
        'bg-opacity-50'
      )}>
        <div className="flex items-center gap-2 mb-1">
          <Key className={cn('w-4 h-4', theme.textSecondary)} />
          <span className={cn('text-xs font-medium', theme.text)}>API Key</span>
        </div>
        <p className={cn('text-xs font-mono', theme.textSecondary)}>
          {apiKey.substring(0, 12)}...
        </p>
      </div>
    </div>
  );
}
