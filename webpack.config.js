const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const deps = require('./package.json').dependencies;

const isDevelopment = true;
const appName = 'template-app';
const appPort = 3100;

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  cache: false,
  devServer: {
    client: { logging: 'info', progress: true },
    compress: true,
    historyApiFallback: true,
    hot: true,
    open: true,
    port: appPort,
  },
  devtool: isDevelopment ? 'source-map' : false,
  entry: './src/index',
  optimization: {
    minimize: !isDevelopment,
    minimizer: [new CssMinimizerPlugin()],
  },
  output: {
    publicPath: 'auto',
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      { test: /bootstrap\.(jsx|tsx)$/, loader: require.resolve('bundle-loader'), options: { lazy: true } },
      { test: /\.(bmp|gif|jpg|jpeg|png)$/, loader: require.resolve('url-loader') },
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
          require.resolve('style-loader'),
          { loader: MiniCssExtractPlugin.loader },
          { loader: require.resolve('css-loader'), options: { importLoaders: 1, sourcemap: isDevelopment } },
          { loader: require.resolve('postcss-loader'), options: { sourcemap: isDevelopment } },
        ],
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          require.resolve('style-loader'),
          { loader: MiniCssExtractPlugin.loader },
          { loader: require.resolve('css-loader'), options: { importLoaders: 3, sourcemap: isDevelopment } },
          { loader: require.resolve('postcss-loader'), options: { sourcemap: isDevelopment } },
          { loader: require.resolve('resolve-url-loader'), options: { sourcemap: isDevelopment } },
          { loader: require.resolve('sass-loader'), options: { sourcemap: isDevelopment } },
        ],
      },
      { loader: require.resolve('file-loader'), exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/] },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: appName,
      filename: 'remoteEntry.js',
      remotes: {},
      shared: {
        ...deps,
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      minify: isDevelopment
        ? false
        : {
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
          },
    }),
    new MiniCssExtractPlugin(),
  ],
};
