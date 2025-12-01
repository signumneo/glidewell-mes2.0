/**
 * RoutersPage - Main routers page
 * Clean orchestration of filters, table, and actions
 */

'use client';

import { useState } from 'react';
import { RouterFilters, RoutersTable, RouterActions } from '@/components/routers';
import { useRouters } from '@/hooks/useRouters';

export default function RoutersPage() {
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const { routers, loading, error, filters, updateFilters, resetFilters } = useRouters();

  // Handle sorting
  const handleSort = (field: string) => {
    if (sortField === field) {
      const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
      setSortDirection(newDirection);
      updateFilters({ sortBy: field, sortDirection: newDirection });
    } else {
      setSortField(field);
      setSortDirection('asc');
      updateFilters({ sortBy: field, sortDirection: 'asc' });
    }
  };

  // Handle filter reset
  const handleResetFilters = () => {
    resetFilters();
    setSortField(null);
    setSortDirection('asc');
  };

  // Count active filters
  const activeFiltersCount = [
    filters.search,
    filters.status,
    filters.priority,
    filters.partNumber,
    filters.dateRange,
  ].filter(Boolean).length;

  return (
    <div className="space-y-6">
        {/* Actions Toolbar */}
        <RouterActions
          onAddNew={() => console.log('Add new router')}
          onExport={() => console.log('Export routers')}
          onBulkUpload={() => console.log('Bulk upload')}
          onBulkDelete={() => console.log('Bulk delete')}
        />

        {/* Filters */}
        <RouterFilters
          filters={filters}
          onFiltersChange={updateFilters}
          onReset={handleResetFilters}
          activeFiltersCount={activeFiltersCount}
        />

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-800 dark:text-red-400">
            {error}
          </div>
        )}

        {/* Routers Table */}
        <RoutersTable
          routers={routers}
          loading={loading}
          onSort={handleSort}
          sortField={sortField}
          sortDirection={sortDirection}
        />

        {/* Results Count */}
        {!loading && routers.length > 0 && (
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Showing {routers.length} router{routers.length !== 1 ? 's' : ''}
          </div>
        )}
    </div>
  );
}
