'use strict';

var app = angular.module('myApp', [
    'ui.router',
    'oc.lazyLoad',
    "angularFileUpload",
    "ngMessages",
    "meta.umeditor",
    "ui.bootstrap"]);

app.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
    function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
        app.controller = $controllerProvider.register;
        app.directive = $compileProvider.directive;
        app.filter = $filterProvider.register;
        app.factory = $provide.factory;
        app.service = $provide.service;
        app.constant = $provide.constant;
    }]);


app.config(httpConfig);
app.config(routerConfig);
app.factory('adminInterceptor', adminInterceptor);


function httpConfig($httpProvider) {
    // Set x-www-form-urlencoded Content-Type
    $httpProvider.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $httpProvider.defaults.headers.patch['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

    // Set up global transformRequest function
    $httpProvider.defaults.transformRequest = function (data) {
        if (data === undefined) {
            return data;
        }
        return $.param(data);
    };
    // 拦截器
    $httpProvider.interceptors.push('adminInterceptor');

}

function adminInterceptor() {
    return {
        request: function (config) {
            return config;
        },
        requestError: function (config) {
            return config;
        },
        response: function (res) {
            return res;
        },
        responseError: function (res) {
            return res;
        }
    }
}
//
// app.config(lazyLoadConfig);
//
// function lazyLoadConfig($ocLazyLoadProvider) {
//
//     $ocLazyLoadProvider.config({
//         events: true,
//         debug: false,
//         modules: [
//             {
//                 name: 'angularFileUpload',
//                 files: [
//                     'vendor/angular-file-upload/angular-file-upload.min.js',
//                     'js/directives/ptteng-uploadThumb/ptteng-uploadThumb-0.0.1.js'
//                 ]
//             },
//             {
//                 name: 'summernote',
//                 files: [
//                     'vendor/summernote/summernote.js',
//                     'vendor/summernote/summernote.css',
//                     'vendor/summernote/summernote-bs3.css',
//                     'vendor/angular-summernote/angular-summernote.js'
//                 ]
//             },
//             {
//                 name: 'datepicker',
//                 files: [
//                     'js/directives/datepicker/datepicker.css',
//                     'js/directives/datepicker/datepicker.js'
//                 ]
//             },
//             {
//                 name: 'dndLists',
//                 files: [
//                     'vendor/angular-drag-and-drop-lists/angular-drag-and-drop-lists.js'
//                 ]
//             }
//         ]
//     });
// }