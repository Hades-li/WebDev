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
    var snLive = {

        init:function(){
            this.getSize();
            this.tabSlide();
            this.signPhone();
            this.goTop();
            this.fnMenuPop(".pop-v-sort",".myMenuBtn");
            this.fnMenuPop(".dropMenu",".loginName");
            this.popToggle(".popBtn-password","#pop-password");

//            this.popToggle(".popBtn-confirm","#pop-confirm");
            this.popApply(".popBtn-confirm","#pop-confirm");
            this.popApply(".enroll","#pop-confirm2");
            this.phoneQr(".phoneApply",".v-QR");
            this.dropChose();
            this.playPos(".v-link",".playIco");
            this.navSwitch(".navList","button.dropdown-toggle");
        },

        getSize: function(){

            var bgImg = $(".SL-slide");

            //bgImg.height($(window).height());
            //bgImg.width($(document).width());

            /*$(window).resize(function(){
                bgImg.height($(window).height());
                bgImg.width($(document).width());
            });*/



            $(".video-img").hover(function(){
                $(this).find("em").show();
            },function(){
                $(this).find("em").hide();
            });

            if( $(window).height()<900 && $(document).width()>=1200 ){
                $(".SL-index").addClass("ofy");
            }

        },
        getStar: function (objId){

            var stars = $(".img-star img");

            var index = 0;
            for(index = 0;index<stars.length;index=index+1)
            {
                stars[index].src="images/star_2.png";
            }

            for(index = 0;index<=objId;index=index+1)
            {
                stars[index].src="images/star_1.png";
            }
        },
        tabSlide: function(){
            var handler = $(".SL-tabs .tabs-btn"),
                slideImg = $(".SL-slide .SL-item"),
                watchList  = $(".SL-watch-list"),
                watchDetail = $(".SL-watch-detail");

            var btn = $(".SL-next-tab");

            handler.on("click",function(){
                var that = $(this);
                var con  = that.index();

                that.addClass("active").siblings().removeClass("active");

                ani(con);
                //顶部搜索切换
                var tt = $(".dropdown-menu a").eq(con).text();
                var ch = $(".dropdown-toggle").children();
                $(".dropdown-toggle").text(tt).append(ch);
            });

            btn.on("click",function(){
                var index = 0;
                setTimeout(function(){
                    index = $(".SL-tabs .active").index();
                    console.log(index);
                    index++;
                    if(index == 3){ index = 0;}

                    handler.eq(index).addClass("active").siblings().removeClass("active");
                    ani(index);


                    //顶部搜索切换
                    var tt = $(".dropdown-menu a").eq(index).text();
                    var ch = $(".dropdown-toggle").children();
                    $(".dropdown-toggle").text(tt).append(ch);

                },50);



            });

            function ani(con){
                slideImg.eq(con).animate({"opacity":[1,'easeOutCubic']},800)
                    .siblings().animate({"opacity":[0,'easeOutCubic']},1000);

                watchList.hide();
                watchList.eq(con).show().animate({"opacity":[1,'easeOutCubic']},800);

                watchDetail.hide();
                watchDetail.eq(con).show().animate({"opacity":[1,'easeOutCubic']},800);
            }
        },
        signPhone: function(){
            var a = $(".phoneSign");
            var b = $(".td-code a");
            a.on("click",function(){
                $(this).hide().next(".td-code").show();
            });
            b.on("click",function(){
                $(this).parent().hide();
                $(this).parent().prev(".phoneSign").show();
            })
        },
        goTop:function() {
            var _goTop = $('.topBack');
            var _mainWrap = $('.main');
            _goTop.hide();
            _goTop.click(function () {
                $("html,body").animate({scrollTop: 0});
            });
            //IE6 position
            var isIE = !!window.ActiveXObject;
            var isIE6 = isIE && !window.XMLHttpRequest;
            var oft = $(window).height() - 86;

            function domscroll() {
                var stp = $(window).scrollTop();
            }

            $(window).scroll(function () {
                domscroll();
                var topHide = $(document).scrollTop();
                if (topHide > 100) {
                    _goTop.show().css({marginLeft:$(window).width()/2-60});
                } else {
                    _goTop.hide();
                }
            });
        },
        fnMenuPop:function(pop,btn){
            $(btn).click(function(event){
                $(pop).slideToggle();
                event.stopPropagation();//防止事件冒泡
            });
           /* $(window).not($(btn)).click(function(event){
                $(pop).slideUp();
                event.stopPropagation();//防止事件冒泡
            });*/
            $(document).click(function(event){
                $(pop).slideUp();
                event.stopPropagation();
//                $(pop).hide();
            })
        },
        popToggle:function(btn,pop){
            $(btn).click(function(event){
                event.stopPropagation();
                var l = $(window).width()/2-$(pop).width()/2;
                var t = $(window).height()/2-$(pop).height()/2;
                $(pop).css({left:l,top:t});
                $(pop).show();
            });
            $(".closePop").click(function(){
                $(this).parents(pop).hide();
            });
            $(window).resize(function () {
                var l = $(window).width()/2-$(pop).width()/2;
                var t = $(window).height()/2-$(pop).height()/2;
                $(pop).css({left:l,top:t});
            });

            //点击空白处隐藏弹出框
            /*$(document).click(function(event){
                    event.stopPropagation();

            })*/
        },
//        手机报名二维码弹出关闭
        phoneQr: function (btn,Qr) {
            $(btn).click(function () {
                $(this).siblings(Qr).removeClass("hide");
                $(this).addClass("hide");
            });
            $(Qr).children(".closeBtn").click(function () {
                $(this).parent().addClass("hide");
                $(this).parent().siblings(btn).removeClass("hide");
            })
        },
//        下拉菜单选定效果
        dropChose: function () {
            $(".dropdown-menu li").click(function () {
                var txt = $(this).children("a").text();
                var tmp = $(this).parent().siblings("button").children();
                $(this).parent().siblings("button").text(txt).append(tmp);
            })
        },
//        播放按钮动态定位
        playPos: function(hoverObj,playObj) {
            $(hoverObj).hover(function () {
                var l = $(this).width()/2-$(this).children(playObj).width()/2;
                var t = $(this).height()/2-$(this).children(playObj).height()/2;
                $(this).children(playObj).css({left:l,top:t});
            }, function () {

            });
        },
//        顶部导航切换效果
        navSwitch:function(navList,dropBtn) {
            $(navList).children("li").click(function () {
                if($(this).hasClass("current") == false){
                    $(this).addClass("current");
                    $(this).siblings("li").removeClass("current");
                    var txt = $(this).children("a").text();
                    var tmp = $(dropBtn).children();
                    $(dropBtn).text(txt).append(tmp);
                }
            })
        },
        popApply: function (btn,pop) {
            var curBtn;
            $(btn).click(function(event){
                event.stopPropagation();
                var l = $(window).width()/2-$(pop).width()/2;
                var t = $(window).height()/2-$(pop).height()/2;
                $(pop).css({left:l,top:t});
                $(pop).show();
                curBtn = $(this);
            });
            $(pop).find(".closePop").click(function(){
                $(this).parents(pop).hide();
            });

            $(pop).find(".okBtn").click(function () {
                $(this).parents(pop).hide();
                curBtn.next().removeClass("hide");
                curBtn.hide();
            });

            $(window).resize(function () {
                var l = $(window).width()/2-$(pop).width()/2;
                var t = $(window).height()/2-$(pop).height()/2;
                $(pop).css({left:l,top:t});
            });
        }
    };

    $.snlive = snLive;

})(jQuery);

$(function(){
    $.snlive.init();
});

