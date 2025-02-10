module.exports = {
  extends: ['badboyku'],
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['components', './src/components/'],
          ['pages', './src/pages/'],
          ['routes', './src/routes/'],
          ['types', './src/@types/global.d.ts'],
          ['utils', './src/utils/'],
        ],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      },
    },
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
  },
};
