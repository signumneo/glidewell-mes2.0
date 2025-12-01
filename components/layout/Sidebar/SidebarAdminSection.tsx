/**
 * SidebarAdminSection - Admin controls organism
 * Expandable sections for Definition, Overview, and Tracking
 */

'use client';

import { useState } from 'react';
import {
  Settings,
  Plus,
  List,
  TrendingUp,
  BarChart3,
  Package,
  Wrench,
  Target,
} from 'lucide-react';
import { SidebarSection } from './SidebarSection';
import { SidebarSubItem } from './SidebarSubItem';
import { SidebarNavItem } from './SidebarNavItem';

interface SidebarAdminSectionProps {
  isCollapsed: boolean;
  isMobile: boolean;
  onMobileClose?: () => void;
}

export function SidebarAdminSection({
  isCollapsed,
  isMobile,
  onMobileClose,
}: SidebarAdminSectionProps) {
  const [expandedSections, setExpandedSections] = useState({
    definition: false,
    overview: false,
  });

  const toggleSection = (section: 'definition' | 'overview') => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Show collapsed icons only on desktop
  if (isCollapsed && !isMobile) {
    return (
      <>
        <SidebarNavItem
          icon={Settings}
          label="Definition"
          href="/definition"
          isCollapsed={true}
        />
        <SidebarNavItem
          icon={TrendingUp}
          label="Overview"
          href="/overview"
          isCollapsed={true}
        />
        <SidebarNavItem
          icon={Target}
          label="Tracking"
          href="/tracking"
          isCollapsed={true}
        />
      </>
    );
  }

  return (
    <>
      <SidebarSection
        icon={Settings}
        label="Definition"
        isExpanded={expandedSections.definition}
        onToggle={() => toggleSection('definition')}
      >
        <SidebarSubItem
          icon={Plus}
          label="Define"
          href="/definition/define"
          onMobileClose={onMobileClose}
        />
        <SidebarSubItem
          icon={List}
          label="View"
          href="/definition/view"
          onMobileClose={onMobileClose}
        />
      </SidebarSection>

      <div className="mt-1">
        <SidebarSection
          icon={TrendingUp}
          label="Overview"
          isExpanded={expandedSections.overview}
          onToggle={() => toggleSection('overview')}
        >
          <SidebarSubItem
            icon={BarChart3}
            label="Analytics"
            href="/overview/analytics"
            onMobileClose={onMobileClose}
          />
          <SidebarSubItem
            icon={Package}
            label="Inventory"
            href="/overview/inventory"
            onMobileClose={onMobileClose}
          />
          <SidebarSubItem
            icon={Wrench}
            label="Charts"
            href="/overview/charts"
            onMobileClose={onMobileClose}
          />
        </SidebarSection>
      </div>

      <div className="mt-1">
        <SidebarNavItem
          icon={Target}
          label="Tracking"
          href="/tracking"
          onMobileClose={onMobileClose}
        />
      </div>
    </>
  );
}
