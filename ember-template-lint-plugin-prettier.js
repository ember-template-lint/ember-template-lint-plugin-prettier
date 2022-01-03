import PrettierRule from "./lib/rules/prettier.js";
import recommended from "./lib/config/recommended.js";

export default {
  name: "ember-template-lint-plugin-prettier",

  configurations: {
    recommended: {
      rules: recommended,
    },
  },

  rules: {
    prettier: PrettierRule,
  },
};
