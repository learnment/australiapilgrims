/**
 * Category Block Editor
 *
 * Initializes the Gutenberg block editor for category edit screens
 */

(function() {
    'use strict';

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCategoryBlockEditor);
    } else {
        initCategoryBlockEditor();
    }

    function initCategoryBlockEditor() {
        const editorContainer = document.getElementById('category-block-editor');
        const contentInput = document.getElementById('category-block-content');

        if (!editorContainer || !contentInput) {
            return;
        }

        // Get WordPress block editor components
        const { createElement: el, useState, useEffect } = wp.element;
        const { BlockEditorProvider, BlockList, WritingFlow, ObserveTyping } = wp.blockEditor;
        const { Popover, SlotFillProvider } = wp.components;
        const { useDispatch, useSelect } = wp.data;
        const { parse, serialize } = wp.blocks;

        // Category Block Editor Component
        function CategoryBlockEditor() {
            const [blocks, setBlocks] = useState(() => {
                const initialContent = window.categoryBlockEditor?.initialContent || '';
                return initialContent ? parse(initialContent) : [];
            });

            // Update the hidden input whenever blocks change
            useEffect(() => {
                const serializedContent = serialize(blocks);
                contentInput.value = serializedContent;
            }, [blocks]);

            // Block editor settings
            const settings = {
                hasFixedToolbar: true,
                mediaUpload: wp.media ? wp.media.editor.open : undefined,
            };

            return el(
                SlotFillProvider,
                null,
                el(
                    BlockEditorProvider,
                    {
                        value: blocks,
                        onInput: setBlocks,
                        onChange: setBlocks,
                        settings: settings
                    },
                    el('div', { className: 'editor-styles-wrapper' },
                        el(WritingFlow, null,
                            el(ObserveTyping, null,
                                el(BlockList, null)
                            )
                        )
                    ),
                    el(Popover.Slot)
                )
            );
        }

        // Render the editor
        const root = wp.element.createRoot ?
            wp.element.createRoot(editorContainer) :
            null;

        if (root) {
            // React 18+ (WordPress 6.2+)
            root.render(el(CategoryBlockEditor));
        } else {
            // Legacy React
            wp.element.render(
                el(CategoryBlockEditor),
                editorContainer
            );
        }

        // Update form submission to ensure content is saved
        const form = editorContainer.closest('form');
        if (form) {
            form.addEventListener('submit', function(e) {
                // Content is already updated via useEffect,
                // but we'll trigger one final update to be safe
                const blocks = wp.data.select('core/block-editor').getBlocks();
                if (blocks) {
                    contentInput.value = serialize(blocks);
                }
            });
        }
    }
})();
