<?php
/**
 * Australia Pilgrims Theme Functions
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly
}

/**
 * Theme Setup
 */
function australiapilgrims_setup() {
    // Add theme support for Block Editor
    add_theme_support( 'wp-block-styles' );
    add_theme_support( 'editor-styles' );
    add_theme_support( 'align-wide' );
    add_theme_support( 'responsive-embeds' );

    // Add support for full and wide align images
    add_theme_support( 'align-full' );

    // Add support for custom line height
    add_theme_support( 'custom-line-height' );

    // Add support for custom units
    add_theme_support( 'custom-units' );

    // Add support for custom spacing
    add_theme_support( 'custom-spacing' );

    // Add support for block color palettes
    add_theme_support( 'editor-color-palette' );
    add_theme_support( 'disable-custom-colors' );

    // Add support for block font sizes
    add_theme_support( 'editor-font-sizes' );
    add_theme_support( 'disable-custom-font-sizes' );

    // Add title tag support
    add_theme_support( 'title-tag' );

    // Add HTML5 support
    add_theme_support( 'html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script'
    ) );

    // Add post thumbnails support
    add_theme_support( 'post-thumbnails' );
}
add_action( 'after_setup_theme', 'australiapilgrims_setup' );

/**
 * Enqueue styles and scripts
 */
function australiapilgrims_assets() {
    // Theme stylesheet (required for WordPress)
    wp_enqueue_style(
        'australiapilgrims-style',
        get_stylesheet_uri(),
        array(),
        wp_get_theme()->get( 'Version' )
    );

    // Compiled CSS from webpack
    wp_enqueue_style(
        'australiapilgrims-main',
        get_template_directory_uri() . '/dist/css/styles.css',
        array(),
        filemtime( get_template_directory() . '/dist/css/styles.css' )
    );

    // Compiled JS from webpack
    wp_enqueue_script(
        'australiapilgrims-main',
        get_template_directory_uri() . '/dist/js/main.js',
        array(),
        filemtime( get_template_directory() . '/dist/js/main.js' ),
        true
    );
}
add_action( 'wp_enqueue_scripts', 'australiapilgrims_assets' );

/**
 * Enqueue block editor styles
 */
function australiapilgrims_editor_styles() {
    wp_enqueue_style(
        'australiapilgrims-editor-style',
        get_template_directory_uri() . '/dist/css/styles.css',
        array(),
        filemtime( get_template_directory() . '/dist/css/styles.css' )
    );
}
add_action( 'enqueue_block_editor_assets', 'australiapilgrims_editor_styles' );

/**
 * Register custom blocks
 */
require_once __DIR__ . '/blocks/hero-banner/hero-banner.php';
