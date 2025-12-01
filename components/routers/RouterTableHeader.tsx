/**
 * RouterTableHeader - Table header with sortable columns
 * Handles column resizing and sorting
 */

'use client';

import { ArrowUpDown, ArrowUp, ArrowDown, GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Column {
  key: string;
  label: string;
  width: number;
  sortable?: boolean;
}

interface RouterTableHeaderProps {
  columns: Column[];
  sortField: string | null;
  sortDirection: 'asc' | 'desc';
  onSort: (field: string) => void;
  onResizeStart: (column: string, e: React.MouseEvent) => void;
}

export function RouterTableHeader({
  columns,
  sortField,
  sortDirection,
  onSort,
  onResizeStart,
}: RouterTableHeaderProps) {
  const getSortIcon = (columnKey: string) => {
    if (sortField !== columnKey) return <ArrowUpDown className="w-4 h-4 opacity-40" />;
    return sortDirection === 'asc' ? (
      <ArrowUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
    ) : (
      <ArrowDown className="w-4 h-4 text-blue-600 dark:text-blue-400" />
    );
  };

  return (
    <div className="flex border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
      {columns.map((column) => (
        <div
          key={column.key}
          style={{ width: column.width }}
          className="relative flex items-center px-4 py-3 font-semibold text-sm text-gray-700 dark:text-gray-300"
        >
          <button
            onClick={() => column.sortable && onSort(column.key)}
            className={cn(
              'flex items-center gap-2 flex-1',
              column.sortable && 'hover:text-gray-900 dark:hover:text-white cursor-pointer'
            )}
            disabled={!column.sortable}
          >
            {column.label}
            {column.sortable && getSortIcon(column.key)}
          </button>

          {/* Resize Handle */}
          <div
            onMouseDown={(e) => onResizeStart(column.key, e)}
            className="absolute right-0 top-0 h-full w-1 cursor-col-resize hover:bg-blue-500 group"
          >
            <GripVertical className="w-3 h-3 text-gray-400 group-hover:text-blue-500 absolute top-1/2 -translate-y-1/2 -translate-x-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}
