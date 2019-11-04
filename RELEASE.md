# releasing

Here are the steps:
- yarn version
- git push origin master the-new-tag
- yarn changelog --from=previous-tag >> CHANGELOG.md (manual cleanup)
