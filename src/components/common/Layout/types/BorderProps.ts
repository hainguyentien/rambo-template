import { ColorValue } from 'react-native';

export interface BorderProps {
	/**
	 * The CSS `border` property
	 */
	border?: number;
	/**
	 * The CSS `border-width` property
	 */
	borderWidth?: number;
	/**
	 * The CSS `border-style` property
	 */
	borderStyle?: 'solid' | 'dotted' | 'dashed';
	/**
	 * The CSS `border-color` property
	 */
	borderColor?: ColorValue;
	/**
	 * The CSS `border-radius` property
	 */
	borderRadius?: number;
	/**
	 * The CSS `border-radius` property
	 */
	rounded?: number;
	/**
	 * The CSS `border-top` property
	 */
	borderTop?: number;
	/**
	 * The CSS `border-top-width` property
	 */
	borderTopWidth?: number;
	/**
	 * The CSS `border-bottom-width` property
	 */
	borderBottomWidth?: number;
	/**
	 * The CSS `border-left-width` property
	 */
	borderLeftWidth?: number;
	/**
	 * The CSS `border-right-width` property
	 */
	borderRightWidth?: number;
	/**
	 * The CSS `border-top-color` property
	 */
	borderTopColor?: ColorValue;
	/**
	 * The CSS `border-bottom-color` property
	 */
	borderBottomColor?: ColorValue;
	/**
	 * The CSS `border-left-color` property
	 */
	borderLeftColor?: ColorValue;
	/**
	 * The CSS `border-right-color` property
	 */
	borderRightColor?: ColorValue;
	/**
	 * The CSS `border-right` property
	 */
	borderRight?: number;
	/**
	 * The CSS `border-bottom` property
	 */
	borderBottom?: number;
	/**
	 * The CSS `border-left` property
	 */
	borderLeft?: number;
	/**
	 * The CSS `border-top-radius` property
	 */
	borderTopRadius?: number;
	/**
	 * The CSS `border-top-radius` property
	 */
	roundedTop?: number;
	/**
	 * The CSS `border-right-radius` property
	 */
	borderRightRadius?: number;
	/**
	 * The CSS `border-right-radius` property
	 */
	roundedRight?: number;
	/**
	 * When direction is `ltr`, `roundedEnd` is equivalent to `borderRightRadius`.
	 * When direction is `rtl`, `roundedEnd` is equivalent to `borderLeftRadius`.
	 */
	roundedEnd?: number;
	/**
	 * When direction is `ltr`, `borderInlineEndRadius` is equivalent to `borderRightRadius`.
	 * When direction is `rtl`, `borderInlineEndRadius` is equivalent to `borderLeftRadius`.
	 */
	borderInlineEndRadius?: number;
	/**
	 * When direction is `ltr`, `borderEndRadius` is equivalent to `borderRightRadius`.
	 * When direction is `rtl`, `borderEndRadius` is equivalent to `borderLeftRadius`.
	 */
	borderEndRadius?: number;
	/**
	 * The CSS `border-bottom-radius` property
	 */
	borderBottomRadius?: number;
	/**
	 * The CSS `border-bottom-radius` property
	 */
	roundedBottom?: number;
	/**
	 * The CSS `border-left-radius` property
	 */
	borderLeftRadius?: number;
	/**
	 * The CSS `border-left-radius` property
	 */
	roundedLeft?: number;
	/**
	 * When direction is `ltr`, `roundedEnd` is equivalent to `borderRightRadius`.
	 * When direction is `rtl`, `roundedEnd` is equivalent to `borderLeftRadius`.
	 */
	roundedStart?: number;
	/**
	 * When direction is `ltr`, `borderInlineStartRadius` is equivalent to `borderLeftRadius`.
	 * When direction is `rtl`, `borderInlineStartRadius` is equivalent to `borderRightRadius`.
	 */
	borderInlineStartRadius?: number;
	/**
	 * When direction is `ltr`, `borderStartRadius` is equivalent to `borderLeftRadius`.
	 * When direction is `rtl`, `borderStartRadius` is equivalent to `borderRightRadius`.
	 */
	borderStartRadius?: number;
	/**
	 * The CSS `border-top-left-radius` property
	 */
	borderTopLeftRadius?: number;
	borderTopStartRadius?: number;
	/**
	 * The CSS `border-top-left-radius` property
	 */
	roundedTopLeft?: number;
	roundedTopStart?: number;
	/**
	 * The CSS `border-top-right-radius` property
	 */
	borderTopRightRadius?: number;
	borderTopEndRadius?: number;
	/**
	 * The CSS `border-top-right-radius` property
	 */
	roundedTopRight?: number;
	roundedTopEnd?: number;
	/**
	 * The CSS `border-bottom-left-radius` property
	 */
	borderBottomLeftRadius?: number;
	borderBottomStartRadius?: number;
	/**
	 * The CSS `border-bottom-left-radius` property
	 */
	roundedBottomLeft?: number;
	roundedBottomStart?: number;
	/**
	 * The CSS `border-bottom-right-radius` property
	 */
	borderBottomRightRadius?: number;
	borderBottomEndRadius?: number;
	/**
	 * The CSS `border-bottom-right-radius` property
	 */
	roundedBottomRight?: number;
	roundedBottomEnd?: number;
	/**
	 * The CSS `border-right` and `border-left` property
	 */
	borderX?: number;
	/**
	 * The CSS `border-top` and `border-bottom` property
	 */
	borderY?: number;
}
