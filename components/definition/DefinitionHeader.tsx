'use client';

import { useThemeColors } from '@/hooks/useThemeColors';
import { cardVariants, transitions, typography } from '@/lib/design-system';
import { cn } from '@/lib/utils';
import { Upload, FileJson } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface DefinitionHeaderProps {
  partNumber: string;
  version: string;
  onPartNumberChange: (value: string) => void;
  onVersionChange: (value: string) => void;
}

export function DefinitionHeader({
  partNumber,
  version,
  onPartNumberChange,
  onVersionChange,
}: DefinitionHeaderProps) {
  const theme = useThemeColors();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/json') {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target?.result as string);
          // TODO: Handle JSON import
          console.log('JSON uploaded:', json);
        } catch (error) {
          console.error('Invalid JSON file');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className={cn(
      theme.surface,
      theme.border,
      cardVariants.elevated,
      'p-6'
    )}>
      <div className="flex items-center justify-between gap-6">
        {/* Part Number and Version Inputs */}
        <div className="flex items-center gap-4 flex-1">
          <div className="flex-1 max-w-md">
            <label className={cn('block text-sm font-medium mb-2', theme.textSecondary)}>
              Part Number
            </label>
            <Input
              value={partNumber}
              onChange={(e) => onPartNumberChange(e.target.value)}
              placeholder="Enter part number"
              className={cn(
                'h-11 border text-gray-900 dark:text-white',
                theme.input,
                'focus:ring-2',
                transitions.default
              )}
            />
          </div>
          <div className="flex-1 max-w-md">
            <label className={cn('block text-sm font-medium mb-2', theme.textSecondary)}>
              Version
            </label>
            <Input
              value={version}
              onChange={(e) => onVersionChange(e.target.value)}
              placeholder="Enter version"
              className={cn(
                'h-11 border text-gray-900 dark:text-white',
                theme.input,
                'focus:ring-2',
                transitions.default
              )}
            />
          </div>
        </div>

        {/* OR Divider + Upload Button */}
        <div className="flex items-end gap-4 pb-2">
          <div className={cn('flex items-center gap-3', theme.textSecondary)}>
            <div className={cn('h-px w-12', theme.border)} />
            <span className="text-sm font-medium">OR</span>
            <div className={cn('h-px w-12', theme.border)} />
          </div>
          
          <div>
            <input
              type="file"
              id="json-upload"
              accept=".json"
              className="hidden"
              onChange={handleFileUpload}
            />
            <Button
              onClick={() => document.getElementById('json-upload')?.click()}
              className={cn(
                'h-11 px-6',
                theme.accentPrimary,
                theme.accentHover,
                transitions.default,
                'flex items-center gap-2'
              )}
            >
              <FileJson className="w-4 h-4" />
              Upload JSON
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
