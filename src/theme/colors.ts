import { DarkTheme, DefaultTheme } from '@react-navigation/native';

export const lightColors = {
  background: '#FFFFFF',
  primary: '#F97314',
  primaryLight: '#FEE3D0',
  secondary: '#EEBB2A',
  tertiary: '#F2B800',
  border: '#9C9C9C',
  border2: '#E3E3E3',
  white: '#FFFFFF',
  gray: '#363636',
  green: '#07CA4A',
  error: '#D70015',
};

export type ColorType = typeof lightColors;

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...lightColors,
  },
};

export const darkColors: ColorType = {
  background: '#1F1F1F',
  primary: '#F97314',
  primaryLight: '#332C24',
  secondary: '#03DAC6',
  tertiary: '#F2B800',
  border: '#9C9C9C',
  border2: '#383838',
  white: '#FFFFFF',
  gray: '#363636',
  green: '#07CA4A',
  error: '#FF6961',
};

export const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    ...darkColors,
  },
};
