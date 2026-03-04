import type { DimensionValue } from 'react-native';

export interface LayoutProps {
  /**
   * The CSS `display` property
   */
  display?: 'none' | 'flex' | undefined;
  /**
   * The CSS `width` property
   */
  width?: DimensionValue;
  /**
   * The CSS `width` property
   */
  w?: DimensionValue;
  /**
   * The CSS `width` and `height` property
   */
  boxSize?: DimensionValue;
  /**
   * The CSS `max-width` property
   */
  maxWidth?: DimensionValue;
  /**
   * The CSS `max-width` property
   */
  maxW?: DimensionValue;
  /**
   * The CSS `min-width` property
   */
  minWidth?: DimensionValue;
  /**
   * The CSS `min-width` property
   */
  minW?: DimensionValue;
  /**
   * The CSS `height` property
   */
  height?: DimensionValue;
  /**
   * The CSS `height` property
   */
  h?: DimensionValue;
  /**
   * The CSS `max-height` property
   */
  maxHeight?: DimensionValue;
  /**
   * The CSS `max-height` property
   */
  maxH?: DimensionValue;
  /**
   * The CSS `min-height` property
   */
  minHeight?: DimensionValue;
  /**
   * The CSS `min-height` property
   */
  minH?: DimensionValue;
  /**
   * The CSS `overflow` property
   */
  overflow?: 'visible' | 'hidden' | 'scroll';
}
