/**
 * Created by Hades on 2016/4/1.
 */
/**
 * Created by ZLY on 2014/10/30.
 */
;(function(w,$){
    $.extend($.easing,{
        easeOutBack:function(x,t,b,c,d,s){
            if (s == undefined) s = 1.70158;
            return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
        },
        easeOutCubic: function (x, t, b, c, d) {
            return c * ((t = t / d - 1) * t * t + 1) + b;
        }
    });
    var ma = ma || {};
    ma = {
        init:function(){
            this.menu();
            this.tab();
            this.groupAll();
        },

        // 导航收缩
        menu:function () {
            var m = $('.menu');
            m.find('dl dt').click(function () {
                if($(this).hasClass('open')){
                    $(this).removeClass('open').nextUntil('dt').hide();

                }else{
                    $(this).addClass('open').nextUntil('dt').show();

                }
            })
        },
        // tab切换
        tab:function () {
            var tab_btns = $('.tab-btns li');
            var tab_cells = $('.tab-body .content');
            tab_btns.click(function () {
                var index = $(this).index();
                tab_cells.eq(index).show().siblings().hide();
                $(this).children('a').addClass('active');
                $(this).siblings().children('a').removeClass('active');
            })
        },
        //管理页多选
        groupAll:function () {
            $('.chk-title input:checkbox').change(function () {
                if($(this).prop('checked')){
                    $(this).parent().next().find('input:not(:checked)').click();
                }else{
                    $(this).parent().next().find('input:checked').click();

                }
            })
        },
        host : 'http://120.26.101.146:6299/v1/console/admin/',

        myAjax:function (object) {

            var def = {
                // url:'http://120.26.101.146:6299/v1/console/admin/login',
                type:'get',
                // jsonp:'callback',
                dataType:'json',
                data:{
                    admin_session_id:'bfe13656d4e45c26d424'
                }
            };
            $.extend(true,def,object);
            $.ajax(def);
        }
    };

    w.ma = ma;
})(window,jQuery);

$(function(){
    ma.init();
});

