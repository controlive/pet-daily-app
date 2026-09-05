// 缓存版本号（每次修改页面后记得改这个数字）
const CACHE_NAME = 'pet-checkin-v1';

// 需要缓存的文件列表
const urlsToCache = [
  '.',
  'index.html',
  'manifest.json',
  'icon-192.png',
  'icon-512.png'
];

// 安装时缓存文件
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// 拦截网络请求，优先从缓存读取
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

// 更新缓存
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    })
  );
});