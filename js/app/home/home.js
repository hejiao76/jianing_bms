'use strict';
define(['common/render', 'app/baseURL', 'baseCookie', 'app/baseFinal'], function (Render, URL, BaseCookie, Final) {
    var init=function (){
        $(document).on("click","#loginOut",loginOut);
    };
    var loginOut = function (){
        var token=BaseCookie.getToken();
        $.ajax({
            url:URL.baseURLForward+"user/logout.action",
            headers:{
                token:token
            },
            type: 'post',
            success:function(response){
                if(response.status==0){
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