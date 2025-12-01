'use client';

import { useState } from 'react';
import { useThemeColors } from '@/hooks/useThemeColors';
import { cardVariants, typography } from '@/lib/design-system';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Settings2 } from 'lucide-react';
import { FormField, SelectField } from './FormFields';

interface GeneralConfigProps {
  description: string;
  onDescriptionChange: (value: string) => void;
  onConfigureSubprocess: () => void;
  canConfigureSubprocess: boolean;
}

export function GeneralConfig({
  description,
  onDescriptionChange,
  onConfigureSubprocess,
  canConfigureSubprocess,
}: GeneralConfigProps) {
  const theme = useThemeColors();
  
  const [bomNumber, setBomNumber] = useState('');
  const [bomVersion, setBomVersion] = useState('');
  const [drwNumber, setDrwNumber] = useState('');
  const [drwVersion, setDrwVersion] = useState('');
  const [proNumber, setProNumber] = useState('');
  const [proRev, setProRev] = useState('');
  const [quantity, setQuantity] = useState('');
  const [barcodePrefix, setBarcodePrefix] = useState('');
  const [startingRouter, setStartingRouter] = useState('');
  const [reusable, setReusable] = useState('');

  return (
    <div className={cn(
      theme.surface,
      theme.border,
      cardVariants.elevated,
      'p-6'
    )}>
      <h3 className={cn(typography.styles.sectionTitle, 'mb-6 text-center')}>
        General Configuration
      </h3>

      <div className="space-y-6 max-w-6xl mx-auto">
        {/* Row 1: Description, BomNumber, BomVersion */}
        <div className="grid grid-cols-3 gap-4">
          <FormField
            label="Description"
            value={description}
            onChange={onDescriptionChange}
            required
          />
          <FormField
            label="BomNumber"
            value={bomNumber}
            onChange={setBomNumber}
          />
          <FormField
            label="BomVersion"
            value={bomVersion}
            onChange={setBomVersion}
          />
        </div>

        {/* Row 2: DrwNumber, DrwVersion, ProNumber */}
        <div className="grid grid-cols-3 gap-4">
          <FormField
            label="DrwNumber"
            value={drwNumber}
            onChange={setDrwNumber}
          />
          <FormField
            label="DrwVersion"
            value={drwVersion}
            onChange={setDrwVersion}
          />
          <FormField
            label="ProNumber"
            value={proNumber}
            onChange={setProNumber}
          />
        </div>

        {/* Row 3: ProRev, Quantity, BarcodePrefix */}
        <div className="grid grid-cols-3 gap-4">
          <FormField
            label="ProRev"
            value={proRev}
            onChange={setProRev}
          />
          <FormField
            label="Quantity"
            value={quantity}
            onChange={setQuantity}
            type="number"
          />
          <FormField
            label="BarcodePrefix"
            value={barcodePrefix}
            onChange={setBarcodePrefix}
          />
        </div>

        {/* Row 4: StartingRouter, Reusable (dropdown) */}
        <div className="grid grid-cols-2 gap-4 max-w-[66.66%]">
          <FormField
            label="StartingRouter"
            value={startingRouter}
            onChange={setStartingRouter}
          />
          <SelectField
            label="Reusable"
            value={reusable}
            onChange={setReusable}
            options={[
              { value: 'true', label: 'Yes' },
              { value: 'false', label: 'No' },
            ]}
          />
        </div>

        {/* Configure Subprocess Button */}
        <div className="flex justify-center pt-4">
          <Button
            onClick={onConfigureSubprocess}
            disabled={!canConfigureSubprocess}
            className={cn(
              'px-8 h-12',
              theme.accentPrimary,
              theme.accentHover,
              'flex items-center gap-2',
              !canConfigureSubprocess && 'opacity-50 cursor-not-allowed'
            )}
            title={!canConfigureSubprocess ? 'Please enter a description to continue' : ''}
          >
            <Settings2 className="w-4 h-4" />
            Configure Subprocess
          </Button>
        </div>
      </div>
    </div>
  );
}
