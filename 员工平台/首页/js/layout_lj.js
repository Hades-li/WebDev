/**
 * Created by ZLY on 2015/10/19.
 */
define(['jquery','gridster','modules/mod_wrap_new'],
    function($,gridster,mod_wrap_new){
        //初始化可拖拽布局
        var gridster;
        var gridWidget =
            '<li wid_id="q" data-id="p">' +
            '   <a href="javascript:" class="addMod-btn"><em></em>添加模块</a>' +
            '   <a href="javascript:" class="move-btn handle"><em></em></a>' +
            '   <div class="addDel">' +
            '       <a href="javascript:" class="delBtn delCell-btn"></a>' +
            '       <a href="javascript:" class="addBtn"></a>' +
            '   </div>'+
            '</li>';
        var init = function (callback) {
            console.log("初始化layout_lj-ok");
            var widgets = [
                [gridWidget, 2, 4],
                [gridWidget, 2, 4],
                [gridWidget, 3, 3]
                /*[gridWidget, 1, 3],
                [gridWidget, 3, 3],
                [gridWidget, 1, 1],
                [gridWidget, 4, 3],
                [gridWidget, 1, 3]*/
            ];
            if($(".gridster ul") != undefined){
                gridster = $(".gridster ul").gridster({
                    widget_margins: [10, 10],
                    widget_base_dimensions: [255,90],
                    max_cols:4,
                    draggable: {
                        handle: '.handle,.handle em',
                    },
                    resize:{
                        enabled:true
                    }
                }).data('gridster');
                $.each(widgets, function(i, widget){
                    gridster.add_widget.apply(gridster, widget);
                });
                if(callback){
                    callback();
                }
            }
            bindDelEvent();

            return gridWidget;
        };

        //Bind删除事件
        var bindDelEvent = function () {
            $(".gridster ul").on("click","li .delCell-btn", function () {
                if($(this).parents("li").children().is(".mod-wrap") == false){
                    if($(".gridster ul li").children(":not(.mod-wrap)").size() == 1){

                    }
                }else{
                    var curLi = $(this).parents("li");
                    var key = curLi.children(".mod-wrap").attr("wrap_key");
                    mod_wrap_new.destroyWrap(key);
                    if($(".gridster ul").children("li").size() >1){
                        gridster.remove_widget(curLi, function () {
                        });
                    }else{

                    }
                }
            })
        };
        //添加一个容器
        var addLi = function () {
            var li = gridster.add_widget(gridWidget,2,3);
            return li;
        };

        return{
            init:init,
            addLi:addLi
        }
    }
);