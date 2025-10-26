/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	useBlockProps,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	InnerBlocks,
} from '@wordpress/block-editor';

/**
 * WordPress components for the sidebar controls.
 */
import { PanelBody, Button, ToggleControl, TextControl } from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object} props - Block props.
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const { image, imageClasses, imagePosition } = attributes;

	const blockProps = useBlockProps({
		className: `two-col-image-content two-col-image-content--${imagePosition}`,
	});

	const onSelectImage = (media) => {
		setAttributes({
			image: {
				id: media.id,
				url: media.url,
				alt: media.alt || '',
				width: media.width || 0,
				height: media.height || 0,
				sizes: media.sizes || {},
			},
		});
	};

	const removeImage = () => {
		setAttributes({
			image: {
				id: 0,
				url: '',
				alt: '',
				width: 0,
				height: 0,
				sizes: {},
			},
		});
	};

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__('Image Settings', 'two-col-image-content')}
					initialOpen={true}
				>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={onSelectImage}
							allowedTypes={['image']}
							value={image.id}
							render={({ open }) => (
								<div>
									{image.url ? (
										<div>
											<img
												src={image.url}
												alt={image.alt}
												style={{
													width: '100%',
													marginBottom: '10px',
												}}
											/>
											<Button
												onClick={removeImage}
												isDestructive
												variant="secondary"
											>
												{__('Remove Image', 'two-col-image-content')}
											</Button>
										</div>
									) : (
										<Button onClick={open} variant="primary">
											{__('Select Image', 'two-col-image-content')}
										</Button>
									)}
								</div>
							)}
						/>
					</MediaUploadCheck>
					<TextControl
						label={__('Image CSS Classes', 'two-col-image-content')}
						value={imageClasses}
						onChange={(value) => setAttributes({ imageClasses: value })}
						help={__('Add custom CSS classes to the image (e.g., vintage-image-strong)', 'two-col-image-content')}
					/>
				</PanelBody>
				<PanelBody
					title={__('Layout Settings', 'two-col-image-content')}
					initialOpen={false}
				>
					<ToggleControl
						label={__('Image on Right', 'two-col-image-content')}
						checked={imagePosition === 'right'}
						onChange={(value) =>
							setAttributes({
								imagePosition: value ? 'right' : 'left',
							})
						}
						help={
							imagePosition === 'right'
								? __('Image is positioned on the right', 'two-col-image-content')
								: __('Image is positioned on the left', 'two-col-image-content')
						}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="two-col-image-content__image">
					{image.url ? (
						<img src={image.url} alt={image.alt} />
					) : (
						<div className="two-col-image-content__placeholder">
							{__('Select an image', 'two-col-image-content')}
						</div>
					)}
				</div>
				<div className="two-col-image-content__content">
					<InnerBlocks
						template={[
							['core/heading', { level: 3, placeholder: 'Enter heading...' }],
							['core/paragraph', { placeholder: 'Enter content...' }],
						]}
					/>
				</div>
			</div>
		</>
	);
}
