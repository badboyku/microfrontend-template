require('dotenv').config();
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { DefinePlugin } = require('webpack');
const { ModuleFederationPlugin } = require('webpack').container;
const { merge } = require('webpack-merge');
const deps = require('./package.json').dependencies;

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

  const commonConfig = {
    mode,
    cache: false,
    entry: './src/index',
    output: {
      publicPath: 'auto',
      ...(isProduction
        ? {
            assetModuleFilename: '[name].[contenthash][ext][query]',
            chunkFilename: '[name].[contenthash].js',
            filename: '[name].[contenthash].js',
          }
        : {}),
    },
    resolve: { extensions: ['.json', '.js', '.jsx', '.ts', '.tsx'] },
    module: {
      rules: [
        {
          test: /bootstrap\.(jsx|tsx)$/,
          loader: require.resolve('bundle-loader'),
          options: { lazy: true },
        },
        {
          test: /\.(bmp|gif|jpg|jpeg|png)$/,
          loader: require.resolve('url-loader'),
        },
        {
          test: /\.svg$/,
          use: [require.resolve('@svgr/webpack'), require.resolve('url-loader')],
        },
        {
          test: /\.(js|mjs|jsx|ts|tsx)$/,
          loader: require.resolve('babel-loader'),
          exclude: /node_modules/,
          options: {
            presets: [
              [require.resolve('@babel/preset-env'), { useBuiltIns: 'usage', corejs: '3.33.2' }],
              [require.resolve('@babel/preset-react'), { runtime: 'automatic' }],
              require.resolve('@babel/preset-typescript'),
            ],
            plugins: [[require.resolve('@babel/plugin-transform-runtime'), { corejs: 3, proposals: true }]],
          },
        },
        {
          test: /\.css$/,
          use: [
            { loader: MiniCssExtractPlugin.loader },
            { loader: require.resolve('css-loader'), options: { importLoaders: 1, sourceMap: !isProduction } },
            {
              loader: require.resolve('postcss-loader'),
              options: {
                postcssOptions: { plugins: [require.resolve('postcss-preset-env')] },
                sourceMap: !isProduction,
              },
            },
          ],
        },
        {
          test: /\.(sass|scss)$/,
          use: [
            { loader: MiniCssExtractPlugin.loader },
            { loader: require.resolve('css-loader'), options: { importLoaders: 3, sourceMap: !isProduction } },
            {
              loader: require.resolve('postcss-loader'),
              options: {
                postcssOptions: { plugins: [require.resolve('postcss-preset-env')] },
                sourceMap: !isProduction,
              },
            },
            { loader: require.resolve('resolve-url-loader'), options: { sourceMap: !isProduction } },
            { loader: require.resolve('sass-loader'), options: { sourceMap: true } },
          ],
        },
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
      new MiniCssExtractPlugin({
        ...(isProduction ? { filename: '[name].[contenthash].css' } : {}),
      }),
    ],
  };

  const developmentConfig = {
    devServer: {
      client: { logging: 'info', progress: true },
      compress: true,
      historyApiFallback: true,
      hot: true,
      open: true,
      port: process.env.PORT || 8080,
    },
    devtool: 'inline-source-map',
    output: {
      devtoolModuleFilenameTemplate: 'file:///[absolute-resource-path]', // map to source with absolute file path not webpack:// protocol
    },
  };

  const productionConfig = {
    optimization: {
      minimize: true,
      minimizer: [new CssMinimizerPlugin()],
    },
    devtool: 'source-map',
  };

  return isProduction ? merge([commonConfig, productionConfig]) : merge([commonConfig, developmentConfig]);
};
