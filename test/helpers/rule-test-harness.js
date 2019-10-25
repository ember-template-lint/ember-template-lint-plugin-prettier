// extrated from:
// https://github.com/ember-template-lint/ember-template-lint/blob/v1.3.0/lib/helpers/rule-test-harness.js
const plugin = require("../../ember-template-lint-plugin-prettier");

const assert = require("assert");

const Linter = require("ember-template-lint");

function parseMeta(item) {
  let meta =
    item !== undefined && typeof item === "object" && item.meta
      ? item.meta
      : {};
  meta.moduleId = meta.moduleId || "layout.hbs";

  return meta;
}

function generateRuleTests({
  bad = [],
  good = [],
  name,
  groupingMethod,
  groupMethodBefore,
  testMethod,
  skipDisabledTests,
  config: passedConfig
}) {
  groupingMethod(name, function() {
    let linter, config, meta;

    function verify(template) {
      linter.config.rules[name] = config;
      return linter.verify({ source: template, moduleId: meta.moduleId });
    }

    groupMethodBefore(function() {
      let fullConfig = {
        plugins: [plugin],
        rules: {}
      };
      fullConfig.rules[name] = config = passedConfig;

      meta = null;

      linter = new Linter({
        config: fullConfig
      });
    });

    function parseResult(result) {
      let defaults = {
        severity: 2
      };

      if (!skipDisabledTests) {
        defaults.rule = name;
      }

      if (result.moduleId !== null) {
        defaults.moduleId = "layout.hbs";
      } else {
        delete result.moduleId;
      }

      return Object.assign({}, defaults, result);
    }

    bad.forEach(function(badItem) {
      let template = badItem.template;

      testMethod(
        `logs a message in the console when given \`${template}\``,
        function() {
          let expectedResults = badItem.results || [badItem.result];

          meta = parseMeta(badItem);

          if (badItem.config) {
            config = badItem.config;
          }

          let actual = verify(template);

          if (badItem.fatal) {
            assert.strictEqual(actual.length, 1); // can't have more than one fatal error
            delete actual[0].source; // remove the source (stack trace is not easy to assert)
            assert.deepStrictEqual(actual[0], badItem.fatal);
          } else {
            expectedResults = expectedResults.map(parseResult);

            assert.deepStrictEqual(actual, expectedResults);
          }
        }
      );

      if (!skipDisabledTests) {
        testMethod(
          `passes with \`${template}\` when rule is disabled`,
          function() {
            config = false;
            meta = parseMeta(badItem);
            let actual = verify(template);

            assert.deepStrictEqual(actual, []);
          }
        );
      }
    });

    good.forEach(function(goodItem) {
      let template = goodItem.template;

      testMethod(`passes when given \`${template}\``, function() {
        meta = parseMeta(goodItem);
        let actual;

        if (typeof goodItem === "string") {
          actual = verify(goodItem);
        } else {
          if (goodItem.config !== undefined) {
            config = goodItem.config;
          }

          actual = verify(template);
        }

        assert.deepStrictEqual(actual, []);
      });
    });
  });
}

module.exports = function(options) {
  return generateRuleTests(
    Object.assign({}, options, {
      groupMethodBefore: beforeEach,
      groupingMethod: describe,
      testMethod: it
    })
  );
};
