export interface LayoutProps {
  /**
   * The CSS `display` property
   */
  display?: 'none' | 'flex' | undefined;
  /**
   * The CSS `width` property
   */
  width?: number | string;
  /**
   * The CSS `width` property
   */
  w?: number | string;
  /**
   * The CSS `width` and `height` property
   */
  boxSize?: number | string;
  /**
   * The CSS `max-width` property
   */
  maxWidth?: number | string;
  /**
   * The CSS `max-width` property
   */
  maxW?: number | string;
  /**
   * The CSS `min-width` property
   */
  minWidth?: number | string;
  /**
   * The CSS `min-width` property
   */
  minW?: number | string;
  /**
   * The CSS `height` property
   */
  height?: number | string;
  /**
   * The CSS `height` property
   */
  h?: number | string;
  /**
   * The CSS `max-height` property
   */
  maxHeight?: number | string;
  /**
   * The CSS `max-height` property
   */
  maxH?: number | string;
  /**
   * The CSS `min-height` property
   */
  minHeight?: number | string;
  /**
   * The CSS `min-height` property
   */
  minH?: number | string;
  /**
   * The CSS `overflow` property
   */
  overflow?: 'visible' | 'hidden' | 'scroll';
}
