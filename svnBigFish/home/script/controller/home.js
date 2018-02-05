'use strict';
angular.module('app')
    .controller('MainController', ['$scope','$http','$state','$timeout','modelBox','homePage',function ($scope, $http,$state,$timeout,modelBox,homePage) {
        var vm = this;
        vm.getQueryString = function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            } else {
                return false;
            }
        };
        var codes = vm.getQueryString('code');
        if (codes) {
            homePage.sendCode( {code: codes}).then(function (response) {
                if (response.data.code === 0) {
                    sessionStorage.setItem('token', response.data.data.token);
                    vm.bind=response.data.data.bind;
                    vm.frozen=response.data.data.frozen;
                    if (vm.frozen===2){
                        modelBox.confirm("您已被冻结",function () {
                            wx.closeWindow();
                        });
                    }
                    if (vm.bind===2){
                        modelBox.alert("您未绑定",function () {
                            $state.go('binded');
                        });
                    }
                } else {
                    // modelBox.alert( response.data.message);
                }
            });
        }
        vm.signWord = "签到";
        vm.alreadySign = false;
        vm.signButton = 'signButton';
        //获取历史签到数据
        vm.signBottom = function () {
            var token = sessionStorage.getItem('token');
            homePage.signDay({token: token}).then(function (response) {
                if(response.data.code === 0){
                    vm.response = response.data.data;
                    vm.signDate = vm.response.totalSignNum;
                    var arr = JSON.parse(vm.response.signHistory);
                    var day = angular.element('.myDay');
                    angular.forEach(day, function (d) {
                        angular.forEach(arr, function (a) {
                            if (a == d.innerHTML) {
                                angular.element(d).addClass('blue');
                            }
                        });
                    });
                    if (angular.element('.myToday').hasClass('blue')) {
                        vm.alreadySign = true;
                        vm.signButton = 'grayColor';
                        vm.signWord = "已签到";
                    }
                }else {
                    modelBox.alert(response.data.message)
                }
            });
        };
        vm.sign = function () {
            var token = sessionStorage.getItem('token');
            //签到行为
            homePage.signIn({token: token}).then(function (response) {
                if (response.data.code === 0) {
                    vm.response = response.data.data;
                    vm.beans = vm.response.bean;
                    vm.signWord = "已签到";
                    angular.element('.myToday').addClass('blue');
                    vm.alreadySign = true;
                    vm.signButton = 'grayColor';
                } else {
                    modelBox.alert(response.data.message)
                }
            });

            angular.element('#Modal').on('show.bs.modal', function () {
                $timeout(function () {
                    angular.element("#Modal").modal("hide");
                }, 3000);
            });
        };
    }]);
