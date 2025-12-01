/**
 * RouterRow - Individual router table row
 * Displays router data with status badges
 */

'use client';

import { MoreVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Router } from '@/hooks/useRouters';

interface RouterRowProps {
  router: Router;
  columnWidths: Record<string, number>;
}

export function RouterRow({ router, columnWidths }: RouterRowProps) {
  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase();
    switch (statusLower) {
      case 'open':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'closed':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'cancelled':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getPriorityColor = (priority: string) => {
    const priorityLower = priority.toLowerCase();
    switch (priorityLower) {
      case 'urgent':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'high':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
      case 'normal':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'low':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <div className="flex border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
      {/* Part Number */}
      <div
        style={{ width: columnWidths.partNumber }}
        className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100 break-words text-center"
      >
        {router.partNumber}
      </div>

      {/* Router ID */}
      <div
        style={{ width: columnWidths.routerId }}
        className="px-4 py-3 text-gray-600 dark:text-gray-400 break-words text-center"
      >
        {router.routerId}
      </div>

      {/* Iteration */}
      <div
        style={{ width: columnWidths.iteration }}
        className="px-4 py-3 text-center text-gray-600 dark:text-gray-400"
      >
        {router.iteration}
      </div>

      {/* Process */}
      <div
        style={{ width: columnWidths.process }}
        className="px-4 py-3 text-center"
      >
        <div className="text-gray-900 dark:text-gray-100 font-medium break-words">
          {router.process}
        </div>
        {router.processDescription && (
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 break-words">
            {router.processDescription}
          </div>
        )}
      </div>

      {/* Quantity */}
      <div
        style={{ width: columnWidths.quantity }}
        className="px-4 py-3 text-center text-gray-600 dark:text-gray-400"
      >
        {router.quantity}
      </div>

      {/* Status */}
      <div style={{ width: columnWidths.status }} className="px-4 py-3 text-center">
        <span className={cn('inline-flex px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap', getStatusColor(router.status))}>
          {router.status}
        </span>
      </div>

      {/* Priority */}
      <div style={{ width: columnWidths.priority }} className="px-4 py-3 text-center">
        <span
          className={cn('inline-flex px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap', getPriorityColor(router.priority))}
        >
          {router.priority}
        </span>
      </div>

      {/* User */}
      <div
        style={{ width: columnWidths.user }}
        className="px-4 py-3 text-gray-600 dark:text-gray-400 text-sm break-words text-center"
      >
        {router.user}
      </div>

      {/* Description */}
      <div
        style={{ width: columnWidths.description }}
        className="px-4 py-3 text-gray-600 dark:text-gray-400 text-sm break-words text-center"
      >
        {router.description}
      </div>

      {/* Actions */}
      <div
        style={{ width: columnWidths.actions }}
        className="px-4 py-3 text-center"
      >
        <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
