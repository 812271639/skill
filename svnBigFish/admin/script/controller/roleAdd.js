/**
 * Created by Administrator on 2018/1/26/026.
 */
'use strict';
var app = angular.module('myApp');
app.controller('RoleDetailCtrl',RoleDetailCtrl);

RoleDetailCtrl.inject = ['$state','modelBox','backModule','messages'];

function RoleDetailCtrl($state, modelBox, backModule,messages) {
    var vm = this;
    vm.params = $state.params;
    vm.role = null;//模块数组预保存变量
    vm.arr = [];   //权限数组
    vm.roles = '新增角色';
//获取模块列表
    vm.params.size = 10000;
    backModule.moduleList(vm.params).then(function (response) {
        if (response.data.code === 0) {

            vm.role = response.data.data;
            angular.forEach(vm.role, function (value) {
                value.random = false;//首先给返回的random字段赋值false；用于编辑绑定
            });
            if (vm.params.id) {
                //查看角色权限
                backModule.getRole(vm.params.id).then(function (response) {
                    if(response.data.code == 0){
                        vm.data = response.data.data;
                        vm.params.moduleName = vm.data.roleName;
                        vm.moduleList = vm.data.moduleList;
                        console.log(vm.moduleList);
                        angular.forEach(vm.moduleList, function (value) {
                            angular.forEach(vm.role, function (role) {
                                if (value === role.id) {
                                    role.random = true; //通过循环random字段，对比获得的角色权限moduleList数组id与所有模块role的id
                                    vm.arr.push(value)//返回的权限数组先推送给arr
                                }
                            }, vm.arr)
                        })
                    } else if (response.data.code == -9008) {
                        modelBox.alert(messages.pleaseLogin, function () {
                            $state.go('login', {}, {reload: true});
                        })
                    } else {
                        modelBox.alert(response.data.message)
                    }

                });
                if (vm.params.id == 1) { //隐藏admin角色的模块权限
                    vm.admin = true;
                }
                vm.roles = '编辑角色';
            }
        } else if (response.data.code == -9008) {
            modelBox.alert(messages.pleaseLogin, function () {
                $state.go('login', {}, {reload: true});
            })
        } else {
            modelBox.alert(response.data.message)
        }
    });

//选择父模块全选/反选
    vm.all = function (id, mainState) {
        if (mainState) {
            angular.forEach(vm.role, function (value) {
                if (id === value.parentId) {
                    value.random = true;
                    if (vm.arr.indexOf(value.id) === -1) { //如果arr数组没有这个id，则执行
                        vm.arr.push(value.id)//推送子模块id
                    }
                }
            });
            vm.arr.push(id);//推送父模块id
        } else {
            angular.forEach(vm.role, function (value) {
                if (id === value.parentId) {
                    value.random = false;
                    vm.arr.splice(vm.arr.indexOf(value.id), 1);//删除子模块id
                }
            });
            vm.arr.splice(vm.arr.indexOf(id), 1);//删除父模块id
        }
    };

//选择子模块
    vm.addArr = function (id, parentId, state) {
        if (state) {
            vm.arr.push(id);//推送子模块id
            angular.forEach(vm.role, function (value, index) {
                if ((parentId === value.id) && (value.parentId == 0)) {
                    value.random = true;
                    if (vm.arr.indexOf(parentId) === -1) {
                        vm.arr.push(parentId);//推送父模块id，用于选中子模块自动选中父模块。
                    }
                }
            });
        } else {
            vm.arr.splice(vm.arr.indexOf(id), 1);//删除子模块id
        }
    };

    vm.sureChang = function () {
        vm.params = {
            roleName: vm.params.moduleName,
            moduleList: vm.arr
        };
        if ($state.params.id) {
            //编辑角色
            backModule.roleCompile($state.params.id,vm.params).then(function (response) {
                if (response.data.code === 0) {
                    vm.data = response.data.data;
                    $state.go('admin.roleManage', {}, {reload: true});
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
            //新增角色
            backModule.roleAdd(vm.params).then(function (response) {
                if (response.data.code === 0) {
                    vm.data = response.data.data;
                    $state.go('admin.roleManage', {}, {reload: true});
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
        $state.go('admin.roleManage', {}, {reload: true});
    }
}