/*
 * Native cleanup worker.
 *
 * Capacitor builds disable next-pwa and copy this file into the APK. Devices
 * that installed the original release may still have its Workbox service
 * worker controlling http://localhost. When that worker checks for an update,
 * this replacement removes the legacy caches and unregisters itself so future
 * launches always use the assets bundled with the installed app version.
 *
 * Web deployments enable next-pwa, which replaces this file in the generated
 * web output with the normal offline-capable worker.
 */
self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", (event) => {
    event.waitUntil((async () => {
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map((cacheName) => caches.delete(cacheName)));
        await self.registration.unregister();

        const windows = await self.clients.matchAll({ type: "window" });
        await Promise.all(windows.map((client) => client.navigate(client.url)));
    })());
});
