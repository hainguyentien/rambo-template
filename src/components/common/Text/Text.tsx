import React from 'react';
import type { ColorValue, TextProps as RNTextProps } from 'react-native';
import { Text as RNText } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';
import type { FontWeight } from '@/theme/fonts';
import { fonts } from '@/theme/fonts';

export type { FontWeight };

export interface TextProps extends RNTextProps {
  size?: number;
  weight?: FontWeight;
  underline?: boolean;
  align?: 'auto' | 'left' | 'right' | 'center';
  color?: ColorValue;
}

export const Text: React.FC<TextProps> = ({
  children,
  size,
  weight = 'regular',
  underline,
  align,
  color,
  style,
  ...props
}) => {
  const { theme } = useUnistyles();

  return (
    <RNText
      style={[
        {
          fontFamily: fonts[weight],
          color: color ?? theme.colors.onBackground,
        },
        align ? { textAlign: align } : undefined,
        underline ? { textDecorationLine: 'underline' } : undefined,
        size ? { fontSize: size, lineHeight: size * 1.25 } : undefined,
        style,
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
};
