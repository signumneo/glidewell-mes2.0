'use client';

import { useState } from 'react';
import { useThemeColors } from '@/hooks/useThemeColors';
import { transitions } from '@/lib/design-system';
import { cn } from '@/lib/utils';
import { DefinitionHeader } from '@/components/definition/DefinitionHeader';
import { GeneralConfig } from '@/components/definition/GeneralConfig';
import { SubprocessConfig } from '@/components/definition/SubprocessConfig';

export default function DefinitionDefinePage() {
  const theme = useThemeColors();
  const [activeTab, setActiveTab] = useState<'general' | 'subprocess'>('general');
  const [partNumber, setPartNumber] = useState('');
  const [version, setVersion] = useState('');
  const [description, setDescription] = useState('');

  const canAccessSubprocess = description.trim().length > 0;

  return (
    <div className="space-y-6">
      {/* Always visible Part Number and Version header */}
      <DefinitionHeader
        partNumber={partNumber}
        version={version}
        onPartNumberChange={setPartNumber}
        onVersionChange={setVersion}
      />

      {/* Tab Navigation */}
      <div className={cn('flex gap-2 border-b', theme.border)}>
        <button
          onClick={() => setActiveTab('general')}
          className={cn(
            'px-6 py-3 font-medium border-b-2 transition-colors',
            transitions.default,
            activeTab === 'general'
              ? 'border-blue-500 text-blue-600 dark:text-blue-400'
              : cn('border-transparent', theme.textSecondary, 'hover:text-gray-900 dark:hover:text-white')
          )}
        >
          General Configuration
        </button>
        <button
          onClick={() => canAccessSubprocess && setActiveTab('subprocess')}
          disabled={!canAccessSubprocess}
          className={cn(
            'px-6 py-3 font-medium border-b-2 transition-colors',
            transitions.default,
            activeTab === 'subprocess'
              ? 'border-blue-500 text-blue-600 dark:text-blue-400'
              : cn(
                  'border-transparent',
                  canAccessSubprocess
                    ? cn(theme.textSecondary, 'hover:text-gray-900 dark:hover:text-white')
                    : 'text-gray-400 cursor-not-allowed'
                )
          )}
          title={!canAccessSubprocess ? 'Complete General Configuration to access Subprocess' : ''}
        >
          Subprocess Configuration
        </button>
      </div>

      {/* Tab Content */}
      <div className="pb-8">
        {activeTab === 'general' && (
          <GeneralConfig
            description={description}
            onDescriptionChange={setDescription}
            onConfigureSubprocess={() => setActiveTab('subprocess')}
            canConfigureSubprocess={canAccessSubprocess}
          />
        )}
        {activeTab === 'subprocess' && <SubprocessConfig />}
      </div>
    </div>
  );
}
