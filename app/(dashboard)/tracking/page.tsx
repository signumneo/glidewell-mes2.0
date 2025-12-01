'use client';

import { useThemeColors } from '@/hooks/useThemeColors';
import { TrackingFilters } from '@/components/tracking/TrackingFilters';
import { TrackingTable } from '@/components/tracking/TrackingTable';

export default function TrackingPage() {
  const theme = useThemeColors();

  return (
    <div className="space-y-6">
      <TrackingFilters />
      <TrackingTable />
    </div>
  );
}
