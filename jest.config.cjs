module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  testMatch: ['**/_tests_/**/*.test.{js,jsx}', '**/*.test.{js,jsx}'],
}
