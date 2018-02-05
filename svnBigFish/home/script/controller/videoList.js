
angular.module('app')
    .controller('VideoList', ['$http','grades','subjects','$state','$stateParams','$timeout','video','modelBox',
        function ($http, grades, subjects, $state, $stateParams, $timeout, video,modelBox) {
        var vm = this;
        vm.params = $state.params;
        vm.grades = grades;
        vm.subjects = subjects;
        vm.myInterval = 3000;      //轮播的时间间隔
        vm.noWrapSlides = false;    //是否循环轮播
        vm.active = 0;               //起始所显示的图片（0：下标为0的图片）
        vm.banner = null;
        //点击年级，科目显示隐藏
        vm.gradeList = false;
        vm.subjectList = false;
        vm.gradeClick = function () {
            vm.gradeList = !vm.gradeList;
            vm.subjectList = false;
        };
        vm.subjectClick = function () {
            vm.subjectList = !vm.subjectList;
            vm.gradeList = false;
        };
        //banner图跳转
        vm.bannerClick = function (id, url) {
            if (url) {
                $state.go('videoSee', {vid: id})
            }
        };
        //年级科目搜索
        vm.class = function (num) {
            $state.go('videoList', {class: num}, {reload: true})
        };
        vm.subject = function (num) {

            $state.go('videoList', {subject: num}, {reload: true})
        };

        var token = sessionStorage.getItem('token');
        vm.params.class = vm.params.class ? vm.params.class : 0;
        vm.params.subject = vm.params.subject ? vm.params.subject : 0;
        vm.loadMore = '点击加载更多';
        var totalPage = 1;
        var currentPage = 0;
        var size = 10;
        //获取视频列表
        vm.getVideo = function () {
            video.videoList(vm.params).then(function (response) {
                if(response.data.code === 0){
                    totalPage = Math.ceil(response.data.total / 10);
                    currentPage++;
                    size += 10;
                    vm.response = response.data.data;
                    vm.banner = vm.response.banner;
                    vm.card = vm.response.card;
                    //banner图
                    if (vm.banner) {
                        vm.banners();
                    }
                    if ((currentPage + 1) > totalPage) {
                        vm.loadMore = '已加载全部数据';
                    }
                }else {
                    modelBox.alert( response.data.message);
                }

            });
        };
        //banner图
        vm.banners = function () {
            var slides = vm.slides = []; //用于存放图片地址
            for (var i = 0; i < vm.banner.length; i++) {
                slides.push({
                    image: vm.banner[i].cover,
                    vid: vm.banner[i].id,
                    url: vm.banner[i].videoUrl,
                    id: i
                });
            }
        };
        //点击加载更多
        vm.clickMore = function () {
            vm.params = {
                grade: vm.params.class,
                subject: vm.params.subject,
                size: size,
                token: token
            };
            //首次进入视频列表，没有年级则首先获取用户信息，得到年级再进行请求数据
            if (!$stateParams.class) {
                //获取学生年级信息
                video.studentCard({token: token}).then(function (response) {
                    if(response.data.code === 0){
                        vm.response = response.data.data;
                        vm.params.class = response.data.data.grade; //获取用户年级
                        //获取视频列表
                        vm.getVideo();
                    }else {
                        modelBox.alert( response.data.message);
                    }

                });

            } else {
                //获取视频列表
                vm.getVideo();
            }
            //弹出已加载全部提示
            if ((currentPage + 1) > totalPage) {
                vm.noMore = true;
                $timeout(function () {
                    vm.noMore = false;
                }, 2000)
            }
        };
        vm.clickMore();
    }]);
