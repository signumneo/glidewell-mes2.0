/**
 * RouterActions - Action buttons toolbar
 * Bulk actions, export, add new router
 */

'use client';

import { useState } from 'react';
import { Download, Plus, Upload, Trash2, Settings2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Drawer } from '@/components/ui/drawer';
import { cn } from '@/lib/utils';
import { useThemeColors } from '@/hooks/useThemeColors';
import { transitions, typography } from '@/lib/design-system';

interface RouterActionsProps {
  onAddNew?: () => void;
  onExport?: () => void;
  onBulkUpload?: () => void;
  onBulkDelete?: () => void;
  selectedCount?: number;
  drawerOpen: boolean;
  onDrawerChange: (open: boolean) => void;
}

export function RouterActions({
  onAddNew,
  onExport,
  onBulkUpload,
  onBulkDelete,
  selectedCount = 0,
  drawerOpen,
  onDrawerChange,
}: RouterActionsProps) {
  const theme = useThemeColors();

  const handleBulkUploadClick = () => {
    onBulkUpload?.();
    onDrawerChange(false);
  };

  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        {/* Bulk Actions (show when items selected) */}
        {selectedCount > 0 && (
          <>
            <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {selectedCount} selected
            </span>
            <Button variant="destructive" onClick={onBulkDelete} className="gap-2">
              <Trash2 className="w-4 h-4" />
              Delete Selected
            </Button>
          </>
        )}
      </div>

      {/* Settings Drawer */}
      <Drawer
        open={drawerOpen}
        onOpenChange={onDrawerChange}
        title="Router Actions"
        description="Bulk operations and router management"
      >
        <div className="space-y-4">
          {/* Bulk Upload Section */}
          <div className={cn('p-4 rounded-lg border', theme.border, theme.surface)}>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Bulk Upload
            </h3>
            <p className="text-sm text-gray-900 dark:text-gray-300 mb-4">
              Upload multiple routers at once using a CSV or Excel file.
            </p>
            <Button onClick={handleBulkUploadClick} className="w-full gap-2">
              <Upload className="w-4 h-4" />
              Upload Routers
            </Button>
          </div>

          {/* Additional actions can be added here */}
          <div className={cn('p-4 rounded-lg border', theme.border, theme.surface)}>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Export Options
            </h3>
            <p className="text-sm text-gray-900 dark:text-gray-300 mb-4">
              Export router data in various formats.
            </p>
            <div className="space-y-2">
              <Button variant="outline" className="w-full gap-2" onClick={onExport}>
                <Download className="w-4 h-4" />
                Export to CSV
              </Button>
              <Button variant="outline" className="w-full gap-2">
                <Download className="w-4 h-4" />
                Export to Excel
              </Button>
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
}
