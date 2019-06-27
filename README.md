# ember-template-lint-plugin-prettier 👋

It uses [Prettier](https://github.com/prettier/prettier) to lint your handlebars templates with [ember-template-lint](https://github.com/ember-template-lint/ember-template-lint). The plugin defines a - single - rule. That rule will compare your code with Prettier's output.

Applying this rule in CI, with a `yarn lint:hbs` script for instance and you'll end up with consistent templates.

Here is an output example:

```js
🚧 WIP
```

> `./node_modules/.bin/ember-template-lint .` (code from []()).

## Install

```sh
yarn add -D prettier ember-template-lint-plugin-prettier
```

As peerDependencies `prettier` and `ember-template-lint` will have to be installed as well in your project. Prettier version local to the project will be used (not any global one!).

Also, this plugin doesn't come with a recommended set of rules (that you often provide in the `extends` config key). At least of today! You'll have to enable them manually (see [Usage](#Usage)).

## Recommended configuration

You can merge your existing `.template-lintrc.js` configuration with this object:
```
module.exports = {
  plugins: ["ember-template-lint-plugin-prettier"],

  rules: {
    prettier: true, // turn this plugin's rule on

     // if you use ember-template-lint's recommended set of rules
     // through `extends: "recommended"`,
     // these two rules need to be disabled
     // to let Prettier handle formatting
    "block-indentation": false,
    "self-closing-void-elements": false
  },
};
```

## Warnings

We use this in production at [Qonto](https://qonto.eu).

But Handlebars support is still experimental in Prettier! So, between Prettier upgrades, you'll probably find out that your code is formatted in a slightly different way. Also, a few bug fixes are in progress. You can follow the work in progress [here](https://github.com/jgwhite/prettier/issues/1).

Are you're using bare strings in your templates? If you do so, you implicitely relie on your templates whitespaces. As such, you most probably want to wait before using this package. Indeed, whitespaces / newlines handling is still not 100% settled in Prettier.

## Details

[Here an early example](https://github.com/emberobserver/client/pull/163) of usage in ember-oberver client.

## Credits

This plugin has been inspired by [the prettier plugin](https://github.com/prettier/eslint-plugin-prettier) for Eslint.

## Contributing

See [CONTRIBUTING.md](https://github.com/dcyriller/ember-template-lint-plugin-prettier/blob/master/CONTRIBUTING.md)
