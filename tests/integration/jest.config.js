module.exports = {
  verbose: true,
  projects: ['<rootDir>'],
  testMatch: ['*/**/*.spec.[jt]s?(x)'],
  testPathIgnorePatterns: ['/(?:production_)?node_modules/', '.d.ts$'],
  transform: {
    '^.+\\.[jt]sx?$': 'ts-jest',
  },
};
