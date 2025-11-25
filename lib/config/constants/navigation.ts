/**
 * Navigation Configuration - Centralized sidebar navigation structure
 */

import {
  GitBranch,
  Sliders,
  Settings,
  Plus,
  Eye,
  TrendingUp,
  LineChart,
  Archive,
  Target,
  Sparkles,
  MessageCircle,
  BarChart2,
  type LucideIcon,
} from 'lucide-react';

export interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
  subItems?: { 
    name: string; 
    href: string; 
    icon: LucideIcon;
  }[];
}

export interface NavSection {
  title?: string;
  items: NavItem[];
}

export const NAVIGATION_SECTIONS: NavSection[] = [
  {
    items: [
      { 
        name: 'Routers', 
        href: '/routers', 
        icon: GitBranch 
      },
      { 
        name: 'Client Config', 
        href: '/client-config', 
        icon: Sliders 
      },
    ]
  },
  {
    title: 'ADMIN CONTROLS',
    items: [
      { 
        name: 'Definition', 
        href: '/definition', 
        icon: Settings,
        subItems: [
          { 
            name: 'Define', 
            href: '/definition/define', 
            icon: Plus 
          },
          { 
            name: 'View', 
            href: '/definition/view', 
            icon: Eye 
          },
        ]
      },
      { 
        name: 'Overview', 
        href: '/overview', 
        icon: TrendingUp,
        subItems: [
          { 
            name: 'Analytics', 
            href: '/overview/analytics', 
            icon: LineChart 
          },
          { 
            name: 'Inventory', 
            href: '/overview/inventory', 
            icon: Archive 
          },
        ]
      },
      { 
        name: 'Tracking', 
        href: '/tracking', 
        icon: Target 
      },
    ]
  },
  {
    items: [
      { 
        name: 'AI Assist', 
        href: '/ai-assist', 
        icon: Sparkles, 
        badge: 'BETA',
        subItems: [
          { 
            name: 'Chat', 
            href: '/ai-assist/chat', 
            icon: MessageCircle 
          },
          { 
            name: 'Charts', 
            href: '/ai-assist/charts', 
            icon: BarChart2 
          },
        ]
      },
    ]
  },
];
