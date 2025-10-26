<?php
/**
 * Render callback for the Alternating Post List block
 *
 * @param array    $attributes Block attributes.
 * @param string   $content    Block default content.
 * @param WP_Block $block      Block instance.
 * @return string Returns the block markup.
 */

$selected_posts = isset($attributes['selectedPosts']) ? $attributes['selectedPosts'] : array();

if (empty($selected_posts)) {
	return '';
}

// Extract post IDs
$post_ids = array_map(function($post) {
	return isset($post['id']) ? $post['id'] : 0;
}, $selected_posts);

// Filter out invalid IDs
$post_ids = array_filter($post_ids);

if (empty($post_ids)) {
	return '';
}

// Query for the selected posts
$query_args = array(
	'post_type'      => 'post',
	'post__in'       => $post_ids,
	'orderby'        => 'post__in',
	'posts_per_page' => count($post_ids),
);

$query = new WP_Query($query_args);

if (!$query->have_posts()) {
	wp_reset_postdata();
	return '';
}

// Get block wrapper attributes
$wrapper_attributes = get_block_wrapper_attributes(array(
	'class' => 'alternating-post-list',
));
?>

<div <?php echo $wrapper_attributes; ?>>
	<div class="alternating-post-list__items">
		<?php
		$index = 0;
		while ($query->have_posts()) :
			$query->the_post();
			$is_even = $index % 2 === 0;
			$image_class = $is_even ? 'alternating-post-list__item--image-left' : 'alternating-post-list__item--image-right';
			?>
			<article class="alternating-post-list__item <?php echo esc_attr($image_class); ?>">
				<?php if (has_post_thumbnail()) : ?>
					<div class="alternating-post-list__image">
						<a href="<?php the_permalink(); ?>">
							<?php the_post_thumbnail('medium'); ?>
						</a>
					</div>
				<?php endif; ?>
				<div class="alternating-post-list__content">
					<h3 class="alternating-post-list__title">
						<a href="<?php the_permalink(); ?>">
							<?php the_title(); ?>
						</a>
					</h3>
					<div class="alternating-post-list__excerpt">
						<?php the_excerpt(); ?>
					</div>
					<a href="<?php the_permalink(); ?>" class="alternating-post-list__read-more">
						<?php echo esc_html__('Read More', 'alternating-post-list'); ?>
					</a>
				</div>
			</article>
			<?php
			$index++;
		endwhile;
		wp_reset_postdata();
		?>
	</div>
</div>
