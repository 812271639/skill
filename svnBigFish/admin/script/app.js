/**
 * Created by Administrator on 2018/1/26/026.
 */
'use strict';
// var myApp=angular.module('myApp', ['ui.router', 'oc.lazyLoad']);
//   myApp.config(['$stateProvider','$urlRouterProvider',function ($stateProvider, $urlRouterProvider) {

function routerConfig($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $locationProvider) {

    var lazy = function (loaded) {
        return function ($ocLazyLoad) {
            return $ocLazyLoad.load(loaded, {serie: true});
        }
    };

    $ocLazyLoadProvider.config({debug: false, events: true});

    $locationProvider.html5Mode(true);


    // $urlRouterProvider.when('', '/login');

    $urlRouterProvider.otherwise('/login');

    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'view/login.html',
            controller: 'LoginCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'script/controller/login.js',
                        'style/login.css']);
                }]
            }
        })
        .state('admin', {
            url: '/admin/',
            templateUrl: 'view/admin.html',
            controller: 'AdminCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'script/controller/admin.js',
                        'style/admin.css',
                        'style/public.css',
                        'style/modules.css'
                    ])
                }]
            }
        })
        .state('admin.video', {
            url: 'video?title&subject&type&teacherName&grade&minUpvote&maxUpvote&minCollection&maxCollection&status&size&page',
            templateUrl: 'view/video.html',
            controller: 'VideoCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'script/controller/video.js',
                        'script/constant/videoConstant.js',
                        "script/filter/videoFilter.js",
                        'style/video.css'
                    ])
                }]
            }
        })
        .state('admin.videoAdd', {
            url: 'videoAdd?vid',
            templateUrl: 'view/videoAdd.html',
            controller: 'VideoDetailCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'script/controller/videoAdd.js',
                        'script/constant/videoConstant.js',
                        "script/filter/videoFilter.js",
                        'style/videoAdd.css'
                    ])
                }]
            }
        })

        .state('admin.videoSee', {
            url: 'videoSee?vid',
            templateUrl: 'view/videoSee.html',
            controller: 'VideoDetailCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'script/controller/videoAdd.js',
                        'script/constant/videoConstant.js',
                        "script/filter/videoFilter.js",
                        'style/videoAdd.css'
                    ])
                }]
            }

        })
        .state("admin.article", {
            url: 'article?page&size&type&status&title&author&minUpvote&maxUpvote&minCollection&maxCollection',
            templateUrl: "view/article.html",
            controller: 'ArticleCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: lazy([
                    'script/controller/article.js',
                    'script/constant/articleConstant.js',
                    "script/filter/articleFilter.js",
                    'style/public.css'
                ])
            }
        })
        .state("admin.articleSee", {
            url: 'articleSee?&id',
            templateUrl: "view/articleSee.html",
            controller: 'ArticleDetailCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: lazy([
                    'script/controller/articleAdd.js',
                    'script/constant/articleConstant.js',
                    "script/filter/articleFilter.js",
                    'style/public.css'
                ])

            }

        })
        .state("admin.articleAdd", {
            url: 'articleAdd?&id',
            templateUrl: "view/articleAdd.html",
            controller: 'ArticleDetailCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: lazy([
                    'script/controller/articleAdd.js',
                    'script/constant/articleConstant.js',
                    "script/filter/articleFilter.js"

                ])

            }

        })
        .state("admin.user", {
            url: 'user?page&size&type&status&id&grade&nickname&tel&email&minBeans&maxBeans&location',
            templateUrl: "view/user.html",
            controller: 'UserCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: lazy([
                    'script/controller/user.js',
                    'script/constant/articleConstant.js',
                    "script/filter/articleFilter.js",
                    'style/public.css'
                ])

            }

        })
        .state("admin.userSee", {
            url: 'userSee?&id&nickname&avatar&grade&tel&email&beans&location',
            templateUrl: "view/userSee.html",
            controller: 'UserDetailCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: lazy([
                    'script/controller/userSee.js',
                    'style/public.css'
                ])

            }

        })
        /***********
         * 后台管理
         * ***************/
        //密码修改
        .state("admin.password", {
            url: 'password',
            templateUrl: "view/modules/password.html",
            controller: 'PasswordCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: lazy([
                    'script/controller/password.js'
                ])

            }

        })
        //账户管理
        .state("admin.accountManage", {
            url: 'accountManage?roleId&username&page&size',
            templateUrl: "view/modules/accountManage.html",
            controller: 'AccountCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: lazy([
                    'script/controller/accountManage.js'
                ])

            }
        })
        .state("admin.addAccount", {
            url: 'addAccount?id',
            templateUrl: "view/modules/addAccount.html",
            controller: 'AccountDetailCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: lazy([
                    'script/controller/accountAdd.js'
                ])

            }
        })
        //角色管理
        .state("admin.roleManage", {
            url: 'roleManage?id',
            templateUrl: "view/modules/roleManage.html",
            controller: 'RoleManageCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: lazy([
                    'script/controller/roleManage.js'
                ])

            }
        })
        .state("admin.addRole", {
            url: 'addRole?id',
            templateUrl: "view/modules/addRole.html",
            controller: 'RoleDetailCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: lazy([
                    'script/controller/roleAdd.js'
                ])

            }
        })
        //模块管理
        .state("admin.moduleManage", {
            url: 'moduleManage?id&page$size',
            templateUrl: "view/modules/moduleManage.html",
            controller: 'ModuleManageCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: lazy([
                    'script/controller/moduleManage.js'
                ])

            }
        })
        .state("admin.addModule", {
            url: 'addModule?id&page',
            templateUrl: "view/modules/addModule.html",
            controller: 'ModuleDetailCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: lazy([
                    'script/controller/moduleAdd.js'
                ])

            }
        })
        //模块测试路由
        .state("admin.test1", {
            url: 'test1',
            template: "<h1> welcome to the first test module ！</h1>"
        })
        .state("admin.test2", {
            url: 'test2',
            template: "<h1> welcome to the second test module  ！</h1>"
        })
        .state("admin.test3", {
            url: 'test3',
            template: "<h1> welcome to the third test module  ！</h1>"
        })
};
