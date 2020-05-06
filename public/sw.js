const CACHE_STATIC_NAME = 'static-v1';
const CACHE_DYNAMIC_NAME = 'dynamic-v1';

const CACHE_DYNAMIC_LIMIT = 100;


function clearCache(cacheName, numberItems) {
    caches.open(cacheName).then(cache => {
        return cache.keys()
            .then(keys => {

                if (keys.length > numberItems) {
                    cache.delete(keys[0])
                        .then(clearCache(cacheName, numberItems));
                }
            });
    });
}


self.addEventListener('install', e => {


    const cacheProm = caches.open(CACHE_STATIC_NAME).then(cache => {

        return cache.addAll([
            '/',
            '/index.html',
            '/404.html',
            '/offline.html',

            '/img/about/shap1.png',
            '/img/about/shap2.png',
            '/img/banner/banner_1.png',
            '/img/banner/footer_ball.png',
            '/img/banner/footer_bg_1.png',
            '/img/banner/path.png',
            '/img/banner/path2.png',
            '/img/banner/resister.png',
            '/img/favicons/android-chrome-192x192.png',
            '/img/favicons/android-chrome-256x256.png',
            '/img/favicons/apple-touch-icon.png',
            '/img/favicons/browserconfig.xml',
            '/img/favicons/favicon-16x16.png',
            '/img/favicons/favicon-32x32.png',
            '/img/favicons/favicon.ico',
            '/img/favicons/mstile-150x150.png',
            '/img/favicons/safari-pinned-tab.svg',
            '/img/speakers/combimauri_cropped.png',
            '/img/speakers/combimauri.jpeg',
            '/img/speakers/dmeneses_cropped.png',
            '/img/speakers/dmeneses.jpg',
            '/img/speakers/ircube_cropped.png',
            '/img/speakers/ircube.jpeg',
            '/img/speakers/json_alzate_cropped.png',
            '/img/speakers/json_alzate.jpg',
            '/img/speakers/line.png',
            '/img/speakers/lizzymendivil_cropped.png',
            '/img/speakers/lizzymendivil.jpg',
            '/img/speakers/luixaviles_cropped.png',
            '/img/speakers/luixaviles.png',
            '/img/speakers/mariagarciaflores_cropped.png',
            '/img/speakers/mariagarciaflores.jpg',
            '/img/speakers/nicobytes_cropped.png',
            '/img/speakers/nicobytes.jpg',
            '/img/conf.png',
            '/img/social-share.png',

            '/fonts/fa-brands-400.eot',
            '/fonts/fa-brands-400.svg',
            '/fonts/fa-brands-400.ttf',
            '/fonts/fa-brands-400.woff',
            '/fonts/fa-brands-400.woff2',
            '/fonts/fa-regular-400.eot',
            '/fonts/fa-regular-400.svg',
            '/fonts/fa-regular-400.ttf',
            '/fonts/fa-regular-400.woff',
            '/fonts/fa-regular-400.woff2',
            '/fonts/fa-solid-900.eot',
            '/fonts/fa-solid-900.svg',
            '/fonts/fa-solid-900.ttf',
            '/fonts/fa-solid-900.woff',
            '/fonts/fa-solid-900.woff2',
            '/fonts/flaticon.css',
            '/fonts/Flaticon.eot',
            '/fonts/Flaticon.svg',
            '/fonts/Flaticon.ttf',
            '/fonts/Flaticon.woff',
            '/fonts/Flaticon.woff2',
            '/fonts/fontawesome-webfont.eot',
            '/fonts/fontawesome-webfont.svg',
            '/fonts/fontawesome-webfont.ttf',
            '/fonts/fontawesome-webfont.woff',
            '/fonts/fontawesome-webfont.woff2',
            '/fonts/FontAwesome.otf',
            '/fonts/themify.eot',
            '/fonts/themify.svg',
            '/fonts/themify.ttf',
            '/fonts/themify.woff',

            'js/vendor/modernizr-3.5.0.min.js',
            'js/vendor/jquery-1.12.4.min.js',
            'js/popper.min.js',
            'js/bootstrap.min.js',
            'js/owl.carousel.min.js',
            'js/isotope.pkgd.min.js',
            'js/jquery.slicknav.min.js',
            'js/jquery.countdown.js',
            'js/jquery.ajaxchimp.min.js',
            'js/mail-script.js',
            'js/main.js',


            'css/bootstrap.min.css',
            'css/font-awesome.min.css',
            'css/flaticon.css',
            'css/slicknav.css',
            'css/style.css'
        ]);


    });



    e.waitUntil(cacheProm);

});


self.addEventListener('activate', e => {
    const response = caches.keys().then(keys => {
        keys.forEach(key => {
            if (key !== CACHE_STATIC_NAME && key.includes('static')) {
                return caches.delete(key);
            }
        });
    });
    e.waitUntil(response);
});

self.addEventListener('fetch', e => {

    // Network with cache fallback
    const respuesta = fetch(e.request).then(res => {
        if (!res) return caches.match(e.request);
        caches.open(CACHE_DYNAMIC_NAME).then(cache => {
            cache.put(e.request, res);
            clearCache(CACHE_DYNAMIC_NAME, CACHE_DYNAMIC_LIMIT);
        });
        return res.clone();
    }).catch(() => {
        return caches.match(e.request);
    });
    e.respondWith(respuesta);

});