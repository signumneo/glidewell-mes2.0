/**
 * useRouters - Custom hook for router data management
 * Handles fetching, filtering, sorting, and state management
 */

'use client';

import { useState, useEffect } from 'react';

export interface RouterFilters {
  search?: string;
  status?: string;
  priority?: string;
  partNumber?: string;
  dateRange?: string;
  sortBy?: string | null;
  sortDirection?: 'asc' | 'desc';
}

export interface Router {
  id: string;
  partNumber: string;
  routerId: string;
  iteration: number;
  process: string;
  quantity: number;
  status: string;
  priority: string;
  user: string;
  barcode: string;
  [key: string]: any;
}

export function useRouters() {
  const [routers, setRouters] = useState<Router[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<RouterFilters>({});

  const fetchRouters = async () => {
    setLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual API endpoint
      // import { RouterService } from '@/lib/services/router.service';
      // const response = await RouterService.getRouters();
      // setRouters(response.data);

      // Temporary: Set empty array until API is implemented
      setRouters([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
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
