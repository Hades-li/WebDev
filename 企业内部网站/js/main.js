
;var ECode = ECode||{};
ECode.artForm = function(){
    var _this;
    if(arguments.length==0){ //没有传递参数则默认为对body下所有四类表单元素进行美化
        _this = $("body").find("select, :radio, :checkbox, :file");
    }else if(arguments.length>=1 ){
        if( !(arguments[0] instanceof jQuery)){ //如果存在参数，第一个参数必须传递一个jQuery对象
            return $.error("ECode.artForm: 传递的参数必须为jQuery选择器匹配的对象");
        }else{
            _this = arguments[0];
        }
    }
    var _eachHandle = 'artForm';
    var _optionsDisplayNum = 5;
    _this.each(function(){
        var _each = $(this);
        //hide element
        if(!_each.parent().hasClass(_eachHandle+'Hide') && !_each.parent().hasClass(_eachHandle)){
            _each.wrap('<span class="'+_eachHandle+'Hide"></span>');
            _each.parent().css({
                position:"absolute",
                left:"-9999em",
                top:"-9999em"
            });
            if(_each.is("select")){
                _render_select(_each);
            }else if(_each.is(":radio")){
                _render_radio(_each);
            }else if(_each.is(":checkbox")){
                _render_checkbox(_each);
            }else if(_each.is(":file")){
                _file(_each);
            }
        }
    });

    //init
    function _init(obj){
        //append container dom
//        console.log("obj的类"+obj.attr("class"));
        if(obj.hasClass("form-sel2")){
            $(obj).parent().after($('<span class="'+_eachHandle+' theme2"></span>').css({display:"inline-block"}));
        }else{
            $(obj).parent().after($('<span class="'+_eachHandle+'"></span>').css({display:"inline-block"}));
        }
    }

    //select
    function _render_select(obj){
        _init(obj);
        var _this = obj.parent().next();
        if(obj.hasClass("form-sel2")){
            _this.append('<div class="artForm_select theme2"><div class="artForm_currentselect theme2" onselectstart="return false"><span></span><a href="javascript:;" class="artForm_plus theme2"></a></div><div class="artForm_options theme2" style="display:none;"></div></div>');
        }else{
            _this.append('<div class="artForm_select"><div class="artForm_currentselect" onselectstart="return false"><span></span><a href="javascript:;" class="artForm_plus"></a></div><div class="artForm_options" style="display:none;"></div></div>');
        }
        var _select = _this.find('.'+_eachHandle+'_select'),
            _options = _this.find('.'+_eachHandle+'_options'),
            _current = _select.find('.'+_eachHandle+'_currentselect'),
            _currentIndex = 0,
            _sFlag = 0,
            _className = obj.attr("class"),
            _style = obj.attr("style"),
            _name = obj.attr("name");
        _select.attr("domname",_name);
        if(_className){
            _select.addClass(_className);
        }
        if(_style){
            _select.attr("style",_style);
        }
        var _w = obj.outerWidth()+2;
        obj.parent().next().css({width:_w+"px"});
        _current.css({width:_w+"px"});
        var _pw = _current.find(".artForm_plus").outerWidth();
        _current.find("span").css({width:_w-_pw+"px"});
        _options.css({width:_w+"px"});/*修改，去掉-2;*/

        //open close event
        _current.bind("click", function(){
            if(_options.is(":hidden")){
                _select.css({zIndex:900}).addClass("open");
                _options.slideDown(200, function(){
                    var _sel = _options.find(".selected");
                    var _mt = (_sel.size()>0)?_sel.position().top:0,
                        _scrollTop = _options.scrollTop(),
                        _min = Math.max(_mt,_scrollTop);
                    if(_min!=_sFlag){
                        _sFlag = _min;
                        _options.animate({scrollTop:_sFlag+"px"},400);
                    }
                });
                var _other = $('.'+_eachHandle).not(_this);
                _other.find('.'+_eachHandle+'_select').css({zIndex:10}).removeClass("open");
                _other.find('.'+_eachHandle+'_options').hide();
                return false;
            }else{
                _select.css({zIndex:100});
                _sFlag = 0;
                _options.hide();
                _select.removeClass("open");
            }
        });
        $(document).bind("click", function(){
            var _other = $('.'+_eachHandle);
            _other.find('.'+_eachHandle+'_select').css({zIndex:10});
            _options.scrollTop(0).hide();
            _sFlag = 0;
            _select.removeClass("open");
        });

        //change event
        function onchange(index){
            var cc = $(obj).find('option').eq(index),
                val = cc.val(),
                optionList = _options.find('li');
            //cc.attr("selected", true);
            cc.attr("selected", "selected");
            //The following is used to trigger onchange event
            if(document.dispatchEvent){
                var evt = document.createEvent('HTMLEvents');
                evt.initEvent('change',true,true);
                obj[0].dispatchEvent(evt);
            }else{
                obj[0].fireEvent("onchange");
            }
            _select.attr('domvalue',val);
            _current.find("span").text(cc.text());
            optionList.removeClass("selected");
            optionList.eq(index).addClass("selected");
        }

        //append dom
        var i = 0;
        obj.children().each(function(){
            var _option = $(this);
            if(_option.is("option")){
                var	_value = _option.val(),
                    _text = _option.text(),
                    _class = _option.attr("class"),
                    _isSelected = _option.is(':selected');
                _options.append($('<p index="'+i+'"><span>'+_text+'</span></p>').attr('domvalue',_value).addClass(_class));
                if(_isSelected){_currentIndex=i}
                i++;
            }else if(_option.is("optgroup")){
                var _lab = _option.attr("label"),
                    _olist = _option.find("option");
                _options.append('<dl></dl>');
                var _dl = _options.find("dl:last");
                if(_lab){_dl.append('<dt>'+_lab+'</dt>');}
                _dl.append('<dd></dd>');
                _olist.each(function(){
                    var	_co = $(this),
                        _value = _co.val(),
                        _text = _co.text(),
                        _class = _co.attr("class"),
                        _isSelected = _co.is(':selected');
                    _options.find("dd:last").append($('<p index="'+i+'"><span>'+_text+'</span></p>').attr('domvalue',_value).addClass(_class));
                    if(_isSelected){_currentIndex=i}
                    i++;
                });
            }
        });

        //add css
        var _list = _options.find("p");
        var _size = _list.size();
        if(_size>_optionsDisplayNum){
            var _height = _options.height(),
                _boxHeight = Math.floor(_height/_size*_optionsDisplayNum);
            _options.css({height:_boxHeight+"px"});
        }
        _list.bind("mouseover", function(){
            $(this).addClass("hover");
        }).bind("mouseout", function(){
            $(this).removeClass("hover");
        });
        _current.bind("mouseover", function(){
            $(this).addClass("hover");
        }).bind("mouseout", function(){
            $(this).removeClass("hover");
        });

        //run
        onchange(_currentIndex);
        _options.find("p").bind("click", function(){
            onchange($(this).attr("index"));
        });

        //focus
        obj.bind("focus", function(){
            obj.parent().next(".artForm").remove();
            _render_select(obj);
        });
    }

    //radio
    function _render_radio(obj){
        _init(obj);
        var _name = obj.attr("name"),
            _value = obj.val(),
            _this = obj.parent().next();
        _this.append('<span domname="'+_name+'" domvalue="'+_value+'" href="javascript:;" class="'+_eachHandle+'_radio"></span>');
        var _radioDom = _this.find('.'+_eachHandle+'_radio'),
            _className = obj.attr("class"),
            _style = obj.attr("style");
        if(_className){
            _radioDom.addClass(_className);
        }
        if(_style){
            _radioDom.attr("style",_style);
        }
        if(obj.is(":checked")){
            _radioDom.addClass(_eachHandle+"_radio_checked");
        }
        _radioDom.bind("mouseover", function(){
            $(this).addClass(_eachHandle+"_radio_hover");
        }).bind("mouseout", function(){
            $(this).removeClass(_eachHandle+"_radio_hover");
        });

        //click event
        function objChange(){
            $("."+_eachHandle+"_radio[domname='"+_name+"']").removeClass(_eachHandle+"_radio_checked");
            obj.parent().next().find(".artForm_radio").addClass(_eachHandle+"_radio_checked");
            $(":radio[name='"+_name+"']").attr("checked", false);
            obj.attr("checked", true);
        }

        //DOM点击事件
        _radioDom.bind("click", function(){
            objChange();
            if(document.dispatchEvent){
                var evt = document.createEvent('HTMLEvents');
                evt.initEvent('click',true,true);
                obj[0].dispatchEvent(evt);
            }else{
                obj[0].fireEvent("onclick");
            }
        });

        //label点击事件
        obj.bind("change", function(){
            objChange();
        }).bind("focus", function(){
            obj.parent().next(".artForm").remove();
            _render_radio(obj);
        });
    }

    //checkbox
    function _render_checkbox(obj){
        _init(obj);
        var _name = obj.attr("name"),
            _value = obj.val(),
            _this = obj.parent().next();
        _handle = true;
        _this.append('<span domname="'+_name+'" domvalue="'+_value+'" href="javascript:;" class="'+_eachHandle+'_checkbox"></span>');
        var _checkboxDom = _this.find('.'+_eachHandle+'_checkbox');
        if(obj.is(":checked")){
            _checkboxDom.addClass(_eachHandle+"_checkbox_checked");
        }
        var _className = obj.attr("class");
        var _style = obj.attr("style");
        if(_className){
            _checkboxDom.addClass(_className);
        }
        if(_style){
            _checkboxDom.attr("style",_style);
        }
        _checkboxDom.bind("mouseover", function(){
            $(this).addClass(_eachHandle+"_checkbox_hover");
        }).bind("mouseout", function(){
            $(this).removeClass(_eachHandle+"_checkbox_hover");
        });

        //change event
        function onChange(){
            if(obj.is(":checked")){
                _checkboxDom.addClass(_eachHandle+"_checkbox_checked");
            }else{
                _checkboxDom.removeClass(_eachHandle+"_checkbox_checked");
            }
        }

        //DOM点击事件
        _checkboxDom.bind("click", function(){
            if(obj.is(":checked")){
                obj.attr("checked", false);
            }else{
                obj.attr("checked", true);
            }
            onChange();
            if(document.dispatchEvent){
                var evt = document.createEvent('HTMLEvents');
                evt.initEvent('click',true,true);
                obj[0].dispatchEvent(evt);
            }else{
                obj[0].fireEvent("onclick");
            }
        });

        //label点击事件
        obj.bind("change", function(){
            onChange();
        }).bind("focus", function(){
            obj.parent().next(".artForm").remove();
            _render_checkbox(obj);
        });
    }

    //file
    function _file(obj){
        var _class = obj.attr("class");
        obj.unwrap('span').wrap('<span class="'+_eachHandle+' '+_eachHandle+'_file"></span>').removeClass().css({
            position:"absolute",
            right:0,
            top:"50%",
            fontSize:120,
            height:"auto",
            opacity:0,
            border:0,
            cursor:"pointer",
            marginTop:-78
        });
        var _this = obj.parent();
        _this.addClass(_class).css({overflow:"hidden",cursor:"pointer"});
        if(_this.css("position")!='relative' && _this.css("position")!='absolute'){
            _this.css({position:"relative"});
        }
        _this.bind("mouseover", function(){
            _this.addClass(_eachHandle+"_checkbox_hover");
        }).bind("mouseout", function(){
            _this.removeClass(_eachHandle+"_checkbox_hover");
        });
    }
};
/*ECode.artForm = function(){
    var _this;
    if(arguments.length==0){ //没有传递参数则默认为对body下所有四类表单元素进行美化
        _this = $("body").find("select, :radio, :checkbox, :file");
    }else if(arguments.length>=1 ){
        if( !(arguments[0] instanceof jQuery)){ //如果存在参数，第一个参数必须传递一个jQuery对象
            return $.error("ECode.artForm: 传递的参数必须为jQuery选择器匹配的对象");
        }else{
            _this = arguments[0];
        }
    }
    var _eachHandle = 'artForm';
    var _optionsDisplayNum = 5;
    _this.each(function(){
        var _each = $(this);
        //hide element
        if(!_each.parent().hasClass(_eachHandle+'Hide') && !_each.parent().hasClass(_eachHandle)){
            _each.wrap('<span class="'+_eachHandle+'Hide"></span>');
            _each.parent().css({
                position:"absolute",
                left:"-9999em",
                top:"-9999em"
            });
            if(_each.is("select")){
                _render_select(_each);
            }else if(_each.is(":radio")){
                _render_radio(_each);
            }else if(_each.is(":checkbox")){
                _render_checkbox(_each);
            }else if(_each.is(":file")){
                _file(_each);
            }
        }
    });

    //init
    function _init(obj){
        //append container dom
//        console.log("obj的类"+obj.attr("class"));
        if(obj.hasClass("form-sel2")){
            $(obj).parent().after($('<span class="'+_eachHandle+' theme2"></span>').css({display:"inline-block"}));
        }else{
            $(obj).parent().after($('<span class="'+_eachHandle+'"></span>').css({display:"inline-block"}));
        }
    }

    //select
    function _render_select(obj){
        _init(obj);
        var _this = obj.parent().next();
        if(obj.hasClass("form-sel2")){
            _this.append('<div class="artForm_select theme2"><div class="artForm_currentselect theme2" onselectstart="return false"><span></span><a href="javascript:;" class="artForm_plus theme2"></a></div><div class="artForm_options theme2" style="display:none;"></div></div>');
        }else{
            _this.append('<div class="artForm_select"><div class="artForm_currentselect" onselectstart="return false"><span></span><a href="javascript:;" class="artForm_plus"></a></div><div class="artForm_options" style="display:none;"></div></div>');
        }
        var _select = _this.find('.'+_eachHandle+'_select'),
            _options = _this.find('.'+_eachHandle+'_options'),
            _current = _select.find('.'+_eachHandle+'_currentselect'),
            _currentIndex = 0,
            _sFlag = 0,
            _className = obj.attr("class"),
            _style = obj.attr("style"),
            _name = obj.attr("name");
        _select.attr("domname",_name);
        if(_className){
            _select.addClass(_className);
        }
        if(_style){
            _select.attr("style",_style);
        }
        var _w = obj.outerWidth()+2;
        obj.parent().next().css({width:_w+"px"});
        _current.css({width:_w+"px"});
        var _pw = _current.find(".artForm_plus").outerWidth();
        _current.find("span").css({width:_w-_pw+"px"});
        _options.css({width:_w+"px"});*//*修改，去掉-2;*//*

        //open close event
        $(document).on("click","."+_eachHandle+"_currentselect",function(){
            if($('.'+_eachHandle+'_options').is(":hidden")){
                _select.css({zIndex:900}).addClass("open");
                $('.'+_eachHandle+'_options').slideDown(200, function(){
                    var _sel = _options.find(".selected");
                    var _mt = (_sel.size()>0)?_sel.position().top:0,
                        _scrollTop = _options.scrollTop(),
                        _min = Math.max(_mt,_scrollTop);
                    if(_min!=_sFlag){
                        _sFlag = _min;
                        $('.'+_eachHandle+'_options').animate({scrollTop:_sFlag+"px"},400);
                    }
                });
                var _other = $('.'+_eachHandle).not(_this);
                _other.find('.'+_eachHandle+'_select').css({zIndex:10}).removeClass("open");
                _other.find('.'+_eachHandle+'_options').hide();
                return false;
            }else{
                _select.css({zIndex:100});
                _sFlag = 0;
                $('.'+_eachHandle+'_options').hide();
                _select.removeClass("open");
            }
        });
        $(document).bind("click", function(){
            var _other = $('.'+_eachHandle);
            _other.find('.'+_eachHandle+'_select').css({zIndex:10});
            _options.scrollTop(0).hide();
            _sFlag = 0;
            _select.removeClass("open");
        });

        //change event
        function onchange(index){
            var cc = $(obj).find('option').eq(index),
                val = cc.val(),
                optionList = _options.find('li');
            //cc.attr("selected", true);
            cc.attr("selected", "selected");
            //The following is used to trigger onchange event
            if(document.dispatchEvent){
                var evt = document.createEvent('HTMLEvents');
                evt.initEvent('change',true,true);
                obj[0].dispatchEvent(evt);
            }else{
                obj[0].fireEvent("onchange");
            }
            _select.attr('domvalue',val);
            _current.find("span").text(cc.text());
            optionList.removeClass("selected");
            optionList.eq(index).addClass("selected");
        }

        //append dom
        var i = 0;
        obj.children().each(function(){
            var _option = $(this);
            if(_option.is("option")){
                var	_value = _option.val(),
                    _text = _option.text(),
                    _class = _option.attr("class"),
                    _isSelected = _option.is(':selected');
                _options.append($('<p index="'+i+'"><span>'+_text+'</span></p>').attr('domvalue',_value).addClass(_class));
                if(_isSelected){_currentIndex=i}
                i++;
            }else if(_option.is("optgroup")){
                var _lab = _option.attr("label"),
                    _olist = _option.find("option");
                _options.append('<dl></dl>');
                var _dl = _options.find("dl:last");
                if(_lab){_dl.append('<dt>'+_lab+'</dt>');}
                _dl.append('<dd></dd>');
                _olist.each(function(){
                    var	_co = $(this),
                        _value = _co.val(),
                        _text = _co.text(),
                        _class = _co.attr("class"),
                        _isSelected = _co.is(':selected');
                    _options.find("dd:last").append($('<p index="'+i+'"><span>'+_text+'</span></p>').attr('domvalue',_value).addClass(_class));
                    if(_isSelected){_currentIndex=i}
                    i++;
                });
            }
        });

        //add css
        var _list = _options.find("p");
        var _size = _list.size();
        if(_size>_optionsDisplayNum){
            var _height = _options.height(),
                _boxHeight = Math.floor(_height/_size*_optionsDisplayNum);
            _options.css({height:_boxHeight+"px"});
        }
        _list.bind("mouseover", function(){
            $(this).addClass("hover");
        }).bind("mouseout", function(){
            $(this).removeClass("hover");
        });
        _current.bind("mouseover", function(){
            $(this).addClass("hover");
        }).bind("mouseout", function(){
            $(this).removeClass("hover");
        });

        //run
        onchange(_currentIndex);
        _options.find("p").bind("click", function(){
            onchange($(this).attr("index"));
        });

        //focus
        obj.bind("focus", function(){
            obj.parent().next(".artForm").remove();
            _render_select(obj);
        });
    }

    //radio
    function _render_radio(obj){
        _init(obj);
        var _name = obj.attr("name"),
            _value = obj.val(),
            _this = obj.parent().next();
        _this.append('<span domname="'+_name+'" domvalue="'+_value+'" href="javascript:;" class="'+_eachHandle+'_radio"></span>');
        var _radioDom = _this.find('.'+_eachHandle+'_radio'),
            _className = obj.attr("class"),
            _style = obj.attr("style");
        if(_className){
            _radioDom.addClass(_className);
        }
        if(_style){
            _radioDom.attr("style",_style);
        }
        if(obj.is(":checked")){
            _radioDom.addClass(_eachHandle+"_radio_checked");
        }
        _radioDom.bind("mouseover", function(){
            $(this).addClass(_eachHandle+"_radio_hover");
        }).bind("mouseout", function(){
            $(this).removeClass(_eachHandle+"_radio_hover");
        });

        //click event
        function objChange(){
            $("."+_eachHandle+"_radio[domname='"+_name+"']").removeClass(_eachHandle+"_radio_checked");
            obj.parent().next().find(".artForm_radio").addClass(_eachHandle+"_radio_checked");
            $(":radio[name='"+_name+"']").attr("checked", false);
            obj.attr("checked", true);
        }

        //DOM点击事件
        _radioDom.bind("click", function(){
            objChange();
            if(document.dispatchEvent){
                var evt = document.createEvent('HTMLEvents');
                evt.initEvent('click',true,true);
                obj[0].dispatchEvent(evt);
            }else{
                obj[0].fireEvent("onclick");
            }
        });

        //label点击事件
        obj.bind("change", function(){
            objChange();
        }).bind("focus", function(){
            obj.parent().next(".artForm").remove();
            _render_radio(obj);
        });
    }

    //checkbox
    function _render_checkbox(obj){
        _init(obj);
        var _name = obj.attr("name"),
            _value = obj.val(),
            _this = obj.parent().next();
        _handle = true;
        _this.append('<span domname="'+_name+'" domvalue="'+_value+'" href="javascript:;" class="'+_eachHandle+'_checkbox"></span>');
        var _checkboxDom = _this.find('.'+_eachHandle+'_checkbox');
        if(obj.is(":checked")){
            _checkboxDom.addClass(_eachHandle+"_checkbox_checked");
        }
        var _className = obj.attr("class");
        var _style = obj.attr("style");
        if(_className){
            _checkboxDom.addClass(_className);
        }
        if(_style){
            _checkboxDom.attr("style",_style);
        }
        _checkboxDom.bind("mouseover", function(){
            $(this).addClass(_eachHandle+"_checkbox_hover");
        }).bind("mouseout", function(){
            $(this).removeClass(_eachHandle+"_checkbox_hover");
        });

        //change event
        function onChange(){
            if(obj.is(":checked")){
                _checkboxDom.addClass(_eachHandle+"_checkbox_checked");
            }else{
                _checkboxDom.removeClass(_eachHandle+"_checkbox_checked");
            }
        }

        //DOM点击事件
        _checkboxDom.bind("click", function(){
            if(obj.is(":checked")){
                obj.attr("checked", false);
            }else{
                obj.attr("checked", true);
            }
            onChange();
            if(document.dispatchEvent){
                var evt = document.createEvent('HTMLEvents');
                evt.initEvent('click',true,true);
                obj[0].dispatchEvent(evt);
            }else{
                obj[0].fireEvent("onclick");
            }
        });

        //label点击事件
        obj.bind("change", function(){
            onChange();
        }).bind("focus", function(){
            obj.parent().next(".artForm").remove();
            _render_checkbox(obj);
        });
    }

    //file
    function _file(obj){
        var _class = obj.attr("class");
        obj.unwrap('span').wrap('<span class="'+_eachHandle+' '+_eachHandle+'_file"></span>').removeClass().css({
            position:"absolute",
            right:0,
            top:"50%",
            fontSize:120,
            height:"auto",
            opacity:0,
            border:0,
            cursor:"pointer",
            marginTop:-78
        });
        var _this = obj.parent();
        _this.addClass(_class).css({overflow:"hidden",cursor:"pointer"});
        if(_this.css("position")!='relative' && _this.css("position")!='absolute'){
            _this.css({position:"relative"});
        }
        _this.bind("mouseover", function(){
            _this.addClass(_eachHandle+"_checkbox_hover");
        }).bind("mouseout", function(){
            _this.removeClass(_eachHandle+"_checkbox_hover");
        });
    }
};*/

var tokyoRegional = tokyoRegional||{};
//图片轮播
tokyoRegional.imgSlide = function() {
    var index = 0;
    var obj = $(".bannerArea");
    var timer;
    var len = obj.find("ul li").length;
    var _btn = $(".picbtn-bottom").find("ol li");
    changeImg(0);
    showlrBtn(obj);
    _btn.mouseover(function() {
        index = $(this).index();
        setTimeout(function() {
            changeImg(index)
        }, 100);
    });

    obj.hover(
        function() {
            clearInterval(timer)
        },
        function() {
            timer = setInterval(function() {
                changeImg(index);
                index++;
                if (index == len) {
                    index = 0
                }
            },3000);
        }).trigger("mouseleave");

    obj.find(".r-btn").click(function(){
        index++;
        index %= len;
        changeImg(index);
    });

    obj.find(".l-btn").click(function(){
        index--;
        if(index < 0){
            index = len;
        }
        changeImg(index);
    });

    function changeImg(index) {
        obj.find("ul li").eq(index).css({"position":"absolute","left":"0px","top":"0px","z-index":"1","display":"block"}).siblings().css({"z-index":0});
        obj.find("ul li").eq(index).stop().animate({"opacity":1}, 1000).siblings().stop().animate({"opacity":0}, 1000);
        _btn.eq(index).addClass("on").siblings().removeClass("on");
    }
    function showlrBtn(obj){
        obj.mouseover(function(){
            $(this).find(".l-btn,.r-btn").animate({opacity:'1'},500);
        });

        obj.mouseleave(function(){
            $(this).find(".l-btn,.r-btn").animate({opacity:'0'},500);
        })
    }
}
//回到底部
tokyoRegional.goTop = function() {
    var _goTop = $('.goTop');
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
        isIE6 ? _goTop.css({position: "absolute", top: stp + oft, left:$(window).width()-153}) : _goTop.css({left:$(window).width()-153});
    }

    $(window).scroll(function () {
        domscroll();
        var topHide = $(document).scrollTop(); //页面上部被卷去高度
        if (topHide > 100) {
            _goTop.show();
        } else {
            _goTop.hide();
        }
    });
};
//输入栏文字点击消失/重现
tokyoRegional.inputToggle = function(obj){
    var str;
//    获得焦点
    $(obj).focus(function(){
        if($(this).attr("value") == "账户"){
            str = $(this).attr("value");
            $(this).attr("value","");
        }
    });
//    失去焦点
    $(obj).blur(function(){
        if($(this).attr("value") == ""){
            $(this).attr("value",str);
        }
    })
};
//密码输入框切换
tokyoRegional.passwordToggle = function(obj1,obj2){
    //    获得焦点
    $(obj1).focus(function(){
       $(this).siblings("input").removeClass("hide").focus();
       $(this).addClass("hide");
    });
//    失去焦点
    $(obj2).blur(function(){
        if($(this).val() == ""){
            $(this).siblings("input").removeClass("hide");
            $(this).addClass("hide");
        }
    })
};
//textarea文字去除
tokyoRegional.textareaToggle = function(obj){
    //    获得焦点
    $(obj).focus(function(){
        if($(this).text() == "请输入评论内容"){
            $(this).text("").css("color","#333");
        }
    });
//    失去焦点
    $(obj).blur(function(){
        if($(this).text() == ""){
            $(this).text("请输入评论内容").css("color","#999");
        }
    })
};

//tabs栏切换,tabsTop为tabs栏的DIV，tabslist为切换内容,otherDiv为其他的需要出现或消失的DIV
tokyoRegional.tabsToggle = function(tabsTop,tabsList,otherDiv){
    var w = 988;
    $(tabsTop).find("ul li a").click(function(){
        var index = $(this).parent("li").index();
        $(this).parent("li").siblings().children("a").removeClass("active");
        $(this).addClass("active");
        $(tabsList).find("ul").stop().animate({"margin-left":-w*index},500);
        var h = $(tabsList).find("ul").find("li").eq(index).innerHeight();
        $(tabsList).animate({height:h},500);
        if(index == 2){
            $(otherDiv).stop().fadeIn(500);
        }else{
            $(otherDiv).stop().fadeOut(500);
        }
    })
};
//点击显示回复框
tokyoRegional.toogleReply = function(btn){
    $(btn).click(function(){
        $(this).parent().parent().next(".replyInputWrap").slideToggle(500,function(){
            var h = $(this).parents("li").innerHeight();
            $(".tabsContent").animate({height:h},500);
        });
    })
};
//当鼠标点击小手指
tokyoRegional.showBubble_s = function(btn,bubble) {
    $(btn).click(function () {
        $(this).parent().siblings(bubble).fadeIn(1000, function(){
            $(this).fadeOut(1000);
        });
    });
};
//当鼠标点击投票按钮时，显示投票气泡,针对后台给出的数据
tokyoRegional.showVoteBubble = function(btn,b1,b2){
    $(btn).click(function(){
        //ajax获取投票状态 true标识已经投过票，false未投票
        var isVoted = true;
        if(isVoted){
            $(this).siblings(b2).fadeIn(1000, function () {
                $(this).fadeOut(1000);
            })
        }else{
            $(this).siblings(b1).fadeIn(1000, function () {
                $(this).fadeOut(1000);
            })
        }
    })
};

//关闭弹窗
tokyoRegional.closePop = function(btn,pop){
    $(btn).click(function(){
        $(".cover").addClass("hide");
        $(pop).fadeOut(500);
    });
};
//打开弹窗
tokyoRegional.openPop = function(btn,pop){
    var l = $(window).width()/2-$(pop).width()/2;
    var t = $(window).height()/2-$(pop).height()/2;
    $(btn).click(function(){
        $(".cover").removeClass("hide");
        $(pop).css({left:l,top:t});
        $(pop).fadeIn(500);

    });
};
//上传文件控件
tokyoRegional.file= function(file,text){
    $(file).change(function(){
        var path = $(this).val();
        var pos1 = path.lastIndexOf('/');
        var pos2 = path.lastIndexOf('\\');
        var pos = Math.max(pos1, pos2);
        filename = pos < 0 ? path : path.substring(pos + 1);
        $(text).val(filename);
    });
};
//输入框焦点变色
tokyoRegional.inputChangeBorderColor = function(input){
    $(input).focus(function (){
        $(this).css("border-color","#a6c725");
    });
    $(input).blur(function(){
        $(this).css("border-color","#e6e6e6");
    });
};
//登陆界面输入框变色
tokyoRegional.loginInputColor = function(input){
    $(input).focus(function (){
        $(this).parent("div").css("border-color","#f97b00");
    });
    $(input).blur(function(){
        $(this).parent("div").css("border-color","#ccc");
    });
};

//年份列表点击特效
tokyoRegional.yearsListClick = function(yearsList){
    $(yearsList).find("li").children("a").click(function(){
        $(yearsList).find("li").children("a").removeClass("active");
        $(this).addClass("active");

    })
};

//抽屉开关
tokyoRegional.openCloseDrawer = function (handle,drawerWrap) {
    $(handle).click(function () {
        if($(this).hasClass("open")){
            $(drawerWrap).stop(true,true).slideUp(500, function () {
                $(handle).removeClass("open");
            });
        }else{
            $(drawerWrap).stop(true,true).slideDown(500, function () {
                $(handle).addClass("open");
            });
        }
    })
};

//首页菜单抽屉效果
tokyoRegional.homeMenu = function(btn){
    $(btn).hover(function(){
        $(this).siblings("ul").show();
        $(this).parents("ul").show();
    });
    $(btn).mouseleave(function () {
//        if($(this).siblings("ul").mouse)
        if($(this).parents("ul").hasClass("submLV2")||$(this).parents("ul").hasClass("submLV3")){
            $(this).parents("ul").hide();
        }
        $(this).siblings("ul").hide();
    });
};

    //报销，申请页面明细打开/收起
tokyoRegional.detailDrawer = function (handle) {
    $(handle).click(function () {
        var thisBox = $(this).parent().next();
        if(thisBox.hasClass("open")){
            thisBox.slideUp(500).removeClass("open");
            $(this).find("i").removeClass("sn-arrow-down").addClass("sn-arrow-right");
        }else{
            thisBox.slideDown(500).addClass("open");
            $(this).find("i").removeClass("sn-arrow-right").addClass("sn-arrow-down");
        }
    })
}

    //报销，申请页面明，明细增加/删除/报销选项改变,
tokyoRegional.detailNewOrDel = function(newBtn,delBtn,tbObj){
    //函数调用
    newOrDel();
    selChg();

    //新增删除函数
    function newOrDel(){
        $(newBtn).click(function () {
            var thisTb = $(this).parent().next().find(tbObj);
            var modelTr = thisTb.find("tr:first");
            var cloneTr = modelTr.clone(true);
            cloneTr.removeClass("hide").find("td select").addClass("form-sel");
            thisTb.append(cloneTr);
            ECode.artForm(cloneTr.find("td .form-sel"));

        })
        $(delBtn).click(function () {
            var thisTb = $(this).parent().next().find(tbObj);
            if(confirm("是否删除")){
                thisTb.find("tr").each(function(){
                    if($(this).find("td input:checkbox").prop("checked")){
                        $(this).remove();
                    }
                })
            }
        })
    };

    //选择替换表中的字段
    function selChg(){
        $(tbObj).find("tr td .selChg").change(function () {
            var index = $(this).get(0).selectedIndex;
            switch(index){
                case 0:
                    $(this).parents("td").next().next().text("交通费金额：");
                    break;
                case 1:
                    $(this).parents("td").next().next().text("天数：");
                    break;
                case 2:
                    $(this).parents("td").next().next().text("金额：");
                    break;
            }
        })


    }
}

//全局加载函数
$(function(){
    tokyoRegional.imgSlide();
    tokyoRegional.goTop();
    tokyoRegional.inputToggle(".inputTg");
    tokyoRegional.inputChangeBorderColor("input,select");
    tokyoRegional.textareaToggle(".textInput textarea");
    tokyoRegional.detailDrawer(".TitleBox");
    tokyoRegional.detailNewOrDel(".newBtn",".delBtn",".applyTb");
    ECode.artForm($(".form-sel"));
    ECode.artForm($(".form-sel2"));
});