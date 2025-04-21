import type {
  ColorValue,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from 'react-native';
import type React from 'react';
import type { MaskOptions } from 'react-native-mask-text/lib/typescript/src/@types';

export type MaskParams = {
  pattern?: string | string[];
  type?: 'custom' | 'currency';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- no type available for mask options
  options?: MaskOptions;
};

export interface TextFieldProps extends Omit<TextInputProps, 'onChange'> {
  label?: string;
  isError?: boolean;
  isOptional?: boolean;
  error?: string;
  hint?: string;
  left?: React.ReactElement<unknown> | React.ComponentType<unknown>;
  right?: React.ReactElement<unknown> | React.ComponentType<unknown>;
  innerInputWrapper?: ViewStyle;
  inputStyle?: TextStyle;
  inputErrorStyle?: TextStyle;
  disabled?: boolean;
  value?: string;
  autoExpand?: boolean;
  onChange?: (value: string, unMaskedValue?: string) => void;
  onChangeEvent?: TextInputProps['onChange'];
  onFocus?: () => void;
  onBlur?: () => void;
  onPressIconRight?: () => void;
  onPressIconLeft?: () => void;
  redText?: boolean;
  labelColor?: string;
  containerStyle?: ViewStyle;
  mask?: MaskParams;
  borderBottomColor?: ColorValue;
  iconRightStyle?: ViewStyle;
  toolTipStyle?: ViewStyle;
  useBottomSheetInput?: boolean;
  toolTip?: React.ReactElement<unknown> | React.ComponentType<unknown> | null;
  onPressToolTip?: () => void;
}
