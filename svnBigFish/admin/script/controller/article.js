/**
 * Created by Administrator on 2018/1/26/026.
 */
'use strict';
angular.module('myApp')
    .controller('ArticleCtrl', ArticleCtrl);

ArticleCtrl.inject = ['$state', 'type', 'status', 'articleState', 'article', 'modelBox', 'messages', 'empty'];

function ArticleCtrl($state, type, status, articleState, article, modelBox, messages, empty) {
    var vm = this;
    vm.params = $state.params;
    vm.type = type;
    vm.status = status;
    vm.articleState = articleState;
    vm.pageUrl = 'admin.article'; //分页插件，本页url


    //文章列表
    article.articleList(vm.params).then(function (res) {
        if (res.data.code === 0) {
            vm.articleList = res.data.data;
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
        $state.go('admin.article', empty.forIn(vm.params), {reload: true});
    };
    vm.search = function () {

        $state.go('admin.article', vm.params, {reload: true});
    };


    //上下架
    vm.changeStatus = function (aId, status) {

        var needStatus = (status === articleState["offLine"]) ? articleState["onLine"] : articleState["offLine"];
        var putAway, soldOut;
        if (needStatus === articleState["offLine"]) {
            putAway = "是否上架该文章";
            soldOut = "上架成功"
        } else if (needStatus === articleState["onLine"]) {
            putAway = "是否下架该文章";
            soldOut = "下架成功"
        }


        modelBox.confirm(putAway, function () {
            article.articleStatus(aId).then(function (res) {
                if (res.data.code === 0) {
                    $state.go('admin.article', {}, {reload: true});
                    modelBox.alert(soldOut)
                } else if (res.data.code == -9008) {
                    modelBox.alert(messages.pleaseLogin, function () {
                        $state.go('login', {}, {reload: true});
                    })
                } else {
                    modelBox.alert(res.data.message);
                }

            });
        });


    };


}