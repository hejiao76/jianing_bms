
define([], function() {
    var
        http = "http",
        ip = "ap.xiaoma.com",
        ip1="/action";
        api = "api",
        version = "v1"

    var baseURL = http + ":" + "//" + ip + "/" + api + "/" + version + "/";
    var baseURLForward=http+":"+"//"+ip1+"/";
    return {
        baseURL: baseURL,
        baseURLForward:"/action/"
    }
})