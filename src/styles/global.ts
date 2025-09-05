import { StyleSheet } from 'react-native';

// Color palette
export const Colors = {
  // Primary colors
  primary: '#007AFF',
  primaryDark: '#0051D5',
  secondary: '#5856D6',
  
  // Neutral colors
  white: '#FFFFFF',
  black: '#000000',
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',
  
  // Semantic colors
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6',
  
  // Background colors
  background: '#FFFFFF',
  surface: '#F9FAFB',
  
  // Text colors
  textPrimary: '#111827',
  textSecondary: '#6B7280',
  textMuted: '#9CA3AF',
} as const;

// Typography
export const Typography = {
  // Font sizes
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  
  // Line heights
  lineHeight: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
  },
  
  // Font weights
  fontWeight: {
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
} as const;

// Spacing scale (based on 4px grid)
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
} as const;

// Border radius
export const BorderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
} as const;

// Shadows
export const Shadows = StyleSheet.create({
  small: {
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  medium: {
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  large: {
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
});

// Common layout styles
export const Layout = StyleSheet.create({
  container: {
    paddingTop: 10,
    flex: 1,
    backgroundColor: Colors.background,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  padding: {
    padding: Spacing.lg,
  },
  paddingHorizontal: {
    paddingHorizontal: Spacing.lg,
  },
  paddingVertical: {
    paddingVertical: Spacing.lg,
  },
  margin: {
    margin: Spacing.lg,
  },
  marginHorizontal: {
    marginHorizontal: Spacing.lg,
  },
  marginVertical: {
    marginVertical: Spacing.lg,
  },
});

// Common text styles
export const TextStyles = StyleSheet.create({
  heading1: {
    fontSize: Typography['3xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
    lineHeight: Typography['3xl'] * Typography.lineHeight.tight,
  },
  heading2: {
    fontSize: Typography['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
    lineHeight: Typography['2xl'] * Typography.lineHeight.tight,
  },
  heading3: {
    fontSize: Typography.xl,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.textPrimary,
    lineHeight: Typography.xl * Typography.lineHeight.tight,
  },
  body: {
    fontSize: Typography.base,
    fontWeight: Typography.fontWeight.normal,
    color: Colors.textPrimary,
    lineHeight: Typography.base * Typography.lineHeight.normal,
  },
  bodySmall: {
    fontSize: Typography.sm,
    fontWeight: Typography.fontWeight.normal,
    color: Colors.textSecondary,
    lineHeight: Typography.sm * Typography.lineHeight.normal,
  },
  caption: {
    fontSize: Typography.xs,
    fontWeight: Typography.fontWeight.normal,
    color: Colors.textMuted,
    lineHeight: Typography.xs * Typography.lineHeight.normal,
  },
});