'use strict';
define(['common/render', 'app/baseURL', 'baseCookie', 'app/baseFinal'], function (Render, URL, BaseCookie, Final) {
    var init=function (){
        $(document).on("click","#loginOut",loginOut);
    };
    var userInfo=function (){
        var userId=$.cookie(Final.USER_ID);
        var token=$.cookie(Final.TOKEN);
        var userName=$.cookie(Final.USER_NAME);
        return {userId:userId,token:token,userName:userName};
    };
    var loginOut = function (){
        var token=BaseCookie.getToken();
        $.ajax({
            url:URL.baseURLForward+"/back/user/logout",
            type: 'post',
            data:JSON.stringify(userInfo()),
            contentType:"application/json",
            success:function(response){
                if(response.code==200){
                    BaseCookie.clearAll();
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