/**
 * Word-style text highlight for the block editor.
 *
 * Select text, click the highlighter in the block toolbar, pick a colour.
 * Saves as <mark class="ap-highlight-{colour}">, styled in src/scss/main.scss.
 */
/** @jsx createElement */
import { createElement } from '@wordpress/element';
import { registerFormatType, applyFormat, removeFormat } from '@wordpress/rich-text';
import { BlockControls } from '@wordpress/block-editor';
import { ToolbarGroup, ToolbarDropdownMenu, SVG, Path } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const COLOURS = [
	{ slug: 'yellow', label: __( 'Yellow', 'australiapilgrims' ), hex: '#ffff00' },
	{ slug: 'green', label: __( 'Green', 'australiapilgrims' ), hex: '#00ff00' },
];
const formatName = ( slug ) => `australiapilgrims/highlight-${ slug }`;
const ALL_FORMATS = COLOURS.map( ( c ) => formatName( c.slug ) );

const swatch = ( hex ) => (
	<SVG width="24" height="24" viewBox="0 0 24 24">
		<Path d="M4 4h16v16H4z" fill={ hex } stroke="#1e1e1e" />
	</SVG>
);

const highlighterIcon = ( hex ) => (
	<SVG width="24" height="24" viewBox="0 0 24 24">
		<Path d="M15.2 3.3 20.7 8.8 11 18.5H5.5v-5.5z" fill="none" stroke="currentColor" strokeWidth="1.5" />
		<Path d="M3 20h18v2H3z" fill={ hex || 'currentColor' } />
	</SVG>
);

const removeAll = ( value ) => ALL_FORMATS.reduce( ( v, name ) => removeFormat( v, name ), value );

// Only one format renders the toolbar; the others just need to exist so the markup is recognised.
function HighlightEdit( { value, onChange } ) {
	const active = COLOURS.find( ( c ) => value.activeFormats?.some( ( f ) => f.type === formatName( c.slug ) ) );

	return (
		<BlockControls group="inline">
			<ToolbarGroup>
				<ToolbarDropdownMenu
					icon={ highlighterIcon( active?.hex ) }
					label={ __( 'Highlight', 'australiapilgrims' ) }
					controls={ [
						...COLOURS.map( ( c ) => ( {
							title: c.label,
							icon: swatch( c.hex ),
							isActive: active?.slug === c.slug,
							onClick: () => onChange( applyFormat( removeAll( value ), { type: formatName( c.slug ) } ) ),
						} ) ),
						{
							title: __( 'No highlight', 'australiapilgrims' ),
							icon: swatch( 'transparent' ),
							onClick: () => onChange( removeAll( value ) ),
						},
					] }
				/>
			</ToolbarGroup>
		</BlockControls>
	);
}

COLOURS.forEach( ( c, i ) =>
	registerFormatType( formatName( c.slug ), {
		title: c.label,
		tagName: 'mark',
		className: `ap-highlight-${ c.slug }`,
		edit: i === 0 ? HighlightEdit : () => null,
	} )
);
