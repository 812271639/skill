/**
 * Created by Administrator on 2018/1/26/026.
 */
'use strict';
angular.module('myApp')
    .factory('ajaxAPI',ajaxAPI);
function ajaxAPI() {
        return {
            /********
             * 登录 退出
             *****************/
            //登录
            login: function () {
                return '/ajax/a/login'
            },
            //退出
            logout: function () {
                return '/ajax/a/u/logout'
            },
            /**********************
             *
             * 图片上传
             *
             ***************************************/

            //视频封面banner图
            videoBanner: function () {
                return '/ajax/a/upload/video'
            },
            //老师头像
            teacherPicture: function () {
                return '/ajax/a/upload/teacher'
            },

            /********************
             *
             * 视频部
             *
             **********************************/

            //视频列表
            videoList: function () {
                return '/ajax/a/u/video/list'
            },
            //上/下架视频接口
            videoStatus: function (vid) {
                return '/ajax/a/u/video/' + vid + '/status'
            },
            //查看视频
            getVideo: function (id) {
                return '/ajax/a/u/video/' + id
            },
            //编辑视频  和 视频新增
            videoAdd: function () {
                return '/ajax/a/u/video'
            },
            videoCompile: function (vid) {
                return  '/ajax/a/u/video/' + vid
            },
            /******** *
             * 老师接口*
             ****************/

            //老师列表
            teacherList: function () {
                return '/ajax/a/u/teacher/list'
            },
            //新增老师
            teacherAdd: function () {
                return '/ajax/a/u/teacher'
            },
            //删除老师
            deleteTeacher: function (id) {
                return '/ajax/a/u/teacher/' + id
            },

            /*******************
             *
             * 后台管理
             *
             ************************************/

            //密码修改
            password: function () {
                return '/ajax/a/u/reset'
            },

            /*********
             * 模块管理
             *****************/
            //模块管理列表
            moduleList: function () {
                return '/ajax/a/u/module/list'
            },
            //删除模块
            deleteModule: function (id) {
                return '/ajax/a/u/module/' + id
            },
            //查看模块
            getModule: function (id) {
                return '/ajax/a/u/module/' + id
            },
            //模块新增
            moduleAdd: function () {
                return  '/ajax/a/u/module'
            },
            //模块编辑
            moduleCompile: function (id) {
                return  '/ajax/a/u/module/' + id
            },
            /********
             * 角色管理
             *****************/
            //角色列表
            rolList: function () {
                return '/ajax/a/u/role/list'
            },
            //删除角色
            deleteRole: function (id) {
                return '/ajax/a/u/role/' + id
            },
            //查看角色
            getRole: function (id) {
                return '/ajax/a/u/role/' + id
            },
            //新增和编辑角色
            roleAdd: function () {
                return  '/ajax/a/u/role'
            },
            roleCompile: function (id) {
                return '/ajax/a/u/role/' + id
            },
            /********
             * 账号管理
             *****************/
            //账号管理列表
            accountList: function () {
                return '/ajax/a/u/manager/list'
            },
            //删除账号
            deleteAccount: function (id) {
                return '/ajax/a/u/manager/' + id
            },
            //查看账号
            getAccount: function (id) {
                return '/ajax/a/u/manager/'+ id
            },
            //新增账号
            accountAdd: function () {
                return  '/ajax/a/u/manager'
            },
            //编辑账号
            accountCompile: function (id) {
                return  '/ajax/a/u/manager/' + id
            },

            /********
             * 文学部
             *****************/
            //文章列表
            articleList: function () {
                return '/ajax/a/u/article/list'
            },
            //上/下架文章
            articleStatus: function (aid) {
                return '/ajax/a/u/article/' + aid + '/status'
            },
            //查看文章
            getarticle: function (id) {
                return '/ajax/a/u/article/' + id
            },
            //编辑文章  和 文章新增
            articleAdd: function () {
                return '/ajax/a/u/article'
            },
            articleCompile: function (aid) {
                return  '/ajax/a/u/article/' + aid
            },

            /********
             * 学生证
             *****************/
            //用户列表
            userList: function () {
                return '/ajax/a/u/user/list'
            },
            //用户详情
            userLook: function (uid) {
                return '/ajax/a/u/user/'+uid
            },
            //用户冻结&解冻
            userStatues:function (uid) {
            return '/ajax/a/u/user/freeze/'+uid
        }







    }
    };