export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
      '^.+\\.ts?$': 'ts-jest',
      '^.+\\.js?$': 'babel-jest',
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
    fakeTimers: {'enableGlobally': true},
};