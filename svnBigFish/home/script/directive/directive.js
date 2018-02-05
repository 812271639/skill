'use strict';
angular.module('app')
    .directive('signDay', [function () {
        return {
            restrict: 'AE',
            templateUrl: 'view/signDay.html',
            controller: function () {
                (function () {
                    var today = new Date();
                    var year = today.getFullYear();
                    var month = today.getMonth() + 1;
                    var day = today.getDate();
                    var startDay = new Date(year, month - 1, 1).getDay();
                    var nDays = new Date(year, month, 0).getDate();
                    var numRow = 0;
                    var i;
                    var html = '';
                    html += '<div>';
                    html += '<ul>';
                    for (i = 0; i < startDay; i++) {
                        html += '<li class="myOldDay "></li>';
                        numRow++;
                    }

                    for (var j = 1; j <= nDays; j++) {
                        if (j == day) {
                            html += '<li class="myToday myDay">';
                            html += j;
                        } else {
                            html += '<li class="myDay">';
                            html += j;
                        }

                        html += '</li>';
                        numRow++;
                        if (numRow == 7) {
                            numRow = 0;
                            html += '</ul><ul>';
                        }
                    }
                    html += '</div>';
                    $('#Container').append(html)
                })();
            }
        }
    }]);
angular.module('app')
    .directive('synopsisPucker', function () {
        return {
            restrict: 'A',
            scope: {num: '=ngModel'},
            link: function (scope, ele) {
                var a = ele.find('a');
                var isOpen = false;
                a.on('click', function () {
                    scope.$apply(scope.num = isOpen ? false : true);
                    isOpen = !isOpen;
                })
            }
        }
    });