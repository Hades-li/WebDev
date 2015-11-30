define([
    'modules/mod_wrap_new',
    'jquery',
    'jquery-ui'
],function (mod_wrap_new) {
    var init = function () {
        $(".editor-wrap dl dd a").draggable({
            helper: "clone",
            appendTo:"body",
            zIndex:5000,
            start: function () {
            }
        });
        bindDropEvent($(".mods-contain li"));
    };

    //绑定drop事件
    var bindDropEvent = function (el) {
        el.droppable({
            accept:".editor-wrap dd a",
            hoverClass:"drop-hover",
            drop: function (event,ui) {
                dropMod($(this),ui.helper);
                isLiEmpty($(this));
            }
        });
    };

    //拖拽一个Mod组件进来
    var dropMod = function (li,helper) {
        var type_id = helper.attr("type_id");//从导航栏中获取typeid
        var wid_id = helper.attr("wid_id");//从导航栏中获取widID
        li.removeClass("thelastwidget");
        createMods(li,type_id,wid_id);
    };

    //创建Mods
    var createMods = function (li,type_id,wid_id) {
        //将传入的字符串转换为数组
        if(type_id || type_id){
            var typeArray = type_id.split(",");
            var widArray = wid_id.split(",");
            if(li.find(".mod-wrap").size() == 0){
                //加载新的
                var ModWrap = mod_wrap_new.create(typeArray,widArray,li);
                if(!ModWrap){
                    //console.log("创建父组件失败!");
                }else{
                    li.attr("type_id",typeArray).attr("wid_id",widArray);
                }
            }else{
                //加载在同一个wrap中
                var key = li.children(".mod-wrap").attr("wrap_key");
                var modWrap = mod_wrap_new.getModWrap(key);
                var li_typeArray = li.attr("type_id").split(",");
                var li_widArray = li.attr("wid_id").split(",");
                Array.prototype.push.apply(li_typeArray,typeArray);
                Array.prototype.push.apply(li_widArray,widArray);
                li.attr("type_id",li_typeArray).attr("wid_id",li_widArray);
                modWrap.addMod(typeArray,widArray);
            }
        }
    };

    //判断li是否为空，不为空，就给予一个full样式
    var isLiEmpty = function (li) {
        if(li.children().size() > 0){
            li.addClass("full");
        }else{
            li.removeClass("full");
        }

        //判断所有的li是否都填满了。是：增加一个li
        var grid = li.parent("ul");
        var all = grid.children().size();
        var full = grid.find("li.full").size();
        if(all == full){
            var li  = require("layout").addLi();
            li.addClass("thelastwidget");
            bindDropEvent(li);
        }
    };

    return{
        init:init
        ,createMods:createMods
    }
});