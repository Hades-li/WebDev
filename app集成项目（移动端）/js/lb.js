/**
 * Created by 13060142 on 2015/4/24.
 */
;(function($,window,document){

    var Tab = function(elem,options){
        this.elem = elem;
        this.$elem= $(elem);
        this.options=options;
    };
    Tab.prototype={
        def:{
            handler: ".tab-btn a",
            content: ".tab-content",
            event  : "tap"
        },
        init:function(){
            this.config = $.extend({},this.def,this.options);

            this.method();
            return this;
        },
        method: function () {
            //console.log(this.$elem.find(this.config.handler))
            var handler = this.$elem.find(this.config.handler),
                content = this.$elem.find(this.config.content);
            //_this   = this;
            $(document).on(this.config.event,handler,function(e){
                //console.log(handler)
                //console.log(e.target)
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
    }
})(Zepto,window,document);
;(function(w,$){
    var ygpt = ygpt || {};
    ygpt={
        init:function(){
            this.moni();
            this.slide_del();
            this.slide_down();
            this.flowDrop();
            this.autoTextHeight();
        },
        moni: function(){
            $(".radio-skin").tap(function(){
                $(".radio-skin").removeClass("active");
                $(this).addClass("active");
            }) ;
            $(".itp-con a").tap(function(){
                $(".itp-con a").removeClass("active");
                $(this).addClass("active");
            })
        },
        inputCount:function(box,input,n){
            var that = $(box);
            that.find(input)[0].onkeyup=function(){

                var l = $.trim($(this).val()).length;
                that.find("p").html(" <b>" + l + "</b> /" + n);
            };
        },
        dialog: function(opt){
            var def = {
                cObj        : ".close",                         // cObj
                popObj      : ".popup",                         // popObj
                time       :  null
            };

            $.extend(def, opt);

            var close       = def.cObj,
                popObj      = $(def.popObj),
                popBg       = $(".pop-bg"),
                time = def.time;

            function grayLayer(b){

                var gL = $(".gray");
                /*gL.css({
                    display:"block",
                    width:$(window).width()+"px",
                    height:$(document).height()+"px"
                });*/

                if(b == false){
                    gL.hide();
                }
            }
            function pos(){
                popObj.css({top:($(window).height()-popObj.height())/2});

            }
            function openWin(){
                popBg.show();
                popObj.fadeIn(300);
                if(time){
                    setTimeout(function () {
                        closeWin();
                    },time);
                }
            }
            function closeWin(){
                popObj.fadeOut(300, function () {
                    popBg.hide();
                });
            }

            //grayLayer();
            openWin();
            pos();
            popObj.find(close).click(function(){
                closeWin();
            });
            popBg.find('.gray').click(function (event) {
                closeWin();
            });
            $(window).resize(function(){
                var ncw = document.documentElement.scrollLeft+document.documentElement.clientWidth;
                //$("#grayLayer").width(ncw);
                pos();
            });
            $(window).scroll(function(){
                pos();
            });
        },
        //滑动删除
        slide_del: function () {
            var _list = $(".swipeLeft ul");
            var _slide_wrap = _list.find("li .wrap:not(.disable)");
            var _start_x = 0;
            var move = 0;
            var ml = 0;
            //手指触碰
            _slide_wrap.on("touchstart", function (event) {
                var touchpos = event.touches[0];
                _start_x = touchpos.clientX;
                _cur_marginLeft = parseInt($(this).css("margin-left"));
            });

            //滑动触发
            _slide_wrap.on("touchmove",function (event) {
                var touchpos = event.touches[0];
                move = (touchpos.clientX -_start_x)/40;
                ml = _cur_marginLeft + move;
                if(ml < -3){
                    ml = -3;
                }else if(ml > 0){
                    ml = 0;
                }
                $(this).css("margin-left",ml+'rem');

            });

            //手指松开
            _slide_wrap.on("touchend",function(event) {
                var touchpos = event.changedTouches[0];
                if(parseInt($(this).css("margin-left")) < -1.5){
                    $(this).animate({marginLeft:"-3rem"},300);
                }else{
                    $(this).animate({marginLeft:"0rem"},300);
                }
            });
        },

        //下拉悬停
        slide_down: function () {
            var _slideWrap = $(".slideDown");
            var _loading = $(".loading");
            var _start_y = 0;
            var _slideLen = 2.25;//下拉距离定义
            var x=0, y=0, z=0;

            //手指触碰
            _slideWrap.on("touchstart", function (event) {
                var touchpos = event.touches[0];
                if($(window).scrollTop() <= 0){
                    _start_y = touchpos.clientY;
                }
            });

            //滑动触发
            _slideWrap.on("touchmove",function (event) {
                var touchpos = event.touches[0];
                if($(window).scrollTop() <= 0){
                    y = (touchpos.clientY - _start_y)/40;
                    y = y > 0 ? y:0;
                    y = y < _slideLen ? y:_slideLen;
                    //console.log(y);
                    $(this).css({"-webkit-transform":"translate3d("+x+"rem,"+y+"rem,"+z+"rem)"});
                }
            });

            //手指松开
            _slideWrap.on("touchend",function(event) {
                var touchpos = event.changedTouches[0];
                var curWrap = $(this);
                if($(window).scrollTop() <= 0){
                    if(y >= _slideLen){
                        update(function () {
                            curWrap.animate({"-webkit-transform":"translate3d(0,0,0)"})
                        })
                    }else{
                        curWrap.animate({"-webkit-transform":"translate3d(0,0,0)"})
                    }
                }
            });

            //模拟数据刷新刷新数据
            function update(callback){
                _loading.show();
                $.ajax({
                    type:"GET",
                    url:"xxx.do",
                    dataType:"json",
                    success: function(data) {
                        //todo 加载的数据，setTimeout是为了模拟加载延迟

                        setTimeout(function () {
                            _loading.hide();
                            callback();
                        },1000);
                    },
                    error: function (xhr,type) {
                        //todo 报错后的处理，setTimeout是为了模拟加载延迟

                        setTimeout(function () {
                            _loading.hide();
                            callback();
                        },1000);
                    }
                });
            }
        },

        //流程表单下拉打开
        flowDrop: function () {
            var _btn = $(".drop-btn");
            var _list = $(".drop-list");
            _btn.click(function () {
                _list.toggle();
                $(this).toggleClass("on");
                $(this).parent().next(".b-line").toggle();
            })
        },

        //倒计时弹窗
        myAlert: function (type,str,callback) {
            var popBg = $(".pop-bg");
            var gray = popBg.find(".gray");
            var curDom;
            var isBgShow = false;//用于判断背景层是否已经打开
            var grayZ_org  = 0;//grat原始Z值
            switch(type){
                case "ok":
                    curDom = $(".pop-show");
                    break;
                case "error":
                    curDom = $(".pop-error");
                    break;
                default:
                    //curDom = $(".pop-show > div");
                    break;
            }
            show();
            pos();
            setTimeout(function(){
                close();
            },2000);
            $(window).resize(function(){
                pos();
            });
            function pos(){
                curDom.css({top:($(window).height()-curDom.height())/2,left:(($(window).width()-curDom.width())/2)});
            }

            //显示函数
            function show(){
                grayZ_org = gray.css("z-index") * 1;//传入原始Z值
                if(popBg.css("display") != "none"){
                    isBgShow = true;
                }else{
                    popBg.show();
                }
                gray.css("z-index",curDom.css("z-index") - 1);
                curDom.show().children("div").text(str);
            }

            function close(){
                if(!isBgShow){
                    popBg.hide();
                }
                gray.css("z-index",grayZ_org);
                curDom.hide();
                if(callback){
                    callback();
                }
            }
        },

        //上拉加载动画,须在页面调用
        slideUploading: function (ajaxState) {
            var _isLoad = true;
            var _loadWrap = $(".slideDown .load");
            $(window).on("scroll", function () {
                var top = $(window).scrollTop();
                var winH = $(window).height();
                var docH = $(document).height();
                if(top+winH > docH - _loadWrap.height() && _isLoad) {
                    console.log("开始加载");
                    _isLoad = false;
                    //开始异步加载
                    $.ajax(ajaxState).done(function (data) {
                        //todo
                        var lis = $("xxx");//这个是li的jq对象,当然这是假的。
                        lis.insertBefore(".slideDown li:last");//插入到最后一个li前面
                        _isLoad = true;
                    }).fail(function () {
                        //todo
                        _loadWrap.find(".fail").show().prev().hide();
                        _isLoad = true;
                    })
                }
            })
        },

        /**
         * 文本框根据输入内容自适应高度
         * @param                {HTMLElement}        输入框元素
         * @param                {Number}                设置光标与输入框保持的距离(默认0)
         * @param                {Number}                设置最大高度(可选)
         */
        autoTextHeight: function () {
            var Textareas = $(".apply-inf-wrap textarea,.textarea-gs");
            if(Textareas.length != 0){
                var that = this;
                Textareas.each(function (index) {
                    that.autoTextarea(Textareas.get(index));
                });
            }
        },
        autoTextarea:function (elem, extra, maxHeight) {
            extra = extra || 0;
            var isFirefox = !!document.getBoxObjectFor || 'mozInnerScreenX' in window,
                isOpera = !!window.opera && !!window.opera.toString().indexOf('Opera'),
                addEvent = function (type, callback) {
                    elem.addEventListener ?
                        elem.addEventListener(type, callback, false) :
                        elem.attachEvent('on' + type, callback);
                },
                getStyle = elem.currentStyle ? function (name) {
                    var val = elem.currentStyle[name];

                    if (name === 'height' && val.search(/px/i) !== 1) {
                        var rect = elem.getBoundingClientRect();
                        return rect.bottom - rect.top -
                            parseFloat(getStyle('paddingTop')) -
                            parseFloat(getStyle('paddingBottom')) + 'px';
                    }

                    return val;
                } : function (name) {
                    return getComputedStyle(elem, null)[name];
                },
                minHeight = parseFloat(getStyle('height'));

            elem.style.resize = 'none';

            var change = function () {
                var scrollTop, height,
                    padding = 0,
                    style = elem.style;

                if (elem._length === elem.value.length) return;
                elem._length = elem.value.length;

                if (!isFirefox && !isOpera) {
                    padding = parseInt(getStyle('paddingTop')) + parseInt(getStyle('paddingBottom'));
                }
                scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

                elem.style.height = minHeight + 'px';
                if (elem.scrollHeight > minHeight) {
                    if (maxHeight && elem.scrollHeight > maxHeight) {
                        height = maxHeight - padding;
                        style.overflowY = 'auto';
                    } else {
                        height = elem.scrollHeight - padding;
                        style.overflowY = 'hidden';
                    }
                    style.height = height + extra + 'px';
                    scrollTop += parseInt(style.height) - elem.currHeight;
                    document.body.scrollTop = scrollTop;
                    document.documentElement.scrollTop = scrollTop;
                    elem.currHeight = parseInt(style.height);
                }
            };

            addEvent('propertychange', change);
            addEvent('input', change);
            addEvent('focus', change);
            change();
        }
    };
    w.ygpt = ygpt;

    $(function(){
        ygpt.init();
        $(".has-tab-wrap").tab({
            handler: ".tab-handle a",
            content: ".tab-container"
        });

        //ok倒计时弹窗
        $(".pop-btn-0").on("click",function(){
            ygpt.myAlert("ok","这是OK的弹窗，3秒后就关闭了", function () {
                //todo
                alert("倒计时结束");
            });
            return false;
        });
        //error倒计时弹窗
        $(".pop-btn-1").on("click",function(){
            ygpt.myAlert("error","这是error的弹窗，3秒后就关闭了。", function () {
                //todo
                alert("倒计时结束");
            });
            return false;
        });

        $(".pop-btn-2").on("click",function(){
            ygpt.dialog({
                popObj      : ".pop-ok"
            });
            return false;
        });

        $(".pop-btn-3").on("click",function(){
            ygpt.dialog({
                popObj      : ".pop-other"
            });
            return false;
        });

        $(".pop-btn-4").on("click", function () {
            ygpt.dialog({
                popObj:".pop-4"
            });
            return false;
        });
        $(".pop-btn-5").on("click", function () {
            ygpt.dialog({
                popObj:".pop-5"
            });
            return false;
        })
    })

})(window,Zepto);




