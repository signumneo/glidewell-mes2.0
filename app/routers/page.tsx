'use client';

import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Filter, 
  Download, 
  Plus, 
  RotateCcw, 
  Calendar,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  GripVertical,
  ExternalLink,
  MoreVertical,
  Settings2,
  X,
  Upload,
  Trash2
} from 'lucide-react';

export default function RoutersPage() {
  // Filter states (will be sent to server)
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [selectedPriority, setSelectedPriority] = useState('All Priority');
  const [selectedPartNumber, setSelectedPartNumber] = useState('All Parts');
  const [selectedDate, setSelectedDate] = useState('');
  
  // UI states
  const [isAdvancedFiltersOpen, setIsAdvancedFiltersOpen] = useState(false);
  const [isActionsPanelOpen, setIsActionsPanelOpen] = useState(false);
  
  // Sorting states (will be sent to server)
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Data states
  const [routers, setRouters] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Column width states for resizable columns
  const [columnWidths, setColumnWidths] = useState({
    partNumber: 200,
    routerId: 120,
    iteration: 100,
    process: 220,
    quantity: 100,
    status: 120,
    priority: 140,
    user: 140,
    barcode: 100,
    actions: 120,
  });
  const [resizingColumn, setResizingColumn] = useState<string | null>(null);
  const [startX, setStartX] = useState(0);
  const [startWidth, setStartWidth] = useState(0);

  // Handle column resize
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
    setColumnWidths(prev => ({
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
  }, [resizingColumn, startX, startWidth]);

  // Handle sorting
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Handle reset filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedStatus('All Status');
    setSelectedPriority('All Priority');
    setSelectedPartNumber('All Parts');
    setSelectedDate('');
  };

  // Count active filters
  const activeFiltersCount = [
    searchQuery,
    selectedStatus !== 'All Status' ? selectedStatus : null,
    selectedPriority !== 'All Priority' ? selectedPriority : null,
    selectedPartNumber !== 'All Parts' ? selectedPartNumber : null,
    selectedDate
  ].filter(Boolean).length;

  // Prepare filters for server-side API call
  const getFilters = () => {
    return {
      search: searchQuery || undefined,
      status: selectedStatus !== 'All Status' ? selectedStatus : undefined,
      priority: selectedPriority !== 'All Priority' ? selectedPriority : undefined,
      partNumber: selectedPartNumber !== 'All Parts' ? selectedPartNumber : undefined,
      dateRange: selectedDate || undefined,
      sortBy: sortField,
      sortDirection: sortDirection
    };
  };

  // Fetch routers data from API
  const fetchRouters = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const filters = getFilters();
      
      // TODO: Replace with actual API endpoint
      // const response = await fetch('/api/routers', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(filters)
      // });
      // 
      // if (!response.ok) throw new Error('Failed to fetch routers');
      // const data = await response.json();
      // setRouters(data.routers);
      
      // Temporary: Set empty array until API is implemented
      setRouters([]);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on mount and when filters/sorting changes
  useEffect(() => {
    fetchRouters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, selectedStatus, selectedPriority, selectedPartNumber, selectedDate, sortField, sortDirection]);

  // Status color helper
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'Closed': return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
      case 'On Hold': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'Completed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  // Priority color helper
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Urgent': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'High': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
      case 'Normal': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'Low': return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Filters */}
        <div className="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#3a3a3a] rounded-lg">
          <div className="p-4">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-3">
              {/* Search */}
              <div className="relative flex-1 sm:max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search routers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-white dark:bg-[#2a2a2a] border-gray-300 dark:border-[#505050] text-gray-900 dark:text-[#e8e8e8]"
                />
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 border-gray-300 dark:border-[#505050] hover:bg-gray-50 dark:hover:bg-[#2a2a2a]"
                  onClick={() => setIsAdvancedFiltersOpen(!isAdvancedFiltersOpen)}
                >
                  <Filter className="w-4 h-4" />
                  <span className="hidden md:inline">FILTERS</span>
                  {activeFiltersCount > 0 && (
                    <span className="ml-1 px-1.5 py-0.5 text-xs font-bold bg-blue-600 dark:bg-blue-500 text-white rounded-full min-w-[20px] text-center">
                      {activeFiltersCount}
                    </span>
                  )}
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 border-gray-300 dark:border-[#505050] hover:bg-gray-50 dark:hover:bg-[#2a2a2a]"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden md:inline">EXPORT</span>
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 border-gray-300 dark:border-[#505050] hover:bg-gray-50 dark:hover:bg-[#2a2a2a]"
                  onClick={() => setIsActionsPanelOpen(true)}
                >
                  <Settings2 className="w-4 h-4" />
                  <span className="hidden md:inline">ACTIONS</span>
                </Button>
              </div>
            </div>

            {/* Advanced Filters Panel */}
            {isAdvancedFiltersOpen && (
              <div className="mt-4 p-4 bg-gray-50 dark:bg-[#252525] rounded-lg border border-gray-200 dark:border-[#404040] animate-in slide-in-from-top-2 duration-200">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 block uppercase tracking-wide">Part Number</label>
                      <select 
                        value={selectedPartNumber}
                        onChange={(e) => setSelectedPartNumber(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-[#505050] rounded-md bg-white dark:bg-[#333333] text-gray-900 dark:text-[#e8e8e8] text-sm"
                      >
                        <option>All Parts</option>
                        <option>10153</option>
                        <option>10154</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 block uppercase tracking-wide">Status</label>
                      <select 
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-[#505050] rounded-md bg-white dark:bg-[#333333] text-gray-900 dark:text-[#e8e8e8] text-sm"
                      >
                        <option>All Status</option>
                        <option>Open</option>
                        <option>Closed</option>
                        <option>On Hold</option>
                        <option>Completed</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 block uppercase tracking-wide">Priority</label>
                      <select
                        value={selectedPriority}
                        onChange={(e) => setSelectedPriority(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-[#505050] rounded-md bg-white dark:bg-[#333333] text-gray-900 dark:text-[#e8e8e8] text-sm"
                      >
                        <option>All Priority</option>
                        <option>Urgent</option>
                        <option>High</option>
                        <option>Normal</option>
                        <option>Low</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 block uppercase tracking-wide">Date Range</label>
                      <button className="w-full flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 dark:border-[#505050] rounded-md hover:bg-gray-50 dark:hover:bg-[#3a3a3a] transition-colors text-sm text-gray-700 dark:text-[#e8e8e8]">
                        <Calendar className="w-4 h-4" />
                        <span>Select Range</span>
                      </button>
                    </div>
                  </div>

                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-9 gap-1.5 text-xs border-gray-300 dark:border-[#505050] hover:bg-gray-50 dark:hover:bg-[#3a3a3a] mt-6"
                    onClick={handleResetFilters}
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    RESET ALL
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#3a3a3a] rounded-lg overflow-hidden">
          {/* Loading State */}
          {loading && (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 dark:border-blue-400"></div>
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">Loading routers...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="p-8 text-center">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              <button 
                onClick={fetchRouters}
                className="mt-3 px-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-md transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && routers.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">No routers found</p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">Try adjusting your filters or create a new router</p>
            </div>
          )}

          {/* Mobile: Card View */}
          {!loading && !error && routers.length > 0 && (
            <div className="lg:hidden">
              <div className="divide-y divide-gray-100 dark:divide-[#2a2a2a]">
                {routers.map((router) => (
                  <div key={router.id} className="p-4 hover:bg-gray-50 dark:hover:bg-[#252525] transition-colors">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-base text-gray-900 dark:text-white">{router.partNumber}</span>
                          <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">{router.version}</span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                          {router.currentProcess}
                        </p>
                      </div>
                      <button className="p-1.5 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white shrink-0">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Router ID</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{router.routerId}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Quantity</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{router.quantity}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(router.status)}`}>
                        {router.status}
                      </span>
                      <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getPriorityColor(router.priorityLevel)}`}>
                        {router.priorityLevel}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 pt-3 border-t border-gray-100 dark:border-[#2a2a2a]">
                      <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-md transition-colors">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <rect x="2" y="6" width="2" height="12"/>
                          <rect x="6" y="6" width="2" height="12"/>
                          <rect x="10" y="6" width="2" height="12"/>
                          <rect x="14" y="6" width="4" height="12"/>
                          <rect x="20" y="6" width="2" height="12"/>
                        </svg>
                        <span>Barcode</span>
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] rounded-md transition-colors">
                        <ExternalLink className="w-4 h-4" />
                        <span>Open</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tablet & Desktop: Table View */}
          {!loading && !error && routers.length > 0 && (
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="bg-gray-50/50 dark:bg-[#161616]/50">
                  <tr className="border-b border-gray-100 dark:border-[#2a2a2a]">
                    <th 
                      className="px-4 py-3.5 text-left relative group"
                      style={{ width: columnWidths.partNumber }}
                    >
                      <button
                        onClick={() => handleSort('partNumber')}
                        className="flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider hover:text-gray-900 dark:hover:text-white transition-colors"
                      >
                        <span>P/N & Ver</span>
                        {sortField === 'partNumber' ? (
                          sortDirection === 'asc' ? (
                            <ArrowUp className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                          ) : (
                            <ArrowDown className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                          )
                        ) : (
                          <ArrowUpDown className="w-3.5 h-3.5 opacity-0 group-hover:opacity-50 transition-opacity" />
                        )}
                      </button>
                      <div
                        className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-400 dark:hover:bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        onMouseDown={(e) => handleResizeStart('partNumber', e)}
                      >
                        <GripVertical className="w-3 h-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400" />
                      </div>
                    </th>
                    <th 
                      className="px-4 py-3.5 text-left relative group"
                      style={{ width: columnWidths.routerId }}
                    >
                      <button
                        onClick={() => handleSort('routerId')}
                        className="flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider hover:text-gray-900 dark:hover:text-white transition-colors"
                      >
                        <span>Router ID</span>
                        {sortField === 'routerId' ? (
                          sortDirection === 'asc' ? (
                            <ArrowUp className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                          ) : (
                            <ArrowDown className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                          )
                        ) : (
                          <ArrowUpDown className="w-3.5 h-3.5 opacity-0 group-hover:opacity-50 transition-opacity" />
                        )}
                      </button>
                      <div
                        className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-400 dark:hover:bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        onMouseDown={(e) => handleResizeStart('routerId', e)}
                      >
                        <GripVertical className="w-3 h-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400" />
                      </div>
                    </th>
                    <th 
                      className="px-4 py-3.5 text-left relative group"
                      style={{ width: columnWidths.iteration }}
                    >
                      <button
                        onClick={() => handleSort('iteration')}
                        className="flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider hover:text-gray-900 dark:hover:text-white transition-colors"
                      >
                        <span>Iteration</span>
                        {sortField === 'iteration' ? (
                          sortDirection === 'asc' ? (
                            <ArrowUp className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                          ) : (
                            <ArrowDown className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                          )
                        ) : (
                          <ArrowUpDown className="w-3.5 h-3.5 opacity-0 group-hover:opacity-50 transition-opacity" />
                        )}
                      </button>
                      <div
                        className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-400 dark:hover:bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        onMouseDown={(e) => handleResizeStart('iteration', e)}
                      >
                        <GripVertical className="w-3 h-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400" />
                      </div>
                    </th>
                    <th 
                      className="px-4 py-3.5 text-left relative group"
                      style={{ width: columnWidths.process }}
                    >
                      <div className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Current Process
                      </div>
                      <div
                        className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-400 dark:hover:bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        onMouseDown={(e) => handleResizeStart('process', e)}
                      >
                        <GripVertical className="w-3 h-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400" />
                      </div>
                    </th>
                    <th 
                      className="px-4 py-3.5 text-left relative group"
                      style={{ width: columnWidths.quantity }}
                    >
                      <button
                        onClick={() => handleSort('quantity')}
                        className="flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider hover:text-gray-900 dark:hover:text-white transition-colors"
                      >
                        <span>Quantity</span>
                        {sortField === 'quantity' ? (
                          sortDirection === 'asc' ? (
                            <ArrowUp className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                          ) : (
                            <ArrowDown className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                          )
                        ) : (
                          <ArrowUpDown className="w-3.5 h-3.5 opacity-0 group-hover:opacity-50 transition-opacity" />
                        )}
                      </button>
                      <div
                        className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-400 dark:hover:bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        onMouseDown={(e) => handleResizeStart('quantity', e)}
                      >
                        <GripVertical className="w-3 h-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400" />
                      </div>
                    </th>
                    <th 
                      className="px-4 py-3.5 text-left relative group"
                      style={{ width: columnWidths.status }}
                    >
                      <button
                        onClick={() => handleSort('status')}
                        className="flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider hover:text-gray-900 dark:hover:text-white transition-colors"
                      >
                        <span>Status</span>
                        {sortField === 'status' ? (
                          sortDirection === 'asc' ? (
                            <ArrowUp className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                          ) : (
                            <ArrowDown className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                          )
                        ) : (
                          <ArrowUpDown className="w-3.5 h-3.5 opacity-0 group-hover:opacity-50 transition-opacity" />
                        )}
                      </button>
                      <div
                        className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-400 dark:hover:bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        onMouseDown={(e) => handleResizeStart('status', e)}
                      >
                        <GripVertical className="w-3 h-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400" />
                      </div>
                    </th>
                    <th 
                      className="px-4 py-3.5 text-left relative group"
                      style={{ width: columnWidths.priority }}
                    >
                      <button
                        onClick={() => handleSort('priority')}
                        className="flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider hover:text-gray-900 dark:hover:text-white transition-colors"
                      >
                        <span>Priority</span>
                        {sortField === 'priority' ? (
                          sortDirection === 'asc' ? (
                            <ArrowUp className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                          ) : (
                            <ArrowDown className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                          )
                        ) : (
                          <ArrowUpDown className="w-3.5 h-3.5 opacity-0 group-hover:opacity-50 transition-opacity" />
                        )}
                      </button>
                      <div
                        className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-400 dark:hover:bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        onMouseDown={(e) => handleResizeStart('priority', e)}
                      >
                        <GripVertical className="w-3 h-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400" />
                      </div>
                    </th>
                    <th 
                      className="px-4 py-3.5 text-left relative group"
                      style={{ width: columnWidths.user }}
                    >
                      <button
                        onClick={() => handleSort('user')}
                        className="flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider hover:text-gray-900 dark:hover:text-white transition-colors"
                      >
                        <span>User</span>
                        {sortField === 'user' ? (
                          sortDirection === 'asc' ? (
                            <ArrowUp className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                          ) : (
                            <ArrowDown className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                          )
                        ) : (
                          <ArrowUpDown className="w-3.5 h-3.5 opacity-0 group-hover:opacity-50 transition-opacity" />
                        )}
                      </button>
                      <div
                        className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-400 dark:hover:bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        onMouseDown={(e) => handleResizeStart('user', e)}
                      >
                        <GripVertical className="w-3 h-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400" />
                      </div>
                    </th>
                    <th 
                      className="px-4 py-3.5 text-left relative group"
                      style={{ width: columnWidths.barcode }}
                    >
                      <div className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Barcode
                      </div>
                      <div
                        className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-400 dark:hover:bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        onMouseDown={(e) => handleResizeStart('barcode', e)}
                      >
                        <GripVertical className="w-3 h-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400" />
                      </div>
                    </th>
                    <th 
                      className="px-4 py-3.5 text-center"
                      style={{ width: columnWidths.actions }}
                    >
                      <div className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Actions
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-[#2a2a2a]">
                  {routers.map((router) => (
                    <tr key={router.id} className="hover:bg-gray-50 dark:hover:bg-[#252525] transition-colors">
                      <td className="px-4 py-3 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-900 dark:text-white">{router.partNumber}</span>
                          <span className="text-gray-600 dark:text-gray-400">{router.version}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-white font-medium">
                        {router.routerId}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                        {router.iteration}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                        <div className="line-clamp-1">{router.currentProcess}</div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                        {router.quantity}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-full ${getStatusColor(router.status)}`}>
                          {router.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-full ${getPriorityColor(router.priorityLevel)}`}>
                          {router.priorityLevel}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                        {router.user}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 font-mono">
                        {router.barcode}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-1">
                          <button className="p-1.5 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded transition-colors">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                              <rect x="2" y="6" width="2" height="12"/>
                              <rect x="6" y="6" width="2" height="12"/>
                              <rect x="10" y="6" width="2" height="12"/>
                              <rect x="14" y="6" width="4" height="12"/>
                              <rect x="20" y="6" width="2" height="12"/>
                            </svg>
                          </button>
                          <button className="p-1.5 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] rounded transition-colors">
                            <ExternalLink className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] rounded transition-colors">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Actions Side Panel */}
      {isActionsPanelOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 z-40 animate-in fade-in duration-200"
            onClick={() => setIsActionsPanelOpen(false)}
          />
          
          {/* Side Panel */}
          <div className="fixed right-0 top-0 bottom-0 w-96 bg-white dark:bg-[#1e1e1e] border-l border-gray-200 dark:border-[#3a3a3a] z-50 animate-in slide-in-from-right duration-300 overflow-y-auto">
            {/* Panel Header */}
            <div className="sticky top-0 bg-white dark:bg-[#1e1e1e] border-b border-gray-200 dark:border-[#3a3a3a] p-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Router Actions</h2>
              <button
                onClick={() => setIsActionsPanelOpen(false)}
                className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Panel Content */}
            <div className="p-4 space-y-6">
              {/* Create Section */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-3">Create</h3>
                <div className="space-y-2">
                  <button className="w-full flex items-center gap-3 p-3 text-left bg-blue-50 dark:bg-blue-950/30 hover:bg-blue-100 dark:hover:bg-blue-950/50 text-blue-700 dark:text-blue-400 rounded-lg transition-colors border border-blue-200 dark:border-blue-800">
                    <Plus className="w-5 h-5" />
                    <div className="flex-1">
                      <div className="font-medium">New Router</div>
                      <div className="text-xs text-blue-600 dark:text-blue-500">Create a new router configuration</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Batch Operations */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-3">Batch Operations</h3>
                <div className="space-y-2">
                  <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 dark:hover:bg-[#252525] text-gray-700 dark:text-gray-300 rounded-lg transition-colors border border-gray-200 dark:border-[#3a3a3a]">
                    <Upload className="w-5 h-5" />
                    <div className="flex-1">
                      <div className="font-medium">Import Routers</div>
                      <div className="text-xs text-gray-500 dark:text-gray-500">Upload CSV or Excel file</div>
                    </div>
                  </button>

                  <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 dark:hover:bg-[#252525] text-gray-700 dark:text-gray-300 rounded-lg transition-colors border border-gray-200 dark:border-[#3a3a3a]">
                    <Download className="w-5 h-5" />
                    <div className="flex-1">
                      <div className="font-medium">Export Selected</div>
                      <div className="text-xs text-gray-500 dark:text-gray-500">Download selected routers</div>
                    </div>
                  </button>

                  <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-red-50 dark:hover:bg-red-950/30 text-red-600 dark:text-red-400 rounded-lg transition-colors border border-red-200 dark:border-red-900">
                    <Trash2 className="w-5 h-5" />
                    <div className="flex-1">
                      <div className="font-medium">Delete Selected</div>
                      <div className="text-xs text-red-500 dark:text-red-500">Remove selected routers</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Bulk Updates */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-3">Bulk Updates</h3>
                <div className="space-y-2">
                  <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 dark:hover:bg-[#252525] text-gray-700 dark:text-gray-300 rounded-lg transition-colors border border-gray-200 dark:border-[#3a3a3a]">
                    <Settings2 className="w-5 h-5" />
                    <div className="flex-1">
                      <div className="font-medium">Update Status</div>
                      <div className="text-xs text-gray-500 dark:text-gray-500">Change status for multiple routers</div>
                    </div>
                  </button>

                  <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 dark:hover:bg-[#252525] text-gray-700 dark:text-gray-300 rounded-lg transition-colors border border-gray-200 dark:border-[#3a3a3a]">
                    <Settings2 className="w-5 h-5" />
                    <div className="flex-1">
                      <div className="font-medium">Update Priority</div>
                      <div className="text-xs text-gray-500 dark:text-gray-500">Change priority for multiple routers</div>
                    </div>
                  </button>

                  <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 dark:hover:bg-[#252525] text-gray-700 dark:text-gray-300 rounded-lg transition-colors border border-gray-200 dark:border-[#3a3a3a]">
                    <Settings2 className="w-5 h-5" />
                    <div className="flex-1">
                      <div className="font-medium">Assign User</div>
                      <div className="text-xs text-gray-500 dark:text-gray-500">Assign routers to a user</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
}
