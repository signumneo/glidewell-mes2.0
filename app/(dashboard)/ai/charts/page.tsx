/**
 * AI Charts Page - Data visualization with AI assistance
 */

'use client';

import { ChatInput, SuggestionChips } from '@/components/ai';
import { useAIChat } from '@/hooks/useAIChat';
import { useThemeColors } from '@/hooks/useThemeColors';
import { cardVariants, transitions, typography } from '@/lib/design-system';
import { cn } from '@/lib/utils';
import { TrendingUp, PieChart, BarChart3 } from 'lucide-react';

export default function AIChartsPage() {
  const theme = useThemeColors();
  const { loading, suggestions, sendMessage } = useAIChat();

  return (
    <div className="-m-8 h-screen">
      <div className="flex gap-6 h-full p-6">
      {/* Chart Display Area */}
      <div
        className={cn(
          'flex-1 rounded-xl border p-8 flex flex-col items-center justify-center',
          theme.surfacePrimary,
          theme.border,
          cardVariants.elevated,
          transitions.default
        )}
      >
        <div className="max-w-md text-center space-y-6">
          {/* Icons */}
          <div className="flex items-center justify-center gap-4">
            <div className={cn(
              'p-4 rounded-xl',
              'bg-blue-500/10 dark:bg-blue-500/20'
            )}>
              <TrendingUp className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div className={cn(
              'p-4 rounded-xl',
              'bg-purple-500/10 dark:bg-purple-500/20'
            )}>
              <BarChart3 className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <div className={cn(
              'p-4 rounded-xl',
              'bg-cyan-500/10 dark:bg-cyan-500/20'
            )}>
              <PieChart className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />
            </div>
          </div>

          {/* Empty State */}
          <div>
            <h3 className={cn(typography.styles.cardHeader, 'mb-2')}>
              Request a Visualization
            </h3>
            <p className={typography.styles.cardDescription}>
              Ask AI to generate charts, graphs, and visual insights from your manufacturing data
            </p>
          </div>

          {/* Quick Actions */}
          <div className="space-y-2">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Try asking for:
            </p>
            <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <p>• Production trends over time</p>
              <p>• Router performance comparison</p>
              <p>• Work order status breakdown</p>
              <p>• Efficiency metrics by department</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Sidebar */}
      <div
        className={cn(
          'w-96 rounded-xl border flex flex-col overflow-hidden',
          theme.surfacePrimary,
          theme.border,
          cardVariants.elevated,
          transitions.default
        )}
      >
        {/* Sidebar Header */}
        <div className={cn('px-4 py-3 border-b', theme.border)}>
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Chart Assistant
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Describe the visualization you need
          </p>
        </div>

        {/* Suggestions */}
        <div className="flex-1 overflow-y-auto p-4">
          <SuggestionChips
            suggestions={[
              'Show production volume by month',
              'Compare router efficiency rates',
              'Display work order status distribution',
              'Analyze defect rate trends',
            ]}
            onSelect={sendMessage}
            disabled={loading}
          />
        </div>

        {/* Input */}
        <div className={cn('p-4 border-t', theme.border)}>
          <ChatInput
            onSend={sendMessage}
            loading={loading}
            placeholder="Describe your chart..."
          />
        </div>
      </div>
    </div>
    </div>
  );
}
