'use client';

import { useState } from 'react';
import { useThemeColors } from '@/hooks/useThemeColors';
import { cardVariants, transitions } from '@/lib/design-system';
import { cn } from '@/lib/utils';
import { GeminiSidebar } from './GeminiSidebar';
import { GeminiChatArea } from './GeminiChatArea';
import { GeminiDebugConsole } from './GeminiDebugConsole';

interface GeminiChatProps {
  apiKey: string;
  onClearApiKey: () => void;
}

export function GeminiChat({ apiKey, onClearApiKey }: GeminiChatProps) {
  const theme = useThemeColors();
  const [showDebugConsole, setShowDebugConsole] = useState(false);
  const [maxRetries, setMaxRetries] = useState(3);
  const [useKnowledgeBase, setUseKnowledgeBase] = useState(false);

  return (
    <div className="h-full flex">
      {/* Left Sidebar - Controls */}
      <GeminiSidebar
        maxRetries={maxRetries}
        onMaxRetriesChange={setMaxRetries}
        useKnowledgeBase={useKnowledgeBase}
        onUseKnowledgeBaseChange={setUseKnowledgeBase}
        showDebugConsole={showDebugConsole}
        onToggleDebugConsole={() => setShowDebugConsole(!showDebugConsole)}
        onClearApiKey={onClearApiKey}
        apiKey={apiKey}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <GeminiChatArea 
          apiKey={apiKey}
          maxRetries={maxRetries}
          useKnowledgeBase={useKnowledgeBase}
        />
      </div>

      {/* Right Debug Console */}
      {showDebugConsole && (
        <GeminiDebugConsole onClose={() => setShowDebugConsole(false)} />
      )}
    </div>
  );
}
