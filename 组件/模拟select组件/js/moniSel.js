/**
 * Created by Plus.li on 2015/12/10.
 */
var Sel = Sel || {};
Sel= {
    //模拟下拉菜单
    moni: function(){
        var m = $(".moniSel");
        var btn = m.children("input:button");
        var options = btn.next("em");
        var $textFull = $("<a href='javascript:' class='textFull'></a>");
        //点击下拉框
        btn.on("click",function(e){
            e.stopPropagation();
            $(this).addClass("open").next("em").show();
        });
        //选择options
        options.find("a").on("click",function(){
            var t = $(this).html();
            var v = $(this).attr("val");
            m.find("em").hide();
            $(this).parent().prev().val(t).attr("val",v);
            $(this).parent().prev().trigger("change");
        });
        $(document).on("click",function(e){
            e.stopPropagation();
            btn.removeClass("open").next("em").hide();
        });
        m.find("em a").hover(function () {
            if($(this)[0].scrollWidth > $(this)[0].offsetWidth){
                $textFull.css("top", m.outerHeight()+$(this).position().top+"px");
                $(this).parent().after($textFull.text($(this).text()).attr("val",$(this).attr("val")).show());
            }
        }, function () {

        });

        $textFull.hover(function () {

        }, function () {
            $(this).hide();
        }).click(function () {
            var t = $(this).html();
            var v = $(this).attr("val");
            m.find("em").hide();
            $(this).prevUntil().val(t).attr("val",v);
            $(this).prevUntil().trigger("change");
            $(this).hide();
        })

    }
};