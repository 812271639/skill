/**
 * Created by Administrator on 2018/1/26/026.
 */
'use strict';
angular.module('myApp')
    .controller('UserDetailCtrl', UserDetailCtrl);

UserDetailCtrl.inject = ['$scope', '$http', '$state', '$stateParams', 'user', 'modelBox'];

function UserDetailCtrl($scope, $http, $state, $stateParams, user, modelBox, messages) {
    var vm = this;
    vm.uId = $stateParams.id;
    vm.params = $state.params;

    user.userLook(vm.uId).then(function (res) {
        if (res.data.code === 0) {
            vm.params = res.data.data;
            console.log(vm.params)
        } else if (res.data.code == -9008) {
            modelBox.alert(messages.pleaseLogin, function () {
                $state.go('login', {}, {reload: true});
            })
        } else {
            modelBox.alert(res.data.message)
        }
    })
}
