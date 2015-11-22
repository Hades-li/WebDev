/**
 * Created by ZLY on 2015/6/29.
 */
define(['require','jquery','topTools','drop','bootstrap'],
    function(require,$,topTools,d){
        var isDraggable = false;
        return function(){
            var html = $("#modelHover").html();

            $("body").on("mouseenter",".module",function(){
                if(!isDraggable){
                    $(this).addClass("dashed-border");
                    $(this).prepend(html);
                }
                switch ($(this).attr("module_type")){
                    case "artlist":
                        $(this).find(".articleList-add")[0].style.display = "block";
                        break;
                    default :
                        break;
                }
            });
            $("body").on("mouseleave",".module",function(){
                $(this).removeClass("dashed-border");
                $(".extra-btn").hide();
                $(this).find(".modelHover-wrap").remove();
            });
            $("body").on("click",".editBtn", function () {
                var mtype = $(this).parents(".module").attr("module_type");
                $.ajax(
                    {
                        type: "post",
                        url: "js/json/model-edit.json",
                        data:{"module_type":mtype},
                        dataType: "json",
                        success: function(data){
                            var d = data.modal.join("");
                            $(d).appendTo("body");
                            $('#test_modal').modal();
                        }
                    }
                )
            });
            $("body").on("click",".del",function(){
                var widgetKey = $(this).parents(".module:first").find(".widget").attr("widget_key");
                if(confirm("确认是否删除")){
                    d.delOb(widgetKey);
                    d.moduleWrapShow_hide();
                }else{

                }
            })
        }
    }
);
