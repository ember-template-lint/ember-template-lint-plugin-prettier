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

  plugins: ['ember-template-lint-plugin-prettier'],

  rules: {
    prettier: true,
    'no-abstract-roles': true,
    'no-obsolete-elements': true,
    'no-positive-tabindex': true,
  },
};
```
