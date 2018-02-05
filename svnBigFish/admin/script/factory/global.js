/**
 * Created by Administrator on 2018/1/26/026.
 */
'use strict';
angular.module('myApp')
    .factory('modelBox', modelBox)
    .factory('messages', messages)
    .factory('empty', empty);

function modelBox() {
    return {
        alert: function (message, callback) {
            bootbox.alert({
                title: "提示",
                backdrop: 'static',
                message: "<div style='text-align: center;font-size: 1.8rem;color: #03A9F4'>" + message + "</div>",
                buttons: {
                    ok: {
                        label: '确定',
                        className: 'btn-success'
                    }
                },
                callback: function () {
                    if (callback) {
                        callback();
                    }

                }
            });
        },
        confirm: function (message, callback, cancel) {
            bootbox.confirm({
                message: "<div style='text-align: center;font-size: 1.8rem;color: #03A9F4'>" + message + "</div>",
                title: "提示",
                backdrop: 'static',
                onEscape: true,
                buttons: {
                    confirm: {
                        label: '确定',
                        className: 'btn-danger'
                    },
                    cancel: {
                        label: '取消',
                        className: 'btn-success'
                    }
                },
                callback: function (result) {
                    if (result) {
                        callback();    //callback 为传入的回调函数
                    } else if (!result && cancel) {
                        cancel();
                    }
                }
            });
        }
    }
}

// angular.module('myApp')
// .factory('messages',messages);

function messages() {
    return {
        logout: '确定要退出吗？',
        saveSuccess: '保存成功',
        addSuccess: '新增成功',
        compileSuccess: '编辑成功！',
        modificationSuccess: '修改成功！',
        delete: '确定要删除吗？',
        deleteSuccess: '删除成功',
        pleaseLogin: '您以下线，请从新登录！',
        overBanner: "上架的banner图已经有8张了，请先下架banner图后再上架"
    }
}

// angular.module('myApp')
// .factory('empty',empty);

function empty() {
    return {
        forIn: function (forIn) {
            for (var x in forIn) {
                forIn[x] = '';
            }
            return forIn;
        }
    }
}