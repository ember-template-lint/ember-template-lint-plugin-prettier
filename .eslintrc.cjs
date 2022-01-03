module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:node/recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
  },
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
