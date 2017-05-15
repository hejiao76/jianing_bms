'use strict'

require.config({
    baseUrl: 'js',
    urlArgs:'ver=1.0.0.3',
    paths: {
        jquery: 'lib/jquery/1.11.1',
        render: 'common/render',
        uniqueAjax: 'common/uniqueAjax',
        responser: 'common/responser',
        bootstrap: 'lib/bootstrap',
        baseFinal: 'app/baseFinal',
        $md5: 'common/jQuery.md5',
        baseCookie: 'app/baseCookie',
        cookie: 'common/cookie',
        jqGrid:'lib/jqGrid5/js/jquery.jqGrid.min',
        jgGrid_local:'lib/jqGrid5/js/i18n/grid.locale-en',
        util:'common/util',
        director: 'lib/director/director.min',
        jquery_pagination:'lib/jquery.pagination/jquery.pagination'
    },
    shim: {
        'baseCookie': ['jquery', 'cookie'],
        'cookie': ['jquery'],
        'bootstrap': ['jquery'],
        '$md5': ['jquery'],
        'jqGrid':['jquery'],
        'jgGrid_local':['jqGrid']

    }
})

require([
     'director',
    'baseCookie',
    'app/baseNavClick',
    'jquery',
    'bootstrap',
    'app/home/home',
    // 'app/checkLogin/checkLogin',
    //'app/login/login',
    //'ace_extra',
    //'html5shiv',
    //'respond',
    //'ace_elements',
    //'ace',
    //'ace_onpage_help',
    //'jquery_dialog',

], function(Director,BaseCookie,BaseNavClick,$, Bootstrap,home) {
        home.init();
});