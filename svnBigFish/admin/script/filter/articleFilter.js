/**
 * Created by Administrator on 2018/1/26/026.
 */
'use strict';
angular.module('myApp')

.filter('statusFilter', function (status) {
    return function (input) {
        if (input !== "" && input !== undefined) {
            return status[input];
        }
    }
})
angular.module('myApp')
    .filter('typeFilter', function (type) {
        return function (input) {
            if (input !== "" && input !== undefined) {
                return type[input];
            }
        }
    })
angular.module('myApp')
    .filter('putOnFilter', function (putOn) {
        return function (input) {
            if (input !== "" && input !== undefined) {
                return putOn[input];
            }
        }
    })
angular.module('myApp')
    .filter('gradeFilter', function (grades) {
        return function (input) {
            if (input !== "" && input !== undefined) {
                return grades[input];
            }
        }
    })
angular.module('myApp')
    .filter('userStatusFilter', function (userStatus) {
        return function (input) {
            if (input !== "" && input !== undefined) {
                return userStatus[input];
            }
        }
    })
angular.module('myApp')
    .filter('useFilter', function (useStatus) {
        return function (input) {
            if (input !== "" && input !== undefined) {
                return useStatus[input];
            }
        }
    });