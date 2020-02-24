importScripts("/precache-manifest.004ff05fa0b52ffb4b07011a6f0274e9.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

/**
 * For caching and offline usage
 * Author: Tirthamouli Baidya
 */

/* eslint-disable no-undef */
workbox.core.setCacheNameDetails({ prefix: "pvr" });

self.addEventListener("message", event => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

// For live route caching
workbox.routing.registerRoute(
  /^/,
  new workbox.strategies.StaleWhileRevalidate()
);

