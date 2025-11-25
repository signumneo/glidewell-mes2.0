'use client';

import { useTheme } from 'next-themes';
import { useMemo } from 'react';
import { themes, type ThemeName } from '@/lib/theme/themes';

export function useThemeColors() {
  const { theme } = useTheme();
  
  const colors = useMemo(() => {
    const currentTheme = themes[theme as ThemeName] || themes.light;
    return currentTheme.colors;
  }, [theme]);

  return colors;
}
