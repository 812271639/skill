/**
 * Created by Administrator on 2018/1/10/010.
 */
'use strict';
angular.module('app')
    .controller('articleList', function ($scope,$http,$state,$timeout,article,modelBox) {
        var vm = this;
        vm.myInterval = 3000;      //轮播的时间间隔
        vm.noWrapSlides = false;    //是否循环轮播
        vm.active = 0;               //起始所显示的图片（0：下标为0的图片）
        var token = sessionStorage.getItem('token');
        //跳转card
        vm.goArticle=function (index) {
            vm.aId=vm.params.banner[index].id;
            $state.go('article', {id:vm.aId}, {reload: true});
        };
        //跳转banner
        vm.reArticle=function (index) {
            vm.aId=vm.params.card[index].id;
            $state.go('article',
                {
                    id:vm.aId
                },
                {reload: true});
        };


        vm.loadMore = '点击加载更多';
        //总页数
        var totalPage = 1;
        //当前页
        var currentPage = 0;
        var size = 10;
        //点击加载更多



        vm.clickMore=function () {

            vm.params={
                token: token,
                size: size
            };

            article.articleList(vm.params).then(function (res) {
                if(res.data.code===0){
                    totalPage = Math.ceil(res.data.total / 10);
                    currentPage++;
                    size += 10;

                    vm.params=res.data.data;
                    vm.banner=vm.params.banner;

                    var slides = vm.slides = [];
                    var currIndex = 0;

                    for (var i = 0; i < vm.banner.length; i++) {
                        slides.push({
                            image: vm.banner[i].cover,
                            id: currIndex++
                        });

                    }
                    if ((currentPage+1) >totalPage) {
                        vm.loadMore = '已加载全部数据';
                    }
                }else {
                    modelBox.alert(res.data.message)
                }

            });


            //定时器
            if ((currentPage+1) >totalPage) {
                vm.noMore = true;
                $timeout(function () {
                    vm.noMore = false;
                },2000)
            }
        };

        vm.clickMore();

    });
