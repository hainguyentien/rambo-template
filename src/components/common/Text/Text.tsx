import React, { useMemo } from 'react';
import type { ColorValue, TextProps as RNTextProps } from 'react-native';
import { Text as RNText } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { fonts } from '@/theme/fonts';

export type FontWeight = 'normal' | 'semibold' | 'bold';

export interface TextProps extends RNTextProps {
  fontSize?: number;
  fontWeight?: FontWeight;
  italic?: boolean;
  underline?: boolean;
  align?: 'auto' | 'left' | 'right' | 'center' | undefined;
  color?: ColorValue;
}

export const getFontFamily = (
  fontWeight: FontWeight = 'normal',
  italic = false
): string => {
  switch (fontWeight) {
    case 'normal':
      return italic ? fonts.NunitoSans.Italic : fonts.NunitoSans.Regular;
    case 'semibold':
      return italic
        ? fonts.NunitoSans.SemiBoldItalic
        : fonts.NunitoSans.SemiBold;
    case 'bold':
      return italic ? fonts.NunitoSans.BoldItalic : fonts.NunitoSans.Bold;
    default:
      return italic ? fonts.NunitoSans.Italic : fonts.NunitoSans.Regular;
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
  ...props
}) => {
  const { colors } = useTheme();

  const fontFamily = useMemo(
    () => getFontFamily(fontWeight, italic),
    [fontWeight, italic]
  );

  return (
    <RNText
      style={[
        { fontFamily },
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
