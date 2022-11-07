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
- `APPLE_ID_PASS` is a password generated on the [Apple ID page](https://appleid.apple.com/account/manage) in App-Specific Passwords

## Uploading to the Microsoft Store

Detailed step-by-step instructions can be found in this [blog post](https://www.codiga.io/blog/submit-electron-app-to-microsoft-store/).

- Download the `.exe` file from [our latest releases](https://github.com/codiga/code-snippets-manager/releases/latest)
- Download the [MSIX Packaging Tool](https://apps.microsoft.com/store/detail/msix-packaging-tool/9N5LW3JBCXKF)
- Update the "Package Information" per the blog post instructions above
- Create your new `.msix` file
- Upload your new file and make any necessary changes to the submission
- Submit your new submission

## Contact

If you have any question, please ask on our [Slack channel](https://join.slack.com/t/codigahq/shared_invite/zt-9hvmfwie-9BUVFwZDwvpIGlkHv2mzYQ)
