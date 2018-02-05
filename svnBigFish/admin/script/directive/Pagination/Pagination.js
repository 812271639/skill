/**
 * Created by Administrator on 2018/1/26/026.
 */
'use strict';
angular.module('myApp')
    .directive('myPage', [function () {
        return {
            restrict: 'AE',
            templateUrl: 'script/directive/Pagination/Pagination.html',
            scope: {
                sizes: '=',
                pages:'=',
                pageUrl:'=',
                total:'='
            },
            controller:function ($scope,$state) {
                $scope.maxSize = 3;            //分页显示的数字
                $scope.total = 100000; //分页总数/给一个初始值，在http请求时再赋值覆盖掉，需要大于数据总数。
                // $scope.bigCurrentPage = ($scope.params.page ) ? $scope.params.page : 1;      //添加默认值'
                // $scope.size = ($scope.params.size) ? $scope.params.size : 10;                 //每页多少条用于size
                // $scope.items = ($scope.params.size) ? $scope.params.size : 10;                //每页多少条
                $scope.bigCurrentPage = $scope.pages ? $scope.pages : 1;
                $scope.size = $scope.sizes ? $scope.sizes : 10;
                $scope.items = $scope.size;
                // $scope.bigTotalItems = $scope.total;
                $scope.pageChanged = function (page) {
                    console.log(page);
                    // $scope.pageUrl = 'admin.video';
                    $state.go($scope.pageUrl, {
                        page: page,        //传递参数到路由页面，保存在url里
                        size: $scope.size
                    }, {reload: true});
                };
            }
        }
    }]);