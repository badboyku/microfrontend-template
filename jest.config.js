module.exports = {
  globals: {
    __RUNTIME_CONFIG__: {
      NODE_ENV: 'test',
      REACT_APP_MY_VAR: '',
    },
    IS_DEV: false,
    IS_PROD: true,
    SETTINGS_CODE: 'ABCD1234',
  },
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/bootstrap.tsx',
    '!src/index.ts',
    '!src/jest.setup.js',
  ],
  coverageDirectory: 'test_coverage',
  coverageThreshold: { global: { branches: 80, functions: 80, lines: 80, statements: 80 } },
  moduleNameMapper: { '\\.(css|less|scss|sass)$': 'identity-obj-proxy' },
  resetMocks: true,
  setupFilesAfterEnv: ['<rootDir>/src/jest.setup.js'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
    '^.+\\.css$': '<rootDir>/jest.cssTransform.js',
    '^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)': '<rootDir>/jest.fileTransform.js',
  },
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
};
