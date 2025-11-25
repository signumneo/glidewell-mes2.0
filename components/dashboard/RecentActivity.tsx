'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { themeColors } from '@/lib/theme';
import { cardStyles } from '@/lib/design-system';
import { cn } from '@/lib/utils';

interface Activity {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'info' | 'warning' | 'error' | 'success';
}

const activities: Activity[] = [
  {
    id: '1',
    title: 'Production Line A Started',
    description: 'Shift 1 production commenced at full capacity',
    time: '5 minutes ago',
    type: 'success',
  },
  {
    id: '2',
    title: 'Quality Check Completed',
    description: 'Batch #4521 passed inspection',
    time: '12 minutes ago',
    type: 'info',
  },
  {
    id: '3',
    title: 'Maintenance Alert',
    description: 'Equipment #23 requires scheduled maintenance',
    time: '1 hour ago',
    type: 'warning',
  },
  {
    id: '4',
    title: 'Shift Change',
    description: 'Shift 2 personnel logged in',
    time: '2 hours ago',
    type: 'info',
  },
];

const typeColors = {
  success: 'bg-green-100 text-green-800',
  info: 'bg-blue-100 text-blue-800',
  warning: 'bg-yellow-100 text-yellow-800',
  error: 'bg-red-100 text-red-800',
};

export function RecentActivity() {
  return (
    <Card className={cn(cardStyles.elevated, 'overflow-hidden')}>
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent dark:from-white/[0.02] pointer-events-none" />
      
      <CardHeader className="relative z-10">
        <CardTitle className={`text-lg font-semibold ${themeColors.textPrimary}`}>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex space-x-4">
              <div className={cn(
                'w-2 h-2 mt-2 rounded-full shadow-sm',
                `${typeColors[activity.type].split(' ')[0]} dark:opacity-80`
              )} />
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className={`text-sm font-medium ${themeColors.textPrimary}`}>
                    {activity.title}
                  </p>
                  <span className={`text-xs ${themeColors.textTertiary}`}>{activity.time}</span>
                </div>
                <p className={`text-sm ${themeColors.textSecondary}`}>{activity.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
