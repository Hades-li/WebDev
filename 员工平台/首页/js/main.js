require.config({
    paths: {
        jquery: '../js/lib/jquery-1.11.3.min',
        underscore: '../js/lib/underscore-min',
        backbone: '../js/lib/backbone-min',
        'jquery-ui': '../js/lib/jquery-ui.min',
        echarts: '../js/lib/echarts',
        json2: '../js/lib/json2',
        gridster:'../js/lib/jquery.gridster.min',
        scrollbar:'../js/lib/jquery.mCustomScrollbar.min',
        mousewheel:'../js/lib/jquery.mousewheel.min'
    },
    shim: {
        'jquery-ui': ['jquery'],
        'bootstrap': ['jquery'],
        'scrollbar':['jquery'],
        'mousewheel':['jquery'],
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        'jquery': {
            exports: '$'
        },
        'echarts': {
            exports: 'echarts'
        },
        'json2': {
            exports: 'json2'
        },
        'gridster':{
            exports: 'gridster'
        }
    }
});

//开始调用
requirejs(
    [
        'json2',
        'init',
        'layout',
        'modules/popup'
    ],
    function(
         json2,
         init,
         layout,
         popup
    )
    {
       $(document).ready(function(){
           //动态更新常用菜单的数据
           /*$(document).on("click",".index-pop .close",function(){
               var obj =$(this);
               $.ajax({
                   type: "post",
                   url: url,
                   data: popup.confirmBtn(obj).this_wid_id
               }).done(function(data){
                   popup.reloadData(obj,data);
               }) ;

           });*/

           //popup.click_reload(url,btn,wid_id);

           //首页新增提示弹出框
           /*
            *  pos:         "center",弹出框位置默认居中；可选“diy”为自定义距离顶部高度；或者“”为跟随
            * layer:       true,    是否有遮罩
            * set_height:  null,  自定义距离顶部高度
            * timer:       null   自动消失的时间
            * */
           /*hb.dialog({
               has_handler: false, //是否绑定事件点击触发
               handler:     null,
               cObj:        ".close",
               popObj:      "#pop4",
               decision:    ".decision-btn a",
               pos:         "center",
               layer:       true,
               set_height:  null,
               timer:       null
           });
           //靠顶部的提示
           hb.dialog({
               has_handler: false, //是否绑定事件点击触发
               handler:     null,
               cObj:        ".close",
               popObj:      "#pop5",
               decision:    ".decision-btn a",
               pos:         "diy",
               layer:       false,
               set_height:  50,
               timer:       5000
           })*/
       })
    });


