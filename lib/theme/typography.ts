/**
 * Centralized Typography System
 * Font sizes, weights, and text styles
 * Ensures consistency across all components
 */

export const typography = {
  // Font families
  fonts: {
    sans: 'font-sans',
    mono: 'font-mono',
  },

  // Font sizes
  sizes: {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
  },

  // Font weights
  weights: {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  },

  // Common text combinations
  styles: {
    pageTitle: 'text-3xl font-bold text-gray-900',
    pageSubtitle: 'text-gray-600',
    cardTitle: 'text-lg font-semibold',
    cardValue: 'text-3xl font-bold text-gray-900',
    label: 'text-sm font-medium',
    body: 'text-sm text-gray-600',
    caption: 'text-xs text-gray-500',
    statChange: 'text-sm font-medium',
  },

  // Line heights
  leading: {
    tight: 'leading-tight',
    normal: 'leading-normal',
    relaxed: 'leading-relaxed',
  },
} as const;
