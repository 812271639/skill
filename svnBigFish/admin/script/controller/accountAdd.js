/**
 * Created by Administrator on 2018/1/26/026.
 */
'use strict';
var app = angular.module('myApp');
app.controller('AccountDetailCtrl', AccountDetailCtrl);

AccountDetailCtrl.$inject = ['$state', 'modelBox', 'backModule', 'messages'];

function AccountDetailCtrl($state, modelBox, backModule, messages) {
    var vm = this;
    vm.params = $state.params;
    vm.account = '新增账号';
    vm.role = JSON.parse(sessionStorage.getItem('role'));

//查看账号
    if (vm.params.id) {
        if (vm.params.id == 1) {
            vm.admin = true; //隐藏admin账户的角色权限
        }
        vm.account = '编辑账号';
        backModule.getAccount(vm.params.id).then(function (response) {
            if (response.data.code === 0) {
                vm.params = response.data.data;
            } else if (response.data.code == -9008) {
                modelBox.alert(messages.pleaseLogin, function () {
                    $state.go('login', {}, {reload: true});
                })
            } else {
                modelBox.alert(response.data.message)
            }
        });
    }
    vm.sureChang = function () {
        if (vm.params.password === vm.params.confirm) {
            if (vm.params.id) {
                backModule.accountCompile(vm.params.id, vm.params).then(function (response) {
                    if (response.data.code === 0) {
                        $state.go('admin.accountManage', {}, {reload: true});
                        modelBox.alert(messages.compileSuccess);
                    } else {
                        vm.passwordDifferent = response.data.message;
                    }
                });

            } else {
                backModule.accountAdd(vm.params).then(function (response) {
                    if (response.data.code === 0) {
                        $state.go('admin.accountManage', {}, {reload: true});
                        modelBox.alert(messages.addSuccess);
                    } else if (response.data.code == -9008) {
                        modelBox.alert(messages.pleaseLogin, function () {
                            $state.go('login', {}, {reload: true});
                        })
                    } else {
                        modelBox.alert(response.data.message)
                    }
                });

            }
        } else {
            vm.passwordDifferent = "密码不正确"
        }

    };
    vm.cancel = function () {
        $state.go('admin.accountManage', {}, {reload: true});
    }
}