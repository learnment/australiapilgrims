<?php
/**
 * Category Block Editor Support
 *
 * Adds Gutenberg block editor support to WordPress categories
 * and hides the default description field
 */

// Hide description field and add block editor meta box on edit screen
function ap_category_block_content_field($term, $taxonomy) {
    $content = get_term_meta($term->term_id, 'block_content', true);
    ?>
    <tr class="form-field term-block-content-wrap">
        <th scope="row">
            <label for="category-block-content"><?php _e('Content', 'australiapilgrims'); ?></label>
        </th>
        <td>
            <div id="category-block-editor-container">
                <div id="category-block-editor"></div>
            </div>
            <input type="hidden" id="category-block-content" name="category_block_content" value="<?php echo esc_attr($content); ?>">
            <p class="description"><?php _e('Use the block editor to create content for this category.', 'australiapilgrims'); ?></p>
        </td>
    </tr>
    <style>
        /* Hide the description field */
        .term-description-wrap {
            display: none !important;
        }

        /* Style the block editor container */
        #category-block-editor-container {
            background: #fff;
            border: 1px solid #ddd;
            border-radius: 4px;
            margin-bottom: 10px;
        }

        #category-block-editor {
            min-height: 400px;
        }

        /* Ensure block editor styles are applied correctly */
        #category-block-editor .block-editor-writing-flow {
            padding: 20px;
        }

        /* Fix block editor toolbar positioning */
        #category-block-editor .block-editor-block-list__layout {
            padding-top: 28px;
        }
    </style>
    <?php
}
add_action('category_edit_form_fields', 'ap_category_block_content_field', 10, 2);

// Hide description field on add category screen
function ap_hide_category_description_add() {
    ?>
    <style>
        /* Hide the description field on add category screen */
        .category-add-form .form-field.term-description-wrap {
            display: none !important;
        }
    </style>
    <?php
}
add_action('category_add_form', 'ap_hide_category_description_add');

// Save category block content
function ap_save_category_block_content($term_id) {
    if (isset($_POST['category_block_content'])) {
        $content = wp_kses_post($_POST['category_block_content']);
        update_term_meta($term_id, 'block_content', $content);
    }
}
add_action('created_category', 'ap_save_category_block_content');
add_action('edited_category', 'ap_save_category_block_content');

// Enqueue block editor scripts for category admin
function ap_enqueue_category_block_editor($hook) {
    if ('term.php' !== $hook) {
        return;
    }

    $screen = get_current_screen();
    if (!$screen || $screen->taxonomy !== 'category') {
        return;
    }

    // Get the term if editing
    $term_id = isset($_GET['tag_ID']) ? absint($_GET['tag_ID']) : 0;
    $content = $term_id ? get_term_meta($term_id, 'block_content', true) : '';

    // Enqueue WordPress block editor assets
    wp_enqueue_script('wp-blocks');
    wp_enqueue_script('wp-element');
    wp_enqueue_script('wp-editor');
    wp_enqueue_script('wp-components');
    wp_enqueue_script('wp-data');
    wp_enqueue_script('wp-plugins');
    wp_enqueue_script('wp-edit-post');
    wp_enqueue_script('wp-block-editor');
    wp_enqueue_script('wp-block-library');

    // Enqueue block editor styles
    wp_enqueue_style('wp-edit-blocks');
    wp_enqueue_style('wp-block-library');
    wp_enqueue_style('wp-block-library-theme');
    wp_enqueue_style('wp-edit-post');

    // Enqueue our custom script to initialize the block editor
    wp_enqueue_script(
        'category-block-editor',
        get_template_directory_uri() . '/dist/js/category-block-editor.js',
        array('wp-element', 'wp-blocks', 'wp-block-editor', 'wp-data', 'wp-components', 'wp-editor'),
        filemtime(get_template_directory() . '/dist/js/category-block-editor.js'),
        true
    );

    // Pass the initial content to the script
    wp_localize_script('category-block-editor', 'categoryBlockEditor', array(
        'initialContent' => $content,
        'termId' => $term_id
    ));
}
add_action('admin_enqueue_scripts', 'ap_enqueue_category_block_editor');

// Helper function to get category block content
function ap_get_category_block_content($term_id) {
    return get_term_meta($term_id, 'block_content', true);
}

// Helper function to render category block content
function ap_render_category_block_content($term_id) {
    $content = ap_get_category_block_content($term_id);
    if ($content) {
        // Parse and render blocks
        echo do_blocks($content);
    }
}
