/**
 * RoutersTable - Main table component organism
 * Orchestrates header, rows, sorting, and column resizing
 */

'use client';

import { useState, useEffect } from 'react';
import { RouterTableHeader } from './RouterTableHeader';
import { RouterRow } from './RouterRow';
import { Router } from '@/hooks/useRouters';
import { cn } from '@/lib/utils';

interface RoutersTableProps {
  routers: Router[];
  loading: boolean;
  onSort: (field: string) => void;
  sortField: string | null;
  sortDirection: 'asc' | 'desc';
}

export function RoutersTable({
  routers,
  loading,
  onSort,
  sortField,
  sortDirection,
}: RoutersTableProps) {
  const [columnWidths, setColumnWidths] = useState({
    partNumber: 200,
    routerId: 120,
    iteration: 100,
    process: 240,
    quantity: 100,
    status: 120,
    priority: 140,
    user: 200,
    description: 240,
    actions: 100,
  });

  const [resizingColumn, setResizingColumn] = useState<string | null>(null);
  const [startX, setStartX] = useState(0);
  const [startWidth, setStartWidth] = useState(0);

  const columns = [
    { key: 'partNumber', label: 'Part Number', width: columnWidths.partNumber, sortable: true },
    { key: 'routerId', label: 'Router ID', width: columnWidths.routerId, sortable: true },
    { key: 'iteration', label: 'Version', width: columnWidths.iteration, sortable: true },
    { key: 'process', label: 'Current Process', width: columnWidths.process, sortable: true },
    { key: 'quantity', label: 'Qty', width: columnWidths.quantity, sortable: true },
    { key: 'status', label: 'Status', width: columnWidths.status, sortable: true },
    { key: 'priority', label: 'Priority', width: columnWidths.priority, sortable: true },
    { key: 'user', label: 'User Email', width: columnWidths.user, sortable: true },
    { key: 'description', label: 'Description', width: columnWidths.description, sortable: true },
    { key: 'actions', label: 'Actions', width: columnWidths.actions, sortable: false },
  ];

  const handleResizeStart = (column: string, e: React.MouseEvent) => {
    e.preventDefault();
    setResizingColumn(column);
    setStartX(e.clientX);
    setStartWidth(columnWidths[column as keyof typeof columnWidths]);
  };

  const handleResizeMove = (e: MouseEvent) => {
    if (!resizingColumn) return;
    const diff = e.clientX - startX;
    const newWidth = Math.max(80, startWidth + diff);
    setColumnWidths((prev) => ({
      ...prev,
      [resizingColumn]: newWidth,
    }));
  };

  const handleResizeEnd = () => {
    setResizingColumn(null);
  };

  useEffect(() => {
    if (resizingColumn) {
      document.addEventListener('mousemove', handleResizeMove);
      document.addEventListener('mouseup', handleResizeEnd);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';

      return () => {
        document.removeEventListener('mousemove', handleResizeMove);
        document.removeEventListener('mouseup', handleResizeEnd);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resizingColumn, startX, startWidth]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (routers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500">
        <p className="text-lg font-medium">No routers found</p>
        <p className="text-sm mt-2">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className={cn('overflow-auto', 'bg-white dark:bg-gray-900', 'rounded-lg border border-gray-200 dark:border-gray-700')}>
      <RouterTableHeader
        columns={columns}
        sortField={sortField}
        sortDirection={sortDirection}
        onSort={onSort}
        onResizeStart={handleResizeStart}
      />
      <div>
        {routers.map((router) => (
          <RouterRow key={router.id} router={router} columnWidths={columnWidths} />
        ))}
      </div>
    </div>
  );
}
