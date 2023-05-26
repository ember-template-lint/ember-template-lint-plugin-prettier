import { generateRuleTests } from "ember-template-lint";
import plugin from "../../../ember-template-lint-plugin-prettier.js";

generateRuleTests({
  name: "prettier",

  groupMethodBefore: beforeEach,
  groupingMethod: describe,
  testMethod: it,
  plugins: [plugin],
  config: true,

  good: [
    ``,
    `{{! template-lint-disable prettier}}
{{#my-component}}

test

{{/my-component}}`,
    `{{! template-lint-disable }}
{{#my-component}}

test

{{/my-component}}`,
  ],

  bad: [
    {
      template: "{{#my-component}}{{/my-component}}\n",
      fixedTemplate: "{{#my-component}}{{/my-component}}",
      result: {
        message: "Delete `⏎`",
        line: 1,
        column: 34,
        endLine: 1,
        endColumn: 35,
        source: "{{#my-component}}{{/my-component}}\n",
        isFixable: true,
      },
    },
    {
      config: {
        singleQuote: true,
      },
      template: `<div data-foo
 data-bar="lol"
      some-other-thing={{haha-morethaneightychars}}>
</div>`,
      fixedTemplate: `<div data-foo data-bar='lol' some-other-thing={{haha-morethaneightychars}}>
</div>`,
      result: {
        message: "Replace `⏎·data-bar=\"lol\"⏎·····` with `·data-bar='lol'`",
        line: 1,
        column: 13,
        endLine: 3,
        endColumn: 5,
        source: `<div data-foo
 data-bar="lol"
      some-other-thing={{haha-morethaneightychars}}>
</div>`,
        isFixable: true,
      },
    },
    {
      template: "test\n",
      fixedTemplate: "test",
      result: {
        message: "Delete `⏎`",
        line: 1,
        column: 4,
        endLine: 1,
        endColumn: 5,
        source: "test\n",
        isFixable: true,
      },
    },
    {
      template: `{{#my-component}}

test

{{/my-component}}`,
      fixedTemplate: `{{#my-component}}

  test

{{/my-component}}`,
      result: {
        message: "Insert `··`",
        line: 2,
        column: 1,
        endLine: 2,
        endColumn: 1,
        source: "{{#my-component}}\n\ntest\n\n{{/my-component}}",
        isFixable: true,
      },
    },
    {
      template: `{{#my-component class="class1 class2"}}
  test 

{{/my-component}}`,
      fixedTemplate: `{{#my-component class="class1 class2"}}
  test

{{/my-component}}`,
      result: {
        message: "Delete `·`",
        line: 2,
        column: 6,
        endLine: 2,
        endColumn: 7,
        source:
          '{{#my-component class="class1 class2"}}\n  test \n\n{{/my-component}}',
        isFixable: true,
      },
    },
  ],
});
