# How to Build Mobile Apps (.apk / .ipa) for Faith Journey

Since this is a Next.js web application, we can use **Capacitor** to wrap it into a native mobile app.

## Prerequisites

1.  **Node.js** (You already have this).
2.  **Android Studio** (For building Android `.apk` on Windows/Mac).
3.  **Xcode** (For building iOS `.ipa` - **Mac Only**).
    *   *Note: If you are on Windows, you cannot build `.ipa` files locally. You would need a Mac or a cloud build service like Ionic Appflow.*

## Step 1: Install Capacitor

Run these commands in your terminal:

```bash
npm install @capacitor/core @capacitor/cli @capacitor/android @capacitor/ios
npx cap init
```

*   **App Name:** Faith Journey
*   **Package ID:** com.faithjourney.pro (or similar)
*   **Web Dir:** `out` (We will configure Next.js to export to this folder)

## Step 2: Configure Next.js for Mobile Export

We need to tell Next.js to generate a static site that can run locally on a phone without a server.

1.  Open `next.config.ts`.
2.  Add `output: 'export'`.
3.  Add `images: { unoptimized: true }` (Required because there is no image server on the phone).

Example:

```typescript
const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true }
};
```

## Step 3: Build the Web App

```bash
npm run build
```

This will create an `out` folder with your static app.

## Step 4: Add Mobile Platforms

```bash
npx cap add android
npx cap add ios   # Only works on Mac
```

## Step 5: Sync and Build

1.  **Sync:** Copy the `out` folder to the native projects.
    ```bash
    npx cap sync
    ```

2.  **Build Android (.apk):**
    ```bash
    npx cap open android
    ```
    *   This opens Android Studio.
    *   Wait for Gradle sync to finish.
    *   Go to **Build > Build Bundle(s) / APK(s) > Build APK(s)**.
    *   The `.apk` will be generated in `android/app/build/outputs/apk/debug/`.

3.  **Build iOS (.ipa) (Mac Only):**
    ```bash
    npx cap open ios
    ```
    *   This opens Xcode.
    *   Select your target device (or "Any iOS Device (arm64)").
    *   Product > Archive.
    *   Distribute App > Ad Hoc (or App Store).

## Important Notes for Windows Users

*   You **can** build and test the **Android** version entirely on your PC.
*   You **cannot** build the **iOS** version on Windows. You need a friend with a Mac, a Mac in the cloud, or a service like EAS Build or Ionic Appflow.
