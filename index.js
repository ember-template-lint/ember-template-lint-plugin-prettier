const Rule = require("ember-template-lint").Rule;

const PrettierRule = class Prettier extends Rule {
  visitor() {
    return {
			// TODO: turn this example into a real thing
      CommentStatement(node) {
        if (node.value.trim() === "hello") {
          this.log({
            message: "comments cannot contain hello",
            line: node.loc && node.loc.start.line,
            column: node.loc && node.loc.start.column,
            source: this.sourceForNode(node)
          });
        }
      }
    };
  }
};

module.exports = {
  name: "ember-template-lint-plugin-prettier",

  rules: {
    prettier: PrettierRule
  },

  // Define configurations for this plugin that can be extended by the base configuration
  configurations: {
    recommended: {
      plugins: ["ember-template-lint-plugin-prettier"],
      rules: {
        prettier: true
      }
    }
  }
};
