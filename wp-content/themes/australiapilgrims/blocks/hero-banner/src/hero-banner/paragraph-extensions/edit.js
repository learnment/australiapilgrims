import { __ } from "@wordpress/i18n";
import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, RadioControl, ToggleControl } from "@wordpress/components";

function ParagraphExtensionsEdit({ attributes, setAttributes }) {
	const { verticallyAligned } = attributes;

	return (
		<InspectorControls>
			<PanelBody title={__("Extra Styles", "hero-banner")}>
				<ToggleControl
					checked={verticallyAligned}
					label="Vertically aligned?"
					onChange={(value) =>
						setAttributes({
							verticallyAligned: value,
						})
					}
				/>
			</PanelBody>
		</InspectorControls>
	);
}

export default ParagraphExtensionsEdit;
