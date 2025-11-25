/**
 * Dark Mode Theme Configuration
 * Following Notion/Google's minimal, classy aesthetic
 * Clean, subtle colors with excellent contrast
 */

import { appConfig } from '@/lib/config/app.config';

export const darkColors = {
  // Background colors - Lighter, softer dark mode with better contrast
  background: {
    primary: `dark:bg-[${appConfig.theme.darkMode.background}]`,
    secondary: 'dark:bg-[#252525]',
    tertiary: 'dark:bg-[#2e2e2e]',
    surface: `dark:bg-[${appConfig.theme.darkMode.surface}]`,
  },

  // Text colors - Higher contrast, more readable
  text: {
    primary: `dark:text-[${appConfig.theme.darkMode.text}]`,
    secondary: 'dark:text-[#e0e0e0]',
    tertiary: 'dark:text-[#c0c0c0]',
    muted: 'dark:text-[#888888]',
  },

  // Border colors - More visible, better definition
  border: {
    default: `dark:border-[${appConfig.theme.darkMode.border}]`,
    subtle: 'dark:border-[#2f2f2f]',
    hover: 'dark:border-[#4a4a4a]',
  },

  // UI elements
  ui: {
    hover: 'dark:hover:bg-[#2e2e2e]',  // Visible hover
    active: 'dark:bg-[#353535]',       // Clear active state
    disabled: 'dark:bg-[#1f1f1f] dark:text-[#5a5a5a]',
  },

  // Status colors - More vibrant, better visibility
  status: {
    success: {
      bg: 'dark:bg-emerald-950/40',
      text: 'dark:text-emerald-300',
      border: 'dark:border-emerald-800/50',
    },
    warning: {
      bg: 'dark:bg-amber-950/40',
      text: 'dark:text-amber-300',
      border: 'dark:border-amber-800/50',
    },
    error: {
      bg: 'dark:bg-rose-950/40',
      text: 'dark:text-rose-300',
      border: 'dark:border-rose-800/50',
    },
    info: {
      bg: 'dark:bg-blue-950/40',
      text: 'dark:text-blue-300',
      border: 'dark:border-blue-800/50',
    },
  },
} as const;

// Combined light + dark mode classes - Notion/Google inspired
export const themeColors = {
  // Page background - Clean, minimal
  pageBackground: `bg-white dark:bg-[${appConfig.theme.darkMode.background}]`,
  
  // Surface (cards, panels) - Elevated but subtle
  surface: `bg-white dark:bg-[${appConfig.theme.darkMode.surface}]`,
  
  // Borders - Barely visible, professional
  border: `border-gray-200/60 dark:border-[${appConfig.theme.darkMode.border}]`,
  divider: `border-gray-200/60 dark:border-[${appConfig.theme.darkMode.border}]`,
  
  // Text - High contrast, readable
  textPrimary: `text-gray-900 dark:text-[${appConfig.theme.darkMode.text}]`,
  textSecondary: 'text-gray-600 dark:text-[#e0e0e0]',
  textTertiary: 'text-gray-500 dark:text-[#c0c0c0]',
  textMuted: 'text-gray-400 dark:text-[#888888]',
  
  // Interactive states - Subtle, smooth
  hover: 'hover:bg-gray-50 dark:hover:bg-[#2e2e2e]',
  active: 'bg-gray-100 dark:bg-[#353535]',
  
  // Inputs - Clean, minimal
  input: 'bg-white dark:bg-[#1f1f1f] border-gray-200 dark:border-[#3a3a3a] text-gray-900 dark:text-[#f0f0f0]',
  inputFocus: 'focus:border-blue-500 dark:focus:border-blue-500 focus:ring-blue-500/20 dark:focus:ring-blue-500/20',
} as const;
