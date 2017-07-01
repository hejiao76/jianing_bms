'use strict'

define(['jquery'], function($, Login, Render, URL) {
    var news_manager=function (){
        refreshLeftMenu("news_manager_li");
        // $("#main-content").html('<img class="weclome_img" src="./img/timg.jpg">');
        require(['app/newsManager/news_manager', 'jqGrid','jgGrid_local'], function(NewsManager) {
            NewsManager.init({router:router});
        })
    };
    var building_materials_store=function (){
        refreshLeftMenu("bm_store_manager_li");
        // $("#main-content").html('<img class="weclome_img" src="./img/timg.jpg">');
        require(['app/bmStoreManager/bmstore_manager', 'jqGrid','jgGrid_local'], function(BmStoreManager) {
            BmStoreManager.init({router:router});
        })
    };

    var gongzhang_manager = function (){
        require(['app/gongzhangManager/gongzhang_manager', 'jqGrid','jgGrid_local'], function(GongZhangManager) {
            GongZhangManager.init({router:router});
        })
    }

    var initEvent = function() {
        $(document).on('click', '#news_manager_li', function () {
          window.location.href=window.location.href.split("#")[0]+"#news_manager";
        });
        $(document).on('click', '#bm_store_manager_li', function () {
            window.location.href=window.location.href.split("#")[0]+"#building_materials_store";
        });
        $(document).on('click', '#gongzhang_manager_li', function () {
            window.location.href=window.location.href.split("#")[0]+"#gongzhang_manager";
        });
    }
    var refreshLeftMenu = function (menuId){
      if(menuId){
          $("#left_menu_ul li").removeClass("active");
          $("#"+menuId).addClass("active");
      }
    }
    initEvent();
    var routes = {
        '/news_manager': news_manager,
        '/building_materials_store':building_materials_store,
        '/gongzhang_manager':gongzhang_manager
    }
    var router = Router(routes);
    router.init('');
})