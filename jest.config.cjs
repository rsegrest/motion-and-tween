// es-vector-math ships ES modules only, so Jest (CommonJS) must map and transform it.
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\\.ts$": "ts-jest",
    "^.+\\.js$": ["babel-jest", { presets: [["@babel/preset-env", { targets: { node: "current" } }]] }],
  },
  transformIgnorePatterns: ["/node_modules/(?!es-vector-math/)"],
  moduleNameMapper: {
    "^es-vector-math$": "<rootDir>/node_modules/es-vector-math/dist/index.js",
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
};
