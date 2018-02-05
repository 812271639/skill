/**
 * Created by Administrator on 2018/1/26/026.
 */
'use strict';
var app = angular.module('myApp');
//密码修改
app.controller('PasswordCtrl', PasswordCtrl);

PasswordCtrl.inject = ['$state', 'backModule', 'modelBox', 'messages'];

function PasswordCtrl($state, backModule, modelBox, messages) {
    var vm = this;
    vm.sureChangPassword = function () {
        vm.params = {
            originPassword: vm.oldPassword,
            newPassword: vm.newPassword,
            confirm: vm.confirmPassword
        };
        if (vm.newPassword === vm.confirmPassword) {
            backModule.password(vm.params).then(function (response) {
                if (response.data.code == 0) {
                    modelBox.alert(messages.modificationSuccess);
                    $state.go('login', {}, {reload: true});
                } else if (response.data.code == -9008) {
                    modelBox.alert(messages.pleaseLogin, function () {
                        $state.go('login', {}, {reload: true});
                    })
                } else {
                    modelBox.alert(response.data.message)
                }
            })
        } else {
            vm.passwordDifferent = '密码错误'
        }

    }
}