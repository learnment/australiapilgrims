import { __ } from "@wordpress/i18n";
import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, RadioControl, ToggleControl } from "@wordpress/components";

function ImageExtensionsEdit({ attributes, setAttributes }) {
	const { vintageFilter, hasBorders } = attributes;

	return (
		<InspectorControls>
			<PanelBody title={__("Extra Styles", "hero-banner")}>
				<RadioControl
					label="Vintage filter"
					onChange={(value) => {
						setAttributes({
							vintageFilter: value,
						});
					}}
					options={[
						{
							label: "None",
							value: "none",
						},
						{
							label: "Subtle",
							value: "vintage-filter-subtle",
						},
						{
							label: "Normal",
							value: "vintage-filter",
						},
						{
							label: "Strong",
							value: "vintage-filter-strong",
						},
					]}
					selected={vintageFilter}
				/>

				<ToggleControl
					checked={hasBorders}
					label="Has borders?"
					onChange={(value) =>
						setAttributes({
							hasBorders: value,
						})
					}
				/>
			</PanelBody>
		</InspectorControls>
	);
}

export default ImageExtensionsEdit;
