module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:node/recommended",
    "plugin:prettier/recommended"
  ],
  plugins: ["prettier"],
  env: {
    node: true
  },
  rules: {
    "prettier/prettier": ["error"]
  },

  overrides: [
    {
      files: ["test/**/*.js"],
      env: {
        mocha: true
      }
    }
  ]
};
