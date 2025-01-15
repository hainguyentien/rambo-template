import React from 'react';
import type { ImageProps } from 'react-native';

interface SvgIconProps {
  size?: number;
  fill?: string;
  width?: number;
  height?: number;
  secondFill?: string;
}

export type IconProps = ImageProps & SvgIconProps;

/**
 * Conditionally render a component depends on input param's type
 * @param element can be either React Component (functional or class) or React Element (has been converted to tree node object)
 * @param props additional props
 * @returns JSX.Element | null
 *
 * ```ts
 * // React Component
 * renderElement(IconHome)
 * renderElement(IconHome, { size: 24 })
 * // React Element
 * renderElement(<IconHome />)
 * renderElement(<IconHome />, { size: 24 })
 * ```
 */
export const renderElement = <P extends object>(
  element: React.ReactElement<P> | React.ComponentType<P>,
  props?: P
): JSX.Element => {
  if (typeof element === 'function') {
    return React.createElement(element, props);
  }
  return React.cloneElement(element, { ...props, ...element.props });
};

/**
 * Conditionally render an icon element with color depends on input param's type
 * @param icon either [Image](https://reactnative.dev/docs/image) or [React-native-svg](https://github.com/software-mansion/react-native-svg#features). If icon type is react-native-svg, it should have `fill: color` prop to be able to fill in color automatically. For Image icon, this should be done via [tintColor](https://reactnative.dev/docs/image#tintcolor).
 * @param color hex format
 * @returns JSX.Element
 *
 * ```ts
 * // React Element
 * renderElement(SvgIcon, "#FFFFFF")
 * // React Component
 * renderElement(<Image source={icon} />, "#FFFFFF")
 * ```
 */
export const renderIconWithColor = (
  icon: React.ReactElement<IconProps> | React.ComponentType<IconProps>,
  color: string
): JSX.Element => {
  if (typeof icon === 'function') {
    return React.createElement(icon, {
      style: { tintColor: color },
      fill: color,
      source: {},
    });
    // eslint-disable-next-line no-else-return
  } else {
    return React.cloneElement(icon, {
      fill: color,
      ...icon.props,
      style: [{ tintColor: color }, icon.props.style],
    });
  }
};
