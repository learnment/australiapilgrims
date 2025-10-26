<?php
/**
 * Category Archive Template
 * Displays category block content and posts
 */
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<main id="main" class="site-content">
    <?php
    // Get the current category
    $category = get_queried_object();

    // Display category block content if it exists
    if ($category && isset($category->term_id)) {
        $block_content = ap_get_category_block_content($category->term_id);

        if ($block_content) {
            echo '<div class="category-block-content">';
            ap_render_category_block_content($category->term_id);
            echo '</div>';
        }
    }

    // Display posts
    if ( have_posts() ) :
        echo '<div class="category-posts">';
        while ( have_posts() ) :
            the_post();
            ?>
            <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                <?php the_content(); ?>
            </article>
            <?php
        endwhile;
        echo '</div>';
    endif;
    ?>
</main>

<?php wp_footer(); ?>
</body>
</html>
