/**
 * RouterActions - Action buttons toolbar
 * Bulk actions, export, add new router
 */

'use client';

import { Download, Plus, Upload, Trash2, Settings2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RouterActionsProps {
  onAddNew?: () => void;
  onExport?: () => void;
  onBulkUpload?: () => void;
  onBulkDelete?: () => void;
  selectedCount?: number;
}

export function RouterActions({
  onAddNew,
  onExport,
  onBulkUpload,
  onBulkDelete,
  selectedCount = 0,
}: RouterActionsProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Add New Router */}
      <Button onClick={onAddNew} className="gap-2">
        <Plus className="w-4 h-4" />
        Add New Router
      </Button>

      {/* Export */}
      <Button variant="outline" onClick={onExport} className="gap-2">
        <Download className="w-4 h-4" />
        Export
      </Button>

      {/* Bulk Upload */}
      <Button variant="outline" onClick={onBulkUpload} className="gap-2">
        <Upload className="w-4 h-4" />
        Bulk Upload
      </Button>

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

      {/* Settings */}
      <Button variant="ghost" size="icon">
        <Settings2 className="w-4 h-4" />
      </Button>
    </div>
  );
}
