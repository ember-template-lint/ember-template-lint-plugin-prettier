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
      fixedTemplate: "{{#my-component}}{{/my-component}}",
      result: {
        moduleId: "layout",
        message: "Delete `⏎`",
        line: 1,
        column: 34,
        source: "{{#my-component}}{{/my-component}}\n",
        isFixable: true
      }
    },
    {
      config: true,
      template: `<div data-foo
 data-bar="lol"
      some-other-thing={{haha-morethaneightychars}}>
</div>`,
      fixedTemplate: `<div data-foo
 data-bar="lol"
  some-other-thing={{haha-morethaneightychars}}>
</div>`,
      result: {
        moduleId: "layout",
        message: 'Replace `⏎·data-bar="lol"⏎·····` with ` data-bar="lol"`',
        line: 1,
        column: 13,
        source: `<div data-foo
 data-bar="lol"
      some-other-thing={{haha-morethaneightychars}}>
</div>`,
        isFixable: true
      }
    },
    {
      config: true,
      template: "test\n",
      fixedTemplate: "test",
      result: {
        moduleId: "layout",
        message: "Delete `⏎`",
        line: 1,
        column: 4,
        source: "test\n",
        isFixable: true
      }
    },
    {
      config: true,
      template: `{{#my-component}}

test

{{/my-component}}`,
      fixedTemplate: `{{#my-component}}
  test
{{/my-component}}`,
      result: {
        moduleId: "layout",
        message: "Replace `⏎test⏎` with `  test`",
        line: 1,
        column: 18,
        source: "{{#my-component}}\n\ntest\n\n{{/my-component}}",
        isFixable: true
      }
    },
    {
      config: true,
      template: `{{#my-component class="class1 class2"}}
  test

{{/my-component}}`,
      fixedTemplate: `{{#my-component class="class1 class2"}}
  test
{{/my-component}}`,
      result: {
        moduleId: "layout",
        message: "Delete `⏎`",
        line: 2,
        column: 7,
        source:
          '{{#my-component class="class1 class2"}}\n  test\n\n{{/my-component}}',
        isFixable: true
      }
    }
  ]
});
