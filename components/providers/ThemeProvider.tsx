'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ReactNode, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { themes, type ThemeName } from '@/lib/theme/themes';

interface ThemeProviderProps {
  children: ReactNode;
}

function ThemeApplier({ children }: { children: ReactNode }) {
  const { theme } = useTheme();

  useEffect(() => {
    const currentTheme = themes[theme as ThemeName] || themes.light;
    
    // Apply theme-specific classes to body or root element
    document.documentElement.setAttribute('data-theme', currentTheme.name);
    
    // You can also set CSS variables here if needed
    const root = document.documentElement;
    root.style.setProperty('--theme-name', currentTheme.name);
  }, [theme]);

  return <>{children}</>;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      themes={['light', 'dark', 'claude', 'forest', 'ocean', 'sunset']}
      enableSystem={false}
      disableTransitionOnChange={false}
    >
      <ThemeApplier>{children}</ThemeApplier>
    </NextThemesProvider>
  );
}
