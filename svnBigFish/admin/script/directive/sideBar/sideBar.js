/**
 * Created by Administrator on 2018/1/26/026.
 */
'use strict';
angular.module('myApp')
    .directive('sideBar', [function () {
        return {
            restrict: 'AE',
            templateUrl: 'script/directive/sideBar/sideBar.html',
            scope: {
                current: '=',
                modules:'='
            },
            controller: function ($scope,$timeout) {
                $timeout(function () {
                    $('#side-menu').metisMenu();
                }, 100);
                $timeout(function () {
                    console.log($scope.current);
                    // var test = $('.test');
                    var element = $('.test').filter(function () {
                        return this.getAttribute('ui-sref') == $scope.current;
                    }).addClass('active').parent();
                    while (true) {
                        if (element.is('li')) {
                            element = element.parent().addClass('in').parent();
                        } else {
                            break;
                        }
                    }
                    $('.test').click(function () {
                        $('.test').removeClass('active');
                        $(this).addClass('active')
                    });
                },100);
            }
        }
    }]);