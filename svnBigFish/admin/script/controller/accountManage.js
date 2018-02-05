/**
 * Created by Administrator on 2018/1/26/026.
 */
'use strict';
var app = angular.module('myApp');
//账户管理列表
app.controller('AccountCtrl', AccountCtrl);

AccountCtrl.inject = ['$state', 'modelBox', 'backModule', 'messages', '$stateParams'];

function AccountCtrl($state, modelBox, backModule, messages, $stateParams) {
    var vm = this;
    vm.params = $state.params;
    if ($stateParams.roleId) {
        vm.params.roleId = Number($stateParams.roleId);
    }

    vm.pageUrl = 'admin.accountManage'; //分页插件，本页url

    //获取账号列表
    backModule.accountList(vm.params).then(function (response) {
        if (response.data.code === 0) {
            vm.data = response.data.data;
            vm.bigTotalItems = response.data.total;                      // 返回的数据用于分页插件
            //获取角色列表
            backModule.rolList().then(function (response) {
                if (response.data.code === 0) {
                    vm.role = response.data.data;
                    sessionStorage.setItem('role', JSON.stringify(vm.role));  //保存角色列表，用于新增页
                } else if (response.data.code == -9008) {
                    modelBox.alert(messages.pleaseLogin, function () {
                        $state.go('login', {}, {reload: true});
                    })
                } else {
                    modelBox.alert(response.data.message)
                }
            });

        } else if (response.data.code == -9008) {
            modelBox.alert(messages.pleaseLogin, function () {
                $state.go('login', {}, {reload: true});
            })
        } else {
            modelBox.alert(response.data.message)
        }
    });

    vm.searchAccount = function (id, username) {
        $state.go('admin.accountManage', {
            roleId: id,
            username: username
        }, {reload: true});
    };

    vm.delete = function (id) {

        modelBox.confirm(messages.delete, function () {
            backModule.deleteAccount(id).then(function (response) {
                if (response.data.code === 0) {
                    $state.go('admin.accountManage', {}, {reload: true});
                    modelBox.alert(messages.deleteSuccess)
                } else if (response.data.code == -9008) {
                    modelBox.alert(messages.pleaseLogin, function () {
                        $state.go('login', {}, {reload: true});
                    })
                } else {
                    modelBox.alert(response.data.message)
                }
            });
        });

    };
}
