require('dotenv').config();
const { createHash } = require('crypto');
const fs = require('fs');
const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { DefinePlugin } = require('webpack');
const { ModuleFederationPlugin } = require('webpack').container;
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const deps = require('./package.json').dependencies;

const assetInjectMaxSize = parseInt(process.env.ASSET_INJECT_MAX_SIZE, 10) || 10000;
const disableEslint = (process.env.DISABLE_ESLINT || 'false').toLowerCase() === 'true';
const disableReactRefresh = (process.env.DISABLE_REACT_REFRESH || 'false').toLowerCase() === 'true';
const disableSourceMap = (process.env.DISABLE_SOURCE_MAP || 'false').toLowerCase() === 'true';

const alias = {
  components: './src/components/',
  pages: './src/pages/',
  routes: './src/routes/',
  types: './src/@types/global.d.ts',
  utils: './src/utils/',
};

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);
const appSrc = resolveApp('src');

const getCacheVersion = (rawEnvVars) => {
  const hash = createHash('md5');
  hash.update(JSON.stringify(rawEnvVars));

  return hash.digest('hex');
};

module.exports = (_env, args) => {
  const mode = args.mode || 'development';
  const isProduction = mode === 'production';

  const reactAppEnvVars = Object.keys(process.env)
    .filter((key) => /^REACT_APP_/i.test(key))
    .reduce(
      (env, key) => {
        env[key] = process.env[key];

        return env;
      },
      {
        IS_DEV: !isProduction,
        IS_PROD: isProduction,
        SETTINGS_CODE: 'asdfasdf',
      },
    );
  const reactAppEnvVarsStringified = Object.keys(reactAppEnvVars).reduce((envVar, key) => {
    envVar[key] = JSON.stringify(reactAppEnvVars[key]);

    return envVar;
  }, {});

  return {
    entry: './src/index',
    mode,
    output: {
      pathinfo: !isProduction,
      publicPath: 'auto',
      hashDigestLength: 16,
      filename: 'js/[name].[contenthash].js',
      chunkFilename: 'js/[name].[contenthash].chunk.js',
      assetModuleFilename: 'js/[name].[contenthash][ext]',
      ...(isProduction
        ? {}
        : {
            // map to source with absolute file path not webpack:// protocol
            devtoolModuleFilenameTemplate: 'file:///[absolute-resource-path]',
          }),
    },
    module: {
      rules: [
        !disableSourceMap && {
          enforce: 'pre',
          exclude: /@babel(?:\/|\\{1,2})runtime/,
          test: /\.(js|mjs|jsx|ts|tsx|css)$/,
          loader: require.resolve('source-map-loader'),
        },
        {
          oneOf: [
            {
              test: /\.(jpg|jpeg|png|gif|bmp)$/,
              type: 'asset',
              parser: { dataUrlCondition: { maxSize: assetInjectMaxSize } },
            },
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
                  options: { name: 'media/[name].[contenthash:16].[ext]' },
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
                  [require.resolve('@babel/preset-env'), { useBuiltIns: 'usage', corejs: '3.43.1' }],
                  [require.resolve('@babel/preset-react'), { runtime: 'automatic' }],
                  require.resolve('@babel/preset-typescript'),
                ],
                plugins: [
                  [require.resolve('babel-plugin-module-resolver'), { root: ['./src'], alias }],
                  [require.resolve('@babel/plugin-transform-runtime'), { corejs: 3 }],
                  !isProduction && !disableReactRefresh && require.resolve('react-refresh/babel'),
                ].filter(Boolean),
                cacheCompression: false,
                cacheDirectory: true,
                compact: isProduction,
              },
            },
            {
              test: /\.(js|mjs)$/,
              exclude: /@babel(?:\/|\\{1,2})runtime/,
              loader: require.resolve('babel-loader'),
              options: {
                babelrc: false,
                configFile: false,
                compact: false,
                cacheDirectory: true,
                cacheCompression: false,
                sourceMaps: !disableSourceMap,
                inputSourceMap: !disableSourceMap,
              },
            },
            {
              test: /\.css$/,
              use: [
                !isProduction && require.resolve('style-loader'),
                isProduction && { loader: MiniCssExtractPlugin.loader, options: { publicPath: '../' } },
                {
                  loader: require.resolve('css-loader'),
                  options: { importLoaders: 1, sourceMap: !disableSourceMap },
                },
                {
                  loader: require.resolve('postcss-loader'),
                  options: {
                    postcssOptions: {
                      plugins: [
                        require.resolve('postcss-flexbugs-fixes'),
                        require.resolve('postcss-preset-env'),
                        require.resolve('postcss-normalize'),
                      ],
                    },
                    sourceMap: !disableSourceMap,
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
                {
                  loader: require.resolve('css-loader'),
                  options: { importLoaders: 3, sourceMap: !disableSourceMap },
                },
                {
                  loader: require.resolve('postcss-loader'),
                  options: {
                    postcssOptions: {
                      plugins: [
                        require.resolve('postcss-flexbugs-fixes'),
                        require.resolve('postcss-preset-env'),
                        require.resolve('postcss-normalize'),
                      ],
                    },
                    sourceMap: !disableSourceMap,
                  },
                },
                { loader: require.resolve('resolve-url-loader'), options: { sourceMap: !disableSourceMap } },
                { loader: require.resolve('sass-loader'), options: { sourceMap: !disableSourceMap } },
              ].filter(Boolean),
              sideEffects: true,
            },
            {
              exclude: [/^$/, /\.(js|jsx|ts|tsx|mjs)$/, /\.html$/, /\.json$/],
              type: 'asset/resource',
            },
          ],
        },
      ].filter(Boolean),
    },
    resolve: { alias, extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'] },
    optimization: {
      minimize: isProduction,
      minimizer: [
        new TerserPlugin({
          extractComments: false,
          terserOptions: { format: { ascii_only: true, comments: false }, mangle: { safari10: true } },
        }),
        new CssMinimizerPlugin(),
      ],
    },
    plugins: [
      new DefinePlugin(reactAppEnvVarsStringified),
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
          filename: 'css/[name].[contenthash].css',
          chunkFilename: 'css/[name].[contenthash].chunk.css',
        }),
      isProduction &&
        new CopyPlugin({
          patterns: [
            { from: 'public/assets', to: 'assets' },
            { from: 'public/robots.txt', to: '' },
            { from: 'public/runtime-env.js', to: '' }, // TODO: Handle this for your build process.
          ],
        }),
      new WebpackManifestPlugin({}),
      !isProduction && !disableReactRefresh && new ReactRefreshWebpackPlugin({ overlay: false }),
      !disableEslint &&
        new ESLintPlugin({
          configType: 'eslintrc',
          extensions: ['js', 'mjs', 'jsx', 'ts', 'tsx'],
          context: appSrc,
          files: [appSrc],
        }),
    ].filter(Boolean),
    cache: {
      buildDependencies: { defaultWebpack: ['webpack/lib/'], config: [__filename] },
      store: 'pack',
      type: 'filesystem',
      version: getCacheVersion(reactAppEnvVars),
    },
    target: ['browserslist'],
    bail: isProduction,
    /* eslint-disable-next-line no-nested-ternary */
    devtool: disableSourceMap ? false : isProduction ? 'source-map' : 'inline-source-map',
    ...(isProduction
      ? {}
      : {
          devServer: {
            allowedHosts: 'all',
            client: { logging: 'info', progress: true },
            compress: true,
            devMiddleware: { publicPath: '/' },
            headers: {
              'Access-Control-Allow-Headers': '*',
              'Access-Control-Allow-Methods': '*',
              'Access-Control-Allow-Origin': '*',
            },
            historyApiFallback: true,
            hot: true,
            open: true,
            port: process.env.PORT || 8080,
          },
        }),
  };
};
