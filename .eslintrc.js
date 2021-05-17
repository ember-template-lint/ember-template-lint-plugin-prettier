module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:node/recommended",
    "plugin:prettier/recommended",
  ],
  plugins: ["prettier"],
  env: {
    node: true,
  },
  rules: {
    "prettier/prettier": ["error"],
  },

  overrides: [
    {
      files: ["test/**/*-test.js", "test/helpers/rule-test-harness.js"],
      env: {
        mocha: true,
      },
    },
  ],
};
