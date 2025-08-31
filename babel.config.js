module.exports = (api) => {
  api.cache(true);

  return {
    presets: [
      ['@babel/preset-env', { useBuiltIns: 'usage', corejs: '3.45.1' }],
      ['@babel/preset-react', { runtime: 'automatic' }],
      '@babel/preset-typescript',
    ],
    plugins: [
      ['@babel/plugin-transform-runtime', { corejs: 3 }],
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            components: './src/components/',
            pages: './src/pages/',
            routes: './src/routes/',
            types: './src/@types/global.d.ts',
            utils: './src/utils/',
          },
        },
      ],
    ],
  };
};
