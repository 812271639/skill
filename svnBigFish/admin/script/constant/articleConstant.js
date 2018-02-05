/**
 * Created by Administrator on 2018/1/26/026.
 */
'use strict';
angular.module('myApp')
    .constant('type',
        {
            1: 'banner文章',
            2: 'card文章'
        })
angular.module('myApp')
    .constant('status',
        {
            1: '上架',
            2: '下架'
        })
angular.module('myApp')
    .constant('putOn',
        {
            1: '下架',
            2:'上架'
        })
angular.module('myApp')
        .constant('articleState',{
            "offLine": 1,
            "onLine": 2
        })
angular.module('myApp')
    .constant('userStatus',
        {
            1: '正常',
            2:'冻结'
        })
angular.module('myApp')
    .constant('useStatus',
        {
            1:'冻结',
            2:'解冻'
        })
angular.module('myApp')
    .constant('freeze',{
        "frozen": 1,
        "melt": 2
    })
angular.module('myApp')
    .constant('grades',
        {
            0:'全部',
            1:'初一',
            2:'初二',
            3:'初三',
            4:'高一',
            5:'高二',
            6:'高三'
        });