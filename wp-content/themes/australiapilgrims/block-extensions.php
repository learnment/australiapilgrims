<?php
add_action('enqueue_block_editor_assets', 'block_builder_enqueue_block_editor_scripts');

function block_builder_enqueue_block_editor_scripts()
{
    $extensions_asset_file = include __DIR__ . '/blocks/block-extensions/build/extensions.asset.php';

    wp_enqueue_script(
        'block-builder-extensions',
        __DIR__ . 'build/extensions.js',
        $extensions_asset_file['dependencies'],
        $extensions_asset_file['version'],
        true
    );
}
