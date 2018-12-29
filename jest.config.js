module.exports = {
  verbose: false,
  roots: [
    '<rootDir>/src',
    '<rootDir>/tests'
  ],
  moduleFileExtensions: [
    "js",
    "json"
  ],
  moduleDirectories: ['node_modules'],
  moduleNameMapper: {
    '^@/test$': '<rootDir>/test/index.js',
    '^@/test/(.*)$': '<rootDir>/test/$1'
  },
  transform: {
    "\\.(js)$": "babel-jest"
  },
  transformIgnorePatterns: ['node_modules'],
  collectCoverageFrom: [
    "src/**/*.{js}",
    "!**/node_modules/**",
    "!**/*.d.ts"
  ],
  coverageDirectory: "coverage",
  "testEnvironment": "node"
}
