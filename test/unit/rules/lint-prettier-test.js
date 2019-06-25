const generateRuleTests = require("../../helpers/rule-test-harness");

generateRuleTests({
  name: "prettier",

  good: [
    {
      config: true,
      path: "test/unit/files/valid/empty.hbs"
    },
    {
      config: true,
      path: "test/unit/files/invalid/block-disabled-one.hbs"
    },
    {
      config: true,
      path: "test/unit/files/invalid/block-disabled-all.hbs"
    }
  ],

  bad: [
    {
      config: true,
      path: "test/unit/files/valid/dummy.hbs",
      result: {
        moduleId: "layout.hbs",
        message: "Delete `⏎}`",
        line: 1,
        column: 34,
        source: "{{#my-component}}{{/my-component}}\n"
      }
    },
    {
      config: true,
      path: "test/unit/files/valid/block.hbs",
      result: {
        moduleId: "layout.hbs",
        message: "Delete `⏎}`",
        line: 1,
        column: 4,
        source: "test\n"
      }
    },
    {
      config: true,
      path: "test/unit/files/invalid/block.hbs",
      result: {
        moduleId: "layout.hbs",
        message:
          "Replace `⏎⏎test⏎⏎{{/my-component}}⏎` with `test{{/my-component}}}`",
        line: 1,
        column: 17,
        source: "{{#my-component}}\n\ntest\n\n{{/my-component}}\n"
      }
    },
    {
      config: true,
      path: "test/unit/files/invalid/lines.hbs",
      result: {
        moduleId: "layout.hbs",
        message: "Replace `⏎{{/my-component}}⏎` with `{{/my-component}}}`",
        line: 2,
        column: 7,
        source:
          '{{#my-component class="class1 class2"}}\n  test\n\n{{/my-component}}\n'
      }
    }
  ]
});
