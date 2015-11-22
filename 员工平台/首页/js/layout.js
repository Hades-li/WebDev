/**
 * Created by ZLY on 2015/10/19.
 */
define(['jquery','gridster','underscore','drag_new','modules/mod_wrap_new'],
    function($,Gridster, _, drag_new, mod_wrap_new){
        var gridster;
        var gridWidget =
            '<li wid_id="q" data-id="p">' +
            '   <a href="javascript:" class="addMod-btn"><em></em>添加模块</a>' +
            '   <a href="javascript:" class="move-btn handle"><em></em></a>' +
            '   <div class="addDel">' +
            '       <a href="javascript:" class="delBtn delCell-btn"></a>' +
            '   </div>'+
            '</li>';
        // same object than generated with gridster.serialize() method
        var serialization = [
            {
                wid_id: ["q","p"],
                col: 1,
                row: 1,
                size_x: 2,
                size_y: 2
            },
            {
                wid_id: "w",
                col: 3,
                row: 1,
                size_x: 2,
                size_y: 2
            },
            {
                wid_id: "e",
                col: 1,
                row: 3,
                size_x: 4,
                size_y: 2
            },
            {
                wid_id: "r",
                col: 1,
                row: 5,
                size_x: 3,
                size_y: 2
            },
            {
                wid_id: "t",
                col: 4,
                row: 5,
                size_x: 1,
                size_y: 2
            },
            {
                wid_id: "t",
                col: 1,
                row: 7,
                size_x: 3,
                size_y: 1
            }
            ,
            {
                wid_id: "t",
                col: 4,
                row: 7,
                size_x: 1,
                size_y: 1
            }
            ,
            {
                wid_id: "t",
                col: 1,
                row: 8,
                size_x: 3,
                size_y: 1
            }
            ,
            {
                wid_id: "y",
                col: 4,
                row: 8,
                size_x: 1,
                size_y: 1
            }
        ];
        /*
         * 向页面li添加wid_id
         * */
        function add_li_id(widget, serialization){

         /*   for( var i in serialization){*/
                $(widget).each(function(i){
                    $(this).attr("wid_id",function(){
                        return serialization[i].wid_id
                    }) ;
                    $(this).attr("type_id",function(){
                        return serialization[i].type_id
                    })
                });
          /*  }*/
        }

        /*
        * 收集li的wid_id
        * */
        function id_arr(widget){
            var arr =[];
            $(widget).each(function(i){
                arr.push( $(this).attr("wid_id") );
            });
            return arr;
        }
        /*
         * 收集li的type_id
         * */
        function type_arr(widget){
            var type_arr =[];
            $(widget).each(function(){
                type_arr.push( $(this).attr("type_id") );
            });
            return type_arr;
        }

        //向gridster生成的json添加组件id，
        //页面组件包裹添加wid_id
        // 并返回json用于发送给服务器当前布局

        function add_widget_id(gridster, widget){
            var s = gridster.serialize();
            var len = s.length;

            var arr = id_arr(widget);
            var arr2 = type_arr(widget);
            for(var j=0; j< len; j++){
                s[j].wid_id= arr[j];
                s[j].type_id= arr2[j];
            }
            return JSON.stringify(s);
        }

        //Bind删除事件
        function bindDelEvent() {
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

        $(function(){
            $.ajax({
                type: "post",
                url: "js/json/serialization.json"
            }).done(function(data){
                // sort serialization
                var serialization = Gridster.sort_by_row_and_col_asc(data.serialization);

                gridster = $(".gridster ul").gridster({
                    widget_base_dimensions: [255, 90],
                    widget_margins: [10, 10],
                    max_cols: 4,
                    draggable: {
                        handle: '.handle,.handle em'
                    },
                    resize:{
                        enabled:true
                        /*stop: function(){
                            console.log("大小");
                            $(".mod-body").each(function(){
                                $(this).height(function(){
                                    return $(this).parent().parent().height()-42  ;

                                })
                            })
                        }*/
                    }
                }).data('gridster');

                gridster.remove_all_widgets();
                //渲染li
                $.each(serialization, function() {
                    gridster.add_widget(gridWidget, this.size_x, this.size_y, this.col, this.row);
                });
                //初始化拖拽
                drag_new.init();

                bindDelEvent();

                //添加wid——id
                add_li_id(".gridster ul li", serialization);

                /*id_arr(".gridster ul li")
                type_arr(".gridster ul li")*/
                //初始化渲染组建
                $(".gridster ul li").each(function(i){
                    drag_new.createMods($(this),$(this).attr("type_id"),$(this).attr("type_id"))
                });

                //输出传向服务器的json
                var add = add_widget_id(gridster, ".gridster ul li");
                console.log(add)

            }).fail(function(){
                alert("出错啦！");
            });
        });

        //添加一个容器
        var addLi = function () {
            var li = gridster.add_widget(gridWidget,2,3);
            return li;
        };
        return {
            add_li_id:add_li_id,
            id_arr:id_arr,
            type_arr:type_arr,
            add_widget_id:add_widget_id,
            addLi:addLi
        }
    }
);