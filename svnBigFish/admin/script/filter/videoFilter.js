/**
 * Created by Administrator on 2018/1/26/026.
 */
'use strict';
angular.module('myApp')
    .filter('titleFilter', function (type) {
        return function (input) {
            if (input !== "" && input !== undefined) {
                return type[input];
            }
        }
    })
angular.module('myApp')
    .filter('gradeFilter', function (grade) {
        return function (input) {
            if (input !== "" && input !== undefined) {
                return grade[input];
            }
        }
    })
angular.module('myApp')
    .filter('subjectFilter', function (subject) {
        return function (input) {
            if (input !== "" && input !== undefined) {
                return subject[input];
            }
        }
    })
angular.module('myApp')
    .filter('statusFilter', function (status) {
        return function (input) {
            if (input !== "" && input !== undefined) {
                return status[input];
            }
        }
    })
angular.module('myApp')
.filter("putAwayFilter", function (putAway) {
    return function (input) {
        if (input !== "" && input !== undefined) {
            return putAway[input];
        }
    }

});