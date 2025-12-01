/**
 * LocationSettings - Location configuration card
 */

'use client';

import { useState } from 'react';
import { MapPin, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { themeColors } from '@/lib/theme';
import { cardVariants, transitions, buttonVariants, typography } from '@/lib/design-system';
import { useThemeColors } from '@/hooks/useThemeColors';
import { cn } from '@/lib/utils';

export function LocationSettings() {
  const [location, setLocation] = useState('');
  const [saved, setSaved] = useState(false);
  const theme = useThemeColors();

  const handleUpdate = () => {
    console.log('Update location:', location);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div
      className={cn(
        'group relative overflow-hidden',
        'p-6 rounded-xl',
        themeColors.surface,
        'border border-gray-800/50',
        'hover:border-blue-500/30',
        cardVariants.elevated,
        transitions.default
      )}
    >
      {/* Gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />
      
      <div className="flex flex-col items-center gap-3 mb-6">
        <div className="p-2.5 rounded-lg bg-blue-500/10 border border-blue-500/20">
          <MapPin className="w-5 h-5 text-blue-400" />
        </div>
        <div>
          <h3 className={typography.styles.cardHeader}>Location</h3>
          <p className={typography.styles.cardDescription}>Configure site location</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="location" className="text-sm font-medium text-gray-300 mb-2 block">
            Location Name
          </Label>
          <Input
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g., Manufacturing Floor A"
          />
          <p className="text-xs text-gray-500 mt-2">
            Displayed in headers and reports
          </p>
        </div>

        <Button
          onClick={handleUpdate}
          disabled={!location.trim()}
          className={cn(
            'w-full',
            saved && buttonVariants.success
          )}
        >
          {saved ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Saved
            </>
          ) : (
            'Update Location'
          )}
        </Button>
      </div>
    </div>
  );
}
