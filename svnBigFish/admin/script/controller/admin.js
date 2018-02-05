/**
 * Created by Administrator on 2018/1/26/026.
 */
'use strict';
angular.module("myApp")
    .controller("AdminCtrl", AdminCtrl);

AdminCtrl.inject = ['$rootScope', '$state', 'modelBox', 'messages', 'backModule'];

function AdminCtrl($rootScope, $state, modelBox, messages, backModule) {
    var vm = this;
    vm.current = $state.current.name;
    vm.modules = JSON.parse(sessionStorage.getItem('modules'));
    vm.Administrator = sessionStorage.getItem('Administrator');

    // $rootScope.$on('$locationChangeSuccess',function(){//返回前页时，刷新前页
    //     parent.location.reload();
    // });

    vm.logout = function () {
        modelBox.confirm(messages.logout, function () {
            backModule.logout().then(function (response) {
                if (response.data.code === 0) {
                    $state.go('login', {}, {reload: true});
                } else if (response.data.code == -9008) {
                    modelBox.alert(messages.pleaseLogin, function () {
                        $state.go('login', {}, {reload: true});
                    })
                } else {
                    modelBox.alert(response.data.message)
                }
            })
        });

    };
}
