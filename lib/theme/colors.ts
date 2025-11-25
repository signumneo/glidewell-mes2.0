/**
 * Centralized Color System
 * Following Notion/Google's minimal aesthetic
 * Clean, professional, timeless colors
 */

export const colors = {
  // Brand colors - Clean, modern blue
  brand: {
    primary: '#0066ff',      // Google-style blue
    secondary: '#5b8def',    // Lighter accent
    accent: '#0052cc',       // Notion-style darker blue
  },

  // Gradient combinations - Subtle, professional
  gradients: {
    primary: 'from-blue-600 to-blue-500',
    success: 'from-emerald-500 to-emerald-600',
    warning: 'from-amber-500 to-amber-600',
    danger: 'from-rose-500 to-rose-600',
    info: 'from-blue-500 to-cyan-500',
    purple: 'from-purple-500 to-purple-600',
    teal: 'from-teal-500 to-cyan-500',
    background: 'from-gray-50 to-white',
  },

  // Semantic colors - Muted, professional
  status: {
    success: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-700',
      border: 'border-emerald-200',
      dot: 'bg-emerald-500',
    },
    warning: {
      bg: 'bg-amber-50',
      text: 'text-amber-700',
      border: 'border-amber-200',
      dot: 'bg-amber-500',
    },
    error: {
      bg: 'bg-rose-50',
      text: 'text-rose-700',
      border: 'border-rose-200',
      dot: 'bg-rose-500',
    },
    info: {
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      border: 'border-blue-200',
      dot: 'bg-blue-500',
    },
  },

  // Production line status colors
  productionStatus: {
    running: 'bg-emerald-500',
    idle: 'bg-gray-400',
    maintenance: 'bg-amber-500',
    error: 'bg-rose-500',
  },

  // UI elements - Minimal, clean
  ui: {
    background: 'bg-white',
    surface: 'bg-white',
    border: 'border-gray-200/60',
    divider: 'border-gray-200/60',
    hover: 'hover:bg-gray-50',
    focus: 'focus:border-blue-500 focus:ring-blue-500/20',
  },

  // Text colors - High contrast, readable
  text: {
    primary: 'text-gray-900',
    secondary: 'text-gray-600',
    tertiary: 'text-gray-500',
    muted: 'text-gray-400',
    inverted: 'text-white',
  },
} as const;
