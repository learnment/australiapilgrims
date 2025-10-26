<?php
// This file is generated. Do not modify it manually.
return array(
	'location' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'australiapilgrims/location',
		'version' => '0.1.0',
		'title' => 'Location',
		'category' => 'widgets',
		'icon' => 'location',
		'description' => 'A block to display a location with an address.',
		'example' => array(
			
		),
		'attributes' => array(
			'address' => array(
				'type' => 'string',
				'source' => 'html',
				'selector' => '.location-address'
			)
		),
		'supports' => array(
			'html' => false
		),
		'textdomain' => 'location',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js'
	)
);
