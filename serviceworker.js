var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
    '/',
    '/fallback.json',
    '/css/main.css',
    '/js/jquery.min.js',
    '/js/main.js',
    '/images/cat.jpg'
]


self.addEventListener('install', function (event) {

    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('in install ServiceWorker... cache opened!');
            return cache.addAll(urlsToCache);
        })
    );

});



self.addEventListener('activate', function (event) {

    //var cacheWhiteList = ['pages-cache-v1', 'blog-posts-cache-v1'];

    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                /*
                cacheNames.map(function(cacheName) {
                    if (cacheWhiteList.indexOf(cacheName) === -1) {
                        return cache.delete(cacheName);
                    }
                })
                */
                cacheNames.filter(function (cacheName) {
                    return cacheName != CACHE_NAME;
                }).map(function (cacheName) {
                    return caches.delete(cacheName)
                })
            );
        })
    );

});

/*
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
});
*/

self.addEventListener('fetch', function (event) {

    var request = event.request;
    var url = new URL(request.url);

    //pisahkan request API dan Internal
    if (url.origin === location.origin) {

        event.respondWith(
            caches.match(request).then(function (response) {
                return response || fetch(request);
            })
        );
    } else {
        event.respondWith(
            caches.open('products-cache').then(function (cache) {
                return fetch(request).then(function (liveResponse) {
                    cache.put(request, liveResponse.clone())
                    return liveResponse
                }).catch(function () {
                    return caches.match(request).then(function (response) {
                        if (response) return response
                        return caches.match('/fallback.json')
                    })
                })
            })
        );
    }
});
