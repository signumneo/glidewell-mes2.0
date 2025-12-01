'use client';

import { useState } from 'react';
import { useThemeColors } from '@/hooks/useThemeColors';
import { transitions } from '@/lib/design-system';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Paperclip, Sparkles } from 'lucide-react';

interface GeminiChatAreaProps {
  apiKey: string;
  maxRetries: number;
  useKnowledgeBase: boolean;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function GeminiChatArea({ apiKey, maxRetries, useKnowledgeBase }: GeminiChatAreaProps) {
  const theme = useThemeColors();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! This is Google Gemini. How can I help you analyze your data today? You can ask me to create charts, analyze data, or upload files for analysis.',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInputValue('');

    // TODO: Call Gemini API
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className={cn(
        'p-4 border-b flex items-center justify-between',
        theme.surface,
        theme.border
      )}>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500" />
          <span className={cn('text-sm font-medium', theme.text)}>Chat</span>
        </div>
        <div className={cn('text-xs', theme.textSecondary)}>
          KB
        </div>
      </div>

      {/* Messages Area */}
      <div className={cn('flex-1 overflow-y-auto p-6 space-y-4', theme.background)}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              'flex gap-3',
              message.role === 'user' ? 'justify-end' : 'justify-start'
            )}
          >
            {message.role === 'assistant' && (
              <div className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center',
                theme.accentPrimary
              )}>
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            )}
            <div
              className={cn(
                'max-w-2xl p-4 rounded-lg',
                message.role === 'user'
                  ? cn(theme.accentPrimary, 'text-white')
                  : cn(theme.surface, theme.border, 'border'),
                transitions.default
              )}
            >
              <p className={cn(
                'text-sm',
                message.role === 'user' ? 'text-white' : theme.text
              )}>
                {message.content}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Suggested Actions */}
      <div className={cn('px-6 pb-4 flex gap-2', theme.background)}>
        <button
          className={cn(
            'px-4 py-2 rounded-full text-xs border',
            theme.border,
            theme.surface,
            theme.accentHover,
            transitions.default
          )}
        >
          📊 Sample Bar Chart
        </button>
        <button
          className={cn(
            'px-4 py-2 rounded-full text-xs border',
            theme.border,
            theme.surface,
            theme.accentHover,
            transitions.default
          )}
        >
          📈 Stock Analysis
        </button>
        <button
          className={cn(
            'px-4 py-2 rounded-full text-xs border',
            theme.border,
            theme.surface,
            theme.accentHover,
            transitions.default
          )}
        >
          🥧 Pie Chart
        </button>
      </div>

      {/* Input Area */}
      <div className={cn('p-6 border-t', theme.surface, theme.border)}>
        <div className="flex gap-3">
          <button
            className={cn(
              'p-3 rounded-lg',
              theme.surface,
              theme.border,
              'border hover:bg-gray-700/50',
              transitions.default
            )}
          >
            <Paperclip className={cn('w-5 h-5', theme.textSecondary)} />
          </button>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me to analyze data, create charts, or upload files..."
            className={cn(
              'h-12 border text-gray-900 dark:text-white',
              theme.input,
              'focus:ring-2',
              transitions.default
            )}
          />
          <Button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className={cn(
              'h-12 px-6',
              theme.accentPrimary,
              theme.accentHover,
              transitions.default,
              !inputValue.trim() && 'opacity-50 cursor-not-allowed'
            )}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
