'use strict';
angular.module('app')
    .factory('ajaxAPI', function () {
        return {
            /********************
             * 微信模块
             **********************************/
            //发送code
            sendCode:function () {
                return  '/ajax/a/wx/code'
            },
            //获取微信信息
            wxMes:function () {
                return '/ajax/a/wx/message'
            },
            //微信图片上传
            wxUpImage:function () {
                return '/ajax/a/wx/picture'
            },


            /********************
             * 签到
             **********************************/
            //签到页面展示
            signDay:function () {
                return '/ajax/a/u/sign';
            },
            //用户签到(行为)
            signIn:function () {
                return '/ajax/a/u/sign';
            },
            /********************
             * 影像部
             **********************************/

            //视频列表
            videoList: function () {
                return '/ajax/a/u/video/list'
            },
            //视频详情
            videoDetails:function (vid) {
                return '/ajax/a/u/video/' + vid
            },
            //.视频点赞
            videoUpvote:function (vid) {
                return  '/ajax/a/u/video/upvote/' + vid
            },
            //视频收藏
            videoCollection:function ( vid) {
                return  '/ajax/a/u/video/collection/' + vid
            },

            /********************
             * 学生卡
             **********************************/
            //学生证
            studentCard:function () {
                return '/ajax/a/u/student'
            },
            //手机验证码
            getTelCode:function () {
                return '/ajax/a/tel/code'
            },
            //手机绑定
            bindTel:function () {
                return '/ajax/a/tel'
            },
            //邮箱验证码
            getEmailCode:function () {
                return '/ajax/a/email/code'
            },
            //邮箱绑定
            bindemail:function () {
                return '/ajax/a/email'
            },
            //展示绑定页面
            bind:function () {
                return '/ajax/a/u/bind'
            },
            // 学生资料编辑
            userRdit:function () {
                return '/ajax/a/u/student'
            },
            //文章收藏列表
            colArticle:function () {
                return '/ajax/a/u/student/collection/article'
            },

            //视频收藏列表
            colVideo:function () {
                return '/ajax/a/u/student/collection/video'
            },

            /********************
             * 文学部
             **********************************/

            //    文章列表
            articleList:function () {
                return '/ajax/a/u/article/list'
            },
            //文章详情
            articleDetails:function (aid) {
                return '/ajax/a/u/article/' + aid
            },
            //.文章点赞
            articleUpvote:function (aid) {
                return  '/ajax/a/u/article/upvote/' + aid
            },
            //文章收藏
            articleCollection:function (aid) {
                return  '/ajax/a/u/article/collection/' + aid
            }


        }
    });