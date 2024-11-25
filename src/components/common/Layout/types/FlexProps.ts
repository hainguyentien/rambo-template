export interface FlexboxProps {
	/**
	 * The CSS `align-items` property.
	 *
	 * It defines the `align-self` value on all direct children as a group.
	 *
	 * - In Flexbox, it controls the alignment of items on the Cross Axis.
	 * - In Grid Layout, it controls the alignment of items on the Block Axis within their grid area.
	 *
	 * @see [Mozilla Docs](https://developer.mozilla.org/docs/Web/CSS/align-items)
	 */
	alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
	/**
	 * The CSS `align-content` property.
	 *
	 * It defines the distribution of space between and around
	 * content items along a flexbox cross-axis or a grid's block axis.
	 *
	 * @see [Mozilla Docs](https://developer.mozilla.org/docs/Web/CSS/align-content)
	 */
	alignContent?:
		| 'flex-start'
		| 'flex-end'
		| 'center'
		| 'stretch'
		| 'space-between'
		| 'space-around';
	/**
	 * The CSS `justify-content` property.
	 *
	 * It defines how the browser distributes space between and around content items
	 * along the main-axis of a flex container, and the inline axis of a grid container.
	 *
	 * @see [Mozilla Docs](https://developer.mozilla.org/docs/Web/CSS/justify-content)
	 */
	justifyContent?:
		| 'flex-start'
		| 'flex-end'
		| 'center'
		| 'space-between'
		| 'space-around'
		| 'space-evenly';
	/**
	 * The CSS `flex-wrap` property.
	 *
	 * It defines whether flex items are forced onto one line or
	 * can wrap onto multiple lines. If wrapping is allowed,
	 * it sets the direction that lines are stacked.
	 *
	 * @see [Mozilla Docs](https://developer.mozilla.org/docs/Web/CSS/flex-wrap)
	 */
	flexWrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
	/**
	 * The CSS `flex-direction` property.
	 *
	 * It defines how flex items are placed in the flex container
	 * defining the main axis and the direction (normal or reversed).
	 *
	 * @see [Mozilla Docs](https://developer.mozilla.org/docs/Web/CSS/flex-direction)
	 */
	flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
	/**
	 * The CSS `flex` property.
	 *
	 * It defines how a flex item will grow or shrink
	 * to fit the space available in its flex container.
	 *
	 * @see [Mozilla Docs](https://developer.mozilla.org/docs/Web/CSS/flex)
	 */
	flex?: number;

	flexBasis?: number | string;
	/**
	 * The CSS `gap` property.
	 *
	 * It defines the gap between items in both flex and
	 * grid contexts.
	 *
	 * @see [Mozilla Docs](https://developer.mozilla.org/docs/Web/CSS/gap)
	 */

	alignSelf?:
		| 'auto'
		| 'flex-start'
		| 'flex-end'
		| 'center'
		| 'stretch'
		| 'baseline';

	flexGrow?: number;
	/**
	 * The CSS `flex-shrink` property.
	 *
	 * It defines how much a flexbox item should shrink
	 * if there's not enough space available.
	 *
	 * @see [Mozilla Docs](https://developer.mozilla.org/docs/Web/CSS/flex-shrink)
	 */
	flexShrink?: number;
	/**
	 * The CSS `row-gap` property
	 */
	rowGap?: number | undefined;
	/**
	 * The CSS `gap` property
	 */
	gap?: number | undefined;
	/**
	 * The CSS `column-gap` property
	 */
	columnGap?: number | undefined;
}
