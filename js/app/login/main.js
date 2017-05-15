'use strict'

require.config({
    baseUrl: 'js',
    paths: {
        jquery: 'lib/jquery/1.11.1',
        render: 'common/render',
        uniqueAjax: 'common/uniqueAjax',
        responser: 'common/responser',
        bootstrap: 'lib/bootstrap',
        baseFinal: 'app/baseFinal',
        $md5: 'common/jQuery.md5',
        baseCookie: 'app/baseCookie',
        cookie: 'common/cookie'
    },
    shim: {
        'baseCookie': ['jquery', 'cookie'],
        'cookie': ['jquery'],
        'bootstrap': ['jquery'],
        '$md5': ['jquery'],
        'valiForm': ['jquery']
    }
})

require([
    'baseCookie',
    'jquery',
    'bootstrap',
    'app/login/login',
    '$md5'

], function(BaseCookie,$, Bootstrap,Login) {
    Login.init();
})