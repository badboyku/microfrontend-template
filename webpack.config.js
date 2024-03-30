require('dotenv').config();
const { createHash } = require('crypto');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { DefinePlugin } = require('webpack');
const { ModuleFederationPlugin } = require('webpack').container;
const { alias, coreJsVersion } = require('./app.config');
const deps = require('./package.json').dependencies;

const getCacheVersion = (rawEnvVars) => {
  const hash = createHash('md5');
  hash.update(JSON.stringify(rawEnvVars));

  return hash.digest('hex');
};

module.exports = (_env, args) => {
  const mode = args.mode || 'development';
  const isProduction = mode === 'production';

  const envVars = Object.keys(process.env)
    .filter((key) => /^REACT_APP_/i.test(key))
    .reduce(
      (env, key) => {
        env[key] = process.env[key];

        return env;
      },
      {
        IS_DEV: !isProduction,
        IS_PROD: isProduction,
      },
    );
  const envVarsStringified = Object.keys(envVars).reduce((envVar, key) => {
    envVar[key] = JSON.stringify(envVars[key]);

    return envVar;
  }, {});

  return {
    entry: './src/index',
    mode,
    output: {
      pathinfo: !isProduction,
      publicPath: 'auto',
      ...(isProduction
        ? {
            filename: '[name].[contenthash].js',
            chunkFilename: '[name].[contenthash].chunk.js',
            assetModuleFilename: '[name].[contenthash][ext]',
          }
        : {
            // map to source with absolute file path not webpack:// protocol
            devtoolModuleFilenameTemplate: 'file:///[absolute-resource-path]',
          }),
    },
    module: {
      rules: [
        {
          oneOf: [
            { test: /\.(jpg|jpeg|png|gif|bmp)$/, type: 'asset' },
            {
              test: /\.svg$/,
              use: [
                {
                  loader: require.resolve('@svgr/webpack'),
                  options: {
                    svgoConfig: {
                      plugins: [
                        { name: 'preset-default', params: { overrides: { removeViewBox: false, removeTitle: false } } },
                      ],
                    },
                    svgProps: { role: 'img' },
                    titleProp: true,
                    ref: true,
                  },
                },
                {
                  loader: require.resolve('file-loader'),
                  options: { name: isProduction ? '[name].[contenthash].[ext]' : '[path][name].[ext]' },
                },
              ],
              issuer: { and: [/\.(js|jsx|ts|tsx|md|mdx)$/] },
            },
            {
              test: /\.(js|jsx|ts|tsx|mjs)$/,
              loader: require.resolve('babel-loader'),
              exclude: /node_modules/,
              options: {
                presets: [
                  [require.resolve('@babel/preset-env'), { useBuiltIns: 'usage', corejs: coreJsVersion }],
                  [require.resolve('@babel/preset-react'), { runtime: 'automatic' }],
                  require.resolve('@babel/preset-typescript'),
                ],
                plugins: [
                  [require.resolve('babel-plugin-module-resolver'), { root: ['./src'], alias }],
                  [require.resolve('@babel/plugin-transform-runtime'), { corejs: 3 }],
                ],
                cacheCompression: false,
                cacheDirectory: true,
                compact: isProduction,
              },
            },
            {
              test: /\.css$/,
              use: [
                !isProduction && require.resolve('style-loader'),
                isProduction && { loader: MiniCssExtractPlugin.loader },
                { loader: require.resolve('css-loader'), options: { importLoaders: 1, sourceMap: !isProduction } },
                {
                  loader: require.resolve('postcss-loader'),
                  options: {
                    postcssOptions: {
                      plugins: [require.resolve('postcss-preset-env'), require.resolve('postcss-normalize')],
                    },
                    sourceMap: !isProduction,
                  },
                },
              ].filter(Boolean),
              sideEffects: true,
            },
            {
              test: /\.(sass|scss)$/,
              use: [
                !isProduction && require.resolve('style-loader'),
                isProduction && { loader: MiniCssExtractPlugin.loader },
                { loader: require.resolve('css-loader'), options: { importLoaders: 3, sourceMap: !isProduction } },
                {
                  loader: require.resolve('postcss-loader'),
                  options: {
                    postcssOptions: {
                      plugins: [require.resolve('postcss-preset-env'), require.resolve('postcss-normalize')],
                    },
                    sourceMap: !isProduction,
                  },
                },
                { loader: require.resolve('resolve-url-loader'), options: { sourceMap: !isProduction } },
                { loader: require.resolve('sass-loader'), options: { sourceMap: true } },
              ].filter(Boolean),
              sideEffects: true,
            },
            {
              exclude: [/^$/, /\.(js|jsx|ts|tsx|mjs)$/, /\.html$/, /\.json$/],
              type: 'asset/resource',
            },
          ],
        },
      ],
    },
    resolve: { alias, extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'] },
    optimization: {
      minimize: isProduction,
      minimizer: [
        new TerserPlugin({
          extractComments: false,
          terserOptions: {
            format: { ascii_only: true, comments: false },
            mangle: { safari10: true },
          },
        }),
        new CssMinimizerPlugin(),
      ],
    },
    plugins: [
      new DefinePlugin(envVarsStringified),
      new ModuleFederationPlugin({
        name: 'my_app',
        filename: 'remoteEntry.js',
        remotes: {},
        exposes: {},
        shared: { ...deps },
      }),
      new HtmlWebpackPlugin({
        template: './public/index.html',
        minify: isProduction
          ? {
              collapseWhitespace: true,
              keepClosingSlash: true,
              minifyCSS: true,
              minifyJS: true,
              minifyURLs: true,
              removeComments: true,
              removeEmptyAttributes: true,
              removeRedundantAttributes: true,
              removeStyleLinkTypeAttributes: true,
              useShortDoctype: true,
            }
          : false,
      }),
      isProduction &&
        new MiniCssExtractPlugin({
          filename: '[name].[contenthash].css',
          chunkFilename: '[name].[contenthash].chunk.css',
        }),
    ].filter(Boolean),
    cache: {
      type: 'filesystem',
      buildDependencies: { defaultWebpack: ['webpack/lib/'], config: [__filename] },
      version: getCacheVersion(envVars),
    },
    target: ['browserslist'],
    bail: isProduction,
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    ...(isProduction
      ? {}
      : {
          devServer: {
            client: { logging: 'info', progress: true },
            compress: true,
            historyApiFallback: true,
            hot: true,
            open: true,
            port: process.env.PORT || 8080,
          },
        }),
  };
};
