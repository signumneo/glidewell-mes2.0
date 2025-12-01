/**
 * Sidebar Types
 * Shared types for sidebar components
 */

import { LucideIcon } from 'lucide-react';
import { User } from '@/types/auth';

export interface NavItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
  isCollapsed?: boolean;
  onClick?: () => void;
}

export interface NavSectionProps {
  title: string;
  icon: LucideIcon;
  isExpanded: boolean;
  onToggle: () => void;
  isCollapsed?: boolean;
  children: React.ReactNode;
}

export interface SidebarProps {
  isCollapsed: boolean;
  isMobile: boolean;
  isMobileMenuOpen: boolean;
  onToggleCollapse: () => void;
  onCloseMobileMenu: () => void;
  user: User | null;
  onLogout: () => void;
}

export interface ExpandedSections {
  definition: boolean;
  overview: boolean;
  aiAssist: boolean;
}
