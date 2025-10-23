<?php
/**
 * Render callback for the Three Column Post Categories block
 *
 * @param array    $attributes Block attributes.
 * @param string   $content    Block default content.
 * @param WP_Block $block      Block instance.
 * @return string Returns the block markup.
 */

// Get top 3 categories by post count
$categories = get_categories(array(
	'number'     => 3,
	'hide_empty' => false,
));

if (empty($categories)) {
	echo '<div class="wp-block-australiapilgrims-three-col-post-categories"><p>No categories found.</p></div>';
	return;
}

// Get block wrapper attributes
$wrapper_attributes = get_block_wrapper_attributes(array(
	'class' => 'three-col-post-categories',
));
?>

<div <?php echo $wrapper_attributes; ?>>
	<div class="three-col-post-categories__grid">
		<?php foreach ($categories as $category) :
			$category_link = get_category_link($category->term_id);
			$thumbnail_url = ap_get_category_thumbnail_url($category->term_id, 'large');
			?>
			<a href="<?php echo esc_url($category_link); ?>" class="three-col-post-categories__item">
				<?php if ($thumbnail_url) : ?>
					<div class="three-col-post-categories__image" style="background-image: url('<?php echo esc_url($thumbnail_url); ?>');"></div>
				<?php else : ?>
					<div class="three-col-post-categories__image three-col-post-categories__image--placeholder"></div>
				<?php endif; ?>
				<div class="three-col-post-categories__content">
					<h3 class="three-col-post-categories__title"><?php echo esc_html($category->name); ?></h3>
					<span class="three-col-post-categories__count"><?php echo esc_html($category->count); ?> <?php echo _n('post', 'posts', $category->count, 'three-col-post-categories'); ?></span>
				</div>
			</a>
		<?php endforeach; ?>
	</div>
</div>
