import React, { useEffect } from 'react';
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';

interface SpinnerProps {
  color?: string;
}

function Spinner({ color }: SpinnerProps): JSX.Element {
  const spinnerSize = 20;

  const rotation = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(
    () => ({
      transform: [
        {
          rotateZ: `${rotation.value}deg`,
        },
      ],
    }),
    [rotation.value]
  );

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 700,
        easing: Easing.linear,
      }),
      -1
    );
    return () => cancelAnimation(rotation);
  }, [rotation]);

  return (
    <Animated.View
      style={[
        {
          alignItems: 'center',
          justifyContent: 'center',
          width: spinnerSize,
          height: spinnerSize,
        },
        animatedStyles,
      ]}
    >
      <Svg width={spinnerSize} height={spinnerSize} viewBox="0 0 180 180">
        <Path
          d="M23,90 A67,67 0 0,1 157,90"
          fill="none"
          stroke={color}
          strokeWidth={18}
        />
      </Svg>
    </Animated.View>
  );
}

export default Spinner;
