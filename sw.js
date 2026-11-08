/* Blersjda Madness service worker: offline app shell + runtime caching.
   Multiplayer traffic (WebSocket / worker long-polling) is never touched. */
const VERSION = 'v8';
const SHELL = 'bl-shell-' + VERSION;
const RUNTIME = 'bl-runtime-' + VERSION;
const MEDIA = 'bl-media-' + VERSION;
const SHELL_URLS = [
  './', './index.html', './manifest.webmanifest',
  './icons/icon-192.png', './icons/icon-512.png', './icons/maskable-512.png', './icons/apple-touch-icon.png', './icons/favicon.svg', './icons/favicon.ico', './icons/monochrome-192.png',
  'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/react/18.3.1/umd/react.production.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/umd/react-dom.production.min.js'
];
const SOUNDS = ['draw.wav', 'gong.wav', 'music.wav', 'menu.wav', 'voting.wav', 'squelchy.wav', 'victory.wav'];
const MEDIA_MAX = 160;

self.addEventListener('install', (e) => {
  e.waitUntil((async () => {
    const c = await caches.open(SHELL);
    // Best effort: one missing file must not block install.
    await Promise.all(SHELL_URLS.map(u => c.add(new Request(u, u.startsWith('http') ? { mode: 'cors' } : {})).catch(() => {})));
    const m = await caches.open(MEDIA);
    await Promise.all(SOUNDS.map(u => m.add(u).catch(() => {})));
  })());
});

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    const keep = [SHELL, RUNTIME, MEDIA];
    for (const k of await caches.keys()) if (k.startsWith('bl-') && !keep.includes(k)) await caches.delete(k);
    if (self.registration.navigationPreload) await self.registration.navigationPreload.enable().catch(() => {});
    await self.clients.claim();
  })());
});

self.addEventListener('message', (e) => {
  if (e.data === 'SKIP_WAITING') self.skipWaiting();
  if (e.data === 'CLEAR_CACHES') e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith('bl-')).map(k => caches.delete(k)))));
});

async function trim(name, max) {
  const c = await caches.open(name), ks = await c.keys();
  for (let i = 0; i < ks.length - max; i++) await c.delete(ks[i]);
}

// Serve Range requests (audio/video seeking on Android) out of the cache.
async function rangeFromCache(req, res) {
  const buf = await res.arrayBuffer(), m = /bytes=(\d*)-(\d*)/.exec(req.headers.get('range') || '');
  const size = buf.byteLength;
  let s = m && m[1] ? +m[1] : 0, en = m && m[2] ? +m[2] : size - 1;
  if (m && !m[1] && m[2]) { s = Math.max(0, size - +m[2]); en = size - 1; }
  en = Math.min(en, size - 1);
  return new Response(buf.slice(s, en + 1), { status: 206, statusText: 'Partial Content', headers: { 'Content-Type': res.headers.get('Content-Type') || 'audio/wav', 'Content-Range': `bytes ${s}-${en}/${size}`, 'Content-Length': String(en - s + 1), 'Accept-Ranges': 'bytes' } });
}

async function cacheFirst(req, cacheName, max) {
  const c = await caches.open(cacheName);
  let hit = await c.match(req, { ignoreSearch: true });
  if (!hit) {
    try {
      const net = await fetch(req.headers.has('range') ? new Request(req.url) : req);
      if (net && net.ok && net.status === 200) { c.put(req.url, net.clone()); if (max) trim(cacheName, max); hit = net; }
      else return net;
    } catch (err) { return Response.error(); }
  }
  if (req.headers.has('range')) return rangeFromCache(req, hit.clone());
  return hit;
}

async function staleWhileRevalidate(req, cacheName) {
  const c = await caches.open(cacheName), hit = await c.match(req);
  const net = fetch(req).then(r => { if (r && (r.ok || r.type === 'opaque')) c.put(req, r.clone()); return r; }).catch(() => null);
  return hit || (await net) || Response.error();
}

async function navigate(e) {
  const c = await caches.open(SHELL);
  try {
    const pre = e.preloadResponse && await e.preloadResponse;
    const net = pre || await Promise.race([fetch(e.request), new Promise((_, rej) => setTimeout(rej, 4000))]);
    if (net && net.ok) { c.put('./index.html', net.clone()); return net; }
  } catch (err) {}
  return (await c.match('./index.html')) || (await c.match('./')) || new Response('Offline. Open the app once online first.', { status: 503, headers: { 'Content-Type': 'text/plain' } });
}

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (/workers\.dev$/.test(url.hostname) || url.hostname === 'api.ipify.org' || url.protocol === 'ws:' || url.protocol === 'wss:') return; // live game traffic
  if (req.mode === 'navigate') { e.respondWith(navigate(e)); return; }
  if (url.origin === location.origin) {
    if (/\.(wav|mp3|ogg|m4a|webm|mp4)$/i.test(url.pathname)) { e.respondWith(cacheFirst(req, MEDIA, MEDIA_MAX)); return; }
    if (/\.(png|jpe?g|webp|gif|svg|ico|woff2?)$/i.test(url.pathname)) { e.respondWith(cacheFirst(req, RUNTIME, 400)); return; }
    e.respondWith(staleWhileRevalidate(req, SHELL)); return;
  }
  if (/cdnjs\.cloudflare\.com|cdn\.tailwindcss\.com|unpkg\.com|fonts\.(googleapis|gstatic)\.com/.test(url.hostname)) e.respondWith(staleWhileRevalidate(req, RUNTIME));
});

self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  e.waitUntil((async () => {
    const all = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const c of all) { if ('focus' in c) return c.focus(); }
    return self.clients.openWindow('./?source=notification');
  })());
});
