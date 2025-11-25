/**
 * Theme Presets
 * Beautiful color schemes inspired by modern applications
 */

export type ThemeName = 'light' | 'dark' | 'claude' | 'forest' | 'ocean' | 'sunset';

export interface Theme {
  name: ThemeName;
  label: string;
  colors: {
    // Page
    pageBackground: string;
    // Surfaces
    surfacePrimary: string;
    surfaceSecondary: string;
    surfaceTertiary: string;
    // Borders
    border: string;
    borderLight: string;
    // Text
    textPrimary: string;
    textSecondary: string;
    textTertiary: string;
    // Sidebar
    sidebarBackground: string;
    sidebarBorder: string;
    sidebarText: string;
    sidebarTextHover: string;
    sidebarAccent: string;
    // Accent colors
    accentPrimary: string;
    accentSecondary: string;
    accentHover: string;
    // Interactive
    hoverBackground: string;
    activeBackground: string;
  };
}

export const themes: Record<ThemeName, Theme> = {
  light: {
    name: 'light',
    label: 'Light',
    colors: {
      pageBackground: 'bg-gray-50',
      surfacePrimary: 'bg-white',
      surfaceSecondary: 'bg-gray-50',
      surfaceTertiary: 'bg-gray-100',
      border: 'border-gray-200',
      borderLight: 'border-gray-100',
      textPrimary: 'text-gray-900',
      textSecondary: 'text-gray-700',
      textTertiary: 'text-gray-500',
      sidebarBackground: 'bg-white',
      sidebarBorder: 'border-gray-200/60',
      sidebarText: 'text-gray-700',
      sidebarTextHover: 'text-gray-900',
      sidebarAccent: 'text-blue-600',
      accentPrimary: 'bg-blue-600 text-white',
      accentSecondary: 'bg-blue-50 text-blue-700',
      accentHover: 'hover:bg-blue-700',
      hoverBackground: 'hover:bg-gray-50',
      activeBackground: 'bg-gray-100',
    },
  },

  dark: {
    name: 'dark',
    label: 'Dark',
    colors: {
      pageBackground: 'bg-[#0f0f0f]',
      surfacePrimary: 'bg-[#1e1e1e]',
      surfaceSecondary: 'bg-[#161616]',
      surfaceTertiary: 'bg-[#2a2a2a]',
      border: 'border-[#3a3a3a]',
      borderLight: 'border-[#2a2a2a]',
      textPrimary: 'text-white',
      textSecondary: 'text-[#e0e0e0]',
      textTertiary: 'text-[#c0c0c0]',
      sidebarBackground: 'bg-[#1f1f1f]',
      sidebarBorder: 'border-[#2f2f2f]',
      sidebarText: 'text-[#e0e0e0]',
      sidebarTextHover: 'text-white',
      sidebarAccent: 'text-blue-400',
      accentPrimary: 'bg-blue-600 text-white',
      accentSecondary: 'bg-blue-950/30 text-blue-400',
      accentHover: 'hover:bg-blue-700',
      hoverBackground: 'hover:bg-[#252525]',
      activeBackground: 'bg-[#2a2a2a]',
    },
  },

  claude: {
    name: 'claude',
    label: 'Claude Brown',
    colors: {
      pageBackground: 'bg-[#f4f1ea]',
      surfacePrimary: 'bg-[#fdfcfa]',
      surfaceSecondary: 'bg-[#f9f7f2]',
      surfaceTertiary: 'bg-[#ede9df]',
      border: 'border-[#d4cfc0]',
      borderLight: 'border-[#e8e4d8]',
      textPrimary: 'text-[#2c2416]',
      textSecondary: 'text-[#5c5645]',
      textTertiary: 'text-[#7d7865]',
      sidebarBackground: 'bg-[#fdfcfa]',
      sidebarBorder: 'border-[#d4cfc0]',
      sidebarText: 'text-[#5c5645]',
      sidebarTextHover: 'text-[#2c2416]',
      sidebarAccent: 'text-[#9b6b2c]',
      accentPrimary: 'bg-[#c78850] text-white',
      accentSecondary: 'bg-[#f5e6d3] text-[#8b5e2a]',
      accentHover: 'hover:bg-[#b47842]',
      hoverBackground: 'hover:bg-[#f9f7f2]',
      activeBackground: 'bg-[#ede9df]',
    },
  },

  forest: {
    name: 'forest',
    label: 'Forest Green',
    colors: {
      pageBackground: 'bg-[#e8f3ea]',
      surfacePrimary: 'bg-[#f7fdf8]',
      surfaceSecondary: 'bg-[#f0f8f2]',
      surfaceTertiary: 'bg-[#e0ede3]',
      border: 'border-[#c2d9c7]',
      borderLight: 'border-[#d8e8db]',
      textPrimary: 'text-[#1a3021]',
      textSecondary: 'text-[#2f5239]',
      textTertiary: 'text-[#52745c]',
      sidebarBackground: 'bg-[#f7fdf8]',
      sidebarBorder: 'border-[#c2d9c7]',
      sidebarText: 'text-[#2f5239]',
      sidebarTextHover: 'text-[#1a3021]',
      sidebarAccent: 'text-[#2d6a3f]',
      accentPrimary: 'bg-[#2d6a3f] text-white',
      accentSecondary: 'bg-[#d4edda] text-[#1e4d2b]',
      accentHover: 'hover:bg-[#255a34]',
      hoverBackground: 'hover:bg-[#f0f8f2]',
      activeBackground: 'bg-[#e0ede3]',
    },
  },

  ocean: {
    name: 'ocean',
    label: 'Ocean Blue',
    colors: {
      pageBackground: 'bg-[#e6f2f8]',
      surfacePrimary: 'bg-[#f8fcfd]',
      surfaceSecondary: 'bg-[#f0f8fb]',
      surfaceTertiary: 'bg-[#deeef5]',
      border: 'border-[#b8d9e8]',
      borderLight: 'border-[#d0e6f0]',
      textPrimary: 'text-[#0c2d3e]',
      textSecondary: 'text-[#1a4d66]',
      textTertiary: 'text-[#3d6b82]',
      sidebarBackground: 'bg-[#f8fcfd]',
      sidebarBorder: 'border-[#b8d9e8]',
      sidebarText: 'text-[#1a4d66]',
      sidebarTextHover: 'text-[#0c2d3e]',
      sidebarAccent: 'text-[#0369a1]',
      accentPrimary: 'bg-[#0369a1] text-white',
      accentSecondary: 'bg-[#cfe9f5] text-[#0c4a6e]',
      accentHover: 'hover:bg-[#025a8a]',
      hoverBackground: 'hover:bg-[#f0f8fb]',
      activeBackground: 'bg-[#deeef5]',
    },
  },

  sunset: {
    name: 'sunset',
    label: 'Sunset Purple',
    colors: {
      pageBackground: 'bg-[#f5eef8]',
      surfacePrimary: 'bg-[#fdfafd]',
      surfaceSecondary: 'bg-[#f9f5fb]',
      surfaceTertiary: 'bg-[#ede5f0]',
      border: 'border-[#d4c5db]',
      borderLight: 'border-[#e6dce9]',
      textPrimary: 'text-[#2d1b33]',
      textSecondary: 'text-[#533d5c]',
      textTertiary: 'text-[#7a6582]',
      sidebarBackground: 'bg-[#fdfafd]',
      sidebarBorder: 'border-[#d4c5db]',
      sidebarText: 'text-[#533d5c]',
      sidebarTextHover: 'text-[#2d1b33]',
      sidebarAccent: 'text-[#7c3aed]',
      accentPrimary: 'bg-[#7c3aed] text-white',
      accentSecondary: 'bg-[#ede9fe] text-[#6d28d9]',
      accentHover: 'hover:bg-[#6d28d9]',
      hoverBackground: 'hover:bg-[#f9f5fb]',
      activeBackground: 'bg-[#ede5f0]',
    },
  },
};

export function getTheme(themeName: ThemeName): Theme {
  return themes[themeName] || themes.light;
}

export function getThemeColors(themeName: ThemeName) {
  return getTheme(themeName).colors;
}

export const themeOptions = Object.values(themes).map(theme => ({
  value: theme.name,
  label: theme.label,
}));
