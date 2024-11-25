export interface PositionProps {
	/**
	 * The CSS `z-index` property
	 */
	zIndex?: number;
	/**
	 * The CSS `top` property
	 */
	top?: number;
	/**
	 * The CSS `right` property
	 */
	right?: number;
	/**
	 * The CSS `bottom` property
	 */
	bottom?: number;
	/**
	 * The CSS `left` property
	 */
	left?: number;
	/**
	 * The CSS `left`, `right`, `top`, `bottom` property
	 */
	inset?: number;
	/**
	 * The CSS `left`, and `right` property
	 */
	insetX?: number;
	/**
	 * The CSS `top`, and `bottom` property
	 */
	insetY?: number;
	/**
	 * The CSS `position` property
	 */
	pos?: 'absolute' | 'relative';
	/**
	 * The CSS `position` property
	 */
	position?: 'absolute' | 'relative';
}
