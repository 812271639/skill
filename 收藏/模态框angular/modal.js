//
// angular.module('myApp', ['ngAnimate', 'ngSanitize', 'ui.bootstrap']);
// angular.module('myApp').controller('my', function ($uibModal,$scope) {
//     // $scope.picture = './rose.png';
//     $scope.open = function (size) {
//         var modalInstance = $uibModal.open({
//             templateUrl: "modal1.html",
//             controller: 'okCtrl',
//             backdrop: false,
//             size: size,
//             resolve: {
//             }
//         });
//         modalInstance.result.then(function () {
//             $scope.openMultipleModals();
//             console.log(1111)
//         }, function () {
//             console.log(222)
//         });
//     };
//     $scope.openMultipleModals = function () {
//         $uibModal.open({
//             templateUrl: "modal2.html",
//             controller: 'okCtrl'
//         });
//     };
// });
// angular.module('myApp').controller('okCtrl', function ($scope,$uibModalInstance) {
//     $scope.ok = function () {
//         $uibModalInstance.close();
//     };
//     $scope.cancel = function () {
//         $uibModalInstance.dismiss('cancel');
//     };
//     $scope.rrr = function () {
//         $uibModalInstance.close();
//
//     };
// });

//加载页面就执行
angular.module('myApp', ['ngAnimate', 'ngSanitize', 'ui.bootstrap']);
angular.module('myApp').controller('my', function ($uibModal,$scope) {
    // $scope.picture = './rose.png';
    $scope.open = function (size) {
        var modalInstance = $uibModal.open({
            templateUrl: "modal1.html",
            controller: 'okCtrl',
            backdrop: false,
            size: size,
            resolve: {
            }
        });
        modalInstance.result.then(function () {
            $scope.openMultipleModals();
            console.log(1111)
        }, function () {
            console.log(222)
        });
    };
    $scope.open ();//加载页面就执行
});
angular.module('myApp').controller('okCtrl', function ($scope,$uibModalInstance) {
    $scope.ok = function () {
        $uibModalInstance.close();
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
    $scope.rrr = function () {
        $uibModalInstance.close();

    };
});