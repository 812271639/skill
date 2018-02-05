/**
 * Created by Administrator on 2018/1/18/018.
 */
'use strict';
angular.module('app')
    .controller('bind', function ($scope,$http,$state,$interval,user,modelBox) {
        var vm = this;
        vm.moTel=$state.moTel;
        vm.params=$state.params;
        var token = sessionStorage.getItem('token');
        console.log(token);
        vm.description="获取验证码";
        vm.canClick=false;
        var second=59;
        var timerHandler;

        vm.bindStates=1;
        vm.Tel=function () {
            vm.bindStates=1;
            console.log(vm.bindStates);
        };
        vm.eMail=function () {
            vm.bindStates=2;
            console.log(vm.bindStates);
        };


        //获取绑定信息
        user.bind({token: token}).then(function (res) {

            if(res.data.code===0){
                vm.data=res.data.data;
                console.log(vm.data);

                if(vm.data.tel){
                    vm.params.tel=vm.data.tel;
                }else {
                    vm.params.tel="未绑定"
                }
                if(vm.data.email){
                    vm.params.email=vm.data.email;
                }else {
                    vm.params.email="未绑定"
                }
            }else {
                modelBox.alert (res.data.message)
            }
        });








        //手机验证码
        vm.telCode=function () {

            console.log(vm.params.newTel);

            vm.params={
                tel:vm.params.newTel,
                token:token
            };

            user.getTelCode(vm.params).then(function (res) {
                if(res.data.code===0){
                }else {
                    modelBox.alert(res.data.message)
                }

            });

            timerHandler=$interval(function () {
                if(second<=0){
                    $interval.cancel(timerHandler);
                    second=59;
                    vm.description="重新获取";
                    vm.canClick=false;
                }else {
                    vm.description=second+"s后重发";
                    vm.canClick=true;
                    second--;
                }
            },1000);
        };


        //手机绑定&
        vm.telBinding=function () {
            var tCode=vm.params.tCode+'';
            console.log(typeof tCode);

            vm.params={
                code:tCode,
                token:token
            };
            user.bindTel(vm.params).then(function (res) {
                if(res.data.code===0){
                    console.log("绑定成功");
                    $state.go('bind');
                }else {
                    modelBox.alert(res.data.message)
                }

            });

        };




        //邮箱验证码

        vm.EmailCode=function () {
            timerHandler=$interval(function () {
                if(second<=0){
                    $interval.cancel(timerHandler);
                    second=59;
                    vm.description="重新获取";
                    vm.canClick=false;
                }else {
                    vm.description=second+"s后重发";
                    vm.canClick=true;
                    second--;
                }
            },1000);

            vm.params={
                email:vm.params.newEmail,
                token:token
            };

            user.getEmailCode(vm.params).then(function (res) {
                if(res.data.code===0){
                }else {
                    modelBox.alert(res.data.message)
                }
            });


        };

        //邮箱绑定&

        vm.EmailBinding=function () {
            var eCode=vm.params.eCode+'';
            console.log(typeof eCode);

            vm.params={
                code:eCode,
                token:token
            };

            user.bindemail(vm.params).then(function (res) {
                if(res.data.code===0){
                    console.log("绑定成功");
                    $state.go('bind');
                }else {
                    modelBox.alert(res.data.message)
                }
            })
        };




    });