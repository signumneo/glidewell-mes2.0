'use client';

import { useState, useEffect } from 'react';
import { useThemeColors } from '@/hooks/useThemeColors';
import { GeminiSetup } from '@/components/gemini/GeminiSetup';
import { GeminiChat } from '@/components/gemini/GeminiChat';

export default function GeminiPage() {
  const theme = useThemeColors();
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if API key exists in localStorage
    const storedKey = localStorage.getItem('gemini-api-key');
    setApiKey(storedKey);
    setIsLoading(false);
  }, []);

  const handleApiKeySubmit = (key: string) => {
    localStorage.setItem('gemini-api-key', key);
    setApiKey(key);
  };

  const handleClearApiKey = () => {
    localStorage.removeItem('gemini-api-key');
    setApiKey(null);
  };

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className={theme.textSecondary}>Loading...</div>
      </div>
    );
  }

  return (
    <div className="-m-8 h-screen">
      {!apiKey ? (
        <GeminiSetup onSubmit={handleApiKeySubmit} />
      ) : (
        <GeminiChat apiKey={apiKey} onClearApiKey={handleClearApiKey} />
      )}
    </div>
  );
}
