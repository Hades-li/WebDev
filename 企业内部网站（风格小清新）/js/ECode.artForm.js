/*
 *  ECode artForm
 *
 *  @author          jijian
 *  @version         1.1 Beta
 *  @lastmodify      2012.11.19
 *
*/

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
		$(obj).parent().after($('<span class="'+_eachHandle+'"></span>').css({display:"inline-block"}));
	}
	
	//select
	function _render_select(obj){
		_init(obj);
		var _this = obj.parent().next();
		_this.append('<div class="artForm_select"><div class="artForm_currentselect" onselectstart="return false"><span></span><a href="javascript:;" class="artForm_plus"></a></div><div class="artForm_options" style="display:none;"></div></div>');
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