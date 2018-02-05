/**
 * Created by Administrator on 2018/1/26/026.
 */
'use strict';
var app = angular.module('myApp');
app.controller('ModuleDetailCtrl',ModuleDetailCtrl);

ModuleDetailCtrl.inject = ['$state','modelBox','backModule','messages'];

function ModuleDetailCtrl( $state, modelBox, backModule,messages) {
    var vm = this;
    vm.params = $state.params;
    vm.modules = '新增模块';
    if (vm.params.id) {
        vm.modules = '编辑模块';
        //查看模块
        backModule.getModule(vm.params.id).then(function (response) {
            if (response.data.code === 0) {
                vm.params = response.data.data;
                console.log(vm.params);
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
        vm.params = {
            moduleName: vm.params.moduleName,
            parentId: vm.params.parentId,
            url: vm.params.url
        };
        console.log($state.params.id);
        if ($state.params.id) {
            //编辑模块
            backModule.moduleCompile($state.params.id,vm.params).then(function (response) {
                if (response.data.code === 0) {
                    $state.go('admin.moduleManage', {}, {reload: true});
                    modelBox.alert(messages.compileSuccess);
                } else if (response.data.code == -9008) {
                    modelBox.alert(messages.pleaseLogin, function () {
                        $state.go('login', {}, {reload: true});
                    })
                } else {
                    modelBox.alert(response.data.message)
                }
            });
        } else {
            //新增模块
            backModule.moduleAdd(vm.params).then(function (response) {
                if (response.data.code === 0) {
                    $state.go('admin.moduleManage', {}, {reload: true});
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
    };
    vm.cancel = function () {
        $state.go('admin.moduleManage', {}, {reload: true});
    };
}