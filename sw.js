const CACHE = 'studio-v9';
const ASSETS = [
    './', './index.html',
    'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js',
    'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/controls/OrbitControls.js',
    'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/controls/TransformControls.js',
    'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/FBXLoader.js',
    'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/TGALoader.js',
    'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/DDSLoader.js',
    'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js',
    'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/OBJLoader.js',
    'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/MTLLoader.js',
    'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/exporters/GLTFExporter.js',
    'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/exporters/OBJExporter.js',
    'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/environments/RoomEnvironment.js',
    'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/postprocessing/EffectComposer.js',
    'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/postprocessing/RenderPass.js',
    'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/postprocessing/UnrealBloomPass.js',
    'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/utils/BufferGeometryUtils.js',
    'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/geometries/ConvexGeometry.js',
    'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/modifiers/SimplifyModifier.js',
    'https://esm.sh/three-bvh-csg@0.0.17?external=three',
    'https://esm.sh/three-mesh-bvh@0.9.1?external=three',
    'https://esm.sh/three-subdivide@1.0.2?external=three',
];
self.addEventListener('install', e => {
    self.skipWaiting();
    e.waitUntil(caches.open(CACHE).then(c => Promise.all(ASSETS.map(u => c.add(u).catch(() => {})))));
});
self.addEventListener('activate', e => {
    e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== CACHE).map(x => caches.delete(x)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
    if (e.request.method !== 'GET') return;
    e.respondWith(caches.match(e.request).then(cached => {
        if (cached) return cached;
        return fetch(e.request).then(resp => {
            if (resp.ok) caches.open(CACHE).then(c => c.put(e.request, resp.clone())).catch(() => {});
            return resp;
        }).catch(() => e.request.mode === 'navigate' ? caches.match('./index.html') : null);
    }));
});