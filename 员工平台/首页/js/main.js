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
           $(document).on("click",".index-pop .confirm",function(){
               var obj =$(this);
               popup.reloadData(obj,"js/json/rssh2.json");
           }) ;

       })
    });


