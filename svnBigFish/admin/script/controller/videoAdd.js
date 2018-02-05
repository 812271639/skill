/**
 * Created by Administrator on 2018/1/26/026.
 */
'use strict';
angular.module('myApp')
    .controller('VideoDetailCtrl', VideoDetailCtrl);

VideoDetailCtrl.$inject = ['$state', '$stateParams', 'grade', 'subject', 'type', 'modelBox', 'video', 'messages'];

function VideoDetailCtrl($state, $stateParams, grade, subject, type, modelBox, video, messages) {
    var vm = this;
    vm.grade = grade;
    vm.subject = subject;
    vm.type = type;
    vm.button = "保存";

    vm.config = {};                                //百度编辑器获取内容
    vm.videoEditor = {
        text: ''
    };
    // vm.condition = true;
    //获取老师信息
    video.teacherList().then(function (response) {
        if (response.data.code === 0) {
            vm.teacherData = response.data.data;
            if ($stateParams.vid) {
                //获取视频
                video.getVideo($stateParams.vid).then(function (response) {
                    if (response.data.code === 0) {
                        vm.videoList = response.data.data;
                        vm.videoEditor.text = vm.videoList.mainBody;
                        vm.returnUrl = vm.videoList.cover;
                        angular.forEach(vm.teacherData, function (value) {
                            if (value.tid == vm.videoList.tid) {
                                return vm.image = value;
                            }
                        });
                    } else if (response.data.code == -9008) {
                        modelBox.alert(messages.pleaseLogin, function () {
                            $state.go('login', {}, {reload: true});
                        })
                    } else {
                        modelBox.alert(response.data.message)
                    }
                });
                vm.button = "修改";
            }
        } else if (response.data.code == -9008) {
            modelBox.alert(messages.pleaseLogin, function () {
                $state.go('login', {}, {reload: true});
            })
        } else {
            modelBox.alert(response.data.message)
        }
    });

    //---------------------------------------------------新增老师&banner图
    vm.add = false;//初始隐藏上传头像功能
    //添加老师
    vm.addTeacher = function () {
        vm.add = true;
        vm.teacher = '/ajax/a/upload/teacher';  //老师上传图片接口
        vm.head = "头像";
    };
    vm.teacher = '/ajax/a/upload/teacher';  //老师上传图片接口
    vm.banner = '/ajax/a/upload/video';  //banner上传图片接口
    vm.picture = "封面";
    //取消添加老师
    vm.cancelTeacher = function () {
        vm.add = false;
    };
    //保存老师
    vm.saveTeacher = function () {
        vm.params = {
            teacherName: vm.teacherName,
            teacherAvatar: vm.image
        };
        video.teacherAdd(vm.params)
            .then(function (response) {
                if (response.data.code === 0) {
                    modelBox.alert(messages.saveSuccess);
                    $state.go('admin.videoAdd', {}, {reload: true});
                } else if (response.data.code == -9008) {
                    modelBox.alert(messages.pleaseLogin, function () {
                        $state.go('login', {}, {reload: true});
                    })
                } else {
                    modelBox.alert(response.data.message)
                }
            });

    };
    vm.deleteTeacher = function (id) {
        if ((id !== '') && (id !== undefined)) {

            modelBox.confirm(messages.delete, function () {
                video.deleteTeacher(id).then(function (response) {
                    if (response.data.code === 0) {
                        $state.go('admin.videoAdd', {}, {reload: true});
                        modelBox.alert(messages.deleteSuccess)
                    } else if (response.data.code == -9008) {
                        modelBox.alert(messages.pleaseLogin, function () {
                            $state.go('login', {}, {reload: true});
                        })
                    } else {
                        modelBox.alert(response.data.message)
                    }
                });
            });

        }
    };
    vm.addVideo = function () {
        vm.videoList.tid = vm.image.tid;
        vm.videoList.cover = vm.returnUrl;
        vm.videoList.mainBody = vm.videoEditor.text;
        vm.videoList.tid = vm.image.tid;
        vm.videoList.duration = isNaN(angular.element('video')[0].duration) ? '' : Math.round(angular.element('video')[0].duration * 1000);
        if ($stateParams.vid) {
            video.videoCompile($stateParams.vid, vm.videoList).then(function (response) {
                if (response.data.code === 0) {
                    modelBox.alert(messages.compileSuccess);
                    $state.go('admin.video', {}, {reload: true});
                } else if (response.data.code == -9008) {
                    modelBox.alert(messages.pleaseLogin, function () {
                        $state.go('login', {}, {reload: true});
                    })
                } else {
                    modelBox.alert(response.data.message)
                }
            });
        } else {
            video.videoAdd(vm.videoList).then(function (response) {
                if (response.data.code === 0) {
                    modelBox.alert(messages.saveSuccess);
                    $state.go('admin.video', {}, {reload: true});
                } else if (response.data.code == -9008) {
                    modelBox.alert(messages.pleaseLogin, function () {
                        $state.go('login', {}, {reload: true});
                    })
                } else {
                    modelBox.alert(response.data.message)
                }
            });
        }
    };
    vm.cancel = function () {
        $state.go('admin.video', {}, {reload: true});
    };
    vm.fn = function (invalid) {
        if (invalid) {
            modelBox.alert('上传视频格式错误，请上传MP4格式视频');
        }
    };
}