const generateRuleTests = require("ember-template-lint/lib/helpers/rule-test-harness");
const plugin = require("../../../ember-template-lint-plugin-prettier");

generateRuleTests({
  name: "prettier",

  groupMethodBefore: beforeEach,
  groupingMethod: describe,
  testMethod: it,
  plugins: [plugin],

  good: [
    ``,
    `{{! template-lint-disable prettier}}
{{#my-component}}

test

{{/my-component}}`,
    `{{! template-lint-disable }}
{{#my-component}}

test

{{/my-component}}`
  ],

  bad: [
    {
      config: true,
      template: "{{#my-component}}{{/my-component}}\n",
      result: {
        moduleId: "layout.hbs",
        message: "Delete `⏎`",
        line: 1,
        column: 34,
        source: "{{#my-component}}{{/my-component}}\n"
      }
    },
    {
      config: true,
      template: "test\n",
      result: {
        moduleId: "layout.hbs",
        message: "Delete `⏎`",
        line: 1,
        column: 4,
        source: "test\n"
      }
    },
    {
      config: true,
      template: `{{#my-component}}

test

{{/my-component}}`,
      result: {
        moduleId: "layout.hbs",
        message: "Replace `⏎⏎test⏎⏎` with `test`",
        line: 1,
        column: 17,
        source: "{{#my-component}}\n\ntest\n\n{{/my-component}}"
      }
    },
    {
      config: true,
      template: `{{#my-component class="class1 class2"}}
  test

{{/my-component}}`,
      result: {
        moduleId: "layout.hbs",
        message: "Delete `⏎`",
        line: 2,
        column: 7,
        source:
          '{{#my-component class="class1 class2"}}\n  test\n\n{{/my-component}}'
      }
    }
  ]
});
