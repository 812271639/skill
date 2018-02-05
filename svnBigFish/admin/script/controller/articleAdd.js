/**
 * Created by Administrator on 2018/1/26/026.
 */
'use strict';
angular.module('myApp')
    .controller('ArticleDetailCtrl', ArticleDetailCtrl);

ArticleDetailCtrl.inject = ['$state', 'type', '$stateParams', 'FileUploader', 'article', 'modelBox', 'messages'];

function ArticleDetailCtrl($state, type, $stateParams, FileUploader, article, modelBox, messages) {
    var vm = this;
    vm.aId = $stateParams.id;
    vm.type = type;
    vm.params = $state.params;
    //富文本编辑器
    vm.config = {};
    vm.articleEditor = {
        text: ''
    };
    vm.condition = true;


    //上传图片
    var uploader = vm.uploader = new FileUploader({
        url: '/ajax/a/upload/article'
    });


    //上传图片成功执行的回调函数
    uploader.onSuccessItem = function (fileItem, response, status, headers) {
        vm.params.cover = response.data.url;
        console.log(fileItem.file.size / 1024 / 1024);
        if (fileItem.file.size / 1024 / 1024 >= 5) {
            modelBox.alert("上传图片大于5M")
        }

    };
    //上传图片失败执行的回调函数
    uploader.onErrorItem = function (fileItem, response, status, headers) {
        console.info('onErrorItem', fileItem, response, status, headers);
        vm.statusText = response.data.message;
        console.log(uploader.queue[0].file.size)
    };

    //  、新增&新增
    if (vm.aId) {
        vm.titleName = "文章编辑";
        vm.yes = "修改";
        var alertBody = "文章内容修改成功";
        article.getarticle(vm.aId).then(function (res) {
            if (res.data.code === 0) {
                vm.params = res.data.data;
                vm.articleEditor.text = vm.params.mainBody;
            } else if (res.data.code == -9008) {
                modelBox.alert(messages.pleaseLogin, function () {
                    $state.go('login', {}, {reload: true});
                })
            } else {
                modelBox.alert(res.data.message)
            }
        });
    } else {
        vm.titleName = "文章新增";
        vm.yes = "保存";
        var alertBody = "文章内容保存成功";
    }
    //保存
    vm.save = function () {
        modelBox.confirm(alertBody, function () {
            if (vm.aId) {
                article.articleCompile(vm.aId, vm.params).then(function (res) {
                    if (res.data.code === 0) {
                        $state.go('admin.article', {}, {reload: true});
                    } else if (res.data.code == -9008) {
                        modelBox.alert(messages.pleaseLogin, function () {
                            $state.go('login', {}, {reload: true});
                        })
                    }
                    else {
                        modelBox.alert(res.data.message)
                    }
                })

            } else {

                article.articleAdd(vm.params).then(function (res) {
                    if (res.data.code === 0) {
                        $state.go('admin.article', {}, {reload: true});
                    } else if (res.data.code == -9008) {
                        modelBox.alert(messages.pleaseLogin, function () {
                            $state.go('login', {}, {reload: true});
                        })
                    } else {
                        modelBox.alert(res.data.message)
                    }
                })
            }
        });

    };


    //取消
    vm.cancel = function () {
        modelBox.confirm("确定取消编辑内容？", function () {
            $state.go('admin.article', {}, {reload: true});
        });
    }
}