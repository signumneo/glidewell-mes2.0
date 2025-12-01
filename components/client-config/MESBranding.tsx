/**
 * MESBranding - MES branding configuration (Admin only)
 */

'use client';

import { useState } from 'react';
import { Palette, Check, RotateCcw, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { themeColors } from '@/lib/theme';
import { cardVariants, transitions, buttonVariants, typography } from '@/lib/design-system';
import { useThemeColors } from '@/hooks/useThemeColors';
import { cn } from '@/lib/utils';

export function MESBranding() {
  const [appTitle, setAppTitle] = useState('fastmill.io Dashboard');
  const [logoSvg, setLogoSvg] = useState('MES');
  const [saved, setSaved] = useState(false);
  const theme = useThemeColors();

  const handleUpdateBranding = () => {
    console.log('Update branding:', { appTitle, logoSvg });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleResetDefaults = () => {
    setAppTitle('fastmill.io Dashboard');
    setLogoSvg('MES');
  };

  const handleSaveAll = () => {
    console.log('Save all configuration');
  };

  return (
    <div
      className={cn(
        'group relative overflow-hidden',
        'p-8 rounded-xl',
        themeColors.surface,
        'border border-gray-800/50',
        'hover:border-orange-500/30',
        cardVariants.elevated,
        transitions.default
      )}
    >
      {/* Gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-50" />
      
      <div className="flex flex-col items-center gap-3 mb-6">
        <div className="p-2.5 rounded-lg bg-orange-500/10 border border-orange-500/20">
          <Palette className="w-5 h-5 text-orange-400" />
        </div>
        <div>
          <div className="flex items-center justify-center gap-2">
            <h3 className={typography.styles.cardHeader}>MES Branding</h3>
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20">
              <Shield className="w-3 h-3 text-orange-400" />
              <span className="text-xs font-medium text-orange-400">Admin Only</span>
            </div>
          </div>
          <p className={cn(typography.styles.cardDescription, 'mt-1')}>Global interface customization</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Application Title */}
          <div>
            <Label htmlFor="appTitle" className="text-sm font-medium text-gray-300 mb-2 block">
              Application Title
            </Label>
            <Input
              id="appTitle"
              value={appTitle}
              onChange={(e) => setAppTitle(e.target.value)}
              placeholder="Enter application title"
              className={cn(
                'h-11 border text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500',
                theme.input,
                'focus:ring-2',
                transitions.default
              )}
            />
          </div>

          {/* Logo SVG Code */}
          <div>
            <Label htmlFor="logoSvg" className="text-sm font-medium text-gray-300 mb-2 block">
              Logo Code/URL
            </Label>
            <Input
              id="logoSvg"
              value={logoSvg}
              onChange={(e) => setLogoSvg(e.target.value)}
              placeholder="SVG code or image URL"
              className={cn(
                'h-11 border text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500',
                theme.input,
                'focus:ring-2',
                transitions.default
              )}
            />
          </div>
        </div>

        {/* Preview */}
        <div className={cn(
          'p-6 rounded-lg border',
          theme.surfaceSecondary,
          theme.border
        )}>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 text-center">Preview</p>
          <p className={cn(
            'text-xl font-bold text-center tracking-tight',
            theme.accentPrimary.includes('text-white') ? theme.sidebarAccent : 'text-gray-900 dark:text-white'
          )}>{appTitle}</p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={handleResetDefaults}
            variant="outline"
            className={cn(
              'flex-1 h-10 border-gray-700/50 text-gray-300',
              'hover:bg-gray-800/50 hover:border-gray-600',
              transitions.default
            )}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset Defaults
          </Button>
          <Button
            onClick={handleUpdateBranding}
            className={cn(
              'flex-1 h-10',
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
              'Update Branding'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
