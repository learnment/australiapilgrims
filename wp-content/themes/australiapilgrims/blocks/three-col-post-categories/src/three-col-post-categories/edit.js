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
import { useBlockProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { Spinner } from '@wordpress/components';

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
 * @return {Element} Element to render.
 */
export default function Edit() {
	const blockProps = useBlockProps({
		className: 'three-col-post-categories',
	});

	const { categories, isResolving } = useSelect((select) => {
		const { getEntityRecords, isResolving: checkResolving } = select('core');
		return {
			categories: getEntityRecords('taxonomy', 'category', {
				orderby: 'count',
				order: 'desc',
				per_page: 3,
			}),
			isResolving: checkResolving('getEntityRecords', [
				'taxonomy',
				'category',
				{ orderby: 'count', order: 'desc', per_page: 3 },
			]),
		};
	}, []);

	if (isResolving) {
		return (
			<div {...blockProps}>
				<div style={{ textAlign: 'center', padding: '2rem' }}>
					<Spinner />
				</div>
			</div>
		);
	}

	if (!categories || categories.length === 0) {
		return (
			<div {...blockProps}>
				<p>{__('No categories found.', 'three-col-post-categories')}</p>
			</div>
		);
	}

	return (
		<div {...blockProps}>
			<div className="three-col-post-categories__grid">
				{categories.map((category) => (
					<div key={category.id} className="three-col-post-categories__item">
						<div className="three-col-post-categories__image three-col-post-categories__image--placeholder">
							<span className="three-col-post-categories__placeholder-text">
								{__('Category Thumbnail', 'three-col-post-categories')}
							</span>
						</div>
						<div className="three-col-post-categories__content">
							<h3 className="three-col-post-categories__title">
								{category.name}
							</h3>
							<span className="three-col-post-categories__count">
								{category.count}{' '}
								{category.count === 1
									? __('post', 'three-col-post-categories')
									: __('posts', 'three-col-post-categories')}
							</span>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
