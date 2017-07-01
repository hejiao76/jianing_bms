/**
 * Created by jsb-cpyy on 2017/1/3.
 */
'use strict';
define(['common/render', 'app/baseURL', 'baseCookie', 'app/baseFinal','common/util','common/ajaxfileupload','lib/ueditor/ueditor.config','lib/ueditor/ueditor.all','jquery_pagination'], function (Render, URL, BaseCookie, Final,Util) {
    var _conf,
        tokenTmp,
        parentIdTmp=0,
        pageRecorders=20,
        currentPageTemp=1,
        isInitPagination,
        router,
        editor,
        TMPL = {
            tmpl_bmstore_manager: 'app/bmStoreManager/tmpl_bmstore_manager',
            tmpl_bmstore_manager_list: 'app/bmStoreManager/tmpl_bmstore_manager_list',
            tmpl_bmstore_manager_edit: 'app/bmStoreManager/tmpl_bmstore_manager_edit'
        };

    var init = function(conf) {
        rewriteUE()
        _conf = $.extend({
            wrap: ''
        }, conf || {});
        tokenTmp = BaseCookie.getToken();
        router=conf.router;
        isInitPagination=false;
        initRouter();
        initEvent();
        asyncNewsModuleId();
        if(editor){
            editor.destroy();
            editor=null;
        }
    };
    var rewriteUE = function (){
        UE.Editor.prototype.getActionUrl = function (action){

            console.log(action)
            if(action == 'config'){
                console.log("config");
                return '/js/app/ueditor.config.json?action=config';
            }
            if(action =='uploadimage' || action == 'uploadscrawl' || action =='uploadimage'){
                return '/action1/api/images/upload';
            }
            if(action =='uploadvideo'){
                return '';
            }
            if(action =='listimage'){
                return '';
            }
        }
    }
    /**
     * 注入动态router
     */
    var initRouter = function (){
        if(router){
            console.log("initRouter");
            router.on("once","/bmstore_manager_edit/:bmstoreId",function (bmstoreId){
                requestNewsDetail(bmstoreId)
            }); //编辑路由回调
            router.on("once","/bmstore_manager_add",showAddNewsPanel); //编辑路由回调
        }
    };
    var initPagination = function(totalCount,opt) {
        // 创建分页
        $("#Pagination").pagination(totalCount, {
            maxentries:opt.maxentries || 0,
            num_edge_entries: 1, //边缘页数
            num_display_entries: 4, //主体页数
            callback: pageselectCallback,
            items_per_page: opt.item_per_page || pageRecorders, //每页显示20条
            prev_text: "前一页",
            next_text: "后一页"
        });
    };

    function pageselectCallback(page_index, jq){
        console.log(page_index);
        requestNewsList({pageNo:page_index+1});
        return false;
    }
    var initEvent = function() {
        $(document).off("click","#addNewsBtn").on("click","#addNewsBtn",function (){
            window.location.href = window.location.href.split("#")[0] + "#bmstore_manager_add";
        });
        $(document).off("click","#previewNewsBtn").on("click","#previewNewsBtn",previewNewsFn);
        $(document).off("click","#addNewsSaveBtn").on("click","#addNewsSaveBtn",addNewsFn);
        $(document).off("click",".editNews_js").on("click",".editNews_js",function (){
            var bmstoreId=$(this).attr("data-id");
            if(bmstoreId){
                window.location.href = window.location.href.split("#")[0] + "#bmstore_manager_edit/"+bmstoreId;
            }
        })

        $(document).off("click","#sortNewsBtn").on("click","#sortNewsBtn",showSortNewsCol);
        $(document).off("click","#saveSortNewsBtn").on("click","#saveSortNewsBtn",saveSortNews);
        $(document).off("change","#bmstoreFileInput").on("change","#bmstoreFileInput",uploadNewsImg);
        $(document).off("click","#bmstoreImgPreview").on("click","#bmstoreImgPreview",triggerFileUpload);
        $(document).off("click",".status_span_js").on("click",".status_span_js",statusSpanClickFn);
        $(document).off("click",".setFirstShow_span_js").on("click",".setFirstShow_span_js",setFirstShowSpanClickFn)


        $(document).off("click",".deleteNews_js").on("click",".deleteNews_js",showDeleteNews);
        $(document).off("click","#deleteNews_sure_js").on("click","#deleteNews_sure_js",deleteNewsFn);
        // $(document).off("click","#addNewsSaveBtn").on("click","#addNewsSaveBtn",addNewsFn);
        $(document).off("click",".sort_prev_js").on("click",".sort_prev_js",sortOption);
        $(document).off("click",".sort_next_js").on("click",".sort_next_js",sortOption);
        // $(document).off("click",".btn_sure_js",confirmOrder).on("click",".btn_sure_js",confirmOrderFn);
        // $(document).off("click","#cancelModal .surebtn_js").on("click","#cancelModal .surebtn_js",toCancelOrder);
    };
    var toNewsList = function (){
        window.location.href = window.location.href.split("#")[0]+"#building_materials_store";
    }
    /**
     * 同步新闻模块ID
     */
    var asyncNewsModuleId = function (){
        renderbmstoreManager();
        // var bmstoreCategoryId=localStorage.getItem(Final.NEWS_CATEGORY_ID);
        // if(bmstoreCategoryId==null){
        //     var param={parentId:0}
        //     $.ajax({
        //         url:URL.baseURLForward+"cmsCategory/getList.action", // URL.baseURL9 + 'jijing_answers/web_mark',
        //         data: param,
        //         type: 'get',
        //         headers: {
        //             token:tokenTmp
        //         },
        //         success: function (response){
        //             if(response.status==0){
        //                 for(var i=0;i<response.result.length;i++){
        //                     var item=response.result[i];
        //                     if(item.name.indexOf("新闻")>-1){
        //                         localStorage.setItem(Final.NEWS_CATEGORY_ID,item.id);
        //                         break;
        //                     }
        //                 }
        //                 if(localStorage.getItem(Final.NEWS_CATEGORY_ID)==null){
        //                     localStorage.setItem(Final.NEWS_CATEGORY_ID,3);
        //                 }
        //                 renderbmstoreManager();
        //             }else{
        //                 console.log("请求异常");scoreSelect
        //             }
        //         }
        //     });
        // }else {
        //     renderbmstoreManager();
        // }
    };
    var requestSecondModuleList = function (){
        return;
        var bmstoreCategoryId=localStorage.getItem(Final.NEWS_CATEGORY_ID);
        if(bmstoreCategoryId!=null){
            var param={parentId:bmstoreCategoryId}
            $.ajax({
                url:URL.baseURLForward+"cmsCategory/getList.action", // URL.baseURL9 + 'jijing_answers/web_mark',
                data: param,
                type: 'get',
                headers: {
                    token:tokenTmp
                },
                success: function (response){
                    if(response.status==0){
                        renderNewsType(response.result);
                    }else{
                        console.log("请求异常");
                    }
                }
            });
        }
    };
    var renderNewsType = function (data){
        if(data&&data.length>0){
            var str="";
            for(var i=0;i<data.length;i++){
                var item=data[i];
                str+='<option value="'+item.id+'">'+item.name+'</option>'
            }
            $("#bmstoreTypeSelect").html(str);
        }

    }
    var showDeleteNews = function (){
        var bmstoreId=$(this).attr("data-id");
        if(bmstoreId){
            $("#deleteNews_sure_js").attr("data-id",bmstoreId);
            $("#deleteNewsModal").modal("show");
        }

    }
    var triggerFileUpload = function (){
        $("#bmstoreFileInput").trigger("click");
    }
    var uploadNewsImg = function (){
        var _this = $(this);
        if(!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(_this.val())){
            alert('图片仅限于png，gif，jpeg，jpg格式');
            return;
        }
        var maxSize = 2048576;//2M
        var fileSize =  $(this).get(0).files[0];
        if(fileSize.size > maxSize){
            Util.showTipMsg("您上传的图片太大，请您选择的图片不要超过2M")
            //alert('您上传的图片太大，请您选择的图片不要超过2M');
            // upImg.removeClass("loading");
            // btn.find('label').text('点击上传');
            _this.val('');
        }else{

            $.ajaxFileUpload({
                url: URL.baseURLForward1 + 'api/images/upload',
                type:"post",
                secureuri: false,
                fileElementId: 'bmstoreFileInput',
                data: {apikey:'flzxsqcysyhljt',prefix:'jianing',token:tokenTmp},
                //dataType: 'json',
                success: function(data, status){
                    if(status=="success"){
                        var imgUrl=JSON.parse($(data).find("pre").html()).data[0];
                        $("#bmstoreUrl").val(imgUrl);
                        $("#bmstoreFileInput").hide();
                        $("#bmstoreImgPreview").attr("src",imgUrl).show();
                    }
                    // //alert($(data).find("body").html())
                    // var thisdata = JSON.parse($(data).find("pre").html()).data[0];
                    // $("#bmstoreUrl").val(data.result.filePath);
                    // $("#bmstoreFileInput").hide();
                    // $("#bmstoreImgPreview").attr("src",data.result.filePath).show();
                    // var oldlist = localStorage.getItem('phoneList');
                    // var oldcommentlist=localStorage.getItem('commentList')
                    // if(!oldlist || oldlist.length==0){
                    //     oldlist=[];
                    //     oldcommentlist=[];
                    // }else {
                    //     oldlist = oldlist.split('<%%>');
                    //     oldcommentlist=oldcommentlist.split("<%%>");
                    // }
                    // oldlist.push(thisdata);
                    // oldcommentlist.push("");
                    // localStorage.setItem('phoneList',oldlist.join("<%%>"));
                    // localStorage.setItem('commentList',oldcommentlist.join("<%%>"));
                    //
                    // renderContainer(oldlist);
                },
                error : function (){
                    //alert("error");
                }
            })

            // $.ajaxFileUpload({
            //     url: URL.baseURLForward + 'cmsContentFile/addFile.action',
            //     type:"post",
            //     secureuri: false,
            //     fileElementId: "bmstoreFileInput",
            //     data: {token: BaseCookie.getToken()},
            //     dataType: 'json',
            //     success: function(data, status){
            //         if(status == "success"){
            //             $("#bmstoreUrl").val(data.result.filePath);
            //             $("#bmstoreFileInput").hide();
            //             $("#bmstoreImgPreview").attr("src",data.result.filePath).show();
            //         }else{
            //             console.log(status);
            //         }
            //     }
            // })
        }
    }
    var saveSortNews =function (){
        var sortStr=""
        $("#bmstore_list_table tbody tr").each(function (index,item){
            sortStr+=$(item).attr("data-id")+","
        });
        if(sortStr.length>0){
            sortStr=sortStr.substr(0,sortStr.length-1);
            var param={ids:sortStr};
            $.ajax({
                url:URL.baseURLForward+"cmsContent/updateSort.action", // URL.baseURL9 + 'jijing_answers/web_mark',
                data: param,
                type: 'post',
                headers: {
                    token:tokenTmp
                },
                success: function (response){
                    if(response.status==0){
                        Util.showTipMsg("操作成功");
                        hideSortNewsCol();
                    }else{
                        console.log("请求异常");
                    }
                }
            });
        }
    }
    var sortOption = function (){
        var tr$=$(this).parents("tr");
        var tr$_html=tr$.get(0).outerHTML;
        var pre$=tr$.prev("tr");
        var next$=tr$.next("tr");
        var option=$(this).attr("data-option");
        if(option=="prev"){
            if(pre$.length>0){
                tr$.insertBefore(pre$);
                //pre$.after(tr$_html);
                //tr$.remove()
            }
        }else if (option=="next"){
            if(next$.length>0){
                tr$.insertAfter(next$);
                //next$.after(tr$_html);
                //tr$.remove()
            }
        }
    }
    var showSortNewsCol = function (){
        $(".sort_col_js").removeClass("hide");
        $("#sortNewsBtn").addClass('hide');
        $("#saveSortNewsBtn").removeClass('hide');
    };
    var hideSortNewsCol = function (){
        $(".sort_col_js").addClass("hide");
        $("#sortNewsBtn").removeClass('hide');
        $("#saveSortNewsBtn").addClass('hide');
    }
    var resetEditPanel = function (){
        $("#bmstoreUrl").val("");
        $("#target_href").val("");
        $("#bmstoreFileInput").show();
        $("#bmstoreImgPreview").hide();
        $("#addNews_save_js").removeAttr("data-id");
    };
    var resetDeletePanel = function () {
        $("#deleteNews_sure_js").removeAttr("data-id");
    }

    /**
     * 渲染页面架构
     */
    var renderbmstoreManager = function (){
        Render.render({
            wrap: $("#main-content"),
            tmpl: {
                tmplName: TMPL.tmpl_bmstore_manager,
                tmplData:{}
            },
            afterRender: function (){
                requestNewsListPaginationInfo({currentPage:1});
                //requestNewsList({currentPage:1});
                $("#deleteNewsModal").on("hide.bs.modal",resetDeletePanel);
            }
        });
    };
    /**
     * 请求bmstore列表数据
     */
    var requestNewsListPaginationInfo = function (param){
        currentPageTemp=1;
        var param= $.extend(userInfo(),param || {});
        param.pageSize=pageRecorders;
        $.ajax({
            url:URL.baseURLForward+"back/decoratenew/decorateNewList", // URL.baseURL9 + 'jijing_answers/web_mark',
            data: JSON.stringify({common:param}),
            type: 'POST',
            contentType:"application/json",
            success: function (response){
                if(response.code==200){
                    var rdata=response.data
                    if(rdata.totalCount>0){
                        var opt={
                            current_page:rdata.pageNo,
                            // maxentries:response.totalRows,
                            item_per_page:rdata.pageSize
                        }
                        initPagination(rdata.totalCount,opt);

                    }else{
                        requestNewsList({pageNo:1,pageSize:10})
                    }
                }

            }
        });

    };
    /**
     * 请求bmstore列表数据
     */
    var requestNewsList = function (param){
        var param= $.extend(userInfo(),param || {});
        param.pageSize=pageRecorders;
        $.ajax({
            url:URL.baseURLForward+"back/decoratenew/decorateNewList", // URL.baseURL9 + 'jijing_answers/web_mark',
            data: JSON.stringify({common:param,flag:2}),
            type: 'post',
            contentType:"application/json",
            success: function (response){
                if(response.code ==200){
                    var rdata=response.data
                    if(rdata.totalCount>-1){
                        parentIdTmp=param.parentId;
                        currentPageTemp=rdata.currentPage;
                        var data={};
                        data.result=rdata.result;
                        data.Final=Final;
                        data.currentPage=param.pageNo;
                        data.pageRecorders=param.pageSize;
                        renderListPanel(data);
                        // var opt={
                        //     current_page:response.currentPage,
                        //     maxentries:response.totalRows,
                        //     items_per_page:response.pageRecorders
                        // }
                        // initPagination(response.totalRows,opt);
                        // if(!isInitPagination){
                        //     isInitPagination=true;
                        //     var opt={
                        //         current_page:response.currentPage,
                        //         maxentries:response.totalRows,
                        //         items_per_page:response.pageRecorders
                        //     }
                        //     initPagination(response.totalRows,opt);
                        // }

                    }else{
                        console.log("请求异常");
                    }
                }

            }
        });

    };

    //渲染模块列表
    var renderListPanel = function (data){
        console.log(data);
        // if(parentIdTmp>0){
        //     $("#addNewsBtn").removeClass("hide");
        // }else{
        //     $("#addNewsBtn").addClass("hide");
        // }
        if(data.result.length<1){
            $("#sortNewsBtn").hide();
        }else{
            $("#sortNewsBtn").show();
        }


        Render.render({
            wrap: $("#bmstore_list_table_tbody"),
            tmpl: {
                tmplName: TMPL.tmpl_bmstore_manager_list,
                tmplData:data
            },
            afterRender: function (){
            }
        });
    };
    /**
     * 显示新增模块面板
     * @param e
     */
    var showAddNewsPanel = function (e){
        Render.render({
            wrap: $("#main-content"),
            tmpl: {
                tmplName: TMPL.tmpl_bmstore_manager_edit,
                tmplData:{}
            },
            afterRender: function (){
                requestSecondModuleList();
                var basePath="/js/lib/ueditor/";
                window.setTimeout(function (){
                    editor = UE.getEditor('container',{
                        UEDITOR_HOME_URL:basePath,
                      //  imageActionName:"action1/api/images/upload", //必填 否则不触发上传事件
                       imageFieldName:"file",
                        //imageActionUrl:"action1/api/images/upload"
                       // imageUrl:"/action1/api/images/upload11"
                        // langPath:basePath+"lang/",
                        // themePath:basePath+"themes/",
                        // iframeCssUrl:basePath+"themes/iframe.css",
                        // codeMirrorJsUrl:basePath+"third-party/codemirror/codemirror.js",
                        // codeMirrorCssUrl:basePath+"third-party/codemirror/codemirror.js"
                    });
                },10)

                // requestNewsList();
                // $("#addNews").on("hide.bs.modal",resetEditPanel)
                // $("#deleteNewsModal").on("hide.bs.modal",resetDeletePanel);
            }
        });
    };
    var requestNewsDetail = function (bmstoreId){
        if(bmstoreId){
            var param=$.extend({id:bmstoreId},{common:userInfo()});
            $.ajax({
                url:URL.baseURLForward+"back/decoratenew/decorateNewInfo", // URL.baseURL9 + 'jijing_answers/web_mark',
                data: JSON.stringify(param),
                type: 'post',
                contentType:"application/json",
                success: function (response){
                    if(response.code==200){
                        showEditNewsPanel(response.info)
                    }else{
                        console.log("请求异常");
                    }
                }
            });
        }
    }
    var showEditNewsPanel = function (data){
        if(data){
            Render.render({
                wrap: $("#main-content"),
                tmpl: {
                    tmplName: TMPL.tmpl_bmstore_manager_edit,
                    tmplData:{}
                },
                afterRender: function (){
                    requestSecondModuleList();
                    var basePath="/js/lib/ueditor/";
                    window.setTimeout(function (){
                        editor = UE.getEditor('container',{
                            UEDITOR_HOME_URL:basePath,
                            //imageActionName:"addFile.action", //必填 否则不触发上传事件
                            imageFieldName:"file"
                            //imageUrl:"/action/cmsCategory/getList.action?parentId=9999",
                        });
                        editor.on("ready",function (){
                            editor.setContent(data.details);
                        });
                        window.setTimeout(function (){

                            $("#bmstoreTitle").val(data.title || "");
                            $("#bmstoreAuthor").val(data.author || "");
                            $("#bmstoreTypeSelect").val(data.type || "");
                            $("#scoreSelect").val(data.score || "");
                            // $("#bmstoreDesc").val(data.description || "");
                            // $("#bmstoreImgPreview").attr("src",data.cover).show();
                            $("#bmstoreFileInput").hide();
                            $("#bmstoreUrl").val(data.focusimg);
                            $("#addNewsSaveBtn").attr("data-id",data.id);
                            // $("#bmstoreTypeSelect").val(data.)
                        },1000)
                    },100);
                }
            });
        }
    };
    var validAndReturnNewsParam = function (){
        var title=$("#bmstoreTitle").val();
        var author=$("#bmstoreAuthor").val();
        var type=$("#bmstoreTypeSelect").val();
        var score=$("#scoreSelect").val();
        var description =$("#bmstoreDesc").val();
        var focusimg=$("#bmstoreUrl").val();
        var content=UE.getEditor('container').getContent();
        var contentTxt=UE.getEditor('container').getContentTxt();

        if(!title){
            Util.showTipMsg("请输入材料名称");
            return false;
        }
        if(!author){
            Util.showTipMsg("请输入编辑作者");
            return false;
        }
        if(!type){
            Util.showTipMsg("请选择材料类型");
            return false;
        }
        // if(!description){
        //     Util.showTipMsg("请输入新闻简介");
        //     return false;
        // }
        if(!focusimg){
            Util.showTipMsg("请上传材料图片");
            return false;
        }
        if(!contentTxt){
            Util.showTipMsg("请输入材料介绍内容");
            return false;
        }

        var param={
            title:title,
            author:author,
            flag:2,
            type:type,
            description:description,
            score:score,
            focus:1,
            focusimg:focusimg,
            details:content,
            tagIds:$("#bmstoreTypeSelect").find("option:selected").text()

        }
        if($("#addNewsSaveBtn").attr("data-id")){
            param.id=$("#addNewsSaveBtn").attr("data-id");
        }
        return param;
    };
    var previewNewsFn =  function (){
        var param=validAndReturnNewsParam()
        // var targetParentId=$(this).attr("data-parentId");
        if(param){
            localStorage.setItem("preview_title",param.title);
            localStorage.setItem("preview_author",param.author);
            localStorage.setItem("preview_categoryName",$("#bmstoreTypeSelect").text());
            localStorage.setItem("preview_cover",param.cover);
            localStorage.setItem("preview_content",param.content);
            window.open("preview.html","_blank");
        }
    }
    var addNewsFn = function (e){
        var param=validAndReturnNewsParam()
       // var targetParentId=$(this).attr("data-parentId");
        if(param){
            addNews(param);
        }
    };
    var userInfo=function (){
        var userId=$.cookie(Final.USER_ID);
        var token=$.cookie(Final.TOKEN);
        var userName=$.cookie(Final.USER_NAME);
        return {userId:userId,token:token,userName:userName};
    };
    var addNews = function (param){
        debugger;
        if(param){
            param.common=userInfo();
            //param.categoryId=localStorage.getItem(Final.NEWS_CATEGORY_ID);
            $.ajax({
                contentType:"application/json",
                url:URL.baseURLForward+"back/decoratenew/saveDecorateNew",
                data: JSON.stringify(param),
                type: 'post',
                headers: {
                    token:tokenTmp
                },
                success: function (response){
                    $("#addNews").modal("hide");
                    if(response.code==200){
                        window.setTimeout(function (){
                            Util.showTipMsg("操作成功",toNewsList);
                        },600);
                        //requestOrderList();
                    }else if(response.status==2){
                        Util.showTipMsg(response.message);
                    }else{
                        console.log("请求异常");
                    }
                }
            });
        }
    };
    var deleteNewsFn = function (){
        var targetId=$(this).attr("data-id");
        if(targetId){
            var param={id:targetId};
            deleteNewsRequest(param);
        }
    }
    var deleteNewsRequest = function (param){
        if(param){
            param=$.extend(param,{common:userInfo()})
            debugger;
            $.ajax({
                url:URL.baseURLForward+"back/decoratenew/delDecorateNew",
                data: JSON.stringify(param),
                type: 'post',
                contentType: 'application',
                success: function (response){
                    $("#deleteNewsModal").modal("hide");
                    if(response.code==200){
                        window.setTimeout(function (){
                            Util.showTipMsg("删除成功",requestNewsListPaginationInfo);
                        },600);
                        //requestOrderList();
                    }else if(response.status==2){
                        Util.showTipMsg(response.message);
                    }else{
                        console.log("请求异常");
                    }
                }
            });
        }
    };
    var statusSpanClickFn = function (){
        var id=$(this).attr("data-id")
        var status=$(this).attr("data-status");
        if(id){
            statusChangeRequest({id:id});
        }
    }
    var statusChangeRequest = function (param){
        if(param.id){
            $.ajax({
                url:URL.baseURLForward+"cmsContent/publishContent.action",
                data: param,
                type: 'post',
                headers: {
                    token:tokenTmp
                },
                success: function (response){
                    if(response.status==0){
                        Util.showTipMsg("操作成功",requestNewsList,this,{currentPage:currentPageTemp});
                    }else{
                        console.log("请求异常");
                    }
                }
            });
        }
    };
    var setFirstShowSpanClickFn = function (){
        var id=$(this).attr("data-id")
        var status=$(this).attr("data-isFirst");
        if(id){
            firstShowRequest({id:id});
        }
    }
    var firstShowRequest = function (param){
        if(param.id){
            $.ajax({
                url:URL.baseURLForward+"cmsContent/recommendContent.action",
                data: param,
                type: 'post',
                headers: {
                    token:tokenTmp
                },
                success: function (response){
                    if(response.status==0){
                        Util.showTipMsg("操作成功",requestNewsList,this,{currentPage:currentPageTemp});
                    }else{
                        console.log("请求异常");
                    }
                }
            });
        }
    };

    return {
        init:init
    }
});