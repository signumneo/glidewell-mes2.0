'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Factory, 
  TrendingUp, 
  AlertCircle, 
  Users,
  Clock,
  CheckCircle
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { ProductionOverview } from '@/components/dashboard/ProductionOverview';
import { AuthService } from '@/lib/auth/auth';
import { typography, themeColors } from '@/lib/theme';

export default function DashboardPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Protect the route
    if (!AuthService.isAuthenticated()) {
      router.push('/');
    }
  }, [router]);

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  // Don't render if not authenticated
  if (!AuthService.isAuthenticated()) {
    return null;
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            title="Active Production Lines"
            value="2/4"
            change={5.2}
            changeType="positive"
            icon={Factory}
            iconColor="blue"
          />
          <StatCard
            title="Overall Efficiency"
            value="91%"
            change={3.1}
            changeType="positive"
            icon={TrendingUp}
            iconColor="emerald"
          />
          <StatCard
            title="Quality Rate"
            value="98.5%"
            change={0.8}
            changeType="positive"
            icon={CheckCircle}
            iconColor="emerald"
          />
          <StatCard
            title="Active Alerts"
            value="3"
            change={-12.5}
            changeType="positive"
            icon={AlertCircle}
            iconColor="orange"
          />
          <StatCard
            title="Active Workers"
            value="24"
            change={0}
            changeType="neutral"
            icon={Users}
            iconColor="purple"
          />
          <StatCard
            title="Avg. Cycle Time"
            value="4.2min"
            change={-5.3}
            changeType="positive"
            icon={Clock}
            iconColor="indigo"
          />
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ProductionOverview />
          <RecentActivity />
        </div>
      </div>
    </DashboardLayout>
  );
}
