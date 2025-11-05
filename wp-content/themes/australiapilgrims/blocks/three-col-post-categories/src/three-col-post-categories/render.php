<?php
/**
 * Render callback for the Three Column Featured Items block
 *
 * @param array    $attributes Block attributes.
 * @param string   $content    Block default content.
 * @param WP_Block $block      Block instance.
 * @return string Returns the block markup.
 */

$items = isset($attributes['items']) ? $attributes['items'] : array();

if (empty($items)) {
	return '';
}

// Get block wrapper attributes
$wrapper_attributes = get_block_wrapper_attributes(array(
	'class' => 'three-col-post-categories',
));
?>

<div <?php echo $wrapper_attributes; ?>>
	<div class="three-col-post-categories__grid">
		<?php
		$column = 1;
		?>
		<?php foreach ($items as $item) :
			$title = isset($item['title']) ? $item['title'] : '';
			$background_url = isset($item['backgroundUrl']) ? $item['backgroundUrl'] : '';
			$url = isset($item['url']) ? $item['url'] : '';

			$column_class = 'three-col-post-categories__item--column-one';
			switch ($column) {
				case 2:
					$column_class = 'three-col-post-categories__item--column-two';
					break;
				case 3:
					$column_class = 'three-col-post-categories__item--column-three';
					break;
			}
			$column++;

			// Skip items without a title or URL
			if (empty($title) || empty($url)) {
				continue;
			}
			?>
			<a href="<?php echo esc_url($url); ?>" class="three-col-post-categories__item">
				<?php if ($background_url) : ?>
					<div class="three-col-post-categories__image" style="background-image: url('<?php echo esc_url($background_url); ?>');"></div>
				<?php else : ?>
					<div class="three-col-post-categories__image three-col-post-categories__image--placeholder"></div>
				<?php endif; ?>
				<div class="three-col-post-categories__content">
					<h2 class="three-col-post-categories__title"><?php echo esc_html($title); ?></h2>
				</div>
			</a>
		<?php endforeach; ?>
	</div>
</div>
