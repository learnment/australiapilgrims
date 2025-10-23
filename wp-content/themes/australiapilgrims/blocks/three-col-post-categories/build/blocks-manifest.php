<?php
// This file is generated. Do not modify it manually.
return array(
	'three-col-post-categories' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'australiapilgrims/three-col-post-categories',
		'version' => '0.1.0',
		'title' => 'Three Column Post Categories',
		'category' => 'widgets',
		'icon' => 'grid-view',
		'description' => 'Display the top 3 post categories with thumbnail images in a grid layout.',
		'keywords' => array(
			'categories',
			'grid',
			'thumbnails'
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
