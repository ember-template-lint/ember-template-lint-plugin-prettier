const generateRuleTests = require('../../helpers/rule-test-harness');

generateRuleTests({
  name: 'prettier',

  good: ['test', '{{#my-component}}{{/my-component}}'],

  // bad: [
  //   {
  //     template: 'test\n',

  //     result: {
  //       moduleId: 'layout.hbs',
  //       message: 'template must not end with newline',
  //       line: 1,
  //       column: 0,
  //       source: 'test',
  //     },
  //   },
  //   {
  //     template: '{{#my-component}}\n\n\n' + '  test\n\n\n' + '{{/my-component}}',

  //     result: {
  //       moduleId: 'layout.hbs',
  //       message: 'template cannot end with newline',
  //       line: 1,
  //       column: 0,
  //       source: '{{#my-component}}\n' + '  test\n' + '{{/my-component}}\n',
  //     },
  //   },
  // ],
});
