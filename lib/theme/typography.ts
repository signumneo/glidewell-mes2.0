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
    pageTitle: 'text-3xl font-bold text-gray-900 dark:text-white',
    pageSubtitle: 'text-gray-700 dark:text-gray-400',
    cardTitle: 'text-lg font-semibold text-gray-900 dark:text-white',
    cardValue: 'text-3xl font-bold text-gray-900 dark:text-white',
    label: 'text-sm font-medium text-gray-900 dark:text-gray-300',
    body: 'text-sm text-gray-700 dark:text-gray-400',
    caption: 'text-xs text-gray-600 dark:text-gray-500',
    statChange: 'text-sm font-medium',
    // Client Config specific - properly theme-aware
    sectionTitle: 'text-lg font-semibold text-gray-900 dark:text-white text-center',
    sectionSubtitle: 'text-sm text-gray-700 dark:text-gray-400 text-center',
    cardHeader: 'font-semibold text-gray-900 dark:text-white text-center',
    cardDescription: 'text-xs text-gray-600 dark:text-gray-400 text-center',
  },

  // Line heights
  leading: {
    tight: 'leading-tight',
    normal: 'leading-normal',
    relaxed: 'leading-relaxed',
  },
} as const;
