/**
 * Created by h.jiali2 on 2015/10/21.
 */
define([
    'jquery',
    'jquery-ui',
    'backbone',
    'modules/mod_table',
    'modules/mod_usualSys',
    'modules/mod_rssh',
    'modules/mod_cyxt',
	'modules/mod_artlist_new',
	'modules/mod_daydayup',
    'modules/mod_echart_new',
    'modules/mod_dbrw'
], function
    (
     $,
     jquery_ui,
     Backbone,
     q_table,
     usualSys,
     rssh,
     cyxt,
     artList,
	 daydayup,
     echart,
     dbrw
    )
{    //用于存放实例化好的组件包围
    var wrapMap = {};
    var mapKey = 0;
    //组件包围初始化
    var domTpl = $(
        "<div class=\'mod-wrap tabWrap\' >"+
        "    <div class=\'mod-head\' >"+
        "        <a href=\'javascript:\' target=\'_blank\' class=\"more\"></a>"+
        "        <div class=\'title-head clearfix\' >"+
        "            <h3>标题</h3>"+
        "        </div>"+
        "        <div class=\'tab-head clearfix\' style=\"display:none\">"+
        "            <a class=\'\' href=\'javascript:\'>"+
        "                <span>tab1</span>"+
        "                <em></em>"+
        "                <b></b>"+
        "            </a>"+
        "            <a class=\'active\' href=\'javascript:\'>"+
        "                <span>tab2</span>"+
        "                <em></em>"+
        "                <b></b>"+
        "            </a>"+
        "        </div>"+
        "    </div>"+
        "    <div class=\"mod-body tab-content\">"+
        "    </div>"+
        "</div>"
    );

    var create = function (typeIds,dataIds,parentDom) {
        if(!typeIds){
            return false;
        }
        //组件对象
        var modWrap = function (typeIds,dataIds,parentDom) {
            var mods = this.selMods(typeIds,dataIds,parentDom);
            this.options = {
                mods:mods,
                parentDom:parentDom
            }
        };
        modWrap.prototype = {
            def:{
                //titles:["初始化标题"],
                //hasTasks:[false,false],
                parentDom:null,
                mods:[],
                $el:domTpl.clone()
            },
            addMod: function (typeId,dataId){
                if(this.def.mods.length == 2){
                    alert("不能增加超过2个组件");
                }else{
                    var mods = this.selMods(typeId,dataId);
                    var dom = this.def.$el;
                    Array.prototype.push.apply(this.def.mods,mods);
                    this.render(1);
                }
            },
            delMod: function(index) {
                var dom = this.def.$el;
                this.def.mods.splice(index,1);
                this.render(dom.find(".tab-head a.active").index());
            },
            //将整个组件干掉
            destroy: function () {
                var dom = this.def.$el;
                this.def.mods.splice(0,this.def.mods.length);
                //判断一下子组件是否为空
                if(this.def.mods.length != 0){
                    alert("子组件没有被清除掉");
                }else{
                    dom.remove();
                }
            },
            setTitle: function(index,str){

            },
            setMore: function (href) {

            },
            getEl: function () {//返回el对象
                return this.def.$el;
            },
            init: function () {
                this.def = $.extend({},this.def,this.options);
                this.bindTabEvent();
                this.bindDelEvent();
                this.render(1);
                var dom = this.def.$el;
                //console.log(this.def.mods[0].getMore());
                var link = this.def.mods[0].getMore();
                if(link){
                    dom.find(".more").show().attr("href",link);//初始化
                }else{
                    dom.find(".more").hide();
                }
            },
            //选择mod并加入
            selMods: function (typeIds,dataIds) {
                var mods = [];
                var mod;
                for(var i = 0; i < typeIds.length;i++){
                    switch(typeIds[i]){

                        case "wddb":        //文章列表
                            mod = artList.create(dataIds[i],this);
                            mods.push(mod);
                            break;
                        case "rwtj":       //任务统计
                            mod = q_table.create(dataIds[i],this);
                            mods.push(mod);
                            break;
                        case "rssh":        //人事生活
                            mod = rssh.create(dataIds[i],this);
                            mods.push(mod);
                            break;
                        case "cyxt":  //常用系统
                            mod = cyxt.create(dataIds[i],this);
                            mods.push(mod);
                            break;
                        case "cycd":       //常用菜单
                            mod = usualSys.create(dataIds[i],this);
                            mods.push(mod);
                            break;
                        case "xxcz":       //学习成长
                            mod = daydayup.create(dataIds[i],this);
                            mods.push(mod);
                            break;
                        case "kmtj"://科目统计
                            mod = echart.create(dataIds[i],this);
                            mods.push(mod);
                            break;
                        case "dbrw"://待办任务
                            mod = dbrw.create(dataIds[i],this);
                            mods.push(mod);
                            break;
                        default :
                            mod = artList.create(dataIds[i],this);
                            mods.push(mod);
                            break;
                    }
                }
                return mods;
            },
            bindTabEvent: function () {
                var dom = this.def.$el;
                var mods = this.def.mods;
                dom.on("click",".tab-head a",function(){
                    var index = $(this).index();
                    $(this).addClass("active").siblings().removeClass("active");
                    dom.find(".tab-content").children().eq(index).show().siblings().hide();
                    $(this).find("em").hide();
                    //more按钮超链接值的改动
                    var link = mods[index].getMore();
                    if(link){
                        dom.find(".more").show().attr("href",link);
                    }else{
                        dom.find(".more").hide();
                    }
                    //mods[index].refresh();
                })
            },
            bindDelEvent: function () {
                var dom = this.def.$el;
                var that = this;
                dom.on("click",".tab-head a b", function (event) {
                    var index = $(this).parent("a").index();
                    that.delMod(index);
                    event.stopPropagation();
                })

            },
            //渲染
            render: function (index) {
                var dom = this.def.$el;
                //渲染标题
                var title_head = dom.find(".title-head");
                var tab_head = dom.find(".tab-head" );
                tab_head.children().detach();//清除tabBtn
                for(var i in this.def.mods){
                    var title = this.def.mods[i].getTitle();
                    var state = "";
                    //是否显示小红点
                    if(typeof this.def.mods[i].getHasTask == "function") {
                        if(this.def.mods[i].getHasTask()){
                            state =  "block";
                        }else{
                            state =  "none";
                        }
                    }else{
                        state = "none";
                    }
                    var tabBtn =  $(
                        "            <a class=\'\' href=\'javascript:\'>"+
                        "                <span>"+title+"</span>"+
                        "                <em style=\'display:"+state+"\'></em>"+
                        "                <b></b>"+
                        "            </a>"
                    ) ;
                    tab_head.append(tabBtn);
                    title_head.find("h3").text(this.def.mods[i].getTitle());
                }
                if(this.def.mods.length > 1){
                    dom.find(".title-head").hide().next(".tab-head").show();
                }else{
                    dom.find(".title-head").show().next(".tab-head").hide();
                }
                //增加body内容
                var mod_body = dom.find(".mod-body");
                mod_body.children().detach();
                this.def.parentDom.append(this.getEl()); //将父组件渲染进容器中

                for(var i in this.def.mods){
                    mod_body.append(this.def.mods[i].getEl());
                    //this.def.mods[i].refresh();
                }
                //设置显示第几个tab内容，如果index没有给参数，默认是1
                if(index != undefined && index < dom.find(".tab-head a").size()){
                    dom.find(".tab-head a").eq(index).click();
                }else{
                    dom.find(".tab-head a").eq(0).click();
                }
            }
        };

        modWrap = new modWrap(typeIds,dataIds,parentDom);
        modWrap.init();
        wrapMap[mapKey] = modWrap;//将组件放在这个map里共外围调用
        modWrap.getEl().attr("wrap_key",mapKey);
        mapKey++;
        return modWrap;
    };
    //通过索引值在map中查找对应的modwrap
    var getModWrap = function (key){
        if(wrapMap[key]){
            return wrapMap[key];
        }else{
            return false;
        }
    };
    //查找当前父组件中显示的子组件。
    var getChildMod = function (key) {
        if(wrapMap[key]){
            var parentDom = wrapMap[key].getEl();
            var index = parentDom.find(".mod-body").children(":visible").index();
            return wrapMap[key].def.mods[index];
        }else{
            return false;
        }
    };

    //摧毁整个组件父容器
    var destroyWrap = function (key) {
        var wrapObj = getModWrap(key);
        if(wrapObj){
            wrapObj.destroy();
            delete wrapMap[key];
            console.log("wrapMap的数量为:"+mapLength(wrapMap));
        }
    };
    //用于li的计数
    var mapLength = function (map) {
        var count=0;
        for(var i in map){
            count++;
        }
        return count;
    };
    return{
        create:create,
        getModWrap:getModWrap,
        getChildMod:getChildMod,
        destroyWrap:destroyWrap
    }
});