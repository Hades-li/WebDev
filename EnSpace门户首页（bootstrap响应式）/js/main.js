/**
 * Created by ZLY on 2014/10/30.
 */
;
(function($){
    $.extend($.easing,{
        easeOutBack:function(x,t,b,c,d,s){
            if (s == undefined) s = 1.70158;
            return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
        },
        easeOutCubic: function (x, t, b, c, d) {
            return c * ((t = t / d - 1) * t * t + 1) + b;
        }
    });
    var enSpace = {

        init:function(){
            this.menu_open();
            this.rect_animate();
            this.scroll();
        },
//菜单弹出
        menu_open:function () {
            var menu = $('.grayCover');
            $('.xfBtn').click(function () {
                if(menu.hasClass('open')){
                    menu.removeClass('open');
                    menu.fadeOut();
                }else{
                    menu.addClass('open');
                    menu.fadeIn().css('display','flex');
                }
            });
            menu.click(function (event) {
                $(this).removeClass('open').fadeOut();
            });
            menu.find('.xf-list li a').click(function (event) {
                event.stopPropagation();
            })
        },
    // 磁块动画
        rect_animate:function () {
            var boxes = $('.imgBox');
            $(window).scroll(function () {
                boxes.each(function () {
                    var a = $(this).offset().top;
                    if (a >= $(window).scrollTop() && a < ($(window).scrollTop()+$(window).height())) {
                        $(this).removeClass('noSee');

                    }
                })
            });

        },
        // 滚动动画
        scroll:function () {
            $('.en a').click(function () {
                var top = $($(this).attr('href')).offset().top;
                $('html,body').animate({scrollTop:top},500);
            })
        }
    };
    
    $.enSpace = enSpace;
})(jQuery);

$(function(){
    $.enSpace.init();
});

