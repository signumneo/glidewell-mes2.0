/**
 * Charts Page - Interactive chart builder with controls
 */

'use client';

import { useState } from 'react';
import { ChartControls, ChartDisplay } from '@/components/charts';

export default function ChartsPage() {
  const [loading, setLoading] = useState(false);
  const [hasData, setHasData] = useState(false);

  const handleRunQuery = () => {
    setLoading(true);
    // Simulate query execution
    setTimeout(() => {
      setLoading(false);
      setHasData(true);
    }, 1500);
  };

  const handleClear = () => {
    setHasData(false);
  };

  return (
    <div className="-m-8 h-screen">
      <div className="flex gap-6 h-full p-6">
        {/* Controls Sidebar */}
        <ChartControls
          onRunQuery={handleRunQuery}
          onClear={handleClear}
          loading={loading}
        />

        {/* Chart Display Area */}
        <ChartDisplay hasData={hasData} />
      </div>
    </div>
  );
}
