/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	useBlockProps,
	InnerBlocks,
	useInnerBlocksProps,
} from "@wordpress/block-editor";
import { useSelect, useDispatch } from "@wordpress/data";
import { useEffect, useRef } from "@wordpress/element";
import { View } from "@wordpress/primitives";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

const TEMPLATE = [
	["australiapilgrims/three-column-item"],
	["australiapilgrims/three-column-item"],
	["australiapilgrims/three-column-item"],
];

const ALLOWED_BLOCKS = ["australiapilgrims/three-column-item"];

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes, clientId }) {
	const { leftColumnWidth } = attributes;
	const blockProps = useBlockProps();
	const leftColumnRef = useRef(null);
	const resizeObserverRef = useRef(null);

	const innerBlocksProps = useInnerBlocksProps(
		{ className: "block-australiapilgrims-three-column__inner-container" },
		{
			templateLock: "insert",
			allowedBlocks: ALLOWED_BLOCKS,
			template: TEMPLATE,
		},
	);

	// Get inner blocks
	const { innerBlocks } = useSelect(
		(select) => ({
			innerBlocks: select("core/block-editor").getBlocks(clientId),
		}),
		[clientId],
	);

	const { updateBlockAttributes } = useDispatch("core/block-editor");

	// Monitor left column width and update the third column
	useEffect(() => {
		// Find the left column element (first child)
		const container = document.querySelector(
			`[data-block="${clientId}"] .block-australiapilgrims-three-column__inner-container`,
		);
		if (!container) return;

		const leftColumnElement = container.querySelector(
			".wp-block-australiapilgrims-three-column-item:nth-child(1)",
		);
		if (!leftColumnElement) return;

		leftColumnRef.current = leftColumnElement;

		// Create resize observer
		resizeObserverRef.current = new ResizeObserver((entries) => {
			for (const entry of entries) {
				const width = `${entry.contentRect.width}px`;

				// Update the block attribute
				if (width !== leftColumnWidth) {
					setAttributes({ leftColumnWidth: width });
				}

				// Apply width to the third column if it exists
				if (innerBlocks.length >= 3) {
					updateBlockAttributes(innerBlocks[2].clientId, {
						width: width,
					});
				}
			}
		});

		// Start observing
		resizeObserverRef.current.observe(leftColumnElement);

		// Cleanup
		return () => {
			if (resizeObserverRef.current) {
				resizeObserverRef.current.disconnect();
			}
		};
	}, [clientId, innerBlocks, leftColumnWidth, setAttributes, updateBlockAttributes]);

	return (
		<div {...blockProps}>
			<div {...innerBlocksProps}>{innerBlocksProps.children}</div>
		</div>
	);
}
