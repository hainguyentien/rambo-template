import { useCallback, useEffect, useState } from 'react';
import type { GestureResponderEvent } from 'react-native';
import { Platform } from 'react-native';
import {
  cancelAnimation,
  Extrapolation,
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import type { ButtonVariant } from './types';
import { useTheme } from '@react-navigation/native';
import useLatest from '@/hooks/useLatest';

const iOSShadowOutputRange = {
  shadowOpacity: [0, 0.18, 0.2, 0.22, 0.23],
  height: [0, 1, 1, 1, 2],
  shadowRadius: [0, 1, 1.41, 2.22, 2.62],
};
const shadowColor = '#000';
const elevationLevel = [0, 1, 2, 3, 4];

const useButtonBehavior = ({
  loading,
  elevated,
  disabled,
  variant = 'primary',
  onPressAction,
  onPressInAction,
  onPressOutAction,
}: {
  loading?: boolean;
  elevated?: boolean;
  disabled?: boolean;
  variant?: ButtonVariant;
  onPressAction?: (event: GestureResponderEvent) => void;
  onPressInAction?: (event: GestureResponderEvent) => void;
  onPressOutAction?: (event: GestureResponderEvent) => void;
}) => {
  const theme = useTheme();
  const { maxElevationLevel, minElevationLevel, animationConfig } =
    theme.components.button;
  const colors = theme.components.button.colors[variant];

  const flat = variant === 'text' || variant === 'text-inline';
  // elevation
  const elevation = useSharedValue(
    elevated && !flat ? maxElevationLevel : minElevationLevel
  );
  useEffect(() => {
    if (elevated && !flat) {
      elevation.value = maxElevationLevel;
    } else {
      elevation.value = minElevationLevel;
    }
  }, [elevated, elevation, flat, maxElevationLevel, minElevationLevel]);

  // colors
  const progress = useSharedValue(disabled ? -1 : 0);
  const [textColor, setTextColor] = useState(
    disabled ? colors.labelDisabled : colors.label
  );
  useEffect(() => {
    cancelAnimation(progress);
    progress.value = withTiming(disabled ? -1 : 0, animationConfig);
    setTextColor(disabled ? colors.labelDisabled : colors.label);
  }, [colors.label, colors.labelDisabled, disabled, progress]);

  const latestDisabled = useLatest(disabled);
  const runDisabledAnimation = useCallback(() => {
    if (latestDisabled.current) {
      progress.value = withTiming(-1, animationConfig);
      setTextColor(colors.labelDisabled);
    }
  }, [animationConfig, colors.labelDisabled]);

  // actions
  const onPress = (event: GestureResponderEvent) => {
    if (!disabled && !loading) {
      onPressAction?.(event);
    }
  };

  const onPressIn = (event: GestureResponderEvent) => {
    if (disabled || loading) return;
    if (!elevated && !flat) {
      elevation.value = withTiming(maxElevationLevel, animationConfig);
    }
    progress.value = withTiming(1, animationConfig);
    setTextColor(colors.labelHighlight);
    onPressInAction?.(event);
  };

  const onPressOut = (event: GestureResponderEvent) => {
    if (disabled || loading) return;
    if (!elevated && !flat) {
      elevation.value = withTiming(minElevationLevel, animationConfig);
    }
    progress.value = withTiming(0, animationConfig, finished => {
      if (finished) {
        runOnJS(runDisabledAnimation)();
      }
    });
    setTextColor(colors.label);
    onPressOutAction?.(event);
  };

  const isAndroid = Platform.OS === 'android';

  // animated style
  const buttonAnimatedStyle = useAnimatedStyle(() => {
    if (isAndroid) {
      return {
        elevation: interpolate(elevation.value, elevationLevel, elevationLevel),
        backgroundColor: interpolateColor(
          progress.value,
          [-1, 0, 1],
          [
            colors.backgroundDisabled,
            colors.background,
            colors.backgroundHighlight,
          ]
        ),
        borderColor: interpolateColor(
          progress.value,
          [-1, 0, 1],
          [colors.borderDisabled, colors.border, colors.borderHighlight]
        ),
        borderWidth: variant === 'primary' ? 0 : 2,
      };
    }
    return {
      shadowColor,
      shadowOpacity: interpolate(
        elevation.value,
        elevationLevel,
        iOSShadowOutputRange.shadowOpacity,
        Extrapolation.CLAMP
      ),
      shadowOffset: {
        width: 0,
        height: interpolate(
          elevation.value,
          elevationLevel,
          iOSShadowOutputRange.height
        ),
      },
      shadowRadius: interpolate(
        elevation.value,
        elevationLevel,
        iOSShadowOutputRange.shadowRadius
      ),
      backgroundColor: interpolateColor(
        progress.value,
        [-1, 0, 1],
        [
          colors.backgroundDisabled,
          colors.background,
          colors.backgroundHighlight,
        ]
      ),
      borderColor: interpolateColor(
        progress.value,
        [-1, 0, 1],
        [colors.borderDisabled, colors.border, colors.borderHighlight]
      ),
      borderWidth: variant === 'primary' ? 0 : 2,
    };
  });

  return {
    onPress,
    onPressIn,
    onPressOut,
    buttonAnimatedStyle,
    textColor,
    loadingColor: colors.label,
  };
};

export default useButtonBehavior;
