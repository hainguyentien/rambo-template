import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import button from '@/theme/button';
import { colors } from '@/theme/colors';

export const lightColors = {
  primary: colors.orange[100],
  primaryVariant: colors.orange[50],
  primaryVariant2: colors.orange[20],
  primaryVariant3: colors.orange[5],
  secondary: colors.darkGreen[100],
  secondaryVariant: colors.darkGreen[50],

  // background
  background: colors.white,
  surface: colors.grey[50],
  error: colors.red,

  // text
  onPrimary: colors.white,
  onSecondary: colors.white,
  onSurface: colors.darkGreen[100],
  onBackground: colors.darkGreen[100],
  onError: colors.white,
  placeholder: colors.greyDarker,

  // insert the colors as pelette
  palette: colors,
};

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...lightColors,
  },
  components: {
    button: button(lightColors),
  },
};

export const darkColors: ColorType = {
  primary: colors.orange[100],
  primaryVariant: colors.orange[50],
  primaryVariant2: colors.orange[20],
  primaryVariant3: colors.orange[5],
  secondary: colors.darkGreen[100],
  secondaryVariant: colors.darkGreen[50],

  // background
  background: colors.black,
  surface: colors.grey[50],
  error: colors.red,

  // text
  onPrimary: colors.white,
  onSecondary: colors.white,
  onSurface: colors.darkGreen[100],
  onBackground: colors.white,
  onError: colors.white,
  placeholder: colors.greyDarker,

  // insert the colors as pelette
  palette: colors,
};

export const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    ...darkColors,
  },
  components: {
    button: button(darkColors),
  },
};

export type ColorType = typeof lightColors;
export type ComponentThemeType = typeof lightTheme.components;
