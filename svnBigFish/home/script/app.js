'use strict';
var app = angular.module('app',['oc.lazyLoad','ui.router','ngAnimate','ngSanitize','ui.bootstrap']);
app.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
    function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
        app.controller = $controllerProvider.register;
        app.directive = $compileProvider.directive;
        app.filter = $filterProvider.register;
        app.factory = $provide.factory;
        app.service = $provide.service;
        app.constant = $provide.constant;
    }]);
app.factory('adminInterceptor', adminInterceptor);
app.config(httpConfig);
app.config(projectRouteConfig);

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



function projectRouteConfig($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $locationProvider) {
    var lazy = function(loaded) {
        return function($ocLazyLoad) {
            return $ocLazyLoad.load(loaded, { serie: true });
        }
    };
    $ocLazyLoadProvider.config({ debug: false, events: true });
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/home');
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'view/home.html',
                controller: 'MainController',
                controllerAs: 'vm',
                resolve: {
                    loadMyCtrl: lazy([
                        'script/controller/home.js',
                        "style/main.css",
                        "style/signIn.css"
                    ])
                }
            })

            .state('article', {
                url: '/article?&id',
                templateUrl: 'view/article.html',
                controller: 'article',
                controllerAs: 'vm',
                resolve: {
                    loadMyCtrl: lazy([
                        'script/controller/article.js',
                        'style/article.css'
                    ])
                }
            })
            .state('articleList', {
                url: '/articleList?&id',
                templateUrl: 'view/articleList.html',
                controller: 'articleList',
                controllerAs: 'vm',
                resolve: {
                    loadMyCtrl: lazy([
                        'script/controller/articleList.js',
                        'style/article.css'
                    ])
                }
            })
            .state('user', {
                url: '/user',
                templateUrl: 'view/user.html',
                controller: 'user',
                controllerAs: 'vm',
                resolve: {
                    loadMyCtrl: lazy([
                        'script/controller/user.js',
                        'style/user.css'
                    ])
                }
            })
            .state('userEdit', {
                url: '/userEdit',
                templateUrl: 'view/userEdit.html',
                controller: 'user',
                controllerAs: 'vm',
                resolve: {
                    loadMyCtrl: lazy([
                        'script/controller/user.js',
                        'style/user.css'
                    ])
                }
            })
            .state('bind', {
                url: '/bind',
                templateUrl: 'view/bind.html',
                controller: 'bind',
                controllerAs: 'vm',
                resolve: {
                    loadMyCtrl: lazy([
                        'script/controller/bind.js',
                        'style/bind.css'


                    ])
                }
            })


            .state('binded', {
                url: '/binded',
                templateUrl: 'view/binded.html',
                controller: 'bind',
                controllerAs: 'vm',
                resolve: {
                    loadMyCtrl: lazy([
                        'script/controller/bind.js',
                        'style/collection.css',
                        'style/bind.css'
                    ])
                }
            })
            .state('colVideo', {
                url: '/colVideo?&id',
                templateUrl: 'view/colVideo.html',
                controller: 'collection',
                controllerAs: 'vm',
                resolve: {
                    loadMyCtrl: lazy([
                        'script/controller/collection.js',
                        'style/collection.css',
                        'style/videoList.css'

                    ])
                }
            })
            .state('colArticle', {
                url: '/colArticle?&id',
                templateUrl: 'view/colArticle.html',
                controller: 'collection',
                controllerAs: 'vm',
                resolve: {
                    loadMyCtrl: lazy([
                        'script/controller/collection.js',
                        'style/collection.css',
                        'style/article.css',
                        'style/videoList.css'

                    ])
                }
            })

            .state('videoList', {
                url: '/videoList?class&subject',
                controller: 'VideoList',
                controllerAs: 'vm',
                templateUrl: 'view/videoList.html',
                resolve: {
                    loadMyCtrl: lazy([
                        'script/controller/videoList.js',
                        'style/videoList.css'
                    ])
                }
            })
            .state('videoSee', {
                url: '/videoSee?vid',
                controller: 'VideoSee',
                controllerAs: 'vm',
                templateUrl: 'view/videoSee.html',
                resolve: {
                    loadMyCtrl: lazy([
                        'script/controller/videoSee.js',
                        'style/videoSee.css'
                    ])
                }
            })
    }