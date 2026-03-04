import { colors } from '@/theme/colors';

const baseSemanticColors = {
  primary: colors.brand.primary,
  primaryVariant: colors.brand.primaryDark,
  primaryVariant2: colors.brand.primarySoft,
  primaryVariant3: '#FCF7F7',
  secondary: colors.brand.secondary,
  secondaryVariant: colors.brand.secondaryDark,

  // background
  background: colors.surface.background,
  surface: colors.surface.surface,
  border: colors.surface.border,
  error: colors.status.error,
  success: colors.status.success,
  warning: colors.status.warning,
  info: colors.status.info,

  // text
  onPrimary: colors.white,
  onSecondary: colors.text.primary,
  onSurface: colors.text.primary,
  onBackground: colors.text.primary,
  onError: colors.white,
  placeholder: colors.text.secondary,

  // expanded semantic tokens
  textPrimary: colors.text.primary,
  textSecondary: colors.text.secondary,
  primaryDark: colors.brand.primaryDark,
  primarySoft: colors.brand.primarySoft,
  secondaryDark: colors.brand.secondaryDark,
  secondarySoft: colors.brand.secondarySoft,
  neutral: colors.brand.neutral,

  // insert the colors as palette
  palette: colors,
} as const;

export const lightColors = {
  ...baseSemanticColors,
};

export const darkColors: ColorType = {
  ...baseSemanticColors,
  background: '#2E2420',
  surface: '#3A2D28',
  border: '#5A4740',
  onSurface: '#F6EFEA',
  onBackground: '#F6EFEA',
  placeholder: '#BDAAA0',
  textPrimary: '#F6EFEA',
  textSecondary: '#D5C5BC',
  neutral: '#F6EFEA',
};

export type ColorType = typeof lightColors;
