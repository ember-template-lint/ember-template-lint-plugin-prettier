const PrettierRule = require("./rules/lint-prettier");

module.exports = {
  name: "ember-template-lint-plugin-prettier",

  rules: {
    prettier: PrettierRule
  }
};
