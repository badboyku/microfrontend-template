const { alias } = require('./app.config');

module.exports = {
  extends: ['badboyku'],
  settings: {
    'import/resolver': {
      alias: {
        map: Object.keys(alias).map((key) => [key, alias[key]]),
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      },
    },
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
  },
};
