import { StyleSheet } from 'react-native-unistyles';
import { lightColors, darkColors } from '@/theme';
import { BorderRadius } from '@/theme/borderRadius';
import { fonts, FontSize } from '@/theme/fonts';
import button from '@/theme/button';

const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

const borderRadius = {
  none: BorderRadius.NONE,
  sm: BorderRadius.SMALL,
  md: BorderRadius.MEDIUM,
  lg: BorderRadius.LARGE,
  full: BorderRadius.FULL,
} as const;

const lightTheme = {
  colors: lightColors,
  spacing,
  borderRadius,
  fonts,
  fontSize: FontSize,
  components: {
    button: button(lightColors),
  },
};

const darkTheme = {
  colors: darkColors,
  spacing,
  borderRadius,
  fonts,
  fontSize: FontSize,
  components: {
    button: button(darkColors),
  },
};

export type AppTheme = typeof lightTheme;

declare module 'react-native-unistyles' {
  export interface UnistylesThemes {
    light: AppTheme;
    dark: AppTheme;
  }
}

StyleSheet.configure({
  themes: {
    light: lightTheme,
    dark: darkTheme,
  },
  settings: {
    adaptiveThemes: true,
  },
});
