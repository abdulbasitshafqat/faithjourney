import type { NextConfig } from "next";

// next-pwa does not ship TypeScript declarations for its CommonJS factory.
// eslint-disable-next-line @typescript-eslint/no-require-imports
const withPWA = require('next-pwa')({
  dest: 'public',
  // Capacitor ships the static bundle inside the APK. Registering a service worker
  // there can keep stale chunks across Play Store updates and cause a blank startup.
  disable: process.env.NODE_ENV === 'development' || process.env.CAPACITOR_BUILD === 'true',
  register: true,
  skipWaiting: true,
  publicExcludes: ['!data/hadith/**/*'],
});

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default withPWA(nextConfig);

