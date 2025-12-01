/**
 * ClientConfigPage - Client configuration page
 * Manages location, IoT settings, sorting preferences, and branding
 */

'use client';

import {
  LocationSettings,
  IoTClientConfig,
  ColumnSortingPreferences,
  MESBranding,
} from '@/components/client-config';
import { typography } from '@/lib/design-system';

export default function ClientConfigPage() {
  return (
    <div className="space-y-8">
        {/* Basic Configuration */}
        <div>
          <div className="mb-4">
            <h2 className={typography.styles.sectionTitle}>Basic Configuration</h2>
            <p className={typography.styles.sectionSubtitle}>Core system settings and identifiers</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <LocationSettings />
            <IoTClientConfig />
          </div>
        </div>

        {/* Display Preferences */}
        <div>
          <div className="mb-4">
            <h2 className={typography.styles.sectionTitle}>Display Preferences</h2>
            <p className={typography.styles.sectionSubtitle}>Customize how data is displayed</p>
          </div>
          <ColumnSortingPreferences />
        </div>

        {/* System Branding */}
        <div>
          <div className="mb-4">
            <h2 className={typography.styles.sectionTitle}>System Branding</h2>
            <p className={typography.styles.sectionSubtitle}>Customize the application appearance</p>
          </div>
          <MESBranding />
        </div>
    </div>
  );
}
