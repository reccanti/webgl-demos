const TEST_REGEX = '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|js?|tsx?|ts?)$'

module.exports = {
  verbose: true,
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/enzymeConfig.js"],
  testRegex: TEST_REGEX,
  transform: {
    "^.+\\.tsx?$": "babel-jest"
  },
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx"
  ],
}