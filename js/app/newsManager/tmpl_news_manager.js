
define([],function (){
    return [
        '<div class="m_con">',
        '<div class="clear_fixed">',
        // '<p class="fleft mt10 font16"><span id="firstSpan">一级模块<span id="firstModuleName"></span></span> <span id="secondModuleSpan" style="display: none;"> >> <span id="secondSpan">二级模块<span id="secondModuleName"></span> </span></span>  <span style="display: none;" id="thirdModuleSpan">>></span></p>',
        // '<button id="sortNewsBtn" class="sort_tz fright">调整排序</button>',
        // '<button id="saveSortNewsBtn" class="sort_tz fright hide">保存排序</button>',
        '<button id="addNewsBtn" class="sort_tz fright mr15">新增新闻</button>',
        '</div>',
        '<table id="news_list_table" class="module_tabel">',
        '<thead>',
        '<tr>',
        '<th class="col-sm-1 tl">',
        '编号',
        '</th>',
        '<th class="col-sm-3 tl">',
        '新闻标题',
        '</th>',
        '<th class="col-sm-1 tl">',
        '新闻类型',
        '</th>',
        '<th class="col-sm-1 tl">',
        '编辑名称',
        '</th>',
        '<th class="col-sm-1 tl">',
        '首页展示',
        '</th>',
        '<th class="col-sm-2 ">',
        '操作',
        '</th>',
        '<th class="col-sm-2 sort_col_js hide">',
        '排序',
        '</th>',
        '</tr>',
        '<thead>',
        '<tbody id="news_list_table_tbody">',
        // '<tr>',
        // '<td class="tl">sdsadasdas</td>',
        // '<td>',
        // '<a href>',
        // '<img src="img/icon3.png">',
        // '</a>',
        // '</td>',
        // '<td>',
        // '<a href>',
        // '<img src="img/icon4.png">',
        // '</a>',
        // '</td>',
        // '</tr>',
        '<tbody>',
        '</table>',
        '<div id="Pagination" class="pagination" style="width:100%;text-align:center;"></div>',
        '<div class="modal fade" id="addNews" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static">',
            '<div class="modal-dialog">',
                '<div class="modal-content">',
                    '<div class="modal-header">',
                        '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>',
                        '<h4 class="modal-title" id="myModalLabel">编辑</h4>',
                    '</div>',
                    '<div class="modal-body pop_content">',
                        '<p class="font14 mb20 tl"><span style="color:red;">*</span>news图</p><img id="newsImgPreview" class="cp"  style="max-width:300px;display: none;" src="http://192.168.1.133:8888/img/2017/20170106092437.jpg">',
                        '<input id="newsFileInput" name="file" class="input01" type="file">',
                        '<input id="newsUrl" class="input01 hide">',
                        '<p class="font14 mb20 tl"><span style="color:red;">*</span>活动页面</p>',
                        '<input id="target_href" class="input01">',
                    '</div>',
                    '<div class="modal-footer">',
                        '    <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>',
                        '    <button id="addNews_save_js" type="button" class="btn btn-primary">提交</button>',
                    '</div>',
                '</div>',
            '</div>',
        '</div>',

        '<div class="modal fade" id="deleteNewsModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static">',
        '<div class="modal-dialog">',
        '<div class="modal-content">',
        '<div class="modal-header">',
        '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>',
        '<h4 class="modal-title" id="myModalLabel">删除</h4>',
        '</div>',
        '<div class="modal-body pop_content">',
        '<p class="font14 mb20 tl">确定要删除吗？</p>',
        '</div>',
        '<div class="modal-footer">',
        '    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>',
        '    <button id="deleteNews_sure_js" type="button" class="btn btn-primary">确定</button>',
        '</div>',
        '</div>',
        '</div>',
        '</div>'

        //'<div class="modal fade" id="tipModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" data-backdrop="static">',
        //    '<div class="modal-dialog modal-sm" role="document">',
        //        '<div class="modal-content">',
        //            '<div class="modal-header">',
        //                //'<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>',
        //                '<h4 class="modal-title" id="myModalLabel">提示</h4>',
        //            '</div>',
        //            '<div class="modal-body"></div>',
        //            '<div class="modal-footer">',
        //            //'<button  type="button" class="btn btn-default surebtn_js">确定</button>',
        //            //'<button type="button" class="btn btn-primary cancelbtn_js">取消</button>',
        //            '</div>',
        //        '</div>',
        //    '</div>',
        //'</div>'
    ].join('');
});
