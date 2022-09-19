# Development

## Draft a release with binaries

First, make sure you edit the version in `package.json` and `release/app/package.json`.

- Run `npm i` at the project root
- `git tag vX.Y.Z` (with `vX.Y.Z` matching the version in `package.json`)
- `git push && git push --tags`

The github action will then release a draft release with the binaries.

## Remove a tag

- `git tag -d vX.Y.Z`
- `git push origin :vX.Y.Z`

## Mac OS certificates

Follow instructions in this [blog post](https://samuelmeuli.com/blog/2019-04-07-packaging-and-publishing-an-electron-app/#code-signing)
to generate the certificates and the [instructions for the github action](https://github.com/samuelmeuli/action-electron-builder#code-signing)
we are using to export the certificates.

To set up the `APPLE_ID` and `APPLE_ID_PASS` variables:

- `APPLE_ID` is your Apple account
- `APPLE_ID_PASSWORD` is a password generated on the [Apple ID page](https://appleid.apple.com/account/manage) in App-Specific Passwords

## Publishing on the App Store

**IMPORTANT**: make sure you have Xcode installed with `altool`.

- Set `APPLE_ID` and `APPLE_ID_PASSWORD` to the values you need. (use the app-specific password, not your Apple Store password)
- run `npm run package-mac-appstore`

## Contact

If you have any question, please ask on our [Slack channel](https://join.slack.com/t/codigahq/shared_invite/zt-9hvmfwie-9BUVFwZDwvpIGlkHv2mzYQ)
