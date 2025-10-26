/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from "@wordpress/blocks";

import classNames from "classnames";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./style.scss";

/**
 * Internal dependencies
 */
import Edit from "./edit";
import save from "./save";
import metadata from "./block.json";

import { registerBlockExtension } from "@10up/block-components";
import ImageExtensionsEdit from "./image-extensions/edit";

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType(metadata.name, {
	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save,
});

registerBlockExtension("core/image", {
	extensionName: "image-extensions",
	attributes: {
		vintageFilter: {
			type: "string",
			default: "none",
		},
		hasBorders: {
			type: "boolean",
			default: false,
		},
	},
	classNameGenerator: (attributes) => {
		const { vintageFilter, hasBorders } = attributes;
		const additionalClassNames = classNames({
			[vintageFilter]: vintageFilter !== "none",
			"has-borders": hasBorders,
		});

		return additionalClassNames;
	},
	Edit: ImageExtensionsEdit,
});
