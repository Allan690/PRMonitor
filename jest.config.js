require('@babel/register');

module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.js',
    // '!index.js',
    '!**/__tests__/**/*.js?(x)',
    '!**/node_modules/**',
  ],
  testMatch: [
    '<rootDir>/**/__tests__/**/?(*.)(spec|test)js',
    '<rootDir>/**/?(*.)(spec|test).js',
    '<rootDir>/integrations/**/?(*.)(spec|test).js'
  ],
  testEnvironment: 'node',
};
