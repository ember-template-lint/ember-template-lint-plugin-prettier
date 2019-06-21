module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:node/recommended",
    "plugin:prettier/recommended"
  ],
  plugins: ["prettier", "jest"],
  env: {
    node: true,
    "jest/globals": true
  },
  rules: {
    "prettier/prettier": ["error"]
  }
};
