/**
 * Created by h.jiali2 on 2015/7/30.
 */
define(
    [
        './modules/mod_base',
        './modules/mod_artlist',
        './modules/mod_echart',
        './modules/mod_imglist',
        'jquery',
        'jquery-ui'
    ],
    function(
             base,
             artlist,
             echart,
             imglist
    )
    {
        var index = 0;
        var obMap = {};//组件Map表,全局变量
       
        //组件从工具栏拖拽
        var widgetDrop = function(){
            $(".widgetBtn").draggable({
                connectToSortable:".editor-wrap",
                helper:function(){
                    var id = $(this).attr("module_type");
                    return $("" +
                    "<div module_type="+id+">" +
                        "<img src='images/helper_img.png' />" +
                    "</div>");
                },
                opacity:0.5,
                appendTo:"body",
                start: function (event,ui){
                    ui.helper.css("z-index","1000");
                    $(".yg-float-panel").hide();
                },
                drag: function(event,ui){
                   /* var panel = ui.helper.parents(".yg-float-panel");
                    var h = panel.outerHeight();
                    var w = panel.outerWidth();
                    if(ui.position.top < 0 ||ui.position.top > h||ui.position.left < 0||ui.position.left > w){
                        //panel.css("position","rel")
                        panel.animate({left:-1*w});
                    }*/
                },
                stop: function (event,ui){

                }
            })
        };
        //组件在容器中排序
        var widgetSortable = function () {
            $(".editor-wrap").sortable({
                tolerance:"pointer",
                handle:".dragHandle",
                cancel:".add-new-moudle",
                connectWith:".editor-wrap",
                revert:true,
                items:"> .module",
                stop: function (event,ui){

                },
                update: function (event,ui) {
                    var module_id = ui.item.attr("module_type");
                    var widget = getWidget(ui.item);
                    //widget返回值：
                    //1：false，表示没有得到组件实例，那么表示新建组件
                    //2：widget组件实例，返回值即为组件实例，那么表示仅仅是组件的排序发生变化
                    if(!widget){
                        widget = selWidget(module_id);
                        ui.item.find("img").remove();
                        ui.item.addClass("module").html(widget.getEl());
                        ui.item.removeAttr("style");
                        widget.init();
                    }else{
                        widget.refresh();
                    }
                    moduleWrapShow_hide();
                },
                receive: function (event,ui) {

                },
                drop: function () {

                }
            })
        };
        //组件选择并返回组件实例
        var selWidget = function(module_type){
			var module  = null;
            var key = "widget_" + index;
            if(typeof(obMap["widget_" + index]) != "undefined" || obMap["widget_" + index] != null){
                alert("这个Map已经有对应的值了，组件添加失败");
            }else{
                switch(module_type){
                    case "artlist":
                        module = artlist.init(key);
                        break;
                    case "echart_pie":
                        module = echart.init(key);
                        break;
                    case "echart_bar":
                        module = echart.init(key);
                        break;
                    case "imglist":
                        module = imglist.init(key);
                        break;
                }
                obMap[key] = module;
                index ++;
            }
            return module;
        };
        //获得组件实例
        var getWidget = function (module_jqDom) {
            var key = module_jqDom.find(".widget:first").attr("widget_key");
            if(key == undefined){
                return false;
            }else{
                return obMap[key];
            }
        };
        //用于判断页面中容器是否为空，为空：去掉添加模块标识
        var moduleWrapShow_hide = function(){
            $(".add-new-moudle").each(function () {
                if($(this).next().length == 0 && $(this).prev().length == 0){
                    $(this).show();
                }else{
                    $(this).hide();
                }
            })
        };
        //删除obMap中组件实例
        var delOb = function (widget_key) {
            var dom = obMap[widget_key].getEl();
            dom.parents(".module:first").remove();
            delete obMap[widget_key];
            console.log(obMap);
        };

        return{
            widgetDrop:widgetDrop,
            widgetSortable:widgetSortable,
            selWidget:selWidget,
            getWidget:getWidget,
            moduleWrapShow_hide:moduleWrapShow_hide,
            delOb:delOb
        }
    }
);
