/**
 * Created by ZLY on 2015/10/19.
 */
define(['jquery','gridster','underscore','drag_new','modules/mod_wrap_new','modules/animation','init'],
    function($,Gridster, _, drag_new, mod_wrap_new, animal, init){
        var view_state = false;       //是否显示提示关闭或刷新
        var gridster;
        var gridWidget =
            '<li>' +
            '   <a href="javascript:" class="addMod-btn"><em></em>添加模块</a>' +
            '   <a href="javascript:" class="move-btn handle"><em></em></a>' +
            '   <div class="addDel">' +
            '       <a title="删除" href="javascript:" class="delBtn delCell-btn"></a>' +
            '   </div>'+
            '</li>';
        // same object than generated with gridster.serialize() method
        var serialization_new = [
            {
                "wid_id": ["kmwqje","zdkmjk"],
                "type_id": ["kmtj","kmtj"],
                "col": 1,
                "row": 1,
                "size_x": 2,
                "size_y": 10
            },
            /*{
                "wid_id": "zdkmjk",
                "type_id": "kmtj",
                "col": 3,
                "row": 1,
                "size_x": 2,
                "size_y": 10
            },*/
            {
                "wid_id": "dbrw",
                "type_id": "dbrw",
                "col": 1,
                "row": 11,
                "size_x": 4,
                "size_y": 7
            },
            {
                "wid_id": ["tzgg","fwgg"],
                "type_id": ["wddb","wddb"],
                "col": 1,
                "row": 18,
                "size_x": 3,
                "size_y": 8
            },
            {
                "wid_id": "cycd",
                "type_id": "cycd",
                "col": 4,
                "row": 18,
                "size_x": 1,
                "size_y": 8
            },
            {
                "wid_id": "xxcz",
                "type_id": "xxcz",
                "col": 1,
                "row": 26,
                "size_x": 3,
                "size_y": 8
            },
            {
                "wid_id": ["jcrs","ygsh"],
                "type_id": ["rssh","rssh"],
                "col": 4,
                "row": 26,
                "size_x": 1,
                "size_y": 8
            },
            {
                "wid_id":["wddy","wddb"],
                "type_id": ["wddb","wddb"],
                "col": 1,
                "row": 34,
                "size_x": 3,
                "size_y": 9
            },
            {
                "wid_id": "cyxt",
                "type_id": "cyxt",
                "col": 4,
                "row": 34,
                "size_x": 1,
                "size_y": 9
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
                    });
                    $(this).attr("type_id",function(){
                        return serialization[i].type_id
                    });
                    $(this).addClass("full");
                });
          /*  }*/
        }

        /*
        * 收集li的wid_id
        * */
        function id_arr(widget){
            var arr =[];
            $(widget).each(function(){
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
            $(".gridster ul").off("click","li .delCell-btn");
            $(".gridster ul").on("click","li .delCell-btn", function () {
                    var curLi = $(this).parents("li");
                    if(curLi.children().is(".mod-wrap")){
                        var key = curLi.children(".mod-wrap").attr("wrap_key");
                        mod_wrap_new.destroyWrap(key);
                        curLi.removeClass("full");
                    }else if($(".gridster>ul").children("li").size() >1 && $(".gridster>ul").children("li").size()-$(".gridster>ul>li>.mod-wrap").size() > 1)
                    {
                        gridster.remove_widget(curLi, function () {});
                    }
            })
        };



        //布局渲染后的初始化事件
        function layout_init(send_url,serialization){

            //添加wid——id
            add_li_id(".gridster>ul>li", serialization);


            //初始化渲染组建
            $(".gridster>ul>li").each(function(i){
                drag_new.createMods($(this),$(this).attr("type_id"),$(this).attr("wid_id"));
            });
            //页面保存的事件
            $(".l-tools-bottom .save-btn").on("click",function(){
                //弹出提示框
                hb.dialog({
                    has_handler:false,
                    popObj:"#pop6"
                });
                $(document).on("click","#pop6 .save-change",function(){
                    //输出传向服务器的json
                    var add = add_widget_id(gridster, ".gridster>ul>li");
                    //window.location.reload(true);
                    $.ajax({
                        type: "post",
                        url: send_url,
                        data: add
                    }).done(function(){
                    });
                });
                $(document).on("click","#pop6 .cancel-change",function(){
                    window.location.reload(true);
                })

            });
            //预览功能//编辑功能
            $(".review-btn").on("click",function(){
                $(".editor-wrap").css("left",-200);
                if($(".main").hasClass("view-mode")) {
                }else{

                    var w = parseInt($(".r-container").width()-20) ;

                    gridster.disable().disable_resize();

                    $(".main").addClass("view-mode");

                    $(".gridster>ul>li").each(function(){

                        $(this).width(function(){
                            return ($(this).width()/1100)*w;
                        });
                        $(this).css("left",function(){
                            return Math.round((parseInt($(this).css("left"))/1100)*w);
                        });
                        var $that = $(this);
                        setTimeout(function () {
                            li_refresh($that);
                        },500);
                    }) ;
                    if($(".thelastwidget").length>0){gridster.remove_widget(".thelastwidget");}
                }
            }).trigger("click");

            $(".tools-btn").on("click",function(){
                view_state = true;
                gridster.enable().enable_resize();
                $(".main").removeClass("view-mode");

                $(".gridster>ul>li").each(function(){
                    $(this).attr("style","");
                    var $that = $(this);
                    setTimeout(function () {
                        li_refresh($that);
                    },500);
                });
                //添加一个空白li
                if($(".thelastwidget").length<=0){addLi().addClass("thelastwidget");}
                //初始化拖拽！
                drag_new.init();
                //绑定删除事件
                bindDelEvent();
            });

            window.hb.l_nav_fold(function(){
                var w = 0;
                var nextW = 0;
                //用于计算滚动条的宽度
                function getScrollbarWidth() {
                    $("<p style='width:100px;height:100px;overflow-y:scroll;' id='testP'></p>").appendTo("body");
                    var oP = document.getElementById("testP");
                    var scrollbarWidth = oP.offsetWidth - oP.clientWidth;
                    $("#testP").remove();
                    return scrollbarWidth;
                }
                //前后差值140px
                w = parseInt($(".r-container").width()-getScrollbarWidth());  //开始宽度

                //nextW = 0;                          //之后宽度
                if( $(".r-mn").hasClass("open") ){
                    nextW = w-140;
                }else{
                    nextW = w+140;
                }
                gridster.disable().disable_resize();

                $(".gridster>ul>li").each(function(){
                    $(this).width(function(){
                        return ($(this).width()/w)*nextW;
                    });
                    $(this).css("left",function(){
                        return Math.round((parseInt($(this).css("left"))/w)*nextW);
                    });
                    var $that = $(this);
                    setTimeout(function () {
                        li_refresh($that);
                    },500);
                }) ;
            });


        }

        //布局初始化
        function ajax_rander(get_url,send_url){
            animal.loadingAnimation($(".r-container"),true);
            $.ajax({
                type: "post",
                url: get_url,
                dataType: "json"
            }).done(function(data){
                animal.loadingAnimation($(".r-container"),false);
                //删除刷新div
                $(".reload-pnf").remove();
                if(data == ""){
                    var serialization = Gridster.sort_by_row_and_col_asc(serialization_new);
                }else{
                    var serialization = Gridster.sort_by_row_and_col_asc(data.serialization);
                }
                gridster = $(".gridster>ul").gridster({
                    widget_base_dimensions: [255, 20],
                    widget_margins: [10, 10],
                    max_cols: 4,
                    draggable: {
                        handle: '.handle,.handle em'
                    },
                    resize:{
                        enabled:true,
                        stop: function (e,ui,$wid) {
                           li_refresh($wid);
                        }
                    }
                }).data('gridster');

                gridster.remove_all_widgets();
                //渲染li
                $.each(serialization, function() {
                    gridster.add_widget(gridWidget, this.size_x, this.size_y, this.col, this.row);
                });
                //事件初始化
                layout_init(send_url,serialization);

            }).fail(function(){
                animal.loadingAnimation($(".r-container"),false);
                var html =["<div class=\"reload-pnf\">",
                    "         <div class=\"wrap\">",
                    "                    <table>",
                    "                        <tr>",
                    "                            <td><img src=\"images/pnf.png\" alt=\"系统忙，请刷新重新加载\"/></td>",
                    "                        </tr>",
                    "                        <tr>",
                    "                            <td>",
                    "                                <p class='pt10 pb10'>系统有点忙，点击刷新，重新为您加载</p>",
                    "                                <div class=\"text-center\">",
                    "                                    <a href=\"javascript:;\" class=\"btn-1 layout-refresh\">刷新</a>",
                    "                                </div>",
                    "                            </td>",
                    "                        </tr>",
                    "                    </table>",
                    "                </div>",
                    "</div>"].join("");
                $(".r-container").append(html);
                $(".layout-refresh").on("click",function(){
                    ajax_rander("js/json/serialization.json","");
                })
            });
        }
        $(function(){
            ajax_rander("js/json/serialization.json","");
        });

        //添加一个容器
        var addLi = function () {
            var li = gridster.add_widget(gridWidget,4,3);
            return li;
        };

        //li内部组件重新渲染函数
        var li_refresh = function (li_dom) {
            var key = li_dom.find(".mod-wrap").attr("wrap_key");
            if(key){
                var mod = mod_wrap_new.getChildMod(key);
                mod.refresh();
            }
        };

        //刷新或关闭时提示
        //ie兼容绑定
        function isIe(){
            return window.ActiveXObject ? true : false;
        }

        if(isIe()){
            //".gridster,.l-tools-bottom"
            $(document).on("click","a",function(){
                if($(this).attr("target") == "_blank"){
                    var url = $(this).attr("href");
                    window.open(url);
                    return false;
                }
                if( $(this).is($("[href^='javascript']")) ){
                    return false;
                }
            }) ;
        }
        $(window).on("beforeunload",function(event){
            if(view_state){
                view_state = false;
                var message = "您的页面如果有过改动或者未保存，当前操作可能导致失去您之前的修改。";
                event.returnValue = message;
                return message;
            }
        });
        return {
            add_li_id:add_li_id,
            id_arr:id_arr,
            type_arr:type_arr,
            add_widget_id:add_widget_id,
            addLi:addLi
        }
    }
);