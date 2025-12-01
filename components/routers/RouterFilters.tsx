/**
 * RouterFilters - Filter controls for routers
 * Search, status, priority, date filters
 */

'use client';

import { useState } from 'react';
import { Search, Filter, RotateCcw, Calendar, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { RouterFilters as FiltersType } from '@/hooks/useRouters';

interface RouterFiltersProps {
  filters: FiltersType;
  onFiltersChange: (filters: Partial<FiltersType>) => void;
  onReset: () => void;
  activeFiltersCount: number;
}

export function RouterFilters({
  filters,
  onFiltersChange,
  onReset,
  activeFiltersCount,
}: RouterFiltersProps) {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const statusOptions = ['All Status', 'Open', 'Closed', 'On Hold', 'Completed'];
  const priorityOptions = ['All Priority', 'Urgent', 'High', 'Normal', 'Low'];
  const partNumberOptions = ['All Parts', 'Part A', 'Part B', 'Part C'];

  return (
    <div className="space-y-4">
      {/* Main Filter Bar */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search routers..."
            value={filters.search || ''}
            onChange={(e) => onFiltersChange({ search: e.target.value })}
            className="pl-9"
          />
        </div>

        {/* Advanced Filters Toggle */}
        <Button
          variant="outline"
          onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
          className={cn('gap-2', activeFiltersCount > 0 && 'border-blue-500')}
        >
          <Filter className="w-4 h-4" />
          Filters
          {activeFiltersCount > 0 && (
            <span className="ml-1 px-1.5 py-0.5 text-xs bg-blue-500 text-white rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </Button>

        {/* Reset Filters */}
        {activeFiltersCount > 0 && (
          <Button variant="ghost" onClick={onReset} className="gap-2">
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
        )}
      </div>

      {/* Advanced Filters Panel */}
      {isAdvancedOpen && (
        <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Advanced Filters</h3>
            <button
              onClick={() => setIsAdvancedOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Status Filter */}
            <div>
              <label className="text-sm font-medium mb-2 block">Status</label>
              <select
                value={filters.status || 'All Status'}
                onChange={(e) =>
                  onFiltersChange({
                    status: e.target.value === 'All Status' ? undefined : e.target.value,
                  })
                }
                className="w-full px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
              >
                {statusOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Priority Filter */}
            <div>
              <label className="text-sm font-medium mb-2 block">Priority</label>
              <select
                value={filters.priority || 'All Priority'}
                onChange={(e) =>
                  onFiltersChange({
                    priority: e.target.value === 'All Priority' ? undefined : e.target.value,
                  })
                }
                className="w-full px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
              >
                {priorityOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Part Number Filter */}
            <div>
              <label className="text-sm font-medium mb-2 block">Part Number</label>
              <select
                value={filters.partNumber || 'All Parts'}
                onChange={(e) =>
                  onFiltersChange({
                    partNumber: e.target.value === 'All Parts' ? undefined : e.target.value,
                  })
                }
                className="w-full px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
              >
                {partNumberOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Range */}
            <div>
              <label className="text-sm font-medium mb-2 block">Date Range</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="date"
                  value={filters.dateRange || ''}
                  onChange={(e) => onFiltersChange({ dateRange: e.target.value })}
                  className="pl-9"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
