
define([],function (){
    return [
        '<div class="m_con">',
        // '<span id="returnNewsList">返回新闻列表</span>',
        // '<div class="clear_fixed tc">',
        // '<button id="sort_tz" class="sort_tz mr5">新闻列表</button>',
        // '<button class="sort_tz  ml5" id="add_banner">新闻详情</button>',
        // '<p class="fright">',
        // '<img src="img/icon7.png">',
        // '<a class="a ml10">编辑</a>',
        // '</p>',
        // '</div>',
        '<div class="mt10">',
        '<div class="manage_edit">',
        '<label>材料名称</label>',
        '<input id="bmstoreTitle" class="col-sm-10" type="text">',
        '</div>',

        '<div class="manage_edit">',
        '<label class="">材料类型</label>',
            '<div class="col-sm-10" style="overflow: hidden">',
            '<select id="bmstoreTypeSelect" class="col-sm-5 choice_num ">',
            '<option value="1">墙面</option>',
            '<option value="2">地板</option>',
            '<option value="3">厨房</option>',
            '</select>',
            // '<input id="bmstoreAuthor" class="col-sm-5 fleft" type="text">',
            '<span class="col-sm-1 fleft inlineB" style="height: 46px;"></span>',
            '<label class="">作者名称</label>',
            '<input id="bmstoreAuthor" class="col-sm-4 fleft" type="text">',
            // '<select id="bmstoreTypeSelect" class="col-sm-5 choice_num ">',
            // '<option value="1">选项一</option>',
            // '<option value="2">选项二</option>',
            // '<option value="3">选项三</option>',
            // '</select>',
            '</div>',
        '</div>',
        '<div class="manage_edit">',
        '<label>推荐分数</label>',
        '<div class="col-sm-10" style="overflow: hidden">',
        '<select id="scoreSelect" class="col-sm-5 choice_num ">',
        '<option value="1">1分</option>',
        '<option value="2">2分</option>',
        '<option value="3">3分</option>',
        '<option value="4">4分</option>',
        '<option selected value="5">5分</option>',
        // '<option value="3">选项三</option>',
        '</select>',
        '</div></div>',
        // '<div class="manage_edit">',
        // '<label class="">简&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;介</label>',
        // '<textarea id="bmstoreDesc"  class="col-sm-10" style="min-height: 80px;height:80px;" type="text"></textarea>',
        // '</div>',
        // '<div class="manage_edit">',
        // '<label class="">图&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;片</label>',
        // '<textarea  class="col-sm-10" style="min-height: 160px;" type="text"></textarea>',
        // '</div>',
        '<div class="manage_edit">',
        '<label class="">焦点图片(336*300)</label>',
        // '<input class="choise_img col-sm-10" type="file">',
        '<input id="bmstoreFileInput" name="file" class="choise_img col-sm-9" type="file">',
        '<input id="bmstoreUrl" class="input01 hide">',
        '<img id="bmstoreImgPreview" class="cp col-sm-10"  style="max-width:300px;display: none;" src="">',
        '</div>',
        // '<div class="manage_edit">',
        // '<label class="">插入图片</label>',
        // '<input class="choise_img col-sm-10" placeholder="dsdsad" type="file">',
        // '</div>',
        '<div class="manage_edit">',
        '<label class="">正&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;文</label>',
        // '<form action="/action/test1" method="post">',
        // '<!-- 加载编辑器的容器 -->',
        '<div class=" col-sm-10" >',
        '<script id="container" name="content" type="text/plain">',
        // '这里写你的初始化内容',
        '</script>',
        '</div>',
        // '</form>',
       //  '<!-- 配置文件 -->',
       //  '<script type="text/javascript" src="../../js/lib/uediter/ueditor.config.js"></script>',
       //  '<!-- 编辑器源码文件 -->',
       //  '<script type="text/javascript" src="../../js/lib/uediter/editor_api.js"></script>',
       // '<script type="text/javascript">',
       // 'alert(1);    var ue = UE.getEditor("container");',
       // '</script>',
        '</div>',
        '<div class="tc mt50 mb20">',
        '<button id="previewNewsBtn" class="sort_tz tc mr20">预览</button>',
        '<button id="addNewsSaveBtn" class="sort_tz tc">提交</button>',
        '</div>',
        '</div>',

    ].join('');
});