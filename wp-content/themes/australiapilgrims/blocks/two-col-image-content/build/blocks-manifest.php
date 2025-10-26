<?php
// This file is generated. Do not modify it manually.
return array(
	'two-col-image-content' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'australiapilgrims/two-col-image-content',
		'version' => '0.1.0',
		'title' => 'Two Column Image & Content',
		'category' => 'design',
		'icon' => 'columns',
		'description' => 'A two-column layout with image and content that can be positioned left or right.',
		'keywords' => array(
			'columns',
			'image',
			'content',
			'two-column'
		),
		'attributes' => array(
			'image' => array(
				'type' => 'object',
				'default' => array(
					'id' => 0,
					'url' => '',
					'alt' => '',
					'width' => 0,
					'height' => 0,
					'sizes' => array(
						
					)
				)
			),
			'imageClasses' => array(
				'type' => 'string',
				'default' => ''
			),
			'heading' => array(
				'type' => 'string',
				'default' => ''
			),
			'content' => array(
				'type' => 'string',
				'default' => ''
			),
			'imagePosition' => array(
				'type' => 'string',
				'default' => 'left',
				'enum' => array(
					'left',
					'right'
				)
			)
		),
		'example' => array(
			'attributes' => array(
				'heading' => 'Our Story',
				'content' => 'Discover the journey that has brought us here.',
				'imagePosition' => 'left'
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
		'textdomain' => 'two-col-image-content',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js'
	)
);
