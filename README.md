# ember-template-lint-plugin-prettier

[![NPM version](https://img.shields.io/npm/v/ember-template-lint-plugin-prettier.svg?style=flat)](https://npmjs.org/package/ember-template-lint-plugin-prettier)

It uses [Prettier](https://github.com/prettier/prettier) to lint your handlebars templates with [ember-template-lint](https://github.com/ember-template-lint/ember-template-lint). The plugin defines a - single - rule. That rule will compare your code with Prettier's output.

Here is an output example:

```handlebars
2:18  error  Replace `·{{@lastName}}··` with `{{@lastName}}`  prettier
  1 | <h1>A title</h1>
> 2 | <p>{{@firstName}}  {{@lastName}}   , welcome!</p>
  3 | <p>Text</p>
```

## Compatibility

- [Node.js](https://nodejs.org/) `^16.0.0 || ^18.0.0 || >=20.0.0`
- [ember-template-lint](https://github.com/ember-template-lint/ember-template-lint/) `>=4.0.0`
- [prettier](https://prettier.io/) `>=3.0.0`

Note: ember-template-lint-plugin-prettier@4 is compatible with older versions of
prettier, in particular prettier@2.

Note2: ember-template-lint-plugin-prettier@3 is compatible with older versions
of ember-template-lint, in particular ember-template-lint@3.

## Install

```sh
yarn add -D prettier ember-template-lint-plugin-prettier
```

As peerDependencies, `prettier` and `ember-template-lint` will have to be installed in your project. Prettier version local to the project will be used (not any global one!).

## Recommended configuration

A recommended configuration is available. To use it, merge the following object
to your `.template-lintrc.js` file:

```js
module.exports = {
  plugins: ["ember-template-lint-plugin-prettier"],

  extends: ["recommended", "ember-template-lint-plugin-prettier:recommended"]
};
```

The recommended set will apply [these rules](https://github.com/ember-template-lint/ember-template-lint-plugin-prettier/blob/v1.1.0-beta.0/lib/config/recommended.js).

## Configuration

Prettier can be configured via [standard prettier config files](https://prettier.io/docs/en/configuration.html).

## Credits

This plugin has been inspired by [the prettier plugin](https://github.com/prettier/eslint-plugin-prettier) for Eslint.

## Contributing

See [CONTRIBUTING.md](https://github.com/ember-template-lint/ember-template-lint-plugin-prettier/blob/main/CONTRIBUTING.md)
