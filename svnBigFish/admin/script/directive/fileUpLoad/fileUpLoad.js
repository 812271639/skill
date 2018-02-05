/**
 * Created by Administrator on 2018/1/26/026.
 */
'use strict';
angular.module('myApp')
.directive('upLoad',[function () {
    return {
        restrict: 'AE',
        templateUrl:'script/directive/fileUpLoad/fileUpLoad.html',
        scope:{
            url:'=',
            returnUrl:'=',
            pictureName:'='
        },
        controller:function ($scope,FileUploader) {
            console.log($scope.url);
            var uploader = $scope.uploader = new FileUploader({     //-图片上传
                method: "POST",
                url: $scope.url,
                queueLimit: 1
            });
            uploader.onAfterAddingFile = function (fileItem) {
                // console.log(fileItem);
                // console.log(fileItem.file.size);
                $scope.fileSize = fileItem.file.size/1024/1024; //图片尺寸
            };

            uploader.onSuccessItem = function (fileItem, response) { //图片预览的回调函数
                $scope.returnUrl = response.data.url;                 //获取返回的url地址，作为$http的img参数传入
            };
            $scope.removeResponseUrl = function () {                 //点击删除清空responseUrl，用于按钮disable判断
                $scope.return = null;
            };
        }
    }
}]);
