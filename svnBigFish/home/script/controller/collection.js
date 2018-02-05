/**
 * Created by Administrator on 2018/1/20/020.
 */
'use strict';
angular.module('app')
    .controller('collection', function ($scope,$http,$state,$timeout,modelBox,user) {
        var vm = this;
        var token = sessionStorage.getItem('token');
        vm.loadArticle = '点击加载更多';
        vm.loadMore = '点击加载更多';
        //总页数
        var totalPage = 1;
        //当前页
        var currentPage = 0;
        var size = 10;

        //文章收藏
        vm.aMore = function () {
            vm.params={
                token: token,
                size: size
            }
            user.colArticle(vm.params).then(function (res) {
                if (res.data.code === 0) {

                    vm.articleData = res.data.data;
                    console.log(vm.articleData);
                    totalPage = Math.ceil(res.data.total / 10);
                    currentPage++;
                    size += 10;
                    if ((currentPage + 1) > totalPage) {
                        vm.loadArticle = '已加载全部数据';
                    }
                } else {
                    modelBox.alert(res.data.message)
                }
            });

            //定时器
            if ((currentPage + 1) > totalPage) {
                vm.noMore = true;
                $timeout(function () {
                    vm.noMore = false;
                }, 2000)
            }

        };
        vm.aMore();


        //视频收藏
        vm.vMore=function () {

            vm.params= {
                token: token,
                    size: size
            };

            user.colVideo(vm.params).then(function (res) {
                    if (res.data.code === 0) {

                        vm.videoData = res.data.data;
                        console.log(vm.videoData);
                        totalPage = Math.ceil(res.data.total / 10);
                        currentPage++;
                        size += 10;
                        if ((currentPage + 1) > totalPage) {
                            vm.loadMore = '已加载全部数据';
                        }
                    } else {
                        modelBox.alert(res.data.message)
                    }
                });

                //定时器
                if ((currentPage + 1) > totalPage) {
                    vm.noMore = true;
                    $timeout(function () {
                        vm.noMore = false;
                    }, 2000)
                }


        };
        vm.vMore();








        //跳转文章详情
        vm.reArticle=function (index) {
            vm.aId=vm.articleData[index].id;
            console.log(vm.aId);
            $state.go('article',
                {
                    id:vm.aId
                },
                {reload: true});
        };

    });