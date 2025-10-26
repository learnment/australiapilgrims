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
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { useSelect } from '@wordpress/data';

/**
 * 10up Block Components
 */
import { ContentPicker } from '@10up/block-components';

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
export default function Edit({ attributes, setAttributes }) {
	const { selectedPosts } = attributes;

	const blockProps = useBlockProps({
		className: 'alternating-post-list',
	});

	// Fetch full post data for selected posts
	const posts = useSelect(
		(select) => {
			if (!selectedPosts || selectedPosts.length === 0) {
				return [];
			}

			const { getEntityRecords } = select('core');
			return getEntityRecords('postType', 'post', {
				include: selectedPosts.map((post) => post.id),
				per_page: selectedPosts.length,
			});
		},
		[selectedPosts]
	);

	const handlePostSelection = (newPosts) => {
		setAttributes({
			selectedPosts: newPosts.map((post) => ({
				id: post.id,
			})),
		});
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Post Selection', 'alternating-post-list')}>
					<ContentPicker
						onPickChange={handlePostSelection}
						mode="post"
						label={__('Select Posts', 'alternating-post-list')}
						contentTypes={['post']}
						content={selectedPosts}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				{!posts || posts.length === 0 ? (
					<div className="alternating-post-list__placeholder">
						<p>
							{__(
								'Select posts using the sidebar to display them in an alternating layout.',
								'alternating-post-list'
							)}
						</p>
					</div>
				) : (
					<div className="alternating-post-list__items">
						{posts.map((post, index) => {
							const isEven = index % 2 === 0;

							return (
								<div
									key={post.id}
									className={`alternating-post-list__item ${
										isEven
											? 'alternating-post-list__item--image-left'
											: 'alternating-post-list__item--image-right'
									}`}
								>
									{post.featured_media && (
										<div className="alternating-post-list__image">
											<img
												src={post.featured_media}
												alt={post.title.rendered}
											/>
										</div>
									)}
									<div className="alternating-post-list__content">
										<h3
											className="alternating-post-list__title"
											dangerouslySetInnerHTML={{ __html: post.title.rendered }}
										/>
										<div
											className="alternating-post-list__excerpt"
											dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
										/>
									</div>
								</div>
							);
						})}
					</div>
				)}
			</div>
		</>
	);
}
