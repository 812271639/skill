/**
 * Created by Administrator on 2018/1/26/026.
 */
'use strict';
var app = angular.module('myApp');
app.controller('ModuleManageCtrl', ModuleManageCtrl);

ModuleManageCtrl.inject = ['$state', 'modelBox', 'backModule', 'messages'];

function ModuleManageCtrl($state, modelBox, backModule, messages) {
    var vm = this;
    vm.params = $state.params;
    vm.pageUrl = 'admin.moduleManage';//分页插件，本页url
//模块列表
    backModule.moduleList(vm.params).then(function (response) {
        if (response.data.code === 0) {
            vm.data = response.data.data;
            vm.bigTotalItems = response.data.total;                      // 返回的数据用于分页插件
            console.log(response.data.data);
        } else if (response.data.code == -9008) {
            modelBox.alert(messages.pleaseLogin, function () {
                $state.go('login', {}, {reload: true});
            })
        } else {
            modelBox.alert(response.data.message)
        }
    });

    vm.delete = function (id) {

        modelBox.confirm(messages.delete, function () {
            backModule.deleteModule(id).then(function (response) {
                if (response.data.code === 0) {
                    $state.go('admin.moduleManage', {}, {reload: true});
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
