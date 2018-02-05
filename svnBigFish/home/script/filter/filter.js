/**
 * Created by Administrator on 2018/1/26/026.
 */
var app = angular.module('app');
app.filter('gradeFilter', ['grades', function (grades) {
    return function (input) {
        if (input !== '' && input !== undefined) {
            return grades[input]
        }
    }
}]);
app.filter('timeFilter', function ($filter) {
    var now = Math.round(new Date().getTime());
    return function (input) {
        var time = now - input;
        if (time < 3600000) {
            return "1小时前"
        } else if ((3600000 <= time) && (time < 86400000)) {
            return Math.round(time / 3600000) + '小时'
        } else if (time >= 86400000) {
            return $filter('date')(input, 'yyyy-MM-dd');
        }

    }
})
    .filter('trustUrl', ['$sce', function ($sce) {
        return function (url) {
            return $sce.trustAsResourceUrl(url);
        };
    }])
    .filter('secondFilter', function () {
        return function (input) {
            var seconds = input / 1000;
            var min = Math.floor(seconds / 60),
                second = Math.floor(seconds % 60);
            if (second < 10) {
                second = '0' + second;
            }
            if (min < 10) {
                min = '0' + min;
            }
            return min + ':' + second;
        }
    })
    .filter('removeHtml', function () {
        return function removeTAG(str) {
            if (str != '' && str != undefined) {
                str = str.replace(/<\/?[^>]*>/g, ''); //去除HTML tag
                str = str.replace(/[ | ]*\n/g, '\n'); //去除行尾空白
                // str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
                str = str.replace(/ /ig, '');//去掉
                return str;
            }

        }
    })
    //字符截取省略号替换
    .filter('textLimit', function () {
        var text = '';
        return function (txt, num) {
            return text = txt && txt.length > num ? txt.slice(0, num) + '...' : txt;
        }
    })
    //添加url信任
    .filter('secService', function ($sce) {
        return function (url) {
            return $sce.trustAsResourceUrl(url)
        }
    })
    .filter('trust', function ($sce) {
        return function (url) {
            return $sce.trustAsHtml(url);
        }
    })
    .filter("trustUrl", ['$sce', function ($sce) {
        return function (recordingUrl) {
            return $sce.trustAsResourceUrl(recordingUrl);
        };
    }])
    .filter('uGradeFilter', function (grade) {
        return function (input) {
            if (input !== "" && input !== undefined) {
                return grade[input];
            }
        }
    });