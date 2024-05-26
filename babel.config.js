const { alias, coreJsVersion } = require('./app.config');

module.exports = (api) => {
  api.cache(true);

  return {
    presets: [
      ['@babel/preset-env', { useBuiltIns: 'usage', corejs: coreJsVersion }],
      ['@babel/preset-react', { runtime: 'automatic' }],
      '@babel/preset-typescript',
    ],
    plugins: [
      ['@babel/plugin-transform-runtime', { corejs: 3 }],
      ['module-resolver', { root: ['./src'], alias }],
    ],
  };
};
