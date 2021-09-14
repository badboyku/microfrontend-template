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
          test: /\.svg$/,
          use: [require.resolve('@svgr/webpack'), require.resolve('url-loader')],
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
    optimization: {
      minimize: true,
      minimizer: [new CssMinimizerPlugin()],
    },
  };

  return isProduction ? merge([commonConfig, productionConfig]) : merge([commonConfig, developmentConfig]);
};
