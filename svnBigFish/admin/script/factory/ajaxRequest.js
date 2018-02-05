/**
 * Created by Administrator on 2018/1/26/026.
 */
'use strict';
angular.module('myApp')
    .factory('video', video)
    .factory('backModule', backModule)
    .factory('article', article)
    .factory('user', user);

video.inject = ['$http', 'ajaxAPI'];
backModule.inject = ['$http', 'ajaxAPI'];
article.inject = ['$http', 'ajaxAPI'];
user.inject = ['$http', 'ajaxAPI'];

function video($http, ajaxAPI) {
    return {
        //视频列表
        videoList: function (params) {
            return $http.get(ajaxAPI.videoList(), {params: params});
        },
        //上/下架视频接口
        videoStatus: function (id) {
            return $http.put(ajaxAPI.videoStatus(id));
        },
        //查看视频接口
        getVideo: function (id) {
            return $http.get(ajaxAPI.getVideo(id));
        },
        //新增视频接口
        videoAdd: function (params) {
            return $http({
                method: "POST",
                url: ajaxAPI.videoAdd(),
                // headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: params
            });
        },
        //编辑视频接口
        videoCompile: function (id, params) {
            return $http({
                method: "PUT",
                url: ajaxAPI.videoCompile(id),
                // headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: params
            });
        },
        //老师列表
        teacherList: function () {
            return $http.get(ajaxAPI.teacherList());
        },
        //新增老师
        teacherAdd: function (params) {
            return $http({
                method: "POST",
                url: ajaxAPI.teacherAdd(),
                params: params
            });
        },
        //删除老师
        deleteTeacher: function (id) {
            return $http.delete(ajaxAPI.deleteTeacher(id));
        }

    }
}

// angular.module('myApp')
//     .factory('backModule',backModule)


function backModule($http, ajaxAPI) {
    return {
        login: function (params) {
            return $http({
                method: "POST",
                url: ajaxAPI.login(),
                // headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: params
            })
        },
        logout: function () {
            return $http({
                method: "POST",
                url: ajaxAPI.logout()
            })
        },
        //密码修改
        password: function (params) {
            return $http({
                method: "PUT",
                url: ajaxAPI.password(),
                params: params
            })
        },
        /********
         * 账号管理
         *****************/
        //账号管理列表
        accountList: function (params) {
            return $http.get(ajaxAPI.accountList(), {params: params});
        },
        //删除账号
        deleteAccount: function (id) {
            return $http.delete(ajaxAPI.deleteAccount(id));
        },
        //查看账号
        getAccount: function (id) {
            return $http.get(ajaxAPI.getAccount(id));
        },
        //新增账号
        accountAdd: function (params) {
            return $http({
                method: "POST",
                url: ajaxAPI.accountAdd(),
                params: params
            });
        },
        //编辑账号
        accountCompile: function (id, params) {
            return $http({
                method: "PUT",
                url: ajaxAPI.accountCompile(id),
                params: params
            });
        },
        /********
         * 角色管理
         *****************/
        //角色管理列表
        rolList: function () {
            return $http.get(ajaxAPI.rolList());
        },
        //删除角色
        deleteRole: function (id) {
            return $http.delete(ajaxAPI.deleteRole(id));
        },
        //查看角色
        getRole: function (id) {
            return $http.get(ajaxAPI.getRole(id));
        },
        //新增角色
        roleAdd: function (params) {
            return $http({
                method: "POST",
                url: ajaxAPI.roleAdd(),
                params: params
            });
        },
        //编辑角色
        roleCompile: function (id, params) {
            return $http({
                method: "PUT",
                url: ajaxAPI.roleCompile(id),
                params: params
            });
        },
        /*********
         * 模块管理
         *****************/
        //模块管理列表
        moduleList: function (params) {
            return $http.get(ajaxAPI.moduleList(), {params: params});
        },
        //删除模块
        deleteModule: function (id) {
            return $http.delete(ajaxAPI.deleteModule(id));
        },
        //查看模块
        getModule: function (id) {
            return $http.get(ajaxAPI.getModule(id));
        },
        //新增模块
        moduleAdd: function (params) {
            return $http({
                method: "POST",
                url: ajaxAPI.moduleAdd(),
                params: params
            });
        },
        //编辑模块
        moduleCompile: function (id, params) {
            return $http({
                method: "PUT",
                url: ajaxAPI.moduleCompile(id),
                params: params
            });
        }
    }
}

// .factory('article',article);


function article($http, ajaxAPI) {
    return {
        /********
         * 文学部
         *****************/
        //文章列表

        articleList: function (params) {
            return $http.get(ajaxAPI.articleList(), {params: params});
        },

        //上/下架文章
        articleStatus: function (id, params) {
            return $http({
                method: "PUT",
                url: ajaxAPI.articleStatus(id),
                params: params
            });
        },
        //查看文章
        getarticle: function (id) {
            return $http.get(ajaxAPI.getarticle(id));
        },

        //编辑文章
        articleCompile: function (id, params) {
            return $http({
                method: "PUT",
                url: ajaxAPI.articleCompile(id),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                params: params
            });
        },

        // 文章新增

        articleAdd: function (params) {
            return $http({
                method: "POST",
                url: ajaxAPI.articleAdd(),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                params: params
            });
        }


    }


}

// .factory('user',user);


function user($http, ajaxAPI) {
    return {
        //用户列表
        userList: function (params) {
            return $http.get(ajaxAPI.userList(), {params: params});
        },
        //用户详情
        userLook: function (id) {
            return $http.get(ajaxAPI.userLook(id));
        },


        //用户冻结&解冻
        userStatues: function (id, params) {
            return $http({
                method: "PUT",
                url: ajaxAPI.userStatues(id),
                params: params
            });
        }

    }

}