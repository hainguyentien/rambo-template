export const fonts = {
  light: 'Outfit-Light',
  regular: 'Outfit-Regular',
  medium: 'Outfit-Medium',
  semibold: 'Outfit-SemiBold',
  bold: 'Outfit-Bold',
} as const;

export type FontWeight = 'light' | 'regular' | 'medium' | 'semibold' | 'bold';

export enum FontSize {
  EXTRA_SMALL = 10,
  SMALL = 12,
  MEDIUM = 14,
  LARGE = 16,
  EXTRA_LARGE = 18,
  EXTRA_EXTRA_LARGE = 20,
}
