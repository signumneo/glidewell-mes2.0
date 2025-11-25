/**
 * Centralized Spacing System
 * Padding, margin, gaps, and layout spacing
 * Maintains consistent rhythm throughout the app
 */

export const spacing = {
  // Padding
  padding: {
    none: 'p-0',
    xs: 'p-2',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-12',
  },

  // Padding X (horizontal)
  px: {
    none: 'px-0',
    xs: 'px-2',
    sm: 'px-4',
    md: 'px-6',
    lg: 'px-8',
    xl: 'px-12',
  },

  // Padding Y (vertical)
  py: {
    none: 'py-0',
    xs: 'py-2',
    sm: 'py-4',
    md: 'py-6',
    lg: 'py-8',
    xl: 'py-12',
  },

  // Gaps
  gap: {
    none: 'gap-0',
    xs: 'gap-2',
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-12',
  },

  // Space between
  space: {
    xs: 'space-y-2',
    sm: 'space-y-4',
    md: 'space-y-6',
    lg: 'space-y-8',
    xl: 'space-y-12',
  },

  // Common layout spacing
  layout: {
    containerPadding: 'p-8',
    sectionGap: 'space-y-8',
    cardPadding: 'p-6',
    inputHeight: 'h-11',
    sidebarWidth: 'w-64',
    headerHeight: 'h-16',
  },
} as const;
