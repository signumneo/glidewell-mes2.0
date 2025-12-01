/**
 * useAIChat - Custom hook for AI chat functionality
 */

'use client';

import { useState } from 'react';
import type { Message } from '@/components/ai';

const DEFAULT_SUGGESTIONS = [
  'Show me today\'s production metrics',
  'What are the top performing routers?',
  'Analyze recent work order trends',
  'Generate inventory report',
];

export function useAIChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>(DEFAULT_SUGGESTIONS);

  const sendMessage = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    setSuggestions([]);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I understand you're asking about "${content}". This is a demo response. In production, this would connect to your AI service.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setLoading(false);
      
      // Show new suggestions after response
      setSuggestions([
        'Tell me more details',
        'Show me the data visualization',
        'Export this information',
      ]);
    }, 1500);
  };

  const resetChat = () => {
    setMessages([]);
    setSuggestions(DEFAULT_SUGGESTIONS);
    setLoading(false);
  };

  return {
    messages,
    loading,
    suggestions,
    sendMessage,
    resetChat,
  };
}
