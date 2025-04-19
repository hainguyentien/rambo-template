import type { BoxProps } from './types/BoxProps';
import React from 'react';
import type { PressableProps, StyleProp, ViewStyle } from 'react-native';
import { Pressable, View } from 'react-native';

const Box: React.FC<
  BoxProps & Omit<PressableProps, 'style'> & { children?: React.ReactNode, style?: StyleProp<ViewStyle> }
> = ({
  bgColor,
  backgroundColor,
  border,
  borderWidth,
  borderStyle,
  borderRadius,
  borderColor,
  rounded,
  borderTop,
  borderTopWidth,
  borderBottom,
  borderBottomWidth,
  borderTopColor,
  borderBottomColor,
  borderLeft,
  borderLeftWidth,
  borderRight,
  borderRightWidth,
  borderLeftColor,
  borderRightColor,
  borderTopRadius,
  borderBottomRadius,
  borderTopLeftRadius,
  borderBottomLeftRadius,
  borderTopRightRadius,
  borderBottomRightRadius,
  roundedTop,
  roundedBottom,
  roundedLeft,
  roundedRight,
  roundedTopLeft,
  roundedBottomLeft,
  roundedTopRight,
  roundedBottomRight,
  borderX,
  borderY,
  alignItems,
  alignSelf,
  justifyContent,
  flex,
  flexDirection,
  flexGrow,
  flexWrap,
  flexShrink,
  flexBasis,
  display,
  width,
  w,
  boxSize,
  maxWidth,
  maxW,
  minWidth,
  minW,
  height,
  h,
  maxHeight,
  maxH,
  minHeight,
  minH,
  overflow,
  zIndex,
  pos,
  position,
  top,
  right,
  bottom,
  left,
  inset,
  insetX,
  insetY,
  m,
  margin,
  mt,
  marginTop,
  mb,
  marginBottom,
  ml,
  marginLeft,
  mr,
  marginRight,
  mx,
  marginX,
  my,
  marginY,
  p,
  padding,
  pt,
  paddingTop,
  pb,
  paddingBottom,
  pl,
  paddingLeft,
  pr,
  paddingRight,
  px,
  paddingX,
  py,
  paddingY,
  transform,
  gap,
  rowGap,
  columnGap,
  children,
  onPress,
  disabled,
  opacity,
  style,
  ...props
}) => {
  const Component = onPress ? Pressable : View;

  return (
    <Component
      // @ts-expect-error - RNW does not have these props
      style={[{
        backgroundColor: bgColor ?? backgroundColor,
        borderWidth: border ?? borderWidth,
        borderStyle,
        borderRadius: borderRadius ?? rounded,
        borderColor,
        borderTopWidth: borderTop ?? borderTopWidth ?? borderY,
        borderBottomWidth: borderBottom ?? borderBottomWidth ?? borderY,
        borderLeftWidth: borderLeft ?? borderLeftWidth ?? borderX,
        borderRightWidth: borderRight ?? borderRightWidth ?? borderX,
        borderTopColor,
        borderBottomColor,
        borderLeftColor,
        borderRightColor,
        borderTopLeftRadius:
          borderTopLeftRadius ??
          roundedTopLeft ??
          borderTopRadius ??
          roundedTop ??
          borderLeft ??
          roundedLeft ??
          borderRadius,
        borderTopRightRadius:
          borderTopRightRadius ??
          roundedTopRight ??
          borderTopRadius ??
          roundedTop ??
          borderRight ??
          roundedRight ??
          borderRadius,
        borderBottomLeftRadius:
          borderBottomLeftRadius ??
          roundedBottomLeft ??
          borderBottomRadius ??
          roundedBottom ??
          borderLeft ??
          roundedLeft ??
          borderRadius,
        borderBottomRightRadius:
          borderBottomRightRadius ??
          roundedBottomRight ??
          borderBottomRadius ??
          roundedBottom ??
          borderRight ??
          roundedRight ??
          borderRadius,
        // Flex Props
        alignItems,
        justifyContent,
        flex,
        flexDirection,
        flexGrow,
        flexShrink,
        flexWrap,
        flexBasis,
        alignSelf,
        // Layout Props
        display,
        width: w ?? width ?? boxSize,
        maxWidth: maxW ?? maxWidth,
        minWidth: minW ?? minWidth,
        height: h ?? height ?? boxSize,
        maxHeight: maxH ?? maxHeight,
        minHeight: minH ?? minHeight,
        overflow,
        // Position Props
        zIndex,
        position: pos ?? position,
        top: top ?? insetY ?? inset,
        right: right ?? insetX ?? inset,
        bottom: bottom ?? insetY ?? inset,
        left: left ?? insetX ?? inset,
        // Space Props
        margin: m ?? margin,
        marginTop: mt ?? marginTop ?? my ?? marginY,
        marginBottom: mb ?? marginBottom ?? my ?? marginY,
        marginLeft: ml ?? marginLeft ?? mx ?? marginX,
        marginRight: mr ?? marginRight ?? mx ?? marginX,
        padding: p ?? padding,
        paddingTop: pt ?? paddingTop ?? py ?? paddingY,
        paddingBottom: pb ?? paddingBottom ?? py ?? paddingY,
        paddingLeft: pl ?? paddingLeft ?? px ?? paddingX,
        paddingRight: pr ?? paddingRight ?? px ?? paddingX,
        // Transform Props
        transform,
        gap,
        rowGap,
        columnGap,
        opacity,
      }, style]}
      onPress={onPress}
      disabled={disabled ?? !onPress}
      {...props}
    >
      {children}
    </Component>
  );
};

export { Box };
