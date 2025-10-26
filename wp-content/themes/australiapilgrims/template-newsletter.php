<?php
/**
 * Template Name: Newsletter Style
 * Template Post Type: page
 *
 * Vintage newsletter style page template with cream background
 * and vintage typography styling.
 */
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php wp_head(); ?>
</head>
<body <?php body_class('newsletter-template'); ?>>
<?php wp_body_open(); ?>

<main id="main" class="site-content">
    <?php
    while ( have_posts() ) :
        the_post();
        ?>
        <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
            <?php the_content(); ?>
        </article>
        <?php
    endwhile;
    ?>
</main>

<?php wp_footer(); ?>
</body>
</html>
