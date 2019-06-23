# ember-template-lint-plugin-prettier 👋

## A prettier plugin for ember-template-lint

It runs [Prettier](https://github.com/prettier/prettier) as a rule. Then it reports differences as individual [ember-template-lint](https://github.com/ember-template-lint/ember-template-lint) issues.

## Install

```sh
yarn add -D prettier ember-template-lint-plugin-prettier
```

## Usage

```
module.exports = {
  extends: 'recommended',

  plugins: ['prettier'],

  rules: {
    prettier: true,
    'no-abstract-roles': true,
    'no-obsolete-elements': true,
    'no-positive-tabindex': true,
  },
};
```

## TODO

- Fix eof in prettier: [a PR is opened](https://github.com/prettier/prettier/pull/6243)
- A recommended ember-template-lint rule is conflicting with prettier formatting: `self-closing-void-elements`. [According to this issue](https://github.com/ember-template-lint/ember-template-lint/issues/691), it should find a solution.

I have been using the plugin to lint / format / lint [ember-observer](https://www.emberobserver.com/). I don't have additional issues. But this list could probably be appeneded if we were formatting against an other code base!

## Credits

This plugin has been inspired by [the eslint plugin](https://github.com/prettier/eslint-plugin-prettier) for Prettier.
