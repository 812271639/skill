/**
 * Created by Administrator on 2018/1/26/026.
 */
'use strict';
angular.module('myApp')
//1.后台视频列表
    .constant('type',
        {
            1: 'banner图',
            2: 'card视频'
        });
angular.module('myApp')
    .constant('status',
        {
            1: '上架',
            2: '下架'
        })
    //年级(grade):初一到高一别用数字1~6表示,整个初中部用数字7表示,整个高中部用数字8表示,
angular.module('myApp')
    .constant('grade',
        {
            // 0: '全部',
            1: '初一',
            2: '初二',
            3: '初三',
            4: '高一',
            5: '高二',
            6: '高三'
        })
    //科目(subject):语文、数学,英语,物理,化学,生物,历史,地理,政治分别用数字1、2、3、4、5、6、7、8、9表示,全部科目用0表示
angular.module('myApp')
    .constant('subject',
        {
            // 0: '全部',
            1: '语文',
            2: '数学',
            3: '英语',
            4: '物理',
            5: '化学',
            6: '生物',
            7: '历史',
            8: '地理',
            9: '政治'
        })
angular.module('myApp')
    .constant('putAway', {
        1: "下架",
        2: "上架"
    })
angular.module('myApp')
    .constant('videoState', {
    "offLine": 2,
    "onLine": 1
});
