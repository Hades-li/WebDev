/**
 * name:顶部工具栏的js
 * desc：顶部工具栏所有的交互效果JS文件
 * Created by h.jiali2 on 2015/6/24.
 */

define(
    [
        'model-hover',
        'drop',
        'jquery',
        'jquery-ui',
        'underscore',
        'backbone'
        //'echarts'
    ],
function(modelHover,drop){
    var _topEditor = $(".topEditor");
    var _tabsContent = _topEditor.find(".tabsContent");
    //顶部功能
    var topTools = function () {
        var _cut_line = $(".topEditor-cutLine");
        var _widget_wrap = $(".widget-wrap");//左侧组件工具框

        //调用函数
        init_Widget_wrap();
        //初始化左侧组件栏的位置
        function init_Widget_wrap(){
            _widget_wrap.css("top",_cut_line.offset().top + _cut_line.outerHeight());
        }
        //收起下部分工具框
        _topEditor.find(".topEditor-dropBtn").click(function () {
            if($(this).hasClass("up")){
                _tabsContent.hide();
                $(this).removeClass("up");
            }else{
                _tabsContent.show();
                $(this).addClass("up");
            }
            _widget_wrap.css("top",_cut_line.offset().top + _cut_line.outerHeight());
        })
    };

    //tabs切换
    var tabsSw = function () {
        var _tabs = _topEditor.find(".tabs");
        var _tabsContent = _topEditor.find(".tabsContent");

        _tabs.find("li a").click(function () {
            var index = $(this).addClass("on").parent().index();
            $(this).parent().siblings().children().removeClass("on");
            _tabsContent.children().eq(index).show().siblings().hide();
        })
    };

    //左侧子菜单点击效果
    var subMenu = function () {
        var _nav_right = _topEditor.find(".nav-right");
        var _subMenu = _topEditor.find(".subMenu");
        _subMenu.find("li a").click(function () {
            var index = $(this).addClass("on").parent().index();
            $(this).parent().siblings().children().removeClass("on");
            $(this).parents(".nav-left").next(_nav_right).children().eq(index).show().siblings().hide();
        })
    };

    //选择页面框架
    var selectLayout = function (layout_index,cfunc){
        var _layoutList = _topEditor.find(".layoutList");
        var _layout_data = null;
        var _body = $(".body");
        $.getJSON("js/json/container-top.json",function(data,status){
            if(status == "success"){
                _layout_data = data;
                _layoutList.find("li a").click(function(){
                    //alert
                    var index = $(this).attr("layout_item");
                    $(this).addClass("on").parent().siblings().find("a").removeClass("on");
                    setLayout(index);
                    //给bodydiv添加布局标记
                    _body[0].setAttribute('layout',index);
                });
                //初始化布局
                initLayout();
                if(cfunc){
                    cfunc();
                }
            }
        });
        //选择布局
        function setLayout(layout_index_int){
            _body.html(_layout_data["main_"+layout_index_int].join(""));
            drop.widgetSortable();
        }
        //初始化布局
        function initLayout(){
            //setLayout(layout_index);
            _layoutList.children("li").eq(layout_index).find("a").click();
            drop.widgetDrop();
        }
    };

    $(function () {
        topTools();
        tabsSw();
        subMenu();
    });
    return{
        tabsSw:tabsSw,
        subMenu:subMenu,
        selectLayout:selectLayout
        //moudleWrapShow_hide:moudleWrapShow_hide,
        //obMap:obMap,//组件列表
        //selWidget:selWidget,
        //getWidget:getWidget

    };
});
