const PrettierRule = require("./lib/rules/prettier");

module.exports = {
  name: "ember-template-lint-plugin-prettier",

  rules: {
    prettier: PrettierRule
  }
};
