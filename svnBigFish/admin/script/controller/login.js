/**
 * Created by Administrator on 2018/1/26/026.
 */
'use strict';
angular.module("myApp")
    .controller("LoginCtrl", LoginCtrl);

LoginCtrl.inject = ['$state', 'backModule'];

function LoginCtrl($state, backModule) {
    var vm = this;
    vm.login = function () {
        sessionStorage.setItem('Administrator', vm.name);
        vm.params = {
            username: vm.name,
            password: vm.password
        };
        backModule.login(vm.params).then(function (response) {
            if (response.data.code === 0) {
                sessionStorage.setItem('modules', JSON.stringify(response.data.data));
                $state.go('admin', {}, {reload: true})
            } else {
                vm.messages = response.data.message;
            }
        })
    };
}