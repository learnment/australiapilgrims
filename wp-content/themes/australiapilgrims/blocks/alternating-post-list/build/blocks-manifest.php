<?php
// This file is generated. Do not modify it manually.
return array(
	'alternating-post-list' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'australiapilgrims/alternating-post-list',
		'version' => '0.1.0',
		'title' => 'Alternating Post List',
		'category' => 'widgets',
		'icon' => 'excerpt-view',
		'description' => 'Display selected posts in an alternating left-right layout with images and excerpts.',
		'keywords' => array(
			'posts',
			'alternating',
			'grid',
			'featured'
		),
		'attributes' => array(
			'selectedPosts' => array(
				'type' => 'array',
				'default' => array(
					
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
		'textdomain' => 'alternating-post-list',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php'
	)
);
