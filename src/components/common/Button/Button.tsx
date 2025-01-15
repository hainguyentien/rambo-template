import React from 'react';
import type {
  GestureResponderEvent,
  PressableProps,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import Animated from 'react-native-reanimated';

import { Text } from '../Text/Text';
import useButtonBehavior from './useButtonBehavior';
import Spinner from './Spinner';
import type { IconProps } from './buttonRenderUtils';
import { renderIconWithColor } from './buttonRenderUtils';
import type { ButtonVariant } from './types';
import { Box } from '@/components/common/Layout/Box';

export interface ButtonProps {
  text?: string;
  variant?: ButtonVariant;
  subtext?: string;
  disabled?: boolean;
  loading?: boolean;
  mini?: boolean;
  /**
   * @deprecated use `size` prop instead, compact={true} is equal to size='small'
   */
  compact?: boolean;
  size?: 'small' | 'medium' | 'default';
  rounded?: boolean;
  elevated?: boolean;
  icon?: React.ReactElement<IconProps> | React.ComponentType<IconProps>;
  iconAfter?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
  onPressIn?: (event: GestureResponderEvent) => void;
  onPressOut?: (event: GestureResponderEvent) => void;
  onLongPress?: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  subtextStyle?: StyleProp<TextStyle>;
  children?:
    | React.ReactElement<unknown>
    | ((color: string) => React.ReactElement<unknown>);
}

function Button({
  text,
  variant = 'primary',
  subtext,
  disabled,
  loading,
  mini,
  compact,
  size = 'default',
  rounded,
  elevated,
  icon,
  iconAfter,
  onPress: onPressAction,
  onPressIn: onPressInAction,
  onPressOut: onPressOutAction,
  onLongPress,
  style,
  contentStyle,
  textStyle,
  subtextStyle,
  children,
}: ButtonProps) {
  const {
    onPress,
    onPressIn,
    onPressOut,
    buttonAnimatedStyle,
    textColor,
    loadingColor,
  } = useButtonBehavior({
    loading,
    elevated,
    disabled,
    variant,
    onPressAction,
    onPressInAction,
    onPressOutAction,
  });
  const noIcon = !icon;
  const hasText = Boolean(text);
  const hasSubtext = Boolean(subtext);

  if (variant === 'text-inline') {
    return (
      <Text
        selectable={false}
        accessibilityRole={disabled ? 'text' : 'link'}
        suppressHighlighting
        underline
        fontWeight="bold"
        color={textColor}
        style={textStyle}
        onPress={onPress}
      >
        {text}
      </Text>
    );
  }

  return (
    <Animated.View style={[{ flexDirection: mini ? 'row' : 'column' }, style]}>
      <Content
        variant={variant}
        disabled={disabled}
        compact={compact}
        size={size}
        rounded={rounded}
        loading={loading}
        hasSubtext={hasSubtext}
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onLongPress={onLongPress}
        style={[buttonAnimatedStyle, contentStyle]}
      >
        {loading && <Spinner color={loadingColor} />}
        {variant === 'custom' && !loading && (
          <>
            {typeof children === 'object' && children}
            {typeof children === 'function' && children(textColor)}
          </>
        )}
        {variant !== 'custom' && !loading && (
          <>
            {icon && !iconAfter && renderIconWithColor(icon, textColor)}
            {(hasText || hasSubtext) && (
              <Box
                ml={icon && !iconAfter ? 4 : 0}
                mr={icon && !iconAfter ? 4 : 0}
              >
                <Text
                  selectable={false}
                  fontWeight={variant === 'text' ? 'semibold' : 'bold'}
                  align={noIcon ? 'center' : 'left'}
                  color={textColor}
                  style={textStyle}
                >
                  {text}
                </Text>
                {hasSubtext && (
                  <Text
                    selectable={false}
                    align={noIcon ? 'center' : 'left'}
                    color={textColor}
                    style={subtextStyle}
                  >
                    {subtext}
                  </Text>
                )}
              </Box>
            )}
            {icon && iconAfter && renderIconWithColor(icon, textColor)}
          </>
        )}
      </Content>
    </Animated.View>
  );
}

type ContentProps = PressableProps &
  Pick<ButtonProps, 'rounded' | 'disabled' | 'compact' | 'variant' | 'size'> & {
    loading?: boolean;
    hasSubtext?: boolean;
  };
const Content: React.FC<ContentProps> = ({
  rounded,
  disabled,
  compact,
  variant,
  size = 'default',
  loading,
  hasSubtext,
  style,
  children,
  ...props
}) => {
  const paddingY = React.useMemo(() => {
    const borderWidth = variant === 'primary' ? 0 : 2;
    let paddingSize = size;
    if (compact) {
      paddingSize = 'small';
    }
    let paddingY = {
      default: 12 - borderWidth,
      medium: 12 - 2 - borderWidth,
      small: 8 - borderWidth,
    }[paddingSize];

    if (hasSubtext && !loading) {
      paddingY -= 8 + 1;
    }
    return Math.max(paddingY, 0);
  }, [variant, compact, size, hasSubtext, loading]);

  return (
    <Box
      flexDirection="row"
      py={paddingY}
      px={12}
      borderRadius={rounded ? 99 : 12}
      justifyContent="center"
      alignItems="center"
      opacity={
        disabled && variant && ['tertiary', 'custom'].includes(variant)
          ? 0.5
          : 1
      }
      style={style}
      {...props}
    >
      {children}
    </Box>
  );
};

export default Button;
