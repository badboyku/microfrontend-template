const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const deps = require('./package.json').dependencies;

const appName = 'template-app';

module.exports = {
  entry: './src/index',
  cache: false,
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    port: 3100,
    client: {
      logging: 'info',
      progress: true,
    },
    compress: true,
    hot: true,
    open: true,
  },
  optimization: {
    minimize: false,
  },
  output: {
    publicPath: 'auto',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /bootstrap\.(jsx|tsx)$/,
        loader: require.resolve('bundle-loader'),
        options: {
          lazy: true,
        },
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
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
    }),
  ],
};
