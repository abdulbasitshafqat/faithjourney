# Android upload-key backup

Back up both of these files together in a secure private location before the first Google Play release:

- `android/app/upload-keystore.jks`
- `android/keystore.properties`

Do not email them, upload them to a public drive, or commit them to Git. Both paths are intentionally ignored by this repository.

Google Play App Signing should manage the production app-signing key. This local keystore is the upload key used to authenticate future bundles sent to Play Console.
