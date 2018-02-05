/**
 * Created by Administrator on 2018/1/26/026.
 */
'use strict';
angular.module('myApp')
    .controller('VideoCtrl', VideoCtrl);

VideoCtrl.$inject = ['$state', 'type', 'grade', 'subject', 'status', 'videoState', 'modelBox', 'video', 'messages', 'empty'];

function VideoCtrl($state, type, grade, subject, status, videoState, modelBox, video, messages, empty) {
    var vm = this;
    vm.type = type;
    vm.grade = grade;
    vm.subject = subject;
    vm.status = status;
    vm.videoState = videoState;
    vm.params = $state.params;
    vm.pageUrl = 'admin.video'; //分页插件，本页url
    //视频列表
    video.videoList(vm.params).then(function (response) {
        if (response.data.code === 0) {

            vm.videoList = response.data.data;
            vm.bigTotalItems = response.data.total;                      // 返回的数据用于分页插件
        } else if (response.data.code == -9008) {
            modelBox.alert(messages.pleaseLogin, function () {
                $state.go('login', {}, {reload: true});
            })
        } else {
            modelBox.alert(response.data.message)
        }
    });

    //重置

    vm.videoClear = function () {
        $state.go('admin.video', empty.forIn(vm.params), {reload: true});
    };
    //搜索
    vm.videoSearch = function () {
        $state.go('admin.video', vm.params, {reload: true});
    };
    //查看
    vm.videoSee = function (id) {
        $state.go('admin.videoSee', {vid: id}, {reload: true});
    };
    //编辑
    vm.compile = function (id) {
        $state.go('admin.videoAdd', {vid: id}, {reload: true});
    };
    //上下架
    vm.statuses = function (vid, parameterStatus) {
        var Status = (parameterStatus === vm.videoState["offLine"]) ? vm.videoState["onLine"] : vm.videoState["offLine"];
        var putAway, soldOut;
        if (Status === vm.videoState["offLine"]) {
            putAway = "确定要下架吗";
            soldOut = "下架成功"
        } else if (Status === vm.videoState["onLine"]) {
            putAway = "确定要上架吗";
            soldOut = "上架成功"
        }
        modelBox.confirm(putAway, function () {
            video.videoStatus(vid).then(function (response) {
                if (response.data.code === 0) {
                    $state.go('admin.video', {}, {reload: true});
                    modelBox.alert(soldOut)
                } else if (response.data.code === -3008) {
                    modelBox.alert(messages.overBanner)
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