<?php
/**
 * Category Thumbnail Support
 *
 * Adds thumbnail image support to WordPress categories
 */

// Add custom field for category thumbnail
function ap_add_category_thumbnail_field($taxonomy) {
    ?>
    <div class="form-field term-thumbnail-wrap">
        <label for="category-thumbnail"><?php _e('Thumbnail', 'australiapilgrims'); ?></label>
        <div id="category-thumbnail-preview" style="margin-bottom: 10px;"></div>
        <input type="button" class="button button-secondary" id="category-thumbnail-upload" value="<?php _e('Upload Thumbnail', 'australiapilgrims'); ?>" />
        <input type="button" class="button button-secondary" id="category-thumbnail-remove" value="<?php _e('Remove Thumbnail', 'australiapilgrims'); ?>" style="display: none;" />
        <input type="hidden" id="category-thumbnail-id" name="category_thumbnail_id" value="">
        <p class="description"><?php _e('Upload a thumbnail image for this category.', 'australiapilgrims'); ?></p>
    </div>
    <?php
}
add_action('category_add_form_fields', 'ap_add_category_thumbnail_field');

// Edit category thumbnail field
function ap_edit_category_thumbnail_field($term, $taxonomy) {
    $thumbnail_id = get_term_meta($term->term_id, 'thumbnail_id', true);
    $thumbnail_url = $thumbnail_id ? wp_get_attachment_image_url($thumbnail_id, 'medium') : '';
    ?>
    <tr class="form-field term-thumbnail-wrap">
        <th scope="row">
            <label for="category-thumbnail"><?php _e('Thumbnail', 'australiapilgrims'); ?></label>
        </th>
        <td>
            <div id="category-thumbnail-preview" style="margin-bottom: 10px;">
                <?php if ($thumbnail_url): ?>
                    <img src="<?php echo esc_url($thumbnail_url); ?>" style="max-width: 200px; height: auto; display: block;" />
                <?php endif; ?>
            </div>
            <input type="button" class="button button-secondary" id="category-thumbnail-upload" value="<?php _e('Upload Thumbnail', 'australiapilgrims'); ?>" />
            <input type="button" class="button button-secondary" id="category-thumbnail-remove" value="<?php _e('Remove Thumbnail', 'australiapilgrims'); ?>" style="<?php echo $thumbnail_id ? '' : 'display: none;'; ?>" />
            <input type="hidden" id="category-thumbnail-id" name="category_thumbnail_id" value="<?php echo esc_attr($thumbnail_id); ?>">
            <p class="description"><?php _e('Upload a thumbnail image for this category.', 'australiapilgrims'); ?></p>
        </td>
    </tr>
    <?php
}
add_action('category_edit_form_fields', 'ap_edit_category_thumbnail_field', 10, 2);

// Save category thumbnail
function ap_save_category_thumbnail($term_id) {
    if (isset($_POST['category_thumbnail_id'])) {
        $thumbnail_id = absint($_POST['category_thumbnail_id']);
        if ($thumbnail_id > 0) {
            update_term_meta($term_id, 'thumbnail_id', $thumbnail_id);
        } else {
            delete_term_meta($term_id, 'thumbnail_id');
        }
    }
}
add_action('created_category', 'ap_save_category_thumbnail');
add_action('edited_category', 'ap_save_category_thumbnail');

// Enqueue media uploader scripts for category admin
function ap_enqueue_category_thumbnail_scripts($hook) {
    if ('edit-tags.php' !== $hook && 'term.php' !== $hook) {
        return;
    }

    $screen = get_current_screen();
    if (!$screen || $screen->taxonomy !== 'category') {
        return;
    }

    wp_enqueue_media();
    wp_enqueue_script(
        'category-thumbnail',
        get_template_directory_uri() . '/dist/js/category-thumbnail.js',
        array('jquery'),
        filemtime(get_template_directory() . '/dist/js/category-thumbnail.js'),
        true
    );
}
add_action('admin_enqueue_scripts', 'ap_enqueue_category_thumbnail_scripts');

// Helper function to get category thumbnail URL
function ap_get_category_thumbnail_url($term_id, $size = 'medium') {
    $thumbnail_id = get_term_meta($term_id, 'thumbnail_id', true);
    if ($thumbnail_id) {
        return wp_get_attachment_image_url($thumbnail_id, $size);
    }
    return false;
}
