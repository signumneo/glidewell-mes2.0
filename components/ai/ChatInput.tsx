/**
 * ChatInput - Multiline chat input with send button (Molecule)
 */

'use client';

import { useState, useRef, KeyboardEvent } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useThemeColors } from '@/hooks/useThemeColors';
import { transitions } from '@/lib/design-system';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  onSend: (message: string) => void;
  loading?: boolean;
  placeholder?: string;
  disabled?: boolean;
}

export function ChatInput({
  onSend,
  loading = false,
  placeholder = 'Type your message...',
  disabled = false,
}: ChatInputProps) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const theme = useThemeColors();

  const handleSend = () => {
    if (!message.trim() || loading || disabled) return;
    onSend(message);
    setMessage('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    // Auto-resize textarea
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`;
  };

  return (
    <div
      className={cn(
        'flex gap-3 p-4 rounded-xl border',
        theme.surfacePrimary,
        theme.border,
        transitions.default
      )}
    >
      <textarea
        ref={textareaRef}
        value={message}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled || loading}
        rows={1}
        className={cn(
          'flex-1 resize-none outline-none bg-transparent',
          'text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500',
          'max-h-[200px] min-h-[24px]',
          'disabled:opacity-50 disabled:cursor-not-allowed'
        )}
      />
      <Button
        onClick={handleSend}
        disabled={!message.trim() || loading || disabled}
        className={cn(
          'h-10 w-10 p-0 rounded-lg shrink-0',
          theme.accentPrimary,
          theme.accentHover,
          transitions.default,
          'disabled:opacity-50 disabled:cursor-not-allowed'
        )}
      >
        {loading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Send className="w-5 h-5" />
        )}
      </Button>
    </div>
  );
}
