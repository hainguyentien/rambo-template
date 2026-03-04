import type { ColorValue, TextInputProps, ViewStyle } from 'react-native';
import type React from 'react';

export interface TextFieldProps extends Omit<TextInputProps, 'onChange'> {
  label?: string;
  error?: string;
  hint?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
  disabled?: boolean;
  value?: string;
  onChange?: (value: string, unmaskedValue?: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  mask?: string;
  isOptional?: boolean;
  labelColor?: ColorValue;
  containerStyle?: ViewStyle;
  inputContainerStyle?: ViewStyle;
  useBottomSheetInput?: boolean;
}
