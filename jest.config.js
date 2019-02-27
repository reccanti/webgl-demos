const TEST_REGEX = '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|js?|tsx?|ts?)$'

module.exports = {
    "setupFiles": ["<rootDir>/enzymeConfig.js"],
    "testRegex": TEST_REGEX,
    "transform": {
        "^.+\\.tsx?$": "ts-jest"
    },
    "testPathIgnorePatterns": ["<rootDir>/.next/", "<rootDir>/node_modules/"],
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "jsx"
    ],
}