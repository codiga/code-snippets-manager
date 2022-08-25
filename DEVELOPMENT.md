# Development

## Draft a release with binaries

- `git tag vX.Y.Z`
- `git push && git push --tags`

The github action will then release a draft release with the binaries.

## Remove a tag

- `git tag -d vX.Y.Z`
- `git push origin :vX.Y.Z`
