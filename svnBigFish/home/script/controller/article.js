/**
 * Created by Administrator on 2018/1/12/012.
 */
'use strict';
angular.module('app')
    .controller('article', function ($scope, $http,$state,$stateParams,article,modelBox) {
        var vm = this;
        vm.params=$state.params;
        vm.aId=$stateParams.id;
        console.log(vm.aId);
        var token = sessionStorage.getItem('token');

        //文章详情
        article.articleDetails(vm.aId,{token: token}).then(function (res) {
            if(res.data.code===0) {
                vm.params = res.data.data;
                console.log(vm.params)
            }else {
                modelBox.alert(res.data.message)
            }
        });


        //文章点赞

        vm.vote=function () {
            article.articleUpvote(vm.aId, {token: token}).then(function (res) {
                if(res.data.code===0){
                    vm.params.upvote=res.data.data.upvoteNum;
                    vm.params.upvoteStatus=res.data.data.upvoteStatus;
                }else {
                    modelBox.alert (res.data.message)
                }

            });

        };

        //文章收藏
        vm.collect=function () {
            article.articleCollection(vm.aId, {token: token}).then(function (res) {
                if(res.data.code===0){
                    vm.params.collection=res.data.data.collectionNum;
                    vm.params.collectionStatus=res.data.data.collectionStatus;
                }else {
                    modelBox.alert (res.data.message)
                }

            });


        }
    });