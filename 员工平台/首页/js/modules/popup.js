/**
 * Created by ZLY on 2015/10/22.
 */
define([
    'jquery',
    'template-loader',
    'underscore' ,
    'init',
    'jquery-ui',
    'modules/mod_wrap_new'
    ,'gridster'
],function( $, tpl, _, init, jui, mod_wrap_new, Gridster){
    //导入弹出框结构
    /*var tpl1 = tpl['popup1'];
    var tpl2 = tpl['popup2'];
    var tpl3 = tpl['popup3'];
    var tpl4 = tpl['popup4'];
    var items3 = {
        item:[
            {
                type      : "行政管理",
                name      : "发文",
                whetheradd: "",
                context   : "我的排班"
            },
            {
                type      : "行政管理",
                name      : "发文",
                whetheradd: "",
                context   : "我的排班"
            },
            {
                type      : "行政管理",
                name      : "发文",
                whetheradd: "has-add",
                context   : "我的排班"
            },
            {
                type      : "行政管理",
                name      : "发文",
                whetheradd: "has-add",
                context   : "我的排班"
            },
            {
                type      : "行政管理",
                name      : "发文",
                whetheradd: "has-add",
                context   : "我的排班"
            },
            {
                type      : "行政管理",
                name      : "发文",
                whetheradd: "has-add",
                context   : "我的排班"
            },
            {
                type      : "行政管理",
                name      : "发文",
                whetheradd: "has-add",
                context   : "我的排班"
            },
            {
                type      : "行政管理",
                name      : "发文",
                whetheradd: "has-add",
                context   : "我的排班"
            },
            {
                type      : "行政管理",
                name      : "发文",
                whetheradd: "has-add",
                context   : "我的排班"
            },
            {
                type      : "行政管理",
                name      : "发文",
                whetheradd: "has-add",
                context   : "我的排班"
            }
        ]
    };
    var items2 = {
        item:[
            {
                whetheradd:"",
                context: "我的排班",
                img    : "temp/1.png"
            },
            {
                whetheradd:  "has-add",
                context: "我的薪资",
                img    : "temp/2.png"
            },
            {
                whetheradd:  "has-add",
                context: "考勤查询",
                img    : "temp/3.png"
            },
            {
                whetheradd:"",
                context: "我的福利",
                img    : "temp/4.png"
            },
            {
                whetheradd:"",
                context: "经理自助",
                img    : "temp/5.png"
            },
            {
                whetheradd:"",
                context: "考勤查询",
                img    : "temp/6.png"
            },
            {
                whetheradd:"",
                 context: "我的排班2" ,
                 img    : "temp/1.png"
            }
        ]
    };
    var items1 = {
        item:[
            {
                whetheradd:  "has-add",
                context: "我的排班"
            },
            {
                whetheradd:"",
                context: "我的薪资"
            },
            {
                whetheradd:  "has-add",
                context: "考勤查询"
            },
            {
                whetheradd:"",
                context: "我的福利"
            },
            {
                whetheradd:"",
                context: "经理自助"
            },
            {
                whetheradd:"",
                context: "考勤查询"
            }
        ]
    };
    var items4 = {
        item:[
            {

                context: "我的排班"
            },
            {

                context: "我的薪资"
            },
            {

                context: "考勤查询"
            },
            {

                context: "我的福利"
            },
            {

                context: "经理自助"
            },
            {

                context: "考勤查询"
            }
        ]
    };
    $("body").append( tpl1(items1));
    $("body").append( tpl2(items2));
    $("body").append( tpl3(items3));
    $("#pop3 .has-add-menu").append( tpl4(items4));
    hb.dialog({
        has_handler:false,
        //handler:".exception-info",
        popObj:"#pop2"
    });
    hb.dialog({
        has_handler:false,
        //handler:".exception-info",
        popObj:"#pop1"
    });
    hb.dialog({
        has_handler:false,
        //handler:".exception-info",
        popObj:"#pop3"
    });*/
    //随机颜色
    var color = ['#00c3e7','#00cd6f','#00d0d6','#ffb335','#f8796b','#8ccb42','#f78c3d','#6d94e3'];
    function randomVal(val){
        return Math.floor(Math.random()*8);
    }
    $(function(){
        $("#pop1 li a").each(function(i){
            $(this).css({
                'background':  color[randomVal()]
            })
        });
        //弹出框排序
        $(".index-pop ul").sortable({});
    });


    //弹出框上面点击图标改变的效果
    $(document).on("click","#pop1 li a em,#pop2 li a em",function(){

        $(this).parent().toggleClass("has-add");

    });
    $(document).on("click","#pop1 .text-center .confirm,#pop2 .text-center .confirm",function(){
        var arr = $(this).parent().siblings().find("li a.has-add");

    });

    /*var tpl5 = tpl['usual-menu'];
    var items6 ={};
    $.ajax({
        type: "post",
        url: 'js/json/usualSys.json',
        dataType: "json"
    }).done(function(data){
        items6 = data;
        $("body").append( tpl5(items6));
    });*/
    //常用菜单
    hb.dialog({
        has_handler:true,
        handler:".usual-menu li .add",
        popObj:"#pop3"
    });
    //常用菜单
    $("#pop3").on("click",".has-add-menu li em",function(){
        $(this).parent().parent().remove();
    });
    //人事与基本生活
    hb.dialog({
        has_handler:true,
        handler:".hr-life li .add",
        popObj:"#pop1"
    });
    //常用系统
    hb.dialog({
        has_handler:true,
        handler:".cfx-sys li .add",
        popObj:"#pop2"
    });

    /*菜单和弹出框的简单映射*/
    var mapping = {
        "pop1":".hr-life"
        ,"pop2":".cfx-sys"
        ,"pop3":".usual-menu"
    };

    function confirmBtn(obj){
        var parent = obj.parent().parent().parent().parent().attr("id");

        var key = $(mapping[parent]).parent().parent().parent().attr("wrap_key");
        return key;

    }

    //自助类组件reload数据方法
    function reloadData(wrap_key,url){
        var that = mod_wrap_new.getChildMod(confirmBtn(wrap_key));
        that.loadData(url)
            .done(function(data){
                that.model.set("list",data["list"]);
            })
    }


    return{
        confirmBtn:confirmBtn,
        reloadData:reloadData
    }
});