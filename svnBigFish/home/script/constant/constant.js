/**
 * Created by Administrator on 2018/1/26/026.
 */
angular.module('app')
    .constant('grades', [
        {num: 1, grade: '初一'},
        {num: 2, grade: '初二'},
        {num: 3, grade: '初三'},
        {num: 4, grade: '高一'},
        {num: 5, grade: '高二'},
        {num: 6, grade: '高三'},
        {num: 0, grade: '全部'}
    ])
    .constant('subjects', [
        {num: 1, subject: '语文'},
        {num: 2, subject: '数学'},
        {num: 3, subject: '英语'},
        {num: 4, subject: '物理'},
        {num: 5, subject: '化学'},
        {num: 6, subject: '生物'},
        {num: 7, subject: '历史'},
        {num: 8, subject: '地理'},
        {num: 9, subject: '政治'},
        {num: 0, subject: '全部'}
    ]);



angular.module('app')
    .constant('grade',
        {
            0:'全部',
            1:'初一',
            2:'初二',
            3:'初三',
            4:'高一',
            5:'高二',
            6:'高三'
        })
