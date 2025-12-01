/**
 * Overview Page - Router workflow overview with stepper and charts
 */

'use client';

import { useState } from 'react';
import { BarChart3, TrendingUp, PieChart, Activity } from 'lucide-react';
import { OverviewHeader, StepperCard, ChartCard } from '@/components/overview';

export default function OverviewPage() {
  const [loading, setLoading] = useState(false);

  const handleRefresh = () => {
    setLoading(true);
    // Simulate refresh
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header with dropdown and refresh */}
      <OverviewHeader onRefresh={handleRefresh} loading={loading} />

      {/* Stepper Card - Full Width */}
      <StepperCard />

      {/* Charts Grid - Responsive 2x2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-x-auto">
        <ChartCard title="Open Routers by Part Number" icon={BarChart3} />
        <ChartCard title="Rejected Routers by Part Number" icon={TrendingUp} />
        <ChartCard title="Cancelled Routers by Part Number" icon={PieChart} />
        <ChartCard title="Inventory Information by Part Number" icon={Activity} />
      </div>
    </div>
  );
}
