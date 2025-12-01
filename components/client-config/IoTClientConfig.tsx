/**
 * IoTClientConfig - IoT client configuration card
 */

'use client';

import { useState } from 'react';
import { Wifi, Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { themeColors } from '@/lib/theme';
import { cardVariants, transitions, buttonVariants, typography } from '@/lib/design-system';
import { useThemeColors } from '@/hooks/useThemeColors';
import { cn } from '@/lib/utils';

export function IoTClientConfig() {
  const [clientId, setClientId] = useState('');
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const theme = useThemeColors();

  const handleUpdate = () => {
    console.log('Update client ID:', clientId);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(clientId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        'group relative overflow-hidden',
        'p-6 rounded-xl',
        themeColors.surface,
        'border border-gray-800/50',
        'hover:border-cyan-500/30',
        cardVariants.elevated,
        transitions.default
      )}
    >
      {/* Gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />
      
      <div className="flex flex-col items-center gap-3 mb-6">
        <div className="p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
          <Wifi className="w-5 h-5 text-cyan-400" />
        </div>
        <div>
          <h3 className={typography.styles.cardHeader}>IoT Client</h3>
          <p className={typography.styles.cardDescription}>Configure device connection</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="clientId" className="text-sm font-medium text-gray-300 mb-2 block">
            Client Identifier
          </Label>
          <div className="flex gap-2">
            <Input
              id="clientId"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              placeholder="e.g., MES-CLIENT-001"
              className={cn(
                'h-11 border text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500',
                theme.input,
                'focus:ring-2',
                transitions.default
              )}
            />
            {clientId && (
              <Button
                onClick={handleCopy}
                variant="outline"
                size="icon"
                className={cn(
                  'h-11 w-11 border-gray-700/50',
                  copied ? 'border-green-500/50 text-green-400' : 'text-gray-400',
                  transitions.default
                )}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Unique identifier for this device instance
          </p>
        </div>

        <Button
          onClick={handleUpdate}
          disabled={!clientId.trim()}
          className={cn(
            'w-full h-10',
            saved ? buttonVariants.success : cn(theme.accentPrimary, theme.accentHover),
            transitions.default
          )}
        >
          {saved ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Saved
            </>
          ) : (
            'Update Client ID'
          )}
        </Button>
      </div>
    </div>
  );
}
