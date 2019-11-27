"use strict";

const {
  showInvisibles,
  generateDifferences
} = require("prettier-linter-helpers");

const getLocFromIndex = require("../utils/get-loc-from-index");

const { INSERT, DELETE, REPLACE } = generateDifferences;

let prettier;

const Rule = require("ember-template-lint").Rule;

function isFile(loc) {
  return loc.start && loc.start.line === 1 && loc.start.column === 0;
}

module.exports = class Prettier extends Rule {
  constructor(options) {
    super(options);
    this.filePath = options.moduleName + ".hbs";
  }

  visitor() {
    return {
      Program: {
        exit(node) {
          // in hbs AST a Program may be: a Template or a Block
          // we want to apply this rule only to files, not to blocks contents
          if (!isFile(node.loc)) {
            return;
          }

          if (prettier && prettier.clearConfigCache) {
            prettier.clearConfigCache();
          }

          const source = this.sourceForNode(node);
          // Following
          // https://github.com/ember-template-lint/ember-template-lint/commit/a7bf55cf36ee90d0460e7cb94e7ca4731aaa4be7
          // `templateEnvironmentData` is deprecated (in v1.8.0).
          // This code aims at remaining compatible with
          // ember-template-lint@>=1.3.0. The ternary might be removed when
          // upgrading the peerDependency to ember-template-lint@2.
          let filepath = this.filePath
            ? this.filePath
            : this.templateEnvironmentData.moduleName + ".hbs";

          if (!prettier) {
            // Prettier is expensive to load, so only load it if needed.
            prettier = require("prettier");
          }

          const prettierRcOptions = prettier.resolveConfig.sync(filepath, {
            editorconfig: true
          });

          const prettierFileInfo = prettier.getFileInfo.sync(filepath, {
            ignorePath: ".prettierignore"
          });

          // Skip if file is ignored using a .prettierignore file
          if (prettierFileInfo.ignored) {
            return;
          }

          const prettierOptions = Object.assign(
            {},
            { parser: "glimmer" },
            prettierRcOptions,
            {
              filepath
            }
          );

          let prettierSource;
          try {
            prettierSource = prettier.format(source, prettierOptions);
          } catch (err) {
            if (!(err instanceof SyntaxError)) {
              throw err;
            }

            let message = "Parsing error: " + err.message;

            // Prettier's message contains a codeframe style preview of the
            // invalid code and the line/column at which the error occured.
            // ESLint shows those pieces of information elsewhere already so
            // remove them from the message
            if (err.codeFrame) {
              message = message.replace(`\n${err.codeFrame}`, "");
            }
            if (err.loc) {
              message = message.replace(/ \(\d+:\d+\)$/, "");
            }

            this.log({
              message,
              line: node.loc && node.loc.start.line,
              column: node.loc && node.loc.start.column,
              source
            });

            return;
          }

          if (source !== prettierSource) {
            const differences = generateDifferences(source, prettierSource);

            differences.forEach(difference => {
              let message = "";
              let { line, column } = getLocFromIndex(
                difference.offset,
                this.source
              );

              switch (difference.operation) {
                case INSERT:
                  message = `Insert \`${showInvisibles(
                    difference.insertText
                  )}\``;
                  break;
                case DELETE:
                  message = `Delete \`${showInvisibles(
                    difference.deleteText
                  )}\``;
                  break;
                case REPLACE:
                  message = `Replace \`${showInvisibles(
                    difference.deleteText
                  )}\` with \`${difference.insertText}\``;
                  break;
              }

              this.log({ message, line, column, source });
            });
          }
        }
      }
    };
  }
};
