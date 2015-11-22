/**
 * Created by ZLY on 2015/2/4.
 */
define([
    'jquery',
    'layout_lj',
    'drag_new',
    'jquery-ui',
    'mousewheel' ,
    'scrollbar'
], function ($,layout_lj,drag_new,jui,mwl,scrollbar) {
    var Tab = function(elem,options){
        this.elem = elem;
        this.$elem= $(elem);
        this.options=options;
    };
    Tab.prototype={
        def:{
            //wrap   : $(".tab"),
            handler: ".tab-btn a",
            content: ".tab-content-list",
            event  : "click"
        },
        init:function(){
            this.config = $.extend({},this.def,this.options);
            this.method();
            return this;
        },
        method: function () {
            var handler = this.$elem.find(this.config.handler),
                content = this.$elem.find(this.config.content);
            //_this   = this;
            $(document).on(this.config.event,handler,function(e){
                var index = handler.index(e.target);
                if (index>-1){
                    handler.removeClass("active");
                    handler.eq(index).addClass("active");
                    content.hide();
                    content.eq(index).show();
                }
            })
        }
    };
    $.fn.tab=function(options){
        return this.each(function(){
            new Tab(this,options).init();
        })
    };

    $.extend($.easing,{
        easeOutBack:function(x,t,b,c,d,s){
            if (s == undefined) s = 1.70158;
            return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
        },
        easeOutCubic: function (x, t, b, c, d) {
            return c * ((t = t / d - 1) * t * t + 1) + b;
        }
    });
    var hb = hb || {};
    hb={
        init:function(){
            this.page_h_init();
            this.allChose(".tonglan-table table") ;
            this.l_nav_fold();
            this.bool_btn();
            this.flow();
            this.moni();
            this.changeSkin();
            this.mayTable();
            this.popbtns();
            this.inputCount("#tr30","textarea",30);
            this.inputCount("#tr100","textarea",100);
            this.lr_list_sw({l_list:".pop-table.l", r_list:".pop-table.r", moveToR_btn:".btnWrap .in", moveToL_btn:".btnWrap .out"})
            this.editor_move();
        },
        //流程
        flow: function(){
            var $f = $(".flow"),
                $s = $(".flow-steps"),
                $close = $s.find(".close");
            $f.on("click",function(e){
                e.stopPropagation();
                var posl = $(this).offset().left,
                    post = $(this).offset().top ;
                var w = $s.width();
                $s.css({
                    "left":posl-w-450,
                    "top":post-85
                }).show();
            });
            $close.on("click",function(){
                $(this).parent().hide();
            });
            $(document).on("click",function(e){
                e.stopPropagation();
                $(".flow-steps").hide();
            });
            $s.on("click",function(e){
                e.stopPropagation();
            });
        },
        moni: function(){
            var modcallback = this.sw_mod;
            var m = $(".moni-select");
            var btn = $(".sel-button");
            $(document).on("click",".moni-select .sel-button",function(e){
                e.stopPropagation();
                $(this).next("ul").show();
            });
            $(document).on("click",".moni-select ul li",function(){
                var v = $(this).html();
                $(this).parent("ul").hide();
                $(this).parent().prev().val(v).html(v);

                modcallback(v);
            });
            $(document).on("click",function(e){
                e.stopPropagation();
                $(".moni-select ul").hide();
            });
        },
        //任务管理页面切换模板上传
        sw_mod:function (str) {
            var mod_tr = $(".mod-tr");
            switch(str){
                case "批量创建":
                    mod_tr.show();
                    mod_tr.nextAll("tr").not("tr:last").hide();
                    break;
                case "单个创建":
                    mod_tr.hide();
                    mod_tr.nextAll("tr").not("tr:last").show();
                    break;
                default :

                    break;
            }
        },

        changeSkin: function(){
            var skin = $(".skin-sel");
            var a = skin.find(".skin-option a");
            a.on("click",function(){
                a.removeClass("active");
                $(this).addClass("active")
            })
        },
        mayTable: function(){
            var m = $(".may-table");
            var radio = $(".authorize").find("input[type='radio']");
            var n = $(".authorize").find("input[type='radio']:checked").parent().index();

            function showTable(n){
                switch (n){
                    case 0 :
                        m.hide().eq(1).show();
                        break;
                    case 1 :
                        m.show();
                        break;
                    default :
                        m.hide();
                        break;
                }
            }
            showTable(n);
            radio.on("click",function(){
                n = $(".authorize").find("input[type='radio']:checked").parent().index();
                showTable(n);
            });
        },
        popbtns:function(){
            var index= 0;
            $("body").on("click","#pop1 .prev",function(){
                var s =  $(this).siblings(".con-wrap").find("ul"),
                    con = s.find("li").length;

                if(index==0){index = con}
                index--;
                //console.log(index)
                s.stop()
                    .animate({"margin-left":[-index*600,'easeOutBack']},800);


            });
            $("body").on("click","#pop1 .next",function(){
                var s =  $(this).siblings(".con-wrap").find("ul"),
                    con = s.find("li").length;
                if(index>= con-1){index =-1}
                index++;
                s.stop()
                    .animate({"margin-left":[-index*600,'easeOutBack']},800);


            })
        },
        //全选
        allChose: function(tb) {
            var _all_chk = $(tb).find("tr th input:checkbox");
            //var _other_chks = $(tb).find("tr td input:checkbox");
            _all_chk.click(function () {
                var _other_chks = $(this).parent().parent().siblings().find("input:checkbox:first");
                if($(this).prop("checked")){
                    _other_chks.prop("checked",true);
                }else{
                    _other_chks.prop("checked",false);
                }
            });

        },
        //左侧菜单折叠
        l_nav_fold: function () {
            var _l_nav = $(".l-nav");
            var _r_container = $(".r-mn,.change-skin-wrap");
            var _nav_list = _l_nav.find(".nav-wrap ul");
            var _collapse_btn = $(".collapse-btn");
            var isCollapsed = false;
            nav_open_close();
            l_nav_collapse_click();
            //菜单内点击效果
            function nav_open_close(){
                _nav_list.find("li").click(function () {
                    /*$(this).siblings("li").removeClass("on");
                     $(this).siblings("li").next("dd").slideUp(300);
                     $(this).toggleClass("on");
                     $(this).next("dd").slideToggle(300);*/
                    if(isCollapsed){
                        isCollapsed = !isCollapsed;
                        l_nav_collapse(isCollapsed);
                    }
                });
                /*_nav_list.find(".lv2 a").click(function (){
                 $(this).next("ol").slideToggle(300);
                 })*/
            }

            //左侧区域折叠展开
            function l_nav_collapse_click(){
                _collapse_btn.click(function () {
                    isCollapsed = !isCollapsed;
                    l_nav_collapse(isCollapsed);
                })
            }

            function l_nav_collapse(isCollapse){
                if(isCollapse){
                    _l_nav.addClass("collapsed");
                    _r_container.addClass("open");
                    //_nav_list.find("dd").slideUp(300);
                    //_collapse_btn.removeClass("on");
                }else{
                    _l_nav.removeClass("collapsed");
                    _r_container.removeClass("open");
                    //_collapse_btn.addClass("on");
                }
            }
        },
        bool_btn: function(){
            var $btn = $(".bool-slide-btn");
            var $a = $btn.find(".handle");
            $a.click(function(){
                $(this).toggleClass("handle-is");
                $(this).parent().find("b").toggleClass("gray9");
            })
        },
        //弹窗
        dialog: function(opt){
            //参数
            var def = {
                has_handler : true,
                handler     : $.noop,
                cObj        : ".close",                         // cObj -关闭容器
                popObj      : ".popup",                         // popObj-弹出层容器
                decision    : ".decision-btn a"
            };
            $.extend(def, opt);
            var close       = def.cObj,
                popObj      = $(def.popObj),
                decision    = def.decision;

            function grayLayer(b){
                var div =$('<div id="grayLayer"></div>');

                if($("#grayLayer").length< 1){
                    div.appendTo("body");
                }
                var gL = $("#grayLayer");
                gL.css({
                    display:"block",
                    width:$(window).width()+"px",
                    height:$(document).height()+"px"
                });

                if(b == false){
                    //新增判断
                    if($('.popup:visible').length<1){gL.hide();}

                }
            }
            function pos(){
                popObj.css({
                    top:($(window).height()-popObj.height())/2
                    +$(window).scrollTop()+"px",
                    marginLeft:-parseInt(popObj.width()/2)
                });
            }
            //打开弹出框
            function openWin(){
                popObj.show();
            }
            //关闭弹出框
            function closeWin(){
                popObj.hide();
                grayLayer(false);
            }

            //启动
            if(def.has_handler){
                $(document).on("click",def.handler,function(){
                    grayLayer();
                    openWin();
                    pos();
                    popObj.find(close).click(function(){
                        closeWin();
                    });
                    popObj.find(decision).click(function(){
                        closeWin();
                    });
                })
            }else{
                grayLayer();
                openWin();
                pos();
                popObj.find(close,decision).click(function(){
                    closeWin();
                });
                popObj.find(decision).click(function(){
                    closeWin();
                });
            }

            $(window).resize(function(){  //放缩
                var ncw = document.documentElement.scrollLeft+document.documentElement.clientWidth;
                $("#grayLayer").width(ncw);
                pos();
            });
            $(window).scroll(function(){
                pos();
            });
        },
        //页面高度初始化
        page_h_init:function(){
            var _main = $(".main");
            var _l_nav = $(".l-nav");
            var _r_container = $(".r-container");
            var _r_c_b = $(".right-content-border");
            h_resize();
            $(window).resize(function () {
                h_resize();
            });

            function h_resize(){
                //console.log($(window).outerHeight());
                var viewport_h = $(window).outerHeight();
                var scroll_h = viewport_h - $(".top").outerHeight();
                _main.height(scroll_h);
            }
        },
        //登录页狮子变脸
        login_leo_face: function () {
            var _input_wrap = $(".inWrap");
            var _faces = $(".leo-wrap em");
            _input_wrap.find("input").focus(function () {
                _faces.eq(0).css("display","inline-block");
                _faces.eq(1).css("display","none");
            }).blur(function () {
                _faces.eq(0).css("display","none");
                _faces.eq(1).css("display","inline-block");
            })
        },
        //字数计算
        inputCount:function(box,input,n){
            var that = $(box);
            that.find(input).keyup(function(){
                var l = $.trim($(this).val()).length;
                that.find(".count").html(" <i>" + l + "</i>/" + n);
                if(l > n){
                    $(this).addClass("error");
                }else{
                    $(this).removeClass("error");
                }
            });
        },
        //左右两侧表格内容交换
        lr_list_sw: function (defs) {
            this.defs={
                l_list:".l_list",
                r_list:".r_list",
                moveToR_btn:".r_btn",
                moveToL_btn:".l_btn"
            };
            var _l_list = $(defs.l_list);
            var _r_list = $(defs.r_list);
            var moveToL_btn = $(defs.moveToL_btn);
            var moveToR_btn = $(defs.moveToR_btn);
            //右点击
            moveToR_btn.click(function () {
                var units_sel = _l_list.find("td input:checked");
                units_sel.parents("tr").appendTo(_r_list.find("table"));
            });
            //左点击
            moveToL_btn.click(function () {
                var units_sel = _r_list.find("td input:checked");
                units_sel.parents("tr").appendTo(_l_list.find("table"));
            })
        },

        //编辑框移入移出
        editor_move: function () {
            var editor = $(".editor-wrap");
            editor.find(".c-btn").click(function () {
                editor.css("left",-200);
            });
            $(document).on("click",".tools-btn,.addMod-btn,.addBtn", function () {
                editor.css("left",0);
            })
        }
    };
    window.hb = hb;

    var zj = zj||{};
    zj = {
        init: function(){
            //初始化布局
            drag_new.init();
            //弹出框页面的tab效果
            $(document).on("click",".tab-btn a",function(){
                var index = $(this).index();
                $(".tab-btn a").removeClass("active");
                $(".tab-btn a").eq(index).addClass("active");
                $(".tab-content-list").hide().eq(index).show();

            });

            this.alert();
            this.menu();

        },
        //首页alert框交互
        alert: function(){
            var len = $(".info-tips-alert .context").length ;
            var prev = $(".info-tips-alert .prev");
            var next = $(".info-tips-alert .next");
            var index = 0;
            prev.on("click",function(){
                index++ ;
                if(index >= len){index = 0}

                $(".info-tips-alert .context").hide().eq(index).show();
                $(".page-count .red-color").text(index+1)
            });
            next.on("click",function(){
                index--;
                if(index < 0){index = len-1}
                $(".info-tips-alert .context").hide().eq(index).show();
                $(".page-count .red-color").text(index+1)
            })
        },
        menu: function(){
            var len = 0;
            var index = 0;
            $(document).on("click",".custom-com .roll .prev",function(){
                var ul = $(this).parent().siblings(".ul-wrap").find("ul");
                len = ul.length;
                index++ ;
                if(index >= len){index = 0}
                ul.hide().eq(index).show();

            });
            $(document).on("click",".custom-com .roll .next",function(){
                var ul = $(this).parent().siblings(".ul-wrap").find("ul");
                len = ul.length;
                index--;
                if(index < 0){index = len-1}
                ul.hide().eq(index).show();
            })
        }
    };
    window.zj = zj;
    $(function(){
        hb.init();
        zj.init();
        $(".mCustomScrollbar").mCustomScrollbar();
 });
});

