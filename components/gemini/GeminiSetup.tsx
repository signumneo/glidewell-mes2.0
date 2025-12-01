'use client';

import { useState } from 'react';
import { useThemeColors } from '@/hooks/useThemeColors';
import { cardVariants, transitions, typography } from '@/lib/design-system';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Key, Sparkles, ExternalLink } from 'lucide-react';

interface GeminiSetupProps {
  onSubmit: (apiKey: string) => void;
}

export function GeminiSetup({ onSubmit }: GeminiSetupProps) {
  const theme = useThemeColors();
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!apiKey.trim()) {
      setError('Please enter an API key');
      return;
    }

    if (apiKey.length < 20) {
      setError('Invalid API key format');
      return;
    }

    setError('');
    onSubmit(apiKey.trim());
  };

  return (
    <div className={cn('h-full flex items-center justify-center p-8', theme.background)}>
      <div className={cn(
        theme.surface,
        theme.border,
        cardVariants.elevated,
        'p-8 max-w-2xl w-full space-y-6'
      )}>
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center">
            <div className={cn(
              'p-4 rounded-full',
              theme.accentPrimary,
              'bg-opacity-20'
            )}>
              <Sparkles className={cn('w-8 h-8', theme.text)} />
            </div>
          </div>
          <h1 className={cn(typography.styles.sectionTitle)}>
            Gemini Analyst
          </h1>
          <p className={cn(typography.styles.sectionSubtitle)}>
            Connect your Google Gemini API to start analyzing data, creating charts, and more
          </p>
        </div>

        {/* API Key Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={cn('block text-sm font-medium mb-2', theme.textSecondary)}>
              Google Gemini API Key
            </label>
            <div className="relative">
              <Key className={cn('absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4', theme.textSecondary)} />
              <Input
                type="password"
                value={apiKey}
                onChange={(e) => {
                  setApiKey(e.target.value);
                  setError('');
                }}
                placeholder="Enter your Gemini API key"
                className={cn(
                  'h-12 pl-10 border text-gray-900 dark:text-white',
                  theme.input,
                  'focus:ring-2',
                  transitions.default,
                  error && 'border-red-500'
                )}
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
          </div>

          <Button
            type="submit"
            className={cn(
              'w-full h-12',
              theme.accentPrimary,
              theme.accentHover,
              transitions.default,
              'flex items-center justify-center gap-2'
            )}
          >
            <Key className="w-4 h-4" />
            Connect API Key
          </Button>
        </form>

        {/* Help Section */}
        <div className={cn(
          'p-4 rounded-lg border',
          theme.border,
          'bg-opacity-50',
          theme.surface
        )}>
          <h3 className={cn('text-sm font-semibold mb-2', theme.text)}>
            Don't have an API key?
          </h3>
          <p className={cn('text-sm mb-3', theme.textSecondary)}>
            Get your free Google Gemini API key from Google AI Studio
          </p>
          <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'inline-flex items-center gap-2 text-sm',
              theme.accentPrimary,
              'hover:underline',
              transitions.default
            )}
          >
            <ExternalLink className="w-4 h-4" />
            Get API Key from Google AI Studio
          </a>
        </div>

        {/* Security Note */}
        <p className={cn('text-xs text-center', theme.textSecondary)}>
          Your API key is stored locally in your browser and never sent to our servers
        </p>
      </div>
    </div>
  );
}
