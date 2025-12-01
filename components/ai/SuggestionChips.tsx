/**
 * SuggestionChips - Quick suggestion buttons (Molecule)
 */

'use client';

import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useThemeColors } from '@/hooks/useThemeColors';
import { transitions } from '@/lib/design-system';
import { cn } from '@/lib/utils';

interface SuggestionChipsProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
  disabled?: boolean;
}

export function SuggestionChips({ suggestions, onSelect, disabled = false }: SuggestionChipsProps) {
  const theme = useThemeColors();

  if (suggestions.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-purple-500 dark:text-purple-400" />
        <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
          Suggestions
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion, index) => (
          <Button
            key={index}
            onClick={() => onSelect(suggestion)}
            disabled={disabled}
            variant="outline"
            className={cn(
              'h-auto py-2 px-4 text-sm rounded-lg',
              'border text-gray-700 dark:text-gray-300',
              theme.border,
              theme.hoverBackground,
              transitions.default,
              'disabled:opacity-50 disabled:cursor-not-allowed'
            )}
          >
            {suggestion}
          </Button>
        ))}
      </div>
    </div>
  );
}
