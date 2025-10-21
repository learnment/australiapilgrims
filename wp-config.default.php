<?php
/**
 * Default config settings
 *
 * Enter any WordPress config settings that are default to all environments
 * in this file.
 *
 * Please note if you add constants in this file (i.e. define statements)
 * these cannot be overridden in environment config files so make sure these are only set once.
 *
 * @package    Studio 24 WordPress Multi-Environment Config
 * @version    2.0.0
 * @author     Studio 24 Ltd  <hello@studio24.net>
 */


/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY', 'Kp8#mN2@vXq9$Lw5&Yt3^Rz7!Hs4*Jf6(Gd1)Bc0~Ae2+Nq8-Pm5=Wk3|Vx7[Zy4]');
define('SECURE_AUTH_KEY', 'Ux9@Qw2#Rt5$Yp8&Io1^Lk4*Mn7!Bv3(Cx6)Zs0~Ae2+Df5-Gh8=Jk1|Np4[Wq7]');
define('LOGGED_IN_KEY', 'Zt6#Lp9@Xm2$Vn5&Bk8^Cq1*Wr4!Ys7(Hf0)Gd3~Ae6+Jt9-Io2=Ux5|Rp8[Nw1]');
define('NONCE_KEY', 'Mq4#Wp7@Ys0$Ht3&Kn6^Lx9*Cv2!Bz5(Rf8)Gp1~Ae4+Jd7-Io0=Nx3|Uq6[Yw9]');
define('AUTH_SALT', 'Pv2#Xn5@Km8$Wt1&Yz4^Lq7*Hx0!Bc3(Rf6)Gd9~Ae2+Js5-Io8=Np1|Ux4[Mw7]');
define('SECURE_AUTH_SALT', 'Rw3#Yt6@Ln9$Hp2&Kx5^Mq8*Cv1!Bz4(Gf7)Jd0~Ae3+Ws6-Io9=Nx2|Uq5[Py8]');
define('LOGGED_IN_SALT', 'Hx7#Kp0@Wn3$Yt6&Lq9^Mv2*Bz5!Cx8(Rf1)Gd4~Ae7+Js0-Io3=Np6|Ux9[Qw2]');
define('NONCE_SALT', 'Jd5#Np8@Yt1$Kx4&Wq7^Lm0*Cv3!Bz6(Hf9)Gr2~Ae5+Js8-Io1=Nx4|Uq7[Pw0]');

/**#@-*/


/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp';

/**
 * WordPress Localized Language, defaults to English.
 *
 * Change this to localize WordPress. A corresponding MO file for the chosen
 * language must be installed to wp-content/languages. For example, install
 * de_DE.mo to wp-content/languages and set WPLANG to 'de_DE' to enable German
 * language support.
 */
define('WPLANG', 'en_AU');


// Recommended WP config settings, uncomment to use these

/**
 * Increase memory limit.
 */
define('WP_MEMORY_LIMIT', '128M');

/**
 * Limit post revisions.
 */
define('WP_POST_REVISIONS', 20);

/**
 * Disable automatic updates.
 */
define('AUTOMATIC_UPDATER_DISABLED', true);

/**
 * Disable file editor.
 */
define('DISALLOW_FILE_EDIT', true);

define('FS_METHOD', 'direct');