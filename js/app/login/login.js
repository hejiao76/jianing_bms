'use strict';
define(['app/baseURL', 'baseCookie', 'app/baseFinal'], function ( URL, BaseCookie, Final) {
    var init=function (){
        initEvent();
    };
    /**
     * 绑定事件
     */
    var initEvent = function (){
        // $('#UserName').focus(function () {
        //     $('#UserName').val('');
        // })
        // $('#PassWord').focus(function () {
        //     $('#PassWord').val('');
        // })
        $('#UserName').blur(function () {
            return validUsername()
        })
        $('#PassWord').blur(function () {
            return validPassWord()
        })
        $('#Submit').click(function () {
            loginIn();
        });
        $(document).keypress(function(event){
            if(event.keyCode ==13){
                $("#Submit").trigger("click");
            }
        });
        $(document).on("click","#loginOut",loginOut);
    };


    var validUsername = function(){
        var username = $.trim($('#UserName').val());
        if (username =='')
        {
            $('#errormsg').css("color", "red").text('用户名不能为空');
            return
        }
        else if (!(username.length >= 4 && username.length <=16)) {
            $('#errormsg').css("color", "red").text('请输入6到16位用户名');
        }
        return true;
    }
    var validPassWord = function(){
        //if ($('#PassWord').val() == '') {
        //    $("#errormsg").css("color", "red").text('密码不能为空');
        //    return false;
        //}
        var password = $.trim($('#PassWord').val());
        if (password =='')
        {
            $('#errormsg').css("color", "red").text('密码不能为空');
            return;
            //重新获得焦点
            // $('#UserName').focus();
        }
        else if (!(password.length >= 6 && password.length <=16)) {
            $('#errormsg').css("color", "red").text('请输入6到16位密码');
        }
        else{$('#errormsg').text('');}
        return true;
    }

    var validInfo =function (){
        if(validUsername() && validPassWord()){
            return true;
        }
        //else if (!(validUsername() && validPassWord())){
        //    $('#errormsg').css("color", "red").text('登录名或者密码错误');
        //}
        return false;
    };
    var loginIn = function (){
        //验证用户信息
        var isValid=validInfo();
        if(isValid==true){//if(isValid){
            //获取用户名
            var userName=$('#UserName').val();
            //获取密码
            var pwd=$('#PassWord').val();
            //发送ajax请求到后台
            var param={loginName:userName,password: $.md5(pwd)}; //JSON字符串
            //console.log("输出用户名密码");
            //console.log(param);
            //return;
            $.ajax({
                url:URL.baseURLForward+"user/login.action",
                data:param,
                type: 'post',
                success:function(response){
                    if(response.status==0){
                      //  BaseCookie.add("token",response.result.token);
                        $.cookie(Final.TOKEN,response.result.token,{expires: 1, path: '/'})
                        $.cookie(Final.USER_NAME,response.result.userName,{expires: 1, path: '/'})
                        window.location.href="home.html";
                    }else{
                        $("#errormsg").css("color", "red").text(response.message);
                    }
                },
                failure:function(e){

                }
            })
        }
    };
    var loginOut = function (){
        var token=BaseCookie.getToken();
        $.ajax({
            url:URL.baseURLForward+"group/user/logout.action",
            headers:{
                token:token
            },
            type: 'post',
            success:function(response){
                if(response.status==1){
                    window.location.href="login.html";
                }
            },
            failure:function(e){

            }
        });
    }
    return {
        init:init
    }
});