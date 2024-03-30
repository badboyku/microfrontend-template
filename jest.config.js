module.exports = {
  globals: {
    __RUNTIME_CONFIG__: {
      NODE_ENV: 'test',
      REACT_APP_MY_VAR: '',
    },
    IS_DEV: false,
    IS_PROD: true,
  },
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts', '!src/index.tsx', '!src/bootstrap.tsx'],
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
