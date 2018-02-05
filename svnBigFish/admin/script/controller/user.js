/**
 * Created by Administrator on 2018/1/26/026.
 */
'use strict';
angular.module('myApp')
    .controller('UserCtrl', UserCtrl);

UserCtrl.inject = ['$state', 'grades', 'freeze', 'userStatus', 'modelBox', 'user', 'messages', 'empty'];

function UserCtrl($state, grades, freeze, userStatus, modelBox, user, messages, empty) {
    var vm = this;
    vm.params = $state.params;
    vm.grades = grades;
    vm.freeze = freeze;
    vm.userStatus = userStatus;
    vm.pageUrl = 'admin.user'; //分页插件，本页url

    //用户列表
    user.userList(vm.params).then(function (res) {
        if (res.data.code === 0) {
            vm.userList = res.data.data;
            vm.userNum = res.data.total;
            vm.bigTotalItems = res.data.total;
        } else if (res.data.code == -9008) {
            modelBox.alert(messages.pleaseLogin, function () {
                $state.go('login', {}, {reload: true});
            })
        } else {
            modelBox.alert(res.data.message)
        }
    });

    //搜索、重置
    vm.reset = function () {
        $state.go('admin.user', empty.forIn(vm.params), {reload: true});
    };
    vm.search = function () {
        $state.go('admin.user', vm.params, {reload: true});
    };

    //冻结、解冻
    vm.changeStatus = function (uId, status) {
        console.log(status);
        var needStatus = (status ===  vm.freeze["frozen"]) ?  vm.freeze["melt"] :  vm.freeze["frozen"];
        var putAway, soldOut;
        if (needStatus ===  vm.freeze["melt"]) {
            putAway = "冻结后无法操作，是否冻结该用户？";
            soldOut = "用户冻结成功"
        } else if (needStatus ===  vm.freeze["frezz"]) {
            putAway = "解冻后该用户可正常登录使用，是否解冻该用户？";
            soldOut = "用户解冻成功"
        }


        modelBox.confirm(putAway, function () {
            user.userStatues(uId).then(function (res) {
                if (res.data.code === 0) {
                    $state.go('admin.user', {}, {reload: true});
                    modelBox.alert(soldOut)
                } else if (res.data.code == -9008) {
                    modelBox.alert(messages.pleaseLogin, function () {
                        $state.go('login', {}, {reload: true});
                    })
                } else {
                    modelBox.alert(res.data.message)
                }
            });
        })
    };
}