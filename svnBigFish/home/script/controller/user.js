
'use strict';
angular.module('app')
    .controller('user', function ($scope,$http,$state,$location,user,modelBox) {
        var vm = this;
        vm.params = $state.params;
        vm.img=null;

        var token = sessionStorage.getItem('token');
        var accessToken=null;
        //获取当前url
        var url=$location.absUrl();
        console.log(url);

        //获取用户信息
        user.studentCard({token: token}).then(function (res) {

            if(res.data.code===0){
                vm.params=res.data.data;
                vm.img=res.data.data.avatar;

            }else {
                modelBox.alert (res.data.message)
            }

        });



        //mobisrcll移动端滑动插件
        $("#sex-list_dummy").click(function () {
            var that = this;
            $("#sex-list").mobiscroll().treelist({
//            theme: "android-ics",
                theme:"android-ics white",
                lang: "zh",
                defaultValue:[vm.params.grade],
                display: 'bottom',
                inputClass: 'u-nickname',
                onSelect: function (valueText) {
                    vm.params.grade=valueText;
                    var m = $(this).find("li").eq(valueText).html();
                    document.getElementById("sex-list_dummy").value=$(this).find("li").eq(valueText).html();
                }
            });
            $("input[id^=sex-list]").focus();
        });




        //根据后端提供的参数配置wx
        user.wxMes({token: token,url:url}).then(function (res) {
            if(res.data.code===0){
                vm.data=res.data.data;
                accessToken=res.data.data.accessToken;
                //微信配置
                wx.config({
                    debug:false,
                    appId:'wx0b31bcd6cbe880a4',
                    timestamp:vm.data.timestamp,
                    nonceStr:vm.data.nonceStr,
                    signature:vm.data.signature,
                    jsApiList:['checkJsApi','uploadImage','downloadImage','chooseImage']
                });
            }else {
                modelBox.alert(res.data.message)
            }
        });



        wx.checkJsApi({
            jsApiList: ['chooseImage','uploadImage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
            success: function(res) {
                // 以键值对的形式返回，可用的api值true，不可用为false
                // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}

            }
        });

        //换头像

        vm.replace=function () {
            wx.chooseImage({
                count:1,
                sizeType:['compressed'],
                sourceType:['camera','album'],
                success:function (res) {
                    vm.localId=res.localIds[0];
                    //上传图片
                    wx.uploadImage({
                        localId: vm.localId, // 需要上传的图片的本地ID，由chooseImage接口获得
                        isShowProgressTips: 0, // 默认为1，显示进度提示
                        success: function (res) {
                            var mediaId = res.serverId; // 返回图片的服务器端ID
                            user.wxUpImage({mediaId:mediaId}).then(function (res) {
                                if(res.data.code===0){
                                    vm.img=res.data.data.avatarUrl;
                                }else {
                                    modelBox.alert(res.data.message)
                                }
                            });
                        }
                    });
                }
            });

        };





        //学生资料编辑
        vm.save=function () {
                vm.params={
                    avatar:vm.img,
                    nickname:vm.params.nickname,
                    grade:vm.params.grade,
                    token: token
            };
            user.userRdit(vm.params).then(function (res) {
                if(res.data.code===0){
                    $state.go('user',{reload: true})
                }else {
                    alert (res.data.message)
                }
            });

        };

    });






