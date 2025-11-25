/**
 * Brand Configuration
 * Centralized branding constants - colors, logo settings, etc.
 * Easy to customize for different deployments
 */

import { appConfig } from '@/lib/config/app.config';

export const brand = {
  // Brand name (from centralized config)
  name: appConfig.app.name,
  fullName: appConfig.app.fullName,
  tagline: appConfig.app.tagline,
  
  // Logo colors (customizable)
  logo: {
    gradient: {
      from: 'from-blue-600',
      via: 'via-indigo-600',
      to: 'to-purple-600',
    },
    shadow: 'shadow-blue-500/30',
    hoverShadow: 'hover:shadow-blue-500/40',
  },
  
  // Primary brand colors (from centralized config)
  colors: {
    primary: appConfig.theme.colors.primary,
    secondary: appConfig.theme.colors.secondary,
    accent: appConfig.theme.colors.accent,
  },
  
  // Button gradient (matches logo)
  buttonGradient: 'from-blue-600 to-indigo-600',
  buttonGradientHover: 'from-blue-700 to-indigo-700',
  
  // Icon gradient (for consistent branding)
  iconGradient: 'from-blue-500 to-indigo-600',
} as const;

// Helper function to get brand gradient class
export const getBrandGradient = () => {
  return `bg-gradient-to-br ${brand.logo.gradient.from} ${brand.logo.gradient.via} ${brand.logo.gradient.to}`;
};

// Helper for button gradients
export const getBrandButtonGradient = () => {
  return `bg-gradient-to-r ${brand.buttonGradient} hover:${brand.buttonGradientHover}`;
};
