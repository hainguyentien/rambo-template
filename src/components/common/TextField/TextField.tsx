import React, { forwardRef, useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';
import { applyMask, unmask } from '@/lib/mask';
import { Box } from '@/components/common/Layout/Box';
import { Text } from '@/components/common/Text/Text';
import { fonts } from '@/theme/fonts';
import type { TextFieldProps } from '@/components/common/TextField/types';

const TextField = forwardRef<any, TextFieldProps>(
  (
    {
      label,
      error,
      hint,
      left,
      right,
      onChange,
      editable = true,
      disabled = false,
      onFocus: onFocusProp,
      onBlur: onBlurProp,
      isOptional,
      containerStyle,
      inputContainerStyle,
      value,
      mask,
      labelColor,
      ...props
    },
    ref
  ) => {
    const { theme } = useUnistyles();
    const { colors } = theme;
    const [isFocused, setIsFocused] = useState(false);

    const displayedValue =
      mask && value ? applyMask(value, mask) : value?.toString();

    const handleOnChangeText = (text: string) => {
      if (typeof onChange === 'function') {
        onChange(text, mask ? unmask(text, mask) : undefined);
      }
      if (typeof props.onChangeText === 'function') {
        props.onChangeText(text);
      }
    };

    const onFocus = () => {
      onFocusProp?.();
      setIsFocused(true);
    };

    const onBlur = () => {
      onBlurProp?.();
      setIsFocused(false);
    };

    const borderColor = error
      ? colors.error
      : isFocused
        ? colors.primary
        : colors.onBackground;

    return (
      <Box mb={16} opacity={disabled ? 0.7 : 1} style={containerStyle}>
        {!!label && (
          <Box flexDirection="row" alignItems="center">
            <Text
              color={
                labelColor ??
                (disabled ? colors.placeholder : colors.onBackground)
              }
            >
              {label}
              {isOptional && (
                <Text
                  color={disabled ? colors.placeholder : colors.onBackground}
                >
                  {' (optional)'}
                </Text>
              )}
            </Text>
          </Box>
        )}

        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          w="100%"
          mb={12}
          style={[styles.containerInput, { borderColor }, inputContainerStyle]}
        >
          {left}

          <TextInput
            {...props}
            ref={ref}
            autoCorrect={false}
            value={displayedValue}
            placeholder={props.placeholder}
            placeholderTextColor={
              props.placeholderTextColor ?? colors.placeholder
            }
            onChangeText={handleOnChangeText}
            onFocus={onFocus}
            onBlur={onBlur}
            style={[
              styles.inputText,
              { color: disabled ? colors.placeholder : colors.onBackground },
            ]}
            editable={!disabled && editable}
          />

          {right}
        </Box>

        {!!error && <Text color={colors.error}>{error}</Text>}
        {!error && !!hint && <Text color={colors.placeholder}>{hint}</Text>}
      </Box>
    );
  }
);

TextField.displayName = 'TextField';

export default TextField;

const styles = StyleSheet.create({
  inputText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    fontFamily: fonts.regular,
    paddingHorizontal: 0,
    minHeight: 36,
    padding: 8,
  },
  containerInput: {
    borderWidth: 1,
    borderRadius: 6,
  },
});
