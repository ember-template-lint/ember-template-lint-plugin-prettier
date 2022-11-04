# ember-template-lint-plugin-prettier

It uses [Prettier](https://github.com/prettier/prettier) to lint your handlebars templates with [ember-template-lint](https://github.com/ember-template-lint/ember-template-lint). The plugin defines a - single - rule. That rule will compare your code with Prettier's output.

Here is an output example:

```handlebars
error: Replace `New·Addons</h1>` with <h1>⏎New Addons⏎</h1>` (prettier/prettier) at app/templates/lists/new-addons.hbs:2:5:
  1 | <div class="addons-index">
> 2 |   <h1>New Addons</h1>
  3 |   {{addon-list addons=model}}
  4 | </div>
```

> `./node_modules/.bin/ember-template-lint app/templates/lists/new-addons.hbs` (code from [emberobserver](https://github.com/emberobserver/client)).

## Compatibility

- [Node.js](https://nodejs.org/) `^12.22.0 || ^14.17.0 || >=16.0.0`
- [ember-template-lint](https://github.com/ember-template-lint/ember-template-lint/) `>=4.0.0`
- [prettier](https://prettier.io/) `>=1.18.1`

Note: ember-template-lint-plugin-prettier@3 is compatible with older versions of
ember-template-lint, in particular ember-template-lint@3.

## Install

```sh
yarn add -D prettier ember-template-lint-plugin-prettier
```

As peerDependencies, `prettier` and `ember-template-lint` will have to be installed in your project. Prettier version local to the project will be used (not any global one!).

## Recommended configuration

A recommended configuration is available. To use it, merge the following object
to your `.template-lintrc.js` file:

```
module.exports = {
  plugins: ["ember-template-lint-plugin-prettier"],

  extends: ["recommended", "ember-template-lint-plugin-prettier:recommended"]
};
```

The recommended set will apply [these rules](https://github.com/ember-template-lint/ember-template-lint-plugin-prettier/blob/v1.1.0-beta.0/lib/config/recommended.js).

## Tips

You may want to define these two scripts in your package.json:

```json
{
  "scripts": {
    "lint:hbs": "ember-template-lint .",
    "format:hbs": "prettier **/*.hbs --write"
  }
}
```

`yarn lint:hbs` is useful in CI. `yarn format:hbs` will let you format your templates if your editor does not have this feature yet.

## Credits

This plugin has been inspired by [the prettier plugin](https://github.com/prettier/eslint-plugin-prettier) for Eslint.

## Contributing

See [CONTRIBUTING.md](https://github.com/ember-template-lint/ember-template-lint-plugin-prettier/blob/main/CONTRIBUTING.md)
