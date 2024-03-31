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
      ['module-resolver', { root: ['./src'], alias }],
      ['@babel/plugin-transform-runtime', { corejs: 3 }],
    ],
  };
};
