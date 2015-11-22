define([
    'modules/mod_wrap_new',
    'jquery',
    'jquery-ui'
],function (mod_wrap_new) {
    var init = function () {
        console.log("初始化drag_new-ok");
        $(".editor-wrap dl dd a").draggable({
            helper: "clone",
            appendTo:"body",
            zIndex:5000,
            stop: function () {

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
       createMods(li,type_id,wid_id);
    };

    //创建Mods
    var createMods = function (li,type_id,wid_id) {
        //将传入的字符串转换为数组
        var typeArray = type_id.split(",");
        var widArray = wid_id.split(",");
        if(li.find(".mod-wrap").size() == 0){
            var ModWrap = mod_wrap_new.create(typeArray,widArray,li);
            if(!ModWrap){
                console.log("创建父组件失败!");
            }
        }else{
            var key = li.children(".mod-wrap").attr("wrap_key");
            var modWrap = mod_wrap_new.getModWrap(key);
            /*var childMod = mod_wrap_new.getChildMod(key);
             console.log(childMod.getTitle());*/
            modWrap.addMod(typeArray,widArray);
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
            bindDropEvent(li);
        }
    };

    return{
        init:init
        ,createMods:createMods
    }
});