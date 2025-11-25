/**
 * Depth & Elevation System
 * Modern shadows, glass effects, and layering for visual depth
 * Creates that premium, polished look
 */

export const depth = {
  // Shadow system - layered elevation
  shadows: {
    none: 'shadow-none',
    xs: 'shadow-sm',
    sm: 'shadow-md dark:shadow-gray-900/30',
    md: 'shadow-lg dark:shadow-gray-900/40',
    lg: 'shadow-xl dark:shadow-gray-900/50',
    xl: 'shadow-2xl dark:shadow-gray-900/60',
    inner: 'shadow-inner',
  },

  // Elevation levels with combined effects
  elevation: {
    flat: '',
    raised: 'shadow-sm border border-gray-200/50 dark:border-gray-700/50',
    floating: 'shadow-lg border border-gray-200/50 dark:border-gray-700/50',
    modal: 'shadow-2xl border border-gray-200/60 dark:border-gray-700/60',
  },

  // Glass morphism effects
  glass: {
    light: 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm',
    medium: 'bg-white/70 dark:bg-gray-800/70 backdrop-blur-md',
    heavy: 'bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg',
  },

  // Ring effects for focus/hover
  rings: {
    none: 'ring-0',
    default: 'ring-2 ring-blue-500/20 dark:ring-blue-400/30',
    hover: 'hover:ring-2 hover:ring-blue-500/20 dark:hover:ring-blue-400/30',
    focus: 'focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400',
  },

  // Border styles
  borders: {
    subtle: 'border border-gray-200/60 dark:border-gray-700/60',
    default: 'border border-gray-200 dark:border-gray-700',
    strong: 'border-2 border-gray-300 dark:border-gray-600',
    accent: 'border border-blue-200 dark:border-blue-800',
  },

  // Gradient overlays for depth
  gradients: {
    overlay: 'bg-gradient-to-br from-white/5 to-transparent',
    shine: 'bg-gradient-to-br from-white/10 via-transparent to-transparent',
    subtle: 'bg-gradient-to-b from-gray-50/50 to-transparent dark:from-gray-900/50',
  },
} as const;

// Combined card styles with depth
export const cardStyles = {
  default: 'bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg transition-all duration-200',
  elevated: 'bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200/60 dark:border-gray-700/60 hover:shadow-xl transition-all duration-200',
  glass: 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-200',
  flat: 'bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700',
} as const;

// Interactive states with depth
export const interactive = {
  // Hover effects
  hover: {
    lift: 'hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200',
    glow: 'hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-200',
    scale: 'hover:scale-[1.02] transition-transform duration-200',
  },

  // Active/pressed states
  active: {
    press: 'active:scale-[0.98] transition-transform duration-100',
    shadow: 'active:shadow-inner transition-shadow duration-100',
  },

  // Combined interactive
  button: 'hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:shadow-md transition-all duration-200',
  card: 'hover:-translate-y-1 hover:shadow-xl transition-all duration-300',
} as const;
