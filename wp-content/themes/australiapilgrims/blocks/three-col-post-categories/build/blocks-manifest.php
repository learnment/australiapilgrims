<?php
// This file is generated. Do not modify it manually.
return array(
	'three-col-post-categories' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'australiapilgrims/three-col-post-categories',
		'version' => '0.1.0',
		'title' => 'Three Column Featured Items',
		'category' => 'widgets',
		'icon' => 'grid-view',
		'description' => 'Display 3 featured items with custom backgrounds and links to pages.',
		'keywords' => array(
			'featured',
			'grid',
			'thumbnails',
			'pages'
		),
		'attributes' => array(
			'items' => array(
				'type' => 'array',
				'default' => array(
					array(
						'title' => '',
						'backgroundUrl' => '',
						'backgroundId' => 0,
						'pageId' => 0,
						'url' => ''
					),
					array(
						'title' => '',
						'backgroundUrl' => '',
						'backgroundId' => 0,
						'pageId' => 0,
						'url' => ''
					),
					array(
						'title' => '',
						'backgroundUrl' => '',
						'backgroundId' => 0,
						'pageId' => 0,
						'url' => ''
					)
				)
			)
		),
		'supports' => array(
			'html' => false,
			'align' => array(
				'wide',
				'full'
			),
			'anchor' => true
		),
		'textdomain' => 'three-col-post-categories',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php'
	)
);
