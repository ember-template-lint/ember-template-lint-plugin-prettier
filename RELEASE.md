# RELEASE

Here are the steps:
1. run these commands
```bash
- yarn version
- git push origin master the-new-tag
- yarn changelog --from=previous-tag >> CHANGELOG.md (manual cleanup)
- npm publish
```
2. Draft a release: https://github.com/dcyriller/ember-template-lint-plugin-prettier/releases/new
