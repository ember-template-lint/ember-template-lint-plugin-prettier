const PrettierRule = require("./lib/rules/prettier");

module.exports = {
  name: "ember-template-lint-plugin-prettier",

  configurations: {
    recommended: {
      rules: require("./lib/config/recommended"),
    },
  },

  rules: {
    prettier: PrettierRule,
  },
};
