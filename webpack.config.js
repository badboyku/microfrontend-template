require('dotenv').config();
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const { merge } = require('webpack-merge');
const deps = require('./package.json').dependencies;

module.exports = (env, args) => {
  const mode = args.mode || 'development';
  const isProduction = mode === 'production';

  const commonConfig = {
    mode,
    cache: false,
    entry: './src/index',
    output: { publicPath: 'auto' },
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
          test: /\.(js|mjs|jsx|ts|tsx)$/,
          loader: require.resolve('babel-loader'),
          exclude: /node_modules/,
          options: {
            presets: [
              require.resolve('@babel/preset-env'),
              require.resolve('@babel/preset-react'),
              require.resolve('@babel/preset-typescript'),
            ],
          },
        },
        {
          test: /\.css$/,
          use: [
            { loader: require.resolve('style-loader') },
            { loader: MiniCssExtractPlugin.loader },
            { loader: require.resolve('css-loader'), options: { importLoaders: 1, sourcemap: !isProduction } },
            { loader: require.resolve('postcss-loader'), options: { sourcemap: !isProduction } },
          ],
        },
        {
          test: /\.(sass|scss)$/,
          use: [
            { loader: require.resolve('style-loader') },
            { loader: MiniCssExtractPlugin.loader },
            { loader: require.resolve('css-loader'), options: { importLoaders: 3, sourcemap: !isProduction } },
            { loader: require.resolve('postcss-loader'), options: { sourcemap: !isProduction } },
            { loader: require.resolve('resolve-url-loader'), options: { sourcemap: !isProduction } },
            { loader: require.resolve('sass-loader'), options: { sourcemap: !isProduction } },
          ],
        },
        // This should be the last rule, if you plan on adding more, add them above this file-loader rule.
        {
          loader: require.resolve('file-loader'),
          exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
        },
      ],
    },
    plugins: [
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
      new MiniCssExtractPlugin(),
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
    devtool: 'source-map',
  };

  const productionConfig = {
    optimization: { minimize: true, minimizer: [new CssMinimizerPlugin()] },
  };

  return isProduction ? merge([commonConfig, productionConfig]) : merge([commonConfig, developmentConfig]);
};
