<?php
// This file is generated. Do not modify it manually.
return array(
	'divider' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'australiapilgrims/divider',
		'version' => '0.1.0',
		'title' => 'Divider',
		'category' => 'design',
		'icon' => 'minus',
		'description' => 'A decorative horizontal rule with vintage newsletter styling - thin, thick, or thick with thin line variants.',
		'example' => array(
			
		),
		'attributes' => array(
			'variant' => array(
				'type' => 'string',
				'default' => 'thin'
			)
		),
		'supports' => array(
			'html' => false,
			'align' => array(
				'wide',
				'full'
			),
			'spacing' => array(
				'margin' => true,
				'padding' => false
			)
		),
		'textdomain' => 'divider',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js'
	)
);
