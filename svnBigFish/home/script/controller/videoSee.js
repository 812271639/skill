'use strict';
angular.module('app')
    .controller('VideoSee',['$http','$state', 'video',function ($http, $state,video) {
        var vm = this;
        vm.params = $state.params;
        var token = sessionStorage.getItem('token');
        //视频详情
        video.videoDetails(vm.params.vid, {token: token}).then(function (response) {
            if (response.data.code === 0){
                vm.data = response.data.data;
            }else {
                modelBox.alert( response.data.message);
            }

        });
        vm.cover = false;

        vm.playThis = function () {
            var myVideo = document.getElementById('myVideo');
            myVideo.play();
            vm.cover = true;
        };

        //点赞
        vm.hand = function () {
            video.videoUpvote(vm.params.vid, {token: token}).then(function (response) {
                if(response.data.code === 0){
                    vm.handData = response.data.data;
                    vm.data.upvote = vm.handData.upvoteNum;
                    vm.data.upvoteStatus = vm.handData.upvoteStatus;
                }else {
                    modelBox.alert( response.data.message);
                }
            })

        };
        //收藏
        vm.heart = function () {
            video.videoCollection(vm.params.vid, {token: token}).then(function (response) {
                if(response.data.code === 0){
                    vm.heartData = response.data.data;
                    vm.data.collection = vm.heartData.collectionNum;
                    vm.data.collectionStatus = vm.heartData.collectionStatus;
                }else {
                    modelBox.alert( response.data.message);
                }
            })
        };
    }]);