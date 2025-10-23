/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

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
	RichText,
} from "@wordpress/block-editor";

/**
 * WordPress components for the sidebar controls.
 */
import { PanelBody, Button } from "@wordpress/components";

/**
 * 10up Block Components
 */
import { Link } from "@10up/block-components";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

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
	const {
		backgroundImage,
		heading,
		tagline,
		description,
		buttonText,
		buttonUrl,
		buttonTarget,
	} = attributes;

	// Convert buttonTarget boolean to string format for Link component
	const target = buttonTarget ? "_blank" : undefined;

	const blockProps = useBlockProps({
		className: "hero-banner",
		style: {
			backgroundImage: backgroundImage.url
				? `url(${backgroundImage.url})`
				: "none",
		},
	});

	const onSelectImage = (media) => {
		setAttributes({
			backgroundImage: {
				id: media.id,
				url: media.url,
				alt: media.alt || "",
			},
		});
	};

	const removeImage = () => {
		setAttributes({
			backgroundImage: {
				id: 0,
				url: "",
				alt: "",
			},
		});
	};

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__("Background Settings", "hero-banner")}
					initialOpen={true}
				>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={onSelectImage}
							allowedTypes={["image"]}
							value={backgroundImage.id}
							render={({ open }) => (
								<div>
									{backgroundImage.url ? (
										<div>
											<img
												src={backgroundImage.url}
												alt={backgroundImage.alt}
												style={{
													width: "100%",
													marginBottom: "10px",
												}}
											/>
											<Button
												onClick={removeImage}
												isDestructive
												variant="secondary"
											>
												{__("Remove Image", "hero-banner")}
											</Button>
										</div>
									) : (
										<Button onClick={open} variant="primary">
											{__("Select Background Image", "hero-banner")}
										</Button>
									)}
								</div>
							)}
						/>
					</MediaUploadCheck>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="hero-banner__overlay">
					<div className="hero-banner__content">
						<RichText
							tagName="p"
							className="hero-banner__tagline"
							value={tagline}
							onChange={(value) => setAttributes({ tagline: value })}
							placeholder={__("Enter tagline...", "hero-banner")}
						/>

						<RichText
							tagName="h1"
							className="hero-banner__heading"
							value={heading}
							onChange={(value) => setAttributes({ heading: value })}
							placeholder={__("Enter heading...", "hero-banner")}
						/>

						<RichText
							tagName="p"
							className="hero-banner__description"
							value={description}
							onChange={(value) => setAttributes({ description: value })}
							placeholder={__("Enter description...", "hero-banner")}
						/>

						<div className="hero-banner__button-wrapper">
							<Link
								className="hero-banner__button"
								value={buttonText}
								opensInNewTab={buttonTarget}
								url={buttonUrl}
								onTextChange={(value) =>
									setAttributes({
										buttonText: value,
									})
								}
								onLinkChange={(value) =>
									setAttributes({
										buttonUrl: value?.url,
										buttonTarget: value?.opensInNewTab || false,
										buttonText: value?.title || buttonText,
									})
								}
								onLinkRemove={() =>
									setAttributes({
										buttonUrl: "",
									})
								}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
