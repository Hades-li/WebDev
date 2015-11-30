/**
 * Created by Hades on 2015/10/23.
 */
define([
    'jquery',
    'jquery-ui',
    'backbone',
    'underscore',
    'echarts',
    'modules/animation',
    'modules/url'
], function ($,jquery_ui,Backbone,_,ec,loadAM,URL){
    var EChart_model = Backbone.Model.extend({
        defaults:{
            dataId:undefined,
            parent:undefined,
            hasTask:false,
            title:"XXX",
            more:"http://XXXX.do",
            select:[],
            defSelect:{},
            data:{},
            option:undefined
        },
        initialize: function () {

        },
        outToOption: function (data) {
            //柱状图的op模版
            var option = {
                grid:{
                    x:"80",
                    y:"10",
                    x2:"100",
                    y2:"60",
                    borderWidth:"0"
                },
                tooltip : {
                    trigger: "axis"
                },
                xAxis:[
                    {
                        "axisLine" : {
                            "show": true,
                            "lineStyle": {
                                "color": "#d6d0c1",
                                "type": "solid",
                                "width": 1
                            }
                        },
                        splitLine : {
                            show:false
                        },
                        axisTick : {    // 轴标记
                            show:false
                        },
                        axisLabel:{
                            //interval:"auto"
                            formatter: function(value){

                                return value/10000+"万";
                            }
                        }
                    }
                ],
                yAxis : [
                    {
                        "axisLine" : {
                            "show": true,
                            "lineStyle": {
                                "color": "#d6d0c1",
                                "type": "solid",
                                "width": 1
                            }
                        },
                        splitLine : {
                            show:false
                        },
                        axisTick : {    // 轴标记
                            show:false
                        },
                        splitArea : {
                            show: true,
                            areaStyle:{
                                color:['rgba(255,255,255,1)','rgba(251,249,244,1)']
                            }
                        },
                        type : 'value'
                    }
                ],
                series : [
                    {
                        itemStyle: {
                            normal: {
                                color:'#6acf8b',/*function(params) {
                                 // build a color map as your need.
                                 var colorList = [
                                 '#fca56c','#6acf8b'
                                 ];
                                 if(params.dataIndex == 0){
                                 return colorList[0]
                                 }else{
                                 return colorList[1]
                                 }
                                 },*/
                                label: {
                                    show: true
                                }
                            }
                        },
                        "type":"bar"
                    }
                ]
            };
            $.extend(true,option,data);
            this.set("option",option);
        },
        //读取数据
        queryData: function (callback_done,callback_err,zoom,time) {
            var that = this;
            var dataId = this.get("dataId");
                $.ajax({
                type: "post",
                url: URL,
                dataType: "json",
                data:{dataId:dataId,zoom:zoom,time:time}
            }).done(function (data) {
                if(data["defSelect"]){
                    var val = data["defSelect"].val;
                    for(var i = 0;i < data["select"].length; i ++){
                        if(val == data["select"][i].val){
                            data["defSelect"].text = data["select"][i].text;
                            break;
                        }
                    }
                }
                that.set({
                    title:data["title"],
                    more:data["more"],
                    select:data["select"],
                    defSelect:data["defSelect"],
                    data:data["data"]
                });
                that.outToOption(that.get("data"));
                if(callback_done){
                    callback_done();
                }
            }).fail(function () {
                if(callback_err){
                    callback_err();
                }
            })
        }
    });
    var EChart_view = Backbone.View.extend({
        //模板
        template: _.template(
            [
                "<div class=\"queryInput ec clearfix\">",
                "                <label class='fl'>科目选择：</label>",
                "                <div class=\"moni-select m2-sel low-select fl\">",
                "                    <button class=\"sel-button input-1\" value='<%= defSel?defSel.val:'' %>'><%= defSel?defSel.text:'' %></button>",
                "                    <ul>",
                "                        <% _.each(li,function(i,index){ %>",
                "                        <li class=\"\" val=\"<%= i.val %>\"><%= i.text %></li>",
                "                        <% }); %>",
                "                    </ul>",
                "                </div>",
                //"                <label class=\"ml10 fl\">日期：</label><input type=\"text\" class=\"input-date fl input-2\"/>",
                "                <a href=\"javascript:;\" class=\"normal-btn btn-1 q-btn ml10\">查询</a>",
                "            </div>",
                "            <div class=\"echart-wrap\" style='height:300px;'>",
                "            </div>"
            ].join("")
        ),
        className:"bar-x",
        ec:undefined,
        ecDom:undefined,
        tab_index:0,
        initialize: function () {
            var that = this;
            this.tab_index = this.model.get("parent").def.mods.length;
            //异步加载
            setTimeout(function () {
                loadAM.loadingAnimation(that.$el.parents(".gs-w"),true);//loading动画开启
                that.model.queryData(function () {//加载成功时调用
                    loadAM.loadingAnimation(that.$el.parents(".gs-w"),false);//loading动画关闭
                    that.$el.html(that.template({
                        defSel:that.model.get("defSelect"),
                        li:that.model.get("select"),//载入sel初始值
                        zoom:that.model.get("data")//载入echart数据
                    }));
                    that.model.get("parent").render();
                    //初始化ec
                    that.$el.addClass("beforeRender");
                    if(that.ec){
                        that.ec.dispose();
                        that.ec = undefined;
                    }
                    that.ec = ec.init(that.$el.find(".echart-wrap")[0]);
                    that.ecDom = that.$el.find(".echart-wrap");//未使用
                    that.render();
                    that.$el.removeClass("beforeRender");
                }, function () {//异步加载失败时调用
                        loadAM.loadErr(that.$el.parents(".gs-w"), function () {
                        that.queryEvent();
                    });
                });
            },0);
            this.model.on("change", this.render, this);
        },
        render: function () {
            //console.log("渲染echar");
            if(this.ec != undefined){
                this.ec.setOption(this.model.get("option"),true);
                this.ec.refresh();
                this.ec.resize();
            }
            return this;
        },
        events:{
            "click .q-btn":"queryEvent"
        },
        refresh: function () {
            this.render();
        },
        getEl: function () {
            return this.$el;
        },
        getTitle: function () {
            return this.model.get("title");
        },
        getMore: function () {
            return this.model.get("more");
        },

        queryEvent: function () {
            var zoom = this.$el.find(".input-1").val();
            var time = this.$el.find(".input-2").val();
            var that = this;
            loadAM.loadingAnimation(this.$el.parents(".gs-w"),true);
            this.model.queryData(function () {//加载成功
                loadAM.loadingAnimation(that.$el.parents(".gs-w"),false);
                that.$el.html(that.template({
                    defSel:that.model.get("defSelect"),
                    li:that.model.get("select"),//载入sel初始值
                    zoom:that.model.get("data")//载入echart数据
                }));

                that.model.get("parent").render(that.tab_index);

                //初始化ec
                if(that.ec){
                    that.ec.dispose();
                    that.ec = undefined;
                }
                that.ec = ec.init(that.$el.find(".echart-wrap")[0]);
                that.ecDom = that.$el.find(".echart-wrap");
                that.render();
            }, function () {//加载失败
                loadAM.loadErr(that.$el.parents(".gs-w"), function () {
                    that.queryEvent()
                });
            },zoom,time)
        }
    });
    //创建对象
    var create = function (dataId,parent) {
        var view = new EChart_view({
            model:new EChart_model({
                dataId:dataId,
                parent:parent
            })
        });
        return view;
    };

    return{
        create:create
    }
});