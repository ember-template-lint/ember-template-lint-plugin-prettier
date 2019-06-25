# ember-template-lint-plugin-prettier 👋

## A prettier plugin for ember-template-lint

It runs [Prettier](https://github.com/prettier/prettier) as a rule. Then it reports differences as individual [ember-template-lint](https://github.com/ember-template-lint/ember-template-lint) issues.

## Install

```sh
yarn add -D prettier ember-template-lint-plugin-prettier
```

The project's Prettier version will then be used by the prettier rule.

Note that `prettier` and (of course) `ember-template-lint` are required as peerDependencies of this package.

Also, this plugin don't provide a recommended set of rules (that you often provide in the `extends` config key). You'll have to enable them manually (see [Usage](#Usage)).

## Usage

```
module.exports = {
  extends: 'recommended',

  plugins: ['ember-template-lint-plugin-prettier'],

  rules: {
    prettier: true, // turn this plugin's rule on
    "eol-last": false, // or `"eol-last": "never"`
    "self-closing-void-elements": false // idem
  },
};
```

## Details

The two ember-template-lint rules mentioned above are conflicting with Prettier formatting if you turn them on. More details there:

- `eol-last`: [a PR is opened](https://github.com/prettier/prettier/pull/6243) on Prettier to append newlines to handelbars files. Prettier does that for every other language.
- `self-closing-void-elements` rule could be removed from the set of recommended rules [according to this issue](https://github.com/ember-template-lint/ember-template-lint/issues/691).

I have tried the plugin on [ember-observer](https://www.emberobserver.com/): to lint / format / lint the templates. I don't have other issue. But this list could probably be appeneded if we were formatting against an other code base!

## Credits

This plugin has been inspired by [the prettier plugin](https://github.com/prettier/eslint-plugin-prettier) for Eslint.
