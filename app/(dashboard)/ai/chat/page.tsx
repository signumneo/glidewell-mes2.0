/**
 * AI Chat Page - Conversational AI interface
 */

'use client';

import { ChatArea, ChatInput, SuggestionChips } from '@/components/ai';
import { useAIChat } from '@/hooks/useAIChat';
import { useThemeColors } from '@/hooks/useThemeColors';
import { cardVariants, transitions } from '@/lib/design-system';
import { cn } from '@/lib/utils';
import { RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AIChatPage() {
  const theme = useThemeColors();
  const { messages, loading, suggestions, sendMessage, resetChat } = useAIChat();

  return (
    <div className="-m-8 h-screen">
      <div
        className={cn(
          'flex flex-col rounded-none border-0 overflow-hidden h-full',
          theme.surfacePrimary,
          cardVariants.elevated,
          transitions.default
        )}
      >
      {/* Header with Reset */}
      {messages.length > 0 && (
        <div className={cn('px-4 py-3 border-b flex justify-end', theme.border)}>
          <Button
            onClick={resetChat}
            variant="outline"
            size="sm"
            className={cn(
              'gap-2 h-8 text-xs',
              theme.border,
              theme.hoverBackground,
              transitions.default
            )}
          >
            <RotateCcw className="w-3 h-3" />
            Reset Chat
          </Button>
        </div>
      )}

      {/* Messages Area */}
      <ChatArea messages={messages} loading={loading} />

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="px-6 pb-4">
          <SuggestionChips
            suggestions={suggestions}
            onSelect={sendMessage}
            disabled={loading}
          />
        </div>
      )}

      {/* Input Area */}
      <div className={cn('p-4 border-t', theme.border)}>
        <ChatInput
          onSend={sendMessage}
          loading={loading}
          placeholder="Ask me anything about your manufacturing data..."
        />
      </div>
    </div>
    </div>
  );
}
