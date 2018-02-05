'use strict';
angular.module('app')
    .factory('video',function ($http,ajaxAPI) {
        return {
            //视频列表
            videoList:function (params) {
                return $http.get(ajaxAPI.videoList(),{params:params});
            },
            //视频详情
            videoDetails:function (id,params) {
                return $http.get(ajaxAPI.videoDetails(id),{params:params});
            },
            //视频点赞
            videoUpvote:function (id,params) {
                return  $http({
                    method: "PUT",
                    url: ajaxAPI.videoUpvote(id),
                    params: params
                })
            },
            //视频收藏
            videoCollection:function (id,params) {
                return  $http({
                    method: "PUT",
                    url: ajaxAPI.videoCollection(id),
                    params: params
                })
            },
            //学生证
            studentCard:function (params) {
                return $http.get(ajaxAPI.studentCard(),{params:params});
            }
        }
    })
    .factory('homePage',function ($http,ajaxAPI) {
        return {
            //微信code
            sendCode:function (params) {
                return  $http({
                    method: "POST",
                    url: ajaxAPI.sendCode(),
                    params: params
                })
            },
            //签到页面展示
            signDay:function (params) {
                return $http.get(ajaxAPI.signDay(),{params:params});
            },
            //签到行为
            signIn:function (params) {
                return   $http({
                    method: 'POST',
                    url: ajaxAPI.signIn(),
                    params: params
                })
            }
        }
    })
    .factory('user',function ($http,ajaxAPI) {
        return {
            //学生证
            studentCard:function (params) {
                return $http.get(ajaxAPI.studentCard(),{params:params});
            },
            //获取微信信息
            wxMes:function (params) {
                // return $http.post(ajaxAPI.wxMes(),params);
                return  $http({
                    method: "post",
                    url: ajaxAPI.wxMes(),
                    params: params
                })
            },
            //微信图片上传
            wxUpImage:function (params) {
                return  $http({
                    method: "post",
                    url: ajaxAPI.wxUpImage(),
                    params: params
                })
            },
            //手机验证码
            getTelCode:function (params) {
                // return $http.post(ajaxAPI.getTelCode(),params);
                return  $http({
                    method: "post",
                    url: ajaxAPI.getTelCode(),
                    params: params
                })
            },
            //手机绑定
            bindTel:function (params) {
                // return $http.put(ajaxAPI.bindTel(),params);
                return  $http({
                    method: "put",
                    url: ajaxAPI.bindTel(),
                    params: params
                })
            },
            //邮箱验证码
            getEmailCode:function (params) {
                // return $http.post(ajaxAPI.getEmailCode(),params);
                return  $http({
                    method: "post",
                    url: ajaxAPI.getEmailCode(),
                    params: params
                })
            },
            //邮箱绑定
            bindemail:function (params) {
                // return $http.put(ajaxAPI.bindemail(),params);
                return  $http({
                    method: "put",
                    url: ajaxAPI.bindemail(),
                    params: params
                })
            },
            //展示绑定页面
            bind:function (params) {
                return $http.get(ajaxAPI.bind(),{params:params});
            },
            // 学生资料编辑
            userRdit:function (params) {
                // return $http.put(ajaxAPI.userRdit(),params);
                return  $http({
                    method: "put",
                    url: ajaxAPI.userRdit(),
                    params: params
                })
            },
            //文章收藏列表
            colArticle:function (params) {
                return $http.get(ajaxAPI.colArticle(),{params:params});
            },

            //视频收藏列表
            colVideo:function (params) {
                return $http.get(ajaxAPI.colVideo(),{params:params});
            }

        }
    })

    .factory('article',function ($http,ajaxAPI) {
        return {
            //文章列表
            articleList:function (params) {
                return $http.get(ajaxAPI.articleList(),{params:params});
            },
            //文章详情
            articleDetails:function (id,params) {
                return $http.get(ajaxAPI.articleDetails(id),{params:params});
            },
            //文章点赞
            articleUpvote:function (id,params) {
                // return $http.put(ajaxAPI.articleUpvote(id),params);
                return  $http({
                    method: "put",
                    url: ajaxAPI.articleUpvote(id),
                    params: params
                })
            },
            //文章收藏
            articleCollection:function (id,params) {
                // return $http.put(ajaxAPI.articleCollection(id),params);
                return  $http({
                    method: "put",
                    url: ajaxAPI.articleCollection(id),
                    params: params
                })
            }

        }


    });
