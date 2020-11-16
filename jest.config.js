module.exports = {
  roots: [
      "<rootDir>/main"
  ],
  testRegex: '(.+)\\test\\.(js?|ts?)$',
  transform: {
      "^.+\\.ts?$": "ts-jest"
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};