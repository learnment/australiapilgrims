const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { sync: glob } = require("fast-glob");
const { dirname, resolve, sep, join } = require("path");
const { chdir, cwd } = require("process");
const { Chalk } = require("chalk");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const fs = require("fs");

const blockMetadataFiles = glob("blocks/*/src/*/block.json", {
  absolute: true,
  cwd: __dirname,
});

const chalk = new Chalk();

/**
 * Deletes a node module and all associated children
 * from node require cache
 * @param {string} moduleName The name of the module or
 *                            absolute/relative path to it
 */
function deleteModule(
  moduleName,
  alreadyInQueue = new Set(),
  except = new Set()
) {
  const queue = [];

  if (!alreadyInQueue.has(moduleName)) {
    queue.push(moduleName);
  }

  while (queue.length > 0) {
    const toDelete = queue.pop();
    const solvedName = require.resolve(toDelete);
    const nodeModule = require.cache[solvedName];

    if (nodeModule) {
      for (var i = 0; i < nodeModule.children.length; i++) {
        var child = nodeModule.children[i];

        if (alreadyInQueue.has(child.filename)) {
          continue;
        }

        queue.push(child.filename);
        alreadyInQueue.add(child.filename);
      }

      if (except.has(solvedName)) {
        continue;
      }

      if (solvedName in require.cache) {
        delete require.cache[solvedName];
      }
    }
  }
}

const exceptModules = new Set([
  require.resolve("mini-css-extract-plugin"),
  require.resolve("copy-webpack-plugin"),
]);

function generateBlockBuilderWebpackConfigs() {
  console.log(chalk.yellow("Starting pre-config"));

  const currentDirectory = cwd();

  const configs = blockMetadataFiles.map((blockMetadataFile) => {
    const blockDirectory = dirname(dirname(dirname(blockMetadataFile)));

    const wpWebpackConfig = require.resolve(
      "@wordpress/scripts/config/webpack.config"
    );
    const wpUtilsConfig = require.resolve("@wordpress/scripts/utils/config");

    const alreadyInQueue = new Set();
    deleteModule(wpWebpackConfig, alreadyInQueue, exceptModules);
    deleteModule(wpUtilsConfig, alreadyInQueue, exceptModules);

    chdir(blockDirectory);
    const defaultConfig = fs.existsSync(
      join(blockDirectory, "webpack.config.js")
    )
      ? require(join(blockDirectory, "webpack.config.js"))
      : require(wpWebpackConfig);
    const { getWebpackEntryPoints } = require(wpUtilsConfig);

    console.log(`Creating config for ${blockDirectory}`);

    const copyPlugin = defaultConfig.plugins.find(
      (plugin) => plugin instanceof CopyWebpackPlugin
    );

    if (copyPlugin) {
      copyPlugin.patterns = copyPlugin.patterns.map((pattern) => {
        pattern.context = join(blockDirectory, "src");

        return pattern;
      });
    }

    return {
      ...defaultConfig,
      output: {
        ...wpWebpackConfig.output,
        path: resolve(blockDirectory, "build") + sep,
      },
      entry: getWebpackEntryPoints("script"),
    };
  });

  console.log(chalk.yellow("Finished pre-config"));

  chdir(currentDirectory);

  return configs;
}

const themeWebpackConfig = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    entry: {
      "js/main": "./src/js/main.js",
      "css/styles": "./src/scss/main.scss",
    },
    output: {
      filename: "[name].js",
      path: resolve(__dirname, "dist"),
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
        },
        {
          test: /\.scss$/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        },
      ],
    },
    externals: {
      "@wordpress/blocks": ["wp", "blocks"],
      "@wordpress/block-editor": ["wp", "blockEditor"],
      "@wordpress/components": ["wp", "components"],
      "@wordpress/element": ["wp", "element"],
      "@wordpress/i18n": ["wp", "i18n"],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].css",
      }),
    ],
    optimization: {
      minimizer: [`...`, new CssMinimizerPlugin()],
    },
    devtool: isProduction ? false : "source-map",
    stats: {
      colors: true,
      hash: false,
      version: false,
      timings: true,
      assets: true,
      chunks: false,
      modules: false,
      reasons: false,
      children: false,
      source: false,
      errors: true,
      errorDetails: true,
      warnings: true,
      publicPath: false,
    },
  };
};

const webpackConfig = [
  ...generateBlockBuilderWebpackConfigs(),
  themeWebpackConfig,
];

console.log(chalk.yellow("Compilation start"));

module.exports = webpackConfig;
