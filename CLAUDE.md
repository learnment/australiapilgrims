# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a WordPress installation for the Australia Pilgrims website, featuring a custom theme with full Gutenberg block editor support and custom block development. The theme is minimal with no traditional header/footer, relying entirely on the block editor.

## Environment Setup

### Multi-Environment Configuration

The project uses Studio 24's WordPress Multi-Environment Config for managing different environments:

- **Environment Detection**: Automatic via hostname or `WP_ENV` environment variable
- **Configuration Loading**: `wp-config.load.php` (see wp-config.load.php:10)
- **Environment Definitions**: `wp-config.env.php` (see wp-config.env.php:25)
  - `production`: australiapilgrims.au (SSL enabled)
  - `development`: australiapilgrims (local Docker)

### Local Development

**Docker Setup**:
```bash
docker-compose up -d
```

The docker-compose.yml defines:
- PHP-FPM service (WordPress)
- Nginx proxy service (port 80)
- Local hostname: `australiapilgrims`

Access the site at: http://australiapilgrims

## Theme Development

The custom theme is located in `wp-content/themes/australiapilgrims/`.

### Build Commands

**Theme Assets** (Webpack-based):
```bash
cd wp-content/themes/australiapilgrims

# Development with watch mode
npm run dev

# Production build
npm run build

# Production build with watch
npm run watch
```

**Custom Blocks** (WordPress scripts):
```bash
# Build blocks for production
npm run build:blocks

# Development mode for blocks
npm start:blocks
```

### Asset Compilation

The theme uses a dual webpack setup (see webpack.config.js:189):

1. **Theme Assets**: Compiles `src/js/main.js` and `src/scss/main.scss` to `dist/` directory
2. **Custom Blocks**: Automatically discovers and builds all blocks in `blocks/*/src/*/block.json` to their respective `build/` directories

### Directory Structure

```
wp-content/themes/australiapilgrims/
├── src/
│   ├── js/         # Theme JavaScript
│   └── scss/       # Theme styles (main.scss)
├── blocks/
│   └── hero-banner/
│       ├── src/    # Block source files
│       └── build/  # Compiled block assets
├── dist/
│   ├── css/        # Compiled theme CSS
│   └── js/         # Compiled theme JS
├── functions.php   # Theme setup and asset enqueuing
└── webpack.config.js
```

## Custom Block Development

### Current Blocks

- **Hero Banner**: Full-width hero banner block (see blocks/hero-banner/hero-banner.php:27)
- **Three Column Post Categories**: Displays the top 3 categories with thumbnail images in a grid layout with 30dvh height (see blocks/three-col-post-categories/three-col-post-categories.php:27)

### Block Registration

Blocks are registered using WordPress 6.7+ performance optimizations:
- Blocks use `blocks-manifest.php` for efficient registration
- Registration handled in individual block PHP files (e.g., `hero-banner.php`)
- Block PHP files are required in `functions.php` (see functions.php:106)

### Creating New Blocks

1. Scaffold the block using @wordpress/create-block, this is an example `npx @wordpress/create-block three-col-post-categories --namespace=australiapilgrims --target-dir=blocks/three-col-post-categories`
2. Ensure there is package.json file in the block, otherwise webpack won't be able to find an entry point
3. Require in `functions.php`
4. Webpack will auto-discover and build based on `block.json` location

## Deployment

**GitHub Actions** (see .github/workflows/deploy.yml):
- Triggers on push to `main` branch
- Deploys to production server via rsync over SSH
- Respects `.gitignore` patterns
- Excludes `.git` directory
- Target path: `/var/www/html/australiapilgrims/public`

**Required GitHub Secrets**:
- `PRIVATE_KEY`: SSH private key
- `DEPLOY_IP`: Production server IP
- `DEPLOY_USER`: SSH user for deployment

**Pre-deployment**: Always run `npm run build` to compile production assets before committing.

## WordPress Configuration

### Config File Hierarchy

1. `wp-config.php`: Entry point (see wp-config.php)
2. `wp-config.load.php`: Environment detection and loading logic (see wp-config.load.php:10)
3. `wp-config.default.php`: Default settings for all environments
4. `wp-config.[environment].php`: Environment-specific settings
5. `wp-config.local.php`: Optional local overrides (gitignored, for sensitive data)

### Adding New Environments

Edit `wp-config.env.php` (see wp-config.env.php:25) to add environment definitions with domain, path, and SSL settings.

## Theme Architecture

### Gutenberg-First Approach

The theme is designed for full Gutenberg block editor support:
- No traditional header.php or footer.php templates
- Minimal template files (index.php, singular.php)
- All layout and design through blocks
- Editor styles match frontend styles (see functions.php:93)

### Asset Enqueuing

Theme assets are enqueued with file modification timestamps for cache busting (see functions.php:76, functions.php:84).

### Theme Support Features

Extensive block editor features enabled (see functions.php:13-56):
- Block styles, editor styles, wide/full alignment
- Responsive embeds, custom spacing, line height, units
- Editor color palette and font sizes
- Post thumbnails, HTML5 support, title tag

## WordPress Externals

The webpack config (see webpack.config.js:154) treats WordPress packages as external dependencies, expecting them to be available globally via `wp.*` namespace. Do not bundle these in theme assets.
- To build run `bun run build`