# ember-template-lint-plugin-prettier 👋

It uses [Prettier](https://github.com/prettier/prettier) to lint your handlebars templates with [ember-template-lint](https://github.com/ember-template-lint/ember-template-lint). The plugin defines a - single - rule. That rule will compare your code with Prettier's output.

⚠️ Prettier support for handlebars is still experimental ⚠️

Here is an output example:

```handlebars
error: Replace `New·Addons</h1>` with <h1>⏎New Addons⏎</h1>` (prettier/prettier) at app/templates/lists/new-addons.hbs:2:5:
  1 | <div class="addons-index">
> 2 |   <h1>New Addons</h1>
  3 |   {{addon-list addons=model}}
  4 | </div>
```

> `./node_modules/.bin/ember-template-lint app/templates/lists/new-addons.hbs` (code from [emberobserver](https://github.com/emberobserver/client)).

## Install

```sh
yarn add -D prettier ember-template-lint-plugin-prettier
```

As peerDependencies, `prettier` and `ember-template-lint` will have to be installed in your project. Prettier version local to the project will be used (not any global one!).

Also, this plugin doesn't come with a recommended set of rules (that you often provide in the `extends` config key). At least for today! You'll have to enable them manually (see "Recommended configuration").

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
    "self-closing-void-elements": false,
  },
};
```

## Warnings

#### General

Handlebars support is still experimental in Prettier! So, between Prettier upgrades, you'll probably find out that your code is formatted in a slightly different way. Also, a few bug fixes are in progress. You can follow the work in progress [here](https://github.com/jgwhite/prettier/issues/1).

#### Special warning: bare strings in templates (ie. )

Are you're using bare strings in your templates? If you're unsure, you can lint your templates against [this rule](https://github.com/ember-template-lint/ember-template-lint/blob/master/docs/rule/no-bare-strings.md).

If you do so, you implicitly rely on your templates whitespaces. As such, you most probably want to wait before using this package. Indeed, whitespaces / newlines handling is still not 100% settled in Prettier.

## Tips

You may want to define these two scripts in your package.json:

```json
{
  "scripts": {
    "lint:hbs": "ember-template-lint .",
    "format:hbs": "prettier **/*.hbs --write --parser=glimmer"
  }
}
```

`yarn lint:hbs` is useful in CI. `yarn format:hbs` will let you format your templates if your editor does not have this feature yet.

## Examples

[Here is an early example](https://github.com/dcyriller/client/pull/1) of usage in [emberobserver](https://emberobserver.com/) source code. As you can see, it's illustrating the whitespaces / newlines issue with bare strings.

[Here is another early example](https://github.com/dcyriller/ember-osf-web/pull/1) of usage in [ember-osf-web](https://github.com/CenterForOpenScience/ember-osf-web).

## Credits

This plugin has been inspired by [the prettier plugin](https://github.com/prettier/eslint-plugin-prettier) for Eslint.

## Contributing

See [CONTRIBUTING.md](https://github.com/dcyriller/ember-template-lint-plugin-prettier/blob/master/CONTRIBUTING.md)
