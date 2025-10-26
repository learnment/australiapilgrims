/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";

/**
 * Generate srcset string from WordPress image sizes
 *
 * @param {Object} sizes - WordPress image sizes object
 * @param {string} fullUrl - Full size image URL
 * @param {number} fullWidth - Full size image width
 * @return {string} srcset string
 */
function generateSrcset(sizes, fullUrl, fullWidth) {
	if (!sizes || Object.keys(sizes).length === 0) {
		return "";
	}

	const srcsetArray = [];

	// Add all available sizes
	Object.values(sizes).forEach((size) => {
		if (size.url && size.width) {
			srcsetArray.push(`${size.url} ${size.width}w`);
		}
	});

	// Add full size if not already included
	if (fullUrl && fullWidth && !srcsetArray.some((s) => s.includes(fullUrl))) {
		srcsetArray.push(`${fullUrl} ${fullWidth}w`);
	}

	return srcsetArray.join(", ");
}

/**
 * Generate sizes attribute for responsive images
 *
 * @return {string} sizes attribute value
 */
function generateSizesAttr() {
	return "(max-width: 768px) 100vw, 50vw";
}

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @param {Object} props - Block props.
 * @return {Element} Element to render.
 */
export default function save({ attributes }) {
	const { image, imageClasses, imagePosition } = attributes;

	const blockProps = useBlockProps.save({
		className: `two-col-image-content two-col-image-content--${imagePosition}`,
	});

	// Generate srcset and sizes
	const srcset = generateSrcset(image.sizes, image.url, image.width);
	const sizes = generateSizesAttr();

	// Combine image classes
	const imgClassName = imageClasses ? imageClasses.trim() : "";

	return (
		<div {...blockProps}>
			<div className="two-col-image-content__image">
				{image.url && (
					<img
						src={image.url}
						alt={image.alt}
						width={image.width || undefined}
						height={image.height || undefined}
						loading="lazy"
						srcSet={srcset || undefined}
						sizes={srcset ? sizes : undefined}
						className={imgClassName || undefined}
					/>
				)}
			</div>
			<div className="two-col-image-content__content">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
