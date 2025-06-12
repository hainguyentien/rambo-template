import React, { useMemo } from 'react';
import type { ColorValue, TextProps as RNTextProps } from 'react-native';
import { Text as RNText } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { fonts } from '@/theme/fonts';

export type FontWeight = 'normal' | 'semibold' | 'bold';

export interface TextProps extends RNTextProps {
  fontSize?: number;
  fontWeight?: FontWeight | 'light' | 'medium';
  italic?: boolean;
  underline?: boolean;
  align?: 'auto' | 'left' | 'right' | 'center' | undefined;
  color?: ColorValue;
  fontFamily?: 'lalezar' | 'manrope';
  flex?: number;
}

export const getFontFamily = (
  fontFamily: 'lalezar' | 'manrope',
  fontWeight: FontWeight | 'light' | 'medium' = 'normal'
): string => {
  if (fontFamily === 'manrope') {
    switch (fontWeight) {
      case 'light':
        return fonts.Manrope.Light;
      case 'normal':
        return fonts.Manrope.Regular;
      case 'medium':
        return fonts.Manrope.Medium;
      case 'semibold':
        return fonts.Manrope.SemiBold;
      case 'bold':
        return fonts.Manrope.Bold;
      default:
        return fonts.Manrope.Regular;
    }
  } else {
    switch (fontFamily) {
      case 'lalezar':
        return fonts.Lalezar.Regular;
      default:
        return fonts.Manrope.Regular;
    }
  }
};

export const Text: React.FC<TextProps> = ({
  children,
  fontSize,
  fontWeight,
  italic,
  underline,
  align = 'auto',
  color,
  style,
  fontFamily = 'manrope',
  ...props
}) => {
  const { colors } = useTheme();

  const textFontFamily = useMemo(
    () => getFontFamily(fontFamily, fontWeight),
    [fontWeight, italic]
  );

  return (
    <RNText
      style={[
        { fontFamily: textFontFamily },
        { color: color ?? colors.text },
        { textAlign: align ?? align },
        { textDecorationLine: underline ? 'underline' : 'none' },
        fontSize
          ? {
              fontSize,
              lineHeight: fontSize * 1.25,
            }
          : undefined,
        style,
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
};
