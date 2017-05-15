define([], function () {
    var utilObj = {
        checkLogin: function (token){
            if(!token  || token=="xiaoma"){
                var isAndroid = (/android/gi).test(navigator.appVersion);
                var isIOS = (/iphone|ipad/gi).test(navigator.appVersion);
                if(isAndroid){
                    if(window.JavaLoginInterface && window.JavaLoginInterface.login){
                        window.JavaLoginInterface.login();
                    }
                }else if(isIOS){
                    if(window.webViewHasLogin){
                        window.webViewHasLogin();
                    }
                }
                return false;
            }else{
                return true;
            }
        },
        toDecimal2 : function(x) {
        var f = parseFloat(x);
        if (isNaN(f)) {
            return false;
        }
        var f = Math.round(x*100)/100;
        var s = f.toString();
        var rs = s.indexOf('.');
        if (rs < 0) {
            rs = s.length;
            s += '.';
        }
        while (s.length <= rs + 2) {
            s += '0';
        }
        return s;
    },
    shareCourse : function(productId,title,content,shareUrl,imageUrl){
            console.log("分享productId："+productId);
            console.log("分享标题："+title);
            console.log("分享内容："+content);
            console.log("分享链接："+shareUrl);
            console.log("分享链接图片："+imageUrl);
            var isAndroid = (/android/gi).test(navigator.appVersion);
            var isIOS = (/iphone|ipad/gi).test(navigator.appVersion);
            if(isAndroid){
                if(window.JavaShareInterface && window.JavaShareInterface.share){
                    window.JavaShareInterface.share(productId,title,content,shareUrl,imageUrl);
                }
            }else if(isIOS){
                if(window.xmShare){
                    window.xmShare(productId,title,content,shareUrl,imageUrl);
                }
            }
        },
        returnAPP : function (){
            var isAndroid = (/android/gi).test(navigator.appVersion);
            var isIOS = (/iphone|ipad/gi).test(navigator.appVersion);
            if(isAndroid){
                if(window.JavaFinishInterface && window.JavaFinishInterface.finish){
                    window.JavaFinishInterface.finish();
                }
            }else if(isIOS){
                if(window.webViewFinish){
                    window.webViewFinish();
                }
            }else{
                alert("返回APP");
            }

        },
        /**
         * 解析URL参数
         * @param url
         * @param name
         * @returns {*}
         */
        getUrlParam: function (url, name) {
            var pattern = new RegExp("[?&]" + name + "=([^&^#]+)", "g");
            var matcher = pattern.exec(url);
            var items = null;
            if (null != matcher) {
                try {
                    items = decodeURIComponent(decodeURIComponent(matcher[1]));
                } catch (e) {
                    try {
                        items = decodeURIComponent(matcher[1]);
                    } catch (e) {
                        items = matcher[1];
                    }
                }
            }
            return items;
        },
        /**
         * 长整型转换成时间(yyyy-MM-dd)
         */
        toDateString: function (l_date) {
            var date = new Date();
            date.setTime(l_date);
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var hour = date.getHours();
            var minute = date.getMinutes();
            var second = date.getSeconds();

            month = month < 10 ? "0" + month : month;
            day = day < 10 ? "0" + day : day;
            return (year + "-" + month + "-" + day);
        },
        /**
         * 长整型转换成时间(yyyy-MM-dd hh:mm:ss)
         */
        toFullDateString: function (l_date) {
            var date = new Date();
            date.setTime(l_date);
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var hour = date.getHours();
            var minute = date.getMinutes();
            var second = date.getSeconds();

            month = month < 10 ? "0" + month : month;
            day = day < 10 ? "0" + day : day;
            hour = hour < 10 ? "0" + hour : hour;
            minute = minute < 10 ? "0" + minute : minute;
            second = second < 10 ? "0" + second : second;
            return ( month + "-" + day + " " + hour + ":" + minute);
        },
        getQueryObj: function (search) {
            var result = {},
                queryString = search || location.search.slice(1),
                re = /([^&=]+)=([^&]*)/g,
                m;
            while (m = re.exec(queryString)) {
                result[decodeURIComponent(m[1]).toLowerCase()] = decodeURIComponent(m[2]);
            }
            return result;
        },
        /*如：format('abc{0}ss{1}s',123,'mm')*/
        formatString: function () {
            if (arguments.length == 0)
                return null;
            var str = arguments[0];
            for (var i = 1; i < arguments.length; i++) {
                var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
                str = str.replace(re, arguments[i]);
            }
            return str;
        },
        /*如：replaceAll('asdmmeeammew','^mm&','123')*/
        replaceAll: function (str, reallyDo, replaceWith, ignoreCase) {
            if (!RegExp.prototype.isPrototypeOf(reallyDo)) {
                return str.replace(new RegExp(reallyDo, (ignoreCase ? "gi" : "g")), replaceWith);
            } else {
                return str.replace(reallyDo, replaceWith);
            }
        },
        /*对Date的扩展，将 Date 转化为指定格式的String
         *月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
         *年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
         *例子：(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
         *例子：(new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18*/
        formatDate: function (date, fmt) {
            var o = {
                "M+": date.getMonth() + 1, //月份
                "d+": date.getDate(), //日
                "h+": date.getHours(), //小时
                "m+": date.getMinutes(), //分
                "s+": date.getSeconds(), //秒
                "q+": Math.floor((date.getMonth() + 3) / 3), //季度
                "S": date.getMilliseconds() //毫秒
            };
            if (/(y+)/.test(fmt))
            {
                fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            }
            for (var k in o){
                if (new RegExp("(" + k + ")").test(fmt))
                {
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                }
            }
            return fmt;
        },
        /*对Date的扩展，将 Date 转化为指定格式的String * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)
         *可以用 1-2 个占位符 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
         *例子：(new Date()).pattern("yyyy-MM-dd hh:mm:ss.S")   ==> 2006-07-02 08:09:04.423
         *例子：(new Date()).pattern("yyyy-MM-dd E HH:mm:ss")   ==> 2009-03-10 二 20:09:04
         *例子：(new Date()).pattern("yyyy-MM-dd EE hh:mm:ss")  ==> 2009-03-10 周二 08:09:04
         *例子：(new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04
         *例子：(new Date()).pattern("yyyy-M-d h:m:s.S")        ==> 2006-7-2 8:9:4.18*/
        patternDate: function (date, fmt) {
            var o = {
                "M+": date.getMonth() + 1, //月份
                "d+": date.getDate(), //日
                "h+": date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, //小时
                "H+": date.getHours(), //小时
                "m+": date.getMinutes(), //分
                "s+": date.getSeconds(), //秒
                "q+": Math.floor((date.getMonth() + 3) / 3), //季度
                "S": date.getMilliseconds() //毫秒
            };
            var week = {
                "0": "/u65e5",
                "1": "/u4e00",
                "2": "/u4e8c",
                "3": "/u4e09",
                "4": "/u56db",
                "5": "/u4e94",
                "6": "/u516d"
            };
            if (/(y+)/.test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            }
            if (/(E+)/.test(fmt)) {
                fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[date.getDay() + ""]);
            }
            for (var k in o) {
                if (new RegExp("(" + k + ")").test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                }
            }
            return fmt;
        },
        //时间格式化
        templateFormat: function (date, format) {
            if (typeof date === "string") {
                var mts = date.match(/(\/Date\((\d+)\)\/)/);
                if (mts && mts.length >= 3) {
                    date = parseInt(mts[2]);
                }
            }
            date = new Date(date);
            if (!date || date.toUTCString() == "Invalid Date") {
                return "";
            }
            var map = {
                "M": date.getMonth() + 1, //月份
                "d": date.getDate(), //日
                "h": date.getHours(), //小时
                "m": date.getMinutes(), //分
                "s": date.getSeconds(), //秒
                "q": Math.floor((date.getMonth() + 3) / 3), //季度
                "S": date.getMilliseconds() //毫秒
            };

            format = format.replace(/([yMdhmsqS])+/g, function(all, t){
                var v = map[t];
                if(v !== undefined){
                    if(all.length > 1){
                        v = '0' + v;
                        v = v.substr(v.length-2);
                    }
                    return v;
                }
                else if(t === 'y'){
                    return (date.getFullYear() + '').substr(4 - all.length);
                }
                return all;
            });
            return format;
        },
        /**
         * Tip提示框 基于bootstrap 模态框 HTML中
         * @param msg
         * @param callback
         */
        showTipMsg:function (msg,callback,scope,param){
            $("#tipModal .modal-body").html(msg);
            $("#tipModal").modal("show");
            window.setTimeout(function (){
                $("#tipModal").on("hidden.bs.modal",function (){
                    $("#tipModal").off("hidden.bs.modal");
                    if(callback){
                        if(scope&&param){
                            callback.call(scope,param);
                        }else{
                            callback.call();
                        }
                    }
                }).modal("hide");

            },1500);
        }
    };

    return utilObj;
});