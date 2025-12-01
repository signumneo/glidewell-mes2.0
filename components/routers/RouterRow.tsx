/**
 * RouterRow - Individual router table row
 * Displays router data with status badges
 */

'use client';

import { ExternalLink, MoreVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Router } from '@/hooks/useRouters';

interface RouterRowProps {
  router: Router;
  columnWidths: Record<string, number>;
}

export function RouterRow({ router, columnWidths }: RouterRowProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'Closed':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
      case 'On Hold':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'Completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Urgent':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'High':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
      case 'Normal':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'Low':
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
        className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100"
      >
        {router.partNumber}
      </div>

      {/* Router ID */}
      <div
        style={{ width: columnWidths.routerId }}
        className="px-4 py-3 text-gray-600 dark:text-gray-400"
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
        className="px-4 py-3 text-gray-600 dark:text-gray-400"
      >
        {router.process}
      </div>

      {/* Quantity */}
      <div
        style={{ width: columnWidths.quantity }}
        className="px-4 py-3 text-center text-gray-600 dark:text-gray-400"
      >
        {router.quantity}
      </div>

      {/* Status */}
      <div style={{ width: columnWidths.status }} className="px-4 py-3">
        <span className={cn('px-2 py-1 rounded-full text-xs font-medium', getStatusColor(router.status))}>
          {router.status}
        </span>
      </div>

      {/* Priority */}
      <div style={{ width: columnWidths.priority }} className="px-4 py-3">
        <span
          className={cn('px-2 py-1 rounded-full text-xs font-medium', getPriorityColor(router.priority))}
        >
          {router.priority}
        </span>
      </div>

      {/* User */}
      <div
        style={{ width: columnWidths.user }}
        className="px-4 py-3 text-gray-600 dark:text-gray-400"
      >
        {router.user}
      </div>

      {/* Barcode */}
      <div
        style={{ width: columnWidths.barcode }}
        className="px-4 py-3 text-center"
      >
        <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
          <ExternalLink className="w-4 h-4" />
        </button>
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
