<?php
// This file is generated. Do not modify it manually.
return array(
	'three-column-item' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'australiapilgrims/three-column-item',
		'version' => '0.1.0',
		'title' => 'Three Column Item',
		'category' => 'design',
		'icon' => 'table-col-after',
		'description' => 'A single column item that accepts inner blocks.',
		'parent' => array(
			'australiapilgrims/three-column'
		),
		'example' => array(
			
		),
		'attributes' => array(
			'width' => array(
				'type' => 'string',
				'default' => ''
			)
		),
		'supports' => array(
			'html' => false,
			'reusable' => false
		),
		'textdomain' => 'three-column-item',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	)
);
