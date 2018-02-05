var fsm = new StateMachine({
    init: 'solid',
    transitions: [
        {name: 'Melt', from: 'solid', to: 'liquid'},
        {name: 'Vaporize', from: 'liquid', to: 'gas'},
        {name: 'Condense', from: 'gas', to: 'liquid'},
        {name: 'Freeze', from: 'liquid', to: 'solid'}
    ],

    methods: {

//--------------------------------------------------------------事件一------------------------------------
        onBeforeMelt: function (lifecycle) {
            console.log(lifecycle);
            console.log(fsm.transitions());
            // console.log('事件： ' + lifecycle.transition);
            console.log('离开 ' + lifecycle.from + '状态');
            console.log('进入 ' + lifecycle.to + '状态');
            console.log('a1 事件 melt前,状态 ' + fsm.state);
        },
        onLeaveSolid: function () {
            console.log('a2, 离开Solid,状态 ' + fsm.state);
        },
        onEnterLiquid: function () {
            console.log('a3, 进入Liquid,状态 ' + fsm.state);
        },
        onAfterMelt: function () {
            console.log('a4 事件 melt后,状态 ' + fsm.state);
        },
//-----------------------------------------------------------------事件二----------------------------------------
        onBeforeVaporize: function (lifecycle) {
            console.log(lifecycle);
            console.log(fsm.transitions());
            console.log('b1事件Vaporize前,状态 ' + fsm.state);
        },
        onLeaveliquid: function () {
            console.log('b2, 离开liquid，状态 ' + fsm.state);
        },
        onEnterGas: function () {
            console.log('b3, 进入gas，状态 ' + fsm.state);
        },
        onAfterVaporize: function () {
            console.log('b4事件Vaporize后，状态 ' + fsm.state);
        },
//-----------------------------------------------------------------事件三------------------------------------------
        onBeforeCondense: function (lifecycle) {
            console.log(lifecycle);
            console.log(fsm.transitions());
            console.log('c1事件Condense前，状态 ' + fsm.state);
        },
        onLeaveGas: function () {
            console.log('c2, 离开gas，状态 ' + fsm.state);
        },
        onEnterLiquid: function () {
            console.log('c3, 进入liquid，状态 ' + fsm.state);
        },
        onAfterCondense: function () {
            console.log('c4事件Condense后，状态 ' + fsm.state);
        },
//-------------------------------------------------------------------事件四----------------------------------------
        onBeforeFreeze: function (lifecycle) {
            console.log(lifecycle);
            console.log(fsm.transitions());
            console.log('d1事件Freeze前，状态 ' + fsm.state);
        },
        onLeaveliquid: function () {
            console.log('d2, 离开liquid，状态 ' + fsm.state);
        },
        onEnterSolid: function () {
            console.log('d3, 进入solid，状态 ');
            // console.log('d3fsm : ' + fsm);
            // console.log('d3, onEntersolid，当前状态 ' + fsm.state);
        },
        onAfterFreeze: function () {
            console.log('d4事件Freeze后,状态 ' + fsm.state);
        }
    }

});


document.getElementById("aa").onclick = function () {
    fsm.melt();
};
document.getElementById("bb").onclick = function () {
    // console.log("当前可转换事件 ： "+fsm.transitions());
    fsm.vaporize();
    if (fsm.can('Condense')) {
        console.log('can、  true  ');
    } else {
        console.log('can、 false');
    }
    if (fsm.cannot('Condense')) {
        console.log('cannot、  true  ');
    } else {
        console.log('cannot、 false');
    }
    if (fsm.is('gas')) {
        console.log('is、 true');
    } else {
        console.log('is、 false');
    }

};
document.getElementById("cc").onclick = function () {
    fsm.condense();
};
document.getElementById("dd").onclick = function () {
    fsm.freeze();
};
// document.getElementById("ee").onclick = function () {
//     console.log('goto前的状态 ' + fsm.state);
//     fsm.goto('C');
//     console.log('goto后的状态 ' + fsm.state);
//     // console.log(fsm.color);
//     // console.log(fsm.girl);
//     // fsm.hello();
//     // goto 用法比较奇怪，会执行两个状态变化 ？？？
//     // 首先是执行离开初始状态A的步骤，再进入执行相应状态（也就是说goto的状态也是由相应的状态转变而来）。
//     // 例如：goto状态为D，
//     // 首先（执行事件melt，离开 A 状态,当前状态 A），
//     // 接着（执行事件Condense，进入液体，当前状态 D）；
//     // goto状态为C
//     // 首先（执行事件melt，离开 A 状态,当前状态 A），
//     // 接着（执行事件Vaporize，进入C，当前状态 C）。
// };
//


///////////////////////////////////////     另一个例子    ////////////////////////////////////////////
// $(document).ready(function () {
//     var fsm = new StateMachine({
//         init: 'visible',
//
//         transitions: [
//             {name: 'toHidden', from: 'visible', to: 'invisible'},
//             {name: 'toShow', from: 'invisible', to: 'visible'}
//         ],
//
//         methods: {
//             onLeaveVisible: function (lifecycle) {
//                 return new Promise(function (resolve, reject) {
//                     $('#visible').fadeOut(3000, resolve);
//                     console.log('1离开visible,隐藏 图片');
//                 })
//
//             },
//             onEnterInvisible: function (lifecycle) {
//                 return new Promise(function (resolve, reject) {
//                     $('#invisible').fadeIn(3000, resolve);
//                     // alert('小姐姐不见了');
//                     console.log('2进入Invisible,我是图片不见后再执行的方法');
//
//                 })
//             },
//             onLeaveInvisible: function (lifecycle) {
//                 return new Promise(function (resolve, reject) {
//                     $('#invisible').fadeOut(3000, resolve);
//                     console.log('3离开Invisible,隐藏 hello');
//                 })
//             },
//             onEnterVisible: function (lifecycle) {
//                 return new Promise(function (resolve, reject) {
//                     $('#visible').fadeIn(3000, resolve);
//                     console.log('4进入visible,显示 图片');
//                 })
//             }
//         }
//     });
//
//
//     document.getElementById("ff").onclick = function () {
//         fsm.toHidden();
//
//     };
//     document.getElementById("gg").onclick = function () {
//         fsm.toShow();
//     };
// });