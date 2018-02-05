/**
 * Created by Administrator on 2018/1/26/026.
 */
'use strict';
var app = angular.module('myApp');
app.controller('RoleManageCtrl', RoleManageCtrl);

RoleManageCtrl.inject = ['$state', 'modelBox', 'backModule', 'messages'];

function RoleManageCtrl($state, modelBox, backModule, messages) {
    var vm = this;
    vm.params = $state.params;
    //角色列表
    backModule.rolList().then(function (response) {
        if (response.data.code === 0) {
            vm.data = response.data.data;
        } else if (response.data.code == -9008) {
            modelBox.alert(messages.pleaseLogin, function () {
                $state.go('login', {}, {reload: true});
            })
        } else {
            modelBox.alert(response.data.message)
        }
    });
    vm.delete = function (id) {
        var message = "删除角色后您必须对该角色下的账户重新分配权限<br>确定要删除该角色吗？";
        modelBox.confirm(message, function () {
            backModule.deleteRole(id).then(function (response) {
                if (response.data.code === 0) {
                    $state.go('admin.roleManage', {}, {reload: true});
                    modelBox.alert(messages.deleteSuccess);
                } else if (response.data.code == -9008) {
                    modelBox.alert(messages.pleaseLogin, function () {
                        $state.go('login', {}, {reload: true});
                    })
                } else {
                    modelBox.alert(response.data.message)
                }
            });
        });
    }
}
