/**
 * useRouters - Custom hook for router data management
 * Handles fetching, filtering, sorting, and state management
 */

'use client';

import { useState, useEffect } from 'react';
import { RouterService } from '@/lib/services/router.service';
import { RouterData } from '@/types/mes';

export interface RouterFilters {
  search?: string;
  status?: string;
  priority?: string;
  partNumber?: string;
  dateRange?: string;
  sortBy?: string | null;
  sortDirection?: 'asc' | 'desc';
}

// Map RouterData from API to UI-friendly Router interface
export interface Router {
  id: string;
  partNumber: string;
  routerId: string;
  version: string;
  iteration: number;
  process: string;
  processDescription: string;
  quantity: number;
  status: string;
  priority: string;
  user: string;
  description: string;
  [key: string]: any;
}

export function useRouters() {
  const [routers, setRouters] = useState<Router[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<RouterFilters>({});

  /**
   * Map RouterData from MES API to UI Router format
   */
  const mapRouterData = (data: RouterData): Router => {
    // Extract process description from dynamic process field
    const currentProcess = data.CurrentProcess;
    const processField = data[currentProcess];
    const processDescription = processField?.Description || '';

    return {
      id: `${data.PartNumber}-${data.RouterId}`,
      partNumber: data.PartNumber,
      routerId: data.RouterId,
      version: data.Version,
      iteration: parseInt(data.Version) || 1,
      process: currentProcess,
      processDescription,
      quantity: parseInt(data.Quantity) || 0,
      status: data.Status,
      priority: data.PriorityLevel || 'Normal',
      user: data.Useremail,
      description: data.Description,
    };
  };

  const fetchRouters = async () => {
    setLoading(true);
    setError(null);

    try {
      // Build filters for API call
      const scanFilters: any = {};
      if (filters.partNumber) {
        scanFilters.PartNumber = filters.partNumber;
      }
      if (filters.search) {
        // CurrentProcess filter (process ID like "1000", "2000")
        scanFilters.CurrentProcess = filters.search;
      }

      console.log('[useRouters] Fetching with filters:', scanFilters);

      // Call IoT Scan API
      const response = await RouterService.scanRouters(
        Object.keys(scanFilters).length > 0 ? scanFilters : undefined
      );

      // Map API data to UI format
      const mappedRouters = response.data.map(mapRouterData);

      // Apply client-side filtering
      let filteredRouters = mappedRouters;

      if (filters.status) {
        filteredRouters = filteredRouters.filter(
          (r) => r.status.toLowerCase() === filters.status?.toLowerCase()
        );
      }

      if (filters.priority) {
        filteredRouters = filteredRouters.filter(
          (r) => r.priority.toLowerCase() === filters.priority?.toLowerCase()
        );
      }

      // Apply sorting
      if (filters.sortBy && filters.sortDirection) {
        filteredRouters.sort((a, b) => {
          const aVal = a[filters.sortBy!];
          const bVal = b[filters.sortBy!];
          const direction = filters.sortDirection === 'asc' ? 1 : -1;

          if (typeof aVal === 'string' && typeof bVal === 'string') {
            return aVal.localeCompare(bVal) * direction;
          }
          return (aVal - bVal) * direction;
        });
      }

      setRouters(filteredRouters);
      console.log('[useRouters] Loaded routers:', filteredRouters.length);
    } catch (err: any) {
      console.error('[useRouters] Error:', err);
      setError(err.message || 'Failed to load routers');
      setRouters([]);
    } finally {
      setLoading(false);
    }
  };

  const updateFilters = (newFilters: Partial<RouterFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFilters({});
  };

  useEffect(() => {
    fetchRouters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  return {
    routers,
    loading,
    error,
    filters,
    updateFilters,
    resetFilters,
    refetch: fetchRouters,
  };
}
