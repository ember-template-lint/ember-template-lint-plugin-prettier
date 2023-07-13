import { showInvisibles, generateDifferences } from "prettier-linter-helpers";

import getLocFromIndex from "../utils/get-loc-from-index.js";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

const { INSERT, DELETE, REPLACE } = generateDifferences;

let prettier;

import { Rule, recast } from "ember-template-lint";

function isFile(loc) {
  return loc.start && loc.start.line === 1 && loc.start.column === 0;
}

export default class Prettier extends Rule {
  constructor(options) {
    super(options);
    this.filePath = options.filePath;
  }

  getPrettierOptions() {
    let filepath = this.filePath;

    if (!prettier) {
      // Prettier is expensive to load, so only load it if needed.
      prettier = require("@prettier/sync");
    }

    const prettierRcOptions = prettier.resolveConfig(filepath, {
      editorconfig: true,
    });

    return Object.assign({}, { parser: "glimmer" }, prettierRcOptions, {
      filepath,
    });
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
          const prettierOptions = this.getPrettierOptions();

          const prettierFileInfo = prettier.getFileInfo(
            prettierOptions.filepath,
            {
              ignorePath: ".prettierignore",
            },
          );

          // Skip if file is ignored using a .prettierignore file
          if (prettierFileInfo.ignored) {
            return;
          }

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
              // As of ember-template-lint@3.8.0, passing line and column whose values match the
              // reference node's line and column isn't required (it uses the node's line/column).
              // In order to support older versions (> 3.8.0), we're keeping these properties here.
              line: node.loc && node.loc.start.line,
              column: node.loc && node.loc.start.column,
              node,
              source,
            });

            return;
          }

          if (source !== prettierSource) {
            if (this.mode === "fix") {
              node.body = recast.parse(prettierSource).body;
              return;
            }

            const differences = generateDifferences(source, prettierSource);

            differences.forEach((difference) => {
              let message = "";
              // `difference.offset` is the offset from the beginning
              // of the template, ie. it is the index
              let { offset, deleteText = "" } = difference;
              let { line, column } = getLocFromIndex(offset, this.source);
              let { line: endLine, column: endColumn } = getLocFromIndex(
                offset + deleteText.length,
                this.source,
              );

              switch (difference.operation) {
                case INSERT:
                  message = `Insert \`${showInvisibles(
                    difference.insertText,
                  )}\``;
                  break;
                case DELETE:
                  message = `Delete \`${showInvisibles(
                    difference.deleteText,
                  )}\``;
                  break;
                case REPLACE:
                  message = `Replace \`${showInvisibles(
                    difference.deleteText,
                  )}\` with \`${showInvisibles(difference.insertText)}\``;
                  break;
              }

              this.log({
                message,
                line,
                column,
                endLine,
                endColumn,
                source,
                isFixable: true,
              });
            });
          }
        },
      },
    };
  }
}
