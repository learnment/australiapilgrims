<?php
// This file is generated. Do not modify it manually.
return array(
	'three-column' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'australiapilgrims/three-column',
		'version' => '0.1.0',
		'title' => 'Three Column',
		'category' => 'design',
		'icon' => 'columns',
		'description' => 'A three-column layout that accepts inner blocks in each column.',
		'example' => array(
			
		),
		'attributes' => array(
			'leftColumnWidth' => array(
				'type' => 'string',
				'default' => ''
			)
		),
		'supports' => array(
			'html' => false,
			'align' => array(
				'wide',
				'full'
			),
			'spacing' => array(
				'padding' => true,
				'margin' => true
			)
		),
		'textdomain' => 'three-column',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	)
);
