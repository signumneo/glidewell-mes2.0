'use client';

import { useTheme } from 'next-themes';
import { useMemo } from 'react';
import { themes, type ThemeName } from '@/lib/theme/themes';

export function useThemeColors() {
  const { resolvedTheme } = useTheme();
  
  const colors = useMemo(() => {
    // resolvedTheme is undefined during SSR, use light as safe default
    const themeName = (resolvedTheme as ThemeName) || 'light';
    return themes[themeName].colors;
  }, [resolvedTheme]);

  return colors;
}
