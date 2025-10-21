/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';

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
export default function save( { attributes } ) {
	const {
		backgroundImage,
		heading,
		tagline,
		description,
		buttonText,
		buttonUrl,
		buttonTarget,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'hero-banner',
		style: {
			backgroundImage: backgroundImage.url
				? `url(${ backgroundImage.url })`
				: 'none',
		},
	} );

	return (
		<div { ...blockProps }>
			<div className="hero-banner__overlay">
				<div className="hero-banner__content">
					{ tagline && (
						<RichText.Content
							tagName="p"
							className="hero-banner__tagline"
							value={ tagline }
						/>
					) }

					{ heading && (
						<RichText.Content
							tagName="h1"
							className="hero-banner__heading"
							value={ heading }
						/>
					) }

					{ description && (
						<RichText.Content
							tagName="p"
							className="hero-banner__description"
							value={ description }
						/>
					) }

					{ buttonText && buttonUrl && (
						<div className="hero-banner__button-wrapper">
							<a
								href={ buttonUrl }
								className="hero-banner__button"
								target={ buttonTarget ? '_blank' : '_self' }
								rel={
									buttonTarget
										? 'noopener noreferrer'
										: undefined
								}
							>
								{ buttonText }
							</a>
						</div>
					) }
				</div>
			</div>
		</div>
	);
}
