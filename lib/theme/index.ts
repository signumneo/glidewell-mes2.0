/**
 * Main Theme Export
 * Central access point for all theme tokens
 */

export { colors } from './colors';
export { typography } from './typography';
export { spacing } from './spacing';
export { darkColors, themeColors } from './dark-mode';
export { brand, getBrandGradient, getBrandButtonGradient } from './brand';

// Combined theme object
export const theme = {
  colors,
  typography,
  spacing,
  darkColors,
  themeColors,
  brand,
} as const;

// Re-export for convenience
import { colors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';
import { darkColors, themeColors } from './dark-mode';
import { brand } from './brand';
