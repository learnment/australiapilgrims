<?php
// This file is generated. Do not modify it manually.
return array(
	'hero-banner' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'australiapilgrims/hero-banner',
		'version' => '0.1.0',
		'title' => 'Hero Banner',
		'category' => 'design',
		'icon' => 'cover-image',
		'description' => 'A hero banner with background image, heading, tagline, description, and call-to-action button.',
		'keywords' => array(
			'hero',
			'banner',
			'header',
			'cover'
		),
		'attributes' => array(
			'backgroundImage' => array(
				'type' => 'object',
				'default' => array(
					'id' => 0,
					'url' => '',
					'alt' => ''
				)
			),
			'heading' => array(
				'type' => 'string',
				'default' => ''
			),
			'tagline' => array(
				'type' => 'string',
				'default' => ''
			),
			'description' => array(
				'type' => 'string',
				'default' => ''
			),
			'buttonText' => array(
				'type' => 'string',
				'default' => 'Learn More'
			),
			'buttonUrl' => array(
				'type' => 'string',
				'default' => ''
			),
			'buttonTarget' => array(
				'type' => 'boolean',
				'default' => false
			)
		),
		'example' => array(
			'attributes' => array(
				'heading' => 'Welcome to Australia Pilgrims',
				'tagline' => 'Discover Your Journey',
				'description' => 'Join us on an unforgettable pilgrimage experience.',
				'buttonText' => 'Start Your Journey'
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
		'textdomain' => 'hero-banner',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js'
	)
);
